// Esperar a que la página cargue por completo para configurar el volumen
window.addEventListener('DOMContentLoaded', () => {
    const song = document.getElementById('birthday-song');
    const volumeSlider = document.getElementById('volume-slider');

    // Establecer volumen inicial al 50%
    song.volume = 0.5;

    // Escuchar el movimiento del deslizador de volumen
    volumeSlider.addEventListener('input', (e) => {
        song.volume = e.target.value;
    });
});

function goToWindow(windowNumber) {
    // Buscar la ventana activa actual y ocultarla
    const currentWindow = document.querySelector('.window.active');
    if (currentWindow) {
        currentWindow.classList.remove('active');
        currentWindow.classList.add('hidden');
    }

    // Activar la nueva ventana
    const nextWindow = document.getElementById(`window-${windowNumber}`);
    if (nextWindow) {
        nextWindow.classList.remove('hidden');
        nextWindow.classList.add('active');
    }

    // Si pasamos a la ventana 2 (la galería)
    if (windowNumber === 2) {
        const song = document.getElementById('birthday-song');
        const volumeContainer = document.getElementById('volume-container');

        // Mostrar el control flotante de volumen
        volumeContainer.classList.remove('hidden');

        // Reproducir la canción
        song.play().catch(error => {
            console.log("La autoreproducción fue bloqueada o el archivo no existe aún:", error);
        });
    }
}
