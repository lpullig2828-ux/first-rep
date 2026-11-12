const QR = require(process.argv[2] + '/node_modules/qrcode');
const fs = require('fs'); const out = process.argv[3], pngOut = process.argv[4];
const BASE = 'https://lpullig2828-ux.github.io/first-rep/';
const LOCS = [['poster','General'],['dorms','Residence halls'],['university-center','University Center'],['library','Library'],['rec-center','Rec Center'],['classrooms','Classrooms']];
const MACH = ['treadmill','elliptical','bike','rower','leg-press','chest-press','lat-pulldown','cable-row','dumbbells'];
const items = [...LOCS.map(([k])=>['poster-'+k, `${BASE}?utm_source=${k}`]), ...MACH.map(m=>['machine-'+m, `${BASE}?utm_source=sticker#machine-${m}`])];
(async()=>{
  const svgs = {};
  fs.readdirSync(pngOut).filter(f=>f.endsWith('.png')).forEach(f=>fs.unlinkSync(pngOut+'/'+f));
  for (const [name,url] of items){
    await QR.toFile(`${pngOut}/qr-${name}.png`, url, {width:1200, margin:2, errorCorrectionLevel:'M', color:{dark:'#111214', light:'#ffffff'}});
    svgs[name] = await QR.toString(url, {type:'svg', margin:0, errorCorrectionLevel:'M', color:{dark:'#111214', light:'#ffffff'}});
  }
  fs.writeFileSync(`${out}/svgs.json`, JSON.stringify({svgs, LOCS}));
  console.log('ok', items.length);
})();
