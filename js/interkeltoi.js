// Función para cambiar el idioma
function changeLanguage(lang) {
    const elements = document.querySelectorAll('[data-en], [data-es]');
    elements.forEach(element => {
        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = element.getAttribute(`data-${lang}`);
        } else {
            element.textContent = element.getAttribute(`data-${lang}`);
        }
    });

    // Guardar el idioma seleccionado
    sessionStorage.setItem('idioma', lang);

    // Actualizar iconos activos
    document.getElementById('en-icon').classList.toggle('active', lang === 'en');
    document.getElementById('es-icon').classList.toggle('active', lang === 'es');
}

// Cargar el idioma guardado al iniciar la página
window.onload = function () {
    const savedLanguage = sessionStorage.getItem('idioma') || 'es';
    changeLanguage(savedLanguage);
};

// Funciones para el Lightbox
function openLightbox(img) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-image');
    
    lightboxImg.src = img.src;
    lightbox.classList.add('active');
    
    // Prevenir scroll del body cuando el lightbox está abierto
    document.body.style.overflow = 'hidden';
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    lightbox.classList.remove('active');
    
    // Restaurar scroll del body
    document.body.style.overflow = 'auto';
}

// Cerrar lightbox con tecla ESC
document.addEventListener('keydown', function(event) {
    if (event.key === 'Escape') {
        closeLightbox();
    }
});

// Prevenir que el click en la imagen cierre el lightbox
document.getElementById('lightbox-image')?.addEventListener('click', function(event) {
    event.stopPropagation();
});