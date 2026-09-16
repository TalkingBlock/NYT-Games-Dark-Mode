// Builds and runs the entire help popup on the custom colors page when ? is clicked

// Imports
import {popupState} from "./states.js";
import {colorPanelConfig, colorPanelNames} from "./defaultExports.js";
import {helpElementInfo} from "./helpContent.js";

// Which game the dialog shows, its cards, the card an open preview came from and an outdated preview open cancelation
let helpPanelIndex = 0;
let currentHelpItems = [];
let zoomSourceItem = null;
let zoomRequestId = 0;

// Gets every element the help dialog is built out of
function getHelpElements() {
    return {
        trigger: document.getElementById("colorHelp"),
        overlay: document.getElementById("helpOverlay"),
        close: document.getElementById("helpClose"),
        count: document.getElementById("helpCount"),
        body: document.getElementById("helpBody"),
        grid: document.getElementById("helpGrid"),
        gameName: document.getElementById("helpGameName"),
        dots: document.getElementById("helpDots"),
        previous: document.getElementById("helpPrevious"),
        next: document.getElementById("helpNext"),
        zoom: document.getElementById("helpZoom"),
        zoomFrame: document.getElementById("helpZoomFrame"),
        zoomName: document.getElementById("helpZoomName"),
        zoomDescription: document.getElementById("helpZoomDescription")
    };
}

// Attaches the help button, close button, game switch arrows, cards and preview closing at startup
export function attachHelpHandlers() {
    const help = getHelpElements();
    if (!help.overlay || !help.zoom) return;
    buildHelpDots(help);
    help.trigger?.addEventListener("click", openHelp);
    help.close.addEventListener("click", closeHelp);
    help.previous.addEventListener("click", () => showHelpPanel(helpPanelIndex - 1));
    help.next.addEventListener("click", () => showHelpPanel(helpPanelIndex + 1));
    help.overlay.addEventListener("click", (event) => {
        if (event.target === help.overlay) closeHelp();
    });
    help.grid.addEventListener("click", (event) => {
        const helpItem = event.target.closest(".help-item");
        if (helpItem) openHelpZoom(helpItem);
    });
    help.zoom.addEventListener("click", closeHelpZoom);
    help.zoom.addEventListener("keydown", (event) => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        closeHelpZoom();
    });
}

// Adds one dot per game under the game name
function buildHelpDots(help) {
    help.dots.replaceChildren(...colorPanelNames.map(() => {
        const dot = document.createElement("span");
        dot.className = "help-dot";
        return dot;
    }));
}

// Opens the help dialog on the game panel the user is currently looking at
function openHelp() {
    const help = getHelpElements();
    const activePanelIndex = colorPanelNames.indexOf(popupState.activeColorPanel);
    showHelpPanel(Math.max(activePanelIndex, 0));
    help.overlay.classList.add("open");
    help.close.focus();
}

// Closes the help dialog along with any open preview, and focuses on the help button post-exit
function closeHelp() {
    const help = getHelpElements();
    closeHelpZoom();
    help.overlay.classList.remove("open");
    help.trigger?.focus();
}

// Instantly swaps the cards over to the given game with both ends being able to wrap around
function showHelpPanel(index) {
    const help = getHelpElements();
    helpPanelIndex = (index + colorPanelNames.length) % colorPanelNames.length;
    const panelName = colorPanelNames[helpPanelIndex];
    currentHelpItems = getHelpItems(panelName);
    help.grid.replaceChildren(...currentHelpItems.map(buildHelpItem));
    help.gameName.textContent = colorPanelConfig[panelName].label;
    help.count.textContent = `${currentHelpItems.length} elements`;
    [...help.dots.children].forEach((dot, dotIndex) => {
        dot.classList.toggle("enabled", dotIndex === helpPanelIndex);
    });
    help.body.scrollTop = 0;
}

// Reads each element's name from its color panel (unless helpContent.js has a shorter title), along with its description and image
function getHelpItems(panelName) {
    const colorOptions = document.querySelectorAll(`#${colorPanelConfig[panelName].panelId} .color-option[data-key]`);
    return [...colorOptions].map((colorOption) => {
        const key = colorOption.dataset.key;
        const info = helpElementInfo[key] || {};
        return {
            key,
            name: info.title || colorOption.querySelector(".color-option-text")?.textContent.trim() || key,
            description: info.description || "",
            image: info.image || null
        };
    });
}

// Builds a clickable card with the element's image, name and description
function buildHelpItem(item, itemIndex) {
    const helpItem = document.createElement("button");
    helpItem.type = "button";
    helpItem.className = "help-item";
    helpItem.dataset.index = itemIndex;
    helpItem.setAttribute("aria-haspopup", "dialog");

    const thumb = document.createElement("span");
    thumb.className = "help-thumb";
    thumb.classList.toggle("has-image", Boolean(item.image));
    thumb.setAttribute("aria-hidden", "true");
    thumb.append(buildHelpPreview(item));

    const text = document.createElement("span");
    text.className = "help-text";
    const name = document.createElement("span");
    name.className = "help-name";
    name.textContent = item.name;
    const description = document.createElement("span");
    description.className = "help-description";
    description.textContent = item.description;
    text.append(name, description);
    helpItem.append(thumb, text);
    return helpItem;
}

// Builds an element's image, or a placeholder if there is none
function buildHelpPreview(item) {
    if (!item.image) return document.createElement("span");
    const image = document.createElement("img");
    image.src = item.image;
    image.alt = "";
    image.decoding = "async";
    return image;
}

// Grows the clicked card's image out of its thumbnail into the middle once the image has decoded
async function openHelpZoom(helpItem) {
    const help = getHelpElements();
    const item = currentHelpItems[Number(helpItem.dataset.index)];
    if (!item) return;
    const requestId = ++zoomRequestId;
    const preview = buildHelpPreview(item);
    if (item.image) {
        await preview.decode().catch(() => {});
        if (requestId !== zoomRequestId) return;
    }
    stopZoomAnimations(help);
    help.zoomFrame.replaceChildren(preview);
    help.zoomFrame.classList.toggle("has-image", Boolean(item.image));
    help.zoomName.textContent = item.name;
    help.zoomDescription.textContent = item.description;
    zoomSourceItem = helpItem;
    help.zoom.classList.add("open");
    help.zoom.focus();
    if (prefersReducedMotion()) return;
    const thumb = helpItem.querySelector(".help-thumb");
    help.zoomFrame.animate(
        [{transform: getThumbTransform(thumb, help.zoomFrame)}, {transform: "none"}],
        {duration: 280, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"}
    );
}

// Shrinks the preview back into its corresponding thumbnail and cancels any image pending a preview
function closeHelpZoom() {
    const help = getHelpElements();
    zoomRequestId++;
    if (!help.zoom.classList.contains("open")) return;
    help.zoom.classList.remove("open");
    stopZoomAnimations(help);
    const thumb = zoomSourceItem?.querySelector(".help-thumb");
    if (thumb && !prefersReducedMotion()) {
        help.zoomFrame.animate(
            [{transform: "none"}, {transform: getThumbTransform(thumb, help.zoomFrame)}],
            {duration: 220, easing: "cubic-bezier(0.2, 0.8, 0.2, 1)"}
        );
    }
    zoomSourceItem?.focus();
    zoomSourceItem = null;
}

// Cancels any grow or shrink still running
function stopZoomAnimations(help) {
    help.zoomFrame.getAnimations().forEach((animation) => animation.cancel());
}

// Returns the transformation that shrinks the frame onto the thumbnail whilst keeping the image's shape
function getThumbTransform(thumb, zoomFrame) {
    const thumbRect = thumb.getBoundingClientRect();
    const frameRect = zoomFrame.getBoundingClientRect();
    const scale = Math.min(thumbRect.width / frameRect.width, thumbRect.height / frameRect.height);
    const offsetX = thumbRect.left + (thumbRect.width - frameRect.width * scale) / 2 - frameRect.left;
    const offsetY = thumbRect.top + (thumbRect.height - frameRect.height * scale) / 2 - frameRect.top;
    return `translate(${offsetX}px, ${offsetY}px) scale(${scale})`;
}

// Returns true when the user has asked for reduced motion, which skips the grow and shrink animations
function prefersReducedMotion() {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
}
