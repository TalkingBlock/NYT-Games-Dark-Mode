function enableCrosswordDarkMode() {
    const crosswordCSS = `
        /* Main Background: #0f0f0f */

        .pz-row {
            background: #0f0f0f;
            color: white;
        }

        body .pz-game-field {
            background: #0f0f0f;
        }

        #js-global-nav {
            background: #0f0f0f;
        }

        .pz-content {
            background: #0f0f0f
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

        .xwd__layout_container {
            background: #0f0f0f;
        }

        body .xwd__modal--body {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__modal--content {
            background: #0f0f0f;
            color: white;
        }

        .xwd__timer--button {
            background: #0f0f0f;
        }

        .xwd__timer--button i {
            filter: invert(1);
        }

        .xwd__tool--button button {
            background-color: #0f0f0f !important;
            color: white !important;
        }

        .xwd__tool--button button:hover {
            background-color: #777777 !important;
        }

        .xwd__toolbar_icon--support, .xwd__toolbar_icon--pencil, .xwd__toolbar_icon--settings-gear {
            filter: invert(1);
            background-color: transparent !important;
        }

        .xwd__toolbar_icon--pencil-active {
            filter: brightness(0) saturate(100%) invert(74%) sepia(5%) saturate(3796%) hue-rotate(185deg) brightness(100%) contrast(96%);
            background-color: transparent !important;
        }

        body .xwd__modal--overlay {
            background-color: black;
        }

        .xwd__modal--button-container .pz-moment__button {
            color: black;
            background: white;
        }

        .xwd__modal--button-container .pz-moment__button.secondary {
            color: white;
            background: black;
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

        .xwd__cell text {
            fill: white;
        }

        body .xwd__assistance--confirmed~text:last-of-type {
            fill: #a9d6fe;
        }

        body .xwd__cell--cell {
            fill: #585863;
        }

        body .xwd__cell--block {
            fill: #161718;
        }

        body .xwd__cell--related {
            fill: #596d83;
        }

        body .xwd__cell--highlighted {
            fill: #483f80;
        }

        body .xwd__cell--related.xwd__cell--highlighted {
            fill: #483f80;
        }

        body .xwd__cell--selected {
            fill: #4678aa;
        }

        body .xwd__cell--related.xwd__cell--highlighted.xwd__cell--selected {
            fill: #4678aa;
        }

        body .xwd__clue-bar-desktop--bar {
            background: #393361;
            color: white;
        }

        body .xwd__clue--highlighted {
            border-left-color: #483f80;
        }

        body .xwd__clue--related {
            background-color: #596d83;
        }

        body .xwd__clue--selected {
            background-color: #483f80;
        }

        .xwd__clue--li span {
            color: white;
        }

        .xwd__clue--filled span {
            color: #959595;
        }

        [data-group="grid"] rect, [data-group="grid"] path {
            stroke: #161718;
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

        body .mini__congrats-modal--content {
            color: white;
        }

        body .xwd__modal--close:hover {
            color: #959595;
        }

        .pz-icon-close {
            filter: invert(1);
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink, .xwd__support-menu .xwd__menu--item a {
            background: #0f0f0f;
            color: white;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .xwd__menu--item a:hover {
            background-color: #777777 !important;
        }

        .Icon-module_iconWrapper__ZfKPm:hover,
        [data-testid="icon-arrow"]:hover {
            background-color: transparent !important;
        }

        .xwd__editorial-content--subGameplayGrid h2,
        .xwd__editorial-content--subGameplayGrid p,
        body .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a,
        body .xwd__editorial-content--editorialCard .xwd__editorial-content--kicker {
            color: white;
        }

        body .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header {
            border-top: solid 6px white;
        }

        body .xwd__printtools--button:hover {
            background-color: #e4e4e4;
        }

        .pz-desktop .xwd__loading {
            background-color: #0f0f0f;
        }

        body .xwd--loading-bar {
            background-color: black;
        }

        body .xwd--loading-bar__fill {
            background-color: white;
        }

        html .pz-page {
            background-color: #0f0f0f;
        }
    
        .xwd__start-modal--icon {
            box-shadow: inset 0 0 0 3px white;
            border-radius: 10px;
        }

        .xwd__print-modal--userOpacity {
            border: 1px solid white;
            opacity: 1;
        }
    `;
    const style = document.createElement("style");
    style.id = "crosswordstyle";
    style.innerText = crosswordCSS;
    document.head.appendChild(style);
}

function disableCrosswordDarkMode() {
    const styleElement = document.getElementById("crosswordstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableCrosswordDarkMode") {
        if (document.getElementById("crosswordstyle")) {
            disableCrosswordDarkMode();
        } else {
            enableCrosswordDarkMode();
        }
    }
});

chrome.storage.sync.get("crosswordDarkModeEnabled", function(data) {
    if (data.crosswordDarkModeEnabled) {
        enableCrosswordDarkMode();
    }
});