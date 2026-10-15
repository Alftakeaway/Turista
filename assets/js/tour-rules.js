window.GuideTourRules = {
  select(tours, {time = 0, mood = '', weather = ''} = {}) {
    return tours.flatMap(tour => {
      if (mood && tour.mood !== mood) return [];
      if (weather === 'mixed' && tour.weather !== 'mixed') return [];
      if (!time || tour.minutes <= time) return [{...tour, shortened: false}];
      const minutes = Math.ceil(tour.minutes * 2 / tour.stops.length);
      if (tour.stops.length > 2 && minutes <= time && weather !== 'mixed') return [{...tour, stops: tour.stops.slice(0,2), minutes, shortened: true}];
      return [];
    });
  }
};
