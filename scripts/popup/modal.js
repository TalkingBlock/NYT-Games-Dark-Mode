// Variables that track the state of the dialog
let isModalOpen = false;
let activeConfirmHandler = null;

// Gets every element the dialog can be built out of
export function getModalElements() {
    return {
        overlay: document.getElementById("modalOverlay"),
        title: document.getElementById("modalTitle"),
        message: document.getElementById("modalMessage"),
        notes: document.getElementById("modalNotes"),
        link: document.getElementById("modalLink"),
        code: document.getElementById("modalCode"),
        error: document.getElementById("modalError"),
        confirm: document.getElementById("modalConfirm"),
        cancel: document.getElementById("modalCancel"),
        fields: document.getElementById("modalFields"),
        presetName: document.getElementById("modalPresetName"),
        presetColor: document.getElementById("modalPresetColor"),
        presetSwatch: document.getElementById("modalPresetSwatch")
    };
}

// Builds the dialog out of the given config and shows it
export function openModal(config) {
    const modal = getModalElements();
    if (!modal.overlay) return;
    isModalOpen = true;
    activeConfirmHandler = config.onConfirm || null;
    modal.error.textContent = "";
    modal.title.textContent = config.title;
    modal.message.textContent = config.message || "";
    fillModalNotes(modal, config.notes);
    fillModalLink(modal, config.link);
    modal.fields.classList.toggle("hidden", !config.showFields);
    modal.code.classList.toggle("hidden", !config.code);
    if (config.code) {
        modal.code.readOnly = Boolean(config.code.readOnly);
        modal.code.value = config.code.value || "";
    }
    modal.confirm.textContent = config.confirmLabel;
    modal.cancel.classList.toggle("hidden", !config.cancelLabel);
    if (config.cancelLabel) {
        modal.cancel.textContent = config.cancelLabel;
    }
    modal.overlay.classList.add("open");
    config.onOpen?.(modal);
    focusModalTarget(modal, config.focus);
}

// Rebuilds the dialog's bullet list for the changelog
function fillModalNotes(modal, notes) {
    if (!modal.notes) return;
    modal.notes.replaceChildren();
    modal.notes.classList.toggle("hidden", !notes?.length);
    for (const note of notes || []) {
        const noteItem = document.createElement("li");
        noteItem.textContent = note;
        modal.notes.append(noteItem);
    }
}

// Points the dialog's link to the GitHub releases page for the changelog
function fillModalLink(modal, link) {
    if (!modal.link) return;
    modal.link.classList.toggle("hidden", !link);
    if (!link) return;
    modal.link.textContent = link.label;
    modal.link.href = link.url;
}

// Changes the cursor appearance to pointer/select depending on the element hovered over
function focusModalTarget(modal, focusTarget) {
    if (focusTarget === "confirm") {
        modal.confirm.focus();
        return;
    }
    if (focusTarget === "code" || focusTarget === "code-select") {
        modal.code.focus();
        if (focusTarget === "code-select") {
            modal.code.select();
        }
        return;
    }
    if (focusTarget === "name") {
        modal.presetName.focus();
        modal.presetName.select();
        return;
    }
    modal.cancel.focus();
}

// Closes the dialog
export function closeModal() {
    isModalOpen = false;
    activeConfirmHandler = null;
    document.getElementById("modalOverlay")?.classList.remove("open");
}

// Attaches handlers for the dialog buttons at startup, and supplies the confirm handler
export function attachModalHandlers() {
    const modal = getModalElements();
    modal.confirm?.addEventListener("click", async () => {
        const handler = activeConfirmHandler;
        if (!handler) {
            closeModal();
            return;
        }
        const result = (await handler(modal)) || {};
        if (activeConfirmHandler !== handler) return;
        if (result.error) {
            modal.error.textContent = result.error;
            return;
        }
        closeModal();
    });
    modal.cancel?.addEventListener("click", closeModal);
    modal.overlay?.addEventListener("click", (event) => {
        if (event.target === modal.overlay) closeModal();
    });
    document.addEventListener("keydown", (event) => {
        if (event.key === "Escape" && isModalOpen) closeModal();
    });
}