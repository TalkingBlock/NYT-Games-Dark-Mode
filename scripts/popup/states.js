// File acts like the popup's memory state, actions.js updates the properties and popup.js loads them

export const popupState = {
    activePageButtonClass: "dark-mode-button",
    activeColorPanel: "crosswords",
    activePresets: {},
    presetMenuOpen: false,
    selectedPanel: null,
    selectedColorKey: null,
    lastColorKeys: {},
    pickerHue: 0,
    pickerSaturation: 1,
    pickerValue: 1,
    colors: {},
    customColors: {},
    presetMeta: {},
    saveTimerId: null,
    panelUpdateTimerIds: {}
};