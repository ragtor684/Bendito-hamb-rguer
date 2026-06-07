document.addEventListener('DOMContentLoaded', () => {
    
    // --- Sticky Header ---
    const header = document.querySelector('.header');
    const handleScroll = () => {
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
    
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        mobileMenu.classList.toggle('active');
        document.body.classList.toggle('no-scroll');
    };

    const closeMenu = () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
    };

    menuToggle.addEventListener('click', toggleMenu);
    
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
    const lightboxImg = lightbox.querySelector('.lightbox-img');
    const lightboxTitle = lightbox.querySelector('.lightbox-title');
    const lightboxDesc = lightbox.querySelector('.lightbox-desc');
    const lightboxClose = lightbox.querySelector('.lightbox-close');
    const lightboxPrev = lightbox.querySelector('.lightbox-prev');
    const lightboxNext = lightbox.querySelector('.lightbox-next');
    
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
        currentIdx = index;
        const item = galleryData[currentIdx];
        
        lightboxImg.src = item.src;
        lightboxImg.alt = item.title;
        lightboxTitle.textContent = item.title;
        lightboxDesc.textContent = item.desc;
        
        lightbox.classList.add('active');
        lightbox.setAttribute('aria-hidden', 'false');
        document.body.classList.add('no-scroll');
    };

    const closeLightbox = () => {
        lightbox.classList.remove('active');
        lightbox.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('no-scroll');
        
        // Reset src to prevent flashing previous image on next open
        setTimeout(() => {
            lightboxImg.src = '';
        }, 300);
    };

    const showNext = (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx + 1) % galleryData.length;
        openLightbox(currentIdx);
    };

    const showPrev = (e) => {
        e.stopPropagation();
        currentIdx = (currentIdx - 1 + galleryData.length) % galleryData.length;
        openLightbox(currentIdx);
    };

    // Attach listeners to gallery items
    galleryItems.forEach(item => {
        item.addEventListener('click', () => {
            const index = parseInt(item.getAttribute('data-index'), 10);
            openLightbox(index);
        });
    });

    // Control listeners
    lightboxClose.addEventListener('click', closeLightbox);
    lightboxNext.addEventListener('click', showNext);
    lightboxPrev.addEventListener('click', showPrev);

    // Close lightbox on click outside the image
    lightbox.addEventListener('click', (e) => {
        if (e.target === lightbox || e.target === lightbox.querySelector('.lightbox-content-wrapper')) {
            closeLightbox();
        }
    });

    // Keyboard controls
    document.addEventListener('keydown', (e) => {
        if (!lightbox.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            closeLightbox();
        } else if (e.key === 'ArrowRight') {
            currentIdx = (currentIdx + 1) % galleryData.length;
            openLightbox(currentIdx);
        } else if (e.key === 'ArrowLeft') {
            currentIdx = (currentIdx - 1 + galleryData.length) % galleryData.length;
            openLightbox(currentIdx);
        }
    });

    // --- Monte sua Bandeja Logic ---
    const addTrayButtons = document.querySelectorAll('.btn-add-tray');
    const trayItemsList = document.getElementById('tray-items-list');
    const trayCountSpan = document.getElementById('tray-count');
    const trayPlaceholder = document.getElementById('tray-placeholder-msg');
    
    let itemCount = 0;
    
    const updateTrayPlaceholder = () => {
        if (itemCount === 0) {
            if (!document.getElementById('tray-placeholder-msg')) {
                trayItemsList.appendChild(trayPlaceholder);
            }
        } else {
            const placeholderInDom = document.getElementById('tray-placeholder-msg');
            if (placeholderInDom) {
                placeholderInDom.remove();
            }
        }
    };
    
    addTrayButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            const card = button.closest('.tray-product-card');
            const id = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const emoji = card.getAttribute('data-emoji');
            
            // Create mini item
            const itemMini = document.createElement('div');
            itemMini.className = 'tray-item-mini';
            itemMini.innerHTML = `
                <span class="tray-item-mini-emoji">${emoji}</span>
                <span class="tray-item-mini-name">${name}</span>
                <button class="tray-item-mini-remove" aria-label="Remover">&times;</button>
            `;
            
            // Add remove listener
            itemMini.querySelector('.tray-item-mini-remove').addEventListener('click', () => {
                itemMini.remove();
                itemCount--;
                trayCountSpan.textContent = itemCount;
                updateTrayPlaceholder();
            });
            
            // Increment
            itemCount++;
            trayCountSpan.textContent = itemCount;
            updateTrayPlaceholder();
            
            // Append
            trayItemsList.appendChild(itemMini);
            
            // Add subtle click scale animation to button
            button.style.transform = 'scale(0.85)';
            setTimeout(() => {
                button.style.transform = '';
            }, 150);
        });
    });
});
