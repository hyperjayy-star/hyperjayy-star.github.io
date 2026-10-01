const lanes = [
  {key:'agency',index:'01',eyebrow:'NEW FACE / AGENCY',title:'CLEAN.\nDIRECT.\nVERSATILE.',desc:'Headshots, digitals, full-body, profile and clean fundamentals.',theme:'lane-light',cta:'VIEW AGENCY CARD'},
  {key:'fashion',index:'02',eyebrow:'FASHION / EDITORIAL',title:'FORM.\nTAILORING.\nATTITUDE.',desc:'Runway, suiting, monochrome portraiture and sharper editorial work.',theme:'lane-dark',cta:'VIEW FASHION CARD'},
  {key:'modern',index:'03',eyebrow:'MODERN / STREET',title:'YOUTH.\nDENIM.\nCULTURE.',desc:'Black fits, denim, streetwear, movement and current styling.',theme:'lane-warm',cta:'VIEW MODERN CARD'},
  {key:'commercial',index:'04',eyebrow:'LIFESTYLE / COMMERCIAL',title:'NATURAL.\nOPEN.\nACCESSIBLE.',desc:'Approachable portraits, denim, body work and everyday campaign energy.',theme:'lane-light',cta:'VIEW COMMERCIAL CARD'},
  {key:'movement',index:'05',eyebrow:'ATHLETIC / MOVEMENT',title:'SPEED.\nPOWER.\nMOTION.',desc:'Sport, training, basketball and campaign-ready movement.',theme:'lane-dark',cta:'VIEW MOVEMENT CARD'},
];

const laneAliases = {
  'Agency / New Face':'agency','Fashion / Editorial':'fashion','Modern / Street':'modern',
  'Lifestyle / Commercial':'commercial','Body / Beauty':'commercial','Athletic / Movement':'movement','Runway':'fashion'
};

async function loadJSON(path, fallback){
  try{const r=await fetch(path,{cache:'no-store'});if(!r.ok)throw new Error();return await r.json()}catch{return fallback}
}
const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]));
const asset=(path,alt='',cls='')=>path?`<img class="${cls}" src="${esc(path)}" alt="${esc(alt)}" loading="lazy">`:'';

async function init(){
  const [site,portfolio,projects,comps,links] = await Promise.all([
    loadJSON('data/site.json',{}),loadJSON('data/portfolio.json',[]),loadJSON('data/projects.json',[]),
    loadJSON('data/comp-cards.json',[]),loadJSON('data/links.json',[])
  ]);

  if(site.hero_kicker) document.getElementById('hero-kicker').textContent=site.hero_kicker;
  if(site.hero_subline) document.getElementById('hero-subline').textContent=site.hero_subline;
  if(site.intro) document.getElementById('intro-copy').textContent=site.intro;
  if(site.contact_email){const a=document.getElementById('contact-email');a.textContent=site.contact_email;a.href=`mailto:${site.contact_email}`;}
  if(site.hero_video){
    const wrap=document.getElementById('hero-media');wrap.innerHTML=`<video autoplay muted loop playsinline poster="${esc(site.hero_poster||'')}"><source src="${esc(site.hero_video)}"></video>`;
  }else if(site.hero_poster){document.getElementById('hero-media').innerHTML=asset(site.hero_poster,'Jaiden Ortiz hero portrait');}

  renderBoard(portfolio.filter(x=>x.visible!==false).sort((a,b)=>(a.order||99)-(b.order||99)).slice(0,5));
  renderLanes(portfolio.filter(x=>x.visible!==false),comps);
  renderProjects(projects.filter(x=>x.visible!==false));
  renderStats(site.stats||{});
  renderComps(comps.filter(x=>x.visible!==false));
  renderLinks(links.filter(x=>x.visible!==false),site);
  setupReveal();
}

function renderBoard(items){
  const labels=['NEW FACE','FASHION','MODERN','LIFESTYLE','MOVEMENT'];
  const board=document.getElementById('board-canvas');
  board.innerHTML=labels.map((label,i)=>{
    const p=items[i]||{};
    return `<article class="board-card reveal"><div class="board-image">${asset(p.image,p.alt||p.title||label)}</div><div class="board-label"><span>${String(i+1).padStart(2,'0')} / ${esc(p.short_label||label)}</span><span class="board-number">${esc(p.client||'')}</span></div></article>`;
  }).join('')+`<i class="thread a"></i><i class="thread b"></i><i class="thread c"></i><i class="thread d"></i>`;
}

function renderLanes(portfolio,comps){
  const root=document.getElementById('lanes');
  root.innerHTML=lanes.map(l=>{
    const imgs=portfolio.filter(p=>(laneAliases[p.category]||p.category)===l.key).sort((a,b)=>(a.order||99)-(b.order||99)).slice(0,2);
    const comp=comps.find(c=>(c.key||'').toLowerCase()===l.key || (c.market||'').toLowerCase().includes(l.key==='commercial'?'commercial':l.key));
    const gallery=[0,1].map((n)=>{
      const p=imgs[n]||{}; const cls=n===0?'lane-photo':'lane-photo';
      return `<div class="${cls}${p.image?'':' empty'}" data-label="${esc(p.title||(n===0?'PRIMARY IMAGE':'SECONDARY IMAGE'))}">${asset(p.image,p.alt||p.title||'')}</div>`;
    }).join('');
    const href=comp?.pdf||'#stats';
    return `<section class="lane ${l.theme}" id="${l.key}"><div class="lane-index">${l.index}</div><div class="lane-copy reveal"><p class="eyebrow">${l.eyebrow}</p><h2>${l.title.replaceAll('\n','<br>')}</h2><p class="desc">${l.desc}</p><a class="lane-cta" href="${esc(href)}" ${comp?.pdf?'target="_blank" rel="noopener"':''}>${l.cta} ↗</a></div><div class="lane-gallery reveal">${gallery}</div></section>`;
  }).join('');
}

function renderProjects(projects){
  const sorted=[...projects].sort((a,b)=>(a.order||99)-(b.order||99));
  const featured=sorted.find(x=>x.featured)||sorted[0];
  if(featured){
    const media=document.getElementById('runway-media');
    if(featured.video) media.innerHTML=`<video controls playsinline poster="${esc(featured.hero_image||'')}"><source src="${esc(featured.video)}"></video>`;
    else if(featured.hero_image) media.innerHTML=asset(featured.hero_image,featured.title||'Runway project');
  }
  document.getElementById('runway-list').innerHTML=(sorted.length?sorted.slice(0,5):[{title:'RUNWAY PROJECT',type:'Runway',date:'',client:''}]).map(p=>`<article class="runway-item reveal"><span class="type">${esc(p.type||'PROJECT')}</span><h3>${esc(p.title||'Untitled')}</h3><div class="meta">${[p.client,p.date,p.location].filter(Boolean).map(esc).join(' · ')}</div></article>`).join('');
}

function renderStats(stats){
  const values=[['HEIGHT',stats.height||`5'11"`],['CHEST',stats.chest||'38"'],['WAIST',stats.waist||'30"'],['INSEAM',stats.inseam||'31"'],['SHOE',stats.shoe||'—'],['JACKET',stats.jacket||'—']];
  document.getElementById('stat-grid').innerHTML=values.map(([k,v])=>`<div class="stat"><span class="key">${k}</span><strong class="value">${esc(v)}</strong></div>`).join('');
}

function renderComps(comps){
  const defaults=[{name:'AGENCY',market:'Agency / New Face'},{name:'FASHION',market:'Fashion / Editorial'},{name:'COMMERCIAL',market:'Commercial / Lifestyle'},{name:'MOVEMENT',market:'Athletic / Movement'}];
  const list=comps.length?comps.sort((a,b)=>(a.order||99)-(b.order||99)):defaults;
  document.getElementById('comp-grid').innerHTML=list.slice(0,4).map((c,i)=>{const tag=c.pdf?'a':'div';const attrs=c.pdf?`href="${esc(c.pdf)}" target="_blank" rel="noopener"`:'';return `<${tag} class="comp-card reveal" ${attrs}>${asset(c.cover,c.name||c.market||'Comp card')}<span class="market">${esc(c.market||c.name||'COMP CARD')}</span><strong class="name">${esc(c.name||`COMP CARD ${String(i+1).padStart(2,'0')}`)}</strong><span class="download">${c.pdf?'OPEN PDF ↗':'PDF COMING SOON'}</span></${tag}>`;}).join('');
}

function renderLinks(links,site){
  const built=[
    {title:'PORTFOLIO',url:'#work'},
    {title:'COMP CARDS',url:'#stats'},
    {title:'RUNWAY',url:'#runway'}
  ];
  if(site.instagram_url) built.push({title:'INSTAGRAM',url:site.instagram_url});
  built.push({title:'EMAIL',url:`mailto:${site.contact_email||'contact@jaidenortiz.com'}`});
  const merged=links.length?links.sort((a,b)=>(a.order||99)-(b.order||99)):built;
  document.getElementById('link-list').innerHTML=merged.map((l,i)=>`<a class="link-row" href="${esc(l.url||'#')}" ${l.url?.startsWith('http')?'target="_blank" rel="noopener"':''}><span class="idx">${String(i+1).padStart(2,'0')}</span><strong>${esc(l.title||'LINK')}</strong><b>↗</b></a>`).join('');
}

function setupReveal(){
  const els=[...document.querySelectorAll('.reveal')];
  if(!('IntersectionObserver' in window)){els.forEach(x=>x.classList.add('is-visible'));return}
  const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('is-visible');io.unobserve(e.target)}}),{threshold:.12});
  els.forEach(el=>io.observe(el));
}

document.addEventListener('DOMContentLoaded',init);