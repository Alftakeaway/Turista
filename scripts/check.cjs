const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const assert = require('node:assert/strict');
const root = path.resolve(__dirname, '..');
const bilingual = text => typeof text === 'string' && text.split('|').length === 2 && text.split('|').every(s=>s.trim());
const ids = new Set(); let total = 0;
for(const file of fs.readdirSync(path.join(root,'data/cities')).filter(f=>f.endsWith('.json'))){
 const data=JSON.parse(fs.readFileSync(path.join(root,'data/cities',file),'utf8'));
 const profiles=new Set(data.PROFILI.map(p=>p.id));
 let generated;vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js/cities',file.replace('.json','.js')),'utf8'),{Guide:{init(value){generated=value;}}});
 assert.equal(JSON.stringify(generated),JSON.stringify(data),'Generated data is stale: '+file);
 assert.equal(data.TOURS.length,3);
 const allItems=[...data.ESPERIENZE,...data.TOUR_STOPS];
 for(const tour of data.TOURS){assert(tour.original);assert(tour.stops.length>=3);assert(tour.stops.every(id=>allItems.some(e=>e.id===id)));assert(bilingual(tour.title));}
 for(const e of allItems){
  assert.match(e.id,new RegExp('^'+data.city.id+'-\\d{3}$'));assert(!ids.has(e.id),'Duplicate ID');ids.add(e.id);
  for(const key of ['t','z','d','p','tip'])assert(bilingual(e[key]),'Missing translation: '+e.id+'/'+key);
  assert(e.tags.every(tag=>profiles.has(tag)),'Unknown profile');
  assert(e.duration.minutes===null || Number.isInteger(e.duration.minutes)&&e.duration.minutes>0);
  assert(['variable','free','paid'].includes(e.cost.kind));assert(e.cost.amount===null||Number.isFinite(e.cost.amount)&&e.cost.amount>=0);
  assert(['city','operator','place'].includes(e.source.scope));assert.equal(new URL(e.source.url).protocol,'https:');
  for(const key of ['stepFree','accessibleToilets'])assert([true,false,null].includes(e.accessibility[key]));
  assert(e.accessibility.verifiedAt===null || e.accessibility.sourceUrl,'Accessibility needs a source');
  assert(e.cost.verifiedAt===null||e.cost.sourceUrl,'Price needs a source');
  assert(fs.existsSync(path.join(root,'esperienze',e.id+'.html')),'Missing detail page');total++;
 }
 for(const profile of profiles){assert(data.SOTTO[profile]?.length);assert(data.ITINERARI[profile]?.length);for(const step of data.ITINERARI[profile]){assert(bilingual(step.t),file+'/'+step.t);assert(bilingual(step.p));}}
 for(const answer of data.MARCO){assert(bilingual(answer.a));assert(answer.sourceUrl);}
}
const photos=JSON.parse(fs.readFileSync(path.join(root,'data/photos.json'),'utf8'));
for(const photo of Object.values(photos)){assert(fs.existsSync(path.join(root,photo.src)));assert(photo.author&&photo.license&&photo.source&&photo.licenseUrl);}
function walk(dir){return fs.readdirSync(dir,{withFileTypes:true}).flatMap(e=>e.name==='node_modules'||e.name==='.git'||e.name==='dist'?[]:e.isDirectory()?walk(path.join(dir,e.name)):[path.join(dir,e.name)]);}
for(const file of walk(root)){
 if(file.endsWith('.js')||file.endsWith('.cjs'))new vm.Script(fs.readFileSync(file,'utf8'),{filename:file});
 if(!file.endsWith('.html')||file.includes(path.sep+'templates'+path.sep))continue;
 const html=fs.readFileSync(file,'utf8');assert(!html.includes('{{'),'Unexpanded template: '+file);
 for(const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)){
  const target=match[1].split('?')[0].split('#')[0];
  if(/^(?:[a-z]+:|\/\/)/i.test(target))continue;
  assert(fs.existsSync(path.resolve(path.dirname(file),target)),'Broken link: '+file+' -> '+target);
 }
}
console.log('OK: '+total+' stable detail IDs, 8 cities, 24 original tours, bilingual data, generated pages, image credits, syntax and local references.');

const themes=JSON.parse(fs.readFileSync(path.join(root,'data/themes.json'),'utf8'));
function luminance(hex){const rgb=hex.match(/\w\w/g).map(v=>parseInt(v,16)/255).map(v=>v<=.04045?v/12.92:((v+.055)/1.055)**2.4);return rgb[0]*.2126+rgb[1]*.7152+rgb[2]*.0722;}
function contrast(a,b){const x=luminance(a),y=luminance(b);return(Math.max(x,y)+.05)/(Math.min(x,y)+.05);}
assert.equal(new Set(Object.values(themes).map(t=>t.brand)).size,8);assert.equal(new Set(Object.values(themes).map(t=>t.paper)).size,8);
for(const [city,t]of Object.entries(themes)){assert(contrast(t.brand,'#FFFFFF')>=4.5,city+' primary contrast');assert(contrast(t.muted,t.paper)>=4.5,city+' body contrast');assert(contrast(t.accent,'#FFFFFF')>=4.5,city+' accent contrast');}
console.log('OK: eight distinct palettes and text contrast.');
