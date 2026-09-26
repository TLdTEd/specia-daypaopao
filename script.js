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

window.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');

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
        img.src = "./" + url;
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

// 🌸 Función para generar una lluvia infinita y natural de tulipanes cayendo
function createDigitalGarden() {
    const garden = document.getElementById('flower-garden');
    if (!garden) return;

    garden.innerHTML = ""; 

    // Lanzaremos 25 tulipanes con configuraciones completamente distintas
    const cantidadTulipanes = 25;
    const coloresTulipanes = ["#ffb3c6", "#ffcad4", "#ffe5ec", "#ffccd5", "#fde2e4", "#fff3b0", "#e8e8e4", "#fae1dd", "#dfccfb"];

    for (let i = 0; i < cantidadTulipanes; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('digital-flower');

        // Dispersión horizontal completa en toda la pantalla (0% a 95%)
        const leftPos = Math.random() * 95;
        tulip.style.left = `${leftPos}%`;

        // Parámetros de caída (Tiempos lentos y estéticos: entre 6 y 11 segundos por ciclo)
        const fallDuration = 6 + Math.random() * 5;
        // Tiempos de balanceo lateral por viento (entre 3 y 5 segundos)
        const swayDuration = 3 + Math.random() * 2;
        // Distancia que recorre de izquierda a derecha al balancearse (entre 20px y 50px)
        const swayDistance = (20 + Math.random() * 30) + "px";

        // Ángulos de rotación orgánicos para que simulen dar vueltas flotando
        const rotMin = (Math.random() * -30 - 10) + "deg"; // entre -10 y -40 grados
        const rotMax = (Math.random() * 30 + 10) + "deg";  // entre 10 y 40 grados

        const colorElegido = coloresTulipanes[Math.floor(Math.random() * coloresTulipanes.length)];

        // Inyectamos cabeza y un tallo flotante
        tulip.innerHTML = `
            <div class="tulip-head" style="--tulip-color: ${colorElegido};"></div>
            <div class="flower-stem"></div>
        `;
        
        // Asignamos las variables personalizadas al CSS de este tulipán específico
        tulip.style.setProperty('--fall-duration', `${fallDuration}s`);
        tulip.style.setProperty('--sway-duration', `${swayDuration}s`);
        tulip.style.setProperty('--sway-distance', swayDistance);
        tulip.style.setProperty('--rot-min', rotMin);
        tulip.style.setProperty('--rot-max', rotMax);

        // Desfases de inicio para que no caigan todos al mismo tiempo en el primer segundo
        tulip.style.animationDelay = `${Math.random() * -10}s`; // Negativo para que ya estén cayendo al abrir

        garden.appendChild(tulip);
    }
}

function goToWindow(windowNumber) {
    const currentWindow = document.querySelector('.window.active');
    if (currentWindow) {
        currentWindow.classList.remove('active');
        currentWindow.classList.add('hidden');
    }

    const nextWindow = document.getElementById(`window-${windowNumber}`);
    if (nextWindow) {
        nextWindow.classList.remove('hidden');
        nextWindow.classList.add('active');
    }

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
    
    if (windowNumber === 3) {
        const volumeContainer = document.getElementById('volume-container');
        if (volumeContainer) {
            volumeContainer.classList.add('hidden');
        }
        // Iniciar lluvia tridimensional de tulipanes pastel
        createDigitalGarden();
    }
}
