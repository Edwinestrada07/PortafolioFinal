//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
//Boton de darkMOde
/*const darkModeToggle = document.getElementById('darkModeToggle');
const body = document.body;

darkModeToggle.addEventListener('click', () => {
    body.classList.toggle('dark-mode');
    darkModeToggle.textContent = body.classList.contains('dark-mode') ? 'Modo Claro' : 'Modo Oscuro';
});*/


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Efecto de máquina de escribir con borrado -->
const messages = [
    "Desarrollo Web Full-Stack",
    "Desarrollador front-end",
    "Diseño gráfico"
];
    
let messageIndex = 0;
let charIndex = 0;
let isDeleting = false;
    
function typeWriter() {
    const currentMessage = messages[messageIndex];
    const typingSpeed = isDeleting ? 50 : 100;
    const displayText = currentMessage.substring(0, charIndex);
        
    document.getElementById("typing__text").innerHTML = displayText;

    if (!isDeleting && charIndex < currentMessage.length) {
        // Sigue escribiendo
        charIndex++;
    } else if (isDeleting && charIndex > 0) {
        // Borra el texto
        charIndex--;
    } else if (!isDeleting && charIndex === currentMessage.length) {
        // Empieza a borrar después de completar el mensaje
        isDeleting = true;
        setTimeout(typeWriter, 1000); // Pausa antes de borrar
        return;
    } else if (isDeleting && charIndex === 0) {
        // Pasa al siguiente mensaje después de borrar
        isDeleting = false;
        messageIndex = (messageIndex + 1) % messages.length; // Cicla entre los mensajes
    }

    setTimeout(typeWriter, typingSpeed);
}
    
window.onload = typeWriter; // Ejecuta el efecto al cargar la página


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Función de limitación (throttle) para controlar la frecuencia de los eventos -->
function throttle(func, delay) {
    let lastCall = 0;
    return function (...args) {
        const now = new Date().getTime();
        if (now - lastCall < delay) return;
        lastCall = now;
        return func(...args);
    };
}

// Seleccionar todas las tarjetas
const cards = document.querySelectorAll('.card');

cards.forEach(card => {
    let rotateX = 0;
    let rotateY = 0;

    // Función de movimiento del mouse
    const onMouseMove = throttle((e) => {
        const cardRect = card.getBoundingClientRect();
        const x = e.clientX - cardRect.left;
        const y = e.clientY - cardRect.top;
        const centerX = cardRect.width / 2;
        const centerY = cardRect.height / 2;
        rotateX = (y - centerX) / 10;  // Ajuste para un efecto más sutil
        rotateY = (centerY - x) / 10;
        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
    }, 100);

    // Evento para aplicar el efecto cuando se mueve el mouse sobre la tarjeta
    card.addEventListener('mousemove', onMouseMove);

    // Evento para restablecer el efecto cuando el mouse deja la tarjeta
    card.addEventListener('mouseleave', () => {
        card.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Filtro de tarjetas según el botón seleccionado
const buttons = document.querySelectorAll('.proyect__button__gradient');
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const filter = this.getAttribute('data-filter');
        cards.forEach(card => {
            if (filter === '*' || card.classList.contains(filter.slice(1))) {
                card.classList.remove('hide');
            } else {
                card.classList.add('hide');
            }
        });
    });
});


//>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
// Modal de visualización de proyectos a pantalla completa
const modal = document.getElementById('projectModal');
const modalImage = document.getElementById('modalImage');
const card = document.querySelectorAll('.card');
const closeModal = document.querySelector('.close');

cards.forEach(card => {
    card.addEventListener('click', (e) => {
        const imgSrc = card.querySelector('img').src;
        modalImage.src = imgSrc;
        modal.style.display = 'block';
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

// Cerrar modal si se hace clic fuera del contenido
window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = 'none';
    }
};
