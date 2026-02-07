function enableCrosswordDarkMode() {
    const svgURL_Settings = chrome.runtime.getURL("svgs/settings-black.svg");
    const svgURL_Help = chrome.runtime.getURL("svgs/help.svg");
    const svgURL_Pencil = chrome.runtime.getURL("svgs/pencil-black.svg");
    const svgURL_PencilActive = chrome.runtime.getURL("svgs/pencil-active.svg");
    const svgURL_Assistance = chrome.runtime.getURL("svgs/assistance-black.svg");
    const svgURL_Checkmark = chrome.runtime.getURL("svgs/check-standard.svg");
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const crosswordCSS = `
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
            border: 1px solid white;
        }

        body .css-1igzjy9 a {
            color: black;
        }

        body .css-1igzjy9:hover {
            background-color: #e4e4e4;
        }

        /* Main Sidebar */

        .pz-nav-drawer {
            scrollbar-color: #0f0f0f white;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #0f0f0f;
        }

        .pz-icon-nyt {
            filter: invert(1);
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

        /* Loading Background + Starting Popup */

        .pz-desktop .xwd__loading {
            background-color: #0f0f0f;
        }

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .pz-game-field {
            background: #0f0f0f;
        }

        .xwd__modal--body {
            background-color: #0f0f0f;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
            color: white;
        }

        .xwd__start-modal--icon {
            border: 3px solid white;
            border-radius: 10px;
        }

        .pz-moment__button {
            background: white;
            color: black;
        }

        .pz-moment__button.primary:active {
            background: #e4e4e4;
        }

        /* Game Toolbar */

        .xwd__timer--button {
            background-color: #0f0f0f;
        }

        .xwd__tool--button button {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__tool--button :hover {
            background-color: #777777;
            color: white;
        }

        .xwd__toolbar_icon--settings-gear {
            background-image: url("${svgURL_Settings}");
        }

        .xwd__timer--button i {
            filter: invert(1);
        }

        .xwd__toolbar_icon--support {
            background-image: url("${svgURL_Help}");
        }

        .xwd__toolbar_icon--pencil {
            background-image: url("${svgURL_Pencil}");
        }

        .xwd__toolbar_icon--pencil-active {
            background-image: url("${svgURL_PencilActive}");
        }

        .xwd__toolbar_icon--cheat-menu {
            background-image: url("${svgURL_Assistance}");
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink, .xwd__support-menu .xwd__menu--item a,
        .xwd__support-menu .xwd__menu--item {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink:hover, .xwd__support-menu .xwd__menu--item a:hover,
        .xwd__support-menu .xwd__menu--item:hover {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        /* Settings + Reaveal Puzzle Popups */

        .xwd__settings-modal--form {
            scrollbar-color: white #0f0f0f;
        }

        .xwd__settings-btns--wrapper .pz-moment__button.secondary {
            color: white;
            border: 1px solid white;
            opacity: 1;
        }

        .xwd__settings-btns--wrapper .secondary:disabled {
            color: white;
            border: 1px solid white;
            opacity: .5;
        }

        .xwd__modal--close .pz-icon {
            filter: invert(1);
        }

        .xwd__modal--button-container .pz-moment__button.secondary {
            color: white;
            border: 1px solid white;
        }

        /* Game Page */

        .xwd__layout_puzzle--desktop {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__clue-list--list {
            scrollbar-color: black white;
        }

        [data-group="grid"] rect, [data-group="grid"] path {
            stroke: #161718;
        }

        .xwd__clue--filled span {
            color: #959595;
        }

        .xwd__clue-bar-desktop--bar.obscured, .xwd__clue-list--obscured li span:last-child {
            background-color: #777777;
            color: #777777;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header {
            border-top: solid 6px white;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a,
        .xwd__editorial-content--editorialCard .xwd__editorial-content--kicker,
        .xwd__editorial-content--editorialCard .xwd__editorial-content--meta {
            color: white;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a::after {
            border-right: 2px solid white;
            border-top: 2px solid white;
        }

        .xwd__printtools--button {
            background-color: #0f0f0f;
            color: white;
            border: 1px solid white;
        }

        .xwd__printtools--button:hover {
            background-color: #0f0f0f;
            color: white;
            opacity: .75;
        }

        .pz-icon-print-black {
            filter: invert(1);
        }

        .xwd__print-modal--printModalContent .xwd__print-modal--cellDarkness 
        .xwd__print-modal--opacityIcon .xwd__print-modal--userOpacity {
            border: 1px solid white;
        }

        /* Crossword Board + Clue Colors (These will be changable!) */

        .xwd__cell text /* Letter in cell */ {
            fill: white;
        }

        .xwd__assistance--confirmed~text:last-of-type /* Correct letter in cell */ {
            fill: #a9d6fe;
        }
        
        .xwd__cell--cell /* Empty cell */ {
            fill: #585863;
        }

        .xwd__cell--block /* Prefilled cell */ {
            fill: #161718;
        }

        .xwd__cell--shaded /* Shaded cell */ {
            fill: #383840;
        }

        .xwd__cell--related /* Clue related cell */ {
            fill: #596d83;
        }

        .xwd__cell--highlighted, .xwd__cell--related.xwd__cell--highlighted /* Highlighted word cell */ {
            fill: #483f80;
        }

        .xwd__cell--highlighted.xwd__cell--shaded /* Shaded + highlighted cell */ {
            fill: #383361;
        }

        .xwd__cell--selected, .xwd__cell--related.xwd__cell--highlighted.xwd__cell--selected /* Selected cell */ {
            fill: #4678aa;
        }

        .xwd__cell--selected.xwd__cell--shaded /* Shaded + selected cell */{
            fill: #476e93;
        }

        .xwd__cell--cell+circle, .xwd__cell--cell+path /* Circle within cell */ {
            stroke: #161718;
        }

        .xwd__clue--highlighted /* Highlighted clue */ {
            border-left-color: #483f80;
        }

        .xwd__clue--related /* Related clue */ {
            background-color: #596d83;
        }

        .xwd__clue--selected /* Selected clue */ {
            background-color: #483f80;
        }

        .xwd__clue-bar-desktop--bar /* Main selected clue */ {
            background: #393361;
            color: white;
        }

        /* Congrats Page */

        .xwd__congrats-modal--content, .mini__congrats-modal--content {
            color: white;
        }

        body .css-1k8l6v3 hr {
            border-top: 2px solid white;
        }

        .xwd__modal--close:hover {
            color: #777777;
        }

        .xwd__share-modal_shareLink {
            color: white;
        }

        .xwd__share-modal_shareLinkButton.xwd__share-modal_copiedLink {
            background-image: url("${svgURL_Checkmark}");
        }

        /* Subscribe Popup */

        .xwd__modal--button-container .mini-welcome-subscribe-anon-cta_button {
            background-color: #0f0f0f;
            border: 2px solid white;
            color: white;
        }

        /* Error Page */

        .pz-error__message h1 {
            color: white;
        }

        .pz-error__button {
            color: black;
            background-color: white;
            border: 1px solid white;
        }

        .pz-error-img-1 {
            background-image: url("${svgURL_Error404Small}");
        }

        @media (min-width: 444px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404Small}");
            }   
        }

        @media (min-width: 768px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404Medium}");
            }
        }

        @media (min-width: 992px) {
            .pz-error-img-1 {
                background-image: url("${svgURL_Error404XL}");
            }
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