window.GuideStorage = {
  unavailable: false,
  memory: new Map(),
  failed() { this.unavailable = true; document.dispatchEvent(new Event('guide-storage-unavailable')); },
  read(key, fallback) {
    try {
      const value = localStorage.getItem(key);
      if (value === null) return this.memory.has(key) ? this.memory.get(key) : fallback;
      try { return key.endsWith('_lingua') ? value : JSON.parse(value); } catch { return fallback; }
    } catch { this.failed(); return this.memory.has(key) ? this.memory.get(key) : fallback; }
  },
  write(key, value) {
    this.memory.set(key, value);
    try { localStorage.setItem(key, typeof value === 'string' ? value : JSON.stringify(value)); return true; }
    catch { this.failed(); return false; }
  }
};
