/**
 * Integration tests for index.js — loads the script in a jsdom
 * environment with the minimal HTML structure it expects and
 * verifies DOM-level behaviour.
 *
 * @jest-environment jsdom
 */

const fs = require('fs');
const path = require('path');

const indexJS = fs.readFileSync(
    path.resolve(__dirname, '..', 'index.js'),
    'utf8'
);

function buildDOM() {
    document.body.innerHTML = `
        <header class="header"></header>

        <button class="menu-toggle" aria-expanded="false" aria-controls="primary-nav" aria-label="Abrir Menu">
            <span class="hamburger"></span>
        </button>

        <div class="mobile-menu" id="primary-nav">
            <ul class="mobile-nav-list">
                <li><a href="#quem-somos" class="mobile-nav-link">Quem Somos</a></li>
                <li><a href="#destaques" class="mobile-nav-link">Destaques</a></li>
            </ul>
        </div>

        <div class="scroll-reveal">Content A</div>
        <div class="scroll-reveal">Content B</div>

        <div class="gallery-item" data-index="0"></div>
        <div class="gallery-item" data-index="1"></div>

        <div id="gallery-lightbox" aria-hidden="true">
            <div class="lightbox-content-wrapper">
                <img class="lightbox-img" src="" alt="">
                <h3 class="lightbox-title"></h3>
                <p class="lightbox-desc"></p>
                <button class="lightbox-close"></button>
                <button class="lightbox-prev"></button>
                <button class="lightbox-next"></button>
            </div>
        </div>
    `;
}

function loadScript() {
    const script = new Function(indexJS);
    script();
}

function fireDOMContentLoaded() {
    const event = new Event('DOMContentLoaded');
    document.dispatchEvent(event);
}

describe('index.js integration', () => {
    beforeEach(() => {
        buildDOM();
        // Stub IntersectionObserver
        window.IntersectionObserver = jest.fn(function (cb) {
            this.observe = jest.fn();
            this.unobserve = jest.fn();
            this.disconnect = jest.fn();
        });
        loadScript();
        fireDOMContentLoaded();
    });

    afterEach(() => {
        document.body.innerHTML = '';
        jest.restoreAllMocks();
    });

    // ---------- Sticky Header ----------

    describe('Sticky header', () => {
        it('should add "scrolled" class when scrollY > 20', () => {
            const header = document.querySelector('.header');

            Object.defineProperty(window, 'scrollY', { value: 50, writable: true });
            window.dispatchEvent(new Event('scroll'));

            expect(header.classList.contains('scrolled')).toBe(true);
        });

        it('should remove "scrolled" class when scrollY <= 20', () => {
            const header = document.querySelector('.header');
            header.classList.add('scrolled');

            Object.defineProperty(window, 'scrollY', { value: 10, writable: true });
            window.dispatchEvent(new Event('scroll'));

            expect(header.classList.contains('scrolled')).toBe(false);
        });
    });

    // ---------- Mobile Menu ----------

    describe('Mobile menu', () => {
        it('should toggle the mobile menu on button click', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');

            menuToggle.click();

            expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
            expect(mobileMenu.classList.contains('active')).toBe(true);
        });

        it('should close the mobile menu on second click', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');

            menuToggle.click();
            menuToggle.click();

            expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
            expect(mobileMenu.classList.contains('active')).toBe(false);
        });

        it('should close the menu when a mobile nav link is clicked', () => {
            const menuToggle = document.querySelector('.menu-toggle');
            const mobileMenu = document.querySelector('.mobile-menu');
            const link = document.querySelector('.mobile-nav-link');

            menuToggle.click(); // open first
            link.click();

            expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
            expect(mobileMenu.classList.contains('active')).toBe(false);
        });
    });

    // ---------- Gallery Lightbox ----------

    describe('Gallery lightbox', () => {
        it('should open the lightbox when a gallery item is clicked', () => {
            const lightbox = document.getElementById('gallery-lightbox');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');

            galleryItem.click();

            expect(lightbox.classList.contains('active')).toBe(true);
            expect(lightbox.getAttribute('aria-hidden')).toBe('false');
        });

        it('should populate lightbox with correct data', () => {
            const lightboxTitle = document.querySelector('.lightbox-title');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');

            galleryItem.click();

            expect(lightboxTitle.textContent).toBe('Cardápio: Hambúrgueres Clássicos');
        });

        it('should close the lightbox on close button click', () => {
            const lightbox = document.getElementById('gallery-lightbox');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');
            const closeBtn = document.querySelector('.lightbox-close');

            galleryItem.click();
            closeBtn.click();

            expect(lightbox.classList.contains('active')).toBe(false);
            expect(lightbox.getAttribute('aria-hidden')).toBe('true');
        });

        it('should navigate to the next item', () => {
            const lightboxTitle = document.querySelector('.lightbox-title');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');
            const nextBtn = document.querySelector('.lightbox-next');

            galleryItem.click();
            nextBtn.click();

            expect(lightboxTitle.textContent).toBe('Cardápio: Lanches Tradicionais');
        });

        it('should navigate to the previous item (wrap around)', () => {
            const lightboxTitle = document.querySelector('.lightbox-title');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');
            const prevBtn = document.querySelector('.lightbox-prev');

            galleryItem.click();
            prevBtn.click();

            expect(lightboxTitle.textContent).toBe('Cardápio: Cervejas, Chopp & Batidas');
        });

        it('should close lightbox on Escape key', () => {
            const lightbox = document.getElementById('gallery-lightbox');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');

            galleryItem.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));

            expect(lightbox.classList.contains('active')).toBe(false);
        });

        it('should navigate forward on ArrowRight key', () => {
            const lightboxTitle = document.querySelector('.lightbox-title');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');

            galleryItem.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

            expect(lightboxTitle.textContent).toBe('Cardápio: Lanches Tradicionais');
        });

        it('should navigate backward on ArrowLeft key', () => {
            const lightboxTitle = document.querySelector('.lightbox-title');
            const galleryItem = document.querySelector('.gallery-item[data-index="0"]');

            galleryItem.click();
            document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

            expect(lightboxTitle.textContent).toBe('Cardápio: Cervejas, Chopp & Batidas');
        });
    });

    // ---------- Scroll Reveal (IntersectionObserver stub) ----------

    describe('Scroll reveal', () => {
        it('should observe all .scroll-reveal elements', () => {
            const instances = window.IntersectionObserver.mock.instances;
            expect(instances.length).toBeGreaterThanOrEqual(1);
            const observer = instances[instances.length - 1];
            expect(observer.observe).toHaveBeenCalledTimes(2);
        });

        it('should fall back to adding "revealed" when IntersectionObserver is missing', () => {
            // Re-set DOM without IntersectionObserver
            delete window.IntersectionObserver;
            buildDOM();
            loadScript();
            fireDOMContentLoaded();

            const reveals = document.querySelectorAll('.scroll-reveal');
            reveals.forEach((el) => {
                expect(el.classList.contains('revealed')).toBe(true);
            });
        });
    });
});
