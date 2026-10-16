const fs=require('node:fs'),path=require('node:path'),assert=require('node:assert/strict'),crypto=require('node:crypto'),cheerio=require('cheerio');
const root=path.resolve(__dirname,'..'),read=file=>fs.readFileSync(path.join(root,file),'utf8'),json=file=>JSON.parse(read(file));
const variants=json('data/image-variants.json');let original=0,webp=0;
for(const [src,formats]of Object.entries(variants)){
 original+=fs.statSync(path.join(root,src)).size;webp+=formats.webp.at(-1).bytes;
 assert.equal(formats.webp.length,2);
 for(const v of formats.webp){const bytes=fs.readFileSync(path.join(root,v.src));assert.equal(bytes.length,v.bytes);assert.equal(crypto.createHash('sha256').update(bytes).digest('hex'),v.sha256);assert(path.basename(v.src).startsWith(v.sha256.slice(0,20)));assert(v.width<=960);}
}
const files=[...fs.readdirSync(root).filter(f=>f.endsWith('.html')&&f!=='offline.html'),...fs.readdirSync(path.join(root,'esperienze')).filter(f=>f.endsWith('.html')).map(f=>'esperienze/'+f)];
const urls=[];
for(const file of files)for(const language of ['it','en']){
 const target=(language==='en'?'en/':'')+file,$=cheerio.load(read(target));
 assert.equal($('html').attr('lang'),language,target);
 const canonical='https://turista-rho.vercel.app/'+(target==='index.html'?'':target);urls.push(canonical);
 assert.equal($('link[rel="canonical"]').attr('href'),canonical,target);
 for(const lang of ['it','en','x-default'])assert.equal($('link[hreflang="'+lang+'"]').length,1,target);
 assert($('meta[property="og:title"]').attr('content'));assert.equal($('meta[property="og:url"]').attr('content'),canonical);assert.equal($('meta[name="twitter:card"]').attr('content'),'summary_large_image');
 assert.equal(JSON.parse($('script[type="application/ld+json"]').text()).inLanguage,language);
 assert($('meta[name="description"]').attr('content').length>20);assert($('h1').text().trim());assert($('link[rel="manifest"]').length);
 $('source[srcset]').each((_,node)=>{for(const candidate of $(node).attr('srcset').split(',')){const src=candidate.trim().split(/\s+/)[0];assert(fs.existsSync(path.resolve(root,path.dirname(target),src)),target+' picture '+src);}});
}
const sitemap=cheerio.load(read('sitemap.xml'),{xml:true}),listed=sitemap('loc').toArray().map(node=>sitemap(node).text());assert.deepEqual([...listed].sort(),urls.sort());assert.equal(new Set(listed).size,listed.length);assert(read('robots.txt').includes('Sitemap: https://turista-rho.vercel.app/sitemap.xml'));
const manifest=json('manifest.webmanifest');for(const icon of manifest.icons){const bytes=fs.readFileSync(path.join(root,icon.src)),size=Number(icon.sizes.split('x')[0]);assert.equal(bytes.readUInt32BE(16),size);assert.equal(bytes.readUInt32BE(20),size);}
const config=json('vercel.json'),headers=config.headers[0].headers;assert(headers.some(h=>h.key==='Content-Security-Policy'));assert(headers.some(h=>h.key==='Permissions-Policy'&&h.value.includes('geolocation=(self)')));
assert(config.headers.filter(h=>h.headers.some(v=>v.value.includes('immutable'))).every(h=>h.source.startsWith('/assets/images/responsive/')));
console.log('OK: '+urls.length+' indexable IT/EN pages, reciprocal language links, sitemap, structured data, responsive image checksums, install icons and scoped security/cache policies.');
console.log('Photo comparison: '+original+' original bytes → '+webp+' bytes for largest WebP variants ('+Math.round((1-webp/original)*100)+'% less). Originals retained.');
