// Función para cambiar el idioma
function changeLanguage(language) {
    // Guardar el idioma en el LocalStorage
    localStorage.setItem('language', language);

    // Actualizar el idioma de los elementos
    const elements = document.querySelectorAll('[data-en], [data-es]');
    elements.forEach(element => {
        if (language === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (language === 'es') {
            element.textContent = element.getAttribute('data-es');
        }
    });

    // Cambiar el atributo lang del documento
    document.documentElement.lang = language;

    // Cambiar el texto del botón
    document.getElementById("change-lang").textContent = language === 'en' ? 'ES' : 'ENG';
}

// Cargar el idioma desde el LocalStorage y actualizar la página al cargar
window.addEventListener('load', () => {
    const savedLanguage = localStorage.getItem('language') || 'es'; // Si no hay idioma guardado, usamos 'es' como predeterminado
    changeLanguage(savedLanguage);
});

// Cambiar el idioma al hacer clic en el botón
document.getElementById("change-lang").addEventListener('click', () => {
    const currentLanguage = document.documentElement.lang;
    const newLanguage = currentLanguage === 'en' ? 'es' : 'en';
    changeLanguage(newLanguage);
});