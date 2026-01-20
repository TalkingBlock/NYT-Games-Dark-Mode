function enableCrosswordStatsDarkMode() {
    const imgURL_UpsellStats = chrome.runtime.getURL("imgs/upsell_stats.png");
    const crosswordStatsCSS = `
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

        /* Main Sidebar */

        .pz-nav-drawer {
            scrollbar-color: #0f0f0f white;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #0f0f0f;
        }

        .DirectLink-module_directLink__description__SPUgJ,
        .LinkGroup-module_linkGroup__header__e8tYm,
        body .ExpansionButton-module_ExpansionButton__lqTjh {
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

        .pz-nav__button {
            background-color: white;
            color: black;
        }

        .pz-nav__button.white {
            background-color: black;
            color: white;
            border-color: white;
        }

        .pz-nav__button:hover,
        .pz-nav__button.white:hover {
            background-color: #e4e4e4;
            color: black;
        }

        /* Ads + Loading Bar + Footer */

        .pz-ad-box {
            background-color: #0f0f0f;
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

        /* Stats Page */

        #stats-overview, .stats-subheader {
            color: white;
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

        /* Not Logged In Page */

        .overlay-container {
            background-color: rgba(0, 0, 0, .8);
            color: white;
        }

        .overlay-body {
            background-color: #0f0f0f;
            box-shadow: 0 0 20px 0 rgba(255, 255, 255, .1);
        }

        #stats-root .info-container p {
            color: white;
        }

        .image-container {
            background: url("${imgURL_UpsellStats}") no-repeat;
            background-size: contain;
        }
    `;
    const style = document.createElement("style");
    style.id = "crosswordstatsstyle";
    style.innerText = crosswordStatsCSS;
    document.head.appendChild(style);
}

function disableCrosswordStatsDarkMode() {
    const styleElement = document.getElementById("crosswordstatsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableCrosswordStatsDarkMode") {
        if (document.getElementById("crosswordstatsstyle")) {
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