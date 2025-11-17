// Función para abrir el lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImage = document.getElementById('lightbox-image');
    
    lightboxImage.src = img.src;
    lightbox.classList.add('active');
}

// Función para cerrar el lightbox
function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
}

// Función para cambiar el idioma
function changeLanguage(lang) {
    // Obtener todos los elementos con atributos data-en y data-es
    const elements = document.querySelectorAll('[data-en], [data-es]');
    
    elements.forEach(element => {
        if (lang === 'en' && element.hasAttribute('data-en')) {
            element.textContent = element.getAttribute('data-en');
        } else if (lang === 'es' && element.hasAttribute('data-es')) {
            element.textContent = element.getAttribute('data-es');
        }
    });
    
    // Actualizar estilos de los botones de idioma
    const enIcon = document.getElementById('en-icon');
    const esIcon = document.getElementById('es-icon');
    
    if (lang === 'en') {
        enIcon.style.fontWeight = 'bold';
        enIcon.style.color = 'rgb(4, 142, 126)';
        esIcon.style.fontWeight = 'normal';
        esIcon.style.color = '#666';
    } else {
        esIcon.style.fontWeight = 'bold';
        esIcon.style.color = 'rgb(4, 142, 126)';
        enIcon.style.fontWeight = 'normal';
        enIcon.style.color = '#666';
    }
    
    // Guardar preferencia de idioma en localStorage
    localStorage.setItem('preferredLanguage', lang);
}

// Cargar idioma preferido al cargar la página
document.addEventListener('DOMContentLoaded', function() {
    const preferredLanguage = localStorage.getItem('preferredLanguage') || 'es';
    changeLanguage(preferredLanguage);
    
    // Cerrar lightbox con tecla ESC
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
    });
});