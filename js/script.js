/* =====================================================
PREVENCIÓN DEL SUICIDIO - SCRIPT PRINCIPAL
===================================================== */

/* =====================================================

1. MENÚ PARA CELULAR
   ===================================================== */

const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

if (menuToggle && navLinks) {

```
menuToggle.addEventListener("click", function () {

    navLinks.classList.toggle("active");

});
```

}

/* =====================================================
2. CERRAR EL MENÚ AL HACER CLICK EN UN ENLACE
===================================================== */

const navigationLinks = document.querySelectorAll(".nav-links a");

navigationLinks.forEach(function (link) {

```
link.addEventListener("click", function () {

    if (navLinks) {

        navLinks.classList.remove("active");

    }

});
```

});

/* =====================================================
3. MODO OSCURO / MODO CLARO
===================================================== */

const themeButton = document.getElementById("themeButton");

// Revisar si el usuario ya tenía un tema guardado

const savedTheme = localStorage.getItem("theme");

if (savedTheme === "dark") {

```
document.body.classList.add("dark");

if (themeButton) {

    themeButton.textContent = "☀";

}
```

} else {

```
if (themeButton) {

    themeButton.textContent = "☾";

}
```

}

// Cambiar tema

if (themeButton) {

```
themeButton.addEventListener("click", function () {

    document.body.classList.toggle("dark");

    const darkMode =
        document.body.classList.contains("dark");


    if (darkMode) {

        themeButton.textContent = "☀";

        localStorage.setItem("theme", "dark");

    } else {

        themeButton.textContent = "☾";

        localStorage.setItem("theme", "light");

    }

});
```

}

/* =====================================================
4. BOTÓN "VOLVER ARRIBA"
===================================================== */

const topButton = document.getElementById("topButton");

if (topButton) {

```
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
```

}

/* =====================================================
5. ANIMACIONES AL HACER SCROLL
===================================================== */

const animatedElements = document.querySelectorAll(
".warning-card, .step, .protective-card, .video-card, .gallery-item"
);

if ("IntersectionObserver" in window) {

```
const observerOptions = {

    threshold: 0.12

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
    observerOptions
);


animatedElements.forEach(function (element) {

    element.classList.add("animate");

    observer.observe(element);

});
```

} else {

```
// Si el navegador no soporta IntersectionObserver

animatedElements.forEach(function (element) {

    element.classList.add("show");

});
```

}

/* =====================================================
6. DETECTAR VIDEOS
===================================================== */

const videos = document.querySelectorAll("video");

videos.forEach(function (video) {

```
video.addEventListener("play", function () {

    // Pausar los demás videos cuando comienza uno

    videos.forEach(function (otherVideo) {

        if (otherVideo !== video) {

            otherVideo.pause();

        }

    });

});
```

});

/* =====================================================
7. EFECTO SUAVE PARA LOS ENLACES INTERNOS
===================================================== */

const internalLinks =
document.querySelectorAll('a[href^="#"]');

internalLinks.forEach(function (link) {

```
link.addEventListener("click", function (event) {

    const targetId =
        link.getAttribute("href");


    if (
        targetId &&
        targetId !== "#" &&
        document.querySelector(targetId)
    ) {

        event.preventDefault();


        const target =
            document.querySelector(targetId);


        target.scrollIntoView({

            behavior: "smooth",

            block: "start"

        });

    }

});
```

});

/* =====================================================
8. MENSAJE DE CARGA
===================================================== */

window.addEventListener("load", function () {

```
document.body.classList.add("page-loaded");
```

});

/* =====================================================
FIN DEL SCRIPT
===================================================== */
