// script.js
document.addEventListener('DOMContentLoaded', function() {
    // Mobile Navigation
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.nav-link').forEach(link => {
        link.addEventListener('click', () => {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });
    
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
    
    // Scroll to section function
    window.scrollToSection = function(sectionId) {
        const section = document.getElementById(sectionId);
        if (section) {
            section.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    };
    
    // Navbar background change on scroll
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.background = 'rgba(255, 255, 255, 0.98)';
            navbar.style.boxShadow = '0 2px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.background = 'rgba(255, 255, 255, 0.95)';
            navbar.style.boxShadow = 'none';
        }
    });
    
    // Portfolio tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabContents = document.querySelectorAll('.tab-content');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // Remove active class from all buttons and contents
            tabButtons.forEach(btn => btn.classList.remove('active'));
            tabContents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            this.classList.add('active');
            document.getElementById(tabId).classList.add('active');
        });
    });
    
    // Showcase filters
    const filterButtons = document.querySelectorAll('.filter-btn');
    const showcaseItems = document.querySelectorAll('.showcase-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            const filter = this.getAttribute('data-filter');
            
            // Remove active class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Filter items
            showcaseItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Modal functionality
    const modal = document.getElementById('buildingModal');
    const modalContent = document.getElementById('modalContent');
    const closeBtn = document.querySelector('.close');
    const viewDetailsBtns = document.querySelectorAll('.view-details-btn');
    
    // Building details data
    const buildingDetails = {
        'Guggenheim Bilbao': {
            architect: 'Frank Gehry',
            year: '1997',
            location: 'Bilbao, Spain',
            description: 'The Guggenheim Museum Bilbao is a groundbreaking example of contemporary architecture. Its titanium curves and innovative form transformed the city of Bilbao, demonstrating how architecture can revitalize an entire urban area.',
            techniques: 'CAD modeling, structural innovation, material experimentation',
            inspiration: 'The building\'s flowing forms were inspired by fish scales and ship hulls, reflecting Bilbao\'s maritime heritage.'
        },
        'Bosco Verticale': {
            architect: 'Stefano Boeri',
            year: '2014',
            location: 'Milan, Italy',
            description: 'The Vertical Forest towers are residential buildings that integrate thousands of plants and trees into their facades, creating a sustainable microclimate and improving air quality.',
            techniques: 'Green building systems, irrigation technology, biodiversity planning',
            inspiration: 'The concept reimagines urban living by bringing nature back into dense city centers.'
        },
        'Sydney Opera House': {
            architect: 'Jørn Utzon',
            year: '1973',
            location: 'Sydney, Australia',
            description: 'One of the most recognizable buildings in the world, the Sydney Opera House features sail-like shells that seem to float on the harbor.',
            techniques: 'Spherical geometry, precast concrete, innovative structural systems',
            inspiration: 'The design was inspired by sails, shells, and the natural forms of the harbor.'
        },
        'Fallingwater': {
            architect: 'Frank Lloyd Wright',
            year: '1939',
            location: 'Pennsylvania, USA',
            description: 'Perhaps Wright\'s most famous work, this house is built directly over a waterfall, seamlessly integrating architecture with nature.',
            techniques: 'Organic architecture, cantilever construction, natural material integration',
            inspiration: 'The design philosophy of harmony between human habitation and the natural world.'
        },
        'Burj Khalifa': {
            architect: 'Adrian Smith (SOM)',
            year: '2010',
            location: 'Dubai, UAE',
            description: 'The world\'s tallest building, reaching 828 meters, demonstrates engineering excellence and Islamic architectural influences.',
            techniques: 'High-strength concrete, wind engineering, vertical transportation systems',
            inspiration: 'The tower\'s design incorporates patterns from Islamic architecture, particularly the spiral minaret.'
        },
        'Gardens by the Bay': {
            architect: 'WilkinsonEyre',
            year: '2012',
            location: 'Singapore',
            description: 'This sustainable garden architecture features climate-controlled conservatories and innovative vertical gardens.',
            techniques: 'Environmental control systems, sustainable energy, biomimetic design',
            inspiration: 'The design mimics natural forms while showcasing sustainable urban solutions.'
        }
    };
    
    viewDetailsBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const buildingName = this.parentElement.querySelector('h3').textContent;
            const details = buildingDetails[buildingName];
            
            if (details) {
                modalContent.innerHTML = `
                    <h2>${buildingName}</h2>
                    <div class="building-info">
                        <p><strong>Architect:</strong> ${details.architect}</p>
                        <p><strong>Year:</strong> ${details.year}</p>
                        <p><strong>Location:</strong> ${details.location}</p>
                    </div>
                    <div class="building-description">
                        <h3>About this building</h3>
                        <p>${details.description}</p>
                    </div>
                    <div class="building-techniques">
                        <h3>Key Techniques</h3>
                        <p>${details.techniques}</p>
                    </div>
                    <div class="building-inspiration">
                        <h3>Design Inspiration</h3>
                        <p>${details.inspiration}</p>
                    </div>
                `;
                modal.style.display = 'block';
            }
        });
    });
    
    closeBtn.addEventListener('click', function() {
        modal.style.display = 'none';
    });
    
    window.addEventListener('click', function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    });
    
    // Animate on scroll (simple version)
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute('data-aos', 'fade-up');
                setTimeout(() => {
                    entry.target.classList.add('aos-animate');
                }, 100);
            }
        });
    }, observerOptions);
    
    // Observe elements for animation
    document.querySelectorAll('.basics-card, .profession-card, .guide-card, .skill-item, .portfolio-card, .interview-card, .showcase-item').forEach(el => {
        observer.observe(el);
    });
    
    // Add animation to building blocks
    const buildingBlocks = document.querySelectorAll('.building-block');
    buildingBlocks.forEach((block, index) => {
        block.style.animationDelay = `${index * 0.3}s`;
    });
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const heroVisual = document.querySelector('.hero-visual');
        if (heroVisual) {
            heroVisual.style.transform = `translateY(${scrolled * 0.5}px)`;
        }
    });
    
    // Add typing effect to hero title
    const heroTitle = document.querySelector('.hero-title');
    if (heroTitle) {
        const text = heroTitle.innerHTML;
        heroTitle.innerHTML = '';
        let i = 0;
        
        function typeWriter() {
            if (i < text.length) {
                heroTitle.innerHTML = text.slice(0, i + 1);
                i++;
                setTimeout(typeWriter, 50);
            }
        }
        
        // Start typing effect after page load
        setTimeout(typeWriter, 1000);
    }
    
    // Add interactive hover effects to cards
    document.querySelectorAll('.basics-card, .profession-card, .guide-card, .skill-item, .portfolio-card, .interview-card').forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px) scale(1.02)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0) scale(1)';
        });
    });
    
    // Add loading animation
    window.addEventListener('load', function() {
        document.body.classList.add('loaded');
    });
    
    // Counter animation for guide numbers
    const animateCounter = (element, target) => {
        let current = 0;
        const increment = target / 50;
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            element.textContent = Math.floor(current).toString().padStart(2, '0');
        }, 30);
    };
    
    // Trigger counter animation when guide cards are visible
    const guideNumbers = document.querySelectorAll('.guide-number');
    const counterObserver = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const number = parseInt(entry.target.textContent);
                animateCounter(entry.target, number);
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    guideNumbers.forEach(num => counterObserver.observe(num));
    
    console.log('Architecture Starter Platform loaded successfully! 🏗️');
});

// Additional CSS for modal content
const modalStyles = `
<style>
.building-info {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    gap: 20px;
    margin: 20px 0;
    padding: 20px;
    background: #f8fafc;
    border-radius: 10px;
}

.building-info p {
    margin: 0;
    font-size: 0.9rem;
}

.building-info strong {
    color: #2563eb;
    display: block;
    margin-bottom: 5px;
}

.building-description,
.building-techniques,
.building-inspiration {
    margin: 30px 0;
}

.building-description h3,
.building-techniques h3,
.building-inspiration h3 {
    color: #1f2937;
    margin-bottom: 15px;
    font-size: 1.3rem;
}

.modal-content {
    max-height: 80vh;
    overflow-y: auto;
}

.modal-content h2 {
    color: #1f2937;
    margin-bottom: 20px;
    font-size: 2rem;
}
</style>
`;

document.head.insertAdjacentHTML('beforeend', modalStyles);