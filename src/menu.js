/**
 * Mobile menu state management logic.
 */

const DESKTOP_BREAKPOINT = 768;

function getToggledState(isCurrentlyExpanded) {
    return !isCurrentlyExpanded;
}

function shouldCloseOnResize(windowWidth, breakpoint) {
    if (breakpoint === undefined) {
        breakpoint = DESKTOP_BREAKPOINT;
    }
    return windowWidth > breakpoint;
}

function applyMenuToggle(menuToggle, mobileMenu, body) {
    if (!menuToggle || !mobileMenu) {
        return;
    }
    var isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
    menuToggle.setAttribute('aria-expanded', String(!isExpanded));
    mobileMenu.classList.toggle('active');
    if (body) {
        body.classList.toggle('no-scroll');
    }
}

function applyMenuClose(menuToggle, mobileMenu, body) {
    if (!menuToggle || !mobileMenu) {
        return;
    }
    menuToggle.setAttribute('aria-expanded', 'false');
    mobileMenu.classList.remove('active');
    if (body) {
        body.classList.remove('no-scroll');
    }
}

module.exports = {
    DESKTOP_BREAKPOINT,
    getToggledState,
    shouldCloseOnResize,
    applyMenuToggle,
    applyMenuClose
};
