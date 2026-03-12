// File acts like the popup's memory state, actions.js updates the properties and render.js reads them

export const popupState = {
    activePageButtonClass: "dark-mode-button",
    activeColorPanel: "crosswords",
    selectedCrosswordColorKey: null,
    selectedSudokuColorKey: null,
    pickerHue: 0,
    pickerSaturation: 1,
    pickerValue: 1,
    crosswordColors: {},
    sudokuColors: {},
    saveTimerId: null,
    colorUpdateTimerId: null
};