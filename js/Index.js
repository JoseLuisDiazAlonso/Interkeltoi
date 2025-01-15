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
