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

// 🌸 Genera la cortina infinita de tulipanes flotando de fondo
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

// ✨ Interacción Mágica: Siembra un tulipán en las coordenadas exactas de la pantalla
function spawnInteractiveTulip(x, y) {
    const garden = document.getElementById('flower-garden');
    if (!garden) return;

    const interactiveTulip = document.createElement('div');
    interactiveTulip.classList.add('clicked-flower');

    // Ubicamos la base de la flor centrada en el punto de contacto
    interactiveTulip.style.left = `${x - 11}px`; 
    interactiveTulip.style.top = `${y - 30}px`;

    // Efectos de viento únicos para esta flor táctil
    const swayDistance = (15 + Math.random() * 20) + "px";
    const rotMin = (Math.random() * -20 - 5) + "deg";
    const rotMax = (Math.random() * 20 + 5) + "deg";
    const colorElegido = coloresTulipanes[Math.floor(Math.random() * coloresTulipanes.length)];

    interactiveTulip.innerHTML = `
        <div class="tulip-head" style="--tulip-color: ${colorElegido};"></div>
        <div class="flower-stem" style="height: 35px;"></div>
    `;

    interactiveTulip.style.setProperty('--sway-distance', swayDistance);
    interactiveTulip.style.setProperty('--rot-min', rotMin);
    interactiveTulip.style.setProperty('--rot-max', rotMax);

    garden.appendChild(interactiveTulip);

    // Borramos el elemento después de que su animación de ascenso termine
    setTimeout(() => {
        interactiveTulip.remove();
    }, 4000);
}

function setupInputListeners() {
    const window3 = document.getElementById('window-3');
    if (!window3) return;

    // 🖥️ Capturar clics en Computadora
    window3.addEventListener('click', (e) => {
        // Si hace clic dentro del mensaje de texto blanco, no creamos flores
        if (e.target.closest('.card')) return;
        
        spawnInteractiveTulip(e.clientX, e.clientY);
    });

    // 📱 Capturar toques en Celular (Verificado)
    window3.addEventListener('touchstart', (e) => {
        if (e.target.closest('.card')) return;

        // Leemos el primer dedo en tocar la pantalla de forma estricta
        if (e.touches && e.touches.length > 0) {
            const touch = e.touches[0];
            
            // Usamos el cliente nativo de coordenadas del dispositivo
            spawnInteractiveTulip(touch.clientX, touch.clientY);
        }
    }, { passive: true }); // Optimiza el rendimiento táctil en celulares
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
        
        // Iniciar lluvia de fondo
        createDigitalGarden();
        
        // Activar escuchas táctiles sin errores
        setupInputListeners();
    }
}
