// Import functions and variables
import {popupState} from "./states.js";
import {pageButtons, pages, dmToggleGroups, svCursorInset, displayPresetName} from "./defaultExports.js";
import {hsvToHex} from "./colorMath.js";

// Functions to get HTML elements for updating, these are called throughout the file to read and update the popup's DOM
function getCrosswordPanel() {
    return document.getElementById("panel-crosswords");
}
function getSudokuPanel() {
    return document.getElementById("panel-sudoku");
}
function getSaturationValueArea() {
    return document.getElementById("sv");
}
function getHueSlider() {
    return document.getElementById("hue");
}
function getSaturationValueCursor() {
    return document.getElementById("svCursor");
}
function getHueSliderCursor() {
    return document.getElementById("hueCursor");
}
function getPreviewSwatch() {
    return document.getElementById("preview");
}
function getHexOutput() {
    return document.getElementById("hexOut");
}
function getHexOutputText() {
    return document.querySelector("#hexOut .hex-text");
}
function getSaturationValueMask() {
    return document.querySelector("#sv .sv-mask");
}

// Gets the current color from the color picker and converts it into a usable Hex value
function getCurrentPickerHex() {
    return hsvToHex(
        popupState.pickerHue,
        popupState.pickerSaturation,
        popupState.pickerValue
    );
}

// Updates and displays the entire popup based on the popupState properties
export function updateAll() {
    updatePages();
    updateSuspendedGroups();
    updateGameColorButton();
    updateGameColorPanel();
    updateAllGamesColorObjects();
    updatePicker();
    updatePresetUI();
    updateScrollAffordance();
}

// Dims a group whose master switch is off, the games keep their settings and stay clickable but are not being applied
export function updateSuspendedGroups() {
    for (const parentToggleId of Object.keys(dmToggleGroups)) {
        const parentToggle = document.getElementById(parentToggleId);
        if (!parentToggle) continue;
        const subToggles = parentToggle.closest(".section-header")?.parentElement?.querySelector(".sub-toggles");
        if (subToggles) {
            subToggles.classList.toggle("suspended", !parentToggle.checked);
        }
    }
}

// Fades the crosswords/sudoku color options at whichever edge still has more options past it
export function updateScrollAffordance() {
    const panelsContainer = document.querySelector(".color-info-panels");
    if (!panelsContainer) return;
    const visiblePanel = panelsContainer.querySelector(".color-info-panel:not(.hidden)");
    if (!visiblePanel) {
        panelsContainer.classList.remove("can-scroll");
        panelsContainer.classList.remove("can-scroll-up");
        return;
    }
    const remainingScroll =
        visiblePanel.scrollHeight - visiblePanel.scrollTop - visiblePanel.clientHeight;
    panelsContainer.classList.toggle("can-scroll", remainingScroll > 2);
    panelsContainer.classList.toggle("can-scroll-up", visiblePanel.scrollTop > 2);
}

// Updates the preset buttons and dims/locks the color UI when light or dark is active
export function updatePresetUI() {
    const onSudoku = popupState.activeColorPanel === "sudoku";
    const activePreset = onSudoku ? popupState.activeSudokuPreset : popupState.activeCrosswordPreset;
    document.querySelectorAll(".color-preset").forEach((presetButton) => {
        presetButton.classList.toggle("enabled", presetButton.dataset.preset === activePreset);
    });
    const crosswordLocked = popupState.activeCrosswordPreset === displayPresetName;
    const sudokuLocked = popupState.activeSudokuPreset === displayPresetName;
    const crosswordPanel = getCrosswordPanel();
    if (crosswordPanel) {
        crosswordPanel.classList.toggle("preset-locked", crosswordLocked);
    }
    const sudokuPanel = getSudokuPanel();
    if (sudokuPanel) {
        sudokuPanel.classList.toggle("preset-locked", sudokuLocked);
    }
    const hexInput = getHexOutputText();
    if (hexInput) {
        hexInput.readOnly = Boolean(
            (popupState.selectedCrosswordColorKey && crosswordLocked) ||
            (popupState.selectedSudokuColorKey && sudokuLocked)
        );
    }
    const pickerLocked = onSudoku ? sudokuLocked : crosswordLocked;
    const colorPicker = document.querySelector(".color-picker");
    if (colorPicker) {
        colorPicker.classList.toggle("locked", pickerLocked);
    }
    for (const buttonId of ["importPreset", "exportPreset", "clearPreset"]) {
        const actionButton = document.getElementById(buttonId);
        if (actionButton) {
            actionButton.disabled = pickerLocked;
        }
    }
}

// Updates and displays whichever page is active and visible to the user
export function updatePages() {
    pageButtons.forEach((buttonClassName) => {
        const pageButton = document.querySelector(`.${buttonClassName}`);
        if (pageButton) {
            pageButton.classList.toggle("enabled", buttonClassName === popupState.activePageButtonClass);
        }
    });
    pages.forEach((pageClassName) => {
        const page = document.querySelector(`.${pageClassName}`);
        if (!page) return;
        const expectedPageClass = popupState.activePageButtonClass.replace("button", "page");
        page.classList.toggle("hidden", pageClassName !== expectedPageClass);
    });
}

// Updates and displays whichever game color button looks active
export function updateGameColorButton() {
    document.querySelectorAll(".color-info-tab").forEach((panelButton) => {
        panelButton.classList.toggle(
            "enabled",
            panelButton.dataset.colorPanel === popupState.activeColorPanel
        );
    });
}

// Updates and displays whichever game color panel is active and visible to the user
export function updateGameColorPanel() {
    const crosswordPanel = getCrosswordPanel();
    const sudokuPanel = getSudokuPanel();
    if (crosswordPanel) {
        crosswordPanel.classList.toggle("hidden", popupState.activeColorPanel !== "crosswords");
    }
    if (sudokuPanel) {
        sudokuPanel.classList.toggle("hidden", popupState.activeColorPanel !== "sudoku");
    }
}

// Updates and displays and updates all game color objects
export function updateAllGamesColorObjects() {
    updateOneGamesColorObjects("#panel-crosswords .color-option[data-key]", popupState.crosswordColors, popupState.selectedCrosswordColorKey);
    updateOneGamesColorObjects("#panel-sudoku .color-option[data-key]", popupState.sudokuColors, popupState.selectedSudokuColorKey);
}

// Helper function for updateGameColorObject() that updates all game color objects for the given game
function updateOneGamesColorObjects(selector, colorMap, selectedColorKey) {
    document.querySelectorAll(selector).forEach((colorOption) => {
        const colorKey = colorOption.dataset.key;
        const colorState = colorMap[colorKey];
        if (!colorState) return;
        const radioInput = colorOption.querySelector("input[type='radio']");
        const hexLabel = colorOption.querySelector(".element-hex");
        const colorBox = colorOption.querySelector(".element-hex-box");

        if (radioInput) {
            radioInput.checked = colorKey === selectedColorKey;
        }
        if (hexLabel) {
            hexLabel.textContent = colorState.hex;
        }
        if (colorBox) {
            colorBox.style.background = colorState.hex;
        }
    });
}

// Updates and displays the color picker
export function updatePicker() {
    const saturationValueArea = getSaturationValueArea();
    const hueSlider = getHueSlider();
    const saturationValueCursor = getSaturationValueCursor();
    const hueSliderCursor = getHueSliderCursor();
    const previewSwatch = getPreviewSwatch();
    const hexOutput = getHexOutput();
    const hexOutputText = getHexOutputText();
    const saturationValueMask = getSaturationValueMask();
    if (!saturationValueArea || !hueSlider || !saturationValueCursor || !hueSliderCursor || !previewSwatch || !hexOutput) {
        return;
    }

    const currentHex = getCurrentPickerHex();
    const fullHueHex = hsvToHex(popupState.pickerHue, 1, 1);
    if (saturationValueMask) {
        saturationValueMask.style.background = fullHueHex;
    }
    previewSwatch.style.background = currentHex;
    if (hexOutputText) {
        if (document.activeElement !== hexOutputText) {
            hexOutputText.value = currentHex.slice(1);
        }
    } else {
        hexOutput.textContent = currentHex;
    }

    saturationValueCursor.style.background = currentHex;
    const saturationTravel = saturationValueArea.clientWidth - 2 * svCursorInset;
    const valueTravel = saturationValueArea.clientHeight - 2 * svCursorInset;
    if (saturationTravel > 0 && valueTravel > 0) {
        const left = svCursorInset + popupState.pickerSaturation * saturationTravel;
        const top = svCursorInset + (1 - popupState.pickerValue) * valueTravel;
        saturationValueCursor.style.left = `${left}px`;
        saturationValueCursor.style.top = `${top}px`;
    }

    const hueSliderWidth = hueSlider.clientWidth;
    if (hueSliderWidth > 0) {
        const left = (popupState.pickerHue / 360) * hueSliderWidth;
        hueSliderCursor.style.left = `${left}px`;
    }
}