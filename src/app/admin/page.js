"use client";
import { useState } from "react";

export default function AdminPage() {
  const [title, setTitle] = useState("");
  const [keyword, setKeyword] = useState("");
  const [wordCount, setWordCount] = useState(1000);
  const [writingGuide, setWritingGuide] = useState("");
  const [article, setArticle] = useState("");
  const [slug, setSlug] = useState("");
  const [imagePath, setImagePath] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadedSlug, setUploadedSlug] = useState("");
  const [pinImagePath, setPinImagePath] = useState("");
  const [pinImageLoading, setPinImageLoading] = useState(false);
  const [pinDetails, setPinDetails] = useState(null);
  const [pinDetailsLoading, setPinDetailsLoading] = useState(false);
  const [step, setStep] = useState(1);

  async function handleFileUpload(e) {
    const file = e.target.files[0];
    if (!file) return;
    const text = await file.text();
    setWritingGuide(text);
  }

  async function generateArticle() {
    console.log("BUTTON CLICKED");
    setLoading(true);
    try {
      const res = await fetch("/api/generate-article", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, keyword, wordCount, writingGuide }),
      });
      const data = await res.json();
      setLoading(false);
      if (data.success) {
        setArticle(data.article);
        const match = data.article.match(/slug:\s*"([^"]+)"/);
        if (match) setSlug(match[1]);
        setStep(2);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      setLoading(false);
      alert("Fetch failed: " + err.message);
    }
  }

  async function generateImage() {
    setImageLoading(true);
    try {
      const res = await fetch("/api/generate-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, keyword, slug }),
      });
      const data = await res.json();
      setImageLoading(false);
      if (data.success) {
        setImagePath(data.imagePath);
        setStep(3);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      setImageLoading(false);
      alert("Fetch failed: " + err.message);
    }
  }

  async function uploadToBlog() {
    setUploadLoading(true);
    try {
      const res = await fetch("/api/upload-to-blog", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ article, imagePath }),
      });
      const data = await res.json();
      setUploadLoading(false);
      if (data.success) {
        setUploadedSlug(data.slug);
        setStep(4);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      setUploadLoading(false);
      alert("Fetch failed: " + err.message);
    }
  }

  async function generatePinImage() {
    setPinImageLoading(true);
    try {
      const res = await fetch("/api/generate-pin-image", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, slug }),
      });
      const data = await res.json();
      setPinImageLoading(false);
      if (data.success) {
        setPinImagePath(data.pinImagePath);
        setStep(5);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      setPinImageLoading(false);
      alert("Fetch failed: " + err.message);
    }
  }

  async function generatePinDetails() {
    setPinDetailsLoading(true);
    try {
      const res = await fetch("/api/generate-pin-details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ title, keyword, slug }),
      });
      const data = await res.json();
      setPinDetailsLoading(false);
      if (data.success) {
        setPinDetails(data.pinDetails);
        setStep(6);
      } else {
        alert("Error: " + data.error);
      }
    } catch (err) {
      setPinDetailsLoading(false);
      alert("Fetch failed: " + err.message);
    }
  }

  const boxStyle = {
    display: "block",
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    border: "2px solid #333",
    borderRadius: "4px",
    fontSize: "16px",
    color: "#000",
    backgroundColor: "#fff",
  };

  const buttonStyle = {
    padding: "12px 24px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontSize: "16px",
    cursor: "pointer",
    fontWeight: "bold",
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "#ffffff",
        zIndex: 999999,
        overflow: "auto",
        padding: "40px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <div style={{ maxWidth: 700, margin: "0 auto" }}>
        <h1 style={{ color: "#000" }}>Step 1: Generate Article</h1>

        <label style={{ color: "#000", fontWeight: "bold" }}>Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)} style={boxStyle} />

        <label style={{ color: "#000", fontWeight: "bold" }}>Keyword to rank for</label>
        <input value={keyword} onChange={(e) => setKeyword(e.target.value)} style={boxStyle} />

        <label style={{ color: "#000", fontWeight: "bold" }}>Word count</label>
        <input type="number" value={wordCount} onChange={(e) => setWordCount(e.target.value)} style={boxStyle} />

        <label style={{ color: "#000", fontWeight: "bold" }}>Attach writing guide (.txt or .md)</label>
        <input type="file" accept=".txt,.md" onChange={handleFileUpload} style={{ marginBottom: "15px" }} />

        <button onClick={generateArticle} disabled={loading} style={buttonStyle}>
          {loading ? "Generating..." : "Generate Article"}
        </button>

        {article && (
          <div style={{ marginTop: 30 }}>
            <h2 style={{ color: "#000" }}>Generated Article</h2>
            <pre style={{ whiteSpace: "pre-wrap", color: "#000", background: "#f5f5f5", padding: 15, borderRadius: 6 }}>
              {article}
            </pre>

            {step === 2 && (
              <button onClick={generateImage} disabled={imageLoading} style={buttonStyle}>
                {imageLoading ? "Creating Image..." : "Next: Generate Featured Image →"}
              </button>
            )}

            {step >= 3 && imagePath && (
              <div style={{ marginTop: 30 }}>
                <h2 style={{ color: "#000" }}>Featured Image</h2>
                <img
                  src={imagePath}
                  alt="Featured"
                  style={{ maxWidth: "100%", borderRadius: 8, border: "2px solid #333" }}
                />
                <p style={{ color: "#000" }}>Saved to: public{imagePath}</p>

                {step === 3 && (
                  <button onClick={uploadToBlog} disabled={uploadLoading} style={buttonStyle}>
                    {uploadLoading ? "Uploading..." : "Next: Upload to Blog →"}
                  </button>
                )}

                {step >= 4 && uploadedSlug && (
                  <div style={{ marginTop: 20, padding: 15, background: "#e6ffe6", borderRadius: 8, border: "2px solid #333" }}>
                    <p style={{ color: "#000", fontWeight: "bold" }}>
                      ✅ Uploaded successfully! Slug: {uploadedSlug}
                    </p>
                    <p style={{ color: "#000" }}>
                      Vercel is now rebuilding your site. Check back in 1-2 minutes.
                    </p>

                    {step === 4 && (
                      <button onClick={generatePinImage} disabled={pinImageLoading} style={{ ...buttonStyle, marginTop: 15 }}>
                        {pinImageLoading ? "Creating Pin Image..." : "Next: Generate Pin Image →"}
                      </button>
                    )}
                  </div>
                )}

                {step >= 5 && pinImagePath && (
                  <div style={{ marginTop: 30 }}>
                    <h2 style={{ color: "#000" }}>Pinterest Pin Image</h2>
                    <img
                      src={pinImagePath}
                      alt="Pin"
                      style={{ maxWidth: "300px", borderRadius: 8, border: "2px solid #333", display: "block" }}
                    />
                    <p style={{ color: "#000" }}>Saved to: public{pinImagePath}</p>

                    {step === 5 && (
                      <button onClick={generatePinDetails} disabled={pinDetailsLoading} style={buttonStyle}>
                        {pinDetailsLoading ? "Writing Pin Details..." : "Next: Generate Pin Details →"}
                      </button>
                    )}
                  </div>
                )}

                {step >= 6 && pinDetails && (
                  <div style={{ marginTop: 30, padding: 15, background: "#f5f5f5", borderRadius: 8, border: "2px solid #333" }}>
                    <h2 style={{ color: "#000" }}>Pin Details</h2>
                    <p style={{ color: "#000" }}><strong>Title:</strong> {pinDetails.pinTitle}</p>
                    <p style={{ color: "#000" }}><strong>Description:</strong> {pinDetails.pinDescription}</p>
                    <p style={{ color: "#000" }}><strong>Hashtags:</strong> {pinDetails.hashtags.join(" ")}</p>
                    <p style={{ color: "#000" }}><strong>Link:</strong> {pinDetails.link}</p>
                    <button style={{ ...buttonStyle, background: "#999", cursor: "not-allowed", marginTop: 10 }} disabled>
                      Next: Upload to Pinterest → (coming soon)
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}