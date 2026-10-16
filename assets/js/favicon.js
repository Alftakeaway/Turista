// Original globe artwork. No libraries, network services or tracking.
(function () {
  const script=document.currentScript;
  const icon=document.getElementById('site-icon');
  if(!script||!icon||!window.matchMedia)return;
  const reduced=window.matchMedia('(prefers-reduced-motion: reduce)');
  const fallback=icon.href;
  const texture=document.createElement('canvas');texture.width=1024;texture.height=512;
  const surface=document.createElement('canvas');surface.width=surface.height=64;
  const source=texture.getContext('2d',{willReadFrequently:true}),context=surface.getContext('2d');
  if(!source||!context)return;
  const map=new Image(),frames=new Map();let pixels,timer,frame=0,stopped=false;
  function render(index){
    if(frames.has(index))return frames.get(index);
    const image=context.createImageData(64,64),angle=index*Math.PI*2/48+0.3;
    for(let y=0;y<64;y++)for(let x=0;x<64;x++){
      const nx=(x+0.5-32)/30,ny=(y+0.5-32)/30,r=nx*nx+ny*ny;
      if(r>1)continue;
      const z=Math.sqrt(1-r),longitude=Math.atan2(nx,z)+angle,latitude=Math.asin(-ny);
      const u=Math.floor(((longitude/(2*Math.PI)+0.5)%1+1)%1*1024),v=Math.min(511,Math.floor((0.5-latitude/Math.PI)*512));
      const input=(v*1024+u)*4,output=(y*64+x)*4;
      const light=0.52+0.48*Math.max(0,-nx*0.35-ny*0.4+z*0.85);
      for(let c=0;c<3;c++)image.data[output+c]=Math.round(pixels[input+c]*light);
      image.data[output+3]=Math.round(Math.min(1,(1-r)*45)*255);
    }
    context.putImageData(image,0,0);
    const url=surface.toDataURL('image/png');frames.set(index,url);return url;
  }
  function tick(){
    clearTimeout(timer);
    if(stopped||!pixels||document.hidden||reduced.matches)return;
    try{icon.href=render(frame);frame=(frame+1)%48;timer=setTimeout(tick,250);}catch{icon.href=fallback;stopped=true;}
  }
  function sync(){clearTimeout(timer);if(reduced.matches){icon.href=fallback;return;}tick();}
  map.onload=()=>{try{source.drawImage(map,0,0,1024,512);pixels=source.getImageData(0,0,1024,512).data;sync();}catch{stopped=true;icon.href=fallback;}};
  map.onerror=()=>{stopped=true;};
  map.src=new URL('../icons/globe-map.svg',script.src).href;
  document.addEventListener('visibilitychange',sync);
  reduced.addEventListener?.('change',sync);
  window.addEventListener('pagehide',()=>clearTimeout(timer));
  window.addEventListener('pageshow',sync);
})();
