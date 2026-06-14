/**
 * EduCampus — Router
 */
const Router = (() => {
  let _current = null;
  const _history = [];

  const PAGES = {
    dashboard: Pages.Dashboard,
    courses: Pages.Courses,
    materials: Pages.Materials,
    assignments: Pages.Assignments,
    quizzes: Pages.Quizzes,
    grades: Pages.Grades,
    attendance: Pages.Attendance,
    activity: Pages.Activity,
    profile: Pages.Profile,
    forum: Pages.Forum,
    announcements: Pages.Announcements,
    calendar: Pages.Calendar,
    admin: Pages.Admin,
  };

  function navigate(pageId, params = {}) {
    const Page = PAGES[pageId];
    if (!Page) return;
    if (_current) _history.push(_current);
    _current = pageId;

    // Update active nav
    document.querySelectorAll('.sidebar-item[data-page]').forEach(el => {
      el.classList.toggle('active', el.dataset.page === pageId);
    });

    // Update page title
    const navItem = CONFIG.NAV[Auth.getRole()]?.find(n => n.id === pageId);
    document.getElementById('pageTitle').textContent = navItem?.label || pageId;

    // Render page
    const content = document.getElementById('pageContent');
    content.innerHTML = '';
    Page.render(content, params);

    // Close sidebar on mobile
    closeSidebar();

    // Log activity
    API.activity.log('navigate', `Membuka halaman ${pageId}`, pageId).catch(() => {});
  }

  function back() {
    if (_history.length) navigate(_history.pop());
  }

  function getCurrent() { return _current; }

  return { navigate, back, getCurrent };
})();
