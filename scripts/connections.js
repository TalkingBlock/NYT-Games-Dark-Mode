function enableConnectionsDarkMode() {
    const connectionsCSS = `
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

        .pz-game-screen, .pz-game-field {
            background-color: #0f0f0f;
        }

        .pz-content {
            background-color: #0f0f0f;
            color: white;
        }

        .Board-module_form__B5pmo h2 {
            color: white;
        }

        .Mistakes-module_mistakesContent__nlijY {
            color: white;
        }

        .Mistakes-module_bubble__nDlOh {
            background-color: white;
        }

        .Card-module_label__U_Q2H, .ActionButton-module_button__IlhXt {
            background-color: #dddddd;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        .ToolbarItem-module_toolbar_item__xrBr_ {
            background-color: #0f0f0f;
        }

        .ToolbarItem-module_toolbar_item__xrBr_:hover {
            background-color: #777777;
        }

        .ActionButton-module_button__IlhXt.ActionButton-module_filled__zUShw {
            background-color: rgb(179, 167, 254);
            color: black;
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