

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del selector de idioma
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');
    const languageSelector = document.getElementById('languageSelector'); // AÑADIDO
    const elementosTraducibles = document.querySelectorAll('.traducible');

    // Obtener idioma guardado o usar español por defecto
    let idiomaActual = localStorage.getItem('idioma') || 'es';

    // Aplicar idioma inicial
    aplicarIdioma(idiomaActual);

    // Event listeners para los botones
    btnEs.addEventListener('click', function() {
        cambiarIdioma('es');
    });

    btnEn.addEventListener('click', function() {
        cambiarIdioma('en');
    });

    // Función para cambiar el idioma
    function cambiarIdioma(idioma) {
        idiomaActual = idioma;
        localStorage.setItem('idioma', idioma);
        aplicarIdioma(idioma);
    }

    // Función para aplicar el idioma seleccionado
    function aplicarIdioma(idioma) {
        // Actualizar botones activos
        if (idioma === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
            languageSelector.classList.remove('english'); // AÑADIDO - Quitar clase english
        } else {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
            languageSelector.classList.add('english'); // AÑADIDO - Agregar clase english
        }

        // Traducir todos los elementos
        elementosTraducibles.forEach(elemento => {
            const textoTraducido = elemento.getAttribute(`data-${idioma}`);
            if (textoTraducido) {
                elemento.textContent = textoTraducido;
            }
        });

        // Actualizar el atributo lang del documento
        document.documentElement.lang = idioma;
    }

    // Animación suave al hacer scroll
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, {
        threshold: 0.1
    });

    // Observar secciones para animación
    const secciones = document.querySelectorAll('.biografia, .momento-especial, .repertorio, .curiosidad, .informacion-evento, .llamada-accion, .quote-section');
    secciones.forEach(seccion => {
        seccion.style.opacity = '0';
        seccion.style.transform = 'translateY(20px)';
        seccion.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(seccion);
    });
});



const video = document.querySelector('.imagen-articulo4');

if (video) {
    // Pausar video cuando no está visible
    const videoObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (!entry.isIntersecting) {
                video.pause();
            }
        });
    }, {
        threshold: 0.5
    });

    videoObserver.observe(video);

    // Control de reproducción al hacer clic
    video.addEventListener('click', function() {
        if (video.paused) {
            video.play();
        } else {
            video.pause();
        }
    });
}



document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});


window.addEventListener('scroll', function() {
    const header = document.querySelector('.header-articulo');
    if (header) {
        const scrolled = window.pageYOffset;
        header.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});