function enableSudokuDarkMode() {
    const sudokuCSS = `
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

        .pz-module {
            color: white;
        }

        .gameContainer {
            background-color: #0f0f0f;
        }

        .su-keyboard__auto [role="button"] {
            color: white;
        }

        .su-cell {
            background-color: #0f0f0f;
        }

        .su-cell.prefilled {
            background-color: #434342;
        }

        .su-cell:not(.selected).highlighted {
            background-color: #5c5639;
        }

        .su-cell:not(.selected).highlighted.prefilled {
            background-color: #413a25;
        }

        .su-cell.selected.highlighted {
            background-color: #fc9b00;
        }

        .su-cell.prefilled.highlightedSameNumber {
            background-color: #9f6f21;
        }

        .su-cell:not(.selected).highlightedSameNumber {
            background-color: #9e6708;
        }

        .su-cell:not(.selected).highlightedSameNumber.prefilled {
            background-color: #563b0a
        }   
        
        .su-cell__value>path, .selected .su-cell__value>path {
            fill: white;
        }

        .su-board__frame {
            outline: 0px solid white;
        }

        .su-candidates>svg>path {
            fill: lightgray; 
        }

        .xwd__modal--overlay {
            background-color: #0f0f0f;
        }

        .modal-pause-body.su-modal-pause {
            background: #0f0f0f;
            color: white;
        }

        .pz-modal__button.primary {
            background-color: white;
            color: black;
        }

        .pz-modal__button.primary:hover {
            background-color: #e4e4e4;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .1);
        }

        .su-keyboard__mode {
            background-color: #0f0f0f;
            color: #e4e4e4;
            border: 1px solid #e4e4e4;
        }

        .su-keyboard__mode.candidateMode, .su-keyboard__mode.normalMode {
            background-color: white;
            color: black;
        }

        .ToolbarAdapter-module_toolbarContainer__Ni4KN {
            background-color: #0f0f0f;
        }

        .toolbarDesktopInfo, .ToolbarItem-module_toolbar_itemText__jnF3y {
            color: white;
        }

        .su-timer__value {
            color: white;
        }

        .su-timer__pause-icon {
            filter: invert(1);
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background: #0f0f0f;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover, .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777
        }

        .xwd__modal--body.modal-congrats-body {
            background: #0f0f0f;
            color: white;
        }

        body .css-1299j98 {
            background: white;
            color: black;
        }

        body .css-1299j98:hover:enabled {
            background: #e4e4e4;
        }
        
        .confirmed .su-cell__value>path {
            fill: #b5cdff;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg button:hover {
            background-color: #777777;
        }

        .pz-icon-close {
            filter: invert(1);
        }

        .xwd__modal--body.modal-settings-body, .xwd__modal--body.modal-rules-body {
            background: #0f0f0f;
            color: white;
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