
"use client";
import { useState } from "react";
export default function Page() {
  const [url, setUrl] = useState("");
  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const check = async () => {
    setLoading(true);
    try {
      const r = await fetch(`/api/price?url=${encodeURIComponent(url)}`);
      const j = await r.json();
      setData(j);
    } catch (e) {
      setData({ error: String(e) });
    }
    setLoading(false);
  };
  return (
    <div style={{ maxWidth: 700, margin: "40px auto", fontFamily: "system-ui", padding: 20 }}>
      <h1>PriceBot - Binance Base</h1>
      <p>عنوانك: 0xc76392342e2fc5af82039d85e3f7a8a1105b3bce</p>
      <p>الروبوتات تخلص 0.01 USDC على Base - الدراهم تدخل Binance ديراكت.</p>
      <div style={{ background: "#f5f5f5", padding: 15, borderRadius: 12, marginTop: 20 }}>
        <h3>تجربة مجانية</h3>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="https://www.amazon.com/dp/..." style={{ width: "100%", padding: 12, borderRadius: 8 }}/>
        <button onClick={check} disabled={loading} style={{ marginTop: 10, padding: "10px 20px", background: "#0052FF", color: "white", border: "none", borderRadius: 8 }}>
          {loading ? "نجبد..." : "جيب السعر"}
        </button>
        {data && <pre style={{ marginTop: 15, background: "white", padding: 10, overflow: "auto" }}>{JSON.stringify(data, null, 2)}</pre>}
      </div>
    </div>
  );
}
