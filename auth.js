/**
 * EduCampus — Auth Module
 */
const Auth = (() => {
  let _session = null;

  function getSession() {
    if (_session) return _session;
    const raw = sessionStorage.getItem(CONFIG.SESSION_KEY) || localStorage.getItem(CONFIG.SESSION_KEY);
    if (raw) { try { _session = JSON.parse(raw); } catch(e) {} }
    return _session;
  }

  function setSession(userData, remember = false) {
    _session = userData;
    const storage = remember ? localStorage : sessionStorage;
    storage.setItem(CONFIG.SESSION_KEY, JSON.stringify(userData));
    if (remember) localStorage.setItem(CONFIG.REMEMBER_KEY, '1');
  }

  function clearSession() {
    _session = null;
    sessionStorage.removeItem(CONFIG.SESSION_KEY);
    localStorage.removeItem(CONFIG.SESSION_KEY);
    localStorage.removeItem(CONFIG.REMEMBER_KEY);
  }

  function isLoggedIn() { return !!getSession(); }
  function getRole() { const s = getSession(); return s ? s.role : null; }
  function getUser() { return getSession(); }
  function isRemembered() { return localStorage.getItem(CONFIG.REMEMBER_KEY) === '1'; }

  return { getSession, setSession, clearSession, isLoggedIn, getRole, getUser, isRemembered };
})();
