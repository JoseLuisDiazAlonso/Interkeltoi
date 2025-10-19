

class LanguageManager {
    constructor() {
        this.currentLang = this.getSavedLanguage() || this.detectBrowserLanguage();
        this.languageButtons = document.querySelectorAll('.language-btn');
        this.languageSelector = document.getElementById('languageSelector');
        this.elementsToTranslate = document.querySelectorAll('.traducible');
        
        this.init();
    }

    // Inicializar el sistema de idiomas
    init() {
        // Aplicar idioma inicial
        this.changeLanguage(this.currentLang, false);
        
        // Agregar event listeners a los botones
        this.languageButtons.forEach(button => {
            button.addEventListener('click', (e) => {
                e.preventDefault();
                const lang = button.getAttribute('data-lang');
                this.changeLanguage(lang, true);
            });
        });

        // Log para debugging
        console.log(`🌐 Language Manager initialized. Current language: ${this.currentLang}`);
    }

    // Detectar idioma del navegador
    detectBrowserLanguage() {
        const browserLang = navigator.language || navigator.userLanguage;
        
        // Si el idioma del navegador es español (es, es-ES, es-MX, etc.)
        if (browserLang.startsWith('es')) {
            return 'es';
        }
        
        // Por defecto, español
        return 'es';
    }

    // Obtener idioma guardado en localStorage
    getSavedLanguage() {
        return localStorage.getItem('interkeltoi_language');
    }

    // Guardar idioma en localStorage
    saveLanguage(lang) {
        localStorage.setItem('interkeltoi_language', lang);
        console.log(`💾 Language saved: ${lang}`);
    }

    // Cambiar el idioma de toda la página
    changeLanguage(lang, animate = true) {
        this.currentLang = lang;
        
        // Actualizar el atributo lang del documento
        document.documentElement.lang = lang;
        
        // Actualizar todos los elementos traducibles
        this.updateAllElements(lang, animate);
        
        // Actualizar los botones de idioma y el selector
        this.updateLanguageButtons(lang);
        
        // Guardar preferencia
        this.saveLanguage(lang);
        
        // Disparar evento personalizado para otros scripts
        this.dispatchLanguageChangeEvent(lang);
    }

    // Actualizar todos los elementos con traducciones
    updateAllElements(lang, animate) {
        this.elementsToTranslate.forEach(element => {
            const translation = element.getAttribute(`data-${lang}`);
            
            if (translation) {
                if (animate) {
                    // Fade out, cambiar texto, fade in
                    element.style.transition = 'opacity 0.2s ease';
                    element.style.opacity = '0.5';
                    
                    setTimeout(() => {
                        element.textContent = translation;
                        element.style.opacity = '1';
                    }, 200);
                } else {
                    // Sin animación
                    element.textContent = translation;
                }
            }
        });

        console.log(`✅ Updated ${this.elementsToTranslate.length} elements to ${lang}`);
    }

    // Actualizar estado visual de los botones y el selector
    updateLanguageButtons(lang) {
        // Actualizar clase del selector para mover el indicador deslizante
        if (this.languageSelector) {
            if (lang === 'en') {
                this.languageSelector.classList.add('english');
            } else {
                this.languageSelector.classList.remove('english');
            }
        }

        // Actualizar botones activos
        this.languageButtons.forEach(btn => {
            const btnLang = btn.getAttribute('data-lang');
            
            if (btnLang === lang) {
                btn.classList.add('active');
                btn.setAttribute('aria-pressed', 'true');
            } else {
                btn.classList.remove('active');
                btn.setAttribute('aria-pressed', 'false');
            }
        });
    }

    // Disparar evento personalizado
    dispatchLanguageChangeEvent(lang) {
        const event = new CustomEvent('languageChanged', {
            detail: { 
                language: lang,
                timestamp: new Date().toISOString(),
                page: this.getPageName()
            }
        });
        
        document.dispatchEvent(event);
    }

    // Obtener nombre de la página actual
    getPageName() {
        const path = window.location.pathname;
        const page = path.split('/').pop();
        return page || 'index';
    }

    // Método público para obtener el idioma actual
    getCurrentLanguage() {
        return this.currentLang;
    }

    // Método público para cambiar idioma programáticamente
    setLanguage(lang) {
        if (lang === 'es' || lang === 'en') {
            this.changeLanguage(lang, true);
        } else {
            console.warn(`⚠️ Invalid language: ${lang}. Use 'es' or 'en'.`);
        }
    }
}



// Navegación con teclado para el selector de idioma
function setupKeyboardNavigation() {
    const languageButtons = document.querySelectorAll('.language-btn');
    
    languageButtons.forEach((button, index) => {
        button.addEventListener('keydown', (e) => {
            // Flecha derecha: siguiente botón
            if (e.key === 'ArrowRight') {
                e.preventDefault();
                const nextIndex = (index + 1) % languageButtons.length;
                languageButtons[nextIndex].focus();
            }
            
            // Flecha izquierda: botón anterior
            if (e.key === 'ArrowLeft') {
                e.preventDefault();
                const prevIndex = (index - 1 + languageButtons.length) % languageButtons.length;
                languageButtons[prevIndex].focus();
            }
            
            // Enter o Espacio: activar botón
            if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault();
                button.click();
            }
        });
    });
}



// Pausar/reproducir video al hacer clic
function setupVideoControls() {
    const video = document.querySelector('.imagen-articulo4');
    
    if (video && video.tagName === 'VIDEO') {
        // Click para pausar/reproducir
        video.addEventListener('click', () => {
            if (video.paused) {
                video.play();
            } else {
                video.pause();
            }
        });

        // Pausar cuando no está visible (optimización)
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (!entry.isIntersecting && !video.paused) {
                    video.pause();
                }
            });
        }, { threshold: 0.5 });

        observer.observe(video);

        console.log('🎬 Video controls initialized');
    }
}



// Verificar si el usuario prefiere un idioma específico basado en URL
function checkURLLanguageParam() {
    const urlParams = new URLSearchParams(window.location.search);
    const langParam = urlParams.get('lang');
    
    if (langParam && (langParam === 'es' || langParam === 'en')) {
        return langParam;
    }
    
    return null;
}



// Observer para animar elementos cuando entran en viewport
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
};

const animateOnScroll = () => {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar secciones para animarlas al entrar
    const sections = document.querySelectorAll('.biografia, .momento-especial, .repertorio, .curiosidad, .informacion-evento, .llamada-accion, .quote-section, .anuncio-principal, .informacion-dias, .destacados-programa, .informacion-practica');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(section);
    });

    console.log(`🎨 Scroll animations initialized for ${sections.length} sections`);
};



function setupSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            const target = document.querySelector(this.getAttribute('href'));
            
            if (target) {
                e.preventDefault();
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}



// Efecto parallax sutil en el header
function setupParallaxEffect() {
    const header = document.querySelector('.header-articulo');
    
    if (header) {
        let ticking = false;
        
        window.addEventListener('scroll', () => {
            if (!ticking) {
                window.requestAnimationFrame(() => {
                    const scrolled = window.pageYOffset;
                    const rate = scrolled * 0.3;
                    
                    if (scrolled < 500) {
                        header.style.transform = `translateY(${rate}px)`;
                    }
                    
                    ticking = false;
                });
                
                ticking = true;
            }
        });
    }
}

// Animación de entrada para el selector de idioma
function animateLanguageSelector() {
    const selector = document.getElementById('languageSelector');
    
    if (selector) {
        setTimeout(() => {
            selector.style.opacity = '0';
            selector.style.transform = 'translateX(20px)';
            selector.style.transition = 'all 0.5s ease';
            
            setTimeout(() => {
                selector.style.opacity = '1';
                selector.style.transform = 'translateX(0)';
            }, 100);
        }, 500);
    }
}

// Efecto hover mejorado en imágenes
function setupImageEffects() {
    const image = document.querySelector('.imagen-articulo4');
    
    if (image) {
        image.addEventListener('mouseenter', () => {
            image.style.transform = 'scale(1.03)';
        });
        
        image.addEventListener('mouseleave', () => {
            image.style.transform = 'scale(1)';
        });
    }
}


function setupEventCountdown() {
    // Fecha del evento: 31 de Octubre de 2025
    const eventDate = new Date('2025-10-31T19:30:00');
    
    // Buscar si hay un elemento para mostrar el countdown
    const countdownElement = document.getElementById('countdown');
    
    if (countdownElement) {
        function updateCountdown() {
            const now = new Date();
            const difference = eventDate - now;
            
            if (difference > 0) {
                const days = Math.floor(difference / (1000 * 60 * 60 * 24));
                const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((difference % (1000 * 60)) / 1000);
                
                countdownElement.innerHTML = `
                    <div class="countdown-display">
                        <span class="countdown-number">${days}</span> días
                        <span class="countdown-number">${hours}</span> horas
                        <span class="countdown-number">${minutes}</span> minutos
                        <span class="countdown-number">${seconds}</span> segundos
                    </div>
                `;
            } else {
                countdownElement.innerHTML = '<p class="countdown-message">¡El evento está en marcha!</p>';
            }
        }
        
        updateCountdown();
        setInterval(updateCountdown, 1000);
        
        console.log('⏰ Event countdown initialized');
    }
}


function setupDarkModeDetection() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');
    
    function handleDarkModeChange(e) {
        if (e.matches) {
            console.log('🌙 Dark mode detected');
            document.body.classList.add('dark-mode');
        } else {
            console.log('☀️ Light mode detected');
            document.body.classList.remove('dark-mode');
        }
    }
    
    // Aplicar al cargar
    handleDarkModeChange(darkModeQuery);
    
    // Escuchar cambios
    darkModeQuery.addEventListener('change', handleDarkModeChange);
}



function trackPageView() {
    // Aquí puedes integrar Google Analytics, Matomo, etc.
    console.log('📊 Page view tracked');
    
    // Ejemplo con Google Analytics (si está instalado)
    if (typeof gtag !== 'undefined') {
        gtag('config', 'GA_MEASUREMENT_ID', {
            page_path: window.location.pathname
        });
    }
}

function trackLanguageChange(language) {
    // Track cambios de idioma
    console.log(`📊 Language change tracked: ${language}`);
    
    // Ejemplo con Google Analytics
    if (typeof gtag !== 'undefined') {
        gtag('event', 'language_change', {
            event_category: 'engagement',
            event_label: language,
            page: window.location.pathname
        });
    }
}


function optimizePageLoad() {
    // Lazy loading para imágenes
    const images = document.querySelectorAll('img[data-src]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
}



document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing Interkeltoi Article System...');
    console.log(`📄 Page: ${window.location.pathname}`);
    console.log(`⏰ Time: ${new Date().toLocaleString('es-ES')}`);
    
    // Verificar parámetro de URL primero
    const urlLang = checkURLLanguageParam();
    
    // Crear instancia del gestor de idiomas
    const languageManager = new LanguageManager();
    
    // Si hay un idioma en la URL, usarlo
    if (urlLang) {
        languageManager.setLanguage(urlLang);
    }
    
    // Configurar todas las funcionalidades
    setupKeyboardNavigation();
    setupVideoControls();
    setupSmoothScroll();
    animateOnScroll();
    setupParallaxEffect();
    animateLanguageSelector();
    setupImageEffects();
    setupEventCountdown();
    setupDarkModeDetection();
    optimizePageLoad();
    trackPageView();
    
    // Hacer el languageManager accesible globalmente
    window.languageManager = languageManager;
    
    // Escuchar cambios de idioma para logging y analytics
    document.addEventListener('languageChanged', (e) => {
        console.log(`🌍 Language changed to: ${e.detail.language}`);
        console.log(`⏰ Timestamp: ${e.detail.timestamp}`);
        console.log(`📄 Page: ${e.detail.page}`);
        
        // Track en analytics
        trackLanguageChange(e.detail.language);
    });
    
    console.log('✅ All systems ready!');
});


window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Page fully loaded and rendered');
    console.log(`⚡ Load time: ${performance.now().toFixed(2)}ms`);
});


window.addEventListener('error', (e) => {
    console.error('❌ Error detected:', e.message);
    console.error('📍 Location:', e.filename, 'Line:', e.lineno);
});



// Prevenir zoom en iOS en inputs
document.addEventListener('touchstart', (e) => {
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        e.target.style.fontSize = '16px';
    }
}, { passive: true });



console.log('%c🎭 INTERKELTOI 2025 🎭', 'font-size: 20px; font-weight: bold; color: #048e7a;');
console.log('%c✨ Sistema de artículos bilingües cargado correctamente', 'color: #05dbc5;');
console.log('%c📄 JavaScript version: 2.0.0', 'color: #666;');
console.log('%c🌐 Multi-language system active', 'color: #666;');

