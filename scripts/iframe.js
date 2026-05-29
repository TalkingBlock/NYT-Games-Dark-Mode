function applyIframeDarkMode() {
    const iframeCSS = `
        .css-ec6qvc-IframeBody, .css-1pd93lg-FormBox, .css-68379f-HiddenInput {
            background-color: #0f0f0f !important;
        }

        .css-sfogtm-InputLabel, .css-stk443-Separator {
            color: white !important;
        }

        .css-11g480x-InputBox {
            color: white !important;
            background-color: #0f0f0f !important;
        }

        .css-1aaraqy-FieldBox, .css-1p2nody-FieldBox {
            border: 1px solid white !important;
        }

        .css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button {
            border: 0.0625em solid white !important;
            color: black !important;
            background-color: white !important;
        }

        .css-1i3jzoq-buttonBox-buttonBox-primaryButton-primaryButton-Button:hover {
            background-color: #e4e4e4 !important;
            border-color: #e4e4e4 !important;
            color: black !important;
        }

        .css-1k28tcn-formStyles-formStyles-EnterEmailSsoBottom .legal-disclaimer p,
        .css-1k28tcn-formStyles-formStyles-EnterEmailSsoBottom .legal-disclaimer p a,
        .css-1pd93lg-FormBox a {
            color: white !important;
        }
    `;

    const style = document.createElement("style");
    style.id = "iframestyle";
    style.innerText = iframeCSS;
    document.head.appendChild(style);
}

chrome.storage.sync.get(null, function(data) {
    const anyDarkModeEnabled = Object.values(data).some(v => v === true);
    if (anyDarkModeEnabled) {
        if (document.head) {
            applyIframeDarkMode();
        } else {
            document.addEventListener("DOMContentLoaded", applyIframeDarkMode);
        }
    }
});

chrome.runtime.onMessage.addListener(function(message) {
    const isDarkModeToggle = message.action && message.action.toLowerCase().includes("darkmode");
    if (isDarkModeToggle) {
        chrome.storage.sync.get(null, function(data) {
            const anyDarkModeEnabled = Object.values(data).some(v => v === true);
            const existingStyle = document.getElementById("iframestyle");
            if (anyDarkModeEnabled && !existingStyle) {
                applyIframeDarkMode();
            } else if (!anyDarkModeEnabled && existingStyle) {
                existingStyle.remove();
            }
        });
    }
});
