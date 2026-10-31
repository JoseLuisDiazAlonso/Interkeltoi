// ============================================
// GESTIÓN DE COOKIES
// ============================================
document.addEventListener('DOMContentLoaded', function () {
    const cookieConsent = document.getElementById('cookieConsent');
    const acceptCookies = document.getElementById('acceptCookies');
    const declineCookies = document.getElementById('declineCookies');

    // Si esta página no tiene banner de cookies, no hacemos nada
    if (!cookieConsent || !acceptCookies || !declineCookies) return;

    if (!localStorage.getItem('cookiesAccepted')) {
        cookieConsent.style.display = 'block';
    }

    acceptCookies.addEventListener('click', function () {
        localStorage.setItem('cookiesAccepted', 'true');
        cookieConsent.style.display = 'none';
    });

    declineCookies.addEventListener('click', function () {
        cookieConsent.style.display = 'none';
    });
});

// ============================================
// CAMBIO DE IDIOMA
// ============================================
function changeLanguage(lang) {
    document.querySelectorAll('[data-en], [data-es]').forEach(element => {
        const texto = element.getAttribute(`data-${lang}`);
        if (texto === null) return;

        if (element.tagName === 'INPUT' || element.tagName === 'TEXTAREA') {
            element.placeholder = texto;
        } else {
            element.textContent = texto;
        }
    });

    localStorage.setItem('idioma', lang);

    // Estado de los botones de idioma
    const enIcon = document.getElementById('en-icon');
    const esIcon = document.getElementById('es-icon');
    if (enIcon && esIcon) {
        enIcon.setAttribute('aria-pressed', String(lang === 'en'));
        esIcon.setAttribute('aria-pressed', String(lang === 'es'));
    }

    document.documentElement.lang = lang;

    // Regenerar las cards con el nuevo idioma
    generarCards();
}

// Cargar el idioma guardado al iniciar la página
document.addEventListener('DOMContentLoaded', function () {
    const savedLanguage = localStorage.getItem('idioma') || 'es';
    changeLanguage(savedLanguage);
});

// ============================================
// ANIMACIÓN AL HACER SCROLL
// ============================================
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal').forEach(element => observer.observe(element));

// ============================================
// CARRUSEL DE VÍDEOS
// ============================================
const carouselTrack = document.getElementById('carouselTrack');
const prevBtn = document.getElementById('carouselPrev');
const nextBtn = document.getElementById('carouselNext');
const videoModal = document.getElementById('videoModal');
const modalVideo = document.getElementById('modalVideo');
const closeModal = document.getElementById('closeModal');
const videoItems = document.querySelectorAll('.video-item');

let ultimoVideoPulsado = null;   // para devolver el foco al cerrar el modal

if (carouselTrack && prevBtn && nextBtn) {
    // Desplaza el carrusel el ancho visible (1, 2 o 3 vídeos según la pantalla)
    function moverCarrusel(direccion) {
        carouselTrack.scrollBy({ left: direccion * carouselTrack.clientWidth });
    }

    prevBtn.addEventListener('click', () => moverCarrusel(-1));
    nextBtn.addEventListener('click', () => moverCarrusel(1));
}

if (videoModal && modalVideo && closeModal) {
    function abrirModal(item) {
        ultimoVideoPulsado = item;
        // Quitamos "#t=0.1" para que el vídeo empiece desde el principio
        modalVideo.src = item.querySelector('video').src.split('#')[0];
        videoModal.classList.add('active');
        document.body.style.overflow = 'hidden';   // evita que la página se desplace detrás
        closeModal.focus();
        modalVideo.play().catch(error => {
            if (error.name !== 'AbortError') console.error('Error al reproducir el vídeo:', error);
        });
    }

    function cerrarModal() {
        videoModal.classList.remove('active');
        modalVideo.pause();
        modalVideo.removeAttribute('src');
        modalVideo.load();
        document.body.style.overflow = '';
        if (ultimoVideoPulsado) ultimoVideoPulsado.focus();
    }

    videoItems.forEach(item => {
        item.addEventListener('click', () => abrirModal(item));
    });

    closeModal.addEventListener('click', cerrarModal);

    // Cerrar al pulsar fuera del vídeo
    videoModal.addEventListener('click', (e) => {
        if (e.target === videoModal) cerrarModal();
    });

    // Cerrar con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && videoModal.classList.contains('active')) cerrarModal();
    });
}

// ============================================
// NOTICIAS
// ============================================
// - Card con imagen: usa "image".
// - Card con vídeo: usa "video" (y opcionalmente "segundo" para elegir
//   el fotograma que se ve como miniatura). Si hay "video", se usa el vídeo.
const articles = [
    {
        id: 0,
        title: {
            es: "EL VERMÚ DE LAS 6 NACIONES",
            en: "THE SIX NATIONS VERMOUTH-INTERKELTOI 2026"
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "1 de Noviembre 2026",
            en: "November 1st 2026"
        },
        image: "./media/imagen20267.jpeg",
        link: "./articulo23.html"
    },
    {
        id: 1,
        title: {
            es: "EL VERMÚ DE LAS 6 NACIONES",
            en: "THE SIX NATIONS VERMOUTH-INTERKELTOI 2026"
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "1 de Noviembre 2026",
            en: "November 1st 2026"
        },
        image: "./media/milleanEscoces.jpeg",
        link: "./articulo22.html"
    },
    {
        id: 2,
        title: {
            es: "EL VERMÚ DE LAS 6 NACIONES",
            en: "THE SIX NATIONS VERMOUTH-INTERKELTOI 2026"
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "1 de Noviembre 2026",
            en: "November 1st 2026"
        },
        image: "./media/platoTradicionalIrlandes.jpeg",
        link: "./articulo21.html"
    },
    {
        id: 3,
        title: {
            es: "EL VERMÚ DE LAS 6 NACIONES",
            en: "THE SIX NATIONS VERMOUTH-INTERKELTOI 2026"
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "1 de Noviembre 2026",
            en: "November 1st 2026"
        },
        image: "./media/confitDePato.jpeg",
        link: "./articulo20.html"
    },
    {
        id: 4,
        title: {
            es: "LAS HISTORIAS DE NUMANCIA ESTÁN A PUNTO DE VOLVER A CONTARSE...",
            en: "THE STORIES OF NUMANTIA ARE ABOUT TO BE TOLD ONCE AGAIN..."
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        image: "./media/imagen20268.jpeg",
        link: "./articulo19.html"
    },
    {
        id: 5,
        title: {
            es: "HAY NOCHES EN LAS QUE EL PASADO DESPIERTA.",
            en: "THERE ARE NIGHTS WHEN THE PAST AWAKENS."
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        image: "./media/imagen20267.jpeg",
        link: "./articulo18.html"
    },
    {
        id: 6,
        title: {
            es: "CUANDO EL DIOS LUGH DESPIERTA, EL CUERPO SE CONVIERTE EN LEYENDA.",
            en: "WHEN THE GOD LUGH AWAKENS, THE BODY BECOMES LEGEND."
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        video: "./media/video2026_5.mp4",
        segundo: 5,
        link: "./articulo17.html"
    },
    {
        id: 7,
        title: {
            es:"CUANDO EL FUEGO DESPIERTA, LA TIERRA VUELVE A BAILAR.",
            en: "WHEN THE FIRE AWAKENS, THE EARTH DANCES AGAIN.",
        },
        description: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"

        },
        image: "./media/foto2026_4.jpeg",
        link: "./articulo16.html"

    },   
     {
        id: 8,
        title: {
            es: "HAY DANZAS QUE NO SE APRENDEN. SE RECUERDAN.",
            en: "SOME DANCES AREN'T LEARNED. THEY'RE REMEMBERED."
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        image: "./media/thumbnails/video2026_3.jpg",
        link: "./articulo15.html"
    },
    {
        id: 9,
        title: {
            es: "¡El Fuego de Numancia vuelve a sonar a folk atlántico!",
            en: "The fire of Numantia rings out with Atlantic folk once again! "
        },
        description: {
            es: "INTERKELTOI-SAMAIN 2026",
            en: "INTERKELTOI-SAMAIN 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        image: "./media/LighthouseKeepers.jpeg",
        link: "./articulo14.html"
    },
    {
        id: 10,
        title: {
            es: "¡HEMOS VUELTO!",
            en: "WE'RE BACK!"
        },
        description: {
            es: "INTERKELTOI-SAMAIN vuelve en 2026",
            en: "INTERKELTOI-SAMAIN returns in 2026"
        },
        date: {
            es: "31 de Octubre 2026",
            en: "October 31st 2026"
        },
        image: "./media/historiaEvento2.jpeg",
        link: "./articulo13.html"
    },
    {
        id: 11,
        title: {
            es: "ALGO ESTÁ A PUNTO DE DESPERTAR",
            en: "SOMETHING IS ABOUT TO AWAKEN"
        },
        description: {
            es: "INTERKELTOI-SAMAIN vuelve en 2026",
            en: "INTERKELTOI-SAMAIN returns in 2026"
        },
        date: {
            es: "31 de Octubre 2025",
            en: "October 31st 2025"
        },
        image: "./media/articulo12img.jpeg",
        link: "./articulo12.html"
    },
    {
        id: 12,
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
        id: 13,
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
        id: 14,
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
        id: 15,
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
        id: 16,
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
        id: 17,
        title: {
            es: "Desfile de Antorchas",
            en: "Torch Parade"
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
        id: 18,
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
        id: 19,
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
        id: 20,
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
        link: "./articulo2.html"
    },
    {
        id: 21,
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
        id: 22,
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

let currentCardIndex = 0;
const updatesContainer = document.querySelector('.updates-carousel-container');

// Segundo por defecto para las miniaturas de vídeo (evita el primer fotograma en negro)
const SEGUNDO_MINIATURA = 0.5;

// Devuelve la miniatura de la card: <video> si tiene vídeo, <img> si no
function crearMiniatura(article) {
    if (article.video) {
        const segundo = article.segundo ?? SEGUNDO_MINIATURA;
        const src = article.video.includes('#')
            ? article.video
            : `${article.video}#t=${segundo}`;

        return `<video src="${src}" preload="metadata" muted playsinline
                       disablepictureinpicture aria-hidden="true"
                       style="width: 100%; height: 100%; object-fit: cover; pointer-events: none; display: block;">
                </video>`;
    }

    return `<img src="${article.image}" alt="" loading="lazy">`;
}

// Generar las cards de noticias
function generarCards() {
    const track = document.getElementById('carousel-recorrido');
    const dots = document.getElementById('carousel-datos');
    const currentLang = localStorage.getItem('idioma') || 'es';

    // Si esta página no tiene carrusel de noticias, no hacemos nada
    if (!track || !dots) return;

    track.innerHTML = '';
    dots.innerHTML = '';

    articles.forEach((article, index) => {
        // La card es un enlace: funciona con teclado, clic central, etc.
        const card = document.createElement('a');
        card.className = 'update-card';
        card.href = article.link;
        card.target = '_blank';
        card.rel = 'noopener';
        card.innerHTML = `
            <div class="update-card-image">
                ${crearMiniatura(article)}
            </div>
            <div class="update-card-content">
                <div class="update-card-date">${article.date[currentLang]}</div>
                <h3 class="update-card-title">${article.title[currentLang]}</h3>
                <p class="update-card-description">${article.description[currentLang]}</p>
                <span class="update-card-link">${currentLang === 'en' ? 'Read more →' : 'Leer más →'}</span>
            </div>
        `;
        track.appendChild(card);

        // Punto de navegación
        const dot = document.createElement('button');
        dot.type = 'button';
        dot.className = index === currentCardIndex ? 'carousel-dot active' : 'carousel-dot';
        dot.setAttribute('aria-label', `${currentLang === 'en' ? 'Go to news' : 'Ir a la noticia'} ${index + 1}`);
        dot.addEventListener('click', () => scrollToCard(index));
        dots.appendChild(dot);
    });
}

function actualizarDots(index) {
    document.querySelectorAll('.carousel-dot').forEach((dot, i) => {
        dot.classList.toggle('active', i === index);
    });
}

// Desplaza el contenedor hasta la card indicada
function scrollToCard(index) {
    const cards = document.querySelectorAll('.update-card');
    if (!updatesContainer || !cards[index]) return;
    updatesContainer.scrollTo({ left: cards[index].offsetLeft - cards[0].offsetLeft });
}

if (updatesContainer) {
    // Al hacer scroll (dedo, trackpad o botones), calcula qué card está al inicio
    updatesContainer.addEventListener('scroll', () => {
        const cards = document.querySelectorAll('.update-card');
        if (cards.length < 2) return;
        const paso = cards[1].offsetLeft - cards[0].offsetLeft;
        currentCardIndex = Math.round(updatesContainer.scrollLeft / paso);
        actualizarDots(currentCardIndex);
    });

    document.getElementById('updatesPrev')?.addEventListener('click', () => {
        scrollToCard(currentCardIndex === 0 ? articles.length - 1 : currentCardIndex - 1);
    });

    document.getElementById('updatesNext')?.addEventListener('click', () => {
        const alFinal = updatesContainer.scrollLeft + updatesContainer.clientWidth >= updatesContainer.scrollWidth - 1;
        scrollToCard(alFinal ? 0 : currentCardIndex + 1);
    });
}