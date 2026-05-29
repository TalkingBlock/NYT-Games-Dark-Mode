let pipsSourceObserver = null;
let pipsReplaceTimeout = null;

function replaceVideo(selector, newSource) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source) return;
    const newSrc = chrome.runtime.getURL(newSource);
    if (source.src === newSrc) {
        video.style.visibility = 'visible';
        return;
    }
    if (!source.dataset.originalSource) {
        source.dataset.originalSource = source.src || "";
    }
    source.src = newSrc;
    video.load();
    video.style.visibility = 'visible';

    if (pipsSourceObserver) pipsSourceObserver.disconnect();
    pipsSourceObserver = new MutationObserver(() => {
        if (!source.isConnected) return;
        if (source.src !== newSrc) {
            source.src = newSrc;
        }
    });
    pipsSourceObserver.observe(source, {attributes: true, attributeFilter: ["src"]});
}

function restoreVideo(selector) {
    if (pipsSourceObserver) {
        pipsSourceObserver.disconnect();
        pipsSourceObserver = null;
    }
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || !source.dataset.originalSource) return;
    source.src = source.dataset.originalSource;
    delete source.dataset.originalSource;
    video.load();
    video.style.visibility = '';
}

function enablePipsDarkMode() {
    const pipsCSS = `
        /* Toolbar */

        html .pz-page {
            background-color: #0f0f0f;
        }

        .pz-nav {
            background: #0f0f0f;
        }

        .pz-nav__logo rect {
            fill: #0f0f0f;
        }

        .pz-nav__logo path {
            fill: white;
        }

        .pz-nav__hamburger-inner, .pz-nav__hamburger-inner::before, .pz-nav__hamburger-inner::after {
            background-color: white;
        }

        .pz-nav__hamburger:focus {
            background-color: #777777;
        }

        body .css-1igzjy9 {
            background-color: white;
        }

        body .css-1igzjy9 a {
            color: black;
        }

        body .css-1igzjy9:hover {
            background-color: #e4e4e4;
        }

        /* Main Sidebar */

        .pz-nav-drawer {
            background: #0f0f0f;
            scrollbar-color: white #0f0f0f;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #0f0f0f;
        }

        .pz-icon-nyt, .pz-icon-athletic {
            filter: invert(1);
        }        

        .pz-icon-daily {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Crossword-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-midi {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Midi-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-mini {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Mini-Icon-Normalized-Color.svg");
        }

        .pz-icon-connections {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Connections-Icon-Dark-Mode.svg");
        }

        .pz-icon-spelling-bee {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/SpellingBee-Icon-Normalized-Color.svg");
        }

        .pz-icon-wordle {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/page-icons/wordle-icon-padded.svg");
        }

        .pz-icon-pips {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Pips-Icon-Normalized-Color.svg");
        }

        .pz-icon-strands {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Strands-Icon-Normalized-Color.svg")
        }

        .pz-icon-letter-boxed {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/LetterBoxed-Icon-Normalized-Color.svg");
        }

        .pz-icon-tiles {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Tiles-Icon-Normalized-Color.svg");
        }

        .pz-icon-sudoku {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Sudoku-Icon-Normalized-Color.svg");
        }

        .DirectLink-module_directLink__description__SPUgJ,
        .LinkGroup-module_linkGroup__header__e8tYm,
        body .ExpansionButton-module_ExpansionButton__lqTjh,
        .pz-nav-drawer__heading,
        .pz-nav-drawer__account .pz-nav-drawer__link {
            color: white;
        }

        .pz-icon-arrow-up, .pz-icon-arrow-down {
            filter: invert(1);
        }

        .CollapsibleLink-module_collapsibleLink__NvSrT:hover, 
        .CollapsibleLink-module_isexpanded__AGnRL, 
        .DirectLink-module_directLink__kSggP:hover,
        .pz-nav-drawer__link:hover {
            background-color: #777777;
        }

        .DirectLink-module_directLink__pill__lFxm9 {
            background-color: white;
            color: black;
        }

        .pz-nav-drawer__account {
            background-color: #0f0f0f;
            border-top: 1px solid white;
            margin-top: 0px;
        }

        .pz-nav-drawer__account-actions .pz-nav__button {
            background-color: white;
            color: black;
        }

        .pz-nav__button:hover {
            background-color: #e4e4e4;
        }

        .pz-nav__button.white {
            background-color: black;
            color: white;
            border-color: white;
        }

        .pz-nav__button.white:hover {
            background-color: #777777;
            color: white;
        }

        .pz-nav__button.gray:hover {
            background-color: #e4e4e4;
        }

        /* Ads + Loading Bar + Footer + Title */

        .pz-ad-box {
            background-color: #0f0f0f;
        }

        .pz-ad-box::before {
            color: white;
            border: 1px solid white;
        }

        .xwd--loading-bar__fill {
            background-color: white;
        }

        .pz-footer {
            background-color: #0f0f0f;
            color: white;
        }

        .Footer-module_legalLink__saQgH a {
            color: white;
        }

        .pz-module {
            color: white;
        }

        /* Game Toolbar */

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ path,
        .Toolbar-module_toolbarRight__VADxO .game-icon,
        [data-testid="icon-arrow"] path {
            fill: white;
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

        .Timer-module_timerValue__pF6nA {
            color: white;
        }
            
        /* Pause, Reference, Settings and Reveal Popups */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .xwd__modal--body {
            background-color: #0f0f0f;
            color: white;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .Button-module_button__WxR62 {
            background-color: white;
            color: black;
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

        .pz-icon-close {
            filter: invert(1);
        }

        .SettingsModal-module_title__aR9bD {
            color: white;
        }

        ._footNote_kbfjk_1 {
            color: #8b8b8b;
        }

        .RevealModal-module_primary__Uass7 {
            color: black;
            background-color: white;
        }

        .RevealModal-module_secondary__kAuqv {
            border: 1px solid white;
            color: white;
            background-color: black;
        }

        /* How To Play Popup */

        .Help-module_helpContent__z9yZl, .carousel-module_carouselNavigation__WPAci {
            background-color: #0f0f0f;
        }

        .carousel-module_buttonsWrapper__xuzls button {
            border: 1px solid white;
            color: white;
            background-color: black;
        }

        .carousel-module_buttonsWrapper__xuzls button.carousel-module_play__RzWpB {
            background: white;
            color: black;
        }

        .Help-module_regionTransitions__iXxh3 {
            color: white;
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

        .carousel-module_swipe__ZyaWm, 
        .carousel-module_carouselPage__ZEB4H,
        .TutorialPuzzle-module_tutorialScrim__azZoc,
        .Tray-module_trayContainer__zSWYr.Tray-module_isTutorial__oBYJI {
            background-color: #0f0f0f;
        }

        /* Hide tutorial video until dark mode version is loaded */

        .Help-module_howToPlayGif__S5Kic {
            visibility: hidden;
        }

        /* Game Page */

        .GameMoment-module_gameContainer__Vuha8 {
            background-color: #0f0f0f;
        }

        .GameMoment-module_instructions__ZW7Et {
            background-color: #0f0f0f;
            color: white;
        }

        .Tray-module_trayContainer__zSWYr {
            background-color: #0f0f0f;
            border-top: 1px solid white;
        }

        .Toastify__toast-theme--dark {
            background: white;
            color: black;
        }

        /* Congrats Page */

        .CongratsModal-module_backToPuzzle__aBXu5 button {
            color: white
        }

        .CongratsModal-module_primary__eycd1 {
            color: black;
            background-color: white;
        }

        .CongratsModal-module_congratsModalBody__v1jMi .button-secondary {
            color: white;
            background-color: black;
            border: 1px solid white;
        }

        button.button-secondary:hover:enabled {
            background: black;
            color: white;
            opacity: .85;
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "pipsstyle";
    style.innerText = pipsCSS;
    document.head.appendChild(style);

    applyDarkModeVideoIfEnabled();
    const observer = new MutationObserver(() => {
        clearTimeout(pipsReplaceTimeout);
        pipsReplaceTimeout = setTimeout(() => applyDarkModeVideoIfEnabled(), 0);
    });
    observer.observe(document.documentElement, {childList: true, subtree: true});
    window.strandsObserver = observer;
}

function applyDarkModeVideoIfEnabled() {
    if (!document.getElementById("pipsstyle")) return;
    replaceVideo(".Help-module_howToPlayGif__S5Kic", "mp4s/h2p-gif-slowed.mp4");
}

function disablePipsDarkMode() {
    const styleElement = document.getElementById("pipsstyle");
    if (styleElement) {
        styleElement.remove();
    }

    clearTimeout(pipsReplaceTimeout);
    pipsReplaceTimeout = null;
    restoreVideo(".Help-module_howToPlayGif__S5Kic");
    if (window.strandsObserver) {
        window.strandsObserver.disconnect();
        window.strandsObserver = null;
    }
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