function replaceVideo(selector, newSource) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || source.dataset.replaced) return;
    source.dataset.originalSource = source.src;
    source.src = chrome.runtime.getURL(newSource);
    source.dataset.replaced = "true";
    video.load();
}

function restoreVideo(selector) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || !source.dataset.originalSource) return;
    source.src = source.dataset.originalSource;
    delete source.dataset.replaced;
    delete source.dataset.originalSource;
    video.load();
}

function enablePipsDarkMode() {
    const pipsCSS = `
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

        .pz-game-screen, .pz-game-field {
            background-color: #0f0f0f;
        }

        .pz-content {
            background-color: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
            color: white;
        }

        .Toolbar-module_toolbar__DGjo1 svg {
            filter: invert(1);
        }

        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777;
        }

        .xwd__modal--overlay {
            background-color: #00000060
        }

        .xwd__modal--body {
            background: #0f0f0f;
            color: white;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .xwd__modal--close .pz-icon {
            filter: invert(1);
        }

        .Button-module_button__WxR62 {
            background-color: white;
            color: black;
        }

        .GameMoment-module_instructions__ZW7Et {
            color: white;
            background-color: #0f0f0f;
        }

        .GameMoment-module_gameContainer__Vuha8 {
            background-color: #0f0f0f;
        }

        .Tray-module_trayContainer__zSWYr {
            background-color: #0f0f0f;
            border-top: 1px solid white;
        }

        .Help-module_iconSymbol__YNX_q {
            background-color: white;
        }

        .Help-module_iconText__uL1Xt {
            color: black;
        }

        .ReferenceModal-module_bold__KQila .Help-module_iconSymbolSVG__NUamL.Help-module_equal__sY30n,
        .Help-module_iconSymbolSVG__NUamL.Help-module_notEqual__lKpg6 {
            filter: invert(1);
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a,
        .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover,
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover {
            background-color: #777777;
        }

        .RevealToggle-module_revealToggle__jY3Zi
        .RevealToggle-module_revealToggleButton__eiwR8.RevealToggle-module_active__BjM6H {
            background-color: #0f0f0f;
            color: white;
        }

        .RevealToggle-module_revealToggle__jY3Zi .RevealToggle-module_revealToggleButton__eiwR8 {
            background-color: #222222;
            border: 1px solid #959595;
            color: #959595;
        }

        .SettingsModal-module_title__aR9bD {
            color: white;
        }

        .RevealModal-module_secondary__kAuqv,
        .CongratsModal-module_congratsModalBody__v1jMi .button-secondary {
            border: 1px solid white;
            color: white;
            background-color: #0f0f0f;
        }

        button.button-secondary:hover:enabled {
            background-color: #1f1f1f;
            color: white;
        }

        .RevealModal-module_primary__Uass7,
        .CongratsModal-module_primary__eycd1 {
            color: black;
            background-color: white;
        }

        .Tray-module_emptyTraySlot__KQ6Lo {
            background-color: #444445;
        }

        .Timer-module_timerValue__pF6nA {
            color: white;
        }

        .xwd__modal--content p, .Help-module_regionTransitions__iXxh3 {
            color: white;
        }

        .Help-module_iconSymbol__YNX_q.Help-module_small__T1hni {
            background-color: white;
        }

        .carousel-module_buttonsWrapper__xuzls button {
            background: #0f0f0f;
            border: 1px solid white;
            color: white;
        }

        .carousel-module_buttonsWrapper__xuzls button.carousel-module_play__RzWpB {
            background: white;
            color: black;
        }

        .carousel-module_carouselNavigation__WPAci,
        .carousel-module_carouselPage__ZEB4H>*,
        .carousel-module_carouselWrapper__CHZQn,
        .TutorialPuzzle-module_tutorialScrim__azZoc,
        .Tray-module_trayContainer__zSWYr.Tray-module_isTutorial__oBYJI {
            background-color: #0f0f0f;
        }

        .Help-module_pulseTeal__vD2oj {
            color: #008293;
        }

        .Help-module_pulsePink__tyMy_ {
            color: #db137a;
        }

        .Help-module_pulseOrange__Etbhj {
            color: #d15609;
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }

        .Toastify__toast-theme--dark {
            background: white;
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "pipsstyle";
    style.innerText = pipsCSS;
    document.head.appendChild(style);

    const observer = new MutationObserver(() => {replaceVideo(".Help-module_howToPlayGif__S5Kic", "mp4s/h2p-gif-slowed.mp4");});
    observer.observe(document.body, {childList: true, subtree: true});
}

function disablePipsDarkMode() {
    const styleElement = document.getElementById("pipsstyle");
    if (styleElement) {
        styleElement.remove();
    }
    restoreVideo(".Help-module_howToPlayGif__S5Kic");
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enablePipsDarkMode") {
        if (document.getElementById("pipsstyle")) {
            disablePipsDarkMode();
        } else {
            enablePipsDarkMode();
        }
    }
});

chrome.storage.sync.get("pipsDarkModeEnabled", function(data) {
    if (data.pipsDarkModeEnabled) {
        enablePipsDarkMode();
    }
});