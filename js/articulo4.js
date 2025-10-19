// Función para cambiar el idioma
function changeLanguage(lang) {
    const elements = document.querySelectorAll('.traducible');
    const languageSelector = document.getElementById('languageSelector');
    
    elements.forEach(element => {
        const translation = element.getAttribute(`data-${lang}`);
        
        if (translation) {
            if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
                element.placeholder = translation;
            } else {
                element.textContent = translation;
            }
        }
    });

    // Guardar el idioma seleccionado en sessionStorage
    sessionStorage.setItem('idioma', lang);

    // Actualizar botones activos
    document.querySelectorAll('.language-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    
    document.querySelector(`[data-lang="${lang}"]`).classList.add('active');
    
    // Mover el indicador blanco según el idioma
    if (lang === 'en') {
        languageSelector.classList.add('english');
    } else {
        languageSelector.classList.remove('english');
    }
}

// Event listeners para los botones de idioma
document.addEventListener('DOMContentLoaded', function() {
    // Cargar el idioma guardado o usar español por defecto
    const savedLanguage = sessionStorage.getItem('idioma') || 'es';
    changeLanguage(savedLanguage);

    // Añadir event listeners a los botones
    document.getElementById('btnEs').addEventListener('click', () => changeLanguage('es'));
    document.getElementById('btnEn').addEventListener('click', () => changeLanguage('en'));
});

// Animación suave al hacer scroll
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('.biografia, .momento-especial, .repertorio, .curiosidad, .informacion-evento, .llamada-accion, .quote-section');
    
    sections.forEach(section => {
        const sectionTop = section.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;
        
        if (sectionTop < windowHeight * 0.85) {
            section.style.opacity = '1';
            section.style.transform = 'translateY(0)';
        }
    });
});

// Inicializar estilos de animación
document.addEventListener('DOMContentLoaded', function() {
    const sections = document.querySelectorAll('.biografia, .momento-especial, .repertorio, .curiosidad, .informacion-evento, .llamada-accion, .quote-section');
    
    sections.forEach(section => {
        section.style.opacity = '0';
        section.style.transform = 'translateY(20px)';
        section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    });
    
    // Trigger inicial
    window.dispatchEvent(new Event('scroll'));
});