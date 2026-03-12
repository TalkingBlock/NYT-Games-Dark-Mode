// File contains a bunch of default constants that are exported to other popup files.

export const popupActivePageStorageKey = "popupActivePage";
export const popupActiveColorPanelStorageKey = "popupActiveColorPanel";
export const cwColorsStorageKey = "crossword_colors_settings";
export const sdColorsStorageKey = "sudoku_colors_settings";

export const defaultCrosswordColors = {
    cw_cell_borders:            "#161718",
    cw_letter_in_cell:          "#FFFFFF",
    cw_correct_letter_in_cell:  "#A9D6FE",
    cw_empty_cell:              "#585863",
    cw_prefilled_cell:          "#161718",
    cw_shaded_cell:             "#383840",
    cw_related_cell_clue:       "#596D83",
    cw_highlighted_cell_clue:   "#483F80",
    cw_shaded_highlighted_cell: "#383361",
    cw_selected_cell_clue:      "#4678AA",
    cw_shaded_selected_cell:    "#476E93",
    cw_circle_within_cell:      "#161718",
    cw_main_selected_clue:      "#393361"
};

export const defaultSudokuColors = {
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
    sd_number_selected_cell:      "#000000",
    sd_candidate_number:          "#D3D3D3"
};

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

export const dmChildToggleParentMap = Object.fromEntries(
    Object.entries(dmToggleGroups).flatMap(([parentToggleId, childToggleIds]) =>
        childToggleIds.map((childToggleId) => [childToggleId, parentToggleId])
    )
);

export const pageButtons = [
    "dark-mode-button",
    "custom-colors-button",
    "extra-features-button"
];

export const pages = [
    "dark-mode-page",
    "custom-colors-page",
    "extra-features-page"
];