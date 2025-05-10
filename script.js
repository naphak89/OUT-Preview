// script.js for OUT! landing page
// Add any JavaScript functionality here, e.g., smooth scrolling for navigation links.

document.addEventListener('DOMContentLoaded', function() {
    // Add scroll animation for navbar
    const navbar = document.querySelector('.navbar');
    
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
    
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
        const videoObserver = new IntersectionObserver(
            (entries) => {
                entries.forEach(entry => {
                    if (entry.isIntersecting) {
                        // Wait a short moment to start playing for better UX
                        setTimeout(() => {
                            videoElement.play().catch(e => {
                                console.log('Autoplay prevented:', e);
                                // Add play button if autoplay is prevented by browser
                                const videoContainer = entry.target.closest('.video-container');
                                if (videoContainer && !videoContainer.querySelector('.play-button')) {
                                    const playButton = document.createElement('button');
                                    playButton.className = 'play-button';
                                    playButton.innerHTML = '<i class="fas fa-play"></i>';
                                    playButton.addEventListener('click', () => videoElement.play());
                                    videoContainer.appendChild(playButton);
                                }
                            });
                        }, 300);
                    } else {
                        videoElement.pause();
                    }
                });
            },
            {
                threshold: 0.6 // Start playing when 60% of the video is visible
            }
        );
        
        videoObserver.observe(videoElement);
    }
}); 