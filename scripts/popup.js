document.addEventListener("DOMContentLoaded", function () {
    const toggles = {
        "the-crossword": {
            storageKey: "crosswordDarkModeEnabled",
            action: "enableCrosswordDarkMode"
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
        }
    };

    function handleToggle(id, storageKey, action) {
        const enabled = document.getElementById(id).checked;
        chrome.tabs.query({active: true, currentWindow: true}, tabs => {
            chrome.tabs.sendMessage(tabs[0].id, {action});
        });
        chrome.storage.sync.set({[storageKey]: enabled});
    }

    for (const [id, {storageKey, action}] of Object.entries(toggles)) {
        const toggleElement = document.getElementById(id);
        chrome.storage.sync.get(storageKey, data => {
            toggleElement.checked = data[storageKey] || false;
        });
        toggleElement.addEventListener("click", () => handleToggle(id, storageKey, action));
    }

    function setupMainSlider(mainId, childIds) {
        const main = document.getElementById(mainId);
        const children = childIds.map(id => document.getElementById(id));
        function updateChildren() {
            const isEnabled = main.checked;
            children.forEach(child => {
                const wrapper = child.closest(".toggle-line");
                wrapper.classList.toggle("disabled", !isEnabled);
                child.disabled = !isEnabled;
            });
            chrome.storage.sync.set({[mainId]: isEnabled});
        }
        chrome.storage.sync.get(mainId, data => {
            main.checked = data[mainId] || false;
            updateChildren();
        });
        main.addEventListener("change", updateChildren);
    }

    setupMainSlider("games-main", [
        "the-crossword",
        "mini-crossword",
        "connections",
        "spelling-bee",
        "pips",
        "strands",
        "letter-boxed",
        "tiles",
        "sudoku"
    ]);
    setupMainSlider("archives-main", [
        "archive-crosswords",
        "archive-connections",
        "archive-spelling-bee",
        "archive-wordle",
        "archive-strands"
    ]);
    setupMainSlider("misc-main", [
        "games-menu",
        "crossword-stats",
        "custom-wordle",
        "ta-connections"
    ]);
});
