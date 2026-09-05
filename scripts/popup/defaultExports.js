// File contains a bunch of default constants that are exported to other popup files.

// Key exports for localStorage
export const popupActivePageStorageKey = "popupActivePage";
export const popupActiveColorPanelStorageKey = "popupActiveColorPanel";
export const cwColorsStorageKey = "crosswordColorSettings";
export const sdColorsStorageKey = "sudokuColorSettings";
export const crosswordPresetStorageKey = "crosswordPreset";

// Key exports for master switches
export const dmGroupMasterStorageKeys = {
    "games-main": "gamesMasterEnabled",
    "archives-main": "archivesMasterEnabled",
    "misc-main": "miscMasterEnabled"
};

// Message for syncing dark mode state across tabs
export const syncDarkModeAction = "syncDarkModeState";

// Keys written by the old popup gate (cleared out on startup)
export const legacyGroupStorageKeys = [
    "games-main", "archives-main", "misc-main",
    "games-mainRememberedChildren", "archives-mainRememberedChildren", "misc-mainRememberedChildren"
];

// Light preset palette for crosswords
export const lightCrosswordColors = {
    cw_cell_borders:            "#696969",
    cw_letter_number_in_cell:   "#000000",
    cw_correct_letter_in_cell:  "#2860D8",
    cw_empty_cell:              "#FFFFFF",
    cw_prefilled_cell:          "#000000",
    cw_shaded_cell:             "#DCDCDC",
    cw_related_cell_clue:       "#FFECA0",
    cw_related_shaded_cell:     "#E8E2C7",
    cw_highlighted_cell_clue:   "#A7D8FF",
    cw_shaded_highlighted_cell: "#BAD9F3",
    cw_selected_cell_clue:      "#FFDA00",
    cw_shaded_selected_cell:    "#F3DB4D",
    cw_circle_within_cell:      "#696969",
    cw_main_selected_clue_bg:   "#DCEFFF",
    cw_main_selected_clue_text: "#000000"
};

// Dark preset palette for crosswords
export const darkCrosswordColors = {
    cw_cell_borders:            "#161718",
    cw_letter_number_in_cell:   "#FFFFFF",
    cw_correct_letter_in_cell:  "#A9D6FE",
    cw_empty_cell:              "#585863",
    cw_prefilled_cell:          "#161718",
    cw_shaded_cell:             "#383840",
    cw_related_cell_clue:       "#596D83",
    cw_related_shaded_cell:     "#596D83",
    cw_highlighted_cell_clue:   "#483F80",
    cw_shaded_highlighted_cell: "#383361",
    cw_selected_cell_clue:      "#4678AA",
    cw_shaded_selected_cell:    "#476E93",
    cw_circle_within_cell:      "#161718",
    cw_main_selected_clue_bg:   "#393361",
    cw_main_selected_clue_text: "#FFFFFF"
};

// Light preset palette for sudoku
export const lightSudokuColors = {
    sd_board_frame:               "#121212",
    sd_empty_cell:                "#FFFFFF",
    sd_prefilled_cell:            "#DFDFDF",
    sd_affected_no_number_cell:   "#F9EAC2",
    sd_affected_number_cell:      "#D3C6AF",
    sd_selected_cell:             "#FB9B00",
    sd_filled_selected_number:    "#D48200",
    sd_selected_number:           "#FEC468",
    sd_prefilled_selected_number: "#E69100",
    sd_numbers:                   "#000000",
    sd_candidate_number:          "#5A5A5A"
};

// Dark preset palette for sudoku
export const darkSudokuColors = {
    sd_board_frame:               "#FFFFFF",
    sd_empty_cell:                "#0F0F0F",
    sd_prefilled_cell:            "#434342",
    sd_affected_no_number_cell:   "#5C5639",
    sd_affected_number_cell:      "#413A25",
    sd_selected_cell:             "#FC9B00",
    sd_filled_selected_number:    "#9F6F21",
    sd_selected_number:           "#9E6708",
    sd_prefilled_selected_number: "#563B0A",
    sd_numbers:                   "#FFFFFF",
    sd_candidate_number:          "#D3D3D3"
};

// Toggle configs linked with their storage keys and actions
export const dmToggleConfig = {
    "the-crossword": {
        storageKey: "crosswordDarkModeEnabled",
        action: "enableCrosswordDarkMode"
    },
    "midi-crossword": {
        storageKey: "midiDarkModeEnabled",
        action: "enableMidiDarkMode"
    },
    "mini-crossword": {
        storageKey: "miniDarkModeEnabled",
        action: "enableMiniDarkMode"
    },
    "connections": {
        storageKey: "connectionsDarkModeEnabled",
        action: "enableConnectionsDarkMode"
    },
    "spelling-bee": {
        storageKey: "spellingBeeDarkModeEnabled",
        action: "enableSpellingBeeDarkMode"
    },
    "pips": {
        storageKey: "pipsDarkModeEnabled",
        action: "enablePipsDarkMode"
    },
    "strands": {
        storageKey: "strandsDarkModeEnabled",
        action: "enableStrandsDarkMode"
    },
    "letter-boxed": {
        storageKey: "letterBoxedDarkModeEnabled",
        action: "enableLetterBoxedDarkMode"
    },
    "tiles": {
        storageKey: "tilesDarkModeEnabled",
        action: "enableTilesDarkMode"
    },
    "sudoku": {
        storageKey: "sudokuDarkModeEnabled",
        action: "enableSudokuDarkMode"
    },
    "archive-crosswords": {
        storageKey: "crosswordsArchiveDarkModeEnabled",
        action: "enableCrosswordsArchiveDarkMode"
    },
    "archive-connections": {
        storageKey: "connectionsArchiveDarkModeEnabled",
        action: "enableConnectionsArchiveDarkMode"
    },
    "archive-spelling-bee": {
        storageKey: "spellingBeeArchiveDarkModeEnabled",
        action: "enableSpellingBeeArchiveDarkMode"
    },
    "archive-wordle": {
        storageKey: "wordleArchiveDarkModeEnabled",
        action: "enableWordleArchiveDarkMode"
    },
    "archive-strands": {
        storageKey: "strandsArchiveDarkModeEnabled",
        action: "enableStrandsArchiveDarkMode"
    },
    "games-menu": {
        storageKey: "menuDarkModeEnabled",
        action: "enableMenuDarkMode"
    },
    "crossword-stats": {
        storageKey: "crosswordStatsDarkModeEnabled",
        action: "enableCrosswordStatsDarkMode"
    },
    "custom-wordle": {
        storageKey: "customWordleDarkModeEnabled",
        action: "enableCustomWordleDarkMode"
    },
    "ta-connections": {
        storageKey: "taConnectionsDarkModeEnabled",
        action: "enableTAConnectionsDarkMode"
    },
    "misc-pages": {
        storageKey: "miscPagesDarkModeEnabled",
        action: "enableMiscPagesDarkMode"
    }
};

// Toggle groups for parent-child relationships in the popup
export const dmToggleGroups = {
    "games-main": [
        "the-crossword",
        "midi-crossword",
        "mini-crossword",
        "connections",
        "spelling-bee",
        "pips",
        "strands",
        "letter-boxed",
        "tiles",
        "sudoku"
    ],
    "archives-main": [
        "archive-crosswords",
        "archive-connections",
        "archive-spelling-bee",
        "archive-wordle",
        "archive-strands"
    ],
    "misc-main": [
        "games-menu",
        "crossword-stats",
        "custom-wordle",
        "ta-connections",
        "misc-pages"
    ]
};

// Variable of every key the popup reads when opened so the switches are not wrong before storage is reached
export const popupStorageKeys = [
    popupActivePageStorageKey,
    popupActiveColorPanelStorageKey,
    cwColorsStorageKey,
    ...Object.values(dmGroupMasterStorageKeys),
    ...Object.values(dmToggleConfig).map((toggleConfig) => toggleConfig.storageKey)
];

// Cursor inset for the color picker so it can always be exactly at the corners
export const svCursorInset = 4;

// The icon that hex action button swaps to after a successful click + how long it stays
export const hexActionCheckIcon = "svgs/popup/check.svg";
export const hexActionCheckDuration = 1000;

// The preset names
export const displayPresetName = "display";
export const customPresetNames = ["preset1", "preset2", "preset3"];

// Which dark mode toggles decide the palette that the display preset previews
export const displayPresetToggleIds = {
    crosswords: ["the-crossword", "midi-crossword", "mini-crossword"],
    sudoku: ["sudoku"]
};

// Grouped names of page buttons and their corresponding pages
export const pageButtons = [
    "dark-mode-button",
    "custom-colors-button",
    "settings-button"
];
export const pages = [
    "dark-mode-page",
    "custom-colors-page",
    "settings-page"
];