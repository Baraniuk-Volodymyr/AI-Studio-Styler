// Default settings (no change)
const DEFAULT_SETTINGS = {
    isActive: false,
    mainDirection: 'rtl',
    codeDirection: 'ltr',
    codeAlign: 'left',
    headerDirection: 'ltr'
};

// DOM Elements (no change)
const toggleButton = document.getElementById('toggleButton');
const statusText = document.getElementById('statusText');
const mainDirectionSelect = document.getElementById('mainDirection');
const codeDirectionSelect = document.getElementById('codeDirection');
const codeAlignSelect = document.getElementById('codeAlign');
const headerDirectionSelect = document.getElementById('headerDirection');
const resetButton = document.getElementById('resetButton');

const advancedControls = [
    mainDirectionSelect, 
    codeDirectionSelect, 
    codeAlignSelect, 
    headerDirectionSelect, 
    resetButton
];

/**
 * Updates the popup's entire UI based on the provided settings object.
 */
function updateUI(settings) {
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
    
    mainDirectionSelect.value = settings.mainDirection;
    codeDirectionSelect.value = settings.codeDirection;
    codeAlignSelect.value = settings.codeAlign;
    headerDirectionSelect.value = settings.headerDirection;

    const isAdvancedDisabled = !settings.isActive;
    advancedControls.forEach(control => control.disabled = isAdvancedDisabled);
}

/**
 * A central function to read the current state of the UI,
 * save it to storage, and send it to the content script.
 */
async function saveAndApplySettings() {
    console.log("Saving and applying settings..."); // For debugging
    const currentSettings = {
        isActive: toggleButton.classList.contains('disabled'),
        mainDirection: mainDirectionSelect.value,
        codeDirection: codeDirectionSelect.value,
        codeAlign: codeAlignSelect.value,
        headerDirection: headerDirectionSelect.value
    };

    try {
        await browser.storage.local.set({ 'stylerSettings': currentSettings });

        const tabs = await browser.tabs.query({ active: true, currentWindow: true });
        if (tabs[0] && tabs[0].id) {
            await browser.tabs.sendMessage(tabs[0].id, {
                action: "applySettings",
                settings: currentSettings
            });
        }
        console.log("Settings applied successfully.", currentSettings); // For debugging
    } catch (e) {
        console.error("Error during save/apply:", e);
    }
}

// --- Event Listeners ---

// On popup load, get settings and display them.
document.addEventListener('DOMContentLoaded', async () => {
    const data = await browser.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS });
    updateUI(data.stylerSettings);
});

// The main toggle button now has a much simpler logic.
toggleButton.addEventListener('click', () => {
    // Manually toggle the button's visual state FIRST.
    toggleButton.classList.toggle('disabled');
    
    // Update the rest of the UI based on this new state.
    const settings = {
        isActive: toggleButton.classList.contains('disabled'),
        mainDirection: mainDirectionSelect.value,
        codeDirection: codeDirectionSelect.value,
        codeAlign: codeAlignSelect.value,
        headerDirection: headerDirectionSelect.value
    };
    updateUI(settings);
    
    // Now, call the central function to save and apply everything.
    saveAndApplySettings();
});

// All advanced dropdowns now just trigger the central save function.
advancedControls.filter(el => el.tagName === 'SELECT').forEach(select => {
    select.addEventListener('change', saveAndApplySettings);
});

// The reset button prepares the default settings and then calls the central save function.
resetButton.addEventListener('click', async () => {
    const data = await browser.storage.local.get({ 'stylerSettings': DEFAULT_SETTINGS });
    const activeState = data.stylerSettings.isActive;
    const defaultSettingsWithState = { ...DEFAULT_SETTINGS, isActive: activeState };
    
    // Update the UI first to show the defaults
    updateUI(defaultSettingsWithState);
    
    // Then call the central function to save and apply them
    await saveAndApplySettings();
});