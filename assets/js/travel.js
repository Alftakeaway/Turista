window.GuideTravel = {
  create({ data, tr, planner }) {
    const tours = document.getElementById('tour-results'), utilities = document.getElementById('travel-kit');
    const all = [...data.ESPERIENZE, ...data.TOUR_STOPS], escape = GuideUI.escape;
    const params = new URLSearchParams(location.search);
    const state = {time: ['90','120','180','240'].includes(params.get('tourTime')) ? Number(params.get('tourTime')) : 0,
      mood: ['architecture','art','nature','food','memory'].includes(params.get('tourMood')) ? params.get('tourMood') : '',
      weather: params.get('tourWeather') === 'mixed' ? 'mixed' : '',
      audience: Object.hasOwn(GuideTourAudiences,params.get('tourAudience')) ? params.get('tourAudience') : ''};
    const labels = {architecture:'Architettura e città|Architecture and city',art:'Arte e dettagli|Art and details',nature:'Verde e acqua|Green and water',food:'Mercati e sapori|Markets and flavours',memory:'Memoria e quartieri|Memory and neighbourhoods'};
    let active = data.TOURS.some(tour => tour.id === params.get('tour')) ? params.get('tour') : '';
    function savePreferences() {
      const url = new URL(location.href);
      for (const [key,value] of Object.entries({tourTime:state.time,tourMood:state.mood,tourWeather:state.weather,tourAudience:state.audience,tour:active})) {
        if (value) url.searchParams.set(key,value); else url.searchParams.delete(key);
      }
      try { history.replaceState(null,'',url); } catch {}
    }
    function control(id, title, values, selected) {
      return `<label for="${id}">${escape(tr(title))}</label><select id="${id}">${values.map(([value,label]) => `<option value="${value}" ${String(value)===String(selected)?'selected':''}>${escape(tr(label))}</option>`).join('')}</select>`;
    }
    function renderTours() {
      const exact = GuideTourRules.select(data.TOURS, state).filter(tour => !active || tour.id === active);
      const alternatives = !exact.length && state.audience && state.mood && !active;
      const candidates = (alternatives ? GuideTourRules.select(data.TOURS,{...state,mood:''}) : exact)
        .sort((a,b)=>Number(Boolean(b.audiencePlan))-Number(Boolean(a.audiencePlan)));
      document.getElementById('tour-controls').innerHTML = control('tour-time','Tempo massimo a disposizione|Maximum time available',[[0,'Scegli liberamente|Any duration'],[90,'Fino a 90 minuti|Up to 90 minutes'],[120,'Fino a 2 ore|Up to 2 hours'],[180,'Fino a 3 ore|Up to 3 hours'],[240,'Fino a 4 ore|Up to 4 hours']],state.time) +
        control('tour-mood','Che cosa cerchi?|What are you looking for?',[['','Tutte le idee|All ideas'],...Object.entries(labels)],state.mood) +
        control('tour-weather','Preferenza meteo|Weather preference',[['','Va bene all’aperto|Outdoor is fine'],['mixed','Con tappe al coperto|With indoor options']],state.weather) +
        control('tour-audience','Per chi / con chi viaggi?|Who is travelling?',[['','Qualsiasi compagnia o età|Any company or age'],...Object.entries(GuideTourAudiences).map(([key,value])=>[key,value.label])],state.audience);
      const results = candidates.map(tour => {
        const stops = tour.stops.map(id => all.find(item => item.id === id));
        const activity = (stop,index) => tour.audiencePlan?.steps.find(step=>step.stopId===stop.id).prompt ||
          (state.audience ? GuideTourAudiences[state.audience].activities[index%2] : '');
        return `<article class="tour-card" data-tour="${tour.id}"><div class="tour-heading"><p>${escape(tr(labels[tour.mood]))}${tour.audiencePlan?' · '+escape(tr(GuideTourAudiences[tour.audiences[0]].label)):''}</p><h3>${escape(tr(tour.title))}</h3><span>${tour.minutes} ${tr('min proposti|suggested min')}${tour.shortened?' · '+tr('versione breve|short version'):''}</span></div>
          <p>${escape(tr(tour.focus))}</p>${tour.note?`<p class="route-note">${escape(tr(tour.note))} ${tour.visitMinutes} ${tr('min per visite e soste|min for visits and breaks')} + ${tour.walkingMinutes} ${tr('min a piedi stimati|estimated walking min')}.</p>`:''}<p class="route-note">${escape(tr(tour.terrain))}</p>
          ${tour.audiencePlan?`<p class="tour-practical"><strong>${escape(tr(tour.audiencePlan.pace))}</strong> · ${tour.pauseMinutes} ${tr('min di pausa compresi nelle soste|min of breaks included in visit time')}. ${escape(tr(tour.audiencePlan.logistics))}</p><p class="route-note">${escape(tr(tour.audiencePlan.budget))}</p>`:''}
          ${tour.indoorStops?.length?`<p class="route-note">${tr('Tappa al coperto, se aperta:|Indoor stop, if open:')} ${tour.indoorStops.filter(id=>tour.stops.includes(id)).map(id=>escape(tr(all.find(item=>item.id===id).t))).join(', ')}. ${tr('Il percorso comprende anche tratti all’aperto.|The route also includes outdoor sections.')}</p>`:''}
          <details ${active?'open':''}><summary>${tr('Apri tappe, attività e fonti|Open stops, activities and sources')}</summary><ol>${stops.map((stop,index) => `<li><h4>${escape(tr(stop.t))}</h4>${activity(stop,index)?`<p class="tour-activity"><strong>${tr('Da fare qui:|Try here:')}</strong> ${escape(tr(activity(stop,index)))}</p>`:''}${GuidePhotos.figure(data.PHOTOS[stop.id],tr)}<p>${escape(tr(stop.p))}</p>${GuideUI.external(stop.source.url,tr('Luogo documentato: fonte|Documented place: source'))}</li>`).join('')}</ol></details>
          <p class="authorship">${escape(tr(tour.authorship))} ${tr('Durata stimata, accessi e trasferimenti da controllare per la data scelta.|Estimated duration; check access and travel for your chosen date.')}</p>
          <div class="tour-actions"><button data-tour-add="${tour.id}">${tr('Aggiungi queste tappe|Add these stops')}</button>${GuideUI.external(GuideTrip.directions(stops),tr('Percorso a piedi sulla mappa|Walking route on map'))}<button data-tour-share="${tour.id}">${tr('Condividi tour|Share tour')}</button></div></article>`;
      });
      tours.innerHTML = `<p class="tour-audience-note">${tr('Età e compagnia sono spunti, non limiti di accesso. Scegli in base a interessi, ritmo ed esigenze personali.|Age and company are suggestions, not admission limits. Choose for your interests, pace and individual needs.')} ${state.audience?escape(tr(GuideTourAudiences[state.audience].description)):''}</p><p role="status">${alternatives?tr('Nessuna corrispondenza esatta con l’interesse scelto. Alternative per la stessa compagnia, tempo e meteo:|No exact match for the selected interest. Alternatives for the same company, time and weather:')+' ':''}${candidates.length} ${tr('percorsi|routes')}</p>` + (alternatives?`<button id="tour-other-interests">${tr('Accetta altri interessi|Accept other interests')}</button>`:'') + (results.join('') || `<p class="placeholder">${tr('Nessun percorso con questi criteri. Aumenta il tempo o cambia interesse.|No route matches these criteria. Allow more time or change interest.')}</p>`) + `<button id="tour-reset">${tr('Mostra tutte le idee|Show all ideas')}</button><span id="tour-status" role="status"></span>`;
      for (const [id,key] of [['tour-time','time'],['tour-mood','mood'],['tour-weather','weather'],['tour-audience','audience']]) {
        document.getElementById(id).addEventListener('change',event=>{state[key]=key==='time'?Number(event.target.value):event.target.value;active='';savePreferences();renderTours();});
      }
      tours.querySelector('#tour-other-interests')?.addEventListener('click',()=>{state.mood='';savePreferences();renderTours();});
      tours.querySelector('#tour-reset').addEventListener('click',()=>{state.time=0;state.mood='';state.weather='';state.audience='';active='';savePreferences();renderTours();});
      tours.querySelectorAll('[data-tour-add]').forEach(button=>button.addEventListener('click',()=>{
        const tour=candidates.find(tour=>tour.id===button.dataset.tourAdd); const added=planner.addMany(tour.stops);
        if(added<0){document.getElementById('tour-status').textContent=tr('Massimo 20 tappe: rimuovine qualcuna dal tuo giorno.|Maximum 20 stops: remove some from your day.');return;}
        document.getElementById('tour-status').textContent=tr('Tappe aggiunte al tuo giorno: puoi riordinarle e stampare.|Stops added to your day: you can reorder and print them.');
      }));
      tours.querySelectorAll('[data-tour-share]').forEach(button=>button.addEventListener('click',async()=>{
        const selected=candidates.find(tour=>tour.id===button.dataset.tourShare);
        const url=new URL(location.href);url.searchParams.set('tour',selected.id);url.searchParams.set('tourMood',selected.mood);url.searchParams.set('lang',document.documentElement.lang);url.hash='tour-lab';
        document.getElementById('tour-status').textContent=await GuideUI.share(url.href,tr);
      }));
    }
    function renderUtilities() {
      const city = tr(data.city.name), info = data.TRAVEL;
      const nearby = [['water','Acqua potabile|Drinking water','fontanelle acqua potabile'],['toilets','Bagni pubblici|Public toilets','bagni pubblici'],['pharmacy','Farmacie|Pharmacies','farmacia'],['luggage','Deposito bagagli|Luggage storage','deposito bagagli']];
      const checked = GuideStorage.read(data.storageKey+'_checklist',[]);
      const checklist = ['Documento e biglietti salvati|ID and tickets saved','Percorso e accessi letti|Route and access information read','Acqua e protezione meteo|Water and weather protection','Batteria o caricatore|Battery or charger','Rientro e ultimo collegamento controllati|Return journey and last service checked'];
      utilities.innerHTML = `<div class="travel-columns"><section class="travel-panel"><h3>${tr('Trova ciò che serve|Find what you need')}</h3><p>${tr('Apri una ricerca sulla mappa. I risultati appartengono al servizio esterno: controlla disponibilità, costi e apertura.|Open a map search. Results belong to the external service: check availability, cost and opening times.')}</p><div class="nearby-grid">${nearby.map(([key,label,query])=>`<a data-nearby="${key}" href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(query+' '+city)}" target="_blank" rel="noopener noreferrer">${escape(tr(label))}</a>`).join('')}</div><button id="use-location">${tr('Cerca vicino a me|Search near me')}</button><p id="location-status" role="status"></p></section>
        <section class="travel-panel"><h3>${tr('Collegamenti che evitano sorprese|Links that avoid surprises')}</h3><ul>${[[info.transportUrl,'Trasporto urbano e avvisi|Urban transport and notices'],[info.airportUrl,'Aeroporto: collegamenti ufficiali|Airport: official connections'],[info.weatherUrl,'Meteo Aeronautica Militare|Italian Air Force weather'],[info.accessibilityUrl,'Accessibilità: informazioni ufficiali|Accessibility: official information'],...(info.toiletsUrl?[[info.toiletsUrl,'Mappa o elenco ufficiale dei bagni|Official toilet map or list']]:[]),...(info.waterUrl?[[info.waterUrl,'Acqua: risorsa ufficiale locale|Water: official local resource']]:[])].map(([url,label])=>`<li>${GuideUI.external(url,tr(label))}</li>`).join('')}</ul><p class="emergency"><a href="tel:112">${tr('Emergenza reale: chiama 112|Real emergency: call 112')}</a> · ${GuideUI.external(info.emergencyUrl,tr('Fonte UE|EU source'))}</p></section>
        <section class="travel-panel"><h3>${tr('Prima di uscire|Before heading out')}</h3><div class="travel-checklist">${checklist.map((label,index)=>`<label><input type="checkbox" data-check="${index}" ${Array.isArray(checked)&&checked.includes(index)?'checked':''}> ${escape(tr(label))}</label>`).join('')}</div><p>${tr('La lista è un promemoria personale salvato nel browser; non conferma prenotazioni o servizi.|This is a personal checklist saved in your browser; it does not confirm bookings or services.')}</p></section></div>`;
      utilities.querySelectorAll('[data-check]').forEach(input=>input.addEventListener('change',()=>{
        GuideStorage.write(data.storageKey+'_checklist',[...utilities.querySelectorAll('[data-check]:checked')].map(input=>Number(input.dataset.check)));
      }));
      document.getElementById('use-location').addEventListener('click',()=>{
        const status=document.getElementById('location-status');
        if(!navigator.geolocation){status.textContent=tr('Posizione non disponibile: le ricerche restano centrate sulla città.|Location unavailable: searches remain centred on the city.');return;}
        status.textContent=tr('Richiesta della posizione al browser…|Requesting location from your browser…');
        navigator.geolocation.getCurrentPosition(position=>{
          const {latitude,longitude}=position.coords;
          nearby.forEach(([key,,query])=>{utilities.querySelector('[data-nearby="'+key+'"]').href='https://www.google.com/maps/search/'+encodeURIComponent(query)+'/@'+latitude+','+longitude+',15z';});
          status.textContent=tr('Ricerche aggiornate. La posizione non viene salvata dal sito; aprendo un link la condividi con il servizio mappe.|Searches updated. This site does not save your location; opening a link shares it with the map service.');
        },()=>{status.textContent=tr('Posizione non concessa o non disponibile: puoi usare le ricerche sulla città.|Location denied or unavailable: you can still use city searches.');},{enableHighAccuracy:false,timeout:10000,maximumAge:300000});
      });
    }
    function translate(){renderTours();renderUtilities();}
    translate();return{translate};
  }
};
