/**Creamos la función para el recuadro de aceptar las Cookies. Este recuadro aparecerá la primera vez que carguemos la página. */

document.addEventListener("DOMContentLoaded", function () {
    //Comprobamos si se aceptaron las cookies
    if (!localStorage.getItem("cookiesAccepted")) {
        //Muestra el aviso de las cookies.
        document.getElementById("cookieConsent").style.display = "block";
    }

    //Función para aceptar las Cookies
    document.getElementById("acceptCookies").addEventListener("click", function () {
        localStorage.setItem("cookieAccepted", "true");
        document.getElementById("cookieConsent").style.display = "none";
    });

    //Función para rechazar las cookies

    document.getElementById("declineCookies").addEventListener("click", function () {
        alert("No se aceptaron las cookies. Algunas funciones pueden no estar disponibles.");
        document.getElementById("cookieConsent").style.display = "none";
    });
});

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

//Cargar el idioma guardado cuando la página se cargue
window.onload = function () {
    const savedLanguage = localStorage.getItem('language') || 'es'; //Valor por defecto: español
    changeLanguage(savedLanguage);
}


/**Vamos a crear el código para producir el efecto de hacer los textos con class introduccion y samain poco a poco visibles. */

document.addEventListener('DOMContentLoaded', () => {
    const elements = document.querySelectorAll('.reveal');

    // Configura el IntersectionObserver
    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible'); // Añade la clase "visible"
                observer.unobserve(entry.target); // Deja de observar después de activarse
            }
        });
    }, {
        threshold: 0.1 // Activa cuando el 10% del elemento es visible
    });

    // Observa cada elemento con la clase "reveal"
    elements.forEach(element => observer.observe(element));
});

//Función para reproducir el video

const video = document.getElementById('click', function(){
    if (video.paused) {
        video.play();
        playButton.style.display = "none" //Oculta el botón al reproducir
    }
});

video.addEventListener('pause', function (){
     playButton.style.display = 'block';
});

video.addEventListener('ended', function (){
    playButton.style.display = 'block';
})
   


