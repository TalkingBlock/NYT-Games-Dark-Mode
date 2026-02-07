function enableMenuDarkMode() {
    const menuCSS = `
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
            border: 1px solid white;
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

        /* Featured Cards */

        .hub-welcome-loading {
            background-color: #0f0f0f;
        }

        .featured.standard, .featured.primary, .hub-stats-card__puzzle-info, .hub-promo-card {
            background: #0f0f0f;
        }

        .hub-promo-card:hover {
            background: #0f0f0f;
        }

        @media (min-width: 992px) {
            .featured.standard:hover, .featured.primary:hover, .hub-stats-card__puzzle-info:hover, .hub-promo-card:hover {
                background-color: #181818;
            }
        }

        .hub-welcome-sections h3.title, .hub-welcome-sections div.date, div.hub-stats-card__title,
        .hub-stats-card__streak-title, .hub-stats-card__streak-info:first-child, 
        .hub-stats-card__streak-info, div.hub-stats-card__more-stats, .featured .title, h3.hub-promo-card__title {
            color: white;
        }

        .hub-stats-card__streak-block {
            border-top: none;
        }

        .upsell .copy {
            color: #777777;
        }

        /* Game Cards */

        .section__header {
            color: white;
        }

        .hub-game-card {
            background: #0f0f0f;
            border: solid 1px #777777;
        }

        .hub-game-card__button {
            color: white;
            border: 1px solid #777777;
        }

        .hub-game-card.hub-dual-link:hover .hub-game-card__button {
            background: #0f0f0f;
        }

        .hub-game-card.hub-dual-link .hub-game-card__button:hover {
            background: #333333;
        }

        .hub-game-card:hover .hub-game-card__button {
            background: #333333;
        }

        .hub-game-card:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        /* Recent Crosswords + Print Popup */

        .tab__tabGroup .tab__tab>.active {
            background-color: #0f0f0f;
            color: white;
            border-color: #777777;
        }

        .tab__tabGroup .tab__tab {
            background-color: #222222;
        }

        .tab__tabGroup .tab__tab:hover {
            color: white;
        }

        .tab__tabGroup .tab__tabNav {
            border: 1px solid #777777;
            background-color: #0f0f0f;
        }

        .progress__sectionHeader, .oneLiner, .thumb .date, .progress__playMoreLink {
            color: white;
        }

        .progressIconContent {
            border: 1px solid white;
        }

        .progress__playMoreLink:hover {
            background: #777777
        }

        .thumb .printTool {
            background-color: #0f0f0f;
        }

        @media (min-width: 992px) {
            .print:hover {
                filter: invert(1);
            }
        }

        .pzm-modals-wrapper {
            background: rgba(0, 0, 0, .85);
        }

        .pzm-modal {
            background: #0f0f0f;
            border: 1px solid white;
            box-shadow: 0 4px 23px 0 rgba(255, 255, 255, .1);
            color: white;
        }

        .pzm-modal-ex {
            color: white;
        }

        .hub-print-modal-content .hub-print-modal-cell-darkness 
        .hub-print-modal-opacity-icon .hub-print-modal-user-opacity {
            border: 1px solid white;
        }

        .pz-modal__button.dark {
            background-color: white;
            color: black;
        }

        .pz-modal__button.dark:hover {
            background-color: #e4e4e4;
        }

        /* Monthly Bonus + Featured Article */

        .section__container .puzzleInfo .puzzleInfoContent {
            color: white;
        }

        .island {
            background-color: #0f0f0f;
            border: 1px solid #777777
        }

        .island:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        .island:hover .printTool {
            background-color: #0f0f0f;
            border-top: 1px solid #777777;
        }

        .hub-section-header {
            color: white;
        }

        .hub-guide-promo-card {
            border: solid 1px #777777;
        }

        .hub-guide-promo-card-content {
            background: #0f0f0f;
        }

        .hub-guide-promo-card-content h2 {
            color: white;
        }

        .hub-guide-promo-card:hover {
            box-shadow: 2px 2px 0 0 #555555;
        }

        .hub-puzzle-group__more-link a {
            color: white;
            background: #222222;
        }

        .hub-puzzle-group__more-link a:hover {
            background: #555555;
        }

        /* Smaller Than 767.99 Pixels Page */

        @media (max-width: 767.98px) {
            .moar-games-variant.hub-welcome {
                background-color: #0f0f0f;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .featured {
                border: solid 1px #777777;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-welcome__title {
                color: white;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-wordplay-link {
                color: white;
                background-color: #0f0f0f;
                border: 1px solid #777777;
            }
        }

        @media (max-width: 767.98px) {
            .moar-games-variant .hub-wordplay-link:hover {
                background-color: #333333;
            }
        }

        .alternate-card-phone.moar-games-variant {
            background-color: #0f0f0f;
        }

        .alternate-card-phone .date {
            color: white;
        }

        @media (max-width: 767.98px) {
            #hub-root {
                background-color: #0f0f0f;
            }
        }

        .accordion__drawerContent {
            background-color: #0f0f0f;
        }

        .accordion__drawerTitle {
            background-color: #222222;
            color: white;
        }

        .accordion__drawerTitle:hover {
            background: #777777;
        }

        .hub-mobile-stats__container {
            background: #0f0f0f;
            color: white;
        }

        .hub-mobile-stats__no-stats {
            background-color: #333333;
        }

        .hub-mobile-stats__stats-more {
            color: white;
            background-color: #333333;
        }

        .hub-mobile-stats__bars-block .grey {
            background-color: #777777;
        }

        .hub-mobile-stats__bars-block .grey:nth-child(1), .hub-mobile-stats__bars-block .grey:nth-child(2) {
            border-right: 2px solid #0f0f0f;
        }
    `;  
    const style = document.createElement("style");
    style.id = "menustyle";
    style.innerText = menuCSS;
    document.head.appendChild(style);
}

function disableMenuDarkMode() {
    const styleElement = document.getElementById("menustyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableMenuDarkMode") {
        if (document.getElementById("menustyle")) {
            disableMenuDarkMode();
        } else {
            enableMenuDarkMode();
        }
    }
});

chrome.storage.sync.get("menuDarkModeEnabled", function(data) {
    if (data.menuDarkModeEnabled) {
        enableMenuDarkMode();
    }
});