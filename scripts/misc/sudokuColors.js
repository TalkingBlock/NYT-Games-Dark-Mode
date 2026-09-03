// Shared sudoku color layer, loaded before sudoku.js
const sdColorsStorageKey = "sudokuColorSettings";
const lightSudokuColors = {
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
const darkSudokuColors = {
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

function getSudokuColors(customColors = {}) {
    return {
        ...darkSudokuColors,
        ...customColors
    };
}

function buildSudokuColorsCSS(customColors = {}) {
    const sdColors = getSudokuColors(customColors);
    return `
        /* Sudoku Board Colors */

        .su-board__frame /* Board Frame */{
            outline: 0px solid ${sdColors.sd_board_frame};
        }

        .su-cell /* Empty cell */ { 
            background-color: ${sdColors.sd_empty_cell};
        }

        .su-cell.prefilled /* Prefilled cell */ {
            background-color: ${sdColors.sd_prefilled_cell};
        }

        .su-cell:not(.selected).highlighted /* Cell that will be affected with no number in cell */ {
            background-color: ${sdColors.sd_affected_no_number_cell};
        }

        .su-cell:not(.selected).highlighted.prefilled /* Cell that will be affected with a number in cell */ {
            background-color: ${sdColors.sd_affected_number_cell};
        }

        .su-cell.selected.highlighted /* Cell currently selected */ {
            background-color: ${sdColors.sd_selected_cell};
        }

        .su-cell.prefilled.highlightedSameNumber /* User filled cell with same number as selected cell */ {
            background-color: ${sdColors.sd_filled_selected_number};
        }

        .su-cell:not(.selected).highlightedSameNumber /* Cell with same number as selected cell */ {
            background-color: ${sdColors.sd_selected_number};
        }

        .su-cell:not(.selected).highlightedSameNumber.prefilled /* Prefilled cell with same number as selected cell */ {
            background-color: ${sdColors.sd_prefilled_selected_number};
        }   

        .su-cell__value>path, .selected .su-cell__value>path /* All filled/prefilled numbers */ {
            fill: ${sdColors.sd_numbers};
        }

        .su-candidates>svg>path /* Candidate numbers */ {
            fill: ${sdColors.sd_candidate_number};
        }
    `;
}

function applySudokuColors(customColors = {}) {
    let style = document.getElementById("nyt-sudoku-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-sudoku-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildSudokuColorsCSS(customColors);
}

function removeSudokuColors() {
    const style = document.getElementById("nyt-sudoku-color-style");
    if (style) {
        style.remove();
    }
}

function loadStoredSudokuColors() {
    chrome.storage.sync.get("crosswordColorSettings", (data) => {
        const settings = data?.["crosswordColorSettings"] || {};
        const preset = settings.sudokuPreset || "light";
        let colors;
        if (preset === "dark") {
            colors = {...darkSudokuColors};
        } else if (preset === "custom") {
            const saved = settings.sudoku || {};
            colors = {...lightSudokuColors};
            for (const [key, value] of Object.entries(saved)) {
                if (value?.hex) {
                    colors[key] = value.hex;
                }
            }
        } else {
            colors = {...lightSudokuColors};
        }
        applySudokuColors(colors);
    });
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "applySudokuColors") {
        applySudokuColors(message.colors || {});
    }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && "crosswordColorSettings" in changes) {
        loadStoredSudokuColors();
    }
});

loadStoredSudokuColors();
