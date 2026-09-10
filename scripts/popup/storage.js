// Import variable
import {gameColorsStorageKey} from "./defaultExports.js";

// Reads every given key from chrome.storage.sync and returns them as an object
export function readSyncValues(keys) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(keys, (result) => {
            resolve(result || {});
        });
    });
}

// Saves a value to the key in chrome.storage.sync
export function writeSyncValue(key, value) {
    return new Promise((resolve) => {
        chrome.storage.sync.set({[key]: value}, resolve);
    });
}

// Deletes keys from chrome.storage.sync
export function removeSyncValues(keys) {
    return new Promise((resolve) => {
        chrome.storage.sync.remove(keys, resolve);
    });
}

// Saves every game's color theme to chrome storage.
export function saveTheme(themeData) {
    return writeSyncValue(gameColorsStorageKey, themeData);
}

// Sends a void runtime message to the active tab the user is on to prevent unneeded console errors
export function sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs?.length) return;
        chrome.tabs.sendMessage(tabs[0].id, message, () => {
            void chrome.runtime.lastError;
        });
    });
}