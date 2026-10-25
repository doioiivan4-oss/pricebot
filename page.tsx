"use client";
import { useState } from "react";

export default function Page() {
  const [url, setUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  async function checkPrice() {
    if (!url) return;
    setLoading(true);
    setResult(null);
    try {
      const res = await fetch(/api/check?url=${encodeURIComponent(url)});
      const data = await res.json();
      setResult(data);
    } catch (e) {
      setResult({ error: "Failed" });
    }
    setLoading(false);
  }

  return (
    <div style={{ maxWidth: 600, margin: "50px auto", padding: 20 }}>
      <h1>💰 PriceBot</h1>
      <p>الصق رابط المنتج</p>
      <div style={{ display: "flex", gap: 10, marginTop: 20 }}>
        <input
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="https://..."
          style={{ flex: 1, padding: 12, borderRadius: 8, border: "1px solid #ccc" }}
        />
        <button onClick={checkPrice} disabled={loading} style={{ padding: "12px 20px", borderRadius: 8, background: "black", color: "white" }}>
          {loading ? "..." : "Check"}
        </button>
      </div>
      {result && <pre style={{ marginTop: 20, padding: 15, background: "#f5f5f5", borderRadius: 8, whiteSpace: "pre-wrap" }}>{JSON.stringify(result, null, 2)}</pre>}
    </div>
  );
}
