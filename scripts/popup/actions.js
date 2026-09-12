// Import functions and variables
import {popupState} from "./states.js";
import {
    popupActivePageStorageKey, popupActiveColorPanelStorageKey,
    defaultPageStorageKey, defaultColorPanelStorageKey, lastUsedOptionValue,
    colorPanelConfig, colorPanelNames,
    dmToggleConfig, dmToggleGroups, gameColorsStorageKey,
    dmGroupMasterStorageKeys, legacyGroupStorageKeys, popupStorageKeys,
    displayPresetName, customPresetNames, prebuiltPresetNames, presetLabels, presetNameMaxLength, customPresetSwatch,
    syncDarkModeAction, applyGameColorsAction, pageButtons, svCursorInset
} from "./defaultExports.js";
import {clamp, hexToHsv, normalizeHexColor} from "./colorMath.js";
import {saveTheme, readSyncValues, writeSyncValue, removeSyncValues, sendMessageToActiveTab} from "./storage.js";
import {getModalElements, openModal} from "./modal.js";
import {
    updateAll, updateScrollAffordance, updatePresetMenuOpenState, showHeaderToast,
    isDisplayPresetDark, getPresetDisplayName, getCustomPresetColor, getCurrentPickerHex
} from "./updater.js";

// Call from main.js which starts the popup and calls all functions to display it
export async function initializePopup() {
    await loadPopupState();
    attachPageButtonHandlers();
    attachGameColorPanelHandlers();
    attachGameColorObjectHandlers();
    attachColorPresetHandlers();
    attachDMToggleHandlers();
    attachPickerHandlers();
    attachClipboardHandlers();
    attachHexInputHandlers();
    attachResetHandler();
    attachColorPanelScrollHandlers();
    attachPresetActionHandlers();
    loadVersionLabel();
    updateAll();
}

// Reads every saved value out of storage and pours it into the popup's memory state
async function loadPopupState() {
    const [savedValues] = await Promise.all([
        readSyncValues(popupStorageKeys),
        removeSyncValues(legacyGroupStorageKeys)
    ]);
    loadBehaviorSettings(savedValues);
    loadSavedPageState(savedValues);
    loadDMToggleStates(savedValues);
    loadSavedColorPanelState(savedValues);
    loadThemeState(savedValues[gameColorsStorageKey] || null);
}

// Called by the settings page after it rewrites storage to keep the user on the page they are looking at
export async function reloadPopupState() {
    const currentPage = popupState.activePageButtonClass;
    await loadPopupState();
    popupState.activePageButtonClass = currentPage;
    updateAll();
}

// Fills the About section's version row straight from the manifest, so it never drifts from the real build
function loadVersionLabel() {
    const versionLabel = document.getElementById("extensionVersion");
    if (!versionLabel) return;
    versionLabel.textContent = `v${chrome.runtime.getManifest().version}`;
}

// Keeps the scroll affordance for color options synced while scrolling
function attachColorPanelScrollHandlers() {
    document.querySelectorAll(".color-info-panel").forEach((colorPanel) => {
        colorPanel.addEventListener("scroll", () => {
            updateScrollAffordance();
        });
    });
}

// Loads the settings page's behavior choices
function loadBehaviorSettings(savedValues) {
    const savedDefaultPage = savedValues[defaultPageStorageKey];
    popupState.defaultPage = pageButtons.includes(savedDefaultPage) ? savedDefaultPage : lastUsedOptionValue;
    const savedDefaultPanel = savedValues[defaultColorPanelStorageKey];
    popupState.defaultColorPanel = colorPanelNames.includes(savedDefaultPanel) ? savedDefaultPanel : lastUsedOptionValue;
}

// Loads the page state and displays whatever page is active
function loadSavedPageState(savedValues) {
    if (pageButtons.includes(popupState.defaultPage)) {
        popupState.activePageButtonClass = popupState.defaultPage;
        return;
    }
    const savedPage = savedValues[popupActivePageStorageKey];
    if (pageButtons.includes(savedPage)) {
        popupState.activePageButtonClass = savedPage;
    }
}

// Loads and applies the dark mode toggle states from storage
function loadDMToggleStates(savedValues) {
    for (const parentToggleId of Object.keys(dmToggleGroups)) {
        const parentToggle = document.getElementById(parentToggleId);
        if (!parentToggle) continue;
        parentToggle.checked = savedValues[dmGroupMasterStorageKeys[parentToggleId]] !== false;
    }
    for (const [toggleId, toggleConfig] of Object.entries(dmToggleConfig)) {
        const toggleInput = document.getElementById(toggleId);
        if (!toggleInput) continue;
        toggleInput.checked = Boolean(savedValues[toggleConfig.storageKey]);
    }
}

// Helper function that loads the color panel
function loadSavedColorPanelState(savedValues) {
    if (colorPanelNames.includes(popupState.defaultColorPanel)) {
        popupState.activeColorPanel = popupState.defaultColorPanel;
        return;
    }
    const savedPanel = savedValues[popupActiveColorPanelStorageKey];
    if (colorPanelNames.includes(savedPanel)) {
        popupState.activeColorPanel = savedPanel;
    }
}

// Loads and applies every game's color theme from storage
function loadThemeState(savedTheme) {
    for (const panelName of colorPanelNames) {
        const panelConfig = colorPanelConfig[panelName];
        const savedPresets = savedTheme?.[panelConfig.presetsStorageField] || {};
        popupState.customColors[panelName] = loadCustomPresets({
            selector: `#${panelConfig.panelId} .color-option[data-key]`,
            defaults: panelConfig.lightColors,
            savedPresets
        });
        popupState.presetMeta[panelName] = loadPresetMeta(savedTheme?.presetMeta?.[panelName]);
        popupState.activePresets[panelName] = resolvePresetName(savedTheme?.[panelConfig.presetStorageField]);
        buildActivePanelColors(panelName);
        popupState.lastColorKeys[panelName] = resolveColorKey(
            savedTheme?.[panelConfig.activeKeyStorageField],
            popupState.colors[panelName]
        );
    }
    selectColorForActivePanel(false);
}

// Helper function that returns the saved key if it still exists, otherwise the first available one
function resolveColorKey(savedKey, colorMap) {
    if (savedKey && colorMap[savedKey]) return savedKey;
    return Object.keys(colorMap)[0] || null;
}

// Selects the remembered color of whichever color panel is currently displayed
function selectColorForActivePanel(shouldSave = true) {
    const panelName = popupState.activeColorPanel;
    const colorKey = resolveColorKey(popupState.lastColorKeys[panelName], popupState.colors[panelName]);
    if (!colorKey) {
        popupState.selectedPanel = panelName;
        popupState.selectedColorKey = null;
        return;
    }
    selectPanelColor(panelName, colorKey, shouldSave, false);
}

// Returns the color state the picker is currently editing, or null when the panel has nothing selected
function getSelectedColorState() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return null;
    return popupState.colors[popupState.selectedPanel]?.[popupState.selectedColorKey] || null;
}

// Moves the picker onto whichever color is selected right now
function syncPickerToSelectedColor() {
    const colorState = getSelectedColorState();
    if (!colorState) return;
    popupState.pickerHue = colorState.h;
    popupState.pickerSaturation = colorState.s;
    popupState.pickerValue = colorState.v;
}

// Returns the saved preset if it is still one the popup offers, otherwise the display one.
function resolvePresetName(savedPreset) {
    if (customPresetNames.includes(savedPreset)) return savedPreset;
    if (prebuiltPresetNames.includes(savedPreset)) return savedPreset;
    return displayPresetName;
}

// Returns true when the preset comes with the extension
function isPrebuiltPreset(presetName) {
    return prebuiltPresetNames.includes(presetName);
}

// Reads the saved names and dot colors for one game's custom presets, keeping only what is valid
function loadPresetMeta(savedMeta) {
    const meta = {};
    for (const presetName of customPresetNames) {
        const saved = savedMeta?.[presetName] || {};
        const name = typeof saved.name === "string" ? saved.name.trim().slice(0, presetNameMaxLength) : "";
        meta[presetName] = {
            name: name || presetLabels[presetName],
            color: normalizeHexColor(saved.color) || null
        };
    }
    return meta;
}

// Helper function for loadThemeState() that creates all three custom preset maps for one game.
function loadCustomPresets({selector, defaults, savedPresets}) {
    const targetMap = {};
    const colorKeys = [...document.querySelectorAll(selector)].map((colorOption) => colorOption.dataset.key);
    for (const presetName of customPresetNames) {
        const savedColors = savedPresets[presetName] || {};
        const presetMap = {};
        for (const colorKey of colorKeys) {
            const defaultHex = (defaults[colorKey] || "#FFFFFF").toUpperCase();
            const savedColor = savedColors[colorKey];
            if (savedColor) {
                presetMap[colorKey] = {
                    h: savedColor.h ?? 0,
                    s: savedColor.s ?? 0,
                    v: savedColor.v ?? 1,
                    hex: (savedColor.hex || defaultHex).toUpperCase(),
                    defaultHex
                };
            } else {
                const defaultHsv = hexToHsv(defaultHex) || {h: 0, s: 0, v: 1};
                presetMap[colorKey] = {
                    h: defaultHsv.h,
                    s: defaultHsv.s,
                    v: defaultHsv.v,
                    hex: defaultHex,
                    defaultHex
                };
            }
        }
        targetMap[presetName] = presetMap;
    }
    return targetMap;
}

// Rebuilds the display preset's colors after a dark mode change so the preview gets updated
function refreshDisplayPresetColors() {
    let didRebuild = false;
    for (const panelName of colorPanelNames) {
        if (popupState.activePresets[panelName] !== displayPresetName) continue;
        buildActivePanelColors(panelName);
        didRebuild = true;
    }
    if (!didRebuild) return;
    syncPickerToSelectedColor();
}

// Builds a fresh color-state map from a plain hex palette
function buildColorStateMap(palette) {
    const map = {};
    for (const [colorKey, hexValue] of Object.entries(palette)) {
        const hex = (hexValue || "#FFFFFF").toUpperCase();
        const hsv = hexToHsv(hex) || {h: 0, s: 0, v: 1};
        map[colorKey] = {h: hsv.h, s: hsv.s, v: hsv.v, hex, defaultHex: hex};
    }
    return map;
}

// Points popupState.colors[panelName] at the palette for that game's active preset
function buildActivePanelColors(panelName) {
    const panelConfig = colorPanelConfig[panelName];
    const presetName = popupState.activePresets[panelName];
    if (presetName === displayPresetName) {
        popupState.colors[panelName] = buildColorStateMap(
            isDisplayPresetDark(panelName) ? panelConfig.darkColors : panelConfig.lightColors
        );
    } else if (isPrebuiltPreset(presetName)) {
        popupState.colors[panelName] = buildColorStateMap(panelConfig.prebuiltColors[presetName]);
    } else {
        popupState.colors[panelName] = popupState.customColors[panelName][presetName];
    }
}

// Returns true when the given game's colors cannot be edited
function isPanelEditingLocked(panelName) {
    const presetName = popupState.activePresets[panelName];
    return presetName === displayPresetName || isPrebuiltPreset(presetName);
}

// Returns true when nothing is selected or the selected color is on a non-editable preset
function isActiveEditingLocked() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return true;
    return isPanelEditingLocked(popupState.selectedPanel);
}

// Switches a game's active preset, rebuilds the displayed colors, applies and saves
function applyPanelPreset(panelName, presetName) {
    const isKnownPreset = presetName === displayPresetName ||
        isPrebuiltPreset(presetName) ||
        customPresetNames.includes(presetName);
    if (!isKnownPreset) return;
    popupState.activePresets[panelName] = presetName;
    buildActivePanelColors(panelName);
    const panelColors = popupState.colors[panelName];
    if (popupState.selectedPanel !== panelName || !panelColors[popupState.selectedColorKey]) {
        popupState.selectedPanel = panelName;
        popupState.selectedColorKey = resolveColorKey(popupState.lastColorKeys[panelName], panelColors);
    }
    popupState.lastColorKeys[panelName] = popupState.selectedColorKey;
    syncPickerToSelectedColor();
    saveThemeNow();
    updateAll();
}

// Allows for the switching between pages
function attachPageButtonHandlers() {
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

// Allows for the switching between game color panels
function attachGameColorPanelHandlers() {
    document.querySelectorAll(".color-info-tab").forEach((panelButton) => {
        panelButton.addEventListener("click", async () => {
            const panelName = panelButton.dataset.colorPanel;
            if (!panelName) return;
            popupState.activeColorPanel = panelName;
            await writeSyncValue(popupActiveColorPanelStorageKey, panelName);
            selectColorForActivePanel();
            updateAll();
        });
    });
}

// Opens and closes the preset dropdown, and applies whichever preset is picked from it
function attachColorPresetHandlers() {
    const selectButton = document.getElementById("presetSelectButton");
    const menu = document.getElementById("presetMenu");
    if (!selectButton || !menu) return;
    selectButton.addEventListener("click", (event) => {
        event.stopPropagation();
        setPresetMenuOpen(!popupState.presetMenuOpen);
    });
    menu.querySelectorAll(".preset-menu-item").forEach((menuItem) => {
        menuItem.addEventListener("click", () => {
            const presetName = menuItem.dataset.preset;
            setPresetMenuOpen(false);
            if (!presetName) return;
            applyPanelPreset(popupState.activeColorPanel, presetName);
        });
    });
    document.addEventListener("click", (event) => {
        if (!popupState.presetMenuOpen) return;
        if (event.target.closest(".preset-select")) return;
        setPresetMenuOpen(false);
    });
    document.addEventListener("keydown", (event) => {
        if (event.key !== "Escape" || !popupState.presetMenuOpen) return;
        setPresetMenuOpen(false);
        selectButton.focus();
    });
}

// Shows or hides the preset dropdown menu
function setPresetMenuOpen(shouldOpen) {
    popupState.presetMenuOpen = shouldOpen;
    updatePresetMenuOpenState();
}

// Allows for the toggling between game color objects
function attachGameColorObjectHandlers() {
    for (const panelName of colorPanelNames) {
        const panelSelector = `#${colorPanelConfig[panelName].panelId} .color-option input[type='radio']`;
        document.querySelectorAll(panelSelector).forEach((radioInput) => {
            radioInput.addEventListener("change", () => {
                if (!radioInput.checked) return;
                const colorOption = radioInput.closest(".color-option");
                const colorKey = colorOption?.dataset.key;
                if (!colorKey) return;
                selectPanelColor(panelName, colorKey);
            });
        });
    }
}

// Allows for the toggling of all dark mode sliders
function attachDMToggleHandlers() {
    for (const [toggleId, toggleConfig] of Object.entries(dmToggleConfig)) {
        const toggleInput = document.getElementById(toggleId);
        if (!toggleInput) continue;
        toggleInput.addEventListener("change", async () => {
            const isEnabled = toggleInput.checked;
            await writeSyncValue(toggleConfig.storageKey, isEnabled);
            sendMessageToActiveTab({ action: toggleConfig.action });
            refreshDisplayPresetColors();
            updateAll();
        });
    }
    for (const groupToggleId of Object.keys(dmToggleGroups)) {
        const groupToggle = document.getElementById(groupToggleId);
        if (!groupToggle) continue;
        groupToggle.addEventListener("change", async () => {
            await writeSyncValue(dmGroupMasterStorageKeys[groupToggleId], groupToggle.checked);
            sendMessageToActiveTab({ action: syncDarkModeAction });
            refreshDisplayPresetColors();
            updateAll();
        });
    }
}

// Allows for the dragging of the hue slider and the saturation/value cursor
function attachPickerHandlers() {
    const saturationValueArea = document.getElementById("sv");
    const hueSlider = document.getElementById("hue");
    attachDragHandler(saturationValueArea, (event) => {
        updateSaturationAndValueFromCursor(event);
    });
    attachDragHandler(hueSlider, (event) => {
        updateHueFromSlider(event);
    });
}

// Allows for copying and pasting of the current color picker's hex value
function attachClipboardHandlers() {
    const copyButton = document.getElementById("copyHex");
    const pasteButton = document.getElementById("pasteHex");
    copyButton?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(getCurrentPickerHex());
            showHeaderToast("Copied hex to clipboard");
        } catch (error) {
            console.error("Error copying hex: ", error);
        }
    });
    pasteButton?.addEventListener("click", async () => {
        if (isActiveEditingLocked()) return;
        try {
            const clipboardText = await navigator.clipboard.readText();
            const normalizedHex = normalizeHexColor(clipboardText);
            if (!normalizedHex) return;
            const hsv = hexToHsv(normalizedHex);
            if (!hsv) return;
            popupState.pickerHue = hsv.h;
            popupState.pickerSaturation = hsv.s;
            popupState.pickerValue = hsv.v;

            applyPickerColorToSelectedOption();
            updateAll();
            saveThemeNow();
            showHeaderToast("Pasted hex to selection");
            sendSelectedPanelColorsNow();
        } catch (error) {
            console.error("Error pasting hex: ", error, error?.name, error?.message);
        }
    });
}

// Allows the hexcode under the picker to be typed into and commits when enter is press or when focus leaves
function attachHexInputHandlers() {
    const hexInput = document.getElementById("hexInput");
    if (!hexInput) return;
    hexInput.addEventListener("focus", () => {
        hexInput.select();
    });
    hexInput.addEventListener("keydown", (event) => {
        if (event.key !== "Enter") return;
        event.preventDefault();
        hexInput.blur();
    });
    hexInput.addEventListener("blur", () => {
        commitTypedHex(hexInput);
    });
}

// Reads whatever was typed into the hex field and moves the picker onto that color or falls back to old/black color
function commitTypedHex(hexInput) {
    const pickerHex = getCurrentPickerHex();
    const typedValue = hexInput.value.trim().toUpperCase();
    if (!typedValue || isActiveEditingLocked()) {
        hexInput.value = pickerHex.slice(1);
        return;
    }
    const typedHex = /^[0-9A-F]{1,6}$/.test(typedValue) ? `#${typedValue.padEnd(6, "0")}` : "#000000";
    hexInput.value = typedHex.slice(1);
    if (typedHex === pickerHex) return;
    const hsv = hexToHsv(typedHex);
    if (!hsv) return;
    popupState.pickerHue = hsv.h;
    popupState.pickerSaturation = hsv.s;
    popupState.pickerValue = hsv.v;

    applyPickerColorToSelectedOption();
    updateAll();
    saveThemeNow();
    sendSelectedPanelColorsNow();
}

// Allows for the resetting of the current color picker's color to the object's default value
function attachResetHandler() {
    const resetButton = document.getElementById("resetHex");
    resetButton?.addEventListener("click", () => {
        if (isActiveEditingLocked()) return;
        const defaultHex = getSelectedDefaultHex();
        const hsv = hexToHsv(defaultHex);
        if (!hsv) return;
        popupState.pickerHue = hsv.h;
        popupState.pickerSaturation = hsv.s;
        popupState.pickerValue = hsv.v;

        applyPickerColorToSelectedOption();
        updateAll();
        saveThemeNow();
        showHeaderToast("Reset selected hex to default");
        sendSelectedPanelColorsNow();
    });
}

// Helper function that reads and allows the dragging of the hue slider and the saturation/value cursor
function attachDragHandler(element, moveHandler) {
    if (!element) return;
    let isDragging = false;
    element.addEventListener("pointerdown", (event) => {
        isDragging = true;
        element.setPointerCapture?.(event.pointerId);
        moveHandler(event);
        event.preventDefault();
    });
    window.addEventListener("pointermove", (event) => {
        if (!isDragging) return;
        moveHandler(event);
        event.preventDefault();
    });
    window.addEventListener("pointerup", (event) => {
        if (!isDragging) return;
        isDragging = false;
        element.releasePointerCapture?.(event.pointerId);
        event.preventDefault();
    });
}

// Updates the saturation and value of the color picker based on the cursor's position
function updateSaturationAndValueFromCursor(event) {
    if (isActiveEditingLocked()) return;
    const saturationValueArea = document.getElementById("sv");
    if (!saturationValueArea) return;
    const bounds = saturationValueArea.getBoundingClientRect();
    const cursorX = event.clientX - bounds.left;
    const cursorY = event.clientY - bounds.top;
    const saturationTravel = saturationValueArea.clientWidth - 2 * svCursorInset;
    const valueTravel = saturationValueArea.clientHeight - 2 * svCursorInset;
    if (saturationTravel <= 0 || valueTravel <= 0) {
        return;
    }
    popupState.pickerSaturation = clamp((cursorX - svCursorInset) / saturationTravel);
    popupState.pickerValue = clamp(1 - (cursorY - svCursorInset) / valueTravel);

    applyPickerColorToSelectedOption();
    updateAll();
    scheduleThemeSave();
    scheduleSelectedPanelUpdate();
}

// Updates the hue of the color picker based on the slider's position
function updateHueFromSlider(event) {
    if (isActiveEditingLocked()) return;
    const hueSlider = document.getElementById("hue");
    if (!hueSlider) return;
    const bounds = hueSlider.getBoundingClientRect();
    const sliderX = event.clientX - bounds.left;
    const sliderWidth = hueSlider.clientWidth;
    if (sliderWidth <= 0) return;
    popupState.pickerHue = clamp(sliderX / sliderWidth) * 360;
    if (popupState.pickerHue >= 360) {
        popupState.pickerHue = 359.999;
    }

    applyPickerColorToSelectedOption();
    updateAll();
    scheduleThemeSave();
    scheduleSelectedPanelUpdate();
}

// Helper function that updates the color picker to match the selected object color and saves the theme
function selectPanelColor(panelName, colorKey, shouldSave = true, shouldSetPanel = true) {
    const colorState = popupState.colors[panelName]?.[colorKey];
    if (!colorState) return;
    popupState.selectedPanel = panelName;
    popupState.selectedColorKey = colorKey;
    popupState.lastColorKeys[panelName] = colorKey;
    if (shouldSetPanel) {
        popupState.activeColorPanel = panelName;
    }
    popupState.pickerHue = colorState.h;
    popupState.pickerSaturation = colorState.s;
    popupState.pickerValue = colorState.v;
    if (shouldSave) {
        scheduleThemeSave();
    }
    updateAll();
}

// Copies the picker's current color to the object's color for display and saves the theme
function applyPickerColorToSelectedOption() {
    if (isActiveEditingLocked()) return;
    const colorState = getSelectedColorState();
    if (!colorState) return;
    colorState.h = popupState.pickerHue;
    colorState.s = popupState.pickerSaturation;
    colorState.v = popupState.pickerValue;
    colorState.hex = getCurrentPickerHex();
}

// Helper function that gets the default hex value of the selected object's color
function getSelectedDefaultHex() {
    return getSelectedColorState()?.defaultHex || "#FFFFFF";
}

// Creates the payload for applying one game's colors to the user's active browser tab
function buildPanelColorPayload(panelName) {
    const payload = {};
    for (const [colorKey, colorState] of Object.entries(popupState.colors[panelName] || {})) {
        payload[colorKey] = colorState.hex;
    }
    return payload;
}

// Applies one game's current colors to the user's active browser tab
function sendPanelColorsNow(panelName) {
    sendMessageToActiveTab({
        action: applyGameColorsAction,
        panel: panelName,
        colors: buildPanelColorPayload(panelName)
    });
}

// Applies the colors of whichever game owns the selected color to the user's active browser tab
function sendSelectedPanelColorsNow() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return;
    sendPanelColorsNow(popupState.selectedPanel);
}

// Delays the sending of one game's colors by 35ms to prevent unnecessary messages while dragging the color picker
function schedulePanelUpdate(panelName) {
    clearTimeout(popupState.panelUpdateTimerIds[panelName]);
    popupState.panelUpdateTimerIds[panelName] = setTimeout(() => { sendPanelColorsNow(panelName); }, 35);
}

// Delays the sending of the selected game's colors the same way, for whichever panel the picker is on
function scheduleSelectedPanelUpdate() {
    if (!popupState.selectedPanel || !popupState.selectedColorKey) return;
    schedulePanelUpdate(popupState.selectedPanel);
}

// Saves the current theme to storage
function saveThemeNow() {
    const themeData = {presetMeta: {}};
    for (const panelName of colorPanelNames) {
        themeData.presetMeta[panelName] = popupState.presetMeta[panelName];
        const panelConfig = colorPanelConfig[panelName];
        themeData[panelConfig.presetsStorageField] = serializeCustomPresets(popupState.customColors[panelName]);
        themeData[panelConfig.presetStorageField] = popupState.activePresets[panelName];
        themeData[panelConfig.activeKeyStorageField] = popupState.lastColorKeys[panelName];
    }
    saveTheme(themeData);
}

// Stores only the colors a preset changes from the default colors (NYT base light theme)
function serializeCustomPresets(presetMaps) {
    const serialized = {};
    for (const presetName of customPresetNames) {
        const presetMap = presetMaps[presetName] || {};
        const changedColors = {};
        for (const [colorKey, colorState] of Object.entries(presetMap)) {
            if (colorState.hex === colorState.defaultHex) continue;
            changedColors[colorKey] = {
                h: Math.round(colorState.h * 100) / 100,
                s: Math.round(colorState.s * 10000) / 10000,
                v: Math.round(colorState.v * 10000) / 10000,
                hex: colorState.hex
            };
        }
        serialized[presetName] = changedColors;
    }
    return serialized;
}

// Delays the theme saving to storage by 250ms to prevent unnecessary messages while dragging the color picker
function scheduleThemeSave() {
    clearTimeout(popupState.saveTimerId);
    popupState.saveTimerId = setTimeout(() => { saveThemeNow(); }, 250);
}

// Bumped if the code format ever changes so old codes can be rejected with a clear reason
const presetCodeVersion = 1;

// Returns whatever panel and slot the user is on
function getActivePresetContext() {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    return {
        kind: panelName,
        presetName,
        presetMaps: popupState.customColors[panelName],
        prebuilt: isPrebuiltPreset(presetName),
        locked: isPanelEditingLocked(panelName)
    };
}

// Packs the active preset into a base64 code for import/export
function buildPresetCode() {
    const {kind} = getActivePresetContext();
    const colors = {};
    for (const [colorKey, colorState] of Object.entries(popupState.colors[kind] || {})) {
        colors[colorKey] = colorState.hex;
    }
    return btoa(JSON.stringify({v: presetCodeVersion, kind, colors}));
}

// Unpacks a base64 code, returning either the colors preset or an error message
function readPresetCode(code) {
    let payload;
    try {
        payload = JSON.parse(atob(String(code).trim()));
    } catch {
        return {error: "Code could not be read. Check that it was copied correctly."};
    }
    if (!payload || payload.v !== presetCodeVersion) {
        return {error: "Code came from a different version of the extension."};
    }
    const {kind} = getActivePresetContext();
    if (payload.kind !== kind) {
        const codePanel = colorPanelConfig[payload.kind]?.label;
        if (!codePanel) {
            return {error: "Code came from a different version of the extension."};
        }
        return {error: "This is " + codePanel + " code. Switch to the " + codePanel + " tab to load it."};
    }
    return {colors: payload.colors || {}};
}

// Writes decoded colors into the selected preset and skips any key this version doesn't know about
function applyPresetCode(colors) {
    const {presetMaps, presetName} = getActivePresetContext();
    const presetMap = presetMaps[presetName];
    if (!presetMap) return;
    for (const [colorKey, hexValue] of Object.entries(colors)) {
        const colorState = presetMap[colorKey];
        if (!colorState) continue;
        const hex = normalizeHexColor(hexValue);
        const hsv = hex && hexToHsv(hex);
        if (!hsv) continue;
        colorState.h = hsv.h;
        colorState.s = hsv.s;
        colorState.v = hsv.v;
        colorState.hex = hex;
    }
    refreshAfterPresetWrite();
}

// Puts every color in the active preset back to its default
function clearActivePreset() {
    const {presetMaps, presetName} = getActivePresetContext();
    const presetMap = presetMaps[presetName];
    if (!presetMap) return;
    for (const colorState of Object.values(presetMap)) {
        const defaultHsv = hexToHsv(colorState.defaultHex) || {h: 0, s: 0, v: 1};
        colorState.h = defaultHsv.h;
        colorState.s = defaultHsv.s;
        colorState.v = defaultHsv.v;
        colorState.hex = colorState.defaultHex;
    }
    refreshAfterPresetWrite();
}

// Resyncs the picker, persists, redraws and pushes colors to the page
function refreshAfterPresetWrite() {
    syncPickerToSelectedColor();
    saveThemeNow();
    updateAll();
    sendSelectedPanelColorsNow();
}

// Opens the dialog that renames the active custom preset and gives it a color dot in the dropdown
function openEditPresetModal() {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    openModal({
        title: "Edit Preset",
        message: `Rename this preset and give it a color in the list. This only changes the appearance in the popup's dropdown and does not affect the board colors for ${colorPanelConfig[panelName].label}.`,
        showFields: true,
        confirmLabel: "Save",
        cancelLabel: "Cancel",
        focus: "name",
        onOpen: (modal) => {
            modal.presetName.value = getPresetDisplayName(panelName, presetName);
            modal.presetName.placeholder = presetLabels[presetName];
            modal.presetColor.value = (getCustomPresetColor(panelName, presetName) || customPresetSwatch).slice(1);
            updateEditSwatch();
        },
        onConfirm: saveEditedPreset
    });
}

// Opens the dialog that changes the active preset's details into a shareable code
function openExportPresetModal() {
    const {prebuilt, presetName} = getActivePresetContext();
    openModal({
        title: prebuilt ? "Export Prebuilt Preset" : "Export Preset",
        message: prebuilt
            ? `This is the ${presetLabels[presetName]} preset code. ${presetLabels[presetName]} itself cannot be edited, so load this code into one of your custom slots to make your own version of it.`
            : "This is your preset code. Copy it and make sure to store it to be able to share this preset.",
        code: {value: buildPresetCode(), readOnly: true},
        confirmLabel: "Done",
        focus: "code-select"
    });
}

// Opens the dialog that replaces someone else's preset details into the active slot
function openImportPresetModal() {
    openModal({
        title: "Import Preset",
        message: "Paste in the code that was given to you on preset export.",
        code: {value: "", readOnly: false},
        confirmLabel: "Load",
        cancelLabel: "Cancel",
        focus: "code",
        onConfirm: (modal) => {
            const result = readPresetCode(modal.code.value);
            if (result.error) return result;
            applyPresetCode(result.colors);
            showHeaderToast("Imported preset via code");
        }
    });
}

// Opens the dialog that puts every color and its name in the active preset back to its default
function openClearPresetModal() {
    openModal({
        title: "Clear Preset",
        message: "Are you sure you want to clear this preset? Every color in it goes back to the light default. This CANNOT be undone!",
        confirmLabel: "Clear",
        cancelLabel: "Cancel",
        focus: "cancel",
        onConfirm: () => {
            clearActivePreset();
            showHeaderToast("Cleared preset to default");
        }
    });
}

// Keeps the dialog's dot synced with whatever hex has been typed
function updateEditSwatch() {
    const modal = getModalElements();
    if (!modal.presetSwatch) return;
    const hex = normalizeHexColor(modal.presetColor.value);
    modal.presetSwatch.style.background = hex || "transparent";
}

// Reads the edit dialog, rejects a bad hex if needed, and writes the name and color onto the active slot
function saveEditedPreset(modal) {
    const panelName = popupState.activeColorPanel;
    const presetName = popupState.activePresets[panelName];
    if (!customPresetNames.includes(presetName)) return {error: "Only custom presets can be renamed."};
    const hex = normalizeHexColor(modal.presetColor.value);
    if (!hex) return {error: "That is not a valid hex color. Use six characters, for example 8FBCE8."};
    const typedName = modal.presetName.value.trim().slice(0, presetNameMaxLength);
    popupState.presetMeta[panelName][presetName] = {
        name: typedName || presetLabels[presetName],
        color: hex
    };
    saveThemeNow();
    updateAll();
    return {};
}

// Wires the edit, import, export and clear buttons to their dialogs
function attachPresetActionHandlers() {
    document.getElementById("editPreset")?.addEventListener("click", openEditPresetModal);
    document.getElementById("exportPreset")?.addEventListener("click", openExportPresetModal);
    document.getElementById("importPreset")?.addEventListener("click", openImportPresetModal);
    document.getElementById("clearPreset")?.addEventListener("click", openClearPresetModal);
    getModalElements().presetColor?.addEventListener("input", updateEditSwatch);
}
