

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
        return localStorage.getItem('selectedLanguage');
    }

    // Guardar idioma en localStorage
    saveLanguage(lang) {
        localStorage.setItem('selectedLanguage', lang);
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
            detail: { language: lang }
        });
        
        document.dispatchEvent(event);
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
    const sections = document.querySelectorAll('.biografia, .momento-especial, .repertorio, .curiosidad, .informacion-evento, .llamada-accion, .quote-section');
    
    sections.forEach((section, index) => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = `all 0.6s ease-out ${index * 0.1}s`;
        observer.observe(section);
    });
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



// Esperar a que el DOM esté listo
document.addEventListener('DOMContentLoaded', () => {
    console.log('🚀 Initializing language system...');
    
    // Verificar parámetro de URL primero
    const urlLang = checkURLLanguageParam();
    
    // Crear instancia del gestor de idiomas
    const languageManager = new LanguageManager();
    
    // Si hay un idioma en la URL, usarlo
    if (urlLang) {
        languageManager.setLanguage(urlLang);
    }
    
    // Configurar navegación con teclado
    setupKeyboardNavigation();
    
    // Configurar smooth scroll
    setupSmoothScroll();
    
    // Configurar animaciones al scroll
    animateOnScroll();
    
    // Hacer el languageManager accesible globalmente (opcional)
    window.languageManager = languageManager;
    
    // Escuchar cambios de idioma para logging o analytics
    document.addEventListener('languageChanged', (e) => {
        console.log(`🌍 Language changed to: ${e.detail.language}`);
        
        // Aquí podrías enviar analytics, por ejemplo:
        // gtag('event', 'language_change', { language: e.detail.language });
    });
    
    console.log('✅ Language system ready!');
});


// Agregar clase cuando todo está listo
window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    console.log('✅ Page fully loaded');
});

console.log('📄 Language script loaded successfully!');