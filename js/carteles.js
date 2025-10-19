//Creamos una función para cambiar de idioma
function changeLanguage(language) {
    //Guardar el idioma en el LocalStorage
    localStorage.setItem('language', language);

    //Actualizar el idioma de los elementos
    const elements = document.querySelectorAll('[data-en], [data-es]');
    elements.forEach(element => {
        if (language === 'en') {
            element.textContent = element.getAttribute('data-en');
        } else if (language === 'es') {
            element.textContent = element.getAttribute('data-es');
        }
    });

    //Cambiamos el atributo lang del documento
    document.documentElement.lang = language;
}

//Creamos una función para abrir el lightbox

function openLightbox(imgElement) {
    const lightbox = document.getElementById("lightbox");
    const lightboxImage = document.getElementById("lightbox-image");

    //Llamamos a cada una del src de las diferentes imágenes.

    lightboxImage.src = imgElement.src;

    //Mostramos el contenedor lightbox

    lightbox.style.display = "flex";
}

//Función para cerrar el lightbox

function closeLightbox() {
    const lightbox = document.getElementById("lightbox");
    lightbox.style.display = "none";
}