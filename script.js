document.addEventListener('DOMContentLoaded', () => {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');

    hamburger.addEventListener('click', () => {
        navLinks.classList.toggle('active');
        hamburger.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic en un enlace
    document.querySelectorAll('.nav-links a').forEach(link => {
        link.addEventListener('click', () => {
            navLinks.classList.remove('active');
            hamburger.classList.remove('active');
        });
    });
});

// Funcionalidad del carrusel de imágenes
document.addEventListener('DOMContentLoaded', function() {
    const slider = document.querySelector('.gallery-slider');
    const slides = document.querySelectorAll('.gallery-slide');
    const prevButton = document.querySelector('.gallery-prev');
    const nextButton = document.querySelector('.gallery-next');
    
    let currentSlide = 0;
    const slideCount = slides.length;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }

    function nextSlide() {
        currentSlide = (currentSlide + 1) % slideCount;
        updateSlider();
    }

    function prevSlide() {
        currentSlide = (currentSlide - 1 + slideCount) % slideCount;
        updateSlider();
    }

    // Event listeners para los botones
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Cambio automático de slides cada 5 segundos
    setInterval(nextSlide, 5000);
});

document.addEventListener('DOMContentLoaded', function() {
    // Carrusel de anuncios
    const announcementsSlider = document.querySelector('.announcements-slider');
    const announcementSlides = document.querySelectorAll('.announcement-slide');
    const prevButton = document.querySelector('.announcements-prev');
    const nextButton = document.querySelector('.announcements-next');
    
    let currentSlide = 0;
    const slideWidth = announcementSlides[0].offsetWidth + 32; // Ancho + gap

    function updateSlider() {
        announcementsSlider.style.transform = `translateX(-${currentSlide * slideWidth}px)`;
        
        // Actualizar estado de los botones
        prevButton.style.opacity = currentSlide === 0 ? '0.5' : '1';
        nextButton.style.opacity = currentSlide === announcementSlides.length - 1 ? '0.5' : '1';
    }

    function nextSlide() {
        if (currentSlide < announcementSlides.length - 1) {
            currentSlide++;
            updateSlider();
        }
    }

    function prevSlide() {
        if (currentSlide > 0) {
            currentSlide--;
            updateSlider();
        }
    }

    // Event listeners para los botones
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Auto-play
    let autoPlayInterval = setInterval(nextSlide, 5000);

    // Pausar auto-play al hover
    announcementsSlider.addEventListener('mouseenter', () => {
        clearInterval(autoPlayInterval);
    });

    announcementsSlider.addEventListener('mouseleave', () => {
        autoPlayInterval = setInterval(nextSlide, 5000);
    });

    // Inicializar estado de los botones
    updateSlider();

    // Animaciones al hacer scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observar elementos para animación
    document.querySelectorAll('.announcement-slide').forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
        observer.observe(slide);
    });

    // Carrusel de presentación
    const presentationSlider = document.querySelector('.presentation-slider');
    const presentationSlides = document.querySelectorAll('.presentation-slide');
    const presentationPrev = document.querySelector('.presentation-prev');
    const presentationNext = document.querySelector('.presentation-next');
    const presentationDots = document.querySelector('.presentation-dots');
    
    let currentPresentationSlide = 0;
    const presentationSlideWidth = presentationSlides[0].offsetWidth + 32;

    // Crear indicadores de puntos
    presentationSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('presentation-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToSlide(index));
        presentationDots.appendChild(dot);
    });

    function updatePresentationSlider() {
        presentationSlider.style.transform = `translateX(-${currentPresentationSlide * presentationSlideWidth}px)`;
        
        // Actualizar estado de los botones
        presentationPrev.style.opacity = currentPresentationSlide === 0 ? '0.5' : '1';
        presentationNext.style.opacity = currentPresentationSlide === presentationSlides.length - 1 ? '0.5' : '1';
        
        // Actualizar puntos
        document.querySelectorAll('.presentation-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentPresentationSlide);
        });
    }

    function nextPresentationSlide() {
        if (currentPresentationSlide < presentationSlides.length - 1) {
            currentPresentationSlide++;
            updatePresentationSlider();
        }
    }

    function prevPresentationSlide() {
        if (currentPresentationSlide > 0) {
            currentPresentationSlide--;
            updatePresentationSlider();
        }
    }

    function goToSlide(index) {
        currentPresentationSlide = index;
        updatePresentationSlider();
    }

    // Event listeners para los botones de presentación
    presentationNext.addEventListener('click', nextPresentationSlide);
    presentationPrev.addEventListener('click', prevPresentationSlide);

    // Auto-play para presentación
    let presentationAutoPlayInterval = setInterval(nextPresentationSlide, 6000);

    // Pausar auto-play al hover
    presentationSlider.addEventListener('mouseenter', () => {
        clearInterval(presentationAutoPlayInterval);
    });

    presentationSlider.addEventListener('mouseleave', () => {
        presentationAutoPlayInterval = setInterval(nextPresentationSlide, 6000);
    });

    // Inicializar estado de los botones de presentación
    updatePresentationSlider();

    // Animaciones para los slides de presentación
    document.querySelectorAll('.presentation-slide').forEach(slide => {
        slide.style.opacity = '0';
        slide.style.transform = 'translateY(20px)';
        observer.observe(slide);
    });
}); 