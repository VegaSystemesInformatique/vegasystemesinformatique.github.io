/**
 * SiteVega - Main Interactivity
 */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    });

    // 2. Mobile Menu Toggle
    const nav = document.querySelector('nav');
    const links = document.querySelector('.nav-links');
    
    const menuBtn = document.createElement('div');
    menuBtn.className = 'menu-btn';
    menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
    nav.appendChild(menuBtn);

    menuBtn.addEventListener('click', () => {
        links.classList.toggle('active');
        menuBtn.innerHTML = links.classList.contains('active') ? '<i class="fas fa-times"></i>' : '<i class="fas fa-bars"></i>';
    });

    // Close menu when clicking a link
    links.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            links.classList.remove('active');
            menuBtn.innerHTML = '<i class="fas fa-bars"></i>';
        });
    });

    // 3. Stats Counter Animation
    const stats = document.querySelectorAll('.stat-number');
    const animateStats = (stat) => {
        const target = +stat.getAttribute('data-target');
        const count = +stat.innerText;
        const speed = 2000 / target;

        if (count < target) {
            stat.innerText = Math.ceil(count + 1);
            setTimeout(() => animateStats(stat), speed);
        } else {
            stat.innerText = target;
        }
    };

    // Intersection Observer for stats
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateStats(entry.target);
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 1 });

    stats.forEach(stat => statsObserver.observe(stat));

    // 4. Form Handling (Mock)
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = contactForm.querySelector('button');
            const originalText = btn.innerText;
            btn.innerText = 'Envoi en cours...';
            btn.disabled = true;

            setTimeout(() => {
                alert('Merci ! Votre message a été envoyé avec succès.');
                contactForm.reset();
                btn.innerText = originalText;
                btn.disabled = false;
            }, 1500);
    // 5. Back to Top Logic
    const backToTop = document.getElementById('backToTop');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 500) {
                backToTop.style.display = 'flex';
            } else {
                backToTop.style.display = 'none';
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }

    // 6. Language Switcher (Mock)
    const langLinks = document.querySelectorAll('.lang-switcher a');
    langLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            alert('Changement de langue vers : ' + link.innerText);
        });
    });
});
