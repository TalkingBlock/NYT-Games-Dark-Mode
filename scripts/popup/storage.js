// Storage to save, read and sync keys throughout chrome storage

// Wraps chrome storage and tab messaging for the rest of the popup
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

// Saves a whole object of keys and values to chrome.storage.sync
export function writeSyncValues(values) {
    return new Promise((resolve) => {
        chrome.storage.sync.set(values, resolve);
    });
}

// Deletes keys from chrome.storage.sync
export function removeSyncValues(keys) {
    return new Promise((resolve) => {
        chrome.storage.sync.remove(keys, resolve);
    });
}

// Saves every game's color theme under its storage key
export function saveTheme(themeData) {
    return writeSyncValue(gameColorsStorageKey, themeData);
}

// Sends a message to the tab the user is on and ignores tabs that have nothing to listen to
export function sendMessageToActiveTab(message) {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (!tabs?.length) return;
        chrome.tabs.sendMessage(tabs[0].id, message, () => {
            void chrome.runtime.lastError;
        });
    });
}