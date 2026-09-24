// ⚠️ REEMPLAZA ESTOS DOS DATOS CON TU CONFIGURACIÓN REAL DE GITHUB
const MIN_USER_GITHUB = "TU_USUARIO"; 
const MI_REPO_GITHUB = "TU_REPOSITORIO";

const BASE_URL = `https://githubusercontent.com{MIN_USER_GITHUB}/${MI_REPO_GITHUB}/main/`;

// Generación automática de la lista de tus 44 archivos
const misFotos = [];

// Añadir imágenes (img1.jpg a img39.jpg)
for (let i = 1; i <= 39; i++) {
    misFotos.push(`${BASE_URL}img${i}.jpg`);
}

// Añadir GIFs (gif1.gif a gif5.gif)
for (let i = 1; i <= 5; i++) {
    misFotos.push(`${BASE_URL}gif${i}.gif`);
}

window.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');

    // Inicializar volumen a la mitad
    song.volume = 0.5;
    volumeSlider.addEventListener('input', (e) => {
        song.volume = e.target.value;
    });
});

function generateFloatingPhotos() {
    const area = document.getElementById('floating-area');
    area.innerHTML = "";

    // Mezclamos el orden para que queden distribuidos fotos y gifs al azar
    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Momento Greysi`;
        
        // Si una imagen falla por no estar en GitHub, se oculta limpiamente
        img.onerror = function() {
            this.parentElement.style.display = 'none';
        };
        
        photoDiv.appendChild(img);

        // Distribución en rejilla horizontal aleatoria inteligente
        const columnas = 6; 
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 6);
        
        // Dispersión vertical progresiva para que requiera deslizar (scrollear) el contenedor
        const topPercent = (index * 4.5) + (Math.random() * 8);

        // Ángulos de inclinación estilo fotos impresas sueltas
        const rotBase = (Math.random() * 22 - 11) + "deg"; 
        const rotOffset = (Math.random() * 12 - 6) + "deg";

        photoDiv.style.left = `${leftPercent}%`;
        photoDiv.style.top = `${topPercent}px`;
        photoDiv.style.setProperty('--rot-base', rotBase);
        photoDiv.style.setProperty('--rot-offset', rotOffset);
        photoDiv.style.zIndex = index + 1;

        // Ritmos de flotación distintos para dar un efecto natural asincrónico
        const duration = 5 + Math.random() * 3.5; 
        photoDiv.style.animation = `floatUpAndDown ${duration}s ease-in-out infinite`;

        area.appendChild(photoDiv);
    });
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

    // Al ingresar a la ventana de fotos (Ventana 2)
    if (windowNumber === 2) {
        const song = document.getElementById('birthday-song');
        const volumeContainer = document.getElementById('volume-container');

        volumeContainer.classList.remove('hidden');
        generateFloatingPhotos();

        song.play().catch(error => {
            console.log("Audio listo. Esperando interacción inicial en dispositivos móviles:", error);
        });
    }
}
