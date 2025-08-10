// Código para el botón hamburguesa y navegación móvil
document.addEventListener('DOMContentLoaded', function() {
    const hamburgerToggle = document.querySelector('.hamburger-menu-toggle');
    const mobileNavOverlay = document.querySelector('.mobile-nav-overlay');
    const mobileNavMenu = document.querySelector('.mobile-nav-menu');
    const closeMenuBtn = document.querySelector('.close-menu-btn');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

    // Función para abrir el menú
    function openMobileMenu() {
        if (hamburgerToggle && mobileNavOverlay && mobileNavMenu) {
            hamburgerToggle.classList.add('active');
            mobileNavOverlay.classList.add('open');
            mobileNavMenu.classList.add('open');
            document.body.style.overflow = 'hidden';
        }
    }

    // Función para cerrar el menú
    function closeMobileMenu() {
        if (hamburgerToggle && mobileNavOverlay && mobileNavMenu) {
            hamburgerToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('open');
            mobileNavMenu.classList.remove('open');
            document.body.style.overflow = '';
        }
    }

    // Event Listener para abrir el menú
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', openMobileMenu);
    }

    // Event Listener para cerrar el menú
    if (closeMenuBtn) {
        closeMenuBtn.addEventListener('click', closeMobileMenu);
    }

    // Event Listener para cerrar el menú al hacer clic en el overlay
    if (mobileNavOverlay) {
        mobileNavOverlay.addEventListener('click', closeMobileMenu);
    }

    // Event Listeners para cerrar el menú al hacer clic en un enlace de navegación
    if (mobileNavLinks.length > 0) {
        mobileNavLinks.forEach(link => {
            link.addEventListener('click', closeMobileMenu);
        });
    }

    // Cerrar el menú si se redimensiona a desktop
    window.addEventListener('resize', function() {
        if (window.innerWidth > 992) {
            closeMobileMenu();
        }
    });

    // Código para la funcionalidad del buscador en el menú móvil
    const mobileSearchForm = document.getElementById('mobile-search-form');

    if (mobileSearchForm) {
        mobileSearchForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evita el envío tradicional del formulario
            const searchInput = document.getElementById('search-input-mobile');
            const searchQuery = searchInput.value;

            if (searchQuery.trim() !== '') {
                window.location.href = `/search/?q=${encodeURIComponent(searchQuery)}`;
            }
        });
    }
});

// Código para el efecto de máquina de escribir
document.addEventListener('DOMContentLoaded', function() {
    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    const adText = "PUBLICITA AQUÍ 2996371067<br>AIRESNUEVOSNQN@HOTMAIL.COM";
    let timeouts = [];

    function typeWriterEffect(element, text, i, callback) {
        if (i < text.length) {
            if (text.substring(i, i + 4) === "<br>") {
                element.innerHTML += "<br>";
                i += 4;
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            timeouts.push(setTimeout(() => typeWriterEffect(element, text, i, callback), 50));
        } else {
            callback();
        }
    }

    function eraseEffect(element, callback) {
        let textContent = element.innerHTML;
        const cursor = element.querySelector('.typewriter-cursor');
        if (cursor) {
            cursor.remove();
        }

        let i = textContent.length;
        function erase() {
            if (i >= 0) {
                if (textContent.substring(i - 4, i) === "<br>") {
                    i -= 4;
                } else if (textContent.substring(i - 1, i) === ">" && textContent.substring(i - 4, i) !== "<br>") {
                    let temp_i = i;
                    while (temp_i > 0 && textContent.charAt(temp_i - 1) !== '<') {
                        temp_i--;
                    }
                    if (temp_i > 0 && textContent.charAt(temp_i - 1) === '<') {
                        i = temp_i - 1;
                    } else {
                        i--;
                    }
                } else {
                    i--;
                }
                element.innerHTML = textContent.substring(0, i);
                timeouts.push(setTimeout(erase, 25));
            } else {
                callback();
            }
        }
        erase();
    }

    function startTypingLoop(element) {
        element.innerHTML = '';
        typeWriterEffect(element, adText, 0, () => {
            element.innerHTML += '<span class="typewriter-cursor">|</span>';
            timeouts.push(setTimeout(() => {
                eraseEffect(element, () => {
                    timeouts.push(setTimeout(() => startTypingLoop(element), 1000));
                });
            }, 2000));
        });
    }

    typewriterTexts.forEach(element => {
        if (element.closest('.advertising-block-small')) {
            element.innerHTML = adText;
        } else {
            startTypingLoop(element);
        }
    });

    window.addEventListener('beforeunload', () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
    });
});

// Código para actualizar la fecha y hora en tiempo real
document.addEventListener('DOMContentLoaded', function() {
    const datetimeSpan = document.getElementById('current-datetime');

    function updateDateTime() {
        const now = new Date();
        const optionsDate = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
        const optionsTime = { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: false };
        const dateString = now.toLocaleDateString('es-ES', optionsDate);
        const timeString = now.toLocaleTimeString('es-ES', optionsTime);
        datetimeSpan.textContent = `Edición: ${dateString.charAt(0).toUpperCase() + dateString.slice(1)} Hora ${timeString}`;
    }

    if (datetimeSpan) {
        updateDateTime();
        setInterval(updateDateTime, 1000);
    }
});

// Código para el encabezado que se achica al hacer scroll
document.addEventListener("DOMContentLoaded", function() {
    const header = document.querySelector('.site-header');
    const scrollThreshold = 100;
    const desktopBreakpoint = 992;

    if (header) {
        window.addEventListener('scroll', () => {
            if (window.innerWidth >= desktopBreakpoint) {
                if (window.scrollY > scrollThreshold) {
                    header.classList.add('scrolled');
                } else {
                    header.classList.remove('scrolled');
                }
            } else {
                header.classList.remove('scrolled');
            }
        });

        window.addEventListener('resize', () => {
            if (window.innerWidth < desktopBreakpoint) {
                header.classList.remove('scrolled');
            }
        });
    }
});

// Código para el pop-up de publicidad en noticias individuales
document.addEventListener('DOMContentLoaded', function() {
    const popupContainer = document.getElementById('popup-ad-container');
    const closeButton = document.getElementById('popup-ad-close-button');
    const lastShownKey = 'lastPopupAdShown';
    const displayInterval = 24 * 60 * 60 * 1000;

    function showPopup() {
        if (popupContainer) {
            popupContainer.style.display = 'flex';
            setTimeout(() => {
                popupContainer.classList.add('is-visible');
            }, 10);
            localStorage.setItem(lastShownKey, Date.now());
        }
    }

    function hidePopup() {
        if (popupContainer) {
            popupContainer.classList.remove('is-visible');
            popupContainer.addEventListener('transitionend', function handler() {
                popupContainer.style.display = 'none';
                popupContainer.removeEventListener('transitionend', handler);
            });
        }
    }

    if (popupContainer && closeButton) {
        closeButton.addEventListener('click', hidePopup);

        const lastShownTime = localStorage.getItem(lastShownKey);
        const currentTime = Date.now();

        if (!lastShownTime || (currentTime - lastShownTime > displayInterval)) {
            setTimeout(showPopup, 2000);
        }
    }
});