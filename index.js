document.addEventListener('DOMContentLoaded', () => {

    // --- Shared Utilities ---
    const setScrollLock = (locked) => {
        document.body.classList.toggle('no-scroll', locked);
    };

    const wrapIndex = (index, length) => ((index % length) + length) % length;

    // --- Sticky Header ---
    const header = document.querySelector('.header');
    if (!header) {
        console.error('Critical element missing: .header not found in DOM');
    }
    const handleScroll = () => {
        if (!header) return;
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Check on load

    // --- Mobile Menu Toggle ---
    const menuToggle = document.querySelector('.menu-toggle');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-nav-link');
    
    if (!menuToggle || !mobileMenu) {
        console.error('Mobile menu elements missing: .menu-toggle or .mobile-menu not found in DOM');
    }

    const toggleMenu = () => {
        if (!menuToggle || !mobileMenu) return;
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        setScrollLock(!isExpanded);
    };

    const closeMenu = () => {
        if (!menuToggle || !mobileMenu) return;
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        setScrollLock(false);
    };

    if (menuToggle) {
        menuToggle.addEventListener('click', toggleMenu);
    }
    
    mobileLinks.forEach(link => {
        link.addEventListener('click', closeMenu);
    });

    // Close mobile menu if resized to desktop dimensions
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            closeMenu();
        }
    });

    // --- Scroll Reveal Animation ---
    const revealElements = document.querySelectorAll('.scroll-reveal');
    
    if ('IntersectionObserver' in window) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('revealed');
                    observer.unobserve(entry.target); // Animates once
                }
            });
        }, {
            root: null,
            threshold: 0.1,
            rootMargin: '0px 0px -50px 0px'
        });

        revealElements.forEach(element => {
            revealObserver.observe(element);
        });
    } else {
        // Fallback for older browsers
        revealElements.forEach(element => {
            element.classList.add('revealed');
        });
    }

    // --- Interactive Gallery Lightbox ---
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('gallery-lightbox');

    if (!lightbox) {
        console.error('Lightbox element missing: #gallery-lightbox not found in DOM');
    }

    const lightboxImg = lightbox ? lightbox.querySelector('.lightbox-img') : null;
    const lightboxTitle = lightbox ? lightbox.querySelector('.lightbox-title') : null;
    const lightboxDesc = lightbox ? lightbox.querySelector('.lightbox-desc') : null;
    const lightboxClose = lightbox ? lightbox.querySelector('.lightbox-close') : null;
    const lightboxPrev = lightbox ? lightbox.querySelector('.lightbox-prev') : null;
    const lightboxNext = lightbox ? lightbox.querySelector('.lightbox-next') : null;

    if (lightbox && (!lightboxImg || !lightboxTitle || !lightboxDesc || !lightboxClose || !lightboxPrev || !lightboxNext)) {
        console.error('Lightbox is incomplete: one or more child elements (.lightbox-img, .lightbox-title, .lightbox-desc, .lightbox-close, .lightbox-prev, .lightbox-next) not found');
    }
    
    // Gallery Data matching HTML structure
    const galleryData = [
        {
            src: 'imagens/image (2).png',
            title: 'Cardápio: Hambúrgueres Clássicos',
            desc: 'Conheça nossos clássicos como X-Burguer, X-Portuguesa, Hambúrguer Simples, Bauru e Misto Quente, disponíveis nas linhas Tradicional, Premium e Picanha.'
        },
        {
            src: 'imagens/image (5).png',
            title: 'Cardápio: Lanches Tradicionais',
            desc: 'Opções tradicionais de lanches no pão artesanal: X-Mignon, X-Galinha, X-Coração, X-Bacon, X-Egg Especial, X-Egg simples, X-Especial e X-Salada.'
        },
        {
            src: 'imagens/image (6).png',
            title: 'Cardápio: Linha X-Bendito Especial',
            desc: 'Nossos lanches da linha premium gigante: X-Bendito Especial (frango, coração, calabresa, bacon, mignon, ovo, salsicha, fritas), X-Bendito tradicional e X-Mignon Especial.'
        },
        {
            src: 'imagens/image (7).png',
            title: 'Cardápio: Gourmet Especiais & Adicionais',
            desc: 'Burgers Especiais como Bacon, Duplo, Tsunami (cebola caramelizada), Bomba de Cheddar, Ciclone (cebola crispy), Tornado (abacaxi com geléia de pimenta), Gourmet Doce (Morango com Nutella) e lista de adicionais.'
        },
        {
            src: 'imagens/image (1).png',
            title: 'Cardápio: Gourmet & Big Torradas',
            desc: 'Ingredientes e preços das nossas famosas Big Torradas (Frango, Nutella, Mignon) e a linha Gourmet (Burguer, Salada, Cebola).'
        },
        {
            src: 'imagens/image (9).png',
            title: 'Cardápio: Opções da Casa',
            desc: 'Lanches diferenciados como X-Vegetariano (com palmito), X-Cebolitos, X-Calabresa, X-Cowboy (com 3 hambúrgueres e salsicha) e X-Dog completo.'
        },
        {
            src: 'imagens/image (8).png',
            title: 'Cardápio: Porções & Acompanhamentos',
            desc: 'Preços das porções completas da casa: Fritas com queijo/cheddar, Picadão completo, Polenta, Aipim frito, Calabresa acebolada, Isca de Peixe, Mignon, Alcatra, Frango e Coração.'
        },
        {
            src: 'imagens/image (3).png',
            title: 'Cardápio: Sucos & Refrigerantes',
            desc: 'Sucos naturais, refrigerantes, águas, copos de gelo e opções não alcoólicas da casa para acompanhar seu lanche.'
        },
        {
            src: 'imagens/image (4).png',
            title: 'Cardápio: Cervejas, Chopp & Batidas',
            desc: 'Confira nossa carta de cervejas e chopp (Heineken, Brahma, Skol, Original, Budweiser) e batidas artesanais (Morango, Maracujá, Vinho).'
        }
    ];

    let currentIdx = 0;

    const openLightbox = (index) => {
        if (!lightbox || !lightboxImg || !lightboxTitle || !lightboxDesc) {
            console.error('Cannot open lightbox: required elements are missing');
            return;
        }

        if (index < 0 || index >= galleryData.length || Number.isNaN(index)) {
            console.error('Invalid gallery index:', index);
            return;
        }

        currentIdx = index;
        const item = galleryData[currentIdx];
        
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
        
        lightboxImg.onerror = () => {
            console.error('Failed to load lightbox image:', item.src);
            lightboxImg.alt = 'Imagem indisponível';
        };

        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        setScrollLock(true);
    };

    const closeLightbox = () => {
        if (!lightbox || !lightboxImg) return;
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        setScrollLock(false);
        
        // Reset src to prevent flashing previous image on next open
        setTimeout(() => {
            if (lightboxImg) lightboxImg.src = '';
        }, 300);
    };

    const navigateGallery = (direction, e) => {
        if (e) e.stopPropagation();
        currentIdx = wrapIndex(currentIdx + direction, galleryData.length);
        openLightbox(currentIdx);
    };

    // Attach listeners to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const rawIndex = item.getAttribute('data-index');
            if (rawIndex === null) {
                console.error('Gallery item is missing data-index attribute:', item);
                return;
            }
            const index = parseInt(rawIndex, 10);
            if (Number.isNaN(index)) {
                console.error('Gallery item has invalid data-index value:', rawIndex);
                return;
            }
            openLightbox(index);
        });
    });

    // Control listeners (only attach if elements exist)
    if (lightboxClose) {
        lightboxClose.addEventListener('click', closeLightbox);
    }
    if (lightboxNext) {
        lightboxNext.addEventListener('click', (e) => navigateGallery(1, e));
    }
    if (lightboxPrev) {
        lightboxPrev.addEventListener('click', (e) => navigateGallery(-1, e));
    }

    // Close lightbox on click outside the image
    if (lightbox) {
        lightbox.addEventListener('click', (e) => {
            if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content-wrapper')) {
                closeLightbox();
            }
        });
    }

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox || !lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            navigateGallery(1);
        } else if (e.key === 'ArrowLeft') {
            navigateGallery(-1);
        }
    });
    
});
