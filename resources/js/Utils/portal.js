/**
 * Portal utility for rendering components outside the DOM hierarchy
 * Useful for modals, tooltips, dropdowns, etc.
 */

/**
 * Get or create a portal container element
 * @param {string} id - The ID for the portal container
 * @returns {HTMLElement} The portal container element
 */
export function getPortalContainer(id = 'portal-root') {
    let container = document.getElementById(id);
    
    if (!container) {
        container = document.createElement('div');
        container.id = id;
        container.style.position = 'relative';
        container.style.zIndex = '9999';
        document.body.appendChild(container);
    }
    
    return container;
}

/**
 * Create a portal container for modals
 * @returns {HTMLElement} The modal portal container
 */
export function getModalContainer() {
    return getPortalContainer('modal-root');
}

/**
 * Create a portal container for tooltips
 * @returns {HTMLElement} The tooltip portal container
 */
export function getTooltipContainer() {
    return getPortalContainer('tooltip-root');
}

/**
 * Create a portal container for dropdowns
 * @returns {HTMLElement} The dropdown portal container
 */
export function getDropdownContainer() {
    return getPortalContainer('dropdown-root');
}

/**
 * Create a portal container for alerts/toasts
 * @returns {HTMLElement} The alert portal container
 */
export function getAlertContainer() {
    return getPortalContainer('alert-root');
}

/**
 * Remove a portal container
 * @param {string} id - The ID of the portal container to remove
 */
export function removePortalContainer(id) {
    const container = document.getElementById(id);
    if (container && container.childNodes.length === 0) {
        container.remove();
    }
}

export default {
    getPortalContainer,
    getModalContainer,
    getTooltipContainer,
    getDropdownContainer,
    getAlertContainer,
    removePortalContainer,
};
