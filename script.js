document.addEventListener('DOMContentLoaded', () => {
    



    // --- 1. Lógica de Bienvenida y Autoplay ---
    const welcomeOverlay = document.getElementById('welcome-overlay');
    const mainContent = document.getElementById('main-content');
    const openBtn = document.getElementById('open-invitation-btn');
    const audio = document.getElementById('bg-music');
    const musicBtn = document.getElementById('music-btn');
    const musicIcon = musicBtn.querySelector('i');
    let isPlaying = false;

    audio.volume = 0.6;

    openBtn.addEventListener('click', () => {
        // Ocultar pantalla de bienvenida
        welcomeOverlay.style.opacity = '0';
        
        // Mostrar invitación
        mainContent.style.opacity = '1';
        mainContent.style.pointerEvents = 'auto';
        mainContent.style.overflow = 'visible';
        mainContent.style.height = 'auto';

        // Iniciar música desde el segundo 16 (permitido porque el usuario hizo clic)
        audio.currentTime = 16;
        audio.play().then(() => {
            isPlaying = true;
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
        }).catch(err => console.log("No se pudo iniciar el audio automáticamente:", err));

        // Quitar overlay del DOM para que no estorbe
        setTimeout(() => {
            welcomeOverlay.style.display = 'none';
        }, 1000);
    });

    // --- 2. Botón de Música Flotante ---
    musicBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (isPlaying) {
            audio.pause();
            musicIcon.classList.remove('fa-pause');
            musicIcon.classList.add('fa-play');
        } else {
            audio.play();
            musicIcon.classList.remove('fa-play');
            musicIcon.classList.add('fa-pause');
        }
        isPlaying = !isPlaying;
    });


    // --- 3. Animaciones al hacer Scroll ---
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); // Solo animar una vez
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in').forEach(section => {
        observer.observe(section);
    });


    // --- 4. Cuenta Regresiva ---
    // Fecha del evento: 17 de mayo del año actual (o el siguiente si ya pasó)
    const now = new Date();
    let eventYear = now.getFullYear();
    let eventDate = new Date(`May 17, ${eventYear} 12:30:00`).getTime();

    // Si la fecha ya pasó este año, configurar para el próximo año (opcional, por si acaso)
    if (now.getTime() > eventDate) {
        eventYear += 1;
        eventDate = new Date(`May 17, ${eventYear} 12:30:00`).getTime();
    }

    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');

    const countdownInterval = setInterval(() => {
        const currentTime = new Date().getTime();
        const distance = eventDate - currentTime;

        if (distance < 0) {
            clearInterval(countdownInterval);
            daysEl.innerText = "00";
            hoursEl.innerText = "00";
            minutesEl.innerText = "00";
            secondsEl.innerText = "00";
            return;
        }

        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);

        daysEl.innerText = days < 10 ? "0" + days : days;
        hoursEl.innerText = hours < 10 ? "0" + hours : hours;
        minutesEl.innerText = minutes < 10 ? "0" + minutes : minutes;
        secondsEl.innerText = seconds < 10 ? "0" + seconds : seconds;
    }, 1000);


    // --- 5. Modal de Mesa de Regalos ---
    const modal = document.getElementById('gift-modal');
    const btn = document.getElementById('gift-modal-btn');
    const span = document.getElementsByClassName('close-modal')[0];

    btn.onclick = function() {
        modal.style.display = "block";
    }

    span.onclick = function() {
        modal.style.display = "none";
    }

    window.onclick = function(event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
    }
});
