function enableStrandsArchiveDarkMode() {
    const svgURL_DateArrow = chrome.runtime.getURL("svgs/date-picker-arrow.svg");
    const strandsArchiveCSS = `
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

        /* Ads + Loading Bar + Footer */

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

        /* Calendar Page */

        .Header-module_archiveHeader__rjL9u {
            color: white;
            border-bottom: 1px solid white;
        }

        .ArchiveLayout-module_wrapper__agJhw {
            background-color: #0f0f0f;
            color: white;
        }

        .ArchiveCalendarGrid-module_daysOfWeekContainer__LjX8P {
            border-bottom: 1px solid white;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH {
            border: 1px solid white;
            background: #0f0f0f;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH:disabled {
            border: 1px solid #777777;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH path {
            fill: white;
        }

        .ArchiveDatePickerArrows-module_arrowButtons__qvxhH:disabled path {
            fill: #777777;
        }

        select.ArchiveDatePicker-module_dropDownSelect__BqLa6 {
            border: 1px solid white;
            color: white;
            background: url("${svgURL_DateArrow}") no-repeat #0f0f0f;
            background-position: calc(100% - .75rem) center
        }

        /* Not Logged In Popup */

        .xwd__modal--wrapper .ArchiveModalPaywall-module_modalOverlay__zCxO6 {
            background: linear-gradient(180deg, rgba(15, 15, 15, 0) 0%, rgba(15, 15, 15, 0) 40%, #0f0f0f 55%);
        }

        .ArchiveModalPaywall-module_modalBody__QbLIt h3, 
        .ArchiveModalPaywall-module_modalBody__QbLIt p {
            color: white;
        }
    `;
    const style = document.createElement("style");
    style.id = "strandsarchivestyle";
    style.innerText = strandsArchiveCSS;
    document.head.appendChild(style);
}

function disableStrandsArchiveDarkMode() {
    const styleElement = document.getElementById("strandsarchivestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableStrandsArchiveDarkMode") {
        if (document.getElementById("strandsarchivestyle")) {
            disableStrandsArchiveDarkMode();
        } else {
            enableStrandsArchiveDarkMode();
        }
    }
});

chrome.storage.sync.get("strandsArchiveDarkModeEnabled", function(data) {
    if (data.strandsArchiveDarkModeEnabled) {
        enableStrandsArchiveDarkMode();
    }
});