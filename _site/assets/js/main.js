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
            // Opcional: Desactivar scroll del body cuando el menú está abierto
            document.body.style.overflow = 'hidden';
        }
    }

    // Función para cerrar el menú
    function closeMobileMenu() {
        if (hamburgerToggle && mobileNavOverlay && mobileNavMenu) {
            hamburgerToggle.classList.remove('active');
            mobileNavOverlay.classList.remove('open');
            mobileNavMenu.classList.remove('open');
            // Opcional: Reactivar scroll del body
            document.body.style.overflow = '';
        }
    }

    // Event Listener para abrir el menú al hacer clic en el botón hamburguesa
    if (hamburgerToggle) {
        hamburgerToggle.addEventListener('click', openMobileMenu);
    }

    // Event Listener para cerrar el menú al hacer clic en el botón de cerrar (X)
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
        if (window.innerWidth > 992) { // Usa el mismo breakpoint que tu CSS para desktop
            closeMobileMenu();
        }
    });
});

// Código para el efecto de máquina de escribir continuo en publicidades
document.addEventListener('DOMContentLoaded', function() {
    const typewriterTexts = document.querySelectorAll('.typewriter-text');
    const adText = "PUBLICITA AQUÍ 2996371067<br>AIRESNUEVOSNQN@HOTMAIL.COM";
    let timeouts = [];

    function typeWriterEffect(element, text, i, callback) {
        if (i < text.length) {
            // Manejo de <br> para saltos de línea
            if (text.substring(i, i + 4) === "<br>") {
                element.innerHTML += "<br>";
                i += 4; // Saltar los caracteres de <br>
            } else {
                element.innerHTML += text.charAt(i);
                i++;
            }
            timeouts.push(setTimeout(() => typeWriterEffect(element, text, i, callback), 50)); // Velocidad de tipeo
        } else {
            callback();
        }
    }

    function eraseEffect(element, callback) {
        let textContent = element.innerHTML;
        // Quitar la clase del cursor si existe antes de borrar
        const cursor = element.querySelector('.typewriter-cursor');
        if (cursor) {
            cursor.remove();
        }

        let i = textContent.length;
        function erase() {
            if (i >= 0) {
                // Asegurarse de no borrar la etiqueta <br> si está al inicio o en el medio
                if (textContent.substring(i - 4, i) === "<br>") {
                    i -= 4; // Retroceder 4 para saltar el <br>
                } else if (textContent.substring(i-1,i) === ">" && textContent.substring(i-4,i) !== "<br>") {
                    // Esta lógica es para asegurar que no se borren tags a medias, podría ser más robusta
                    // Por simplicidad, si encontramos un '>' que no es de <br>, vamos a retroceder hasta encontrar '<'
                    let temp_i = i;
                    while(temp_i > 0 && textContent.charAt(temp_i-1) !== '<') {
                        temp_i--;
                    }
                    if (temp_i > 0 && textContent.charAt(temp_i-1) === '<') {
                        i = temp_i -1; // Retroceder hasta antes del '<'
                    } else {
                        i--;
                    }
                } else {
                    i--;
                }
                element.innerHTML = textContent.substring(0, i);
                timeouts.push(setTimeout(erase, 25)); // Velocidad de borrado
            } else {
                callback();
            }
        }
        erase();
    }

    function startTypingLoop(element) {
        element.innerHTML = ''; // Limpiar contenido inicial
        typeWriterEffect(element, adText, 0, () => {
            // Añadir el cursor al final de la escritura (para que se vea como si esperara)
            element.innerHTML += '<span class="typewriter-cursor">|</span>';
            timeouts.push(setTimeout(() => { // Pequeña pausa antes de borrar
                eraseEffect(element, () => {
                    timeouts.push(setTimeout(() => startTypingLoop(element), 1000)); // Pausa antes de volver a escribir
                });
            }, 2000)); // Pausa completa antes de borrar
        });
    }

    typewriterTexts.forEach(element => {
        startTypingLoop(element);
    });

    // Limpiar timeouts al salir de la página
    window.addEventListener('beforeunload', () => {
        timeouts.forEach(timeout => clearTimeout(timeout));
    });
});