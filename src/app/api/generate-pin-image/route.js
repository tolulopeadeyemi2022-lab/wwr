export async function POST(req) {
  const { title, slug } = await req.json();

  const prompt = `Realistic photograph, editorial style, related to: ${title}, natural lighting, high detail, no text, no watermark, professional photography, personal finance theme, vertical portrait composition`;

  const encodedPrompt = encodeURIComponent(prompt);
  const imageUrl = `https://image.pollinations.ai/prompt/${encodedPrompt}?width=1000&height=1500&nologo=true`;

  const sharp = (await import("sharp")).default;
  const fs = await import("fs");
  const path = await import("path");

  function wrapText(text, maxCharsPerLine) {
    const words = text.split(" ");
    const lines = [];
    let currentLine = "";
    for (const word of words) {
      if ((currentLine + " " + word).trim().length <= maxCharsPerLine) {
        currentLine = (currentLine + " " + word).trim();
      } else {
        if (currentLine) lines.push(currentLine);
        currentLine = word;
      }
    }
    if (currentLine) lines.push(currentLine);
    return lines;
  }

  function escapeXml(str) {
    return str
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  try {
    let baseImageBuffer;
    let imageAvailable = true;

    try {
      const imageResponse = await fetch(imageUrl);
      if (!imageResponse.ok) {
        imageAvailable = false;
      } else {
        const arrayBuffer = await imageResponse.arrayBuffer();
        baseImageBuffer = Buffer.from(arrayBuffer);
      }
    } catch (fetchErr) {
      console.log("PIN IMAGE FETCH FAILED, using solid background fallback:", fetchErr.message);
      imageAvailable = false;
    }

    // Fallback: if the photo failed, use a solid dark green background instead
    if (!imageAvailable) {
      baseImageBuffer = await sharp({
        create: {
          width: 1000,
          height: 1500,
          channels: 3,
          background: { r: 20, g: 60, b: 40 },
        },
      })
        .jpeg()
        .toBuffer();
    }

    const lines = wrapText(title.toUpperCase(), 14);
    const lineHeight = 90;
    const boxHeight = lines.length * lineHeight + 80;
    const boxY = imageAvailable ? 1500 - boxHeight - 80 : (1500 - boxHeight) / 2;

    const textElements = lines
      .map((line, i) => {
        const y = boxY + 85 + i * lineHeight;
        return `<text x="500" y="${y}" font-family="Arial, Helvetica, sans-serif" font-size="74" font-weight="900" fill="white" text-anchor="middle" stroke="black" stroke-width="4" paint-order="stroke">${escapeXml(line)}</text>`;
      })
      .join("");

    const svgOverlay = `
      <svg width="1000" height="1500" xmlns="http://www.w3.org/2000/svg">
        <rect x="0" y="${boxY}" width="1000" height="${boxHeight}" fill="black" fill-opacity="0.7" />
        ${textElements}
      </svg>
    `;

    const finalImageBuffer = await sharp(baseImageBuffer)
      .resize(1000, 1500, { fit: "cover" })
      .composite([{ input: Buffer.from(svgOverlay), top: 0, left: 0 }])
      .jpeg({ quality: 90 })
      .toBuffer();

    const dir = path.join(process.cwd(), "public", "images", "pins");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const safeSlug = slug || "untitled-" + Date.now();
    const filePath = path.join(dir, `${safeSlug}-pin.jpg`);
    fs.writeFileSync(filePath, finalImageBuffer);

    return Response.json({ success: true, pinImagePath: `/images/pins/${safeSlug}-pin.jpg` });
  } catch (err) {
    console.log("PIN IMAGE ERROR:", err.message);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}