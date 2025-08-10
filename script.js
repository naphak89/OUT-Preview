// script.js for OUT! landing page
// Add any JavaScript functionality here, e.g., smooth scrolling for navigation links.

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation for navbar
    const navbar = document.querySelector('.navbar');
    
    if (navbar) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Add animation to elements when they come into view
    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('appear');
                }
            });
        },
        {
            threshold: 0.1
        }
    );
    
    document.querySelectorAll('.content-section, .hero-section').forEach(section => {
        observer.observe(section);
        section.classList.add('animate-on-scroll');
    });
    
    // Autoplay video when it comes into view
    const videoElement = document.getElementById('demo-video');
    
    if (videoElement) {
        // Add debugging
        videoElement.addEventListener('loadstart', () => console.log('Video: loadstart'));
        videoElement.addEventListener('loadeddata', () => console.log('Video: loadeddata'));
        videoElement.addEventListener('canplay', () => console.log('Video: canplay'));
        videoElement.addEventListener('playing', () => console.log('Video: playing'));
        videoElement.addEventListener('error', (e) => console.error('Video error:', e));
        
        // Try to load and play the video
        videoElement.load();
        
        // Try to play video immediately on load
        videoElement.play().catch(e => {
            console.log('Initial autoplay prevented:', e);
        });
        
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Try to play video when it comes into view
                        videoElement.play().catch(e => {
                            console.log('Intersection autoplay prevented:', e);
                            // Add play button if autoplay is prevented by browser
                            const videoContainer = entry.target.closest('.phone-mockup');
                            if (videoContainer && !videoContainer.querySelector('.play-button')) {
                                const playButton = document.createElement('button');
                                playButton.className = 'play-button';
                                playButton.innerHTML = '▶️';
                                playButton.style.cssText = `
                                    position: absolute;
                                    top: 50%;
                                    left: 50%;
                                    transform: translate(-50%, -50%);
                                    background: rgba(255, 107, 53, 0.9);
                                    border: none;
                                    border-radius: 50%;
                                    width: 60px;
                                    height: 60px;
                                    font-size: 24px;
                                    cursor: pointer;
                                    z-index: 10;
                                    transition: all 0.3s ease;
                                `;
                                playButton.addEventListener('click', () => {
                                    videoElement.play();
                                    playButton.style.display = 'none';
                                });
                                videoContainer.style.position = 'relative';
                                videoContainer.appendChild(playButton);
                            }
                        });
                    } else {
                        // Pause video when it's not visible
                        videoElement.pause();
                    }
                });
            },
            {
                threshold: 0.3 // Start playing when 30% of the video is visible
            }
        );
        
        videoObserver.observe(videoElement);
    }

    // Rotating hero text
    const phrases = [
        "grab dinner",
        "go to the beach",
        "watch a football game",
        "go clubbing"
    ];
    const rotatingText = document.getElementById('rotating-text');
    if (rotatingText) {
        let phraseIndex = 0;

        const switchPhrase = () => {
            // Add pop-out animation
            rotatingText.classList.add('rotate-pop-out');

            // After pop-out ends, change text and run pop-in
            setTimeout(() => {
                phraseIndex = (phraseIndex + 1) % phrases.length;
                rotatingText.textContent = phrases[phraseIndex];

                rotatingText.classList.remove('rotate-pop-out');
                void rotatingText.offsetWidth;
                rotatingText.classList.add('rotate-pop-in');

                setTimeout(() => rotatingText.classList.remove('rotate-pop-in'), 300);
            }, 150);
        };

        // Initial pop-in
        rotatingText.classList.add('rotate-pop-in');
        setTimeout(() => rotatingText.classList.remove('rotate-pop-in'), 400);

        // Start interval
        setInterval(switchPhrase, 1500);
    }

    // Performance: remove mousemove parallax and reactive background to avoid jank
}); 