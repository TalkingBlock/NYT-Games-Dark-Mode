function enableSpellingBeeArchiveDarkMode() {
    const svgURL_Swirl = chrome.runtime.getURL("svgs/path-swirl.svg");
    const svgURL_Wavy = chrome.runtime.getURL("svgs/path-wavy.svg");
    const spellingBeeArchiveCSS = `
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
            scrollbar-color: #0f0f0f white;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #0f0f0f;
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

        /* Ads + Loading Bar + Footer */

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

        /* Today's Puzzle Section */

        .Layout-module_outerWrapper__kO4JV {
            background-image: url("${svgURL_Swirl}"), url("${svgURL_Wavy}"),
                              linear-gradient(to bottom, #0f0f0f 377px, #151515 377px);
        }

        @media (max-width: 991.98px) {
            .Layout-module_outerWrapper__kO4JV {
                background-image: url("${svgURL_Swirl}"), url("${svgURL_Wavy}"),
                                  linear-gradient(to bottom, #0f0f0f 332px, #151515 332px);
            }
        }

        @media (max-width: 767.98px) {
            .Layout-module_outerWrapper__kO4JV {
                background-image: none, none, linear-gradient(to bottom, #0f0f0f 306px, #151515 306px);
            }
        }

        /* Rest of Page */

        .Layout-module_outerWrapper__kO4JV .Layout-module_innerWrapper__J9ldt {
            color: white;
        }

        .PastPuzzlesSections-module_pastPuzzlesContent__KwLBJ 
        .PastPuzzlesSections-module_weekSectionContainer__LNvJi {
            border-top: 2px solid white;
        }

        .HeroCard-module_heroCard___sPDU {
            color: black;
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