function enableConnectionsDarkMode() {
    const svgURL_Regiwall = chrome.runtime.getURL("svgs/connections-stats-regiwall.svg");
    const connectionsCSS = `
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

        .ToolbarAdapter-module_toolbarContainer__Ni4KN, .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbar_itemDesktop__jFTZJ:hover {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .Dropdown-module_dropdown__menuItem__FJHMg a, .Dropdown-module_dropdown__menuItem__FJHMg button {
            background-color: #0f0f0f;
            color: white;
        }

        .Dropdown-module_dropdown__menuItemDesktop__tygNX a:hover, 
        .Dropdown-module_dropdown__menuItemDesktop__tygNX button:hover {
            background-color: #777777;
        }

        /* Stats + How to Play Popup */

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .xwd__modal--body {
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255 .3);
        }

        .modal-stats-body {
            background-color: #0f0f0f;
            color: white;
        }

        .Stats-module_stats__Oq7rS {
            border-top: 1px solid white;
        }

        .Stat-module_stats__row__xnktL {
            border-bottom: 1px solid white;
        }

        .TrophyItem-module_name__wbtJx {
            color: white;
        }

        .ProgressBar-module_progressBar__MOWb7 {
            background-color: black !important;
            border: 1px solid white !important;
        }

        .ProgressBar-module_progressBarFill__E7Rrg {
            border-color: black !important;
            background-color: white !important;
        }

        .xwd__modal--close .pz-icon, .Stats-module_inline_carrot__icon__G2cbk {
            filter: invert(1);
        }

        .Stats-module_histogram_bar___Mxj8 {
            background-color: #444444;
        }

        .modal-rules-body.conn__modal--help {
            background: #0f0f0f;
            color: white;
        }

        .HowToPlay-module_helpArrow__WMXx9 {
            filter: invert(1);
        }

        .Stats-module_regiwall_stats_badges__yjE6J {
            background: url("${svgURL_Regiwall}") center no-repeat;
        }

        button.button-dark-mode-support {
            background: white;
            color: black;
        }

        button.button-dark-mode-support:hover:enabled {
            background: #e4e4e4;
        }

        /* Badges Page */

        .pz-moment__badgeDetail, .BadgeDetail-module_container__RKO_D {
            background-color: #0f0f0f;
            color: white;
        }

        .pz-desktop .Congrats-module_wrapper__vzL87 {
            background-color: #0f0f0f !important;
        }

        .BadgeDetail-module_background__Y5IWc path {
			fill: #2c132f !important;
		}

        .BadgeDetail-module_helpCenterIcon__ZsJPD {
            fill: white;
        }

        .BadgeDetailCTAs-module_buttonContainer__Td8eU button.pz-moment__button.secondary.default, 
        .BadgeDetailCTAs-module_buttonContainer__Td8eU a.pz-moment__button.secondary.default {
            color: white;
            border: 1px solid white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v {
            background-color: #0f0f0f;
            border: 1px solid white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v path {
            fill: white;
        }

        .BadgeDetail-module_arrowButton__LtZ8v:disabled {
            border: 1px solid #777777;
        }

        .BadgeDetail-module_closeIcon__pPedP {
            fill: white;
        }

        .pz-moment__frame, .BadgeDetail-module_background__Y5IWc {
            background-color: #0f0f0f;
        }

        /* Game Page */

        ._moment_1d9lu_8 {
            background-color: #0f0f0f;
        }

        .Board-module_form__B5pmo {
            color: white;
        }

        .Card-module_label__U_Q2H {
            background-color: white;
            color: black;
        }

        .Card-module_label__U_Q2H.Card-module_selected__cN2eT {
            background-color: #777777;
            color: white;
        }

        .Mistakes-module_mistakesContent__nlijY {
            color: white;
        }

        .Mistakes-module_bubble__nDlOh {
            background-color: white;
        }

        .ActionButton-module_button__IlhXt {
            background-color: #0f0f0f;
            color: white;
            border-color: white;
        }

        .ActionButton-module_button__IlhXt:disabled {
            background-color: #0f0f0f;
            color: white;
            border-color: white;
            opacity: .5;
        }

        .ActionButton-module_button__IlhXt.ActionButton-module_filled__zUShw {
            background-color: white;
            color: black;
        }

        .Toast-module_toast__YAoDa {
            background-color: white;
            color: black;
        }

        /* Congrats Page */

        .Congrats-module_modalContent__LWPwi, .css-adlkoi p, body .css-1gd2pxv {
            color: white;
        }

        body .css-1jvmgpk {
            border-bottom: 1px solid white;
        }

        button.css-1wqvipx, button.css-zoyaaz {
            background: white;
            color: black;
        }

        button.css-1wqvipx:hover:enabled, button.css-zoyaaz:hover:enabled {
            background: #e4e4e4;
            color: black;
        }

        button.css-kkbic9 {
            color: white;
            border: 1px solid white;
        }

        button.css-kkbic9:hover:enabled {
            color: white;
        }

        .pz-moment__close_text.Congrats-module_closeButton__KtTXC {
            filter: invert(1);
        }

    `;
    const style = document.createElement("style");
    style.id = "connectionsstyle";
    style.innerText = connectionsCSS;
    document.head.appendChild(style);
}

function disableConnectionsDarkMode() {
    const styleElement = document.getElementById("connectionsstyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableConnectionsDarkMode") {
        if (document.getElementById("connectionsstyle")) {
            disableConnectionsDarkMode();
        } else {
            enableConnectionsDarkMode();
        }
    }
});

chrome.storage.sync.get("connectionsDarkModeEnabled", function(data) {
    if (data.connectionsDarkModeEnabled) {
        enableConnectionsDarkMode();
    }
});