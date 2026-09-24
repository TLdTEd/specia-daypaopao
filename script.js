function generateFloatingPhotos() {
    const area = document.getElementById('floating-area');
    // area.innerHTML = ""; //

    // Mezclamos el orden para que queden distribuidos fotos y gifs al azar
    const fotosMezcladas = [...misFotos].sort(() => Math.random() - 0.5);

    fotosMezcladas.forEach((url, index) => {
        const photoDiv = document.createElement('div');
        photoDiv.classList.add('floating-photo');

        const img = document.createElement('img');
        
        // Forzamos la ruta relativa estricta (./archivo.jpg)
        img.src = "./" + url;
        img.alt = `Momento Greysi`;
        
        // Mensaje de diagnóstico en la consola del navegador por si algo falla
        img.onerror = function() {
            console.log("No se pudo cargar el archivo en la ruta: " + this.src);
            this.parentElement.style.display = 'none';
        };
        
        photoDiv.appendChild(img);

        // Distribución en rejilla horizontal aleatoria inteligente
        const columnas = 6; 
        const colIdx = index % columnas;
        const leftPercent = (colIdx * (100 / columnas)) + (Math.random() * 6);
        
        // Dispersión vertical progresiva para que requiera deslizar (scrollear) el contenedor
        const topPercent = (index * 45) + (Math.random() * 8);

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
