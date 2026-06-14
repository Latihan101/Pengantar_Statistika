/**
 * EduCampus — Configuration
 * Ganti GAS_URL dengan URL Web App Google Apps Script Anda setelah deploy.
 */
const CONFIG = {
  // ⚠️ WAJIB GANTI dengan URL deploy Google Apps Script Anda
  GAS_URL: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec',

  APP_NAME: 'EduCampus',
  VERSION: '1.0.0',

  // Session
  SESSION_KEY: 'educampus_session',
  REMEMBER_KEY: 'educampus_remember',
  DARK_MODE_KEY: 'educampus_dark',

  // Paginasi
  PAGE_SIZE: 20,

  // File Upload (via GAS)
  MAX_FILE_SIZE_MB: 25,
  ALLOWED_EXTENSIONS: ['pdf', 'doc', 'docx', 'ppt', 'pptx', 'mp4', 'jpg', 'png'],

  // Quiz
  QUIZ_WARNING_SECONDS: 60,

  // Navigation per Role
  NAV: {
    mahasiswa: [
      { section: 'Utama' },
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { id: 'courses', label: 'Mata Kuliah', icon: 'fas fa-book-open' },
      { id: 'materials', label: 'Materi', icon: 'fas fa-layer-group' },
      { id: 'assignments', label: 'Tugas', icon: 'fas fa-file-alt' },
      { id: 'quizzes', label: 'Kuis', icon: 'fas fa-brain' },
      { id: 'grades', label: 'Nilai', icon: 'fas fa-chart-bar' },
      { id: 'attendance', label: 'Absensi', icon: 'fas fa-calendar-check' },
      { section: 'Kampus' },
      { id: 'forum', label: 'Forum Diskusi', icon: 'fas fa-comments' },
      { id: 'announcements', label: 'Pengumuman', icon: 'fas fa-bullhorn' },
      { id: 'calendar', label: 'Kalender', icon: 'fas fa-calendar' },
      { section: 'Akun' },
      { id: 'activity', label: 'Riwayat Aktivitas', icon: 'fas fa-history' },
      { id: 'profile', label: 'Profil', icon: 'fas fa-user' },
    ],
    dosen: [
      { section: 'Utama' },
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { id: 'courses', label: 'Mata Kuliah', icon: 'fas fa-book-open' },
      { id: 'materials', label: 'Kelola Materi', icon: 'fas fa-layer-group' },
      { id: 'assignments', label: 'Tugas', icon: 'fas fa-file-alt' },
      { id: 'quizzes', label: 'Kuis', icon: 'fas fa-brain' },
      { id: 'grades', label: 'Nilai', icon: 'fas fa-chart-bar' },
      { id: 'attendance', label: 'Absensi', icon: 'fas fa-calendar-check' },
      { section: 'Analitik' },
      { id: 'activity', label: 'Aktivitas Mahasiswa', icon: 'fas fa-history' },
      { id: 'forum', label: 'Forum Diskusi', icon: 'fas fa-comments' },
      { id: 'announcements', label: 'Pengumuman', icon: 'fas fa-bullhorn' },
      { id: 'calendar', label: 'Kalender', icon: 'fas fa-calendar' },
      { section: 'Akun' },
      { id: 'profile', label: 'Profil', icon: 'fas fa-user' },
    ],
    admin: [
      { section: 'Utama' },
      { id: 'dashboard', label: 'Dashboard', icon: 'fas fa-home' },
      { section: 'Manajemen' },
      { id: 'admin', label: 'Kelola Pengguna', icon: 'fas fa-users' },
      { id: 'courses', label: 'Kelola Mata Kuliah', icon: 'fas fa-book-open' },
      { id: 'announcements', label: 'Pengumuman', icon: 'fas fa-bullhorn' },
      { id: 'calendar', label: 'Kalender Akademik', icon: 'fas fa-calendar' },
      { section: 'Akun' },
      { id: 'activity', label: 'Log Aktivitas', icon: 'fas fa-history' },
      { id: 'profile', label: 'Profil', icon: 'fas fa-user' },
    ]
  }
};
