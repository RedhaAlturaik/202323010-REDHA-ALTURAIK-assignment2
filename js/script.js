const PROJECTS = [
  {
    title: "QR Code Generator",
    description: "A clean, responsive QR Code generator used to take student attendance.",
    tags: ["HTML", "CSS", "Responsive"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/REDHA-AZIZ/QR-Code-Generator",
  },
  {
    title: "Quiz App",
    description: "A simple Quiz Application used to add, remove, update, and generate quiz questions.",
    tags: ["MAUI", "SQLite"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/REDHA-AZIZ/Quiz-App",
  },
  {
    title: "Library Management System",
    description: "Library management system used to borrow books from the library.",
    tags: ["HTML", "CSS", "JavaScript", "Python"],
    demoUrl: "#projects",
    codeUrl: "https://github.com/REDHA-AZIZ/Library-Management-System",
  },
];

const $ = (sel, root = document) => root.querySelector(sel);
const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];

function createProjectCard(project) {
  const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

  return `
    <article class="project-card">
      <div>
        <h3>${project.title}</h3>
        <p class="muted">${project.description}</p>
      </div>
      <div class="project-tags" aria-label="Project tags">${tags}</div>
      <div class="project-links">
        <a href="${project.demoUrl}" aria-label="Open demo for ${project.title}">Demo</a>
        <a href="${project.codeUrl}" target="_blank" rel="noopener noreferrer" aria-label="Open code for ${project.title}">Code</a>
      </div>
    </article>
  `;
}

function renderProjects(projectList = PROJECTS) {
  const grid = $("#projectsGrid");
  const status = $("#projectsStatus");
  if (!grid || !status) return;

  if (!projectList.length) {
    grid.innerHTML = "";
    status.textContent = "No projects found. Try another search term.";
    return;
  }

  status.textContent = `Showing ${projectList.length} project(s).`;
  grid.innerHTML = projectList.map(createProjectCard).join("");
}

function setupProjectSearch() {
  const searchInput = $("#projectSearch");
  if (!searchInput) return;

  searchInput.addEventListener("input", (e) => {
    const value = e.target.value.trim().toLowerCase();

    const filteredProjects = PROJECTS.filter((project) => {
      const searchableText = [
        project.title,
        project.description,
        ...project.tags,
      ].join(" ").toLowerCase();

      return searchableText.includes(value);
    });

    renderProjects(filteredProjects);
  });
}

function setupMobileMenu() {
  const toggle = $(".nav-toggle");
  const menu = $("#navMenu");
  if (!toggle || !menu) return;

  const closeMenu = () => {
    menu.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
  };

  toggle.addEventListener("click", () => {
    const isOpen = menu.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(isOpen));
  });

  $$(".nav-link", menu).forEach((link) => link.addEventListener("click", closeMenu));

  document.addEventListener("click", (e) => {
    if (!menu.classList.contains("open")) return;
    const clickedInside = menu.contains(e.target) || toggle.contains(e.target);
    if (!clickedInside) closeMenu();
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") closeMenu();
  });
}

function setupThemeToggle() {
  const btn = $(".theme-toggle");
  if (!btn) return;

  const icon = $(".theme-icon", btn);
  const text = $(".theme-text", btn);

  const setTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
      icon.textContent = "☀️";
      text.textContent = "Light";
    } else {
      document.documentElement.removeAttribute("data-theme");
      icon.textContent = "🌙";
      text.textContent = "Dark";
    }

    localStorage.setItem("theme", theme);
  };

  const saved = localStorage.getItem("theme");
  if (saved === "dark" || saved === "light") setTheme(saved);

  btn.addEventListener("click", () => {
    const current = document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light";
    setTheme(current === "dark" ? "light" : "dark");
  });
}

function setupScrollSpy() {
  const links = $$(".nav-link");
  const sections = links
    .map((a) => $(a.getAttribute("href")))
    .filter(Boolean);

  if (!links.length || !sections.length) return;

  const linkById = new Map(
    links.map((a) => [a.getAttribute("href").replace("#", ""), a])
  );

  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((e) => e.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;

      links.forEach((a) => a.classList.remove("active"));
      const id = visible.target.id;
      const activeLink = linkById.get(id);
      if (activeLink) activeLink.classList.add("active");
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5, 0.65],
      rootMargin: "-20% 0px -60% 0px",
    }
  );

  sections.forEach((sec) => observer.observe(sec));
}

function setupContactForm() {
  const form = $("#contactForm");
  const status = $("#formStatus");
  if (!form || !status) return;

  const setError = (name, msg) => {
    const el = document.querySelector(`[data-error-for="${name}"]`);
    if (el) el.textContent = msg || "";
  };

  const showStatus = (message, type) => {
    status.textContent = message;
    status.className = "form-status";

    if (type === "success") {
      status.classList.add("success");
    } else if (type === "error") {
      status.classList.add("error-message");
    }
  };

  const validate = () => {
    let ok = true;
    const name = $("#name").value.trim();
    const email = $("#email").value.trim();
    const message = $("#message").value.trim();

    setError("name", "");
    setError("email", "");
    setError("message", "");
    showStatus("", "");

    if (name.length < 2) {
      setError("name", "Please enter your name (at least 2 characters).");
      ok = false;
    }

    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!emailOk) {
      setError("email", "Please enter a valid email address.");
      ok = false;
    }

    if (message.length < 10) {
      setError("message", "Message should be at least 10 characters.");
      ok = false;
    }

    if (!ok) {
      showStatus("Please fix the highlighted fields and try again.", "error");
    }

    return ok;
  };

  form.addEventListener("submit", (e) => {
    e.preventDefault();
    if (!validate()) return;

    showStatus("✅ Message validated successfully!", "success");
    form.reset();
  });
}

function setYear() {
  const year = $("#year");
  if (year) year.textContent = String(new Date().getFullYear());
}

renderProjects();
setupProjectSearch();
setupMobileMenu();
setupThemeToggle();
setupScrollSpy();
setupContactForm();
setYear();