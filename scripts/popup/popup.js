// Import functions
import {initializePopup} from "./actions.js";
import {initializeSettings} from "./settings.js";
import {attachModalHandlers} from "./modal.js";

// Once the popup's DOM content loads, connects the dialogs and the settings page, then opens the popup
document.addEventListener("DOMContentLoaded", async () => {
    attachModalHandlers();
    initializeSettings();
    await initializePopup();
});