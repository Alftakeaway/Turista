const fs=require('node:fs'),path=require('node:path'),cheerio=require('cheerio');
const root=path.resolve(__dirname,'..'),origin='https://turista-rho.vercel.app';
const read=file=>JSON.parse(fs.readFileSync(path.join(root,file),'utf8'));
const variants=read('data/image-variants.json'),cities=fs.readdirSync(path.join(root,'data/cities')).map(file=>read('data/cities/'+file));
const items=Object.fromEntries(cities.flatMap(d=>[...d.ESPERIENZE,...d.TOUR_STOPS].map(item=>[item.id,{item,data:d}])));
const photos=read('data/photos.json'),itemPhotos=read('data/item-photos.json'),pages=[];
const tr=(value,lang)=>String(value).split('|')[lang==='en'?1:0]??String(value).split('|')[0];
const clean=value=>String(value).replace(/<[^>]+>/g,'').replace(/\s+/g,' ').trim();
const local=(file,target)=>path.posix.relative(path.posix.dirname(file),target)||path.posix.basename(target);
function translate($,file){
 $('[data-text]').each((_,node)=>$(node).text(tr($(node).attr('data-text'),'en')));
 $('[data-alt]').each((_,node)=>$(node).attr('alt',tr($(node).attr('data-alt'),'en')));
 const data=cities.find(d=>d.city.id===$('body').attr('data-city'));
 if(data&&!$('body').attr('data-detail')&&!$('body').attr('data-food-guide')){
  const t=data.TESTI,set=(selector,value,html=false)=>$(selector)[html?'html':'text'](tr(value,'en'));
  ['nav1','nav2','nav3','nav4'].forEach((key,i)=>set('nav.menu a:nth-child('+(i+1)+')',t[key]));
  set('.hero .kicker',t.heroK);set('.hero h1',t.heroH1,true);set('.hero p',t.heroP);set('.cta .btn-p',t.cta1);set('.cta .btn-s',t.cta2);
  ['stat1','stat2','stat3'].forEach((key,i)=>set('.stats div:nth-child('+(i+1)+') span',t[key]));
  set('#esperienze h2',t.step2h);set('#info .kicker',t.infoK);set('#info h2',t.infoH);set('footer .wrap',t.footer,true);
  for(let i=1;i<=3;i++){set('.info-card:nth-child('+i+') h3',t['info'+i+'h']);set('.info-card:nth-child('+i+') p',t['info'+i+'p']);}
  const copy={'.skip-link':'Skip to experiences','.city-home':'← All cities','label[for="filter-search"]':'Search a place or keyword','label[for="filter-duration"]':'Estimated duration','label[for="filter-budget"]':'Cost and format','label[for="filter-area"]':'Area','#reset-filters':'Reset filters','#share-filters':'Share search','#chatBtn':'Frequently asked questions','.chat-head b':'Frequently asked questions','.chat-head small':'Preset answers'};
  for(const [selector,text]of Object.entries(copy))$(selector).text(text);
  $('nav.menu').attr('aria-label','Main navigation');$('#chipGrid').attr('aria-label','Optional interests');$('#chatPanel').attr('aria-label','Frequently asked questions');$('#chatText').attr('aria-label','Search a topic');
  $('noscript a').each((_,node)=>{const id=path.posix.basename($(node).attr('href'),'.html');if(items[id])$(node).text(tr(items[id].item.t,'en'));});
 }
 const entry=items[$('body').attr('data-id')];
 if(entry){
  const e=entry.item;$('#detail-content h1').text(tr(e.t,'en'));$('#detail-content>p').first().text(tr(e.p,'en'));
  const facts=[['Area',tr(e.z,'en')],['Estimated duration',tr(e.d,'en')],['Cost',tr(e.cost.note,'en')],['Booking',tr(e.booking.note,'en')],['Opening hours',tr(e.openingHours.text,'en')],['Accessibility',tr(e.accessibility.notes,'en')]];
  const dl=$('<dl class="facts"></dl>');for(const [label,value]of facts){dl.append($('<dt></dt>').text(label),$('<dd></dd>').text(value));}$('#detail-content').append(dl,$('<h2>Before you go</h2>'),$('<p></p>').text(tr(e.tip,'en')));
 }
 $('html').attr('lang','en');$('#langBtn').text('IT');
 return data;
}
function responsive($,file){
 $('img[src]').each((_,node)=>{
  const img=$(node),src=img.attr('src');if(/^(?:[a-z]+:|\/\/)/i.test(src))return;
  const key=path.posix.normalize(path.posix.join(path.posix.dirname(file),src)),options=variants[key]?.webp;if(!options)return;
  const picture=$('<picture></picture>'),source=$('<source type="image/webp">');
  const sizes=img.closest('.food-card').length?'(max-width: 560px) 92vw, (max-width: 850px) 46vw, 370px':img.closest('.food-market,.food-hero-photo').length?'(max-width: 560px) 92vw, 560px':img.closest('.destination-card').length?'(max-width: 540px) 92vw, (max-width: 1000px) 46vw, 280px':img.closest('.hero').length?'(max-width: 800px) 92vw, 480px':'(max-width: 1000px) 92vw, 936px';
  source.attr('srcset',options.map(v=>local(file,v.src)+' '+v.width+'w').join(', '));source.attr('sizes',sizes);
  img.wrap(picture);img.before(source);
  if(img.closest('.hero').length)img.attr({loading:'eager',fetchpriority:'high'});
 });
}
function metadata($,file,lang,baseFile){
 const data=cities.find(d=>d.city.id===$('body').attr('data-city')),entry=items[$('body').attr('data-id')],food=$('body').attr('data-food-guide');
 const url=origin+'/'+(file==='index.html'?'':file),itUrl=origin+'/'+(baseFile==='index.html'?'':baseFile),enUrl=origin+'/en/'+baseFile;
 const name=data?tr(data.city.name,lang):'Guide Poliedriche';
 const title=food?name+tr(' da assaggiare — piatti, locali e mercati| to taste — dishes, places and markets',lang):entry?tr(entry.item.t,lang)+' — '+name:file.endsWith('crediti.html')?tr('Foto, fonti e privacy|Photos, sources and privacy',lang)+' — Guide Poliedriche':data?name+tr(' — esperienze e tour originali| — experiences and original tours',lang):tr('Guide Poliedriche — otto città, il tuo passo|Guide Poliedriche — eight cities, your own pace',lang);
 const description=clean(food?tr('Scopri cosa mangiare a '+name+': specialità fotografate, ristoranti, pasticcerie, street food e mercati, con fonti e lista personale.|Discover what to eat in '+name+': photographed specialities, restaurants, pastry shops, street food and markets, with sources and your own tasting list.',lang):entry?tr(entry.item.p,lang):data?tr(data.TESTI.heroP,lang):file.endsWith('crediti.html')?tr('Fonti, licenze delle fotografie e informazioni sulla privacy di Guide Poliedriche.|Sources, photograph licences and privacy information for Guide Poliedriche.',lang):tr('Otto città italiane, tour originali, fonti ufficiali e strumenti utili in viaggio.|Eight Italian cities, original tours, official sources and useful travel tools.',lang)).slice(0,200);
 $('title').text(title);$('meta[name="description"]').remove();$('head').append($('<meta name="description">').attr('content',description));
 $('head').append($('<link rel="canonical">').attr('href',url));
 for(const [language,target]of [['it',itUrl],['en',enUrl],['x-default',itUrl]])$('head').append($('<link rel="alternate">').attr({hreflang:language,href:target}));
 const foodSrc=food?path.posix.normalize(path.posix.join(path.posix.dirname(file),$('.food-hero-photo img').attr('src'))):null;
 const foodPhoto=food?Object.values(read('data/food-photos.json')).find(p=>p.src===foodSrc):null;
 const photo=foodPhoto||(entry?itemPhotos[entry.item.id]:data?photos[data.city.id]:photos.roma);
 for(const [key,value]of Object.entries({'og:type':file==='index.html'||file==='en/index.html'?'website':'article','og:site_name':'Guide Poliedriche','og:title':title,'og:description':description,'og:url':url,'og:locale':lang==='en'?'en_GB':'it_IT','og:image':origin+'/'+photo.src,'og:image:alt':tr(photo.alt,lang)}))$('head').append($('<meta>').attr({property:key,content:value}));
 for(const [key,value]of Object.entries({'twitter:card':'summary_large_image','twitter:title':title,'twitter:description':description,'twitter:image':origin+'/'+photo.src}))$('head').append($('<meta>').attr({name:key,content:value}));
 const schema={'@context':'https://schema.org','@type':data&&!entry?'CollectionPage':'WebPage','@id':url,name:title,description,inLanguage:lang,isPartOf:{'@type':'WebSite','@id':origin+'/#website',name:'Guide Poliedriche',url:origin+'/'}};
 if(food)schema.mainEntity={'@type':'ItemList',itemListElement:$('.food-card').toArray().map((node,i)=>({'@type':'ListItem',position:i+1,name:$(node).find('h3').text(),url:url+'#'+$(node).attr('id')}))};
 else if(data&&!entry)schema.mainEntity={'@type':'ItemList',itemListElement:data.ESPERIENZE.map((item,i)=>({'@type':'ListItem',position:i+1,name:tr(item.t,lang),url:origin+'/'+(lang==='en'?'en/':'')+'esperienze/'+item.id+'.html'}))};
 $('head').append($('<script type="application/ld+json"></script>').text(JSON.stringify(schema).replace(/</g,'\\u003c')));
 $('head').append($('<link rel="manifest">').attr('href',local(file,'manifest.webmanifest')),$('<meta name="theme-color">').attr('content',data?read('data/themes.json')[data.city.id].brand:'#34434E'));
 $('head').append($('<script defer></script>').attr('src',local(file,'assets/js/app.js')));
 pages.push({file,url,lang,baseFile});
}
function englishLinks($,file,enFile){
 function target(value){if(!value||/^(?:[a-z]+:|\/\/|#)/i.test(value))return value;
  const [bare,...tail]=value.split(/(?=[?#])/),resolved=path.posix.normalize(path.posix.join(path.posix.dirname(file),bare));
  return local(enFile,resolved.endsWith('.html')?'en/'+resolved:resolved)+tail.join('');
 }
 $('[href],[src]').each((_,node)=>{for(const attribute of ['href','src'])if($(node).attr(attribute))$(node).attr(attribute,target($(node).attr(attribute)));});
 $('[srcset]').each((_,node)=>$(node).attr('srcset',$(node).attr('srcset').split(',').map(part=>{const [src,width]=part.trim().split(/\s+/);return target(src)+' '+width;}).join(', ')));
 $('body').attr('data-asset-prefix',path.posix.relative(path.posix.dirname(enFile),'.')+'/');
}
function publish(file,html){
 const it=cheerio.load(html,{scriptingEnabled:false});responsive(it,file);const en=cheerio.load(it.html(),{scriptingEnabled:false}),enFile='en/'+file;
 translate(en,file);englishLinks(en,file,enFile);metadata(it,file,'it',file);metadata(en,enFile,'en',file);
 fs.writeFileSync(path.join(root,file),it.html());fs.mkdirSync(path.dirname(path.join(root,enFile)),{recursive:true});fs.writeFileSync(path.join(root,enFile),en.html());
}
function finish(){
 const escape=s=>s.replace(/&/g,'&amp;').replace(/</g,'&lt;');
 const xml='<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">'+pages.map(p=>'<url><loc>'+escape(p.url)+'</loc><xhtml:link rel="alternate" hreflang="it" href="'+origin+'/'+(p.baseFile==='index.html'?'':p.baseFile)+'"/><xhtml:link rel="alternate" hreflang="en" href="'+origin+'/en/'+p.baseFile+'"/></url>').join('\n')+'</urlset>\n';
 fs.writeFileSync(path.join(root,'sitemap.xml'),xml);fs.writeFileSync(path.join(root,'robots.txt'),'User-agent: *\nAllow: /\nSitemap: '+origin+'/sitemap.xml\n');
}
module.exports={publish,finish,decoratePhoto:photo=>({...photo,variants:variants[photo.src]})};
