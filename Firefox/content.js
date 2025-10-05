console.log("AI Studio Styler: Content script loaded. Waiting for actions.");

// Default settings and other constants remain the same.
const DEFAULT_SETTINGS = {
    isActive: false,
    mainDirection: 'rtl',
    codeDirection: 'ltr',
    codeAlign: 'left',
    headerDirection: 'ltr'
};

/**
 * The single function responsible for applying or removing styles.
 * It's now more verbose for easier debugging.
 * @param {object} settings - The settings configuration.
 */
function updatePageStyles(settings) {
    console.log("Attempting to apply styles with settings:", settings);

    const parentContainer = document.querySelector('ms-autoscroll-container.hide-scrollbar');
    
    // CRITICAL: Check if the main element exists.
    if (!parentContainer) {
        console.warn("Main container ('ms-autoscroll-container') not found. Styles cannot be applied yet.");
        return; // Exit if the container isn't ready.
    }
    
    console.log("Found main container:", parentContainer);

    const codeBlocks = parentContainer.querySelectorAll('pre.ng-star-inserted');
    const codeHeaders = parentContainer.querySelectorAll('mat-expansion-panel.sticky-header mat-expansion-panel-header.sticky');
    
    if (settings.isActive) {
        console.log("Applying styles...");
        parentContainer.style.direction = settings.mainDirection;
        codeBlocks.forEach(block => {
            block.style.direction = settings.codeDirection;
            block.style.textAlign = settings.codeAlign;
        });
        codeHeaders.forEach(header => {
            header.style.direction = settings.headerDirection;
        });
    } else {
        console.log("Removing styles...");
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

// --- Event Listeners and Initializers ---

// Listen for messages from the popup. This is the primary trigger.
browser.runtime.onMessage.addListener((request) => {
    if (request.action === "applySettings") {
        console.log("Received 'applySettings' message from popup.");
        updatePageStyles(request.settings);
        return Promise.resolve({ status: "Message processed" });
    }
});

// Main initialization logic.
async function initialize() {
    try {
        const data = await browser.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS });
        console.log("Initialized with settings from storage:", data.stylerSettings);
        
        // Initial attempt to apply styles on page load.
        updatePageStyles(data.stylerSettings);
        
        // The MutationObserver is our safety net for dynamic content.
        const observer = new MutationObserver(async () => {
            // Re-read settings from storage in case they changed.
            const latestData = await browser.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS });
            // And re-apply styles. This handles elements added to the page later.
            updatePageStyles(latestData.stylerSettings);
        });

        observer.observe(document.body, { childList: true, subtree: true });

    } catch (e) {
        console.error("AI Styler Initialization Error:", e);
    }
}

initialize();