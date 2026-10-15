window.GuideExperiences = {
  filter(experiences, profile, category, type) {
    return experiences.filter(item => !profile || (
      item.tags.includes(profile) && (!category || item.sub === category) &&
      (profile !== "food" || !type || item.tipo === type)
    ));
  }
};
