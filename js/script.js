/*=============== PRELOADER ===============*/
window.addEventListener("load", () => {
  const spinner = document.querySelector("#spinner");
  if (spinner) {
    spinner.classList.remove("show");
    spinner.addEventListener("transitionend", () => {
      spinner.style.display = "none";
    });
  }

  window.scrollTo(0, 0);

  // Initialize ScrollReveal for various elements
  const revealOptions = {
    origin: "bottom",
    distance: "50px",
    duration: 1000,
    delay: 200,
    easing: "ease-in-out",
  };

  ScrollReveal().reveal(".left_anim", { ...revealOptions, origin: "left" });
  ScrollReveal().reveal(".top_bar .col-lg-4", { ...revealOptions, origin: "right" });
  ScrollReveal().reveal(".header .logo, .header .menuBtn, .header .non", { ...revealOptions, origin: "top" });
  ScrollReveal().reveal(".p-33", revealOptions);
  ScrollReveal().reveal(".section-title", revealOptions);
  ScrollReveal().reveal(".about-text", { ...revealOptions, origin: "right" });
  ScrollReveal().reveal(".about-image", { ...revealOptions, origin: "left" });
  ScrollReveal().reveal(".top-anim", { ...revealOptions, origin: "top" });
});

/*=============== HEADER ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector(".header");
  let lastScrollY = window.scrollY;

  window.addEventListener("scroll", () => {
    if (header) {
      header.classList.toggle("hide", window.scrollY > lastScrollY);
      header.classList.toggle("scrolled", window.pageYOffset > 0);
      lastScrollY = window.scrollY;
    }
    setActiveLink();
  });

  const menuBtn = document.querySelector(".menuBtn");
  const menu = document.getElementById("menu");
  const overlay = document.getElementById("overlay");
  const navLinks = document.querySelectorAll(".non .nav-link, .menu .nav-link");
  const sections = document.querySelectorAll("section");

  function openMenu() {
    menu.classList.add("open");
    overlay.classList.add("open");
    menuBtn.classList.replace("fa-bars", "fa-times");
  }

  function closeMenu() {
    menu.classList.remove("open");
    overlay.classList.remove("open");
    menuBtn.classList.replace("fa-times", "fa-bars");
    removeHashFromUrl();
  }

  function removeHashFromUrl() {
    if (window.location.hash) {
      window.history.pushState("", document.title, window.location.pathname + window.location.search);
    }
  }

  function setActiveLink() {
    let currentSection = sections[0];
    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        currentSection = section;
      }
    });

    navLinks.forEach((navLink) => {
      navLink.classList.toggle("active", navLink.getAttribute("href") === `#${currentSection.id}`);
    });
  }

  window.addEventListener("scroll", setActiveLink);

  menuBtn?.addEventListener("click", () => {
    menu.classList.contains("open") ? closeMenu() : openMenu();
  });

  navLinks.forEach((navLink) => {
    navLink.addEventListener("click", (event) => {
      const href = navLink.getAttribute("href");

      // Skip handling if the link is external (has a file path)
      if (href.includes(".html")) {
        return; // Allow external links to work normally
      }

      event.preventDefault();
      closeMenu();
      const target = document.querySelector(href);
      if (target) {
        window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      }
    });
  });

  overlay?.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  const registration = document.getElementById("registrationn");
  const submissionguidelines = document.getElementById("submissionguidelines");

  registration?.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(registration.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => registration.removeAttribute("href"), 1000);
    }
  });

  submissionguidelines?.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(submissionguidelines.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => submissionguidelines.removeAttribute("href"), 1000);
    }
  });

  setActiveLink();
});

/*=============== FOOTER ===============*/
document.addEventListener("DOMContentLoaded", () => {
  const quickLinks = document.getElementById("quick-links");
  const links = quickLinks?.getElementsByTagName("a");

  Array.from(links || []).forEach((link) => {
    link.addEventListener("click", (event) => {
      event.preventDefault();
      const targetId = link.getAttribute("href").substring(1);
      const targetElement = document.getElementById(targetId);
      if (targetElement) {
        window.scrollTo({ top: targetElement.offsetTop, behavior: "smooth" });
      }

      if (history.pushState) {
        history.pushState(null, null, window.location.pathname + window.location.search);
      } else {
        window.location.hash = "";
      }
    });
  });
});

/*=============== BACK TO TOP ===============*/
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  if (scrollUpButton) {
    scrollUpButton.classList.toggle("show-scroll", window.scrollY >= 350);
  }
};

const scrollToTop = () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
};

window.addEventListener("scroll", scrollUp);

const scrollUpButton = document.getElementById("scroll-up");
scrollUpButton?.addEventListener("click", (event) => {
  event.preventDefault();
  scrollToTop();
});

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
