// Page Transition Manager
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    setTimeout(() => {
        document.body.style.transition = 'opacity 0.5s ease';
        document.body.style.opacity = '1';
    }, 100);
});

// Smooth Scroll Behavior
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if(target) {
            window.scrollTo({
                top: target.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});
// Navigation function for Start button
function navigateToArtworks(e) {
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'services.html';
    }, 500);
}

// Ensure all external links work
document.querySelectorAll('.social-icons a').forEach(link => {
    link.addEventListener('click', (e) => {
        e.stopPropagation();
        window.open(link.href, '_blank');
    });
});

// Intersection Observer
const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('animate-in');
        }
    });
}, { threshold: 0.1, rootMargin: '0px' });

document.querySelectorAll('.animate-on-scroll').forEach(element => {
    element.classList.add('opacity-0');
    observer.observe(element);
});

// Mobile Menu
document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if(window.innerWidth <= 995) {
            e.preventDefault();
            toggleMenu(); // Close the menu
        }
    });
});

// Toggle Menu Function
function toggleMenu() {
    menuOpen = !menuOpen;
    nav.classList.toggle('active');
    menuIcon.classList.toggle('fa-times');
    document.body.classList.toggle('no-scroll');
    menuBackdrop.classList.toggle('active');
}

// Event Listeners
menuIcon?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

menuBackdrop?.addEventListener('click', (e) => {
    e.stopPropagation();
    toggleMenu();
});

document.querySelectorAll('nav a').forEach(link => {
    link.addEventListener('click', (e) => {
        if(window.innerWidth <= 995) {
            e.preventDefault();
            toggleMenu();
            
            // Handle navigation after animation
            setTimeout(() => {
                window.location.href = link.href;
            }, 300);
        }
    });
});

// Page Transitions
document.querySelectorAll('a').forEach(link => {
    if (link.href.includes(window.location.origin) && !link.hash) {
        link.addEventListener('click', (e) => {
            if(!link.classList.contains('no-transition')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            }
        });
    }
});

// 3D Hover Effects
document.querySelectorAll('.art-item, .design-item').forEach(item => {
    item.addEventListener('mousemove', (e) => {
        const rect = item.getBoundingClientRect();
        item.style.transform = `
            perspective(1000px)
            rotateX(${(e.clientY - rect.top - rect.height/2) / 10}deg)
            rotateY(${-(e.clientX - rect.left - rect.width/2) / 10}deg)
        `;
    });

    item.addEventListener('mouseleave', () => {
        item.style.transform = 'perspective(1000px) rotateX(0) rotateY(0)';
    });
});


// scripts.js (updated image handler)
function handleImageClick(e) {
    if (window.innerWidth <= 768) {
        // Mobile handling (keep existing zoom animation)
        // ... (your existing mobile code) ...
    } else {
        // Desktop - show actual size
        e.preventDefault();
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('expandedImage');
        
        // Load image first to get natural dimensions
        const tempImg = new Image();
        tempImg.src = this.src;
        
        tempImg.onload = () => {
            modalImg.src = this.src;
            modal.style.display = 'flex';
            
            // Reset any forced dimensions
            modalImg.style.width = 'auto';
            modalImg.style.height = 'auto';
            
            // Optional: Add dimensions to alt text
            modalImg.alt = `${this.alt} (${tempImg.naturalWidth}×${tempImg.naturalHeight})`;
            
            // Center if smaller than viewport
            if (tempImg.naturalWidth < window.innerWidth && 
                tempImg.naturalHeight < window.innerHeight) {
                modalImg.style.margin = 'auto';
            }
        };
    }
}
// scripts.js (additional logic)
tempImg.onload = () => {
    // ... previous code ...
    
    // If image exceeds viewport dimensions
    if (tempImg.naturalWidth > window.innerWidth || 
        tempImg.naturalHeight > window.innerHeight) {
        console.log('Image exceeds viewport - using native scrolling');
    }
};
// Add this new function
function navigateToArtworks(e) {
    e.preventDefault();
    document.body.style.opacity = '0';
    setTimeout(() => {
        window.location.href = 'services.html';
    }, 500);
}

// Modify existing page transition code to exclude the Start button
document.querySelectorAll('a').forEach(link => {
    if (link.href.includes(window.location.origin) && 
        !link.hash && 
        !link.classList.contains('btn')) { // Add this exclusion
        link.addEventListener('click', (e) => {
            if(!link.classList.contains('no-transition')) {
                e.preventDefault();
                document.body.style.opacity = '0';
                setTimeout(() => {
                    window.location.href = link.href;
                }, 500);
            }
        });
    }
});

// Image Modal
const modal = document.getElementById('imageModal');
const modalImg = document.getElementById('expandedImage');
const closeModal = document.getElementById('closeModal');

document.querySelectorAll('.art-image').forEach(img => {
    img.addEventListener('click', (e) => {
        modal.style.display = 'flex';
        modalImg.src = e.target.src;
        modalImg.style.margin = 'auto'; // Center the image
    });
});

closeModal.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (e) => {
    if (e.target === modal) {
        modal.style.display = 'none';
    }
});

.modal {
    display: none;
    position: fixed;
    z-index: 1000;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    background-color: rgba(0, 0, 0, 0.9);
    display: flex;
    justify-content: center;
    align-items: center;
    opacity: 0;
    transition: opacity 0.5s ease;
}

.modal.show {
    display: flex;
    opacity: 1;
}

.modal-content {
    max-width: 90%;
    max-height: 90%;
    object-fit: contain;
    margin: auto;
    display: block;
}