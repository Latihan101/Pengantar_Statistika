/**
 * EduCampus — Utilities
 */
const Utils = (() => {

  function formatDate(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'long', year: 'numeric' });
  }

  function formatDateTime(dateStr) {
    if (!dateStr) return '-';
    const d = new Date(dateStr);
    return d.toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) + ' ' +
           d.toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' });
  }

  function formatTime(seconds) {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${String(m).padStart(2,'0')}:${String(s).padStart(2,'0')}`;
  }

  function timeAgo(dateStr) {
    const diff = (Date.now() - new Date(dateStr)) / 1000;
    if (diff < 60) return 'baru saja';
    if (diff < 3600) return `${Math.floor(diff/60)} menit lalu`;
    if (diff < 86400) return `${Math.floor(diff/3600)} jam lalu`;
    return `${Math.floor(diff/86400)} hari lalu`;
  }

  function isDeadlinePassed(dateStr) {
    return dateStr && new Date(dateStr) < new Date();
  }

  function isDeadlineSoon(dateStr, hoursThreshold = 24) {
    if (!dateStr) return false;
    const diff = (new Date(dateStr) - Date.now()) / 3600000;
    return diff > 0 && diff <= hoursThreshold;
  }

  function getInitials(name = '') {
    return name.split(' ').slice(0,2).map(w => w[0]).join('').toUpperCase();
  }

  function sanitize(str) {
    const div = document.createElement('div');
    div.textContent = str;
    return div.innerHTML;
  }

  function escVal(str) { return str ? String(str).replace(/"/g, '&quot;') : ''; }

  function showLoading(container, rows = 3) {
    let html = '';
    for (let i = 0; i < rows; i++) html += `<div class="skel-block skeleton"></div>`;
    container.innerHTML = html;
  }

  function fileToBase64(file) {
    return new Promise((res, rej) => {
      const r = new FileReader();
      r.onload = () => res(r.result.split(',')[1]);
      r.onerror = rej;
      r.readAsDataURL(file);
    });
  }

  function gradeToLetter(score) {
    if (score >= 85) return 'A';
    if (score >= 75) return 'B';
    if (score >= 60) return 'C';
    if (score >= 50) return 'D';
    return 'E';
  }

  function deadlineStatus(deadline) {
    if (!deadline) return { label: 'Tidak ada batas', cls: 'tag-gray' };
    if (isDeadlinePassed(deadline)) return { label: 'Deadline lewat', cls: 'tag-red' };
    if (isDeadlineSoon(deadline)) return { label: 'Segera', cls: 'tag-amber' };
    return { label: 'Aktif', cls: 'tag-teal' };
  }

  function statusBadge(status) {
    const map = {
      'Belum Mengumpulkan': { cls: 'tag-gray', icon: 'fa-clock' },
      'Sudah Mengumpulkan': { cls: 'tag-teal', icon: 'fa-check' },
      'Terlambat': { cls: 'tag-red', icon: 'fa-exclamation' },
      'Sudah Dinilai': { cls: 'tag-blue', icon: 'fa-star' },
    };
    return map[status] || { cls: 'tag-gray', icon: 'fa-circle' };
  }

  function downloadBlob(content, filename, mime) {
    const blob = new Blob([content], { type: mime });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = filename; a.click();
    URL.revokeObjectURL(url);
  }

  function csvExport(headers, rows, filename) {
    const lines = [headers.join(','), ...rows.map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(','))];
    downloadBlob(lines.join('\n'), filename, 'text/csv;charset=utf-8;');
  }

  function generateCode(len = 6) {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    return Array.from({length: len}, () => chars[Math.floor(Math.random() * chars.length)]).join('');
  }

  function debounce(fn, delay) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), delay); };
  }

  function progressRing(pct, color = '#5c6bc0', size = 80) {
    const r = (size/2) - 8;
    const circ = 2 * Math.PI * r;
    const dash = (pct / 100) * circ;
    return `<svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}">
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="var(--border)" stroke-width="6"/>
      <circle cx="${size/2}" cy="${size/2}" r="${r}" fill="none" stroke="${color}" stroke-width="6"
        stroke-dasharray="${dash} ${circ}" stroke-linecap="round"/>
    </svg>`;
  }

  return { formatDate, formatDateTime, formatTime, timeAgo, isDeadlinePassed, isDeadlineSoon,
           getInitials, sanitize, escVal, showLoading, fileToBase64, gradeToLetter,
           deadlineStatus, statusBadge, downloadBlob, csvExport, generateCode, debounce, progressRing };
})();
