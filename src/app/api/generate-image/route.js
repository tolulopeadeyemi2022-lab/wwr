const PALETTE = {
  "money-management": { bg1: "#eef6ee", bg2: "#dcebe0", primary: "#2d6a4f", secondary: "#1b4332", accent: "#d4af37" },
  "investing": { bg1: "#eef3f8", bg2: "#dbe7f2", primary: "#1d3557", secondary: "#457b9d", accent: "#d4af37" },
  "make-more-money": { bg1: "#fdf6e8", bg2: "#f6e8c8", primary: "#b8860b", secondary: "#8a6508", accent: "#2d6a4f" },
  "debt-credit": { bg1: "#f5eeee", bg2: "#e8d7d7", primary: "#8a3324", secondary: "#5c2016", accent: "#457b9d" },
  "financial-independence": { bg1: "#eef6f2", bg2: "#d7ebe0", primary: "#1b4332", secondary: "#2d6a4f", accent: "#e9c46a" },
};

function hashSlug(slug) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h * 31 + slug.charCodeAt(i)) >>> 0;
  return h;
}

function scenePiggyBank(p) {
  return `
    <ellipse cx="340" cy="290" rx="90" ry="60" fill="${p.primary}"/>
    <circle cx="255" cy="270" r="18" fill="${p.primary}"/>
    <circle cx="248" cy="264" r="4" fill="#2b2b2b"/>
    <rect x="330" y="235" width="12" height="18" rx="4" fill="${p.primary}"/>
    <rect x="332" y="250" width="16" height="4" rx="2" fill="${p.secondary}"/>
    <circle cx="300" cy="330" r="14" fill="${p.secondary}"/>
    <circle cx="380" cy="330" r="14" fill="${p.secondary}"/>
    <ellipse cx="470" cy="320" rx="46" ry="14" fill="${p.accent}"/>
    <ellipse cx="470" cy="300" rx="46" ry="14" fill="${p.accent}"/>
    <ellipse cx="470" cy="280" rx="30" ry="10" fill="${p.accent}"/>
  `;
}

function sceneGrowthChart(p) {
  return `
    <rect x="120" y="260" width="46" height="80" rx="4" fill="${p.secondary}"/>
    <rect x="190" y="210" width="46" height="130" rx="4" fill="${p.primary}"/>
    <rect x="260" y="160" width="46" height="180" rx="4" fill="${p.accent}"/>
    <path d="M120 250 L236 200 L306 150" fill="none" stroke="${p.primary}" stroke-width="4" stroke-linecap="round"/>
    <circle cx="306" cy="150" r="8" fill="${p.accent}"/>
    <circle cx="450" cy="230" r="60" fill="${p.primary}" opacity="0.15"/>
    <circle cx="450" cy="230" r="40" fill="${p.primary}" opacity="0.25"/>
    <text x="450" y="238" text-anchor="middle" font-size="28" font-weight="600" fill="${p.secondary}">$</text>
  `;
}

function sceneRocket(p) {
  return `
    <path d="M340 140 L370 240 L310 240 Z" fill="${p.primary}"/>
    <circle cx="340" cy="200" r="14" fill="${p.bg1}"/>
    <path d="M310 240 L290 280 L320 265 Z" fill="${p.secondary}"/>
    <path d="M370 240 L390 280 L360 265 Z" fill="${p.secondary}"/>
    <path d="M325 240 L355 240 L345 280 L335 280 Z" fill="${p.accent}"/>
    <path d="M200 320 Q270 260 340 140" fill="none" stroke="${p.accent}" stroke-width="3" stroke-dasharray="6 8" opacity="0.6"/>
    <text x="480" y="200" font-size="30" font-weight="600" fill="${p.accent}">$</text>
    <text x="520" y="260" font-size="24" font-weight="600" fill="${p.primary}">$</text>
  `;
}

function sceneShield(p) {
  return `
    <path d="M340 140 L420 170 L420 260 Q420 320 340 350 Q260 320 260 260 L260 170 Z" fill="${p.primary}"/>
    <path d="M310 240 L332 262 L375 210" fill="none" stroke="${p.bg1}" stroke-width="8" stroke-linecap="round" stroke-linejoin="round"/>
    <rect x="150" y="270" width="130" height="80" rx="10" fill="${p.secondary}"/>
    <rect x="150" y="290" width="130" height="14" fill="${p.accent}"/>
    <circle cx="480" cy="300" r="10" fill="${p.accent}"/>
    <circle cx="510" cy="280" r="6" fill="${p.accent}"/>
  `;
}

function sceneFreedom(p) {
  return `
    <circle cx="500" cy="140" r="50" fill="${p.accent}"/>
    <rect x="120" y="320" width="24" height="60" rx="4" fill="${p.secondary}"/>
    <path d="M120 320 Q220 260 320 320" fill="none" stroke="${p.primary}" stroke-width="10" stroke-linecap="round"/>
    <path d="M180 300 Q220 260 260 300" fill="none" stroke="${p.secondary}" stroke-width="4" opacity="0.5"/>
    <path d="M460 340 Q480 300 500 340" fill="${p.primary}"/>
    <path d="M420 350 Q440 310 460 350" fill="${p.primary}"/>
    <circle cx="450" cy="320" r="70" fill="${p.primary}" opacity="0.12"/>
  `;
}

const SCENES = {
  "money-management": [scenePiggyBank, sceneGrowthChart],
  "investing": [sceneGrowthChart, scenePiggyBank],
  "make-more-money": [sceneRocket, sceneGrowthChart],
  "debt-credit": [sceneShield, scenePiggyBank],
  "financial-independence": [sceneFreedom, sceneGrowthChart],
};

export async function POST(req) {
  const { title, category, slug } = await req.json();

  try {
    const safeCategory = PALETTE[category] ? category : "money-management";
    const p = PALETTE[safeCategory];
    const scenes = SCENES[safeCategory];
    const h = hashSlug(slug || title || "default");
    const scene = scenes[h % scenes.length];

    const svg = `<svg width="1200" height="630" viewBox="0 0 680 400" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stop-color="${p.bg1}"/>
          <stop offset="100%" stop-color="${p.bg2}"/>
        </linearGradient>
      </defs>
      <rect x="0" y="0" width="680" height="400" fill="url(#bgGrad)"/>
      <rect x="0" y="340" width="680" height="60" fill="${p.bg2}" opacity="0.6"/>
      ${scene(p)}
    </svg>`;

    const fs = await import("fs");
    const path = await import("path");

    const dir = path.join(process.cwd(), "public", "images", "posts");
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }

    const safeSlug = slug || "untitled-" + Date.now();
    const filePath = path.join(dir, `${safeSlug}.svg`);
    fs.writeFileSync(filePath, svg);

    return Response.json({ success: true, imagePath: `/images/posts/${safeSlug}.svg` });
  } catch (err) {
    console.log("IMAGE ERROR:", err.message);
    return Response.json({ success: false, error: err.message }, { status: 500 });
  }
}