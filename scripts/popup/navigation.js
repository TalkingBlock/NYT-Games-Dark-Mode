// Handles moving around the popup for switching pages/panels and picking color options

// Imports
import {popupState} from "./states.js";
import {
    popupActivePageStorageKey, popupActiveColorPanelStorageKey, colorPanelConfig, colorPanelNames, pageButtons
} from "./defaultExports.js";
import {writeSyncValue} from "./storage.js";
import {updateAll, updateScrollAffordance} from "./updater.js";
import {selectColorForActivePanel, selectPanelColor} from "./colorState.js";
import {scheduleThemeSave} from "./presets.js";

// Opens the settings page's default page or the last used page
export function loadSavedPageState(savedValues) {
    if (pageButtons.includes(popupState.defaultPage)) {
        popupState.activePageButtonClass = popupState.defaultPage;
        return;
    }
    const savedPage = savedValues[popupActivePageStorageKey];
    if (pageButtons.includes(savedPage)) {
        popupState.activePageButtonClass = savedPage;
    }
}

// Opens the settings page's default color panel or the last used panel
export function loadSavedColorPanelState(savedValues) {
    if (colorPanelNames.includes(popupState.defaultColorPanel)) {
        popupState.activeColorPanel = popupState.defaultColorPanel;
        return;
    }
    const savedPanel = savedValues[popupActiveColorPanelStorageKey];
    if (colorPanelNames.includes(savedPanel)) {
        popupState.activeColorPanel = savedPanel;
    }
}

// Switches pages when a page button is clicked and remembers it as the last used page
export function attachPageButtonHandlers() {
    document.querySelectorAll(".page-buttons button").forEach((pageButton) => {
        pageButton.addEventListener("click", async (event) => {
            const buttonClass = event.currentTarget.dataset.page;
            if (!buttonClass) return;
            popupState.activePageButtonClass = buttonClass;
            await writeSyncValue(popupActivePageStorageKey, buttonClass);
            updateAll();
        });
    });
}

// Switches game color panels when a tab is clicked, remembers it and selects that game's last color
export function attachGameColorPanelHandlers() {
    document.querySelectorAll(".color-info-tab").forEach((panelButton) => {
        panelButton.addEventListener("click", async () => {
            const panelName = panelButton.dataset.colorPanel;
            if (!panelName) return;
            popupState.activeColorPanel = panelName;
            await writeSyncValue(popupActiveColorPanelStorageKey, panelName);
            if (selectColorForActivePanel()) scheduleThemeSave();
            updateAll();
        });
    });
}

// Selects a color option when its radio button is picked and saves it as the game's last color
export function attachGameColorObjectHandlers() {
    for (const panelName of colorPanelNames) {
        const panelSelector = `#${colorPanelConfig[panelName].panelId} .color-option input[type='radio']`;
        document.querySelectorAll(panelSelector).forEach((radioInput) => {
            radioInput.addEventListener("change", () => {
                if (!radioInput.checked) return;
                const colorOption = radioInput.closest(".color-option");
                const colorKey = colorOption?.dataset.key;
                if (!colorKey) return;
                if (selectPanelColor(panelName, colorKey)) scheduleThemeSave();
            });
        });
    }
}

// Keeps the color options scroll fades synced while a panel is scrolled
export function attachColorPanelScrollHandlers() {
    document.querySelectorAll(".color-info-panel").forEach((colorPanel) => {
        colorPanel.addEventListener("scroll", () => {
            updateScrollAffordance();
        });
    });
}