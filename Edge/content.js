console.log("AI Studio Styler: Advanced content script loaded.");

const DEFAULT_SETTINGS = {
    isActive: false,
    mainDirection: 'rtl',
    codeDirection: 'ltr',
    codeAlign: 'left',
    headerDirection: 'ltr'
};

/**
 * Applies or removes styles based on the provided settings object.
 * This is the single source of truth for styling the page.
 * @param {object} settings - The settings configuration.
 */
function updatePageStyles(settings) {
    const parentContainer = document.querySelector('ms-autoscroll-container.hide-scrollbar');
    if (!parentContainer) return;

    const codeBlocks = parentContainer.querySelectorAll('pre.ng-star-inserted');
    const codeHeaders = parentContainer.querySelectorAll('mat-expansion-panel.sticky-header mat-expansion-panel-header.sticky');
    
    if (settings.isActive) {
        // Apply styles based on settings
        parentContainer.style.direction = settings.mainDirection;

        codeBlocks.forEach(block => {
            block.style.direction = settings.codeDirection;
            block.style.textAlign = settings.codeAlign;
        });

        codeHeaders.forEach(header => {
            header.style.direction = settings.headerDirection;
        });
    } else {
        // Remove all custom styles
        parentContainer.style.direction = '';
        codeBlocks.forEach(block => {
            block.style.direction = '';
            block.style.textAlign = '';
        });
        codeHeaders.forEach(header => {
            header.style.direction = '';
        });
    }
}

// Listen for messages from the popup to apply settings live
chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (chrome.runtime.lastError) return;
    
    if (request.action === "applySettings") {
        updatePageStyles(request.settings);
    }
});

// Main initialization logic
function initialize() {
    try {
        // Load settings from storage on page load
        chrome.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS }, (data) => {
            if (chrome.runtime.lastError) return;
            
            // Apply initial styles
            updatePageStyles(data.stylerSettings);
            
            // Set up an observer to re-apply styles when the page content changes dynamically
            const observer = new MutationObserver(() => {
                // Re-check settings from storage in case they changed while the tab was open
                chrome.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS }, (latestData) => {
                    if (chrome.runtime.lastError) {
                        observer.disconnect(); // Stop observing if context is lost
                        return;
                    }
                    updatePageStyles(latestData.stylerSettings);
                });
            });

            observer.observe(document.body, { childList: true, subtree: true });
        });
    } catch (e) {
        console.warn("AI Studio Styler: Context invalidated, could not initialize.", e);
    }
}

initialize();