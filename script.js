document.addEventListener("DOMContentLoaded", () => {
  // 1. Navegación Móvil y Accesibilidad ARIA
  const menuToggle = document.getElementById("menuToggle");
  const navMenu = document.getElementById("navMenu");
  const navLinks = navMenu ? navMenu.querySelectorAll("a") : [];

  if (menuToggle && navMenu) {
    const closeMenu = () => {
      navMenu.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    };

    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");
      menuToggle.setAttribute("aria-expanded", String(isOpen));
      menuToggle.setAttribute("aria-label", isOpen ? "Close navigation" : "Open navigation");
    });

    navLinks.forEach((link) => {
      link.addEventListener("click", closeMenu);
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && navMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });

    window.addEventListener("resize", () => {
      if (window.innerWidth > 768 && navMenu.classList.contains("is-open")) {
        closeMenu();
      }
    });
  }

  // Lógica garantizada para copiar al portapapeles
  const copyEmailBtn = document.getElementById("copyEmailBtn");
  const copyBtnText = document.getElementById("copyBtnText");
  const copyNotification = document.getElementById("copyNotification");
  const emailToCopy = "crowxfieldx@gmail.com";

  if (copyEmailBtn) {
    copyEmailBtn.addEventListener("click", () => {
      // Método 1: Clipboard API (para navegadores modernos y HTTPS / localhost)
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard.writeText(emailToCopy)
          .then(() => showSuccessFeedback())
          .catch(() => execCommandFallback(emailToCopy));
      } else {
        // Método 2: Fallback compatible con HTTP local y móviles antiguos
        execCommandFallback(emailToCopy);
      }
    });
  }

  function showSuccessFeedback() {
    if (copyBtnText) copyBtnText.textContent = "Copied! ✓";
    if (copyNotification) copyNotification.style.display = "block";

    setTimeout(() => {
      if (copyBtnText) copyBtnText.textContent = "Copy Email ↗";
      if (copyNotification) copyNotification.style.display = "none";
    }, 3000);
  }

  function execCommandFallback(text) {
    const hiddenInput = document.createElement("input");
    hiddenInput.setAttribute("value", text);
    hiddenInput.style.position = "absolute";
    hiddenInput.style.left = "-9999px";
    document.body.appendChild(hiddenInput);
    
    hiddenInput.select();
    hiddenInput.setSelectionRange(0, 99999);

    try {
      document.execCommand("copy");
      showSuccessFeedback();
    } catch (err) {
      alert("Address: " + text); // Respaldo final si el navegador bloquea el portapapeles
    } finally {
      document.body.removeChild(hiddenInput);
    }
  }
  // 3. Año dinámico en el Footer
  const year = document.getElementById("year");
  if (year) {
    year.textContent = new Date().getFullYear();
  }
});