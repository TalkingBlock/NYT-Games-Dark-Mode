// File acts like the popup's memory state, actions.js updates the properties and render.js reads them

export const popupState = {
    activePageButtonClass: "dark-mode-button",
    activeColorPanel: "crosswords",
    activeCrosswordPreset: "light",
    activeSudokuPreset: "light",
    selectedCrosswordColorKey: null,
    selectedSudokuColorKey: null,
    lastCrosswordColorKey: null,
    lastSudokuColorKey: null,
    pickerHue: 0,
    pickerSaturation: 1,
    pickerValue: 1,
    crosswordColors: {},
    customCrosswordColors: {},
    sudokuColors: {},
    customSudokuColors: {},
    saveTimerId: null,
    crosswordUpdateTimerId: null,
    sudokuUpdateTimerId: null,
    hexFeedbackTimerId: null
};