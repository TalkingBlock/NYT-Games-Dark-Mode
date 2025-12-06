document.addEventListener("DOMContentLoaded", function () {
    const toggles = {
        "mini-crossword": {
            storageKey: "miniDarkModeEnabled",
            action: "enableMiniDarkMode"
        },
        "the-crossword": {
            storageKey: "crosswordDarkModeEnabled",
            action: "enableCrosswordDarkMode"
        },
        "connections": {
            storageKey: "connectionsDarkModeEnabled",
            action: "enableConnectionsDarkMode"
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
        "games-menu": {
            storageKey: "menuDarkModeEnabled",
            action: "enableMenuDarkMode"
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
        "mini-crossword",
        "the-crossword",
        "spelling-bee",
        "pips",
        "strands",
        "connections",
        "letter-boxed",
        "tiles",
        "sudoku"
    ]);
    setupMainSlider("archives-main", [
        "archive-crosswords",
        "archive-spelling-bee",
        "archive-wordle",
        "archive-strands",
        "archive-connections"
    ]);
    setupMainSlider("misc-main", [
        "games-menu",
        "statistics",
        "custom-wordle"
    ]);
});
