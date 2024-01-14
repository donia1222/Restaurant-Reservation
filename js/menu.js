
fetch('menu/obtener_menus.php')
    .then(response => response.json())
    .then(data => {
        document.querySelector('.fecha').textContent = `${data.fecha}`;
        document.getElementById('bloque-miercoles').innerHTML = `
            <h3>Mittwoch</h3>
            <p>${data.titulo_mi}</p>
            <p>${data.descripcion_mi}</p>
        `;
        document.getElementById('bloque-jueves').innerHTML = `
            <h3>Donnerstag</h3>
            <p>${data.titulo_do}</p>
            <p>${data.descripcion_do}</p>
        `;
        document.getElementById('bloque-viernes').innerHTML = `
            <h3>Freitag</h3>
            <p>${data.titulo_fr}</p>
            <p>${data.descripcion_fr}</p>
        `;
        document.getElementById('bloque-quesadilla').innerHTML = `
            <h3>Quesadilla Spezial</h3>
            <p>${data.quesadilla_titulo}</p>
            <p>${data.quesadilla_descripcion}</p>
        `;
    });


    function volver() {
        window.history.back();
    }

var slides = document.getElementsByClassName("slide");
var index = 0;

function showSlide() {
    for (var i = 0; i < slides.length; i++) {
        slides[i].style.opacity = 0;
    }
    index++;
    if (index > slides.length) {
        index = 1;
    }
    slides[index - 1].style.opacity = 1;
    setTimeout(showSlide, 4000); // Cambia la imagen cada 3 segundos
}

showSlide();

window.addEventListener('scroll', function() {
    const text = document.querySelector('.animated-text');
    const image = document.querySelector('.animated-image');
    const textPosition = text.getBoundingClientRect().top;
    const imagePosition = image.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;

    if (textPosition < windowHeight) {
        text.classList.add('slide-in');
    }

    if (imagePosition < windowHeight) {
        image.classList.add('slide-in');
    }
});


