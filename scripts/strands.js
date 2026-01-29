function replaceVideo(selector, newSource) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || source.dataset.replaced) return;
    source.dataset.originalSource = source.src;
    source.src = chrome.runtime.getURL(newSource);
    source.dataset.replaced = "true";
    video.load();
}

function restoreVideo(selector) {
    const video = document.querySelector(selector);
    if (!video) return;
    const source = video.querySelector("source");
    if (!source || !source.dataset.originalSource) return;
    source.src = source.dataset.originalSource;
    delete source.dataset.replaced;
    delete source.dataset.originalSource;
    video.load();
}

function enableStrandsDarkMode() {
    const svgURL_Regiwall = chrome.runtime.getURL("svgs/strands-stats-regiwall.svg");
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

        .TrophyItem-module_name__wbtJx {
            color: white;
        }

        .RegiWall-module_regiwall_abstract_stats__L6lxo {
            background: url(${svgURL_Regiwall}) center no-repeat;
        }

        .feature-awareness .pz-icon-close {
            filter: none;
        }

        .FeatureAwareness-module_ctaContainer__Q4Zve {
            border: 1px solid #0f0f0f;
            background-color: #0f0f0f;
            color: white;
        }

        .FeatureAwareness-module_cta__t36d0 {
            background-color: white;
            color: black;
        }

        .hint-module_lightbulb__YfeFm {
            background: #0f0f0f;
        }

        .hint-module_lightbulb__YfeFm::before {
            border: 2px solid #9f9f9f;
        }

        .hint-module_overlay___9ixH {
            border: 2px solid white;
            background-color: #0f0f0f;
        }

        .hint-module_overlay___9ixH>div {
            border: none;
        }

        .BadgeDetail-module_background__Y5IWc, 
		.pz-moment__frame, .BadgeDetail-module_container__RKO_D {
			background-color: #0f0f0f;
		}

		.BadgeDetail-module_background__Y5IWc path {
			fill: #005b6d !important;
		}

		.BadgeDetail-module_layeredGridItem__sybv8 {
			color: white;
		}

		.BadgeDetailCTAs-module_buttonContainer__Td8eU a.pz-moment__button.secondary.default {
			color: white;
			border: 1px solid white;
		}

		.BadgeDetail-module_helpCenterIcon__ZsJPD, .BadgeDetail-module_closeIcon__pPedP {
			fill: white;
		}

        .pz-moment__close_text .inner-text {
            color: white;
        }

        .BadgeCarousel-module_badgeHeader__H_g5M h3 {
            color: white;
        }
    `;
    const style = document.createElement("style");
    style.id = "strandsstyle";
    style.innerText = strandsCSS;
    document.head.appendChild(style);

    applyDarkModeVideosIfEnabled();
    const observer = new MutationObserver(() => {
        applyDarkModeVideosIfEnabled();
    });
    observer.observe(document.body, {childList: true, subtree: true});
    window.strandsObserver = observer;
}

function applyDarkModeVideosIfEnabled() {
    if (!document.getElementById("strandsstyle")) return;
    replaceVideo(".darkPage1Gif", "mp4s/FirstGIFH2P.mp4");
    replaceVideo(".darkPage3Gif", "mp4s/ThirdGIFH2P.mp4");
}


function disableStrandsDarkMode() {
    const styleElement = document.getElementById("strandsstyle");
    if (styleElement) {
        styleElement.remove();
    }

    restoreVideo(".darkPage1Gif");
    restoreVideo(".darkPage3Gif");
    if (window.strandsObserver) {
        window.strandsObserver.disconnect();
        window.strandsObserver = null;
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