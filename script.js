/*=============== PRELOADER ===============*/
window.addEventListener("load", () => {
  // Hide the spinner after the page is fully loaded
  const spinner = document.querySelector("#spinner");
  if (spinner) {
    spinner.classList.remove("show");

    spinner.addEventListener("transitionend", () => {
      spinner.style.display = "none";
    });
  }

  // Scroll to the top when all external resources are loaded
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
  ScrollReveal().reveal(".header .logo, .header .search, .header .non", { ...revealOptions, origin: "top" });
  ScrollReveal().reveal(".p-33", revealOptions);
  ScrollReveal().reveal(".section-title", revealOptions);
  ScrollReveal().reveal(".about-text", { ...revealOptions, origin: "right" });
  ScrollReveal().reveal(".about-image", { ...revealOptions, origin: "left" });
  ScrollReveal().reveal(".top-anim", { ...revealOptions, origin: "top" });


  // Initialize WOW.js for animations
  new WOW().init();

  // Initialize counterUp for elements with data-toggle="counter-up" attribute
  $('[data-toggle="counter-up"]').counterUp({
    delay: 10,
    time: 2000
  });
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
        return; 
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

  const callForPaper = document.getElementById("callForPaper");
  const submissionOfPaper = document.getElementById("submissionOfPaper");

  callForPaper?.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(callForPaper.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => callForPaper.removeAttribute("href"), 1000);
    }
  });

  submissionOfPaper?.addEventListener("click", (event) => {
    event.preventDefault();
    const target = document.querySelector(submissionOfPaper.getAttribute("href"));
    if (target) {
      window.scrollTo({ top: target.offsetTop, behavior: "smooth" });
      setTimeout(() => submissionOfPaper.removeAttribute("href"), 1000);
    }
  });

  setActiveLink();
});

/*=============== COMMITTEE ===============*/
document.addEventListener('DOMContentLoaded', function () {
  var elem = document.querySelector('.committee-container');
  new Masonry(elem, {
    itemSelector: '.committee-card',
    columnWidth: '.committee-card',
    percentPosition: true,
    gutter: 10
  });
});

/*=============== SWIPER SLIDER ===============*/
var swiper = new Swiper(".mySwiper", {
  spaceBetween: 30,
  lazy: true,
  centeredSlides: true,
  effect: "fade",
  grabCursor: true,
  loop: true,

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },
});

var swiper = new Swiper(".custom-swiper", {
  slidesPerView: 1,
  spaceBetween: 30,
  loop: true,
  centeredSlides: false,
  slidesPerGroupSkip: 1,
  mousewheel: true,

  keyboard: {
    enabled: true,
  },

  autoplay: {
    delay: 3500,
    disableOnInteraction: false,
  },

  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },

  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },

  breakpoints: {
    // when window width is <= 768px
    768: {
      slidesPerView: 2,
      spaceBetween: 10,
    },

    // when window width is <= 1024px
    1024: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
  },
});

/*=============== GOOGLE FORM ===============*/
function adjustIframeSize() {
  const iframe = document.getElementById('googleForm');
  const screenWidth = window.innerWidth;

  // Adjust iframe dimensions based on screen size
  if (screenWidth < 576) {
    iframe.style.width = '100vh';
    iframe.style.height = '700px';
  } else if (screenWidth < 768) {
    iframe.style.width = '600px';
    iframe.style.height = '700px';
  } else {
    iframe.style.width = '800px';
    iframe.style.height = '700px';
  }
}   

  // Initial adjustment on page load
  adjustIframeSize();

  // Add an event listener to adjust iframe size on window resize
  window.addEventListener('resize', adjustIframeSize);

/*=============== FOOTER ===============*/
document.addEventListener("DOMContentLoaded", function () {
  const quickLinks = document.getElementById("quick-links");
  const links = quickLinks.getElementsByTagName("a");

  for (let link of links) {
    link.addEventListener("click", function (event) {
      const href = this.getAttribute("href");

      // If the link is an external link, open it as usual
      if (href.startsWith("http") || href.includes("://")) {
        return; // Let the browser handle external links
      }

      // If the link is internal, prevent default behavior and scroll smoothly
      event.preventDefault();
      if (href.startsWith("#")) {
        const targetId = href.substring(1);
        const targetElement = document.getElementById(targetId);

        if (targetElement) {
          window.scrollTo({
            top: targetElement.offsetTop,
            behavior: "smooth",
          });
        }

        // Optionally remove the fragment identifier from the URL
        if (history.pushState) {
          history.pushState(
            null,
            null,
            window.location.pathname + window.location.search
          );
        } else {
          window.location.hash = "";
        }
      }
    });
  }
});

/*=============== BACK TO TOP ===============*/
const scrollUp = () => {
  const scrollUpButton = document.getElementById("scroll-up");
  if (scrollUpButton) {
    if (window.scrollY >= 350) {
      scrollUpButton.classList.add("show-scroll");
    } else {
      scrollUpButton.classList.remove("show-scroll");
    }
  }
};

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
};

window.addEventListener("scroll", scrollUp);

const scrollUpButton = document.getElementById("scroll-up");
if (scrollUpButton) {
  scrollUpButton.addEventListener("click", (event) => {
    event.preventDefault();
    scrollToTop();
  });
}

if ("scrollRestoration" in history) {
  history.scrollRestoration = "manual";
}
