// Mobile Menu Toggle
const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle) {
    menuToggle.addEventListener('click', () => {
        navMenu.classList.toggle('active');
        menuToggle.classList.toggle('active');
    });
}

// Close mobile menu when clicking on a link
const navLinks = document.querySelectorAll('.nav-menu a');
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Smooth scroll for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const navHeight = document.querySelector('.navbar').offsetHeight + 60; // Account for waveform
            const targetPosition = target.offsetTop - navHeight;
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

// Interactive Terminal Widget
const terminalBody = document.getElementById('terminal-body');
if (terminalBody) {
    const terminalCommands = [
        { type: 'prompt', text: 'utkarsh@kali:~$', delay: 500 },
        { type: 'command', text: 'whoami', delay: 1000 },
        { type: 'output', text: 'utkarsh-walchale', delay: 800 },
        { type: 'prompt', text: 'utkarsh@kali:~$', delay: 1000 },
        { type: 'command', text: 'cat skills.txt', delay: 1000 },
        { type: 'output', text: 'pentesting | malware-analysis | siem | threat-hunting', delay: 1200 },
        { type: 'prompt', text: 'utkarsh@kali:~$', delay: 1500 },
        { type: 'command', text: 'curl -v https://linkedin.com/in/utkarsh', delay: 1000 },
        { type: 'output', text: 'HTTP/2 200\n< authenticating... >', delay: 2000 }
    ];

    let currentCommandIndex = 0;

    function typeText(element, text, speed = 30) {
        return new Promise((resolve) => {
            let index = 0;
            const interval = setInterval(() => {
                element.textContent += text[index];
                index++;
                if (index >= text.length) {
                    clearInterval(interval);
                    resolve();
                }
            }, speed);
        });
    }

    function createLine(type, text) {
        const line = document.createElement('div');
        line.className = 'terminal-line';

        switch(type) {
            case 'prompt':
                line.innerHTML = `<span class="terminal-prompt">${text}</span><span class="terminal-cursor"></span>`;
                break;
            case 'command':
                line.innerHTML = `<span class="terminal-command">${text}</span><span class="terminal-cursor"></span>`;
                break;
            case 'output':
                line.innerHTML = `<span class="terminal-output">${text}</span>`;
                break;
        }

        terminalBody.appendChild(line);

        // Scroll terminal to bottom
        terminalBody.scrollTop = terminalBody.scrollHeight;

        // Remove cursor from previous line
        const previousLine = line.previousElementSibling;
        if (previousLine) {
            const prevCursor = previousLine.querySelector('.terminal-cursor');
            if (prevCursor) prevCursor.remove();
        }
    }

    async function executeCommands() {
        for (const cmd of terminalCommands) {
            await new Promise(resolve => setTimeout(resolve, cmd.delay));
            createLine(cmd.type, cmd.text);
        }

        // Keep blinking cursor
        const lastLine = terminalBody.lastElementChild;
        if (lastLine) {
            const cursor = lastLine.querySelector('.terminal-cursor');
            if (cursor) {
                setInterval(() => {
                    cursor.style.opacity = cursor.style.opacity === '1' ? '0' : '1';
                }, 530);
            }
        }
    }

    // Start terminal animation after page load
    setTimeout(() => {
        executeCommands();
    }, 1000);

    // Restart terminal on hover
    terminalBody.addEventListener('mouseenter', () => {
        terminalBody.innerHTML = '';
        currentCommandIndex = 0;
        executeCommands();
    });
}

// Biometric Waveform Animation
const waveformBars = document.querySelectorAll('.waveform-bar');
const waveformContainer = document.querySelector('.waveform-container');

if (waveformBars.length > 0) {
    function animateWaveform() {
        const scrollPosition = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrollPosition / maxScroll;

        waveformBars.forEach((bar, index) => {
            const baseHeight = parseFloat(bar.getAttribute('height'));
            const variation = Math.sin(scrollPosition * 0.01 + index * 0.5) * 5;
            const newHeight = Math.max(2, baseHeight + variation);
            bar.setAttribute('height', newHeight);
            bar.setAttribute('y', 20 - newHeight);
        });

        requestAnimationFrame(animateWaveform);
    }

    animateWaveform();

    // Add scroll-based color change
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercent = scrolled / maxScroll;

        waveformBars.forEach((bar, index) => {
            const opacity = 0.4 + (scrollPercent * 0.6);
            bar.style.opacity = opacity;
        });
    });
}

// Navbar scroll effect
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 0 30px rgba(0, 255, 255, 0.3)';
    } else {
        navbar.style.boxShadow = 'none';
    }
    
    lastScroll = currentScroll;
});

// Active navigation link highlighting
const sections = document.querySelectorAll('section[id]');

function highlightActiveSection() {
    const scrollY = window.pageYOffset;
    
    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 200; // Account for nav + waveform
        const sectionId = section.getAttribute('id');
        
        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLinks.forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightActiveSection);

// Intersection Observer for fade-in animations
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

// Observe all sections for animations
sections.forEach(section => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
});

// Project cards animation
const projectCards = document.querySelectorAll('.project-card');
projectCards.forEach((card, index) => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(card);
});

// Skill tags hover effect
const skillTags = document.querySelectorAll('.skill-tag');
skillTags.forEach(tag => {
    tag.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-4px) scale(1.05)';
    });
    
    tag.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Contact links animation
const contactLinks = document.querySelectorAll('.contact-link');
contactLinks.forEach((link, index) => {
    link.style.opacity = '0';
    link.style.transform = 'translateY(20px)';
    link.style.transition = `opacity 0.6s ease ${index * 0.1}s, transform 0.6s ease ${index * 0.1}s`;
    observer.observe(link);
});

// Copy command functionality
function copyCommand(button) {
    const pocCommand = button.previousElementSibling;
    if (pocCommand.tagName === 'CODE') {
        const text = pocCommand.textContent;
        navigator.clipboard.writeText(text).then(() => {
            button.textContent = 'copied!';
            button.style.background = '#50c878';
            setTimeout(() => {
                button.textContent = 'copy';
                button.style.background = '';
            }, 2000);
        }).catch(err => {
            console.error('Failed to copy: ', err);
            button.textContent = 'error';
            setTimeout(() => {
                button.textContent = 'copy';
            }, 2000);
        });
    }
}

// Make copyCommand globally available
window.copyCommand = copyCommand;

// Toggle collapsible sections
function toggleCollapsible(header) {
    const content = header.nextElementSibling;
    const toggle = header.querySelector('.collapsible-toggle');
    
    if (content && toggle) {
        content.classList.toggle('active');
        toggle.classList.toggle('active');
    }
}

window.toggleCollapsible = toggleCollapsible;

// Keyboard Navigation
let currentFocusIndex = 0;
const focusableElements = document.querySelectorAll('a, button, input, textarea, select, [tabindex]:not([tabindex="-1"])');

document.addEventListener('keydown', (e) => {
    // Only handle keyboard navigation when not typing in input/textarea
    if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') {
        return;
    }

    // Tab navigation
    if (e.key === 'Tab') {
        e.preventDefault();
        currentFocusIndex = (currentFocusIndex + 1) % focusableElements.length;
        focusableElements[currentFocusIndex].focus();
    }

    // Escape to close mobile menu
    if (e.key === 'Escape' && navMenu.classList.contains('active')) {
        navMenu.classList.remove('active');
        menuToggle.classList.remove('active');
    }

    // Arrow key navigation for sections
    if (e.key === 'ArrowDown' || e.key === 'ArrowUp') {
        const currentSection = Array.from(sections).find(section => {
            const rect = section.getBoundingClientRect();
            return rect.top >= 0 && rect.bottom <= window.innerHeight;
        });

        if (currentSection) {
            const currentIndex = Array.from(sections).indexOf(currentSection);
            let targetIndex;

            if (e.key === 'ArrowDown') {
                targetIndex = Math.min(currentIndex + 1, sections.length - 1);
            } else {
                targetIndex = Math.max(currentIndex - 1, 0);
            }

            sections[targetIndex].scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    }
});

// Initialize focus on first element
document.addEventListener('DOMContentLoaded', () => {
    // Sort focusable elements by their position in DOM
    const sortedElements = Array.from(focusableElements).sort((a, b) => {
        return a.getBoundingClientRect().top - b.getBoundingClientRect().top;
    });

    // Set initial focus
    if (sortedElements.length > 0) {
        currentFocusIndex = 0;
    }
});

// Initialize on page load
document.addEventListener('DOMContentLoaded', () => {
    // Trigger initial animations
    setTimeout(() => {
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom > 0) {
                section.style.opacity = '1';
                section.style.transform = 'translateY(0)';
            }
        });
    }, 100);
});

// Performance: Debounce scroll events
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Apply debounce to expensive scroll handlers
window.addEventListener('scroll', debounce(() => {
    highlightActiveSection();
}, 10));

// Smooth page load
window.addEventListener('load', () => {
    document.body.style.opacity = '1';
    document.body.style.transition = 'opacity 0.3s ease';
});

// Error handling for terminal
window.addEventListener('error', (e) => {
    console.error('Error:', e.error);
});
