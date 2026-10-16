const fs=require('node:fs'),path=require('node:path');
const root=path.resolve(__dirname,'..'),target=path.join(root,'dist');
fs.mkdirSync(target,{recursive:true});
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html')||['favicon.ico','manifest.webmanifest','service-worker.js','robots.txt','sitemap.xml'].includes(f)))fs.copyFileSync(path.join(root,file),path.join(target,file));
for(const directory of ['assets','esperienze','en'])fs.cpSync(path.join(root,directory),path.join(target,directory),{recursive:true});
console.log('Static site built in dist/');
