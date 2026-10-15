window.GuidePhotos = {
  image(photo, tr, prefix = '') {
    const escape = GuideUI.escape;
    return `<img src="${escape(prefix + photo.src)}" alt="${escape(tr(photo.alt))}" width="${photo.width}" height="${photo.height}" loading="lazy" decoding="async">`;
  },
  caption(photo, tr) {
    const escape = GuideUI.escape;
    return `<span class="photo-subject">${escape(tr(photo.alt))}</span><span class="photo-attribution">${escape(photo.author)} · ${GuideUI.external(photo.source,tr('Originale|Original'))} · ${GuideUI.external(photo.licenseUrl,photo.license)}</span>`;
  },
  figure(photo, tr, prefix = '') {
    return `<figure class="item-photo">${this.image(photo,tr,prefix)}<figcaption>${this.caption(photo,tr)}</figcaption></figure>`;
  }
};
