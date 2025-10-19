// Gestión del cambio de idioma
document.addEventListener('DOMContentLoaded', function() {
    const btnEs = document.getElementById('btnEs');
    const btnEn = document.getElementById('btnEn');
    const languageSelector = document.getElementById('languageSelector');
    const elementosTraducibles = document.querySelectorAll('.traducible');

    // Función para cambiar el idioma
    function cambiarIdioma(idioma) {
        elementosTraducibles.forEach(elemento => {
            const textoTraducido = elemento.getAttribute(`data-${idioma}`);
            if (textoTraducido) {
                elemento.textContent = textoTraducido;
            }
        });

        // Actualizar botones activos y mover el indicador
        if (idioma === 'es') {
            btnEs.classList.add('active');
            btnEn.classList.remove('active');
            languageSelector.classList.remove('english');
        } else {
            btnEn.classList.add('active');
            btnEs.classList.remove('active');
            languageSelector.classList.add('english');
        }

        // Guardar preferencia en localStorage
        localStorage.setItem('idiomaPreferido', idioma);
    }

    // Event listeners para los botones
    btnEs.addEventListener('click', () => cambiarIdioma('es'));
    btnEn.addEventListener('click', () => cambiarIdioma('en'));

    // Cargar idioma guardado o usar español por defecto
    const idiomaGuardado = localStorage.getItem('idiomaPreferido') || 'es';
    cambiarIdioma(idiomaGuardado);

    // Funcionalidad para abrir imagen en nueva pestaña (ya está en el HTML con target="_blank")
    const imagenesClickeables = document.querySelectorAll('.imagen-articulo2');
    imagenesClickeables.forEach(img => {
        img.style.cursor = 'pointer';
    });
});