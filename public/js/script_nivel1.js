var musica = document.getElementById('musica_fondo');
var audio_correcto = document.getElementById('audio_correcto');
var audio_incorrecto = document.getElementById('audio_incorrecto');
var aplausos = document.getElementById('aplausos');


musica.play();
document.addEventListener('DOMContentLoaded', () => {
    const piezas = document.querySelectorAll('.pieza');
    const espacios = document.querySelectorAll('.espacio');
    let active = false;
    let currentX;
    let currentY;
    let initialX;
    let initialY;
    let xOffset = 0;
    let yOffset = 0;
    let draggedPiece = null;

    // Función para restablecer las piezas al cargar la página
    function initializePiezas() {
        piezas.forEach(pieza => {
            // Restablecer estilos y atributos
            pieza.style.position = 'static';
            pieza.style.transform = 'none';
            pieza.style.pointerEvents = 'auto';
            pieza.setAttribute('draggable', 'true');

            // Verificar si la pieza está en su posición correcta
            const piezaIndex = pieza.getAttribute('data-index');
            const parentEspacio = pieza.parentElement;

            if (parentEspacio.classList.contains('espacio') && parentEspacio.getAttribute('data-index') === piezaIndex) {
                pieza.setAttribute('draggable', 'false');
                pieza.style.pointerEvents = 'none';
            }
        });
    }

    initializePiezas();

    piezas.forEach(pieza => {
        pieza.setAttribute('data-original-parent', pieza.parentElement.id);

        pieza.addEventListener('touchstart', dragStart, false);
        pieza.addEventListener('touchend', dragEnd, false);
        pieza.addEventListener('touchmove', drag, false);

        pieza.addEventListener('dragstart', (event) => {
            event.dataTransfer.setData("text", event.target.id);
        });
    });

    function dragStart(e) {
        if (e.target.classList.contains('pieza')) {
            active = true;
            draggedPiece = e.target;

            // Hacer que la pieza desaparezca momentáneamente
            draggedPiece.style.visibility = 'hidden';
            setTimeout(() => {
                draggedPiece.style.visibility = 'visible';
            }, 130); 

            draggedPiece.style.position = 'absolute';
            draggedPiece.style.zIndex = '1000';

            initialX = e.touches ? e.touches[0].clientX : e.clientX;
            initialY = e.touches ? e.touches[0].clientY : e.clientY;

            const rect = draggedPiece.getBoundingClientRect();
            xOffset = initialX - (rect.left + rect.width / 2);
            yOffset = initialY - (rect.top + rect.height / 2);

            currentX = initialX - xOffset;
            currentY = initialY - yOffset;

            setTranslate(currentX, currentY, draggedPiece);
        }
    }

    function dragEnd(e) {
        active = false;
        draggedPiece.style.zIndex = '';

        const piezaIndex = draggedPiece.getAttribute('data-index');
        let placed = false;

        espacios.forEach(espacio => {
            const espacioIndex = espacio.getAttribute('data-index');
            const existingPiece = espacio.querySelector('.pieza');

            if (isDroppedInEspacio(e.changedTouches ? e.changedTouches[0].clientX : e.clientX, e.changedTouches ? e.changedTouches[0].clientY : e.clientY, espacio)) {
                if (!existingPiece || existingPiece === draggedPiece) {
                    
                    espacio.appendChild(draggedPiece);
                    draggedPiece.style.position = 'static';
                    draggedPiece.style.transform = 'none';
                    xOffset = 0;
                    yOffset = 0;
                    placed = true;

                    if (piezaIndex === espacioIndex) {
                        audio_correcto.play();
                        setTimeout(() => {
                            audio_correcto.pause();
                            audio_correcto.currentTime = 0 ;
                            
                            },1000);
                        draggedPiece.setAttribute('draggable', 'false');
                        draggedPiece.style.pointerEvents = 'none';
                        mostrarPregunta(piezaIndex);
                        mostrarModal();
                    }else{
                        audio_incorrecto.play();
                        setTimeout(() => {
                            audio_incorrecto.pause();
                            audio_incorrecto.currentTime = 0 ;
                            
                            },500);
                    }
                }
            }
        });

        if (!placed) {
            // Volver a la posición original si no se coloca en un contenedor permitido
            let originalParent = document.getElementById(draggedPiece.getAttribute('data-original-parent'));
            originalParent.appendChild(draggedPiece);
            draggedPiece.style.position = 'static';
            draggedPiece.style.transform = 'none';
            xOffset = 0;
            yOffset = 0;
        }
    }

    function drag(e) {
        if (active) {
            e.preventDefault();

            currentX = (e.touches ? e.touches[0].clientX : e.clientX) - initialX + xOffset;
            currentY = (e.touches ? e.touches[0].clientY : e.clientY) - initialY + yOffset;

            setTranslate(currentX, currentY, draggedPiece);
        }
    }

    function setTranslate(xPos, yPos, el) {
        el.style.transform = `translate3d(${xPos}px, ${yPos}px, 0)`;
    }

    function isDroppedInEspacio(x, y, espacio) {
        const rect = espacio.getBoundingClientRect();
        return (
            x > rect.left &&
            x < rect.right &&
            y > rect.top &&
            y < rect.bottom
        );
    }

    // Funciones allowDrop y drop para pc
    function allowDrop(event) {
        event.preventDefault();
    }

    function drop(event) {
        event.preventDefault();
        let data = event.dataTransfer.getData("text");
        let pieza = document.getElementById(data);
        let piezaIndex = pieza.getAttribute('data-index');
        let espacioIndex = event.target.getAttribute('data-index');
        let existingPiece = event.target.querySelector('.pieza');

        if (event.target.classList.contains('espacio')) {
            if (!existingPiece || existingPiece === pieza) {
                event.target.appendChild(pieza);

                if (piezaIndex === espacioIndex) {
                    audio_correcto.play();
                    pieza.setAttribute('draggable', 'false');
                    pieza.style.pointerEvents = 'none';
                    mostrarPregunta(piezaIndex);
                    mostrarModal();
                    setTimeout(() => {
                    audio_correcto.pause();
                    audio_correcto.currentTime = 0 ;
                    },800);

                }else{
                    audio_incorrecto.play();
                    setTimeout(() => {
                        audio_incorrecto.pause();
                        audio_incorrecto.currentTime = 0 ;
                        },500);
                }
            } else {
                let originalParent = document.getElementById(pieza.getAttribute('data-original-parent'));
                originalParent.appendChild(pieza);
                pieza.style.position = 'static';
                pieza.style.transform = 'none';
            }
        } else {
            let originalParent = document.getElementById(pieza.getAttribute('data-original-parent'));
            originalParent.appendChild(pieza);
            pieza.style.position = 'static';
            pieza.style.transform = 'none';
        }
    }

    // Añadir eventos a los espacios para soporte de pc
    espacios.forEach(espacio => {
        espacio.addEventListener('dragover', allowDrop, false);
        espacio.addEventListener('drop', drop, false);
    });
});




let preguntas = [
    {
        pregunta: "¿Cuál es la capital de Francia?",
        images: ["imgs/nivel2/imagen_5.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["París", "Londres", "Madrid"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la capital de Alemania?",
        images: ["imgs/nivel2/imagen_1.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["Berlín", "Viena", "Zurich"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la capital de Guatemala?",
        images: ["imgs/nivel2/imagen_1.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["Berlín", "Viena", "Zurich"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la capital de Alemania?",
        images: ["imgs/nivel2/imagen_1.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["Berlín", "Viena", "Zurich"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la capital de Alemania?",
        images: ["imgs/nivel2/imagen_1.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["Berlín", "Viena", "Zurich"],
        correcta: 0
    },
    {
        pregunta: "¿Cuál es la capital de Alemania?",
        images: ["imgs/nivel2/imagen_1.jpeg", "imgs/nivel2/imagen_1.jpeg","imgs/nivel2/imagen_3.jpeg"],
        respuestas: ["Berlín", "Viena", "Zurich"],
        correcta: 0
    },
    // Añadir más preguntas según sea necesario
];

let tamaño = 100 / preguntas.length;
let confetti_ = 0 ;

function cargar_barra() {
    const barra = document.getElementById('barra');
    barra.value += tamaño;
}
var correctas = 0 ;
let completadas = 0;
let modal = document.getElementById("modal");
let span = document.getElementsByClassName("close")[0];
let preguntaTexto = document.getElementById("pregunta");
let imagenesRespuesta = document.querySelectorAll(".respuesta");
let contador = document.getElementById("contador");
const close_modal = document.querySelector('.close_modal');
const imagen1 = document.getElementById('imagen1');
const imagen2 = document.getElementById('imagen2');
const imagen3 = document.getElementById('imagen3');
const rompecabezas = document.querySelector('.rompecabezas_final');
const espacios = document.querySelector('.espacio');
const espacio1 = document.getElementById('espacio1');
const espacio2 = document.getElementById('espacio2');
const espacio3 = document.getElementById('espacio3');
const espacio4 = document.getElementById('espacio4');
const espacio5 = document.getElementById('espacio5');
const espacio6 = document.getElementById('espacio6');
const boton_continuar = document.getElementById('next-button');
const boton_regresar = document.getElementById('regresar');
const modal_continuar = document.getElementById('modal-continuar');


boton_regresar.addEventListener('click', (e) => {
    e.preventDefault();
    modal.classList.add('modal_show');
    close_modal.style.display = "block";
    modal_continuar.style.display = "block";
    preguntaTexto.style.display = "none";
    imagen1.style.display = "none";
    imagen2.style.display = "none";
    imagen3.style.display = "none";
});


close_modal.style.display = "none";

close_modal.addEventListener('click', (e) => {
    e.preventDefault();
    close_modal.style.display = "none";
    modal.classList.remove('modal_show');
    setTimeout(() => {
        modal_continuar.style.display = "none"
        preguntaTexto.style.display = "block";
        imagen1.style.display = "block";
        imagen2.style.display = "block";
        imagen3.style.display = "block";
    }, 1000);

});

span.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

imagenesRespuesta.forEach((imagen, i) => {
    imagen.addEventListener('click', (e) => {
        let index = modal.getAttribute('data-index');
        let esCorrecta = imagen.getAttribute('data-correct') === 'true';
        document.querySelector(`.pieza[data-index="${index}"]`).classList.add('completada');
        if (esCorrecta) {
            correctas++;
            
        }
        completadas++;
        localStorage.setItem('completadas', completadas);
        if (completadas >= 6) {
            completadas = 6;
            
            boton_continuar.style.display = "block" ;
            boton_regresar.style.display = "none" ;
        }
        if (completadas == 6) {
            confetti_++;
            espacio1.style.border = "none";
            espacio2.style.border = "none";
            espacio3.style.border = "none";
            espacio4.style.border = "none";
            espacio5.style.border = "none";
            espacio6.style.border = "none";
            rompecabezas.style.gap = "0px";
            aplausos.play();
            setTimeout(() => {
                aplausos.pause();
                aplausos.currentTime = 0 ;

            }, 15000);
        }

        if (confetti_ == 1) {
            launchConfetti();
        }
        contador.innerText = `${completadas}/6`;
        e.preventDefault();
        modal.classList.remove('modal_show');
        cargar_barra();
    });
});

function mostrarPregunta(index) {
    let pregunta = preguntas[index - 1];
    preguntaTexto.innerText = pregunta.pregunta;

    imagen1.src = pregunta.images[0];
    imagen1.setAttribute('data-correct', 0 === pregunta.correcta ? 'true' : 'false');

    imagen2.src = pregunta.images[1];
    imagen2.setAttribute('data-correct', 1 === pregunta.correcta ? 'true' : 'false');

    imagen3.src = pregunta.images[2];
    imagen3.setAttribute('data-correct', 2 === pregunta.correcta ? 'true' : 'false');

    modal.classList.add('modal_show');
    modal.setAttribute('data-index', index);
}




modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        e.stopPropagation(); // Evita que el clic en el fondo cierre el modal
    }
});

// Evita que el modal se cierre al hacer clic en el contenido
modalContent.addEventListener('click', (e) => {
    e.stopPropagation(); // Evita que el clic en el contenido cierre el modal
});

function goHome() {
    musica.pause();
    musica.currentTime = 0 ;


    window.location.href = 'dashboard';
}


//----------------------------------------Confetti------------------------------------------
function launchConfetti() {
    const duration = 15 * 1000; // Duración en milisegundos
    const animationEnd = Date.now() + duration;
    const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

    function randomInRange(min, max) {
        return Math.random() * (max - min) + min;
    }

    const interval = setInterval(function() {
        const timeLeft = animationEnd - Date.now();
        if (timeLeft <= 0) {
            return clearInterval(interval);
        }
        const particleCount = 250 * (timeLeft / duration);
        // Lanzar confeti desde diferentes lugares
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 }
        }));
        confetti(Object.assign({}, defaults, { 
            particleCount, 
            origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 }
        }));
    }, 300);
}





