function enableStrandsDarkMode() {
    const strandsCSS = `
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

        .styles-module_strandsBtn__xobCT {
            color: white;
        }

        .hint-module_bluebulb__QtJ5d {
            color: black !important;
            background: white;
        }

        .styles-module_word__LwKKp.styles-module_invalidshake__KMQkk {
            color: white !important;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .ToolbarItem-module_toolbarColorsDesktop__WYw3W:hover, .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777
        }

        .xwd__modal--overlay {
			background-color: #0f0f0f;
		}

        body .xwd__modal--body {
            background-color: #0f0f0f;
            color: white;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .1);
        }

        .Hints-module_confirmButton__PyF6x {
            background-color: white;
            color: black;
        }
        
        .pz-icon-close {
            filter: invert(1);
        }

        .Stats-module_wrapper__zUfh0 {
            background: #0f0f0f;
            color: white;
        }

        .Stat-module_stats__row__xnktL {
            border-bottom: 1px solid white;
        }

        .Stats-module_stats__CB23r {
            border-top: 1px solid white;
        }

        .Stats-module_inline_carrot__icon__YCGc0 {
            filter: invert(1);
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a:hover, .Dropdown-module_dropdown__menuItem__FJHMg button:hover {
            background-color: #777777;
        }

        .carousel-module_buttonsWrapper__sEp8T button {
            border: 1px solid white;
            color: white;
        }

        .carousel-module_wrapper__ZdPMF, .Help-module_title___5yTv {
            background: #0f0f0f;
            color: white;
        }

        .carousel-module_currentDot__hbt8i {
            background-color: white;
        }

        .pz-moment {
            background-color: #0f0f0f !important;
        }

        .Congrats-module_fullscreenContent__hmx5w, .Congrats-module_shareDescriptor__XO5GF {
            color: white;
        }

        .Stats-module_inline_right_caret___XXBU {
            filter: invert(1);
        }

        body .css-27fpwl {
            background: white;
            color: black;
        }

        body .css-27fpwl:hover {
            outline: #e4e4e4 solid 3px;
        }

        .pz-game-wrapper {
            background-color: #0f0f0f !important;
        }

        .darkPage1Gif, .darkPage3Gif {
            filter: invert(0.94);
        }

        .RegiWall-module_regiwall_abstract_stats_legacy__wB9dR {
            filter: invert(1);
        }

        body .button-dark-mode-support {
            background: white;
            color: black;
        }

        body .button-dark-mode-support:hover:enabled {
            background: #e4e4e4;
        }

        body .RegiWall-module_log_in_link__NlizD {
            color: white;
        }
    `;
    const style = document.createElement("style");
    style.id = "strandsstyle";
    style.innerText = strandsCSS;
    document.head.appendChild(style);
}

function disableStrandsDarkMode() {
    const styleElement = document.getElementById("strandsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableStrandsDarkMode") {
        if (document.getElementById("strandsstyle")) {
            disableStrandsDarkMode();
        } else {
            enableStrandsDarkMode();
        }
    }
});

chrome.storage.sync.get("strandsDarkModeEnabled", function(data) {
    if (data.strandsDarkModeEnabled) {
        enableStrandsDarkMode();
    }
});