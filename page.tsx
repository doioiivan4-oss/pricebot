'use client'
import { useState } from 'react'
export default function Page(){
  const [url, setUrl] = useState('')
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const FEE = 0.0 // <-- هنا العمولة صفر فاصلة صفر

  async function check(){
    if(!url) return
    setLoading(true)
    try{
      const res = await fetch(`/api/check?url=${encodeURIComponent(url)}`)
      const json = await res.json()
      // نحسب السعر مع عمولة 0.0
      if(json.priceValue){
        json.fee = FEE
        json.finalPrice = json.priceValue + (json.priceValue * FEE / 100)
      }
      setData(json)
    }catch(e:any){ setData({error:e.message}) }
    setLoading(false)
  }
  return (
    <div style={{maxWidth:700, margin:'50px auto', padding:20}}>
      <h1 style={{fontSize:32}}>💰 PriceBot - 0.0% عمولة</h1>
      <div style={{background:'#111', border:'1px solid #222', padding:12, borderRadius:8, marginTop:10}}>
        ⚙️ الإعدادات: العمولة = <b style={{color:'#0f0'}}>{FEE.toFixed(1)}%</b> - كل عملية = 0.0
      </div>
      <div style={{display:'flex', gap:10, marginTop:20}}>
        <input value={url} onChange={e=>setUrl(e.target.value)} placeholder="حط رابط المنتج هنا..." style={{flex:1, padding:12, borderRadius:8, border:'1px solid #333', background:'#111', color:'#fff'}} />
        <button onClick={check} disabled={loading} style={{padding:'12px 20px', borderRadius:8, background:'#fff', color:'#000', fontWeight:700, cursor:'pointer'}}>{loading?'يفحص...':'فحص'}</button>
      </div>
      {data && (
        <div style={{marginTop:20, background:'#111', padding:20, borderRadius:10}}>
          <p>📌 العنوان: {data.title}</p>
          <p>💵 السعر الأصلي: {data.price}</p>
          <p>🧾 العمولة: {FEE.toFixed(1)}% = 0.0</p>
          <p style={{fontSize:20, fontWeight:700, color:'#0f0'}}>✅ السعر النهائي: {data.finalPrice ? `$${data.finalPrice.toFixed(2)}` : data.price} (بدون أي زيادة)</p>
          <pre style={{marginTop:15, opacity:0.6, fontSize:12, overflow:'auto'}}>{JSON.stringify(data, null, 2)}</pre>
        </div>
      )}
    </div>
  )
}
