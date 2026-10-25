import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL" }, { status: 400 });
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" } });
    const html = await res.text();
    const priceMatch = html.match(/\$[\d,]+\.?\d*/);
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    return NextResponse.json({ 
      url, 
      title: titleMatch ? titleMatch[1] : "Product", 
      price: priceMatch ? priceMatch[0] : "Not found - جرب موقع آخر",
      checkedAt: new Date().toISOString() 
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
