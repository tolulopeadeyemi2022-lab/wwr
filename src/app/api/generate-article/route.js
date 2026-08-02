export async function POST(req) {
  const { title, keyword, wordCount, writingGuide } = await req.json();

  const keys = Object.keys(process.env)
    .filter((k) => k.startsWith("OPENROUTER_KEY_"))
    .map((k) => process.env[k]);

  // Try these models in order. If one is delisted/rate-limited, we fall through to the next.
const models = [
  "nvidia/nemotron-3-ultra-550b-a55b:free",
  "nvidia/nemotron-3-nano-omni-30b-a3b-reasoning:free",
];

  const prompt = `You are writing a blog article in MDX format for a personal finance blog.

Return ONLY the raw MDX content, starting with the frontmatter block, no explanations, no markdown code fences.

Follow this EXACT frontmatter structure (fill in real values, keep the field names and order):

---
title: "${title}"
slug: "a-short-url-slug-based-on-the-title"
metaDescription: "A compelling 1-2 sentence meta description including the keyword: ${keyword}"
featuredImage: "/images/posts/a-short-url-slug-based-on-the-title.svg"
featuredImageAlt: "Descriptive alt text for the featured image"
category: category: "choose exactly one of these five slugs, copied exactly as written, no other options allowed: money-management, investing, make-more-money, debt-credit, financial-independence"
tags: ["tag1", "tag2", "tag3", "tag4", "tag5"]
author: "Wealth Within Reach"
publishDate: "${new Date().toISOString().split("T")[0]}"
featured: false
relatedPosts: ["related-slug-1", "related-slug-2", "related-slug-3"]
---

Then write the article body in MDX:
- Target keyword to rank for: ${keyword}
- Approximate word count: ${wordCount}
- Use ## for section headings and * for bullet points
- Include a "## Frequently Asked Questions" section with ### sub-questions
- Include a "## Key Takeaways" section
- Include a "## What To Do Next" section
- Follow these additional writing instructions exactly:
${writingGuide}

CRITICAL RULE: Never use an em dash (—) anywhere in the output, under any circumstances. If you would normally use an em dash, rewrite the sentence using a period, comma, colon, or the word "and" instead. Check your output before finishing and remove any em dashes you find.`;

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
        console.log("MODEL:", model);
        console.log("STATUS:", response.status);
        console.log("RESPONSE:", JSON.stringify(data));

        // Catch errors that hide inside a 200 response (like the Nvidia overload case)
        if (data.error) {
          console.log("HIDDEN ERROR:", data.error.message);
          continue;
        }

        if (response.status === 404 || response.status === 429) {
          continue;
        }

        if (!data.choices || !data.choices[0]) {
          continue;
        }

        let articleText = data.choices[0].message.content;

        // Catch "reasoning" models that think out loud instead of just answering
        if (articleText.includes("We need to") || articleText.includes("Let's draft") || !articleText.trim().startsWith("---")) {
          console.log("REJECTED: model output did not start with frontmatter, likely a reasoning model");
          continue;
        }

        // Safety net: strip any em dashes the model slipped in anyway
        articleText = articleText.replace(/—/g, ", ");

        return Response.json({ success: true, article: articleText, modelUsed: model });
      } catch (err) {
        console.log("MODEL:", model);
        console.log("ERROR:", err.message);
        continue;
      }
    }
  }

  return Response.json(
    { success: false, error: "All models and keys exhausted or failed." },
    { status: 500 }
  );
}