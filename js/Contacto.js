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

//Creamos una función para gestionar el mapa

function initMap() {
    //Coordenadas de la ubicación deseada
    const location = {lat:41.814054, lng: -2.44637};

    //Creamos el mapa
    const map = new google.maps.Map(document.getElementById("map"), {
        zoom:15,
        center:location,
    });

    //Añadimos un marcador en la ubicación
    const marker = new google.maps.marker({
        position: location,
        map: map,
        title: "C/Garrejo, 17 Bajo, Garray(Soria)"
    });
}