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

// Funcionalidad para la presentación local
document.addEventListener('DOMContentLoaded', function() {
    const localSlider = document.querySelector('.local-presentation-slider');
    const localSlides = document.querySelectorAll('.local-presentation-slide');
    const localPrevBtn = document.querySelector('.local-presentation-prev');
    const localNextBtn = document.querySelector('.local-presentation-next');
    const localDots = document.querySelector('.local-presentation-dots');
    const currentSlideSpan = document.querySelector('.current-slide');
    const totalSlidesSpan = document.querySelector('.total-slides');
    
    let currentLocalSlide = 0;
    const totalLocalSlides = localSlides.length;
    
    // Crear puntos indicadores
    localSlides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('local-presentation-dot');
        if (index === 0) dot.classList.add('active');
        dot.addEventListener('click', () => goToLocalSlide(index));
        localDots.appendChild(dot);
    });
    
    // Actualizar contador
    totalSlidesSpan.textContent = totalLocalSlides;
    currentSlideSpan.textContent = currentLocalSlide + 1;
    
    // Función para ir a una diapositiva específica
    function goToLocalSlide(index) {
        currentLocalSlide = index;
        localSlider.style.transform = `translateX(-${currentLocalSlide * 100}%)`;
        updateLocalDots();
        updateLocalCounter();
    }
    
    // Actualizar puntos indicadores
    function updateLocalDots() {
        document.querySelectorAll('.local-presentation-dot').forEach((dot, index) => {
            dot.classList.toggle('active', index === currentLocalSlide);
        });
    }
    
    // Actualizar contador
    function updateLocalCounter() {
        currentSlideSpan.textContent = currentLocalSlide + 1;
    }
    
    // Eventos para los botones de navegación
    localPrevBtn.addEventListener('click', () => {
        currentLocalSlide = (currentLocalSlide - 1 + totalLocalSlides) % totalLocalSlides;
        goToLocalSlide(currentLocalSlide);
    });
    
    localNextBtn.addEventListener('click', () => {
        currentLocalSlide = (currentLocalSlide + 1) % totalLocalSlides;
        goToLocalSlide(currentLocalSlide);
    });
    
    // Auto-play para el carrusel local
    let localAutoplayInterval = setInterval(() => {
        currentLocalSlide = (currentLocalSlide + 1) % totalLocalSlides;
        goToLocalSlide(currentLocalSlide);
    }, 5000);
    
    // Pausar auto-play al hacer hover
    localSlider.addEventListener('mouseenter', () => {
        clearInterval(localAutoplayInterval);
    });
    
    localSlider.addEventListener('mouseleave', () => {
        localAutoplayInterval = setInterval(() => {
            currentLocalSlide = (currentLocalSlide + 1) % totalLocalSlides;
            goToLocalSlide(currentLocalSlide);
        }, 5000);
    });
    
    // Modal para vista detallada
    const modal = document.createElement('div');
    modal.classList.add('local-presentation-modal');
    const modalImg = document.createElement('img');
    const closeBtn = document.createElement('div');
    closeBtn.classList.add('local-presentation-modal-close');
    closeBtn.innerHTML = '<i class="fas fa-times"></i>';
    modal.appendChild(modalImg);
    modal.appendChild(closeBtn);
    document.body.appendChild(modal);
    
    // Abrir modal al hacer clic en una imagen
    localSlides.forEach(slide => {
        slide.addEventListener('click', () => {
            modalImg.src = slide.querySelector('img').src;
            modal.classList.add('active');
        });
    });
    
    // Cerrar modal
    closeBtn.addEventListener('click', () => {
        modal.classList.remove('active');
    });
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });
    
    // Cerrar modal con la tecla Escape
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            modal.classList.remove('active');
        }
    });
    
    // Navegación con teclado
    document.addEventListener('keydown', (e) => {
        if (modal.classList.contains('active')) {
            if (e.key === 'ArrowLeft') {
                currentLocalSlide = (currentLocalSlide - 1 + totalLocalSlides) % totalLocalSlides;
                goToLocalSlide(currentLocalSlide);
                modalImg.src = localSlides[currentLocalSlide].querySelector('img').src;
            } else if (e.key === 'ArrowRight') {
                currentLocalSlide = (currentLocalSlide + 1) % totalLocalSlides;
                goToLocalSlide(currentLocalSlide);
                modalImg.src = localSlides[currentLocalSlide].querySelector('img').src;
            }
        }
    });
}); 