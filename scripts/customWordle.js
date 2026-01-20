function enableCustomWordleDarkMode() {
    const imgURL_Hint1 = chrome.runtime.getURL("imgs/cywp-hint-1.png");
    const imgURL_Hint2 = chrome.runtime.getURL("imgs/cywp-hint-2.png");
    const customWordleCSS = `
        /* Main Background: #0f0f0f */

        #js-global-nav {
            background: #0f0f0f;
        }

        .pz-nav__logo rect {
            fill: #0f0f0f;
        }

        .pz-nav__logo path {
            fill: white;
        }

        body .pz-nav__hamburger-inner, body .pz-nav__hamburger-inner::before, body .pz-nav__hamburger-inner::after {
            background-color: white;
        }

        body .pz-nav__hamburger:focus {
            background-color: #777777;
        }

        body .pz-ad-box {
            background-color: #0f0f0f;
        }

        body .pz-footer {
            background-color: #0f0f0f;
            color: white;
        }

        body .Footer-module_legalLink__saQgH a {
            color: white;
        }

        .DirectLink-module_directLink__description__SPUgJ,
        .LinkGroup-module_linkGroup__header__e8tYm,
        body .ExpansionButton-module_ExpansionButton__lqTjh {
            color: white;
        }

        .pz-icon-arrow-down, .pz-icon-arrow-up {
            filter: invert(1);
        }

        .CustomNav-module_customNav__RX0TG, body .pz-nav-drawer {
            background: #0f0f0f;
            border-top: 1px solid white;
        }

        body .CollapsibleLink-module_collapsibleLink__NvSrT:hover, 
        body .CollapsibleLink-module_isexpanded__AGnRL, 
        body .DirectLink-module_directLink__kSggP:hover,
        body .pz-nav-drawer__link:hover {
            background-color: #777777;
        }

        body .pz-nav-drawer__account {
            border-top: 1px solid white;
            background-color: #0f0f0f;
            color: white;
            margin-top: 0px;
        }

        body .pz-nav__button.gray:hover,
        body .pz-nav__button.white:hover {
            background-color: #e4e4e4;
            color: black;
        }

        html .pz-page {
            background-color: #0f0f0f;
        }

        .Welcome-module_welcomeWrapper__Gv8Mi {
            background-image: linear-gradient(to right, #333 1.5px, transparent 2.5px),linear-gradient(to bottom, #333 1.5px, transparent 2.5px);
            background-color: #0f0f0f;
        }

        .Welcome-module_contentContainer___oG64 {
            color: white;
        }

        .Welcome-module_buttonContainer__pK1JE button, .Welcome-module_buttonContainer__pK1JE a {
            background: white;
            color: black;
        }

        .Welcome-module_buttonContainer__pK1JE button.Welcome-module_secondary__AYpws, 
        .Welcome-module_buttonContainer__pK1JE a.Welcome-module_secondary__AYpws {
            background: black;
            color: white;
            border: 1px solid white
        }

        #solutionWord-label, #displayName-label, #hint-label {
            color: white;
        }

        .FormInput-module_inputField__inIfE {
            border: 1px solid #5a5a5a;
            background: #0f0f0f;
            color: white;
        }

        .CreationForm-module_legalDisclaimer__yFK6d {
            color: white;
        }

        .CreationForm-module_submitButton__jezRS:disabled {
            background: #777777;
            color: #ffffff50;
        }

        .ToolbarItem-module_toolbarColors__d6naZ, .ToolbarItem-module_toolbar_item__xrBr_ {
            background: #0f0f0f;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover, .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .modal-rules-body.cywp__modal--help, .cywp__modal--help.modal-stats-body {
            background: #0f0f0f;
            color: white;
        }

        .Tile-module_tile__UWEHN[data-state=tbd] {
            background-color: #0f0f0f;
            color: white;
        }

        [aria-label="An example of a text input with the display name entered, such as Sherlock"] img {
            content: url("${imgURL_Hint1}");
        }

        [aria-label*="An example of a text input with a custom hint entered"] img {
            content: url("${imgURL_Hint2}");
        }

        .pz-icon-close {
            filter: invert(1);
        }

        .create-wordle-end-body {
            background: #0f0f0f;
            color: white;
        }

        .End-module_feedbackLink__MlJcR {
            border-bottom: 1px solid white;
        }

        .End-module_endTile__GG9e1 {
            border: 1.5px solid #0f0f0f;
        }

        .Toast-module_toast__iiVsN {
            background-color: white;
            color: black;
        }

        .xwd__modal--close:hover {
            color: #777777;
        }
    `;
    const style = document.createElement("style");
    style.id = "customwordlestyle";
    style.innerText = customWordleCSS;
    document.head.appendChild(style);
}

function disableCustomWordleDarkMode() {
    const styleElement = document.getElementById("customwordlestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableCustomWordleDarkMode") {
        if (document.getElementById("customwordlestyle")) {
            disableCustomWordleDarkMode();
        } else {
            enableCustomWordleDarkMode();
        }
    }
});

chrome.storage.sync.get("customWordleDarkModeEnabled", function(data) {
    if (data.customWordleDarkModeEnabled) {
        enableCustomWordleDarkMode();
    }
});