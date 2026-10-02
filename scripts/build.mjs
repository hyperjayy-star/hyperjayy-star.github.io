import {readFile,writeFile} from 'node:fs/promises';
import {render} from '../render.mjs';
const read=async name=>JSON.parse(await readFile(new URL('../data/'+name+'.json',import.meta.url),'utf8'));
const [site,portfolio]=await Promise.all(['site','portfolio'].map(read));
const template=await readFile(new URL('../index.template.html',import.meta.url),'utf8');
await writeFile(new URL('../index.html',import.meta.url),template.replace('<!-- CONTENT -->',render({site,portfolio})));
console.log('Built static fallback from JSON.');
