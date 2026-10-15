const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const root = path.resolve(__dirname, '..');
const cities = ['roma','napoli','milano','cagliari','torino','firenze','venezia'];
let total = 0;
for (const city of cities) {
 let data;
 vm.runInNewContext(fs.readFileSync(path.join(root, 'assets/js/cities', city+'.js'), 'utf8'), {Guide:{init(value){data=value;}}});
 const ids = new Set(data.PROFILI.map(p=>p.id));
 const titles = new Set();
 for (const experience of data.ESPERIENZE) {
  if (titles.has(experience.t)) throw Error('Duplicate experience: '+city);
  titles.add(experience.t);
  if (!experience.tags.every(tag=>ids.has(tag))) throw Error('Unknown profile: '+city);
  for (const field of ['t','z','d','p','tip']) if(typeof experience[field]!=='string' || !experience[field].includes('|')) throw Error('Missing translation: '+city+'/'+field);
 }
 for (const id of ids) if(!data.ITINERARI[id]?.length || !data.SOTTO[id]?.length) throw Error('Missing itinerary/category: '+city+'/'+id);
 total += data.ESPERIENZE.length;
}
for (const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))) {
 const html=fs.readFileSync(path.join(root,file),'utf8');
 for (const match of html.matchAll(/(?:src|href)="([^"#]+)"/g)) {
  if(!/^(https?:|data:)/.test(match[1]) && !fs.existsSync(path.join(root,match[1]))) throw Error('Broken local reference: '+file+'/'+match[1]);
 }
}
for (const file of fs.readdirSync(path.join(root,'assets/js')).filter(f=>f.endsWith('.js'))) new vm.Script(fs.readFileSync(path.join(root,'assets/js',file),'utf8'));
console.log('OK: 8 pages, 7 city datasets, '+total+' experiences, translations and local references.');
