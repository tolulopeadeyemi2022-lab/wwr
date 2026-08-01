export async function POST(req) {
  const { article, imagePath } = await req.json();

  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO;

  const match = article.match(/slug:\s*"([^"]+)"/);
  if (!match) {
    return Response.json({ success: false, error: "Could not find slug in article." }, { status: 400 });
  }
  const slug = match[1];

  try {
    const fs = await import("fs");
    const path = await import("path");

    // 1. Upload the article as a new .mdx file
    const articlePath = `content/posts/${slug}.mdx`;
    const articleBase64 = Buffer.from(article).toString("base64");

    const articleUploadRes = await fetch(
      `https://api.github.com/repos/${repo}/contents/${articlePath}`,
      {
        method: "PUT",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/vnd.github+json",
        },
        body: JSON.stringify({
          message: `Add new post: ${slug}`,
          content: articleBase64,
        }),
      }
    );

    const articleData = await articleUploadRes.json();
    if (!articleUploadRes.ok) {
      console.log("ARTICLE UPLOAD ERROR:", JSON.stringify(articleData));
      return Response.json({ success: false, error: articleData.message || "Article upload failed." }, { status: 500 });
    }

    // 2. Upload the featured image
    let imageUploadData = null;
    if (imagePath) {
      const localImagePath = path.join(process.cwd(), "public", imagePath);
      const imageBuffer = fs.readFileSync(localImagePath);
      const imageBase64 = imageBuffer.toString("base64");
      const githubImagePath = `public${imagePath}`;

      const imageUploadRes = await fetch(
        `https://api.github.com/repos/${repo}/contents/${githubImagePath}`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
            Accept: "application/vnd.github+json",
          },
          body: JSON.stringify({
            message: `Add featured image for: ${slug}`,
            content: imageBase64,
          }),
        }
      );

      imageUploadData = await imageUploadRes.json();
      if (!imageUploadRes.ok) {
        console.log("IMAGE UPLOAD ERROR:", JSON.stringify(imageUploadData));
        return Response.json({ success: false, error: imageUploadData.message || "Image upload failed." }, { status: 500 });
      }
    }

    return Response.json({ success: true, slug: slug });
  } catch (err) {
    console.log("UPLOAD ERROR:", err.message);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}