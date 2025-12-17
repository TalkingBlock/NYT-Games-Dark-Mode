function enableCrosswordsArchiveDarkMode() {
    const crosswordsArchiveCSS = `
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

        .pz-game-screen {
            background-color: #0f0f0f;
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
            background-color: #222222;
        }

        .archive_date-selector-container {
            background-color: #0f0f0f;
        }

        .archive_date-selector-container select {
            color: white;
            background: #0f0f0f;
        }

        .progressIconContent.puzzleProgress0,
        .progressIconContent.miniProgress0 {
            border: 1px solid white;
        }

        .calendar.puzzleInfo .date {
            color: white;
        }

        .calendar.puzzleInfo .printTool {
            background-color: #0f0f0f;
        }

        .print:hover,
        .cardRibbon.brandNew {
            filter: invert(1);
        }

        .island .print:hover {
            filter: invert(0);
        }

        .archive_list-item .archive_title, .archive_list-item .archive_date, .archive_list-item 
        .archive_author, .archive_list-item .archive_puzzle-actions, .archive_list-item .archive_title>a,
        .archive_list-columns {
            color: white;
        }

        .archive_list-item .archive_puzzle-actions a:visited {
            color: mediumpurple;
        }

        .archive_calendar-item {
            color: white;
        }

        .pz-page {
            background: #0f0f0f;
        }

        .archive_overlay-gradient--mini-redesign {
            background: linear-gradient(to bottom, rgba(15, 15, 15, 0.5) 0%, rgb(15, 15, 15) 100%);
        }

        .archive_overlay-body--mini-redesign {
            background: #0f0f0f;
            color: white;
        }

        .archive_subscribe-button--mini-redesign {
            background-color: black;
        }

        .archive_subscribe-button--mini-redesign--login {
            background-color: white;
            color: black;
        }
    `;
    const style = document.createElement("style");
    style.id = "crosswordsarchivestyle";
    style.innerText = crosswordsArchiveCSS;
    document.head.appendChild(style);
}

function disableCrosswordsArchiveDarkMode() {
    const styleElement = document.getElementById("crosswordsarchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableCrosswordsArchiveDarkMode") {
        if (document.getElementById("crosswordsarchivestyle")) {
            disableCrosswordsArchiveDarkMode();
        } else {
            enableCrosswordsArchiveDarkMode();
        }
    }
});

chrome.storage.sync.get("crosswordsArchiveDarkModeEnabled", function(data) {
    if (data.crosswordsArchiveDarkModeEnabled) {
        enableCrosswordsArchiveDarkMode();
    }
});