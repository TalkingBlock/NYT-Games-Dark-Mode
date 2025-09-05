document.addEventListener("DOMContentLoaded", () => {
    document.body.classList.add("no-transition");
    const checkboxes = Array.from(document.querySelectorAll(".darkmode-box input[type='checkbox']"));
    const ids = checkboxes.map(cb => cb.id).filter(Boolean);

    function attachListeners() {
        checkboxes.forEach(cb => {
            cb.addEventListener("change", () => {
                chrome.storage.local.set({ [cb.id]: cb.checked });
            });
        });
    }

    function finishInit() {
        attachListeners();
        requestAnimationFrame(() => {
            requestAnimationFrame(() => {
                document.body.classList.remove("no-transition");
            });
        });
    }

    if (ids.length) {
        chrome.storage.local.get(ids, (result) => {
            checkboxes.forEach(cb => {
                if (result.hasOwnProperty(cb.id)) {
                    cb.checked = !!result[cb.id];
                }
            });
            finishInit();
        });
    } else {
        finishInit();
    }
});
