// Llamar a la función con los valores deseados y el selector del elemento de destino
// top, left, size, targetSelector, animationDelay
// funcion para crear los corazones
for (let i = 1; i < 7; i++) {
    createHeart(i * 20, i * 40, i * 10, '.heart' + i, i);
}





// Seleccionar y manipular los botones
const button1 = document.getElementById('button1');
const button2 = document.getElementById('button2');

const triangleTop = document.querySelector('.triangle-top');
const letter = document.querySelector('.letter');
const letterWhite = document.querySelector('.letter-white');
const heart = document.querySelector('.heart');

const groupHearts = document.querySelectorAll('.heart');

let isOK = true;
//funcion para abrir la carta triangle-top-open
function open() {
    if (isOK) {
        isOK = false;
        disableButtons();

        triangleTop.classList.toggle('triangle-top-open');

        //activa los corazones 
        groupHearts.forEach((heart, i) => {
            heart.style.animationDelay = `${i * 0.5}s`;
            heart.classList.toggle('heart-up');
        });

        //cambia el z-index despues de 1 segundo  y activa la carta para que suba elementos = letter y letterWhite
        setTimeout(() => {
            triangleTop.style.zIndex = 90;
            letter.classList.toggle('letter-open');
            letterWhite.classList.toggle('letter-white-open');
        }, 1000);

        //activa los botones despues de 3.5 segundos
        setTimeout(() => {
            enableButtons();
        }, 3500);
    }
}

//funcion para cerrar la carta triangle-top-open
function close() {
    if (!isOK) {
        isOK = true;
        disableButtons();

        letter.classList.toggle('letter-open');
        letterWhite.classList.toggle('letter-white-open');

        setTimeout(() => {
            triangleTop.style.zIndex = 120;
            triangleTop.classList.toggle('triangle-top-open');
        }, 1000);

        setTimeout(() => {
            groupHearts.forEach(heart => {
                heart.classList.toggle('heart-up');
            });

            enableButtons();
        }, 2100);
    }
}

//funcion para desactivar los botones
function disableButtons() {
    button1.disabled = true;
    button2.disabled = true;
}
//funcion para activar los botones
function enableButtons() {
    button1.disabled = false;
    button2.disabled = false;
}

button1.addEventListener('click', open);
button2.addEventListener('click', close);

//funcion para crear los corazones
function createHeart(top, left, size, targetSelector, animationDelay) {
    // Crear el corazón principal
    const heart = document.createElement('div');
    heart.classList.add('heart', `heart-${animationDelay}`);
    heart.style.width = size + 'px';
    heart.style.height = size + 'px';
    heart.style.top = top + 'px';
    heart.style.left = left + 'px';

    // Crear el pseudo-elemento before
    const before = document.createElement('div');
    before.style.width = size + 'px';
    before.style.height = size + 'px';
    before.style.borderRadius = '50%';
    before.style.backgroundColor = 'var(--color-heart)';
    before.style.position = 'absolute';
    before.style.top = '-50%';
    before.style.left = '0%';
    before.style.transform = 'rotate(-45deg)';

    // Crear el pseudo-elemento after
    const after = document.createElement('div');
    after.style.width = size + 'px';
    after.style.height = size + 'px';
    after.style.borderRadius = '50%';
    after.style.backgroundColor = 'var(--color-heart)';
    after.style.position = 'absolute';
    after.style.top = '0';
    after.style.left = '50%';
    after.style.transform = 'rotate(-45deg)';

    // Adjuntar los elementos al corazón principal
    heart.appendChild(before);
    heart.appendChild(after);

    // Obtener el elemento de destino usando el selector
    const targetElement = document.querySelector(targetSelector);

    // Añadir el corazón como hijo del elemento de destino
    if (targetElement) {
        targetElement.appendChild(heart);
    } else {
        console.error(`Elemento de destino no encontrado usando el selector: ${targetSelector}`);
    }

    // Agregar estilos específicos para la animación de cada corazón , agregar el estilo  al css 
    const style = document.createElement('style');
    // Agregar el estilo al head del documento para que se aplique la animación a los corazones
    // Agrega cada animacion para cada corazon en diferentes tiempos
    style.innerHTML = `
        @keyframes moveHeart${animationDelay} {
            25% {
                left: ${left + 10}px;
            }

            50% {
                left: ${left - 10}px;
            }

            75% {
                left: ${left + 15}px;
            }

            100% {
                transform: translateY(-100vh) rotate(-45deg);
                left: ${left}px;
            }
        }

        .heart${animationDelay} .heart-up {
            animation: moveHeart${animationDelay} 6.5s ease-in-out forwards;
        } `;

    document.head.appendChild(style);
}
