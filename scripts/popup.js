document.addEventListener("DOMContentLoaded", function () {
    const toggles = {
        "mini-crossword":        "enableMiniDarkMode",
        "the-crossword":         "enableCrosswordDarkMode",
        "connections":           "enableConnectionsDarkMode",
        "sudoku":                "enableSudokuDarkMode",
        "archive-crosswords":    "enableCrosswordsArchiveDarkMode",
        "archive-connections":   "enableConnectionsArchiveDarkMode",
        "games-menu":            "enableMenuDarkMode"
    };

    function handleToggle(id, action) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            chrome.tabs.sendMessage(tabs[0].id, {action});
        });
        const enabled = document.getElementById(id).checked;
        chrome.storage.sync.set({[id + "Enabled"]: enabled});
    }

    for (const [id, action] of Object.entries(toggles)) {
        const toggleElement = document.getElementById(id);
        chrome.storage.sync.get(id + "Enabled", data => {
            toggleElement.checked = data[id + "Enabled"] || false;
        });
        toggleElement.addEventListener("click", () => handleToggle(id, action));
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
