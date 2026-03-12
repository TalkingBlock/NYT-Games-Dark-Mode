// Import function
import {initializePopup} from "./actions.js";

// Once the popup's DOM content loads, calls initializePopup() to start it.
document.addEventListener("DOMContentLoaded", async () => {
    await initializePopup();
});