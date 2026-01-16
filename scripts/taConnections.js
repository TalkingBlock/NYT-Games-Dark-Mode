function enableTAConnectionsDarkMode() {
    const taConnectionsCSS = `
        /* Toolbar */

        .ToolBar_content__uBhTg {
            background-color: #0f0f0f;
        }

        body .Nav_TA_CollabDesktop__oBU_1 path, body .Nav_TA_CollabMobile__6pB6E path {
            fill: white;
        }

        .Nav_hamburger__8vvYK {
            background-color: #0f0f0f;
        }

        .Nav_hamburgerLine__WlEGr {
            background-color: white;
        }

        /* Menu Sidebar */

        .Nav_drawer__zUJBS {
            background-color: #0f0f0f;
            color: white;
        }

        .Nav_navItem__c5wKU {
            color: white;
        }

        .Nav_navItemWrapper__9FfdP:hover {
            background-color: #777777;
        }

        .Nav_icon-connections__2rfhc {
            border: 1px solid white;
            border-radius: 20%;
        }

        .Nav_icon-nyt__Fw6mx {
            filter: invert(1);
        }

        /* Ad Page */

        .InterstitialAd_adBody__DQLO6 {
            background-color: #0f0f0f;
        }

        .InterstitialAd_adControlsContainer__ydgVU {
            border-top: 1px solid white;
            background-color: #0f0f0f;
        }

        .InterstitialAd_adTimerContainer__hBBxs div {
            color: white;
        }

        .InterstitialAd_adContinueContainer__uOGv8 {
            color: white;
        }

        .InterstitialAd_adCaretContainer__i6S7T {
            filter: invert(1);
        }

        .InterstitialAd_adTimerContainer__hBBxs>div:last-child {
            border-left: 1px solid white;
        }

        /* Toolbar Interactables */

        div.App_toolbar__l_J2c>div>div:last-child>div>a, 
        div.App_toolbar__l_J2c>div>div:last-child>div>button, 
        div.App_toolbar__l_J2c>div>div:last-child>div>div>button {
            filter: invert(1);
        }
        div.App_toolbar__l_J2c>div>div:last-child>div>a:hover, 
        div.App_toolbar__l_J2c>div>div:last-child>div>button:hover, 
        div.App_toolbar__l_J2c>div>div:last-child>div>div>button:hover {
            background-color: #777777;
        }

        .Dropdown_dropdownItem__PJxWl a, .Dropdown_dropdownItem__PJxWl button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown_dropdownItem__PJxWl a:hover, .Dropdown_dropdownItem__PJxWl button:hover {
            background-color: #777777;
        }

        img[alt="dropdown arrow"] {
            filter: invert(1);
        }

        .Modal_content__mW7Xx {
            color: white;
            background-color: #0f0f0f;
        }

        .closeX_closeX__GlEGx {
            background-color: white;
        }

        .ToolbarMessage_titleText__9QJ7s .closeX_closeX__GlEGx {
            background-color: black;
        }

        .Help_helpArrow__WyGGr {
            filter: invert(1);
        }

        .Stats_shareButton__NpkFB {
            color: black;
            background-color: white;
        }

        /* Results Page */

        .Congrats_backToPuzzle__aYmfn button, .Difficulty_difficultyContainer__LbXDB,
        .Difficulty_difficultyPercent__qTzOL, .Difficulty_difficultyRate__9El7j,
        .MostPopular_header-title__bGfW4, .MostPopular_item-title__YFcDz {
            color: white;
        }

        .Congrats_actions__UTIPV button {
            color: black;
            background-color: white;
        }

        .SponsorshipBottomBanner_bottomBanner__gDBu_ {
            box-shadow: 0 0 rgba(255, 255, 255, 0), 0 0 rgba(255, 255, 255, 0), 1px -3px 6px rgba(255, 255, 255, .15)
        }        
    `;
    const style = document.createElement("style");
    style.id = "taconnectionsstyle";
    style.innerText = taConnectionsCSS;
    document.head.appendChild(style);
}

function disableTAConnectionsDarkMode() {
    const styleElement = document.getElementById("taconnectionsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableTAConnectionsDarkMode") {
        if (document.getElementById("taconnectionsstyle")) {
            disableTAConnectionsDarkMode();
        } else {
            enableTAConnectionsDarkMode();
        }
    }
});

chrome.storage.sync.get("taConnectionsDarkModeEnabled", function(data) {
    if (data.taConnectionsDarkModeEnabled) {
        enableTAConnectionsDarkMode();
    } 
});