// Will eventually simplify this so its not copy pasted functions

function toggleMiniDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableMiniDarkMode"});
        chrome.storage.sync.set({miniDarkModeEnabled: document.getElementById("mini-crossword").checked});
    });
}

function toggleCrosswordDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableCrosswordDarkMode"});
        chrome.storage.sync.set({crosswordDarkModeEnabled: document.getElementById("the-crossword").checked});
    });
}

function toggleConnectionsDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableConnectionsDarkMode"});
        chrome.storage.sync.set({connectionsDarkModeEnabled: document.getElementById("connections").checked});
    });
}

function toggleCrosswordsArchiveDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableCrosswordsArchiveDarkMode"});
        chrome.storage.sync.set({crosswordsArchiveDarkModeEnabled: document.getElementById("archive-crosswords").checked});
    });
}

function toggleConnectionsArchiveDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableConnectionsArchiveDarkMode"});
        chrome.storage.sync.set({connectionsArchiveDarkModeEnabled: document.getElementById("archive-connections").checked});
    });
}

function toggleMenuDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableMenuDarkMode"});
        chrome.storage.sync.set({menuDarkModeEnabled: document.getElementById("games-menu").checked});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var miniSlider = document.getElementById("mini-crossword");
    var crosswordSlider = document.getElementById("the-crossword");
    var connectionsSlider = document.getElementById("connections");
    var crosswordsArchiveSlider = document.getElementById("archive-crosswords");
    var connectionsArchiveSlider = document.getElementById("archive-connections");
    var menuSlider = document.getElementById("games-menu");

    function setupMainSlider(mainId, childIds) {
        const main = document.getElementById(mainId);
        const children = childIds.map(id => document.getElementById(id));

        function updateChildren() {
            const isEnabled = main.checked;
            children.forEach(child => {
                const wrapper = child.closest(".toggle-line");
                if (isEnabled) {
                    wrapper.classList.remove("disabled");
                    child.disabled = false;
                } else {
                    wrapper.classList.add("disabled");
                    child.disabled = true;
                }
            });
            chrome.storage.sync.set({[mainId]: isEnabled});
        }
        main.addEventListener("change", updateChildren);
        chrome.storage.sync.get(mainId, function(data) {
            main.checked = data[mainId] || false;
            updateChildren();
        });
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
        "statistics"
    ]);

    chrome.storage.sync.get(
        ["miniDarkModeEnabled", "crosswordDarkModeEnabled", "connectionsDarkModeEnabled", "crosswordsArchiveDarkModeEnabled", "connectionsArchiveDarkModeEnabled", "menuDarkModeEnabled"],
        function(data) {
            miniSlider.checked = data.miniDarkModeEnabled || false;
            crosswordSlider.checked = data.crosswordDarkModeEnabled || false;
            connectionsSlider.checked = data.connectionsDarkModeEnabled || false;
            crosswordsArchiveSlider.checked = data.crosswordsArchiveDarkModeEnabled || false;
            connectionsArchiveSlider.checked = data.connectionsArchiveDarkModeEnabled || false;
            menuSlider.checked = data.menuDarkModeEnabled || false;
        }
    );
    miniSlider.addEventListener("click", toggleMiniDarkMode);
    crosswordSlider.addEventListener("click", toggleCrosswordDarkMode);
    connectionsSlider.addEventListener("click", toggleConnectionsDarkMode);
    crosswordsArchiveSlider.addEventListener("click", toggleCrosswordsArchiveDarkMode);
    connectionsArchiveSlider.addEventListener("click", toggleConnectionsArchiveDarkMode);
    menuSlider.addEventListener("click", toggleMenuDarkMode);
});
