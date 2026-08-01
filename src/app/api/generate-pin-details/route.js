export async function POST(req) {
  const { title, keyword, slug } = await req.json();

  const keys = Object.keys(process.env)
    .filter((k) => k.startsWith("OPENROUTER_KEY_"))
    .map((k) => process.env[k]);

  const models = [
    "nvidia/nemotron-3-ultra-550b-a55b:free",
    "poolside/laguna-m.1:free",
    "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
  ];

  const postUrl = `https://wwr-gray.vercel.app/blog/${slug}`;

  const prompt = `You are a Pinterest marketing expert writing pin details for a personal finance blog post.

Blog post title: ${title}
Target keyword: ${keyword}
Post link: ${postUrl}

Write Pinterest pin details following these best practices:
- Pin title: under 100 characters, punchy, curiosity-driven or benefit-driven, includes the keyword naturally
- Pin description: 2-4 sentences, starts with a strong hook, naturally includes the keyword, ends with a soft call-to-action (like "Save this pin" or "Tap to read the full guide"), written in a warm and direct tone
- Hashtags: exactly 5 relevant Pinterest hashtags for the personal finance niche, formatted with # and no spaces (like #budgetingtips)

CRITICAL RULE: Never use an em dash (—) anywhere in the output.

Return ONLY a raw JSON object in exactly this format, with no explanations, no markdown code fences, no extra text:

{
  "pinTitle": "...",
  "pinDescription": "...",
  "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5"],
  "link": "${postUrl}"
}`;

  for (const model of models) {
    for (const key of keys) {
      try {
        const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${key}`,
          },
          body: JSON.stringify({
            model: model,
            messages: [{ role: "user", content: prompt }],
          }),
        });

        const data = await response.json();
        console.log("PIN DETAILS MODEL:", model);
        console.log("PIN DETAILS STATUS:", response.status);

        if (data.error) {
          console.log("PIN DETAILS HIDDEN ERROR:", data.error.message);
          continue;
        }

        if (response.status === 404 || response.status === 429) {
          continue;
        }

        if (!data.choices || !data.choices[0]) {
          continue;
        }

        let rawText = data.choices[0].message.content.trim();

        // Strip markdown code fences if the model added them anyway
        rawText = rawText.replace(/^```json\s*/i, "").replace(/^```\s*/i, "").replace(/```\s*$/i, "");

        let pinDetails;
        try {
          pinDetails = JSON.parse(rawText);
        } catch (parseErr) {
          console.log("PIN DETAILS PARSE FAILED:", rawText);
          continue;
        }

        if (!pinDetails.pinTitle || !pinDetails.pinDescription || !pinDetails.hashtags) {
          continue;
        }

        return Response.json({ success: true, pinDetails: pinDetails });
      } catch (err) {
        console.log("PIN DETAILS ERROR:", err.message);
        continue;
      }
    }
  }

  return Response.json(
    { success: false, error: "All models and keys exhausted or failed for pin details." },
    { status: 500 }
  );
}