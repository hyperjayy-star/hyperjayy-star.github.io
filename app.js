import {render} from './render.mjs';
async function refreshContent(){
 try {
  const responses=await Promise.all(['site','portfolio'].map(name=>fetch(`/data/${name}.json`,{cache:'no-cache'})));
  if(responses.some(r=>!r.ok))return;
  const [site,portfolio]=await Promise.all(responses.map(r=>r.json()));
  if(typeof site.contact_email!=='string'||!Array.isArray(portfolio))return;
  document.querySelector('main').innerHTML=render({site,portfolio});
 }catch{ /* The pre-rendered page remains available offline. */ }
}
window.addEventListener('keydown',e=>{if(e.key==='Escape'&&location.hash==='#portfolio'){location.hash='top';document.querySelector('.portfolio-button')?.focus();}});
window.addEventListener('hashchange',()=>{if(location.hash==='#portfolio')document.querySelector('.close-panel')?.focus();else document.querySelector('.portfolio-button')?.focus();});
refreshContent();
