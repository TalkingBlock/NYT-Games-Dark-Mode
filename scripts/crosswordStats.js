function enableCrosswordStatsDarkMode() {
    const crosswordStatsCSS = `
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

        #stats-overview, .stats-subheader {
            color: white;
        }

        .xwd--loading-bar__fill {
            background-color: white;
        }

        .day-of-week {
            color: white;
        }

        #weekly-stats .single-day.active {
            box-shadow: 0 0 #0f0f0f, 0 0px #0f0f0f, -4px 0 4px 0px rgba(0, 0, 0, .6), 4px 0 4px 2px rgba(0, 0, 0, .6);
        }

        @media only screen and (min-width: 768px) {
            #weekly-stats .single-day.active {
                box-shadow: 0 0 #0f0f0f, 0 6px #0f0f0f, -4px 0 4px -2px rgba(0, 0, 0, .6), 4px 0 4px -2px rgba(0, 0, 0, .6);
            }
        }

        #weekly-stats .single-day .no-stats {
            background: repeating-linear-gradient(-45deg, #000, #000 5px, #0f0f0f 5px, #0f0f0f 10px);
        }
    `;
    const style = document.createElement("style");
    style.id = "crosswordStatsstyle";
    style.innerText = crosswordStatsCSS;
    document.head.appendChild(style);
}

function disableCrosswordStatsDarkMode() {
    const styleElement = document.getElementById("crosswordStatsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableCrosswordStatsDarkMode") {
        if (document.getElementById("crosswordStatsstyle")) {
            disableCrosswordStatsDarkMode();
        } else {
            enableCrosswordStatsDarkMode();
        }
    }
});

chrome.storage.sync.get("crosswordStatsDarkModeEnabled", function(data) {
    if (data.crosswordStatsDarkModeEnabled) {
        enableCrosswordStatsDarkMode();
    }
});