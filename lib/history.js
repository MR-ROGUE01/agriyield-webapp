const KEY = "cyp_history";

export function getHistory() {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function addHistoryEntry(entry) {
  const history = getHistory();
  const newEntry = { ...entry, id: Date.now(), date: new Date().toISOString() };
  const updated = [newEntry, ...history].slice(0, 50);
  window.localStorage.setItem(KEY, JSON.stringify(updated));
  return updated;
}

export function clearHistory() {
  window.localStorage.removeItem(KEY);
}
