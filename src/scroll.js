/**
 * Scroll-related utility logic for the sticky header.
 */

const DEFAULT_SCROLL_THRESHOLD = 20;

function shouldAddScrolledClass(scrollY, threshold) {
    if (threshold === undefined) {
        threshold = DEFAULT_SCROLL_THRESHOLD;
    }
    return scrollY > threshold;
}

function applyScrollState(element, scrollY, threshold) {
    if (!element) {
        return;
    }
    if (shouldAddScrolledClass(scrollY, threshold)) {
        element.classList.add('scrolled');
    } else {
        element.classList.remove('scrolled');
    }
}

module.exports = {
    DEFAULT_SCROLL_THRESHOLD,
    shouldAddScrolledClass,
    applyScrollState
};
