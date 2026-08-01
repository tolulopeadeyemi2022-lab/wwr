export async function POST(req) {
  const { title, keyword, slug } = await req.json();

  const prompt = `Realistic photograph, editorial style, related to: ${title}, ${keyword}, natural lighting, high detail, no text overlay, no watermark, professional photography, personal finance theme`;

  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1200&height=630&nologo=true`;

  try {
    const imageResponse = await fetch(imageUrl);

    if (!imageResponse.ok) {
      return Response.json(
        { success: false, error: "Image generation failed. Status: " + imageResponse.status },
        { status: 500 }
      );
    }

    const arrayBuffer = await imageResponse.arrayBuffer();
    const buffer = Buffer.from(arrayBuffer);

    const fs = await import("fs");
    const path = await import("path");

    const dir = path.join(process.cwd(), "public", "images", "posts");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const safeSlug = slug || "untitled-" + Date.now();
    const filePath = path.join(dir, `${safeSlug}.jpg`);
    fs.writeFileSync(filePath, buffer);

    return Response.json({ success: true, imagePath: `/images/posts/${safeSlug}.jpg` });
  } catch (err) {
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}