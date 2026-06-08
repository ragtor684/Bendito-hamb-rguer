const {
    DESKTOP_BREAKPOINT,
    getToggledState,
    shouldCloseOnResize,
    applyMenuToggle,
    applyMenuClose
} = require('../src/menu');

describe('DESKTOP_BREAKPOINT', () => {
    it('should be 768', () => {
        expect(DESKTOP_BREAKPOINT).toBe(768);
    });
});

describe('getToggledState', () => {
    it('should return true when currently collapsed', () => {
        expect(getToggledState(false)).toBe(true);
    });

    it('should return false when currently expanded', () => {
        expect(getToggledState(true)).toBe(false);
    });
});

describe('shouldCloseOnResize', () => {
    it('should return true when window is wider than the breakpoint', () => {
        expect(shouldCloseOnResize(769)).toBe(true);
        expect(shouldCloseOnResize(1024)).toBe(true);
    });

    it('should return false when window equals the breakpoint', () => {
        expect(shouldCloseOnResize(768)).toBe(false);
    });

    it('should return false when window is narrower than the breakpoint', () => {
        expect(shouldCloseOnResize(767)).toBe(false);
        expect(shouldCloseOnResize(320)).toBe(false);
    });

    it('should respect a custom breakpoint', () => {
        expect(shouldCloseOnResize(1025, 1024)).toBe(true);
        expect(shouldCloseOnResize(1024, 1024)).toBe(false);
        expect(shouldCloseOnResize(1023, 1024)).toBe(false);
    });
});

describe('applyMenuToggle', () => {
    let menuToggle;
    let mobileMenu;
    let body;

    beforeEach(() => {
        menuToggle = document.createElement('button');
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu = document.createElement('div');
        body = document.createElement('div');
    });

    it('should expand the menu when currently collapsed', () => {
        applyMenuToggle(menuToggle, mobileMenu, body);

        expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
        expect(mobileMenu.classList.contains('active')).toBe(true);
        expect(body.classList.contains('no-scroll')).toBe(true);
    });

    it('should collapse the menu when currently expanded', () => {
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu.classList.add('active');
        body.classList.add('no-scroll');

        applyMenuToggle(menuToggle, mobileMenu, body);

        expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
        expect(mobileMenu.classList.contains('active')).toBe(false);
        expect(body.classList.contains('no-scroll')).toBe(false);
    });

    it('should handle null body gracefully', () => {
        expect(() => applyMenuToggle(menuToggle, mobileMenu, null)).not.toThrow();
        expect(menuToggle.getAttribute('aria-expanded')).toBe('true');
        expect(mobileMenu.classList.contains('active')).toBe(true);
    });

    it('should do nothing when menuToggle is null', () => {
        expect(() => applyMenuToggle(null, mobileMenu, body)).not.toThrow();
    });

    it('should do nothing when mobileMenu is null', () => {
        expect(() => applyMenuToggle(menuToggle, null, body)).not.toThrow();
    });
});

describe('applyMenuClose', () => {
    let menuToggle;
    let mobileMenu;
    let body;

    beforeEach(() => {
        menuToggle = document.createElement('button');
        menuToggle.setAttribute('aria-expanded', 'true');
        mobileMenu = document.createElement('div');
        mobileMenu.classList.add('active');
        body = document.createElement('div');
        body.classList.add('no-scroll');
    });

    it('should close the menu', () => {
        applyMenuClose(menuToggle, mobileMenu, body);

        expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
        expect(mobileMenu.classList.contains('active')).toBe(false);
        expect(body.classList.contains('no-scroll')).toBe(false);
    });

    it('should be idempotent (closing an already closed menu)', () => {
        menuToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        body.classList.remove('no-scroll');

        applyMenuClose(menuToggle, mobileMenu, body);

        expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
        expect(mobileMenu.classList.contains('active')).toBe(false);
        expect(body.classList.contains('no-scroll')).toBe(false);
    });

    it('should handle null body gracefully', () => {
        expect(() => applyMenuClose(menuToggle, mobileMenu, null)).not.toThrow();
        expect(menuToggle.getAttribute('aria-expanded')).toBe('false');
    });

    it('should do nothing when menuToggle is null', () => {
        expect(() => applyMenuClose(null, mobileMenu, body)).not.toThrow();
    });

    it('should do nothing when mobileMenu is null', () => {
        expect(() => applyMenuClose(menuToggle, null, body)).not.toThrow();
    });
});
