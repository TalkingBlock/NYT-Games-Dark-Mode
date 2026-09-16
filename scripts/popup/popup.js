// Entry point of the popup, loaded by popup.html

// Imports
import {initializePopup} from "./startup.js";
import {initializeSettings} from "./settings.js";
import {attachModalHandlers} from "./modal.js";
import {attachHelpHandlers} from "./help.js";

// Once the page loads, connects the dialogs, loads saved state and starts the popup
document.addEventListener("DOMContentLoaded", async () => {
    attachModalHandlers();
    attachHelpHandlers();
    initializeSettings();
    await initializePopup();
});