
import * as cheerio from "cheerio";
export const runtime = "nodejs";
export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const url = searchParams.get("url");
  if (!url) {
    return Response.json({ error: "حط ?url=https://..." }, { status: 400 });
  }
  try {
    const res = await fetch(url, {
      headers: { "User-Agent": "Mozilla/5.0 PriceBot/1.0" },
      cache: "no-store",
    });
    const html = await res.text();
    const $ = cheerio.load(html);
    let price = "";
    let title = $("title").text().slice(0, 120);
    const selectors = ['[data-a-price] .a-offscreen','#priceblock_ourprice','[class*="price"]','meta[property="product:price:amount"]'];
    for (const sel of selectors) {
      const el = $(sel).first();
      if (el.length) {
        price = el.attr("content") || el.text();
        if (price) break;
      }
    }
    price = price.replace(/[^0-9.,]/g, "").trim() || "تم الجلب";
    return Response.json({
      ok: true,
      input_url: url,
      title,
      price,
      timestamp: new Date().toISOString(),
      paid_to: "0xc76392342e2fc5af82039d85e3f7a8a1105b3bce (Binance Base)",
    });
  } catch (e: any) {
    return Response.json({ error: e.message }, { status: 500 });
  }
}
