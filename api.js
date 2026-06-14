/**
 * EduCampus — API Module
 * Semua komunikasi ke Google Apps Script Web App
 */
const API = (() => {
  async function request(action, data = {}) {
    try {
      const session = Auth.getSession();
      const payload = { action, ...data };
      if (session) {
        payload.token = session.token;
        payload.userId = session.id;
      }

      const res = await fetch(CONFIG.GAS_URL, {
        method: 'POST',
        body: JSON.stringify(payload),
        headers: { 'Content-Type': 'text/plain' } // GAS needs text/plain for CORS
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const json = await res.json();
      if (!json.success) throw new Error(json.message || 'Server error');
      return json;
    } catch (err) {
      console.error(`[API] ${action}:`, err);
      throw err;
    }
  }

  // ─── AUTH ────────────────────────────────────────────────────
  const auth = {
    login: (nim, password) => request('login', { nim, password }),
    logout: () => request('logout'),
    changePassword: (oldPwd, newPwd) => request('changePassword', { oldPwd, newPwd }),
  };

  // ─── COURSES ─────────────────────────────────────────────────
  const courses = {
    list: () => request('getCourses'),
    get: (id) => request('getCourse', { id }),
    create: (data) => request('createCourse', data),
    update: (data) => request('updateCourse', data),
    delete: (id) => request('deleteCourse', { id }),
    enroll: (courseId) => request('enrollCourse', { courseId }),
  };

  // ─── MATERIALS ───────────────────────────────────────────────
  const materials = {
    list: (courseId) => request('getMaterials', { courseId }),
    get: (id) => request('getMaterial', { id }),
    create: (data) => request('createMaterial', data),
    update: (data) => request('updateMaterial', data),
    delete: (id) => request('deleteMaterial', { id }),
    logView: (materialId) => request('logMaterialView', { materialId }),
  };

  // ─── ASSIGNMENTS ─────────────────────────────────────────────
  const assignments = {
    list: (courseId) => request('getAssignments', { courseId }),
    get: (id) => request('getAssignment', { id }),
    create: (data) => request('createAssignment', data),
    update: (data) => request('updateAssignment', data),
    delete: (id) => request('deleteAssignment', { id }),
    submit: (assignmentId, fileUrl, fileName) => request('submitAssignment', { assignmentId, fileUrl, fileName }),
    uploadFile: (base64, fileName, mimeType, folderId) => request('uploadFile', { base64, fileName, mimeType, folderId }),
    grade: (submissionId, score, comment) => request('gradeSubmission', { submissionId, score, comment }),
    getSubmissions: (assignmentId) => request('getSubmissions', { assignmentId }),
    mySubmission: (assignmentId) => request('mySubmission', { assignmentId }),
  };

  // ─── QUIZZES ─────────────────────────────────────────────────
  const quizzes = {
    list: (courseId) => request('getQuizzes', { courseId }),
    get: (id) => request('getQuiz', { id }),
    getQuestions: (quizId) => request('getQuizQuestions', { quizId }),
    create: (data) => request('createQuiz', data),
    addQuestion: (data) => request('addQuestion', data),
    submit: (quizId, answers) => request('submitQuiz', { quizId, answers }),
    myResult: (quizId) => request('myQuizResult', { quizId }),
    results: (quizId) => request('getQuizResults', { quizId }),
  };

  // ─── GRADES ──────────────────────────────────────────────────
  const grades = {
    my: (courseId) => request('myGrades', { courseId }),
    all: (courseId) => request('getAllGrades', { courseId }),
    set: (data) => request('setGrade', data),
    calculate: (courseId, studentId) => request('calculateGrade', { courseId, studentId }),
    export: (courseId, format) => request('exportGrades', { courseId, format }),
  };

  // ─── ATTENDANCE ──────────────────────────────────────────────
  const attendance = {
    open: (courseId, meeting, code) => request('openAttendance', { courseId, meeting, code }),
    submit: (courseId, meeting, code) => request('submitAttendance', { courseId, meeting, code }),
    list: (courseId) => request('getAttendance', { courseId }),
    mySummary: (courseId) => request('myAttendance', { courseId }),
    classReport: (courseId) => request('attendanceReport', { courseId }),
  };

  // ─── ACTIVITY ────────────────────────────────────────────────
  const activity = {
    log: (type, description, refId) => request('logActivity', { type, description, refId }),
    my: () => request('myActivity'),
    student: (studentId) => request('studentActivity', { studentId }),
    all: (courseId) => request('allActivity', { courseId }),
  };

  // ─── NOTIFICATIONS ───────────────────────────────────────────
  const notifications = {
    list: () => request('getNotifications'),
    markRead: (id) => request('markNotifRead', { id }),
    markAllRead: () => request('markAllNotifsRead'),
    send: (data) => request('sendNotification', data), // dosen/admin
  };

  // ─── FORUM ───────────────────────────────────────────────────
  const forum = {
    list: (courseId) => request('getForumPosts', { courseId }),
    create: (courseId, title, body) => request('createPost', { courseId, title, body }),
    reply: (postId, body) => request('replyPost', { postId, body }),
    like: (postId) => request('likePost', { postId }),
    delete: (postId) => request('deletePost', { postId }),
  };

  // ─── ANNOUNCEMENTS ───────────────────────────────────────────
  const announcements = {
    list: () => request('getAnnouncements'),
    create: (data) => request('createAnnouncement', data),
    delete: (id) => request('deleteAnnouncement', { id }),
  };

  // ─── CALENDAR ────────────────────────────────────────────────
  const calendar = {
    events: (month, year) => request('getCalendarEvents', { month, year }),
    create: (data) => request('createEvent', data),
    delete: (id) => request('deleteEvent', { id }),
  };

  // ─── ADMIN ───────────────────────────────────────────────────
  const admin = {
    listUsers: () => request('getUsers'),
    createUser: (data) => request('createUser', data),
    updateUser: (data) => request('updateUser', data),
    deleteUser: (id) => request('deleteUser', { id }),
    resetPassword: (userId) => request('resetPassword', { userId }),
    stats: () => request('getAdminStats'),
  };

  return { auth, courses, materials, assignments, quizzes, grades, attendance, activity, notifications, forum, announcements, calendar, admin };
})();
