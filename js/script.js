/* =====================================================
   PREVENCIÓN DEL SUICIDIO
   SCRIPT PRINCIPAL
===================================================== */

document.addEventListener("DOMContentLoaded", function () {

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

  const navigationLinks =
    document.querySelectorAll(".nav-links a");

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

  const themeButton =
    document.getElementById("themeButton");

  const savedTheme =
    localStorage.getItem("theme");


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

      const darkMode =
        document.body.classList.contains("dark");


      if (darkMode) {

        themeButton.textContent = "☀";

        localStorage.setItem(
          "theme",
          "dark"
        );

      } else {

        themeButton.textContent = "☾";

        localStorage.setItem(
          "theme",
          "light"
        );

      }

    });

  }


  /* =====================================================
     4. BOTÓN VOLVER ARRIBA
  ===================================================== */

  const topButton =
    document.getElementById("topButton");


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
        behavior: "smooth"
      });

    });

  }


  /* =====================================================
     5. ANIMACIONES
  ===================================================== */

  const animatedElements =
    document.querySelectorAll(
      ".warning-card, .step, .protective-card, .video-card"
    );


  if ("IntersectionObserver" in window) {

    const observer =
      new IntersectionObserver(

        function (entries) {

          entries.forEach(function (entry) {

            if (entry.isIntersecting) {

              entry.target.classList.add("show");

              observer.unobserve(entry.target);

            }

          });

        },

        {
          threshold: 0.12
        }

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

  const videos =
    document.querySelectorAll("video");


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

  const internalLinks =
    document.querySelectorAll('a[href^="#"]');


  internalLinks.forEach(function (link) {

    link.addEventListener("click", function (event) {

      const targetId =
        link.getAttribute("href");


      if (!targetId || targetId === "#") {
        return;
      }


      const target =
        document.querySelector(targetId);


      if (!target) {
        return;
      }


      event.preventDefault();


      target.scrollIntoView({
        behavior: "smooth",
        block: "start"
      });

    });

  });


  /* =====================================================
     8. GALERÍA
  ===================================================== */

  const gallerySlider =
    document.getElementById("sliderGallery");

  const galleryPrev =
    document.getElementById("galleryPrev");

  const galleryNext =
    document.getElementById("galleryNext");

  const galleryDots =
    document.getElementById("galleryDots");


  /*
    IMPORTANTE:
    buscamos las imágenes ÚNICAMENTE
    dentro de sliderGallery.
  */

  if (
    gallerySlider &&
    galleryPrev &&
    galleryNext &&
    galleryDots
  ) {

    const galleryItems =
      gallerySlider.querySelectorAll(
        ".slider-item"
      );


    if (galleryItems.length === 0) {

      console.warn(
        "No se encontraron imágenes dentro de la galería."
      );

      return;

    }


    let galleryIndex = 0;

    let galleryInterval = null;


    /* =========================
       CREAR PUNTOS
    ========================= */

    galleryDots.innerHTML = "";


    galleryItems.forEach(
      function (_, index) {

        const dot =
          document.createElement("button");


        dot.className =
          "slider-dot";


        dot.type =
          "button";


        dot.setAttribute(
          "aria-label",
          `Ir a la imagen ${index + 1}`
        );


        dot.addEventListener(
          "click",
          function () {

            galleryIndex =
              index;


            updateGallery();


            restartGallery();

          }
        );


        galleryDots.appendChild(dot);

      }
    );


    const dots =
      galleryDots.querySelectorAll(
        ".slider-dot"
      );


    /* =========================
       ACTUALIZAR
    ========================= */

    function updateGallery() {

      galleryItems.forEach(
        function (item) {

          item.classList.remove(
            "active",
            "prev",
            "next"
          );

        }
      );


      dots.forEach(
        function (dot) {

          dot.classList.remove(
            "active"
          );

        }
      );


      const prevIndex =
        (
          galleryIndex -
          1 +
          galleryItems.length
        ) %
        galleryItems.length;


      const nextIndex =
        (
          galleryIndex +
          1
        ) %
        galleryItems.length;


      galleryItems[
        galleryIndex
      ].classList.add(
        "active"
      );


      galleryItems[
        prevIndex
      ].classList.add(
        "prev"
      );


      galleryItems[
        nextIndex
      ].classList.add(
        "next"
      );


      if (dots[galleryIndex]) {

        dots[
          galleryIndex
        ].classList.add(
          "active"
        );

      }

    }


    /* =========================
       SIGUIENTE
    ========================= */

    function nextGallery() {

      galleryIndex =
        (
          galleryIndex +
          1
        ) %
        galleryItems.length;


      updateGallery();

    }


    /* =========================
       ANTERIOR
    ========================= */

    function prevGallery() {

      galleryIndex =
        (
          galleryIndex -
          1 +
          galleryItems.length
        ) %
        galleryItems.length;


      updateGallery();

    }


    /* =========================
       AUTOMÁTICO
    ========================= */

    function startGallery() {

      stopGallery();


      galleryInterval =
        window.setInterval(
          nextGallery,
          5000
        );

    }


    function stopGallery() {

      if (galleryInterval !== null) {

        clearInterval(
          galleryInterval
        );

        galleryInterval = null;

      }

    }


    function restartGallery() {

      stopGallery();

      startGallery();

    }


    /* =========================
       BOTONES
    ========================= */

    galleryNext.addEventListener(
      "click",
      function () {

        nextGallery();

        restartGallery();

      }
    );


    galleryPrev.addEventListener(
      "click",
      function () {

        prevGallery();

        restartGallery();

      }
    );


    /* =========================
       PAUSAR CON MOUSE
    ========================= */

    gallerySlider.addEventListener(
      "mouseenter",
      stopGallery
    );


    gallerySlider.addEventListener(
      "mouseleave",
      startGallery
    );


    /* =========================
       CAMBIO DE PESTAÑA
    ========================= */

    document.addEventListener(
      "visibilitychange",
      function () {

        if (document.hidden) {

          stopGallery();

        } else {

          startGallery();

        }

      }
    );


    /* =========================
       SWIPE CELULAR
    ========================= */

    let touchStartX = 0;


    gallerySlider.addEventListener(
      "touchstart",
      function (event) {

        touchStartX =
          event.changedTouches[0]
            .clientX;

      },
      {
        passive: true
      }
    );


    gallerySlider.addEventListener(
      "touchend",
      function (event) {

        const touchEndX =
          event.changedTouches[0]
            .clientX;


        const difference =
          touchStartX -
          touchEndX;


        if (
          Math.abs(difference) <
          50
        ) {

          return;

        }


        if (difference > 0) {

          nextGallery();

        } else {

          prevGallery();

        }


        restartGallery();

      },
      {
        passive: true
      }
    );


    /* =========================
       INICIAR
    ========================= */

    updateGallery();

    startGallery();

  }


  /* =====================================================
     9. PÁGINA CARGADA
  ===================================================== */

  document.body.classList.add(
    "page-loaded"
  );

});
