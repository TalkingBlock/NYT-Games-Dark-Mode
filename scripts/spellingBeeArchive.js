function enableSpellingBeeArchiveDarkMode() {
    const svgURL_Swirl = chrome.runtime.getURL("svgs/path-swirl.svg");
    const svgURL_Wavy = chrome.runtime.getURL("svgs/path-wavy.svg");
    const spellingBeeArchiveCSS = `
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

        .pz-row {
            color: white;
            background-color: #0f0f0f;
        }

        .pz-game-field {
            background: #0f0f0f;
            color: white;
        }

        .Layout-module_outerWrapper__kO4JV {
            background-image: url("${svgURL_Swirl}"), url("${svgURL_Wavy}"),
                              linear-gradient(to bottom, #121212 377px, #0f0f0f 377px);
        }

        .TodayHero-module_todaysPuzzle__SWZ4c,
        .PastPuzzlesSections-module_pastPuzzlesHeaderContainer__Vrv7H,
        .PastPuzzlesSections-module_weekHeaderSection__BKBJM {
            color: white;
        }

        .PastPuzzlesSections-module_pastPuzzlesContent__KwLBJ
        .PastPuzzlesSections-module_weekSectionContainer__LNvJi {
            border-top: 2px solid white;
        }
    `;
    const style = document.createElement("style");
    style.id = "spellingbeearchivestyle";
    style.innerText = spellingBeeArchiveCSS;
    document.head.appendChild(style);
}

function disableSpellingBeeArchiveDarkMode() {
    const styleElement = document.getElementById("spellingbeearchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableSpellingBeeArchiveDarkMode") {
        if (document.getElementById("spellingbeearchivestyle")) {
            disableSpellingBeeArchiveDarkMode();
        } else {
            enableSpellingBeeArchiveDarkMode();
        }
    }
});

chrome.storage.sync.get("spellingBeeArchiveDarkModeEnabled", function(data) {
    if (data.spellingBeeArchiveDarkModeEnabled) {
        enableSpellingBeeArchiveDarkMode();
    } 
});