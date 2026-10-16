const fs=require('node:fs'),path=require('node:path'),crypto=require('node:crypto'),sharp=require('sharp');
const root=path.resolve(__dirname,'..'),out=path.join(root,'assets/images/responsive');fs.mkdirSync(out,{recursive:true});
const read=name=>JSON.parse(fs.readFileSync(path.join(root,'data',name),'utf8'));
const photos=[...Object.values(read('item-photos.json')),...Object.values(read('photos.json'))];
const sources=[...new Set(photos.map(p=>p.src))],manifest={};let original=0,largest=0;
async function convert(src){
 const input=fs.readFileSync(path.join(root,src)),meta=await sharp(input).metadata();original+=input.length;
 const variants=[];
 for(const width of [480,960]){
  const {data,info}=await sharp(input).rotate().resize({width:Math.min(width,meta.width),withoutEnlargement:true}).webp({quality:76,effort:5}).toBuffer({resolveWithObject:true});
  const hash=crypto.createHash('sha256').update(data).digest('hex'),file=hash.slice(0,20)+'.webp';
  fs.writeFileSync(path.join(out,file),data);variants.push({src:'assets/images/responsive/'+file,width:info.width,height:info.height,bytes:data.length,sha256:hash});
 }
 manifest[src]={webp:variants};largest+=variants.at(-1).bytes;
}
(async()=>{let index=0;await Promise.all(Array.from({length:3},async()=>{while(index<sources.length){const src=sources[index++];await convert(src);}}));
 fs.writeFileSync(path.join(root,'data/image-variants.json'),JSON.stringify(Object.fromEntries(Object.entries(manifest).sort()),null,2)+'\n');
 console.log(JSON.stringify({photos:sources.length,originalBytes:original,webp960Bytes:largest,reductionPercent:Math.round((1-largest/original)*100)},null,2));
})().catch(e=>{console.error(e);process.exitCode=1;});
