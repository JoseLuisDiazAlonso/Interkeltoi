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

//Función para reproducir el video

const video = document.getElementById('click', function () {
    if (video.paused) {
        video.play();
        playButton.style.display = "none" //Oculta el botón al reproducir
    }
});

video.addEventListener('pause', function () {
    playButton.style.display = 'block';
});

video.addEventListener('ended', function () {
    playButton.style.display = 'block';
})
