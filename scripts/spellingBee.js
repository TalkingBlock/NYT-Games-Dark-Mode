function enableSpellingBeeDarkMode() {
    const svgURL_Genius = chrome.runtime.getURL("svgs/sb-stats-genius.svg");
    const spellingBeeCSS = `
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

        .pz-game-wrapper {
            background-color: #0f0f0f !important;
        }

        .pz-game-field {
            background: #0f0f0f;
            color: white;
        }

        .hive-cell .cell-fill {
            stroke: #0f0f0f;
        }

        .error-message .sb-message {
            background-color: white;
            color: black;
        }

        .conversion-banner {
            border-top: 1px solid white;
        }

        .hive-action {
            color: white;
        }

        .hive-action__shuffle {
            filter: invert(1);
            border: 1px solid black;
        }

        .pz-toolbar-button {
            color: white;
        }

        .pz-toolbar-button:hover {
            background-color: #777777;
        }

        .pz-toolbar-icon.external, .conversion-banner__icon {
            filter: invert(1);
        }

        .pz-dropdown__arrow {
            border-top: 5px solid white;
        }

        .pz-dropdown__arrow.reverse {
            border-bottom: 5px solid white;
        }

        .pz-dropdown>.pz-dropdown__button:not(.pz-dropdown__show),
        .pz-desktop .button.pz-dropdown__button:hover {
            background-color: #0f0f0f !important;
            color: white;
        }

        .pz-dropdown__label {
            color: white;
        }

        .pz-dropdown .pz-dropdown__show {
            color: black;
            background-color: #777777 !important;
        }

        .pz-dropdown__menu-item button, .pz-dropdown__menu-item a {
            background-color: #0f0f0f;
            color: white;
        }

        .pz-desktop button.pz-dropdown__button:hover,
        .pz-desktop a.pz-dropdown__button:hover {
            background-color: #777777;
            color: white;
        }

        .pz-game-toolbar {
            background-color: #0f0f0f;
        }

        .sb-modal-scrim {
            background-color: #00000060;
        }

        .sb-modal-content {
            background-color: #0f0f0f;
            color: white;
        }

        .sb-lifetime-stats {
            border-top: 1px solid white;
        }

        .Stat-module_stats__row__xnktL {
            border-bottom: 1px solid white;
        }

        .sb-modal-frame.stats .sb-modal-header {
            background-color: #0f0f0f;
        }

        .sb-modal-top {
            background-color: #0f0f0f;
        }

        .sb-modal-content::after {
            background: linear-gradient(180deg, #0f0f0f00 0%, color-mix(in srgb, #0f0f0f, #0f0f0f00 20%) 56.65%, #0f0f0f 100%)
        }

        .sb-modal-close {
            color: white;
        }

        .TrophyItem-module_name__wbtJx {
            color: white;
        }

        ProgressBar-module_progressBar__MOWb7 {
            background-color: black;
            border: 1px solid white;
        }
            
        ProgressBar-module_progressBarFill__E7Rrg {
            background-color: white;
            border: 1px solid black;
        }

        button.sb-stats-bar {
            background-color: #0f0f0f;
            color: white;
        }

        .sb-stats-bar__text.sb-game-in-progress {
            color: white;
        }

        .sb-stats-bar__arrow {
            filter: invert(1);
        }

        .pz-toggle {
            border: 1px solid #777777;
        }

        .pz-toggle__option:first-child {
            border-right: 1px solid #777777;
        }

        .pz-toggle__option.selected {
            background-color: #0f0f0f;
            color: white;
        }

        .pz-toggle__option {
            background-color: #222222;
            color: #959595;
        }

        .sb-stats-bar__current {
            background-color: white;
        }

        .Stat-module_genius__HKzOf {
            background-image: url("${svgURL_Genius}");
        }

        .bottom-border--active.list-item--today, .bottom-border--active.list-item--yesterday {
            border-bottom: 1px solid #979797;
        }

        .sb-modal-frame {
            box-shadow: 0 0 10px #ffffff14;
        }

        @media (min-width: 768px) {
            .sb-modal-frame {
                box-shadow: 0 0 23px #ffffff14;
            }
        }

        .sb-modal-content .sb-modal-body .sb-modal-buttons-container button.button-primary {
            background-color: white;
            color: black;
        }

        .sb-modal-content .sb-modal-body .sb-modal-buttons-container button.button-secondary {
            border: 1px solid white;
            color: white;
        }

        .sb-modal-ranks__rank-title, .sb-modal-ranks__rank-points {
            color: white;
        }

        .sb-modal-ranks__rank-title .current-rank,
        .sb-modal-ranks__rank-title .sub-text,
        .sb-modal-ranks__current .sb-modal-ranks__rank-points {
            color: black;
        }
        
        .pz-icon-close {
            filter: invert(1);
        }

        .pz-moment__close_text, .StatsOnCongratsMoments-module_statsToggle__jDOu9,
        .pz-moment__congrats .pz-moment__description, .pz-moment__congrats .pz-moment__title {
            color: white;
        }

        .Stat-module_stats__row__xnktL.Stat-module_topBorder___ilW5 {
            border-top: 1px solid white;
        }

        .pz-moment__congrats .pz-moment {
            background-color: #0f0f0f !important;
        }

        .pz-moment__congrats .pz-moment__content .pz-moment__button.secondary {
            border: 1px solid white;
            color: white;
        }

        .pz-moment__congrats .pz-moment__content .pz-moment__button.primary {
            background-color: white;
            color: black;
        }

        .GamesCarouselStack-module_frictionMitigationContent__sfyQO 
        .GamesCarouselStack-module_carouselStackContainer__ogcQ6 hr {
            border-top: solid 2px white;
        }

        .GamesCarouselStack-module_gamesStackOuter__hu4_1 {
            color: white;
        }
    `;
    const style = document.createElement("style");
    style.id = "spellingbeestyle";
    style.innerText = spellingBeeCSS;
    document.head.appendChild(style);
}

function disableSpellingBeeDarkMode() {
    const styleElement = document.getElementById("spellingbeestyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableSpellingBeeDarkMode") {
        if (document.getElementById("spellingbeestyle")) {
            disableSpellingBeeDarkMode();
        } else {
            enableSpellingBeeDarkMode();
        }
    }
});

chrome.storage.sync.get("spellingBeeDarkModeEnabled", function(data) {
    if (data.spellingBeeDarkModeEnabled) {
        enableSpellingBeeDarkMode();
    } 
});