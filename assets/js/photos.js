window.GuidePhotos = {
  image(photo, tr, prefix = '',sizes='(max-width: 660px) 92vw, (max-width: 1000px) 46vw, 340px') {
    const escape = GuideUI.escape;
    const base=typeof document!=='undefined'&&document.body.dataset.assetPrefix || prefix;
    const img=`<img src="${escape(base + photo.src)}" alt="${escape(tr(photo.alt))}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">`;
    return photo.variants?.webp ? `<picture><source type="image/webp" srcset="${photo.variants.webp.map(v=>escape(base+v.src)+' '+v.width+'w').join(', ')}" sizes="${escape(sizes)}">${img}</picture>` : img;
  },
  caption(photo, tr) {
    const escape = GuideUI.escape;
    return `<span class="photo-subject">${escape(tr(photo.alt))}</span><span class="photo-attribution">${escape(photo.author)} · ${GuideUI.external(photo.source,tr('Originale|Original'))} · ${GuideUI.external(photo.licenseUrl,photo.license)}</span>`;
  },
  figure(photo, tr, prefix = '') {
    return `<figure class="item-photo">${this.image(photo,tr,prefix,'(max-width: 600px) 92vw, 560px')}<figcaption>${this.caption(photo,tr)}</figcaption></figure>`;
  }
};
