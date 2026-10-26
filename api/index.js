
import axios from 'axios';

const MY_WALLET = '0xc76392342e2fc5af82039d85e3f7a8a1105b3bce';

export default async function handler(req, res) {
  const channels = ['red_packetx','codes_red_packet_binance','cryptoboxotalleeeeh','red_packeta','BINANCE_SQUARE_BD'];
  let codes = [];
  let logs = [];

  for(const ch of channels){
    try{
      const {data} = await axios.get(`https://t.me/s/${ch}`, {timeout:6000, headers:{'User-Agent':'Mozilla/5.0'}});
      const found = data.match(/\b[A-Z0-9]{4,12}\b/g) || [];
      const good = found.filter(c => /[A-Z]/.test(c) && /[0-9]/.test(c) && c.length>=4 && c.length<=10);
      if(good.length){ codes.push(...good); logs.push(`✅ @${ch}: لقا ${good.length}`); }
    }catch(e){ logs.push(`❌ @${ch}: ما قدرش`); }
  }

  const unique = [...new Set(codes)].slice(0,40);

  res.status(200).json({
    wallet: MY_WALLET,
    status: '🤖 البوت خدام و يصيد',
    total_found: unique.length,
    codes: unique,
    logs: logs,
    next_step: 'انسخ كود وحطو في Binance App > Pay > ظرف أحمر > أدخل رمز',
    auto_withdraw_info: 'الهدية تدخل Funding Wallet في Binance، باش تروح لمحفظتك 0xc76...b3bce لازم تدير Withdraw يدوي أو تربط Binance API',
    time: new Date().toISOString()
  });
}
