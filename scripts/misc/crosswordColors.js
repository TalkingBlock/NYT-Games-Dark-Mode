// Shared sudoku color layer, loaded before all three crossword.js
const cwColorsStorageKey = "crosswordColorSettings";
const darkCrosswordColors = {
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
const lightCrosswordColors = {
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

function getCrosswordColors(customColors = {}) {
    return {
        ...darkCrosswordColors,
        ...customColors
    };
}

function buildCrosswordColorsCSS(customColors = {}) {
    const cwColors = getCrosswordColors(customColors);
    return `
        /* Crossword Board + Clue Colors */

        [data-group="grid"] rect, [data-group="grid"] path /* Cell borders */ {
            stroke: ${cwColors.cw_cell_borders};
        }

        .xwd__cell text /* Letter + Number in cell */ {
            fill: ${cwColors.cw_letter_number_in_cell};
        }

        .xwd__assistance--confirmed~text:last-of-type /* Correct letter in cell */ {
            fill: ${cwColors.cw_correct_letter_in_cell};
        }
        
        .xwd__cell--cell /* Empty cell */ {
            fill: ${cwColors.cw_empty_cell};
        }

        .xwd__cell--block /* Prefilled cell */ {
            fill: ${cwColors.cw_prefilled_cell};
        }

        .xwd__cell--shaded /* Shaded cell */ {
            fill: ${cwColors.cw_shaded_cell};
        }

        .xwd__cell--related /* Clue related cell */ {
            fill: ${cwColors.cw_related_cell_clue};
        }

        .xwd__cell--related.xwd__cell--shaded /* Related + shaded cell */ {
            fill: ${cwColors.cw_related_shaded_cell};
        }

        .xwd__cell--highlighted, .xwd__cell--related.xwd__cell--highlighted /* Highlighted word cell */ {
            fill: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__cell--highlighted.xwd__cell--shaded /* Shaded + highlighted cell */ {
            fill: ${cwColors.cw_shaded_highlighted_cell};
        }

        .xwd__cell--selected, .xwd__cell--related.xwd__cell--highlighted.xwd__cell--selected /* Selected cell */ {
            fill: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__cell--selected.xwd__cell--shaded /* Shaded + selected cell */{
            fill: ${cwColors.cw_shaded_selected_cell};
        }

        .xwd__cell--cell+circle, .xwd__cell--cell+path /* Circle within cell */ {
            stroke: ${cwColors.cw_circle_within_cell};
        }

        .xwd__clue--highlighted /* Highlighted clue */ {
            border-left-color: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__clue--related /* Related clue */ {
            background-color: ${cwColors.cw_related_cell_clue};
        }

        .xwd__clue--selected /* Selected clue */ {
            background-color: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__clue-bar-desktop--bar /* Main selected clue */ {
            background: ${cwColors.cw_main_selected_clue_bg};
            color: ${cwColors.cw_main_selected_clue_text};
        }
    `;
}

function applyCrosswordColors(customColors = {}) {
    let style = document.getElementById("nyt-crossword-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-crossword-color-style";
        (document.head || document.documentElement).appendChild(style);
    }
    style.textContent = buildCrosswordColorsCSS(customColors);
}

function removeCrosswordColors() {
    const style = document.getElementById("nyt-crossword-color-style");
    if (style) {
        style.remove();
    }
}

function loadStoredCrosswordColors() {
    chrome.storage.sync.get(cwColorsStorageKey, (data) => {
        const settings = data?.[cwColorsStorageKey] || {};
        const preset = settings.crosswordPreset || "light";
        let colors;
        if (preset === "dark") {
            colors = {...darkCrosswordColors};
        } else if (preset === "custom") {
            const saved = settings.crosswords || {};
            colors = {...lightCrosswordColors};
            for (const [key, value] of Object.entries(saved)) {
                if (value?.hex) {
                    colors[key] = value.hex;
                }
            }
        } else {
            colors = {...lightCrosswordColors};
        }
        applyCrosswordColors(colors);
    });
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action === "applyCrosswordColors") {
        applyCrosswordColors(message.colors || {});
    }
});

chrome.storage.onChanged.addListener(function(changes, areaName) {
    if (areaName === "sync" && cwColorsStorageKey in changes) {
        loadStoredCrosswordColors();
    }
});

loadStoredCrosswordColors();
