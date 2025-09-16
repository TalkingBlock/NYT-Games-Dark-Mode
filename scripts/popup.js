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

function toggleCrosswordsArchiveDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableCrosswordsArchiveDarkMode"});
        chrome.storage.sync.set({crosswordsArchiveDarkModeEnabled: document.getElementById("archive-crosswords").checked});
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
    var crosswordsArchiveSlider = document.getElementById("archive-crosswords");
    var menuSlider = document.getElementById("games-menu");
    chrome.storage.sync.get(["miniDarkModeEnabled", "crosswordDarkModeEnabled", "crosswordsArchiveDarkModeEnabled", "menuDarkModeEnabled"], function(data) {
        miniSlider.checked = data.miniDarkModeEnabled || false;
        crosswordSlider.checked = data.crosswordDarkModeEnabled || false;
        crosswordsArchiveSlider.checked = data.crosswordsArchiveDarkModeEnabled || false;
        menuSlider.checked = data.menuDarkModeEnabled || false;
    });
    miniSlider.addEventListener("click", toggleMiniDarkMode);
    crosswordSlider.addEventListener("click", toggleCrosswordDarkMode);
    crosswordsArchiveSlider.addEventListener("click", toggleCrosswordsArchiveDarkMode);
    menuSlider.addEventListener("click", toggleMenuDarkMode);
});
