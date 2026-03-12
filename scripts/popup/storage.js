// Import variable
import {cwColorsStorageKey} from "./defaultExports.js";

// Reads a value from a key in from chrome.storage.sync for the given key and returns said value
export function readSyncValue(key) {
    return new Promise((resolve) => {
        chrome.storage.sync.get(key, (result) => {
            resolve(result?.[key]);
        });
    });
}

// Saves a value to the key in chrome.storage.sync
export function writeSyncValue(key, value) {
    return new Promise((resolve) => {
        chrome.storage.sync.set({[key]: value}, resolve);
    });
}

// Loads the saved crossword color theme from chrome storage
export async function loadSavedTheme() {
    const savedTheme = await readSyncValue(cwColorsStorageKey);
    return savedTheme || null;
}

// Saves the current crossword color theme to chrome storage
export function saveTheme(themeData) {
    return writeSyncValue(cwColorsStorageKey, themeData);
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