(function () {
  const escape = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  function calendarText(value) { return String(value).replace(/\\/g, '\\\\').replace(/\r?\n/g, '\\n').replace(/,/g, '\\,').replace(/;/g, '\\;'); }
  function fold(line) {
    let result = '', current = '', bytes = 0;
    for (const character of line) {
      const size = new TextEncoder().encode(character).length;
      if (bytes + size > 73) { result += current + '\r\n '; current = ''; bytes = 1; }
      current += character; bytes += size;
    }
    return result + current;
  }
  window.GuideTrip = {
    validDate(value) {
      return /^\d{4}-\d{2}-\d{2}$/.test(value) && !Number.isNaN(Date.parse(value + 'T12:00:00Z')) && new Date(value + 'T12:00:00Z').toISOString().slice(0, 10) === value;
    },
    directions(items) {
      if (!items.length) return '';
      if (items.length === 1) return 'https://www.google.com/maps/search/?api=1&query=' + encodeURIComponent(items[0].location.mapQuery);
      const params = new URLSearchParams({ api: '1', origin: items[0].location.mapQuery, destination: items.at(-1).location.mapQuery, travelmode: 'walking' });
      if (items.length > 2) params.set('waypoints', items.slice(1, -1).map(item => item.location.mapQuery).join('|'));
      return 'https://www.google.com/maps/dir/?' + params;
    },
    budget(items) {
      const documented = items.filter(item => typeof item.cost.amount === 'number');
      return { total: documented.reduce((sum, item) => sum + item.cost.amount, 0), covered: documented.length, missing: items.length - documented.length };
    },
    calendar({ date, city, items, tr, url }) {
      if (!this.validDate(date)) throw new Error('Invalid trip date');
      const next = new Date(date + 'T12:00:00Z'); next.setUTCDate(next.getUTCDate() + 1);
      const description = items.map((item, index) => (index + 1) + '. ' + tr(item.t) + ' — ' + tr(item.z)).join('\n') + '\n' + tr('Promemoria personale: non è una prenotazione.|Personal reminder: this is not a reservation.') + '\n' + url;
      const lines = ['BEGIN:VCALENDAR','VERSION:2.0','PRODID:-//Guide Poliedriche//Trip Planner//IT','CALSCALE:GREGORIAN','BEGIN:VEVENT',
        'UID:' + date + '-' + items.map(item => item.id).join('-') + '@guide-poliedriche',
        'DTSTAMP:' + new Date().toISOString().replace(/[-:]/g, '').replace(/\.\d+Z$/, 'Z'),
        'DTSTART;VALUE=DATE:' + date.replaceAll('-', ''), 'DTEND;VALUE=DATE:' + next.toISOString().slice(0,10).replaceAll('-',''),
        'SUMMARY:' + calendarText(tr('Il mio giorno a |My day in ') + tr(city)), 'DESCRIPTION:' + calendarText(description),
        'TRANSP:TRANSPARENT','END:VEVENT','END:VCALENDAR'];
      return lines.map(fold).join('\r\n') + '\r\n';
    },
    offline({ city, items, tr, transportUrl, date }) {
      return '<!DOCTYPE html><html lang="' + document.documentElement.lang + '"><meta charset="UTF-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>' + escape(tr(city)) + '</title><style>body{font:17px/1.7 system-ui;margin:24px auto;padding:0 20px;max-width:760px;color:#172B37}li{padding:18px 0;border-bottom:1px solid #b9c5cc}h1{font:700 2rem Georgia}a{color:#174B75}small{display:block}</style><h1>' + escape(tr(city)) + '</h1><p>' + escape(date || '') + '</p><p>' + escape(tr('Il tuo taccuino offline. Testi e tappe sono disponibili senza rete; mappe, calendari e fonti esterne richiedono connessione. Le visite non sono prenotate.|Your offline notebook. Text and stops work without a connection; maps, schedules and external sources need internet. Visits are not booked.')) + '</p><ol>' + items.map(item => '<li><h2>' + escape(tr(item.t)) + '</h2><small>' + escape(tr(item.z)) + ' · ' + escape(tr(item.d)) + '</small><p>' + escape(tr(item.p)) + '</p><p>' + escape(tr(item.tip)) + '</p><a href="' + escape(GuideUI.safeUrl(item.source.url)) + '">' + escape(tr('Fonte|Source')) + '</a></li>').join('') + '</ol><p><a href="' + escape(GuideUI.safeUrl(transportUrl)) + '">' + escape(tr('Trasporto ufficiale|Official transport')) + '</a></p>';
    },
    download(text, type, filename) {
      const url = URL.createObjectURL(new Blob([text], {type}));
      const link = document.createElement('a'); link.href = url; link.download = filename; document.body.append(link); link.click(); link.remove(); setTimeout(() => URL.revokeObjectURL(url), 1000);
    }
  };
})();
