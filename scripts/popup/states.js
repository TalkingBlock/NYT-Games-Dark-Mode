// The popup's shared memory filled in from storage when the popup opens and changed by the other popup files before updater.js redraws it
export const popupState = {
    activePageButtonClass: "dark-mode-button",
    activeColorPanel: "crosswords",
    defaultPage: "last-used",
    defaultColorPanel: "last-used",
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