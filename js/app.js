/* ==========================================================================
   Purely Sweet — Interactive Storefront, Cart, Recipe Filter & Modals
   ========================================================================== */

(function () {
  const { ebooks, recipes } = window.PURELY_SWEET_DATA;

  // State
  let cart = JSON.parse(localStorage.getItem("purely_sweet_cart") || "[]");
  let activeFilter = "all";
  let searchQuery = "";
  let promoApplied = false;

  // DOM Elements
  const ebooksGrid = document.getElementById("ebooksGrid");
  const recipesGrid = document.getElementById("recipesGrid");
  const filterBar = document.getElementById("filterBar");
  const recipeSearch = document.getElementById("recipeSearch");
  const cartTrigger = document.getElementById("cartTrigger");
  const cartCount = document.getElementById("cartCount");
  const cartDrawer = document.getElementById("cartDrawer");
  const cartBackdrop = document.getElementById("cartBackdrop");
  const closeCartBtn = document.getElementById("closeCartBtn");
  const cartItemsEl = document.getElementById("cartItems");
  const cartSubtotalEl = document.getElementById("cartSubtotal");
  const cartDiscountEl = document.getElementById("cartDiscount");
  const discountRow = document.getElementById("discountRow");
  const cartTotalEl = document.getElementById("cartTotal");
  const checkoutBtn = document.getElementById("checkoutBtn");
  const promoInput = document.getElementById("promoInput");
  const applyPromoBtn = document.getElementById("applyPromoBtn");
  const promoMsg = document.getElementById("promoMsg");
  const toastEl = document.getElementById("toast");

  // Modals
  const recipeModal = document.getElementById("recipeModal");
  const recipeModalContent = document.getElementById("recipeModalContent");
  const previewModal = document.getElementById("previewModal");
  const lookInsideBtn = document.getElementById("lookInsideBtn");
  const checkoutModal = document.getElementById("checkoutModal");
  const checkoutSummary = document.getElementById("checkoutSummary");
  const checkoutForm = document.getElementById("checkoutForm");
  const checkoutStepForm = document.getElementById("checkoutStepForm");
  const checkoutStepSuccess = document.getElementById("checkoutStepSuccess");
  const successEmailText = document.getElementById("successEmailText");
  const downloadList = document.getElementById("downloadList");

  // Mobile Menu
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const mobileNav = document.getElementById("mobileNav");

  // Newsletter
  const newsletterForm = document.getElementById("newsletterForm");
  const newsletterEmail = document.getElementById("newsletterEmail");
  const newsletterFeedback = document.getElementById("newsletterFeedback");

  // Toast helper
  let toastTimer = null;
  function showToast(message) {
    toastEl.textContent = message;
    toastEl.classList.add("show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toastEl.classList.remove("show"), 2600);
  }

  // Render Ebook Catalog
  function renderEbooks() {
    ebooksGrid.innerHTML = ebooks
      .map(
        (book) => `
      <article class="ebook-card ${book.bundle ? "bundle-card" : ""}">
        <div class="ebook-thumb">
          <img src="${book.image}" alt="${book.title} — gluten free dessert recipes ebook" width="800" height="600" loading="lazy" />
          <span class="ebook-tag">${book.tag}</span>
        </div>
        <div class="ebook-body">
          <span class="ebook-meta">${book.subtitle}</span>
          <h3>${book.title}</h3>
          <p>${book.description}</p>
          <div class="ebook-footer">
            <div class="ebook-price">
              $${book.price}
              ${book.oldPrice ? `<span class="old">$${book.oldPrice}</span>` : ""}
            </div>
            <button class="btn ${book.bundle ? "btn-primary" : "btn-secondary"} btn-sm" data-add-ebook="${book.id}">
              Add to Bag
            </button>
          </div>
        </div>
      </article>
    `
      )
      .join("");
  }

  // Render Free Recipes
  function renderRecipes() {
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
      <article class="recipe-card" data-open-recipe="${r.id}" tabindex="0" role="button" aria-label="View recipe for ${r.title}">
        <div class="recipe-img-wrap">
          <img src="${r.image}" alt="${r.title} — gluten free dessert recipe" width="800" height="600" loading="lazy" />
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

  // Recipe Modal
  function openRecipeModal(recipeId) {
    const r = recipes.find((item) => item.id === recipeId);
    if (!r) return;

    recipeModalContent.innerHTML = `
      <img class="recipe-modal-hero" src="${r.image}" alt="${r.title}" />
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
          <div style="font-size: 0.85rem; color: var(--ink-muted);">Get 59 more triple-tested desserts in <em>Purely Sweet</em>.</div>
        </div>
        <button class="btn btn-primary btn-sm" data-add-ebook="purely-sweet" data-close-modal="recipeModal">Add Ebook — $24</button>
      </div>
    `;
    openModal(recipeModal);
  }

  // Cart Functions
  function saveCart() {
    localStorage.setItem("purely_sweet_cart", JSON.stringify(cart));
  }

  function addToCart(ebookId) {
    const book = ebooks.find((b) => b.id === ebookId);
    if (!book) return;
    const existing = cart.find((item) => item.id === ebookId);
    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id: book.id, qty: 1 });
    }
    saveCart();
    renderCart();
    openCart();
    showToast(`Added "${book.title}" to your bag`);
  }

  function updateQty(ebookId, delta) {
    const item = cart.find((i) => i.id === ebookId);
    if (!item) return;
    item.qty += delta;
    if (item.qty <= 0) {
      cart = cart.filter((i) => i.id !== ebookId);
    }
    saveCart();
    renderCart();
  }

  function removeFromCart(ebookId) {
    cart = cart.filter((i) => i.id !== ebookId);
    saveCart();
    renderCart();
  }

  function getCartTotals() {
    const subtotal = cart.reduce((sum, item) => {
      const book = ebooks.find((b) => b.id === item.id);
      return sum + (book ? book.price * item.qty : 0);
    }, 0);
    const discount = promoApplied ? Math.round(subtotal * 0.1 * 100) / 100 : 0;
    const total = Math.max(0, subtotal - discount);
    return { subtotal, discount, total };
  }

  function renderCart() {
    const totalCount = cart.reduce((acc, i) => acc + i.qty, 0);
    cartCount.textContent = totalCount;

    if (cart.length === 0) {
      cartItemsEl.innerHTML = `
        <div class="cart-empty">
          <p style="font-size: 2rem; margin: 0 0 0.5rem;">🍰</p>
          <p><strong>Your baking bag is empty</strong></p>
          <p style="font-size: 0.86rem;">Add a gluten-free dessert ebook to get started.</p>
        </div>
      `;
      checkoutBtn.disabled = true;
    } else {
      cartItemsEl.innerHTML = cart
        .map((item) => {
          const book = ebooks.find((b) => b.id === item.id);
          if (!book) return "";
          return `
            <div class="cart-item">
              <img src="${book.image}" alt="${book.title}" />
              <div>
                <p class="cart-item-title">${book.title}</p>
                <span class="cart-item-meta">Instant PDF · $${book.price}</span>
                <div class="cart-qty">
                  <button class="qty-btn" data-qty-dec="${book.id}" aria-label="Decrease quantity">−</button>
                  <span>${item.qty}</span>
                  <button class="qty-btn" data-qty-inc="${book.id}" aria-label="Increase quantity">+</button>
                  <button class="remove-btn" data-remove-item="${book.id}">Remove</button>
                </div>
              </div>
              <strong>$${book.price * item.qty}</strong>
            </div>
          `;
        })
        .join("");
      checkoutBtn.disabled = false;
    }

    const { subtotal, discount, total } = getCartTotals();
    cartSubtotalEl.textContent = `$${subtotal.toFixed(2).replace(/\.00$/, "")}`;
    if (promoApplied && discount > 0) {
      discountRow.classList.remove("hidden");
      cartDiscountEl.textContent = `-$${discount.toFixed(2)}`;
    } else {
      discountRow.classList.add("hidden");
    }
    cartTotalEl.textContent = `$${total.toFixed(2).replace(/\.00$/, "")}`;
  }

  function openCart() {
    cartDrawer.classList.add("open");
    cartBackdrop.classList.add("open");
    cartDrawer.setAttribute("aria-hidden", "false");
  }

  function closeCart() {
    cartDrawer.classList.remove("open");
    cartBackdrop.classList.remove("open");
    cartDrawer.setAttribute("aria-hidden", "true");
  }

  // Modal helpers
  function openModal(modal) {
    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  function closeModal(modal) {
    modal.classList.remove("open");
    modal.setAttribute("aria-hidden", "true");
    document.body.style.overflow = "";
  }

  // Open Checkout
  function openCheckout() {
    closeCart();
    checkoutStepForm.classList.remove("hidden");
    checkoutStepSuccess.classList.add("hidden");
    const { total, discount } = getCartTotals();
    checkoutSummary.innerHTML = `
      ${cart
        .map((item) => {
          const book = ebooks.find((b) => b.id === item.id);
          return `<div style="display:flex;justify-content:space-between;margin-bottom:0.35rem;">
            <span>${book.title} × ${item.qty}</span>
            <strong>$${book.price * item.qty}</strong>
          </div>`;
        })
        .join("")}
      ${discount > 0 ? `<div style="display:flex;justify-content:space-between;color:var(--sage);"><span>Promo SWEET10</span><span>-$${discount.toFixed(2)}</span></div>` : ""}
      <div style="display:flex;justify-content:space-between;border-top:1px solid var(--border);margin-top:0.6rem;padding-top:0.6rem;font-weight:700;">
        <span>Total Due</span>
        <span>$${total.toFixed(2).replace(/\.00$/, "")}</span>
      </div>
    `;
    document.getElementById("payNowBtn").textContent = `Pay $${total.toFixed(2).replace(/\.00$/, "")} & Download Now`;
    openModal(checkoutModal);
  }

  // Global Event Delegation
  document.addEventListener("click", (e) => {
    const addBtn = e.target.closest("[data-add-ebook]");
    if (addBtn) {
      const closeTarget = addBtn.getAttribute("data-close-modal");
      if (closeTarget) closeModal(document.getElementById(closeTarget));
      addToCart(addBtn.getAttribute("data-add-ebook"));
      return;
    }

    const recipeCard = e.target.closest("[data-open-recipe]");
    if (recipeCard) {
      openRecipeModal(recipeCard.getAttribute("data-open-recipe"));
      return;
    }

    const closeBtn = e.target.closest("[data-close-modal]");
    if (closeBtn) {
      closeModal(document.getElementById(closeBtn.getAttribute("data-close-modal")));
      return;
    }

    if (e.target.classList.contains("modal-backdrop")) {
      closeModal(e.target);
      return;
    }

    const decBtn = e.target.closest("[data-qty-dec]");
    if (decBtn) return updateQty(decBtn.getAttribute("data-qty-dec"), -1);

    const incBtn = e.target.closest("[data-qty-inc]");
    if (incBtn) return updateQty(incBtn.getAttribute("data-qty-inc"), 1);

    const remBtn = e.target.closest("[data-remove-item]");
    if (remBtn) return removeFromCart(remBtn.getAttribute("data-remove-item"));
  });

  // Keyboard accessibility for recipe cards & Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeCart();
      [recipeModal, previewModal, checkoutModal].forEach((m) => closeModal(m));
    }
    if (e.key === "Enter" && document.activeElement?.hasAttribute("data-open-recipe")) {
      openRecipeModal(document.activeElement.getAttribute("data-open-recipe"));
    }
  });

  // Filter & Search
  filterBar.addEventListener("click", (e) => {
    const chip = e.target.closest(".filter-chip");
    if (!chip) return;
    filterBar.querySelectorAll(".filter-chip").forEach((c) => c.classList.remove("active"));
    chip.classList.add("active");
    activeFilter = chip.getAttribute("data-filter");
    renderRecipes();
  });

  recipeSearch.addEventListener("input", (e) => {
    searchQuery = e.target.value;
    renderRecipes();
  });

  // Cart & Promo
  cartTrigger.addEventListener("click", openCart);
  closeCartBtn.addEventListener("click", closeCart);
  cartBackdrop.addEventListener("click", closeCart);
  checkoutBtn.addEventListener("click", openCheckout);

  applyPromoBtn.addEventListener("click", () => {
    const code = promoInput.value.trim().toUpperCase();
    if (code === "SWEET10") {
      promoApplied = true;
      promoMsg.textContent = "✓ SWEET10 applied — 10% off your order!";
      promoMsg.style.color = "var(--sage)";
      renderCart();
    } else {
      promoApplied = false;
      promoMsg.textContent = "Code not recognized. Try SWEET10.";
      promoMsg.style.color = "var(--accent)";
      renderCart();
    }
  });

  // Look Inside
  if (lookInsideBtn) {
    lookInsideBtn.addEventListener("click", () => openModal(previewModal));
  }

  // Checkout Form Submission
  checkoutForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = document.getElementById("buyerEmail").value.trim();
    const purchased = cart.map((item) => ebooks.find((b) => b.id === item.id)).filter(Boolean);

    successEmailText.textContent = `We’ve sent a receipt and backup download links to ${email}.`;
    downloadList.innerHTML = purchased
      .map(
        (b) => `
      <div class="download-item">
        <span>📘 ${b.fileLabel}</span>
        <button class="btn btn-primary btn-sm" type="button" onclick="alert('Demo download started: ${b.fileLabel}\\n\\nTo accept real payments, connect Stripe Payment Links or Gumroad in js/app.js.')">Download</button>
      </div>
    `
      )
      .join("");

    cart = [];
    promoApplied = false;
    saveCart();
    renderCart();

    checkoutStepForm.classList.add("hidden");
    checkoutStepSuccess.classList.remove("hidden");
  });

  // Newsletter
  newsletterForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = newsletterEmail.value.trim();
    if (!email) return;
    newsletterFeedback.textContent = `✓ Sent! Check ${email} for your 5 Free Gluten-Free Desserts PDF.`;
    newsletterEmail.value = "";
    showToast("Free mini-ebook sent to your inbox!");
  });

  // Mobile Menu
  mobileMenuBtn.addEventListener("click", () => {
    const isOpen = mobileNav.classList.toggle("open");
    mobileMenuBtn.setAttribute("aria-expanded", String(isOpen));
  });

  mobileNav.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => mobileNav.classList.remove("open"));
  });

  // Init
  renderEbooks();
  renderRecipes();
  renderCart();
})();
