// ⚠️ Reemplaza TU_USUARIO y TU_REPOSITORIO con tus datos reales de GitHub
const BASE_URL = "https://githubusercontent.com";

// Lista automática con tus 39 imágenes y 5 GIFs
const misFotos = [];

// Agregar las imágenes (img1 a img39) - Asumiendo que son formato .jpg o .png (cambiar si es necesario)
for (let i = 1; i <= 39; i++) {
    misFotos.push(`${BASE_URL}img${i}.jpg`); 
}

// Agregar los GIFs (gif1 a gif5)
for (let i = 1; i <= 5; i++) {
    misFotos.push(`${BASE_URL}gif${i}.gif`);
}

window.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');

    song.volume = 0.5;
    volumeSlider.addEventListener('input', (e) => {
        song.volume = e.target.value;
    });
});

function generateFloatingPhotos() {
    const area = document.getElementById('floating-area');
    area.innerHTML = "";

    // Mezclar el orden para que las fotos y GIFs salgan revueltos
    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Momento Greysi`;
        
        // Evita que la página se rompa si alguna imagen aún no sube a GitHub
        img.onerror = function() {
            this.parentElement.style.display = 'none'; 
        };
        
        photoDiv.appendChild(img);

        // Distribución inteligente para evitar que se encimen todas en un solo lugar
        const columnas = 8; // Dividimos la pantalla virtualmente en columnas
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 6);
        const topPercent = 5 + (Math.random() * 75); // Rango vertical amplio

        // Rotaciones casuales para estilo Polaroid suelto
        const rotBase = (Math.random() * 20 - 10) + "deg"; 
        const rotOffset = (Math.random() * 12 - 6) + "deg";

        // Estilos de posición y animación
        photoDiv.style.left = `${leftPercent}%`;
        photoDiv.style.top = `${topPercent}%`;
        photoDiv.style.setProperty('--rot-base', rotBase);
        photoDiv.style.setProperty('--rot-offset', rotOffset);
        photoDiv.style.zIndex = index + 1;

        // Velocidades de flotación variadas para que se vea orgánico
        const duration = 5 + Math.random() * 4; 
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

    if (windowNumber === 2) {
        const song = document.getElementById('birthday-song');
        const volumeContainer = document.getElementById('volume-container');

        volumeContainer.classList.remove('hidden');
        generateFloatingPhotos();

        song.play().catch(error => {
            console.log("Audio en espera de interacción:", error);
        });
    }
}
