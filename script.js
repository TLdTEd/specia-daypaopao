// Lista manual con tus 39 imágenes y 5 GIFs en formato local estricto
const misFotos = [
    "./img1.jpg", "./img2.jpg", "./img3.jpg", "./img4.jpg", "./img5.jpg",
    "./img6.jpg", "./img7.jpg", "./img8.jpg", "./img9.jpg", "./img10.jpg",
    "./img11.jpg", "./img12.jpg", "./img13.jpg", "./img14.jpg", "./img15.jpg",
    "./img16.jpg", "./img17.jpg", "./img18.jpg", "./img19.jpg", "./img20.jpg",
    "./img21.jpg", "./img22.jpg", "./img23.jpg", "./img24.jpg", "./img25.jpg",
    "./img26.jpg", "./img27.jpg", "./img28.jpg", "./img29.jpg", "./img30.jpg",
    "./img31.jpg", "./img32.jpg", "./img33.jpg", "./img34.jpg", "./img35.jpg",
    "./img36.jpg", "./img37.jpg", "./img38.jpg", "./img39.jpg",
    "./gif1.gif", "./gif2.gif", "./gif3.gif", "./gif4.gif", "./gif5.gif"
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
    
    // NOTA: Si hiciste la prueba anterior de comentar esta línea, 
    // DESCOMENTALA quitando las barras para que funcione correctamente:
    area.innerHTML = ""; 

    // Mezclamos el orden para que queden distribuidos al azar
    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        img.src = url;
        img.alt = `Momento Greysi`;
        
        // Si una imagen falla por no estar lista, se oculta limpiamente sin romper el script
        img.onerror = function() {
            this.parentElement.style.display = 'none';
        };
        
        photoDiv.appendChild(img);

        // Distribución inteligente en base al índice
        const columnas = 5; 
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 8);
        
        // Espaciado en píxeles hacia abajo para evitar colapsos
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
        
        // Ejecutar el creador de fotos
        generateFloatingPhotos();

        if (song) {
            song.play().catch(error => {
                console.log("El audio requiere interacción o el archivo falta:", error);
            });
        }
    }
}
