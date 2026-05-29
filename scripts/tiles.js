function enableTilesDarkMode() {
    const tilesCSS = `
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

        .pz-game-title {
            color: white;
        }

        /* Game Toolbar */

        .ToolbarAdapter-module_toolbarContainer__Ni4KN, .Game-module_toolbarContainer__PB1iO {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777;
        }

        [data-testid="icon-help"] path {
            fill: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg button, 
        .Dropdown-module_dropdown__menuItem__FJHMg a, 
        .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover, 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover {
            background-color: #777777;
        }

        [data-testid="icon-arrow"] path {
            fill: white;
        }

        /* Tileset and How to Play Popup */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .xwd__modal--body {
            background-color: #0f0f0f;
            color: white;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .5);
        }

        .tlz-palette-button {
            color: white;
            border: 1px solid #dddddd;
        }

        .tlz-palette-button.selected {
            border: solid 2px white;
        }

        .pz-icon-close {
            filter: invert(1);
        }

        .tlz-bob {
            border: 1px solid white;
        }

        .tlz-bob.active {
            background-color: white;
        }

        .tlz-palette-arrows {
            filter: invert(1);
        }

        .pz-settings-icon path {
            fill: white;
        }

        /* Congrats Popup */

        .xwd__modal--body.modal-congrats-body {
            background: #0f0f0f;
            color: white;
        }

        body .css-1lxqcbc {
            color: black;
            background-color: white;
            border: 1px solid white;
        }

        body .css-1lxqcbc:hover {
            color: black;
            background-color: #777777;
            border: 1px solid #777777;
        }
        
        .css-1k8l6v3 hr {
            border-top: 2px solid white;
        } 
    `;
    const style = document.createElement("style");
    style.id = "tilesstyle";
    style.innerText = tilesCSS;
    document.head.appendChild(style);
}

function disableTilesDarkMode() {
    const styleElement = document.getElementById("tilesstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableTilesDarkMode") {
        if (document.getElementById("tilesstyle")) {
            disableTilesDarkMode();
        } else {
            enableTilesDarkMode();
        }
    }
});

chrome.storage.sync.get("tilesDarkModeEnabled", function(data) {
    if (data.tilesDarkModeEnabled) {
        enableTilesDarkMode();
    }
});