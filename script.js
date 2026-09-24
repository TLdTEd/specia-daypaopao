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

    // Si pasamos a la ventana 2 (la galería), activamos la canción
    if (windowNumber === 2) {
        const song = document.getElementById('birthday-song');
        // El navegador permite play() porque el usuario hizo clic en el botón
        song.play().catch(error => {
            console.log("La autoreproducción fue bloqueada o el archivo no existe aún:", error);
        });
    }
}
