/**
 * MT DESENVOLVEDOR WEB - JS Vanilla
 * Funcionalidades otimizadas para performance e usabilidade.
 */

document.addEventListener("DOMContentLoaded", () => {
  /* ==========================================================================
     1. CONSTANTE PROFISSIONAL DO WHATSAPP
     Esta é a única fonte da verdade para o número de contato em todo o site.
     ========================================================================== */
  const WHATSAPP_NUMBER = "5521992702769";
  const DEFAULT_MESSAGE = "Olá! Encontrei seu portfólio e gostaria de conversar sobre a criação de um site.";

  // Aplica a lógica em todos os botões que possuam a classe 'wpp-btn'
  const wppButtons = document.querySelectorAll(".wpp-btn");
  wppButtons.forEach(btn => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      const encodedMsg = encodeURIComponent(DEFAULT_MESSAGE);
      const url = `https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMsg}`;
      window.open(url, "_blank", "noopener,noreferrer");
    });
  });

  /* ==========================================================================
     2. MENU HAMBÚRGUER MOBILE
     ========================================================================== */
  const hamburgerBtn = document.getElementById("hamburger-btn");
  const navMenu = document.getElementById("nav-menu");
  const navLinks = document.querySelectorAll(".nav-link");

  function toggleMenu() {
    const isActive = navMenu.classList.toggle("active");
    hamburgerBtn.classList.toggle("active");
    hamburgerBtn.setAttribute("aria-expanded", isActive);
    
    // Evita scroll no background quando menu estiver aberto
    document.body.style.overflow = isActive ? "hidden" : "";
  }

  function closeMenu() {
    navMenu.classList.remove("active");
    hamburgerBtn.classList.remove("active");
    hamburgerBtn.setAttribute("aria-expanded", "false");
    document.body.style.overflow = "";
  }

  if (hamburgerBtn && navMenu) {
    hamburgerBtn.addEventListener("click", toggleMenu);

    // Fecha o menu ao clicar em um link
    navLinks.forEach(link => {
      link.addEventListener("click", closeMenu);
    });
  }

  /* ==========================================================================
     3. NAVBAR STICKY AO SCROLL
     ========================================================================== */
  const navbar = document.getElementById("navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 30) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  /* ==========================================================================
     4. ANIMAÇÕES FADE-UP (Intersection Observer)
     Exibe elementos suavemente assim que entram na viewport.
     ========================================================================== */
  const fadeElements = document.querySelectorAll(".fade-up");

  // Verifica se o navegador suporta Observer
  if ("IntersectionObserver" in window) {
    const observerOptions = {
      root: null,
      rootMargin: "0px 0px -50px 0px",
      threshold: 0.1
    };

    const fadeObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target); // Anima apenas 1 vez
        }
      });
    }, observerOptions);

    fadeElements.forEach(el => fadeObserver.observe(el));
  } else {
    // Fallback: mostra tudo imediatamente se não suportar
    fadeElements.forEach(el => el.classList.add("is-visible"));
  }

  /* ==========================================================================
     5. ANO DINÂMICO NO FOOTER
     ========================================================================== */
  const yearSpan = document.getElementById("current-year");
  if (yearSpan) {
    yearSpan.textContent = new Date().getFullYear();
  }
});