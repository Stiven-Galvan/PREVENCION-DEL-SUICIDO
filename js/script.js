/* =====================================================
   PREVENCIÓN DEL SUICIDIO
   SCRIPT PRINCIPAL
===================================================== */

/* =====================================================
   1. MENÚ PARA CELULAR
===================================================== */

const menuToggle = document.getElementById("menuToggle");

const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {
  menuToggle.addEventListener("click", function () {
    navLinks.classList.toggle("open");
  });
}

/* =====================================================
   2. CERRAR MENÚ AL HACER CLICK
===================================================== */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {
  link.addEventListener("click", function () {
    if (navLinks) {
      navLinks.classList.remove("open");
    }
  });
});

/* =====================================================
   3. MODO OSCURO
===================================================== */

const themeButton = document.getElementById("themeButton");

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {
  document.body.classList.add("dark");

  if (themeButton) {
    themeButton.textContent = "☀";
  }
} else {
  if (themeButton) {
    themeButton.textContent = "☾";
  }
}

if (themeButton) {
  themeButton.addEventListener("click", function () {
    document.body.classList.toggle("dark");

    const darkMode = document.body.classList.contains("dark");

    if (darkMode) {
      themeButton.textContent = "☀";

      localStorage.setItem("theme", "dark");
    } else {
      themeButton.textContent = "☾";

      localStorage.setItem("theme", "light");
    }
  });
}

/* =====================================================
   4. BOTÓN VOLVER ARRIBA
===================================================== */

const topButton = document.getElementById("topButton");

if (topButton) {
  window.addEventListener("scroll", function () {
    if (window.scrollY > 500) {
      topButton.classList.add("visible");
    } else {
      topButton.classList.remove("visible");
    }
  });

  topButton.addEventListener("click", function () {
    window.scrollTo({
      top: 0,

      behavior: "smooth",
    });
  });
}

/* =====================================================
   5. ANIMACIONES AL HACER SCROLL
===================================================== */

const animatedElements = document.querySelectorAll(
  ".warning-card, .step, .protective-card, .video-card",
);

if ("IntersectionObserver" in window) {
  const observerOptions = {
    threshold: 0.12,
  };

  const observer = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("show");

          observer.unobserve(entry.target);
        }
      });
    },

    observerOptions,
  );

  animatedElements.forEach(function (element) {
    element.classList.add("animate");

    observer.observe(element);
  });
} else {
  animatedElements.forEach(function (element) {
    element.classList.add("show");
  });
}

/* =====================================================
   6. VIDEOS
===================================================== */

const videos = document.querySelectorAll("video");

videos.forEach(function (video) {
  video.addEventListener("play", function () {
    videos.forEach(function (otherVideo) {
      if (otherVideo !== video) {
        otherVideo.pause();
      }
    });
  });
});

/* =====================================================
   7. ENLACES INTERNOS
===================================================== */

const internalLinks = document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {
  link.addEventListener("click", function (event) {
    const targetId = link.getAttribute("href");

    if (targetId && targetId !== "#") {
      const target = document.querySelector(targetId);

      if (target) {
        event.preventDefault();

        target.scrollIntoView({
          behavior: "smooth",

          block: "start",
        });
      }
    }
  });
});

/* =====================================================
   8. PÁGINA CARGADA
===================================================== */

window.addEventListener("load", function () {
  document.body.classList.add("page-loaded");
});

/* =====================================================
   9. GALERÍA AUTOMÁTICA
===================================================== */

const galleryItems = document.querySelectorAll(".slider-item");

const galleryPrev = document.getElementById("galleryPrev");

const galleryNext = document.getElementById("galleryNext");

const galleryDots = document.getElementById("galleryDots");

const gallerySlider = document.getElementById("sliderGallery");

let galleryIndex = 0;

let galleryInterval = null;

/* Ejecutar solamente si existe */

if (
  galleryItems.length > 0 &&
  galleryPrev &&
  galleryNext &&
  galleryDots &&
  gallerySlider
) {
  /* =========================
     LIMPIAR PUNTOS
  ========================= */

  galleryDots.innerHTML = "";

  /* =========================
     CREAR PUNTOS
  ========================= */

  galleryItems.forEach(function (_, index) {
    const dot = document.createElement("button");

    dot.classList.add("slider-dot");

    dot.type = "button";

    dot.setAttribute(
      "aria-label",

      `Ir a la imagen ${index + 1}`,
    );

    dot.addEventListener("click", function () {
      galleryIndex = index;

      updateGallery();

      restartGalleryInterval();
    });

    galleryDots.appendChild(dot);
  });

  const dots = galleryDots.querySelectorAll(".slider-dot");

  /* =========================
     ACTUALIZAR GALERÍA
  ========================= */

  function updateGallery() {
    galleryItems.forEach(function (item) {
      item.classList.remove(
        "active",

        "prev",

        "next",
      );
    });

    dots.forEach(function (dot) {
      dot.classList.remove("active");
    });

    const prevIndex =
      galleryIndex === 0 ? galleryItems.length - 1 : galleryIndex - 1;

    const nextIndex =
      galleryIndex === galleryItems.length - 1 ? 0 : galleryIndex + 1;

    galleryItems[galleryIndex].classList.add("active");

    galleryItems[prevIndex].classList.add("prev");

    galleryItems[nextIndex].classList.add("next");

    dots[galleryIndex].classList.add("active");
  }

  /* =========================
     SIGUIENTE
  ========================= */

  function nextGalleryImage() {
    galleryIndex = (galleryIndex + 1) % galleryItems.length;

    updateGallery();
  }

  /* =========================
     ANTERIOR
  ========================= */

  function prevGalleryImage() {
    galleryIndex =
      (galleryIndex - 1 + galleryItems.length) % galleryItems.length;

    updateGallery();
  }

  /* =========================
     AUTOMÁTICO
     CADA 5 SEGUNDOS
  ========================= */

  function startGalleryInterval() {
    clearInterval(galleryInterval);

    galleryInterval = setInterval(
      nextGalleryImage,

      5000,
    );
  }

  function stopGalleryInterval() {
    clearInterval(galleryInterval);
  }

  function restartGalleryInterval() {
    stopGalleryInterval();

    startGalleryInterval();
  }

  /* =========================
     BOTÓN SIGUIENTE
  ========================= */

  galleryNext.addEventListener("click", function () {
    nextGalleryImage();

    restartGalleryInterval();
  });

  /* =========================
     BOTÓN ANTERIOR
  ========================= */

  galleryPrev.addEventListener("click", function () {
    prevGalleryImage();

    restartGalleryInterval();
  });

  /* =========================
     PAUSAR AL PONER EL MOUSE
  ========================= */

  gallerySlider.addEventListener("mouseenter", function () {
    stopGalleryInterval();
  });

  gallerySlider.addEventListener("mouseleave", function () {
    startGalleryInterval();
  });

  /* =========================
     PAUSAR SI CAMBIAS DE PESTAÑA
  ========================= */

  document.addEventListener("visibilitychange", function () {
    if (document.hidden) {
      stopGalleryInterval();
    } else {
      startGalleryInterval();
    }
  });

  /* =========================
     SOPORTE TÁCTIL
  ========================= */

  let touchStartX = 0;

  let touchEndX = 0;

  gallerySlider.addEventListener(
    "touchstart",
    function (event) {
      touchStartX = event.changedTouches[0].screenX;
    },
    {
      passive: true,
    },
  );

  gallerySlider.addEventListener(
    "touchend",
    function (event) {
      touchEndX = event.changedTouches[0].screenX;

      const difference = touchStartX - touchEndX;

      if (Math.abs(difference) > 50) {
        if (difference > 0) {
          nextGalleryImage();
        } else {
          prevGalleryImage();
        }

        restartGalleryInterval();
      }
    },
    {
      passive: true,
    },
  );

  /* =========================
     INICIAR
  ========================= */

  updateGallery();

  startGalleryInterval();
}
