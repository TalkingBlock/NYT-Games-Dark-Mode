function enableWordleArchiveDarkMode() {
    const wordleArchiveCSS = `
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

        .Header-module_archiveHeader__rjL9u {
            border-bottom: 1px solid white;
            background-color: #0f0f0f;
            color: white;
        }

        .ArchiveLayout-module_wrapper__agJhw {
            background-color: #0f0f0f;
        }

        .ArchiveCalendarItem-module_dateContainer__Op4ma {
            color: white;
        }

        .ArchiveCalendarGrid-module_daysOfWeekContainer__LjX8P {
            border-bottom: 1px solid white;
            color: white;
        }

        .ArchiveLayout-module_helpCenterLink__ibGAv {
            color: white;
        }
    `;
    const style = document.createElement("style");
    style.id = "wordlestyle";
    style.innerText = wordleArchiveCSS;
    document.head.appendChild(style);
}

function disableWordleArchiveDarkMode() {
    const styleElement = document.getElementById("wordlearchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableWordleArchiveDarkMode") {
        if (document.getElementById("wordlestyle")) {
            disableWordleArchiveDarkMode();
        } else {
            enableWordleArchiveDarkMode();
        }
    }
});

chrome.storage.sync.get("wordleArchiveDarkModeEnabled", function(data) {
    if (data.wordleArchiveDarkModeEnabled) {
        enableWordleArchiveDarkMode();
    }
});