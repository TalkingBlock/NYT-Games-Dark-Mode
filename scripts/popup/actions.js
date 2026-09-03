// Import functions and variables
import {popupState} from "./states.js";
import {
    popupActivePageStorageKey, popupActiveColorPanelStorageKey,
    lightCrosswordColors, darkCrosswordColors,
    lightSudokuColors, darkSudokuColors,
    dmToggleConfig, dmToggleGroups, cwColorsStorageKey,
    dmGroupMasterStorageKeys, syncDarkModeAction, legacyGroupStorageKeys, popupStorageKeys, pageButtons, svCursorInset
} from "./defaultExports.js";
import {clamp, hexToHsv, normalizeHexColor, hsvToHex} from "./colorMath.js";
import {saveTheme, readSyncValues, writeSyncValue, removeSyncValues, sendMessageToActiveTab} from "./storage.js";
import {updateAll, updateScrollAffordance} from "./updater.js";

// Call from main.js which starts the popup and calls all functions to display it
export async function initializePopup() {
    const [savedValues] = await Promise.all([
        readSyncValues(popupStorageKeys),
        removeSyncValues(legacyGroupStorageKeys)
    ]);
    loadSavedPageState(savedValues);
    loadDMToggleStates(savedValues);
    loadSavedColorPanelState(savedValues);
    loadThemeState(savedValues[cwColorsStorageKey] || null);
    attachPageButtonHandlers();
    attachGameColorPanelHandlers();
    attachGameColorObjectHandlers();
    attachColorPresetHandlers();
    attachDMToggleHandlers();
    attachPickerHandlers();
    attachClipboardHandlers();
    attachResetHandler();
    attachColorPanelScrollHandlers();
    updateAll();
}

// Keeps the scroll affordance for color options synced while scrolling
function attachColorPanelScrollHandlers() {
    document.querySelectorAll(".color-info-panel").forEach((colorPanel) => {
        colorPanel.addEventListener("scroll", () => {
            updateScrollAffordance();
        });
    });
}

// Loads the page state from storage and displays whatever page is active
function loadSavedPageState(savedValues) {
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

// Helper function that loads the color panel from storage
function loadSavedColorPanelState(savedValues) {
    const savedPanel = savedValues[popupActiveColorPanelStorageKey];
    if (savedPanel === "crosswords" || savedPanel === "sudoku") {
        popupState.activeColorPanel = savedPanel;
    }
}

// Loads and applies the crossword and sudoku color themes from storage
function loadThemeState(savedTheme) {
    loadColorCollection({
        selector: "#panel-crosswords .color-option[data-key]",
        defaults: lightCrosswordColors,
        savedColors: savedTheme?.crosswords || {},
        targetMap: popupState.customCrosswordColors
    });
    loadColorCollection({
        selector: "#panel-sudoku .color-option[data-key]",
        defaults: lightSudokuColors,
        savedColors: savedTheme?.sudoku || {},
        targetMap: popupState.customSudokuColors
    });
    const savedPreset = savedTheme?.crosswordPreset;
    popupState.activeCrosswordPreset =
        savedPreset === "dark" || savedPreset === "custom" ? savedPreset : "light";
    buildActiveCrosswordColors();
    const savedSudokuPreset = savedTheme?.sudokuPreset;
    popupState.activeSudokuPreset =
        savedSudokuPreset === "dark" || savedSudokuPreset === "custom" ? savedSudokuPreset : "light";
    buildActiveSudokuColors();
    popupState.lastCrosswordColorKey = resolveColorKey(
        savedTheme?.activeCrosswordKey,
        popupState.crosswordColors
    );
    popupState.lastSudokuColorKey = resolveColorKey(
        savedTheme?.activeSudokuKey,
        popupState.sudokuColors
    );
    selectColorForActivePanel(false);
}

// Helper function that returns the saved key if it still exists, otherwise the first available one
function resolveColorKey(savedKey, colorMap) {
    if (savedKey && colorMap[savedKey]) return savedKey;
    return Object.keys(colorMap)[0] || null;
}

// Selects the remembered color of whichever color panel is currently displayed
function selectColorForActivePanel(shouldSave = true) {
    if (popupState.activeColorPanel === "sudoku") {
        const sudokuColorKey = resolveColorKey(popupState.lastSudokuColorKey, popupState.sudokuColors);
        if (sudokuColorKey) {
            selectSudokuColor(sudokuColorKey, shouldSave, false);
        }
        return;
    }
    const crosswordColorKey = resolveColorKey(popupState.lastCrosswordColorKey, popupState.crosswordColors);
    if (crosswordColorKey) {
        selectCrosswordColor(crosswordColorKey, shouldSave, false);
    }
}

// Helper function for loadThemeState() that loads all colors for the targetted game
function loadColorCollection({selector, defaults, savedColors, targetMap}) {
    document.querySelectorAll(selector).forEach((colorOption) => {
        const colorKey = colorOption.dataset.key;
        const defaultHex = (defaults[colorKey] || "#FFFFFF").toUpperCase();
        const savedColor = savedColors[colorKey];
        if (savedColor) {
            targetMap[colorKey] = {
                h: savedColor.h ?? 0,
                s: savedColor.s ?? 0,
                v: savedColor.v ?? 1,
                hex: (savedColor.hex || defaultHex).toUpperCase(),
                defaultHex
            };
        } else {
            const defaultHsv = hexToHsv(defaultHex) || {h: 0, s: 0, v: 1};
            targetMap[colorKey] = {
                h: defaultHsv.h,
                s: defaultHsv.s,
                v: defaultHsv.v,
                hex: defaultHex,
                defaultHex
            };
        }
    });
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

// Points popupState.crosswordColors at the palette for the active preset.
function buildActiveCrosswordColors() {
    if (popupState.activeCrosswordPreset === "custom") {
        popupState.crosswordColors = popupState.customCrosswordColors;
    } else if (popupState.activeCrosswordPreset === "dark") {
        popupState.crosswordColors = buildColorStateMap(darkCrosswordColors);
    } else {
        popupState.crosswordColors = buildColorStateMap(lightCrosswordColors);
    }
}

// Returns true when the selected crossword color cannot be edited
function isCrosswordEditingLocked() {
    return popupState.activeCrosswordPreset !== "custom";
}

// Switches the active crossword preset, rebuilds the displayed colors, applies and saves
function applyCrosswordPreset(presetName) {
    if (presetName !== "light" && presetName !== "dark" && presetName !== "custom") return;
    popupState.activeCrosswordPreset = presetName;
    buildActiveCrosswordColors();
    if (!popupState.selectedCrosswordColorKey || !popupState.crosswordColors[popupState.selectedCrosswordColorKey]) {
        popupState.selectedCrosswordColorKey = resolveColorKey(popupState.lastCrosswordColorKey, popupState.crosswordColors);
    }
    popupState.lastCrosswordColorKey = popupState.selectedCrosswordColorKey;
    const selectedColor = popupState.crosswordColors[popupState.selectedCrosswordColorKey];
    if (selectedColor) {
        popupState.pickerHue = selectedColor.h;
        popupState.pickerSaturation = selectedColor.s;
        popupState.pickerValue = selectedColor.v;
    }
    saveThemeNow();
    sendCrosswordColorsNow();
    updateAll();
}

// Points popupState.sudokuColors at the palette for the active preset
function buildActiveSudokuColors() {
    if (popupState.activeSudokuPreset === "custom") {
        popupState.sudokuColors = popupState.customSudokuColors;
    } else if (popupState.activeSudokuPreset === "dark") {
        popupState.sudokuColors = buildColorStateMap(darkSudokuColors);
    } else {
        popupState.sudokuColors = buildColorStateMap(lightSudokuColors);
    }
}

// Returns true when the selected sudoku color cannot be edited
function isSudokuEditingLocked() {
    return popupState.activeSudokuPreset !== "custom";
}

// Returns true when the selected color is on a non-editable preset
function isActiveEditingLocked() {
    return Boolean(
        (popupState.selectedCrosswordColorKey && isCrosswordEditingLocked()) ||
        (popupState.selectedSudokuColorKey && isSudokuEditingLocked())
    );
}

// Switches the active sudoku preset, rebuilds the displayed colors, applies and saves
function applySudokuPreset(presetName) {
    if (presetName !== "light" && presetName !== "dark" && presetName !== "custom") return;
    popupState.activeSudokuPreset = presetName;
    buildActiveSudokuColors();
    if (!popupState.selectedSudokuColorKey || !popupState.sudokuColors[popupState.selectedSudokuColorKey]) {
        popupState.selectedSudokuColorKey = resolveColorKey(popupState.lastSudokuColorKey, popupState.sudokuColors);
    }
    popupState.lastSudokuColorKey = popupState.selectedSudokuColorKey;
    const selectedColor = popupState.sudokuColors[popupState.selectedSudokuColorKey];
    if (selectedColor) {
        popupState.pickerHue = selectedColor.h;
        popupState.pickerSaturation = selectedColor.s;
        popupState.pickerValue = selectedColor.v;
    }
    saveThemeNow();
    sendSudokuColorsNow();
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

// Allows for the toggling between crossword color presets
function attachColorPresetHandlers() {
    document.querySelectorAll(".color-preset").forEach((presetButton) => {
        presetButton.addEventListener("click", () => {
            const presetName = presetButton.dataset.preset;
            if (!presetName) return;
            if (popupState.activeColorPanel === "sudoku") {
                applySudokuPreset(presetName);
            } else {
                applyCrosswordPreset(presetName);
            }
        });
    });
}

// Allows for the toggling between game color objects
function attachGameColorObjectHandlers() {
    document.querySelectorAll("#panel-crosswords .color-option input[type='radio']").forEach((radioInput) => {
        radioInput.addEventListener("change", () => {
            if (!radioInput.checked) return;
            const colorOption = radioInput.closest(".color-option");
            const colorKey = colorOption?.dataset.key;
            if (!colorKey) return;
            selectCrosswordColor(colorKey);
        });
    });
    document.querySelectorAll("#panel-sudoku .color-option input[type='radio']").forEach((radioInput) => {
        radioInput.addEventListener("change", () => {
            if (!radioInput.checked) return;
            const colorOption = radioInput.closest(".color-option");
            const colorKey = colorOption?.dataset.key;
            if (!colorKey) return;
            selectSudokuColor(colorKey);
        });
    });
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
            updateAll();
        });
    }
    for (const groupToggleId of Object.keys(dmToggleGroups)) {
        const groupToggle = document.getElementById(groupToggleId);
        if (!groupToggle) continue;
        groupToggle.addEventListener("change", async () => {
            await writeSyncValue(dmGroupMasterStorageKeys[groupToggleId], groupToggle.checked);
            sendMessageToActiveTab({ action: syncDarkModeAction });
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

// Shows an action success message next to the hex actions for 2.5 seconds
function showHexFeedback(message) {
    const indicator = document.getElementById("hexIndicator");
    if (!indicator) return;
    indicator.textContent = message;
    indicator.classList.add("visible");
    clearTimeout(popupState.hexFeedbackTimerId);
    popupState.hexFeedbackTimerId = setTimeout(() => {
        indicator.classList.remove("visible");
    }, 2500);
}

// Allows for copying and pasting of the current color picker's hex value
function attachClipboardHandlers() {
    const copyButton = document.getElementById("copyHex");
    const pasteButton = document.getElementById("pasteHex");

    copyButton?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(getCurrentPickerHex());
            showHexFeedback("Copied!");
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
            showHexFeedback("Pasted!");
            if (popupState.selectedCrosswordColorKey) {
                sendCrosswordColorsNow();
            }
            if (popupState.selectedSudokuColorKey) {
                sendSudokuColorsNow();
            }
        } catch (error) {
            console.error("Error pasting hex: ", error, error?.name, error?.message);
        }
    });
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
        showHexFeedback("Reset!");
        if (popupState.selectedCrosswordColorKey) {
            sendCrosswordColorsNow();
        }
        if (popupState.selectedSudokuColorKey) {
            sendSudokuColorsNow();
        }
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
    if (popupState.selectedCrosswordColorKey) {
        scheduleCrosswordUpdate();
    }
    if (popupState.selectedSudokuColorKey) {
        scheduleSudokuUpdate();
    }
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
    if (popupState.selectedCrosswordColorKey) {
        scheduleCrosswordUpdate();
    }
    if (popupState.selectedSudokuColorKey) {
        scheduleSudokuUpdate();
    }
}

// Helper function that updates the color picker to match the selected crossword object color and saves the theme
function selectCrosswordColor(colorKey, shouldSave = true, shouldSetPanel = true) {
    const colorState = popupState.crosswordColors[colorKey];
    if (!colorState) return;
    popupState.selectedCrosswordColorKey = colorKey;
    popupState.lastCrosswordColorKey = colorKey;
    popupState.selectedSudokuColorKey = null;
    if (shouldSetPanel) {
        popupState.activeColorPanel = "crosswords";
    }
    popupState.pickerHue = colorState.h;
    popupState.pickerSaturation = colorState.s;
    popupState.pickerValue = colorState.v;
    if (shouldSave) {
        scheduleThemeSave();
    }
    updateAll();
}

// Helper function that updates the color picker to match the selected sudoku object color and saves the theme
function selectSudokuColor(colorKey, shouldSave = true, shouldSetPanel = true) {
    const colorState = popupState.sudokuColors[colorKey];
    if (!colorState) return;
    popupState.selectedSudokuColorKey = colorKey;
    popupState.lastSudokuColorKey = colorKey;
    popupState.selectedCrosswordColorKey = null;
    if (shouldSetPanel) {
        popupState.activeColorPanel = "sudoku";
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
    const currentHex = getCurrentPickerHex();
    if (popupState.selectedCrosswordColorKey && !isCrosswordEditingLocked()) {
        const colorState = popupState.crosswordColors[popupState.selectedCrosswordColorKey];
        if (colorState) {
            colorState.h = popupState.pickerHue;
            colorState.s = popupState.pickerSaturation;
            colorState.v = popupState.pickerValue;
            colorState.hex = currentHex;
        }
    }
    if (popupState.selectedSudokuColorKey && !isSudokuEditingLocked()) {
        const colorState = popupState.sudokuColors[popupState.selectedSudokuColorKey];
        if (colorState) {
            colorState.h = popupState.pickerHue;
            colorState.s = popupState.pickerSaturation;
            colorState.v = popupState.pickerValue;
            colorState.hex = currentHex;
        }
    }
}

// Helper function that gets the current hex value of the color picker
function getCurrentPickerHex() {
    return hsvToHex(
        popupState.pickerHue,
        popupState.pickerSaturation,
        popupState.pickerValue
    );
}

// Helper function that gets the default hex value of the selected object's color
function getSelectedDefaultHex() {
    if (popupState.selectedCrosswordColorKey) {
        return popupState.crosswordColors[popupState.selectedCrosswordColorKey]?.defaultHex || "#FFFFFF";
    }
    if (popupState.selectedSudokuColorKey) {
        return popupState.sudokuColors[popupState.selectedSudokuColorKey]?.defaultHex || "#FFFFFF";
    }
    return "#FFFFFF";
}

// Creates the payload for applying crossword colors to the user's active browser tab
function buildCrosswordColorPayload() {
    const payload = {};
    for (const [colorKey, colorState] of Object.entries(popupState.crosswordColors)) {
        payload[colorKey] = colorState?.hex || darkCrosswordColors[colorKey];
    }
    return payload;
}

// Creates the payload for applying sudoku colors to the user's active browser tab
function buildSudokuColorPayload() {
    const payload = {};
    for (const [colorKey, colorState] of Object.entries(popupState.sudokuColors)) {
        payload[colorKey] = colorState?.hex || darkSudokuColors[colorKey];
    }
    return payload;
}

// Applies the current crossword colors to the user's active browser tab
function sendCrosswordColorsNow() {
    sendMessageToActiveTab({
        action: "applyCrosswordColors",
        colors: buildCrosswordColorPayload()
    });
}

// Applies the current sudoku colors to the user's active browser tab
function sendSudokuColorsNow() {
    sendMessageToActiveTab({
        action: "applySudokuColors",
        colors: buildSudokuColorPayload()
    });
}

// Delays the sending of the crossword colors by 35ms to prevent unnecessary messages while dragging the color picker
function scheduleCrosswordUpdate() {
    clearTimeout(popupState.crosswordUpdateTimerId);
    popupState.crosswordUpdateTimerId = setTimeout(() => { sendCrosswordColorsNow(); }, 35);
}

// Delays the sending of the sudoku colors by 35ms to prevent unnecessary messages while dragging the color picker
function scheduleSudokuUpdate() {
    clearTimeout(popupState.sudokuUpdateTimerId);
    popupState.sudokuUpdateTimerId = setTimeout(() => { sendSudokuColorsNow(); }, 35);
}

// Saves the current theme to storage
function saveThemeNow() {
    saveTheme({
        crosswords: popupState.customCrosswordColors,
        crosswordPreset: popupState.activeCrosswordPreset,
        sudoku: popupState.customSudokuColors,
        sudokuPreset: popupState.activeSudokuPreset,
        activeCrosswordKey: popupState.lastCrosswordColorKey,
        activeSudokuKey: popupState.lastSudokuColorKey
    });
}

// Delays the theme saving to storage by 250ms to prevent unnecessary messages while dragging the color picker
function scheduleThemeSave() {
    clearTimeout(popupState.saveTimerId);
    popupState.saveTimerId = setTimeout(() => { saveThemeNow(); }, 250);
}