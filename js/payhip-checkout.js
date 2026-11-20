/* ==========================================================================
   Purely Sweet — Payhip Embedded In-Website Checkout Window
   Loads the actual Payhip checkout website inside a popup modal window
   on purely sweet without ever redirecting or taking the client away.
   ========================================================================== */

(function () {
  const PRODUCT_ID = "Me7UI";
  const EMBED_CHECKOUT_URL = `https://payhip.com/buy?link[]=${encodeURIComponent(PRODUCT_ID)}&payhip_js=true&type=overlay`;

  function createEmbeddedCheckoutModal() {
    let modal = document.getElementById("purelySweetCheckoutModal");
    if (modal) return modal;

    modal = document.createElement("div");
    modal.id = "purelySweetCheckoutModal";
    modal.className = "modal-backdrop payhip-embed-backdrop";
    modal.setAttribute("aria-hidden", "true");
    modal.setAttribute("role", "dialog");
    modal.setAttribute("aria-modal", "true");
    modal.setAttribute("aria-label", "Payhip Checkout Window");

    modal.innerHTML = `
      <div class="modal-dialog payhip-embed-dialog">
        <!-- Modal Top Bar -->
        <div class="payhip-embed-topbar">
          <div class="payhip-embed-title-group">
            <span class="brand-mark" style="font-size: 1.1rem; color: var(--accent);">✦</span>
            <div>
              <h3 class="payhip-embed-heading">50 Gluten-Free Desserts Ebook</h3>
              <span class="payhip-embed-sub">Secure Payhip Checkout · $5 Instant PDF</span>
            </div>
          </div>
          <button type="button" class="modal-close payhip-embed-close" id="closePayhipEmbedModal" aria-label="Close checkout window">✕</button>
        </div>

        <!-- Embedded Payhip Checkout Website Frame -->
        <div class="payhip-embed-frame-container">
          <div class="payhip-embed-loader" id="payhipEmbedLoader">
            <div class="loader-spinner"></div>
            <p>Loading secure Payhip checkout…</p>
          </div>
          <iframe
            id="payhipCheckoutIframe"
            class="payhip-checkout-frame"
            src=""
            title="Payhip Secure Checkout"
            allow="payment *"
            loading="lazy"
          ></iframe>
        </div>

        <!-- Trust Footer -->
        <div class="payhip-embed-footer">
          <span>🔒 256-Bit SSL Encrypted Checkout</span>
          <span>•</span>
          <span>⚡ Instant PDF Download Link</span>
          <span>•</span>
          <span>One-Time $5 Payment</span>
        </div>
      </div>
    `;

    document.body.appendChild(modal);

    const closeBtn = modal.querySelector("#closePayhipEmbedModal");
    const iframe = modal.querySelector("#payhipCheckoutIframe");
    const loader = modal.querySelector("#payhipEmbedLoader");

    iframe.addEventListener("load", () => {
      if (iframe.getAttribute("src")) {
        loader.classList.add("hidden");
      }
    });

    const closeModal = () => {
      modal.classList.remove("open");
      modal.setAttribute("aria-hidden", "true");
      document.body.style.overflow = "";
    };

    closeBtn.addEventListener("click", closeModal);
    modal.addEventListener("click", (e) => {
      if (e.target === modal) closeModal();
    });

    document.addEventListener("keydown", (e) => {
      if (e.key === "Escape" && modal.classList.contains("open")) {
        closeModal();
      }
    });

    return modal;
  }

  function openEmbeddedCheckout() {
    const modal = createEmbeddedCheckoutModal();
    const iframe = modal.querySelector("#payhipCheckoutIframe");
    const loader = modal.querySelector("#payhipEmbedLoader");

    // Load or refresh the Payhip checkout iframe
    if (iframe.getAttribute("src") !== EMBED_CHECKOUT_URL) {
      loader.classList.remove("hidden");
      iframe.src = EMBED_CHECKOUT_URL;
    }

    modal.classList.add("open");
    modal.setAttribute("aria-hidden", "false");
    document.body.style.overflow = "hidden";
  }

  // Intercept all "Buy Now" triggers across the website
  document.addEventListener("click", (e) => {
    const trigger = e.target.closest(
      "[data-payhip-product], .payhip-buy-button, .open-checkout-modal, [data-open-checkout]"
    );
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      openEmbeddedCheckout();
    }
  });

  // Global trigger
  window.openPayhipCheckoutModal = openEmbeddedCheckout;
})();
