window.GuideStorage = {
  read(key, fallback) {
    try { const value = localStorage.getItem(key); return value === null ? fallback : key.endsWith("_lingua") ? value : JSON.parse(value); }
    catch { return fallback; }
  },
  write(key, value) {
    try { localStorage.setItem(key, typeof value === "string" ? value : JSON.stringify(value)); return true; }
    catch { return false; }
  }
};
