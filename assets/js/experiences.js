(function () {
  const normalize = value => String(value).normalize('NFD').replace(/[\u0300-\u036f]/g, '').toLowerCase().replace(/[^a-z0-9]+/g,' ').trim();
  const stopwords = new Set(['di','da','in','un','una','per','con','del','della','dei','delle','gli','le','il','lo','la','e','a','the','and','of','in','a','an','for','with']);
  const aliases = {food:'cibo mangiare bere sapori food eat drink',cultura:'cultura arte culturale cultural art culture',religioso:'religione spiritualita religioso religious spiritual',benessere:'benessere relax wellness',sport:'sport eventi sports events',lento:'passeggiate quartieri lento sostenibile slow walks neighbourhoods',business:'fiere lavoro business fairs meetings',formativo:'imparare taccuino formativo educational learning notebook'};
  const categoryAliases = {musei:'museo musei museum museums gallery galleries',archeo:'archeologia archeologico archaeology archaeological',verde:'parco parchi giardino giardini verde green garden gardens parks',parchi:'parco parchi giardino giardini verde green garden gardens parks',dolci:'dolce dolci sweet sweets caffe coffee gelato',street:'mercato mercati market markets street food',calcio:'calcio stadio football stadium'};
  const equivalentGroups=['parco parchi giardino giardini park parks garden gardens','museo musei museum museums','mercato mercati market markets'];
  window.GuideExperiences = {
    normalize,
    filter(experiences, profile, category, type) {
      return experiences.filter(item => (!profile || item.tags.includes(profile)) && (!category || item.sub === category) && (!type || item.tipo === type));
    },
    search(experiences, query, {profiles = [], categories = {}, types = []} = {}) {
      const terms = normalize(query).split(' ').filter(term=>term&&!stopwords.has(term));
      if (!terms.length) return experiences;
      return experiences.filter(item=>{
        const category = Object.values(categories).flat().filter(value=>value.id===item.sub).map(value=>value.nome).join(' ');
        const profile = profiles.filter(value=>item.tags.includes(value.id)).map(value=>value.nome).join(' ');
        const type = types.find(value=>value.id===item.tipo)?.nome || '';
        const index = normalize([item.t,item.z,item.p,item.sub,item.tipo,category,profile,type,categoryAliases[item.sub]||'',...item.tags.map(tag=>aliases[tag]||'')].join(' '));
        return terms.every(term=>{
          const group=equivalentGroups.find(group=>group.split(' ').includes(term));
          return (group?group.split(' '):[term]).some(word=>index.includes(word));
        });
      });
    }
  };
})();
