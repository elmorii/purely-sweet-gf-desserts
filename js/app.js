/* ==========================================================================
   Purely Sweet — Free Recipe Filtering, Recipe Modal & Payhip CTA
   ========================================================================== */

(function () {
  const { ebook, recipes } = window.PURELY_SWEET_DATA;

  let activeFilter = "all";
  let searchQuery = "";

  const recipesGrid = document.getElementById("recipesGrid");
  const filterBar = document.getElementById("filterBar");
  const recipeSearch = document.getElementById("recipeSearch");
  const recipeModal = document.getElementById("recipeModal");
  const recipeModalContent = document.getElementById("recipeModalContent");
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  // Render the 4 Free Recipes
  function renderRecipes() {
    if (!recipesGrid) return;
    const q = searchQuery.trim().toLowerCase();
    const filtered = recipes.filter((r) => {
      const matchesFilter = activeFilter === "all" || r.categories.includes(activeFilter);
      const matchesQuery =
        !q ||
        r.title.toLowerCase().includes(q) ||
        r.summary.toLowerCase().includes(q) ||
        r.ingredients.some((i) => i.toLowerCase().includes(q)) ||
        r.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });

    if (filtered.length === 0) {
      recipesGrid.innerHTML = `<p style="grid-column: 1 / -1; text-align: center; color: var(--ink-muted); padding: 2rem 0;">No recipes matched "${searchQuery}". Try searching for "almond", "chocolate", or "lemon".</p>`;
      return;
    }

    recipesGrid.innerHTML = filtered
      .map(
        (r) => `
      <article class="recipe-card" data-open-recipe="${r.id}" tabindex="0" role="button" aria-label="View gluten-free dessert recipe for ${r.title}">
        <div class="recipe-img-wrap">
          <img src="${r.image}" alt="${r.title} — gluten-free dessert recipe" width="800" height="600" loading="lazy" />
          <span class="recipe-time-badge">⏱ ${r.time}</span>
        </div>
        <div class="recipe-body">
          <div class="recipe-tags">
            ${r.tags.map((t) => `<span class="diet-tag">${t}</span>`).join("")}
          </div>
          <h3>${r.title}</h3>
          <p>${r.summary}</p>
          <span class="recipe-link">Read Full Recipe →</span>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Open Recipe Detail Modal with Payhip "Buy the book — $5" CTA
  function openRecipeModal(recipeId) {
    const r = recipes.find((item) => item.id === recipeId);
    if (!r || !recipeModal || !recipeModalContent) return;

    recipeModalContent.innerHTML = `
      <img class="recipe-modal-hero" src="${r.image}" alt="${r.title} — gluten-free dessert recipe" />
      <div class="recipe-tags" style="margin-bottom: 0.6rem;">
        ${r.tags.map((t) => `<span class="diet-tag">${t}</span>`).join("")}
      </div>
      <h2>${r.title}</h2>
      <div class="recipe-stats-bar">
        <span><strong>Time:</strong> ${r.time}</span>
        <span><strong>Yield:</strong> ${r.yield}</span>
        <span><strong>Level:</strong> ${r.difficulty}</span>
      </div>
      <div class="recipe-columns">
        <div>
          <h3>Ingredients</h3>
          <ul class="ingredient-list">
            ${r.ingredients
              .map(
                (ing) => `
              <li>
                <label>
                  <input type="checkbox" />
                  <span>${ing}</span>
                </label>
              </li>`
              )
              .join("")}
          </ul>
        </div>
        <div>
          <h3>Instructions</h3>
          <ol class="step-list">
            ${r.steps.map((s) => `<li>${s}</li>`).join("")}
          </ol>
        </div>
      </div>
      <div class="recipe-modal-cta">
        <div>
          <strong>Love this recipe?</strong>
          <div style="font-size: 0.85rem; color: var(--ink-muted);">Get all 50 triple-tested gluten-free dessert recipes in <em>Gluten-Free Desserts</em>.</div>
        </div>
        <button
          type="button"
          class="btn btn-primary btn-sm payhip-nav-btn"
          data-payhip-product="${ebook.id}"
          data-close-modal="recipeModal"
        >Buy the book — $${ebook.price}</button>
      </div>
    `;
    openModal(recipeModal);
  }

  function openModal(modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    if (!modal) return;
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Event Delegation
  document.addEventListener("click", (e) => {
    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(document.getElementById(closeBtn.getAttribute("data-close-modal")));
      // Note: do not return early if this button also triggers Payhip checkout
      if (!closeBtn.hasAttribute("data-payhip-product")) return;
    }

    const recipeCard = e.target.closest("[data-open-recipe]");
    if (recipeCard) {
      openRecipeModal(recipeCard.getAttribute("data-open-recipe"));
      return;
    }

    if (e.target === recipeModal) {
      closeModal(recipeModal);
    }
  });

  // Keyboard accessibility
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && recipeModal && recipeModal.classList.contains("open")) {
      closeModal(recipeModal);
    }
    if (e.key === "Enter" && document.activeElement?.hasAttribute("data-open-recipe")) {
      openRecipeModal(document.activeElement.getAttribute("data-open-recipe"));
    }
  });

  // Filter & Search
  if (filterBar) {
    filterBar.addEventListener("click", (e) => {
      const chip = e.target.closest(".filter-chip");
      if (!chip) return;
      filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
      chip.classList.add("active");
      activeFilter = chip.getAttribute("data-filter");
      renderRecipes();
    });
  }

  if (recipeSearch) {
    recipeSearch.addEventListener("input", (e) => {
      searchQuery = e.target.value;
      renderRecipes();
    });
  }

  // Mobile Menu
  if (mobileMenuBtn && mobileNav) {
    mobileMenuBtn.addEventListener("click", () => {
      const isOpen = mobileNav.classList.toggle("open");
      mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
    });

    mobileNav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => mobileNav.classList.remove("open"));
    });
  }

  renderRecipes();
})();
