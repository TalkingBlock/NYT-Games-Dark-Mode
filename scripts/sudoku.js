function enableSudokuDarkMode() {
    const svgURL_IconClose = chrome.runtime.getURL("svgs/icon-close-2.svg");
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const sudokuCSS = `
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

        /* Game Toolbar */

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background: #0f0f0f;
            color: white;
        }

        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .su-timer__value {
            color: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a:hover, .Dropdown-module_dropdown__menuItem__FJHMg button:hover {
            background-color: #777777;
        }

        /* How to Play, Settings, Pause Popups */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .modal-rules-body.su-modal-help, .su-modal-help.modal-stats-body,
        .modal-settings-body.su-modal-settings, .modal-pause-body.su-modal-pause {
            background: #0f0f0f;
            color: white;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
        }

        .xwd__modal--close .pz-icon, .kebab-icon {
            filter: invert(1);
        }

        .pz-modal__button.primary {
            background-color: white;
            color: black;
        }

        /* Game Page */

        ._moment_1d9lu_8 {
            background-color: #0f0f0f;
        }

        .su-keyboard__mode.candidateMode, .su-keyboard__mode.normalMode {
            background-color: white;
            color: black;
        }

        .su-keyboard__mode {
            background-color: #0f0f0f;
            border: 1px solid #777777;
            color: #979797;
        }

        .su-keyboard__undo, .su-keyboard__delete, .su-keyboard__number {
            background-color: #434342;
        }

        .su-keyboard__undo:active, .su-keyboard__delete:active, .su-keyboard__number:active {
            background-color: #0f0f0f;
            color: #979797;
        }

        .su-keyboard__svg {
            fill: white;
        }

        .su-keyboard__delete {
            background-image: url("${svgURL_IconClose}");
        }

        .su-keyboard__undo {
            color: white;
        }

        .su-keyboard__auto [role="button"] {
            color: white;
        }

        .su-board__frame {
            outline: 0px solid white;
        }

        /* Sudoku Board Colors (these will be changable!) */

        .su-cell /* Empty cell */ { 
            background-color: #0f0f0f;
        }

        .su-cell.prefilled /* Prefilled cell */ {
            background-color: #434342;
        }

        .su-cell:not(.selected).highlighted /* Cell that will be affected with no number in cell */ {
            background-color: #5c5639;
        }

        .su-cell:not(.selected).highlighted.prefilled /* Cell that will be affected with a number in cell */ {
            background-color: #413a25;
        }

        .su-cell.selected.highlighted /* Cell currently selected */ {
            background-color: #fc9b00;
        }

        .su-cell.prefilled.highlightedSameNumber /* User filled cell with same number as selected cell */ {
            background-color: #9f6f21;
        }

        .su-cell:not(.selected).highlightedSameNumber /* Cell with same number as selected cell */ {
            background-color: #9e6708;
        }

        .su-cell:not(.selected).highlightedSameNumber.prefilled /* Prefilled cell with same number as selected cell */ {
            background-color: #563b0a;
        }   

        .su-cell__value>path, .selected .su-cell__value>path /* All filled/prefilled numbers */ {
            fill: white;
        }

        .selected .su-cell__value>path /* Number with selected cell */ {
            fill: black;
        }

        .su-candidates>svg>path /* Candidate numbers */ {
            fill: lightgray; 
        }

        /* Congrats Popup */

        .xwd__modal--body.modal-congrats-body {
            background: #0f0f0f;
            color: white;
        }

        button.css-1299j98 {
            background: white;
            color: black;
        }

        button.css-1299j98:hover:enabled {
            background: #e4e4e4;
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
    style.id = "sudokustyle";
    style.innerText = sudokuCSS;
    document.head.appendChild(style);
}

function disableSudokuDarkMode() {
    const styleElement = document.getElementById("sudokustyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableSudokuDarkMode") {
        if (document.getElementById("sudokustyle")) {
            disableSudokuDarkMode();
        } else {
            enableSudokuDarkMode();
        }
    }
});

chrome.storage.sync.get("sudokuDarkModeEnabled", function(data) {
    if (data.sudokuDarkModeEnabled) {
        enableSudokuDarkMode();
    }
});