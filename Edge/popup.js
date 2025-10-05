// Default settings for the first time or after a reset
const DEFAULT_SETTINGS = {
    isActive: false,
    mainDirection: 'rtl',
    codeDirection: 'ltr',
    codeAlign: 'left',
    headerDirection: 'ltr'
};

// DOM Elements
const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('statusText');
const mainDirectionSelect = document.getElementById('mainDirection');
const codeDirectionSelect = document.getElementById('codeDirection');
const codeAlignSelect = document.getElementById('codeAlign');
const headerDirectionSelect = document.getElementById('headerDirection');
const resetButton = document.getElementById('resetButton'); // ADDED: Reset button element

// Create an array of all controls inside the advanced menu
const advancedControls = [
    mainDirectionSelect, 
    codeDirectionSelect, 
    codeAlignSelect, 
    headerDirectionSelect, 
    resetButton
];

/**
 * Updates the popup's UI based on the provided settings object.
 * @param {object} settings - The settings object from storage.
 */
function updateUI(settings) {
    // Update main toggle button and status text
    if (settings.isActive) {
        statusText.textContent = 'RTL Styles are Active';
        statusText.style.color = 'green';
        toggleButton.textContent = 'Disable Styles';
        toggleButton.classList.add('disabled');
    } else {
        statusText.textContent = 'RTL Styles are Inactive';
        statusText.style.color = 'red';
        toggleButton.textContent = 'Enable Styles';
        toggleButton.classList.remove('disabled');
    }
    
    // Update advanced settings dropdowns
    mainDirectionSelect.value = settings.mainDirection;
    codeDirectionSelect.value = settings.codeDirection;
    codeAlignSelect.value = settings.codeAlign;
    headerDirectionSelect.value = settings.headerDirection;

    // Enable or disable advanced settings based on the main toggle
    const isAdvancedDisabled = !settings.isActive;
    advancedControls.forEach(control => control.disabled = isAdvancedDisabled);
}

/**
 * Sends the provided settings object to the content script to update the page.
 * @param {object} settings - The settings to apply.
 */
function applySettingsToPage(settings) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0] && tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, {
                action: "applySettings",
                settings: settings
            });
        }
    });
}

// --- Event Listeners ---

// Load settings and initialize UI when the popup opens
document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS }, (data) => {
        updateUI(data.stylerSettings);
    });
});

// Main toggle button functionality
toggleButton.addEventListener('click', () => {
    chrome.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS }, (data) => {
        const newSettings = data.stylerSettings;
        newSettings.isActive = !newSettings.isActive; // Invert the active state
        
        chrome.storage.local.set({ 'stylerSettings': newSettings }, () => {
            updateUI(newSettings);
            applySettingsToPage(newSettings);
        });
    });
});

// Add listeners to all dropdowns to save changes instantly
advancedControls.filter(el => el.tagName === 'SELECT').forEach(select => {
    select.addEventListener('change', () => {
        // When a dropdown changes, read all current settings from the UI
        const newSettings = {
            isActive: toggleButton.classList.contains('disabled'),
            mainDirection: mainDirectionSelect.value,
            codeDirection: codeDirectionSelect.value,
            codeAlign: codeAlignSelect.value,
            headerDirection: headerDirectionSelect.value
        };
        // Then save and apply them
        chrome.storage.local.set({ 'stylerSettings': newSettings }, () => {
            applySettingsToPage(newSettings);
        });
    });
});

// ADDED: Event listener for the new reset button
resetButton.addEventListener('click', () => {
    // We use a fresh copy of the defaults, but keep the `isActive` state
    chrome.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS }, (data) => {
        const activeState = data.stylerSettings.isActive;
        const newSettings = { ...DEFAULT_SETTINGS, isActive: activeState };
        
        chrome.storage.local.set({ 'stylerSettings': newSettings }, () => {
            updateUI(newSettings);
            applySettingsToPage(newSettings);
        });
    });
});