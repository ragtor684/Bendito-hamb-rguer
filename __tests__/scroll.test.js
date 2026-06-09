const {
    DEFAULT_SCROLL_THRESHOLD,
    shouldAddScrolledClass,
    applyScrollState
} = require('../src/scroll');

describe('DEFAULT_SCROLL_THRESHOLD', () => {
    it('should be 20', () => {
        expect(DEFAULT_SCROLL_THRESHOLD).toBe(20);
    });
});

describe('shouldAddScrolledClass', () => {
    it('should return false when scrollY is 0', () => {
        expect(shouldAddScrolledClass(0)).toBe(false);
    });

    it('should return false when scrollY equals the threshold', () => {
        expect(shouldAddScrolledClass(20)).toBe(false);
    });

    it('should return true when scrollY exceeds the default threshold', () => {
        expect(shouldAddScrolledClass(21)).toBe(true);
        expect(shouldAddScrolledClass(100)).toBe(true);
    });

    it('should respect a custom threshold', () => {
        expect(shouldAddScrolledClass(50, 100)).toBe(false);
        expect(shouldAddScrolledClass(100, 100)).toBe(false);
        expect(shouldAddScrolledClass(101, 100)).toBe(true);
    });

    it('should return true for any positive scroll with threshold 0', () => {
        expect(shouldAddScrolledClass(1, 0)).toBe(true);
        expect(shouldAddScrolledClass(0, 0)).toBe(false);
    });
});

describe('applyScrollState', () => {
    let element;

    beforeEach(() => {
        element = document.createElement('header');
    });

    it('should add "scrolled" class when past threshold', () => {
        applyScrollState(element, 50);
        expect(element.classList.contains('scrolled')).toBe(true);
    });

    it('should remove "scrolled" class when below threshold', () => {
        element.classList.add('scrolled');
        applyScrollState(element, 10);
        expect(element.classList.contains('scrolled')).toBe(false);
    });

    it('should not add "scrolled" class at exactly the threshold', () => {
        applyScrollState(element, 20);
        expect(element.classList.contains('scrolled')).toBe(false);
    });

    it('should handle null element gracefully', () => {
        expect(() => applyScrollState(null, 50)).not.toThrow();
    });

    it('should work with a custom threshold', () => {
        applyScrollState(element, 60, 50);
        expect(element.classList.contains('scrolled')).toBe(true);

        applyScrollState(element, 40, 50);
        expect(element.classList.contains('scrolled')).toBe(false);
    });

    it('should toggle class on repeated calls', () => {
        applyScrollState(element, 100);
        expect(element.classList.contains('scrolled')).toBe(true);

        applyScrollState(element, 5);
        expect(element.classList.contains('scrolled')).toBe(false);

        applyScrollState(element, 50);
        expect(element.classList.contains('scrolled')).toBe(true);
    });
});
