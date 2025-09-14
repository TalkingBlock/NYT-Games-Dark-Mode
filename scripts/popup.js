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

function toggleMenuDarkMode() {
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, {action: "enableMenuDarkMode"});
        chrome.storage.sync.set({menuDarkModeEnabled: document.getElementById("games-menu").checked});
    });
}

document.addEventListener("DOMContentLoaded", function() {
    var miniSlider = document.getElementById("mini-crossword");
    var crosswordSlider = document.getElementById("the-crossword");
    var menuSlider = document.getElementById("games-menu");
    chrome.storage.sync.get(["miniDarkModeEnabled", "crosswordDarkModeEnabled", "menuDarkModeEnabled"], function(data) {
        miniSlider.checked = data.miniDarkModeEnabled || false;
        crosswordSlider.checked = data.crosswordDarkModeEnabled || false;
        menuSlider.checked = data.menuDarkModeEnabled || false;
    });
    miniSlider.addEventListener("click", toggleMiniDarkMode);
    crosswordSlider.addEventListener("click", toggleCrosswordDarkMode);
    menuSlider.addEventListener("click", toggleMenuDarkMode);
});
