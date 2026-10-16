const test=require('node:test'),assert=require('node:assert/strict'),vm=require('node:vm'),fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..');
function component(name,extras={}){const context={window:{},URL,...extras};vm.runInNewContext(fs.readFileSync(path.join(root,'assets/js',name+'.js'),'utf8'),context);return context.window;}
test('profile, category and venue type filters intersect',()=>{const {GuideExperiences}=component('experiences');const items=[{tags:['food'],sub:'meal',tipo:'pizza'},{tags:['food'],sub:'meal',tipo:'sushi'},{tags:['cultura'],sub:'museum'}];assert.equal(GuideExperiences.filter(items,'food','meal','pizza').length,1);assert.equal(GuideExperiences.filter(items,null,null,null).length,3);assert.equal(GuideExperiences.filter(items,'cultura','meal',null).length,0);});
test('storage recovers from corrupt data and keeps a memory fallback when blocked',()=>{let fail=false;const values=new Map([['city_preferiti','{broken']]);const {GuideStorage}=component('storage',{localStorage:{getItem:key=>{if(fail)throw Error();return values.get(key)??null;},setItem:(key,value)=>{if(fail)throw Error();values.set(key,value);}},document:{dispatchEvent(){}},Event:class{}});assert.equal(GuideStorage.read('city_preferiti','fallback'),'fallback');GuideStorage.write('city_lingua','en');assert.equal(GuideStorage.read('city_lingua','it'),'en');fail=true;assert.equal(GuideStorage.write('city_plan',['roma-001']),false);assert.equal(GuideStorage.read('city_plan',[])[0],'roma-001');assert.equal(GuideStorage.unavailable,true);});
test('external links reject script and non-HTTPS schemes; HTML is escaped',()=>{const {GuideUI}=component('ui');assert.equal(GuideUI.safeUrl('javascript:alert(1)'),'#');assert.equal(GuideUI.safeUrl('https://example.com/'),'https://example.com/');assert(!GuideUI.escape('<img onerror="x">').includes('<'));});

test('keyword search works without choosing an interest, with aliases and compound words',()=>{
 const {GuideExperiences}=component('experiences');
 const items=[{t:'Collezione archeologica|Archaeological collection',p:'Visita le sale|Visit the rooms',z:'Centro|Centre',sub:'musei',tags:['cultura']},{t:'Una pausa|A break',p:'Caffè|Coffee',z:'Nord|North',sub:'dolci',tags:['food']},{t:'Passeggiata|Walk',p:'Alberi|Trees',z:'Sud|South',sub:'parchi',tags:['lento']}];
 assert.equal(GuideExperiences.search(items,'musei').length,1);assert.equal(GuideExperiences.search(items,'un museo in centro').length,1);
 assert.equal(GuideExperiences.search(items,'cibo').length,1);assert.equal(GuideExperiences.search(items,'caffe').length,1);
 assert.equal(GuideExperiences.search(items,'giardino').length,1);assert.equal(GuideExperiences.search(items,'museum nord').length,0);
 assert.equal(GuideExperiences.search(items,'').length,3);
});

test('all cities cover every time, interest and indoor combination with curated variants',()=>{
 const {GuideTourRules}=component('tour-rules');let combinations=0;
 for(const file of fs.readdirSync(path.join(root,'data/cities'))){
  const data=JSON.parse(fs.readFileSync(path.join(root,'data/cities',file),'utf8'));
  for(const time of [90,120,180,240])for(const mood of ['architecture','art','nature','food','memory'])for(const weather of ['','mixed']){
   const selected=GuideTourRules.select(data.TOURS,{time,mood,weather});
   assert(selected.length>=1,file+' '+JSON.stringify({time,mood,weather}));
   assert(selected.some(t=>t.minutes===time),'A curated version for each duration');
   for(const tour of selected){assert(tour.minutes<=time);assert.equal(tour.mood,mood);if(weather==='mixed'&&tour.variants)assert(tour.stops.some(id=>tour.indoorStops.includes(id)));}
   combinations++;
  }
 }
 assert.equal(combinations,320);
 assert.equal(GuideTourRules.select([{mood:'art',weather:'mixed',minutes:180,stops:['a','b','c']}],{time:90}).length,0,'Never truncate a route without an authored variant');
});

test('every audience has exact matches across time, interest and indoor preferences',()=>{
 const {GuideTourRules}=component('tour-rules'),audiences=Object.keys(component('tour-audiences').GuideTourAudiences);let checked=0;
 for(const file of fs.readdirSync(path.join(root,'data/cities'))){
  const data=JSON.parse(fs.readFileSync(path.join(root,'data/cities',file),'utf8'));
  for(const audience of audiences)for(const time of [90,120,180,240])for(const weather of ['','mixed'])for(const mood of ['architecture','art','nature','food','memory']){
   const exact=GuideTourRules.select(data.TOURS,{audience,time,weather,mood});
   assert(exact.length,file+' has an exact audience and interest match');assert(exact.every(t=>t.mood===mood));
   const selected=exact.length?exact:GuideTourRules.select(data.TOURS,{audience,time,weather,mood:''});
   assert(selected.length,file+' '+JSON.stringify({audience,time,weather,mood}));
   for(const t of selected){assert(t.audiences.includes(audience));assert(t.minutes<=time);if(weather==='mixed')assert.equal(t.weather,'mixed');}
   checked++;
  }
 }
 assert.equal(checked,2560);
});

test('photo rendering escapes captions and preserves linked attribution',()=>{
 const {GuideUI}=component('ui');const {GuidePhotos}=component('photos',{GuideUI});
 const photo={src:'assets/images/place.jpg',alt:'A "place" <view>|A view',author:'A & B',source:'https://commons.wikimedia.org/wiki/File:Test.jpg',license:'CC BY-SA 4.0',licenseUrl:'https://creativecommons.org/licenses/by-sa/4.0/',width:960,height:640};
 const figure=GuidePhotos.figure(photo,value=>value.split('|')[0],'../');
 assert(figure.includes('src="../assets/images/place.jpg"'));assert(figure.includes('&lt;view&gt;'));assert(figure.includes('A &amp; B'));assert(figure.includes('CC BY-SA 4.0'));assert(figure.includes('loading="lazy"'));
});

test('trip exports handle leap dates, UTF-8 folding, escaped content and missing prices',()=>{
 const {GuideTrip}=component('trip',{TextEncoder,URLSearchParams,document:{documentElement:{lang:'it'}},GuideUI:{safeUrl:v=>v}});
 assert(GuideTrip.validDate('2028-02-29'));assert(!GuideTrip.validDate('2026-02-29'));
 const items=[{id:'test-001',t:'Città, arte; '+ 'è'.repeat(100),z:'Centro',d:'1 h',p:'<script>bad</script>',tip:'Acqua',cost:{amount:12},location:{mapQuery:'A & B, città'},source:{url:'https://example.com/'}},{id:'test-002',t:'Seconda',z:'Nord',cost:{amount:null},location:{mapQuery:'Fine'}}];
 const budget=GuideTrip.budget(items);assert.equal(budget.total,12);assert.equal(budget.missing,1);
 const url=new URL(GuideTrip.directions(items));assert.equal(url.searchParams.get('origin'),'A & B, città');assert.equal(url.searchParams.get('travelmode'),'walking');
 const calendar=GuideTrip.calendar({date:'2028-02-29',city:'Roma',items,tr:v=>v,url:'https://example.com/'});
 assert(calendar.includes('DTEND;VALUE=DATE:20280301'));assert(calendar.includes('Città\\, arte\\;'));
 for(const line of calendar.split('\r\n'))assert(Buffer.byteLength(line)<=75);
 assert.throws(()=>GuideTrip.calendar({date:'2026-02-29'}));
 const offline=GuideTrip.offline({city:'Roma',items:items.slice(0,1),tr:v=>v,transportUrl:'https://example.com/',date:'2028-02-29'});
 assert(!offline.includes('<script>'));assert(offline.includes('&lt;script&gt;'));
});

