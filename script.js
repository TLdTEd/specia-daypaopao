// Lista manual con tus 39 imágenes y 5 GIFs en formato local estricto
const misFotos = [
    "img1.jpg", "img2.jpg", "img3.jpg", "img4.jpg", "img5.jpg",
    "img6.jpg", "img7.jpg", "img8.jpg", "img9.jpg", "img10.jpg",
    "img11.jpg", "img12.jpg", "img13.jpg", "img14.jpg", "img15.jpg",
    "img16.jpg", "img17.jpg", "img18.jpg", "img19.jpg", "img20.jpg",
    "img21.jpg", "img22.jpg", "img23.jpg", "img24.jpg", "img25.jpg",
    "img26.jpg", "img27.jpg", "img28.jpg", "img29.jpg", "img30.jpg",
    "img31.jpg", "img32.jpg", "img33.jpg", "img34.jpg", "img35.jpg",
    "img36.jpg", "img37.jpg", "img38.jpg", "img39.jpg",
    "gif1.gif", "gif2.gif", "gif3.gif", "gif4.gif", "gif5.gif"
];

// Paleta de colores pastel compartida para toda la vegetación digital
const coloresTulipanes = ["#ffb3c6", "#ffcad4", "#ffe5ec", "#ffccd5", "#fde2e4", "#fff3b0", "#e8e8e4", "#fae1dd", "#dfccfb"];

window.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');

    // Inicializar volumen a la mitad (0.5)
    if (song) song.volume = 0.5;
    
    if (volumeSlider && song) {
        volumeSlider.addEventListener('input', (e) => {
            song.volume = e.target.value;
        });
    }
});

function generateFloatingPhotos() {
    const area = document.getElementById('floating-area');
    if (!area) return;
    
    area.innerHTML = ""; 

    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        img.src = "./" + url; // Carga local relativa estricta
        img.alt = `Momento Greysi`;
        
        img.onerror = function() {
            this.parentElement.style.display = 'none';
        };
        
        photoDiv.appendChild(img);

        const columnas = 5; 
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 8);
        const topPercent = (index * 60) + (Math.random() * 15);

        const rotBase = (Math.random() * 20 - 10) + "deg"; 
        const rotOffset = (Math.random() * 10 - 5) + "deg";

        photoDiv.style.left = `${leftPercent}%`;
        photoDiv.style.top = `${topPercent}px`;
        photoDiv.style.setProperty('--rot-base', rotBase);
        photoDiv.style.setProperty('--rot-offset', rotOffset);
        photoDiv.style.zIndex = index + 1;

        const duration = 4 + Math.random() * 3; 
        photoDiv.style.animation = `floatUpAndDown ${duration}s ease-in-out infinite`;

        area.appendChild(photoDiv);
    });
}

// 🌸 Genera la cortina infinita de tulipanes flotando de fondo en la Ventana 4
function createDigitalGarden() {
    const garden = document.getElementById('flower-garden');
    if (!garden) return;

    garden.innerHTML = ""; 

    const cantidadTulipanes = 25;

    for (let i = 0; i < cantidadTulipanes; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('digital-flower');

        const leftPos = Math.random() * 95;
        tulip.style.left = `${leftPos}%`;

        const fallDuration = 6 + Math.random() * 5;
        const swayDuration = 3 + Math.random() * 2;
        const swayDistance = (20 + Math.random() * 30) + "px";

        const rotMin = (Math.random() * -30 - 10) + "deg"; 
        const rotMax = (Math.random() * 30 + 10) + "deg";

        const colorElegido = coloresTulipanes[Math.floor(Math.random() * coloresTulipanes.length)];

        tulip.innerHTML = `
            <div class="tulip-head" style="--tulip-color: ${colorElegido};"></div>
            <div class="flower-stem"></div>
        `;
        
        tulip.style.setProperty('--fall-duration', `${fallDuration}s`);
        tulip.style.setProperty('--sway-duration', `${swayDuration}s`);
        tulip.style.setProperty('--sway-distance', swayDistance);
        tulip.style.setProperty('--rot-min', rotMin);
        tulip.style.setProperty('--rot-max', rotMax);

        tulip.style.animationDelay = `${Math.random() * -10}s`;

        garden.appendChild(tulip);
    }
}

// ❓ Función para validar la respuesta del Quiz
function checkAnswer(isCorrect) {
    const quizBlock = document.getElementById('quiz-block');
    const messageBlock = document.getElementById('message-block');
    const errorText = document.getElementById('quiz-error');

    if (isCorrect) {
        // Si acierta, ocultamos el error y la pregunta, y revelamos la hermosa carta larga
        if (errorText) errorText.classList.add('hidden');
        
        if (quizBlock) {
            quizBlock.style.transition = "opacity 0.4s ease";
            quizBlock.style.opacity = "0";
            setTimeout(() => quizBlock.classList.add('hidden'), 400);
        }

        setTimeout(() => {
            if (messageBlock) {
                messageBlock.classList.remove('hidden');
                messageBlock.style.opacity = "0";
                messageBlock.style.transition = "opacity 0.6s ease";
                setTimeout(() => messageBlock.style.opacity = "1", 50);
            }
        }, 450);

    } else {
        // Si se equivoca, mostramos el aviso tierno de advertencia
        if (errorText) errorText.classList.remove('hidden');
    }
}

function goToWindow(windowNumber) {
    // Ocultar la ventana actual
    const currentWindow = document.querySelector('.window.active');
    if (currentWindow) {
        currentWindow.classList.remove('active');
        currentWindow.classList.add('hidden');
    }

    // Mostrar la ventana seleccionada
    const nextWindow = document.getElementById(`window-${windowNumber}`);
    if (nextWindow) {
        nextWindow.classList.remove('hidden');
        nextWindow.classList.add('active');
    }

    // Al ingresar a la ventana de fotos (Ventana 2)
    if (windowNumber === 2) {
        const song = document.getElementById('birthday-song');
        const volumeContainer = document.getElementById('volume-container');

        if (volumeContainer) {
            volumeContainer.classList.remove('hidden');
        }
        generateFloatingPhotos();

        if (song) {
            song.play().catch(error => {
                console.log("Audio listo:", error);
            });
        }
    }
    
    // Al pasar a la Ventana 3 (Aseguramos restablecer los bloques por si acaso)
    if (windowNumber === 3) {
        const quizBlock = document.getElementById('quiz-block');
        const messageBlock = document.getElementById('message-block');
        const errorText = document.getElementById('quiz-error');

        if (quizBlock) {
            quizBlock.classList.remove('hidden');
            quizBlock.style.opacity = "1";
        }
        if (messageBlock) messageBlock.classList.add('hidden');
        if (errorText) errorText.classList.add('hidden');
    }

    // Al pasar a la despedida final (Ventana 4)
    if (windowNumber === 4) {
        const volumeContainer = document.getElementById('volume-container');
        if (volumeContainer) {
            volumeContainer.classList.add('hidden');
        }
        
        // Iniciar la cortina infinita de tulipanes al viento en pantalla completa
        createDigitalGarden();
    }
}
