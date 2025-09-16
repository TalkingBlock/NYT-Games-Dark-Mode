function enableMenuDarkMode() {
    const menuCSS = `
        /* Main Background: #0f0f0f */

        .pz-row {
            background: #0f0f0f;
            color: white;
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

        .section__header, .progress__sectionHeader, .hub-section-header, 
        body .progress__playMoreLink, .oneLiner, .date {
            color: white;
        }

        body .featured .date, body .island .date {
            color: black;
        }

        body .progress__playMoreLink:hover {
            background-color: #777777;
        }

        body .thumb .printTool {
            background: #0f0f0f;
        }

        .print:hover {
            filter: invert(1);
        }

        body .tab__tabGroup .tab__tab>.active {
            background-color: #0f0f0f;
            color: white;
            border-color: #777777;
        }

        body .tab__tabGroup .tab__tab {
            background-color: #222222;
        }

        body .tab__tabGroup .tab__tab:hover {
            color: white;
        }

        .expandToRow {
            background-color: #0f0f0f;
        }

        body .tab__tabGroup .tab__tabNav {
            border: 1px solid #777777;
            background-color: #0f0f0f;
        }

        body .hub-game-card {
            border-color: #0f0f0f;
        }

        body .hub-game-card:hover.pips,
        body .hub-game-card:hover.letter-boxed,
        body .hub-game-card:hover.tiles,
        body .hub-game-card:hover.sudoku {
            border-right-color: #cccccc;
            border-bottom-color:#cccccc;
        }

        body .hub-game-card__button {
            border-color: #cccccc;
        }

        .featured .print:hover,
        .island .print:hover {
            filter: invert(0);
        }

        .island.loadingDay {
            background-color: #0f0f0f;
        }

        .moar-games-variant.hub-welcome, .accordion__drawerContent, .section__container {
            background-color: #0f0f0f;
        }

        .moar-games-variant .hub-welcome__title {
            color: white;
        }

        .alternate-card-phone.moar-games-variant {
            background-color: #0f0f0f;
            margin-bottom: 0px;
            border-bottom: 12px solid #0f0f0f;
        }

        .accordion__drawerTitle {
            color: white;
            background-color: black;
            border-top: 1px solid white;
            border-bottom: 1px solid white;
        }

        .accordion__drawerTitle:active {
            background: #777777;
        }    

        .hub-mobile-stats__container {
            color: white;
            background-color: #0f0f0f;
        }

        .hub-mobile-stats__time {
            color: white;
        }

        body .alternate-card-phone.loading-card {
            background-color: #0f0f0f;
        }

        @media (max-width: 767.98px) {
            #hub-root {
                background-color: #0f0f0f;
            }
        }
    `;
    const style = document.createElement("style");
    style.id = "menustyle";
    style.innerText = menuCSS;
    document.head.appendChild(style);
}

function disableMenuDarkMode() {
    const styleElement = document.getElementById("menustyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableMenuDarkMode") {
        if (document.getElementById("menustyle")) {
            disableMenuDarkMode();
        } else {
            enableMenuDarkMode();
        }
    }
});

chrome.storage.sync.get("menuDarkModeEnabled", function(data) {
    if (data.menuDarkModeEnabled) {
        enableMenuDarkMode();
    }
});