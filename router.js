;(function () {
  var ROUTES = {
    index: "index.html",
    login: "login.html",
    admin: "Superbit Admin.html",
    forgotPassword: "Forgot Password.html",
    changePassword: "Change Password.html",
    setupPassword: "setup-password.html",
    passwordSuccessful: "password-successful.html"
  };

  var ALIASES = {
    "index.html": "index",
    "login.html": "login",
    "superbit admin.html": "admin",
    "Superbit Admin.html": "admin",
    "forgot password.html": "forgotPassword",
    "Forgot Password.html": "forgotPassword",
    "change password.html": "changePassword",
    "Change Password.html": "changePassword",
    "setup-password.html": "setupPassword",
    "password-successful.html": "passwordSuccessful"
  };

  function normalizePathname(pathname) {
    var clean = (pathname || "").split("?")[0].split("#")[0];
    var file = clean.substring(clean.lastIndexOf("/") + 1);
    return file || "index.html";
  }

  function getRouteKeyFromPath(pathname) {
    var file = normalizePathname(pathname);
    return ALIASES[file] || ALIASES[file.toLowerCase()] || null;
  }

  function canonicalPathFor(pathname) {
    var key = getRouteKeyFromPath(pathname);
    return key ? ROUTES[key] : null;
  }

  function goTo(routeKey) {
    var target = ROUTES[routeKey];
    if (!target) return;
    window.location.href = target;
  }

  function ensureCanonicalFilename() {
    var canonical = canonicalPathFor(window.location.pathname);
    if (!canonical) return;
    var current = normalizePathname(window.location.pathname);
    if (current !== canonical) {
      window.location.replace(canonical);
    }
  }

  function routeFromQueryOrDefault(defaultRoute) {
    var params = new URLSearchParams(window.location.search);
    var routeKey = params.get("page");
    if (routeKey && ROUTES[routeKey]) {
      goTo(routeKey);
      return;
    }
    goTo(defaultRoute || "login");
  }

  window.SuperbitRouter = {
    routes: ROUTES,
    goTo: goTo,
    normalizePathname: normalizePathname,
    getRouteKeyFromPath: getRouteKeyFromPath,
    ensureCanonicalFilename: ensureCanonicalFilename,
    routeFromQueryOrDefault: routeFromQueryOrDefault
  };
})();
