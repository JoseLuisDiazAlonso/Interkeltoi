document.addEventListener('DOMContentLoaded', function () {
    const albums = [
        {
            title: 'Interkeltoi 2024',
            folderPath: './media/Interkeltoi 2024/',
            images: [
                'fotoIrlanda1.jpg', 'fotoIrlanda2.jpg', 'fotoIrlanda3.jpg', 'fotoIrlanda4.jpg', 'fotoIrlanda5.jpg',
                'fotoIrlanda6.jpg', 'fotoIrlanda7.jpg', 'fotoIrlanda8.jpg', 'fotoIrlanda9.jpg', 'fotoIrlanda10.jpg',
                'fotoIrlanda11.jpg', 'fotoIrlanda13.jpg', 'fotoIrlanda15.jpg', 'fotoIrlandaEscopeta.jpg'
            ]
        },
    ];

    const albumContainer = document.getElementById('album-container');

    albums.forEach((album, index) => {
        const albumCard = document.createElement('div');
        albumCard.classList.add('col-md-4', 'mb-4');

        albumCard.innerHTML = `
            <div class="card" style="cursor: pointer;" data-album-index="${index}">
                <img src="${album.folderPath + album.images[0]}" class="card-img-top" alt="Imagen del álbum ${album.title}">
                <div class="card-body">
                    <h5 class="card-title">${album.title}</h5>
                    <p class="card-text">Haz clic para ver las fotos de ${album.title}</p>
                </div>
            </div>
        `;
        albumContainer.appendChild(albumCard);
    });

    albumContainer.addEventListener('click', function (event) {
        const card = event.target.closest('.card');
        if (card) {
            const albumIndex = card.dataset.albumIndex;
            if (albumIndex !== undefined) {
                console.log('Abriendo carrusel del álbum:', albumIndex);
                openCarousel(Number(albumIndex));
            }
        }
    });

    function openCarousel(albumIndex) {
        const album = albums[albumIndex];
        const carouselInner = document.querySelector('#carouselExampleControls .carousel-inner');
        carouselInner.innerHTML = '';

        if (album.images && album.images.length > 0) {
            album.images.forEach((image, index) => {
                const imgElement = document.createElement('div');
                imgElement.classList.add('carousel-item');
                if (index === 0) imgElement.classList.add('active');

                imgElement.innerHTML = `
                    <img src="${album.folderPath + image}" class="d-block w-100" alt="Imagen ${index + 1}">
                `;
                carouselInner.appendChild(imgElement);
            });

            console.log('Carrusel actualizado, mostrando modal...');
            const carouselElement = document.getElementById('carouselExampleControls');
            new bootstrap.Carousel(carouselElement, { interval: 3000, wrap: true }).cycle();

            // FORZAR QUE EL MODAL SE ABRA
            const modal = new bootstrap.Modal(document.getElementById('carouselModal'));
            modal.show();
        } else {
            console.error('No se encontraron imágenes en el álbum');
        }
    }
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

