export function getItem(key, fallback = null) {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}
export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    /* ignore */
  }
}
export function removeItem(key) {
  try {
    localStorage.removeItem(key);
  } catch (err) {
    /* ignore */
  }
}