document.documentElement.classList.add("js");

const body = document.body;
const baseUrl = body.dataset.baseUrl || "";
const menuButton = document.querySelector(".menu-toggle");
const sidebar = document.querySelector(".site-sidebar");

if (menuButton && sidebar) {
  menuButton.addEventListener("click", () => {
    const isOpen = sidebar.classList.toggle("is-open");
    menuButton.setAttribute("aria-expanded", String(isOpen));
  });

  sidebar.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      sidebar.classList.remove("is-open");
      menuButton.setAttribute("aria-expanded", "false");
    }
  });
}

const dialog = document.querySelector(".search-dialog");
const input = document.querySelector("#site-search");
const results = document.querySelector(".search-results");
const searchButtons = document.querySelectorAll(".search-open");
let searchIndex;

const escapeHtml = (value) =>
  value.replace(/[&<>'"]/g, (character) => ({
    "&": "&amp;",
    "<": "&lt;",
    ">": "&gt;",
    "'": "&#39;",
    '"': "&quot;",
  })[character]);

const loadSearchIndex = async () => {
  if (!searchIndex) {
    const response = await fetch(`${baseUrl}/search-index.json`);
    if (!response.ok) throw new Error("Search index unavailable");
    searchIndex = await response.json();
  }
  return searchIndex;
};

const scoreEntry = (entry, terms) => {
  const title = entry.title.toLowerCase();
  const description = entry.description.toLowerCase();
  const text = entry.text.toLowerCase();
  let score = 0;
  for (const term of terms) {
    if (!text.includes(term) && !title.includes(term) && !description.includes(term)) return 0;
    if (title === term) score += 20;
    else if (title.includes(term)) score += 10;
    if (description.includes(term)) score += 4;
    if (text.includes(term)) score += 1;
  }
  return score;
};

const runSearch = async () => {
  const query = input.value.trim().toLowerCase();
  if (query.length < 2) {
    results.replaceChildren();
    return;
  }

  const terms = query.split(/\s+/).filter(Boolean);
  try {
    const index = await loadSearchIndex();
    const matches = index
      .map((entry) => ({ entry, score: scoreEntry(entry, terms) }))
      .filter(({ score }) => score > 0)
      .sort((left, right) => right.score - left.score)
      .slice(0, 12);

    if (!matches.length) {
      results.innerHTML = "<li><p>No matching publication pages.</p></li>";
      return;
    }

    results.innerHTML = matches.map(({ entry }) => `
      <li>
        <a href="${escapeHtml(entry.url)}">
          <strong>${escapeHtml(entry.title)}</strong>
          <span>${escapeHtml(entry.description)}</span>
        </a>
      </li>
    `).join("");
  } catch (_) {
    results.innerHTML = "<li><p>Search is temporarily unavailable. Use the publication navigation instead.</p></li>";
  }
};

if (dialog && input && results) {
  searchButtons.forEach((button) => {
    button.addEventListener("click", () => {
      dialog.showModal();
      input.focus();
      loadSearchIndex().catch(() => {});
    });
  });

  input.addEventListener("input", runSearch);

  dialog.addEventListener("click", (event) => {
    if (event.target === dialog) dialog.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "/" && !dialog.open && !event.metaKey && !event.ctrlKey && !event.altKey) {
      const target = event.target;
      if (!(target instanceof HTMLInputElement) && !(target instanceof HTMLTextAreaElement)) {
        event.preventDefault();
        dialog.showModal();
        input.focus();
      }
    }
  });
}
