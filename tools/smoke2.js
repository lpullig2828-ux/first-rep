const {JSDOM, VirtualConsole} = require(process.argv[2] + '/node_modules/jsdom');
const fs = require('fs');
const html = fs.readFileSync(process.argv[3],'utf8');
const vc = new VirtualConsole(); const errs=[];
vc.on('jsdomError', e => { if(!/scrollTo|scrollIntoView|navigation/i.test(e.message)) errs.push(e.message); });
const dom = new JSDOM(html, {runScripts:'dangerously', pretendToBeVisual:true, url:'https://lpullig2828-ux.github.io/first-rep/?utm_source=dorms', virtualConsole:vc,
  beforeParse(w){ w.HTMLCanvasElement.prototype.getContext=()=>null; w.scrollTo=()=>{}; w.Element.prototype.scrollIntoView=function(){};
    w.URL.createObjectURL=()=>'blob:x'; w.URL.revokeObjectURL=()=>{}; w.__opened=[]; w.open=(u)=>{w.__opened.push(u);}; }});
const w = dom.window, d = w.document;
// fake GoatCounter so we can see what would be counted
const sent=[]; w.goatcounter={count:o=>sent.push(o.path)};
const txt = () => d.getElementById('app').textContent.replace(/\s+/g,' ').trim().slice(0,100);
const click = sel => { const el=d.querySelector(sel); if(!el) throw new Error('missing '+sel+' on: '+txt()); el.dispatchEvent(new w.MouseEvent('click',{bubbles:true})); };
const tick = () => new Promise(r=>setTimeout(r,20));
(async()=>{
  await tick(); click('[data-act="ob-next"]'); await tick();
  click('[data-v="strong"]'); await tick(); click('[data-v="new"]'); await tick(); click('[data-v="3"]'); await tick();
  console.log('Q4       :', txt());
  click('[data-v="joints"]'); await tick();
  console.log('HOME     :', txt());
  console.log('CALPROMPT:', !!d.querySelector('[data-act="cal-open"]'));
  click('[data-act="cal-open"]'); await tick();
  console.log('PLAN     :', txt());
  click('[data-act="cal-day"][data-d="SA"]'); await tick();
  const sel=d.getElementById('cal-time'); sel.value='7'; sel.dispatchEvent(new w.Event('change',{bubbles:true})); await tick();
  console.log('CAL WARN :', (d.querySelector('#cal p[style]')||{}).textContent);
  click('[data-act="cal-google"]'); await tick();
  console.log('GOOGLE   :', decodeURIComponent(w.__opened[0]||'').slice(0,240));
  w.goatcounter.count=o=>sent.push(o.path);
  w.location.hash='workout'; await tick(); console.log('WORKOUT  :', txt());
  click('[data-act="finish"]'); await tick(); console.log('DONE     :', txt());
  click('[data-act="conf"][data-v="yes"]'); await tick(); console.log('CONF DONE:', !d.querySelector('[data-act="conf"]'));
  console.log('COUNTED  :', [...new Set(sent)].join('  '));
  console.log('ERRORS   :', errs.length ? errs : 'none');
})();
