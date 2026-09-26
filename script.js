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

    // Mezclamos el orden para que queden distribuidos al azar
    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        img.src = "./" + url; // Carga local relativa estricta
        img.alt = `Momento Greysi`;
        
        // Si una imagen falla por no estar lista, se oculta limpiamente sin romper el script
        img.onerror = function() {
            this.parentElement.style.display = 'none';
        };
        
        photoDiv.appendChild(img);

        // Distribución en rejilla horizontal aleatoria inteligente
        const columnas = 5; 
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 8);
        
        // Espaciado dinámico en píxeles hacia abajo para poder scrollear
        const topPercent = (index * 60) + (Math.random() * 15);

        // Ángulos de inclinación estilo Polaroid
        const rotBase = (Math.random() * 20 - 10) + "deg"; 
        const rotOffset = (Math.random() * 10 - 5) + "deg";

        photoDiv.style.left = `${leftPercent}%`;
        photoDiv.style.top = `${topPercent}px`;
        photoDiv.style.setProperty('--rot-base', rotBase);
        photoDiv.style.setProperty('--rot-offset', rotOffset);
        photoDiv.style.zIndex = index + 1;

        // Ritmos de flotación distintos
        const duration = 4 + Math.random() * 3; 
        photoDiv.style.animation = `floatUpAndDown ${duration}s ease-in-out infinite`;

        area.appendChild(photoDiv);
    });
}

// Función para sembrar tulipanes de manera aleatoria en el fondo
function createDigitalGarden() {
    const garden = document.getElementById('flower-garden');
    if (!garden) return;

    garden.innerHTML = ""; 

    // Crearemos unos 20 tulipanes para rellenar bien la parte baja
    const cantidadTulipanes = 20;

    // Paleta de tulipanes pastel (Rosas, amarillos, lilas, naranjas suaves y crema)
    const coloresTulipanes = ["#ffb3c6", "#ffcad4", "#ffe5ec", "#ffccd5", "#fde2e4", "#fff3b0", "#e8e8e4", "#fae1dd", "#dfccfb"];

    for (let i = 0; i < cantidadTulipanes; i++) {
        const tulip = document.createElement('div');
        tulip.classList.add('digital-flower');

        // Posición horizontal distribuida por la pantalla con un toque de azar
        const leftPos = (i * (100 / cantidadTulipanes)) + (Math.random() * 2);
        tulip.style.left = `${leftPos}%`;

        // Altura orgánica de los tallos (entre 70px y 210px)
        const stemHeight = 70 + Math.random() * 140;
        
        // Elegir color al azar de la paleta
        const colorElegido = coloresTulipanes[Math.floor(Math.random() * coloresTulipanes.length)];

        // ORDEN NATURAL: Inyectamos primero la cabeza (arriba) y luego el tallo (abajo)
        tulip.innerHTML = `
            <div class="tulip-head" style="--tulip-color: ${colorElegido};"></div>
            <div class="flower-stem" style="--stem-height: ${stemHeight}px;"></div>
        `;
        
        // Ritmos de nacimiento desfasados para que broten uno por uno suavemente
        tulip.style.animationDelay = `${Math.random() * 2.2}s`;

        garden.appendChild(tulip);
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
        
        // Cargar las fotos y GIFs flotantes
        generateFloatingPhotos();

        // Reproducir cancion.mp3 de manera segura gracias al clic de "PaoPao"
        if (song) {
            song.play().catch(error => {
                console.log("No se pudo iniciar el audio:", error);
            });
        }
    }
    
    // Al pasar a la despedida (Ventana 3)
    if (windowNumber === 3) {
        const volumeContainer = document.getElementById('volume-container');
        if (volumeContainer) {
            volumeContainer.classList.add('hidden');
        }

        // Activar el campo de tulipanes digitales derecho
        createDigitalGarden();
    }
}
