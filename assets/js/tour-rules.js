window.GuideTourRules = {
  select(tours, {time = 0, mood = '', weather = '', audience = ''} = {}) {
    return tours.flatMap(tour => {
      if (audience && !tour.audiences?.includes(audience)) return [];
      if (mood && tour.mood !== mood) return [];
      if (weather === 'mixed' && tour.weather !== 'mixed') return [];
      const variants = tour.variants || [{minutes:tour.minutes,stops:tour.stops}];
      const variant = variants.filter(option => (!time || option.minutes <= time) &&
        (weather !== 'mixed' || !tour.variants || option.stops.some(id => tour.indoorStops.includes(id))))
        .sort((a,b) => b.minutes-a.minutes)[0];
      return variant ? [{...tour,...variant,shortened:variant.minutes<tour.minutes}] : [];
    });
  }
};
