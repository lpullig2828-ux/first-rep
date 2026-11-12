const fs=require('fs'); const dir=process.argv[2];
const J=JSON.parse(fs.readFileSync(dir+"/qr/svgs.json","utf8")); const s=J.svgs; const LOCS=J.LOCS;
const M=[['treadmill','Treadmill'],['elliptical','Elliptical'],['bike','Stationary Bike'],['rower','Rowing Machine'],['leg-press','Leg Press'],['chest-press','Chest Press'],['lat-pulldown','Lat Pulldown'],['cable-row','Seated Cable Row'],['dumbbells','Dumbbells']];
const html=`<title>First Rep Posters</title>
<meta name="claude:viewport-fit-sides" content="cover">
<link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Barlow+Condensed:wght@700;800&family=DM+Sans:wght@400;500;700&display=swap">
<style>
/* Layout: printed paper sheets on a grey table — one big poster, then a sticker sheet. Single deliberate light look (it's paper). */
:root{--table:#D9DBE0;--paper:#FFFFFF;--ink:#111214;--muted:#5E626B;--gold:#CFA94A;--gold-ink:#7A5C10;--line:#E1E3E8;
--display:"Barlow Condensed","Arial Narrow",Impact,sans-serif;--body:"DM Sans",system-ui,sans-serif;color-scheme:light}
body{background:var(--table);color:var(--ink);font-family:var(--body)}
.wrap{max-width:760px;margin:0 auto;padding-block:24px 48px;padding-left:max(16px,env(safe-area-inset-left,0px));padding-right:max(16px,env(safe-area-inset-right,0px));display:flex;flex-direction:column;gap:28px}
.label{font-size:.75rem;font-weight:700;letter-spacing:.12em;text-transform:uppercase;color:var(--muted)}
.sheet{background:var(--paper);box-shadow:0 1px 2px rgba(0,0,0,.08),0 12px 32px rgba(0,0,0,.10);border-radius:4px}
.poster{aspect-ratio:8.5/11;max-width:100%;padding:7% 8%;display:flex;flex-direction:column;gap:4%;position:relative;overflow:hidden;box-sizing:border-box}
.poster::before{content:"";position:absolute;inset:0 0 auto 0;height:2.2%;background:var(--gold)}
.tag{font-size:clamp(.7rem,1.8vw,.95rem);font-weight:700;letter-spacing:.14em;text-transform:uppercase;color:var(--gold-ink)}
.poster h1{font-family:var(--display);font-weight:800;text-transform:uppercase;font-size:clamp(2.6rem,10vw,5.6rem);line-height:.9;margin:0;letter-spacing:.005em}
.poster h1 em{font-style:normal;background:var(--gold);padding:0 .12em}
.mid{display:grid;grid-template-columns:1.1fr 1fr;gap:6%;align-items:center;flex:1}
.qrbox{border:3px solid var(--ink);border-radius:14px;padding:6%;background:#fff}
.qrbox svg{display:block;width:100%;height:auto}
.scan{font-family:var(--display);font-weight:800;font-size:clamp(1.3rem,4.4vw,2.4rem);text-transform:uppercase;line-height:1;margin:0 0 4%}
ul{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:clamp(6px,1.6vw,14px);font-size:clamp(.8rem,2.2vw,1.15rem);line-height:1.3}
ul li{display:flex;gap:10px}
ul b{font-family:var(--display);font-size:1.3em;color:var(--gold-ink);line-height:1}
.bottom{display:flex;justify-content:space-between;align-items:flex-end;gap:12px;border-top:2px solid var(--ink);padding-top:3%;font-size:clamp(.62rem,1.6vw,.85rem);color:var(--muted)}
.brand{font-family:var(--display);font-weight:800;font-size:clamp(1.2rem,3.4vw,1.9rem);color:var(--ink);text-transform:uppercase;display:flex;align-items:center;gap:8px}
.brand i{font-style:normal;background:var(--gold);width:1.1em;height:1.1em;border-radius:.22em;display:grid;place-items:center;font-size:.8em}
.stickers{padding:5%;display:grid;grid-template-columns:repeat(3,1fr);gap:14px}
.st{border:2px dashed var(--line);border-radius:10px;padding:10px;display:flex;flex-direction:column;align-items:center;gap:6px;text-align:center}
.st svg{width:100%;height:auto;display:block}
.st .q{font-size:clamp(.62rem,1.7vw,.8rem);color:var(--muted);font-weight:500}
.st .n{font-family:var(--display);font-weight:800;font-size:clamp(.95rem,2.8vw,1.35rem);text-transform:uppercase;line-height:1}
.locs{display:flex;flex-wrap:wrap;gap:8px}
.loc{border:1.5px solid #B9BCC4;background:var(--paper);color:var(--ink);border-radius:999px;padding:8px 14px;font:700 .85rem var(--body);cursor:pointer}
.loc[aria-pressed="true"]{background:var(--ink);color:#fff;border-color:var(--ink)}
.code{font-weight:700;letter-spacing:.08em;color:var(--ink)}
.note{font-size:.9rem;color:var(--ink);line-height:1.5;max-width:62ch}
@media (max-width:520px){.mid{grid-template-columns:1fr}.qrbox{max-width:70%}.stickers{grid-template-columns:repeat(2,1fr)}}
</style>
<div class="wrap">
<span class="label">Poster · 8.5 × 11 in · pick where it will hang</span>
<div class="locs" role="group" aria-label="Poster location">${LOCS.map(([k,l],i)=>`<button class="loc" data-k="${k}" aria-pressed="${i===0}">${l}</button>`).join("")}</div>
<div class="sheet poster">
  <span class="tag">UCCS students · Rec Center</span>
  <h1>Feeling lost in the <em>gym?</em></h1>
  <div class="mid">
    <div class="qrbox" role="img" aria-label="QR code that opens First Rep">${s["poster-poster"]}</div>
    <div><p class="scan">Scan for your plan in under a minute</p>
      <ul><li><b>1</b><span>A short workout plan made for your goal</span></li>
      <li><b>2</b><span>How to use every machine, step by step</span></li>
      <li><b>3</b><span>The quietest times to go</span></li>
      <li><b>✓</b><span>No account. No download. Free for students.</span></li></ul></div>
  </div>
  <div class="bottom"><span class="brand"><i>1</i>First Rep</span><span><span id="loc-code" class="code">Code: GENERAL</span><br>Student project · not an official UCCS app</span></div>
</div>
<span class="label">Machine stickers · cut along the dashed lines</span>
<div class="sheet stickers">${M.map(([id,n])=>`<div class="st"><span class="q">How do I use the</span><span class="n">${n}?</span><div role="img" aria-label="QR code for the ${n} guide">${s["machine-"+id]}</div><span class="q">Scan me</span></div>`).join('')}</div>
<p class="note">Each location gets its own QR code, so you can see which posters bring students in. Print the version that matches where the poster will hang. Files: <b>first-rep-qr-codes/qr-poster-&lt;location&gt;.png</b>.</p>
<p class="note">Each sticker opens that machine's guide directly, with no setup. The big poster opens the 3-question plan.</p>
</div>
<script>
const QRS=${JSON.stringify(Object.fromEntries(LOCS.map(([k,l])=>[k,{svg:s["poster-"+k],label:l}])))};
document.addEventListener("click",e=>{const b=e.target.closest(".loc"); if(!b) return; const q=QRS[b.dataset.k]; document.querySelector(".qrbox").innerHTML=q.svg; document.getElementById("loc-code").textContent="Code: "+(b.dataset.k==="poster"?"GENERAL":b.dataset.k.toUpperCase()); document.querySelectorAll(".loc").forEach(x=>x.setAttribute("aria-pressed",x===b));});
</script>`;
fs.writeFileSync(dir+'/first-rep-posters.html',html); console.log('ok',html.length);
