// Gestión de Cookies
document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');

    // Verificar si el usuario ya aceptó las cookies
    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    // Aceptar cookies
    acceptCookies.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    // Rechazar cookies
    declineCookies.addEventListener('click', function () {
        cookieConsent.style.display = 'none';
    });
});

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
    localStorage.setItem('idioma', lang);

    // Actualizar iconos
    document.getElementById('en-icon').classList.toggle('active', lang === 'en');
    document.getElementById('es-icon').classList.toggle('active', lang === 'es');

    // Regenerar las cards con el nuevo idioma
    generarCards();
}

// Cargar el idioma guardado al iniciar la página
window.onload = function () {
    const savedLanguage = localStorage.getItem('idioma') || 'es';
    changeLanguage(savedLanguage);
};

// Animación de elementos al hacer scroll (RESTAURADA)
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, {
    threshold: 0.1
});

// Observar todos los elementos con clase 'reveal'
document.querySelectorAll('.reveal').forEach(element => {
    observer.observe(element);
});

// Carrusel de Videos
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');

let currentIndex = 0;
const videoItems = document.querySelectorAll('.video-item');
const totalVideos = videoItems.length;

function updateCarousel() {
    const offset = -currentIndex * 100;
    carouselTrack.style.transform = `translateX(${offset}%)`;
}

prevBtn.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + totalVideos) % totalVideos;
    updateCarousel();
});

nextBtn.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % totalVideos;
    updateCarousel();
});

// Modal de video
videoItems.forEach((item, index) => {
    item.addEventListener('click', () => {
        const videoSrc = item.querySelector('video').src;
        modalVideo.src = videoSrc;
        videoModal.classList.add('active');
        modalVideo.play();
    });
});

closeModal.addEventListener('click', () => {
    videoModal.classList.remove('active');
    modalVideo.pause();
    modalVideo.src = '';
});

videoModal.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.src = '';
    }
});

// Array de artículos/noticias
const articles = [
    {
        id:0,
        title: {
            es: "El Bosque de los Héroes",
            en: "The Forest of Heroes"
        },
        description: {
            es: "El 1 de Noviembre, a las 12:00, llega uno de los momentos más emotivos de Interkeltoi. Nuestos niñ@s numantinos plantan un ARCE en el bosque de los Héroes de Garray",
            en: "On November 1st at 12:00, one of the most moving moments of Interkeltoi arrives. Our Numantine children plant a MAPLE tree in the Forest of Heroes in Garray."
        },
        date: {
            es: "1 de Noviembre 2025, 12:00 horas",
            en: "November 1st 2025, 12:00 h"
        },
        image: "./media/arbolSamain.jpg",
        link: "./articulo11.html"

    },
    {
        id:1,
        title: {
            es: "IRISH TREBLE en Concierto",
            en: "IRISH TREBLE in Concert"

        },
        description: {
            es: "No te pierdas a las representantes irlandesas de Interkeltoi 2025 y sus bailes participativos al ritmo frenético de la música",
            en: "Don’t miss the Irish representatives of Interkeltoi 2025 and their participatory dances to the frenetic rhythm of the music"

        },
        date: {
            es: "31 de Octubre 2025, 22 horas",
            en: "October 31st, 2025"

        },
        image: "./media/thumbnails/videoMusical.png",
        link: "./articulo10.html"
    },
    {
        id:2,
        title: {
            es: "TIC TAC",
            en: "TIC TAC"
        },
        description: {
            es: "Se acerca Interkeltoi",
            en: "Interkeltoi is approaching"
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/thumbnails/videoInMyDreams.png",
        link: "./articulo9.html"

    },
    {
        id:3,
        title: {
            es: "La Danza de Samain",
            en: "The Dance of Samain"
        },
        description: {
            es: "Un viaje inmersivo a la Edad de los Metales",
            en: "An immersive journey to the Metal Age"

        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"

        },
        image: "./media/thumbnails/videoDanza.png",
        link: "./articulo8.html"
    },
    {
        id:4,
        title: {
            es: "Saukon",
            en: "Saucon"
        },
        description: {
            es: "El espíritu del bosque regresa con nuevas ideas",
            en: "The spirit of the forest returns with new stories"
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/saukon.jpg",
        link: "./articulo7.html"
    },
    {
        id:5,
        title: {
            es: "Desfile de Antorchas",
            en: "Torch Parade",
        },
        description: {
            es: "Una procesión mágica hacia el Nemetón",
            en: "A magical Procession to the Nemeton"
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/thumbnails/videosRuben.jpg",
        link: "./articulo6.html"
    },
    {
        id:6,
        title: {
            es: "MARISA GERARDI",
            en: "MARISA GERARDI"
        },
        description: {
            es: "Una velada inspirada en Outlander",
            en: "An Evening Inspired by Outlander"
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/delorgan.jpg",
        link: "./articulo5.html"
    },
    {
        id: 7,
        title: {
            es: "INTERKELTOI 2025",
            en: "INTERKELTOI 2025"
        },
        description: {
            es: "Este 31 de octubre, únete a la celebración ancestral del Samain en Garray. Una noche mágica donde las barreras entre mundos se desdibujan.",
            en: "This October 31st, join the ancestral celebration of Samain in Garray. A magical night where the barriers between worlds blur."
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/samain_cartel2025.jpg",
        link: "./articulo1.html"
    },
   
    {
     id: 8,
        title: {
            es: "SAMAIN 2025",
            en: "SAMAIN 2025"
        },
        description: {
            es: "A partir de las 19:30, en el graderío de Numancia, don Antonio Chain Galán ofrecerá una explicación didáctica sobre el origen de Halloween y su conexión con el Samain Celta.",
            en: "Starting at 7:30 PM, at the Numancia grandstand, Mr. Antonio Chain Galán will offer an educational explanation about the origin of Halloween and its connection with Celtic Samain."
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/chainLeyendo.jpg",
        link: "./articulo.html"  
    },
    {
        id: 9,
        title: {
            es: "PROGRAMA COMPLETO INTERKELTOI 2025",
            en: "COMPLETE PROGRAM INTERKELTOI 2025"
        },
        description: {
            es: "Ya tenemos el programa completo del Interkeltoi 2025. Este año con programación en dos días: viernes 31 de octubre y sábado 1 de noviembre. ¡No te lo pierdas!",
            en: "We already have the complete program for Interkeltoi 2025. This year with programming on two days: Friday October 31st and Saturday November 1st. Don't miss it!"
        },
        date: {
            es: "31 Octubre - 1 Noviembre, 2025",
            en: "October 31st - November 1st, 2025"
        },
        image: "./media/cartel2025.jpg",
        link: "./articulo3.html"
    },
    {
        id: 10,
        title: {
            es: "JOHN STEWART - El Gaitero Escocés",
            en: "JOHN STEWART - The Scottish Piper"
        },
        description: {
            es: "Originario de Falkirk, Escocia, su interpretación en solitario de Amazing Grace es uno de los momentos más emotivos de Interkeltoi, inspirado en el Lone Piper del Edinburgh Military Tattoo.",
            en: "Originally from Falkirk, Scotland, his solo performance of Amazing Grace is one of the most emotional moments of Interkeltoi, inspired by the Lone Piper of the Edinburgh Military Tattoo."
        },
        date: {
            es: "31 de Octubre, 2025",
            en: "October 31st, 2025"
        },
        image: "./media/JohnStewart.jpg",
        link: "./articulo4.html"
    }
];

// Función para generar las cards dinámicamente
function generarCards() {
    const track = document.getElementById('carousel-recorrido');
    const dots = document.getElementById('carousel-datos');
    const currentLang = localStorage.getItem('idioma') || 'es';
    
    if (!track || !dots) return;
    
    track.innerHTML = '';
    dots.innerHTML = '';
    
    articles.forEach((article, index) => {
        // Crear la card manteniendo la estructura exacta del CSS
        const card = document.createElement('div');
        card.className = 'update-card';
        card.style.cursor = 'pointer';
        card.innerHTML = `
            <div class="update-card-image">
                <img src="${article.image}" alt="${article.title[currentLang]}">
            </div>
            <div class="update-card-content">
                <div class="update-card-date">${article.date[currentLang]}</div>
                <h3 class="update-card-title">${article.title[currentLang]}</h3>
                <p class="update-card-description">${article.description[currentLang]}</p>
                <span class="update-card-link">Leer más →</span>
            </div>
        `;
        
        // Añadir evento click para abrir en nueva pestaña
        card.addEventListener('click', () => {
            window.open(article.link, '_blank');
        });
        
        track.appendChild(card);
        
        // Crear dot de navegación
        const dot = document.createElement('span');
        dot.className = index === 0 ? 'carousel-dot active' : 'carousel-dot';
        dot.addEventListener('click', () => scrollToCard(index));
        dots.appendChild(dot);
    });
}

// Navegación del carousel de noticias
let currentCardIndex = 0;

function scrollToCard(index) {
    const track = document.getElementById('carousel-recorrido');
    const dots = document.querySelectorAll('.carousel-dot');
    const cards = document.querySelectorAll('.update-card');
    
    if (cards.length === 0) return;
    
    currentCardIndex = index;
    
    // Calcular el desplazamiento basado en el ancho de la card más el gap
    const cardWidth = cards[0].offsetWidth;
    const gap = 20; // Gap definido en el CSS
    const offset = index * (cardWidth + gap);
    
    track.style.transform = `translateX(-${offset}px)`;
    
    // Actualizar dots activos
    dots.forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Botones de navegación del carousel de noticias
document.getElementById('updatesPrev')?.addEventListener('click', () => {
    const totalCards = articles.length;
    currentCardIndex = (currentCardIndex - 1 + totalCards) % totalCards;
    scrollToCard(currentCardIndex);
});

document.getElementById('updatesNext')?.addEventListener('click', () => {
    const totalCards = articles.length;
    currentCardIndex = (currentCardIndex + 1) % totalCards;
    scrollToCard(currentCardIndex);
});

// Generar las cards al cargar la página
document.addEventListener('DOMContentLoaded', generarCards);

// ============================================
// NAVBAR RESPONSIVE
// ============================================
(function() {
    const navbarToggle = document.querySelector('.navbar-toggle');
    const navbarNav = document.querySelector('.navbar-nav');
    const dropdownToggles = document.querySelectorAll('.dropdown-toggle');
    
    // Crear overlay
    let overlay = document.createElement('div');
    overlay.className = 'navbar-overlay';
    document.body.appendChild(overlay);

    // Abrir/cerrar menú
    if (navbarToggle) {
        navbarToggle.addEventListener('click', function() {
            navbarNav.classList.toggle('active');
            navbarToggle.classList.toggle('active');
            overlay.classList.toggle('active');
            document.body.style.overflow = navbarNav.classList.contains('active') ? 'hidden' : '';
        });
    }

    // Cerrar con overlay
    overlay.addEventListener('click', function() {
        navbarNav.classList.remove('active');
        navbarToggle.classList.remove('active');
        overlay.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Cerrar al hacer click en link
    navbarNav.querySelectorAll('.nav-link:not(.dropdown-toggle)').forEach(link => {
        link.addEventListener('click', function() {
            if (window.innerWidth <= 768) {
                setTimeout(() => {
                    navbarNav.classList.remove('active');
                    navbarToggle.classList.remove('active');
                    overlay.classList.remove('active');
                    document.body.style.overflow = '';
                }, 300);
            }
        });
    });

    // Dropdowns en móvil
    dropdownToggles.forEach(toggle => {
        toggle.addEventListener('click', function(e) {
            if (window.innerWidth <= 768) {
                e.preventDefault();
                this.closest('.dropdown').classList.toggle('active');
            }
        });
    });

    // Cerrar al cambiar tamaño
    window.addEventListener('resize', function() {
        if (window.innerWidth > 768) {
            navbarNav.classList.remove('active');
            navbarToggle.classList.remove('active');
            overlay.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
})();