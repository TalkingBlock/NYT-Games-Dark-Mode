// Import functions and variables
import {popupState} from "./states.js";
import {
    popupActivePageStorageKey, popupActiveColorPanelStorageKey,
    lightCrosswordColors, darkCrosswordColors,
    lightSudokuColors, darkSudokuColors,
    dmToggleConfig, dmToggleGroups, cwColorsStorageKey,
    dmGroupMasterStorageKeys, legacyGroupStorageKeys, popupStorageKeys,
    displayPresetName, customPresetNames, displayPresetToggleIds, 
    syncDarkModeAction, pageButtons, svCursorInset,
    hexActionCheckIcon, hexActionCheckDuration
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
    attachHexInputHandlers();
    attachResetHandler();
    attachColorPanelScrollHandlers();
    attachPresetActionHandlers();
    loadVersionLabel();
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
    loadCustomPresets({
        selector: "#panel-crosswords .color-option[data-key]",
        defaults: lightCrosswordColors,
        savedPresets: normalizeSavedPresets(savedTheme?.crosswords),
        targetMap: popupState.customCrosswordColors
    });
    loadCustomPresets({
        selector: "#panel-sudoku .color-option[data-key]",
        defaults: lightSudokuColors,
        savedPresets: normalizeSavedPresets(savedTheme?.sudoku),
        targetMap: popupState.customSudokuColors
    });
    popupState.activeCrosswordPreset = resolvePresetName(savedTheme?.crosswordPreset);
    buildActiveCrosswordColors();
    popupState.activeSudokuPreset = resolvePresetName(savedTheme?.sudokuPreset);
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

// Returns the saved preset if it is still one the popup offers, otherwise the display one.
function resolvePresetName(savedPreset) {
    if (customPresetNames.includes(savedPreset)) return savedPreset;
    if (savedPreset === "custom") return customPresetNames[0];
    return displayPresetName;
}

// Fixes previous versions of popup that had only one preset slot (now saved in slot 1)
function normalizeSavedPresets(savedColors) {
    if (!savedColors || typeof savedColors !== "object") return {};
    if (customPresetNames.some((presetName) => presetName in savedColors)) return savedColors;
    if (!Object.keys(savedColors).length) return {};
    return {[customPresetNames[0]]: savedColors};
}

// Helper function for loadThemeState() that creates all three custom preset maps for one game.
function loadCustomPresets({selector, defaults, savedPresets, targetMap}) {
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
}

// Previews whichever palette the dark mode toggles are enabled for the display preset
function isDisplayPresetDark(panelName) {
    const groupToggle = document.getElementById("games-main");
    if (groupToggle && !groupToggle.checked) return false;
    return (displayPresetToggleIds[panelName] || []).some(
        (toggleId) => document.getElementById(toggleId)?.checked
    );
}

// Rebuilds the display preset's colors after a dark mode change so the preview gets updated
function refreshDisplayPresetColors() {
    let didRebuild = false;
    if (popupState.activeCrosswordPreset === displayPresetName) {
        buildActiveCrosswordColors();
        didRebuild = true;
    }
    if (popupState.activeSudokuPreset === displayPresetName) {
        buildActiveSudokuColors();
        didRebuild = true;
    }
    if (!didRebuild) return;
    const colorState = popupState.selectedSudokuColorKey
        ? popupState.sudokuColors[popupState.selectedSudokuColorKey]
        : popupState.crosswordColors[popupState.selectedCrosswordColorKey];
    if (!colorState) return;
    popupState.pickerHue = colorState.h;
    popupState.pickerSaturation = colorState.s;
    popupState.pickerValue = colorState.v;
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

// Points popupState.crosswordColors at the palette for the active preset
function buildActiveCrosswordColors() {
    if (popupState.activeCrosswordPreset === displayPresetName) {
        popupState.crosswordColors = buildColorStateMap(
            isDisplayPresetDark("crosswords") ? darkCrosswordColors : lightCrosswordColors
        );
    } else {
        popupState.crosswordColors = popupState.customCrosswordColors[popupState.activeCrosswordPreset];
    }
}

// Returns true when the selected crossword color cannot be edited
function isCrosswordEditingLocked() {
    return popupState.activeCrosswordPreset === displayPresetName;
}

// Switches the active crossword preset, rebuilds the displayed colors, applies and saves
function applyCrosswordPreset(presetName) {
    if (presetName !== displayPresetName && !customPresetNames.includes(presetName)) return;
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
    updateAll();
}

// Points popupState.sudokuColors at the palette for the active preset
function buildActiveSudokuColors() {
    if (popupState.activeSudokuPreset === displayPresetName) {
        popupState.sudokuColors = buildColorStateMap(
            isDisplayPresetDark("sudoku") ? darkSudokuColors : lightSudokuColors
        );
    } else {
        popupState.sudokuColors = popupState.customSudokuColors[popupState.activeSudokuPreset];
    }
}

// Returns true when the selected sudoku color cannot be edited
function isSudokuEditingLocked() {
    return popupState.activeSudokuPreset === displayPresetName;
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
    if (presetName !== displayPresetName && !customPresetNames.includes(presetName)) return;
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

// Makes all buttons have their own timer so two buttons can show a checkmark at the same time
const hexActionCheckTimers = new WeakMap();

// Switches a hex action button's icon to a checkmark as interaction confirmation, then puts it back
function showHexActionCheck(button) {
    const icon = button?.querySelector("img");
    if (!icon) return;
    if (!icon.dataset.defaultIcon) {
        icon.dataset.defaultIcon = icon.getAttribute("src");
    }
    icon.setAttribute("src", hexActionCheckIcon);
    button.classList.add("confirmed");
    clearTimeout(hexActionCheckTimers.get(button));
    hexActionCheckTimers.set(button, setTimeout(() => {
        icon.setAttribute("src", icon.dataset.defaultIcon);
        button.classList.remove("confirmed");
    }, hexActionCheckDuration));
}

// Allows for copying and pasting of the current color picker's hex value
function attachClipboardHandlers() {
    const copyButton = document.getElementById("copyHex");
    const pasteButton = document.getElementById("pasteHex");

    copyButton?.addEventListener("click", async () => {
        try {
            await navigator.clipboard.writeText(getCurrentPickerHex());
            showHexActionCheck(copyButton);
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
            showHexActionCheck(pasteButton);
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
    if (popupState.selectedCrosswordColorKey) {
        sendCrosswordColorsNow();
    }
    if (popupState.selectedSudokuColorKey) {
        sendSudokuColorsNow();
    }
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
        showHexActionCheck(resetButton);
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
        crosswords: serializeCustomPresets(popupState.customCrosswordColors),
        crosswordPreset: popupState.activeCrosswordPreset,
        sudoku: serializeCustomPresets(popupState.customSudokuColors),
        sudokuPreset: popupState.activeSudokuPreset,
        activeCrosswordKey: popupState.lastCrosswordColorKey,
        activeSudokuKey: popupState.lastSudokuColorKey
    });
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
    const onSudoku = popupState.activeColorPanel === "sudoku";
    return {
        kind: onSudoku ? "sudoku" : "crosswords",
        presetName: onSudoku ? popupState.activeSudokuPreset : popupState.activeCrosswordPreset,
        presetMaps: onSudoku ? popupState.customSudokuColors : popupState.customCrosswordColors,
        locked: onSudoku ? isSudokuEditingLocked() : isCrosswordEditingLocked()
    };
}

// Packs the active preset into a base64 code for import/export
function buildPresetCode() {
    const {kind, presetMaps, presetName} = getActivePresetContext();
    const colors = {};
    for (const [colorKey, colorState] of Object.entries(presetMaps[presetName] || {})) {
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
        const codePanel = payload.kind === "sudoku" ? "Sudoku" : "Crosswords";
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
    const colorState = popupState.selectedSudokuColorKey
        ? popupState.sudokuColors[popupState.selectedSudokuColorKey]
        : popupState.crosswordColors[popupState.selectedCrosswordColorKey];
    if (colorState) {
        popupState.pickerHue = colorState.h;
        popupState.pickerSaturation = colorState.s;
        popupState.pickerValue = colorState.v;
    }
    saveThemeNow();
    updateAll();
    if (popupState.selectedCrosswordColorKey) {
        sendCrosswordColorsNow();
    }
    if (popupState.selectedSudokuColorKey) {
        sendSudokuColorsNow();
    }
}

// Variable to know which dialog is currently open
let activeModalMode = null;

// Gets all dialog types
function getModalElements() {
    return {
        overlay: document.getElementById("modalOverlay"),
        title: document.getElementById("modalTitle"),
        message: document.getElementById("modalMessage"),
        code: document.getElementById("modalCode"),
        error: document.getElementById("modalError"),
        confirm: document.getElementById("modalConfirm"),
        cancel: document.getElementById("modalCancel")
    };
}

// Opens the export, import or clear dialog
function openPresetModal(mode) {
    const modal = getModalElements();
    if (!modal.overlay) return;
    activeModalMode = mode;
    modal.error.textContent = "";
    if (mode === "export") {
        modal.title.textContent = "Export Preset";
        modal.message.textContent = "This is your preset code. Copy it and make sure to store it to be able to share this preset.";
        modal.code.classList.remove("hidden");
        modal.code.readOnly = true;
        modal.code.value = buildPresetCode();
        modal.confirm.textContent = "Done";
        modal.cancel.classList.add("hidden");
    } else if (mode === "import") {
        modal.title.textContent = "Import Preset";
        modal.message.textContent = "Paste in the code that was given to you on preset export.";
        modal.code.classList.remove("hidden");
        modal.code.readOnly = false;
        modal.code.value = "";
        modal.confirm.textContent = "Load";
        modal.cancel.textContent = "Cancel";
        modal.cancel.classList.remove("hidden");
    } else {
        modal.title.textContent = "Clear Preset";
        modal.message.textContent = "Are you sure you want to clear this preset? Every color in it goes back to the light default. This cannot be undone!";
        modal.code.classList.add("hidden");
        modal.confirm.textContent = "Clear";
        modal.cancel.textContent = "Cancel";
        modal.cancel.classList.remove("hidden");
    }

    modal.overlay.classList.add("open");
    if (mode === "export") {
        modal.code.focus();
        modal.code.select();
    } else if (mode === "import") {
        modal.code.focus();
    } else {
        modal.cancel.focus();
    }
}

// Closes the dialog
function closePresetModal() {
    activeModalMode = null;
    document.getElementById("modalOverlay")?.classList.remove("open");
}

// Wires the import, export and clear buttons to the dialog
function attachPresetActionHandlers() {
    const exportButton = document.getElementById("exportPreset");
    const importButton = document.getElementById("importPreset");
    const clearButton = document.getElementById("clearPreset");
    const modal = getModalElements();
    exportButton?.addEventListener("click", () => openPresetModal("export"));
    importButton?.addEventListener("click", () => openPresetModal("import"));
    clearButton?.addEventListener("click", () => openPresetModal("clear"));

    // These three confirm through the dialog itself, so they do not flash a checkmark
    modal.confirm?.addEventListener("click", () => {
        if (activeModalMode === "export") {
            closePresetModal();
            return;
        }
        if (activeModalMode === "import") {
            const result = readPresetCode(modal.code.value);
            if (result.error) {
                modal.error.textContent = result.error;
                return;
            }
            applyPresetCode(result.colors);
            closePresetModal();
            return;
        }
        if (activeModalMode === "clear") {
            clearActivePreset();
            closePresetModal();
        }
    });

    modal.cancel?.addEventListener("click", closePresetModal);
    modal.overlay?.addEventListener("click", (event) => {
        if (event.target === modal.overlay) closePresetModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && activeModalMode) closePresetModal();
    });
}