import { NextRequest, NextResponse } from "next/server";
export async function GET(req: NextRequest) {
  const url = req.nextUrl.searchParams.get("url");
  if (!url) return NextResponse.json({ error: "No URL" }, { status: 400 });
  try {
    const res = await fetch(url, { headers: { "User-Agent": "Mozilla/5.0" } });
    const html = await res.text();
    const priceMatch = html.match(/\$?\s*([\d,]+\.?\d*)/);
    const titleMatch = html.match(/<title>(.*?)<\/title>/i);
    let priceValue = 0;
    let priceStr = "Not found";
    if(priceMatch){
      priceStr = priceMatch[0];
      priceValue = parseFloat(priceMatch[1].replace(/,/g,''));
    }
    return NextResponse.json({ 
      url, 
      title: titleMatch ? titleMatch[1] : "Product", 
      price: priceStr,
      priceValue,
      fee: 0.0,
      message: "كل عملية فيها 0.0 عمولة",
      checkedAt: new Date().toISOString() 
    });
  } catch (e: any) {
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}
