const cwColorsStorageKey = "crossword_colors_settings";
const defaultCrosswordColors = {
    cw_cell_borders:            "#161718",
    cw_letter_in_cell:          "#FFFFFF",
    cw_correct_letter_in_cell:  "#A9D6FE",
    cw_empty_cell:              "#585863",
    cw_prefilled_cell:          "#161718",
    cw_shaded_cell:             "#383840",
    cw_related_cell_clue:       "#596D83",
    cw_highlighted_cell_clue:   "#483F80",
    cw_shaded_highlighted_cell: "#383361",
    cw_selected_cell_clue:      "#4678AA",
    cw_shaded_selected_cell:    "#476E93",
    cw_circle_within_cell:      "#161718",
    cw_main_selected_clue:      "#393361"
};

function getCrosswordColors(customColors = {}) {
    return {
        ...defaultCrosswordColors,
        ...customColors
    };
}

function buildCrosswordColorsCSS(customColors = {}) {
    const cwColors = getCrosswordColors(customColors);
    return `
        /* Crossword Board + Clue Colors */

        [data-group="grid"] rect, [data-group="grid"] path /* Cell borders */ {
            stroke: ${cwColors.cw_cell_borders};
        }

        .xwd__cell text /* Letter in cell */ {
            fill: ${cwColors.cw_letter_in_cell};
        }

        .xwd__assistance--confirmed~text:last-of-type /* Correct letter in cell */ {
            fill: ${cwColors.cw_correct_letter_in_cell};
        }
        
        .xwd__cell--cell /* Empty cell */ {
            fill: ${cwColors.cw_empty_cell};
        }

        .xwd__cell--block /* Prefilled cell */ {
            fill: ${cwColors.cw_prefilled_cell};
        }

        .xwd__cell--shaded /* Shaded cell */ {
            fill: ${cwColors.cw_shaded_cell};
        }

        .xwd__cell--related /* Clue related cell */ {
            fill: ${cwColors.cw_related_cell_clue};
        }

        .xwd__cell--highlighted, .xwd__cell--related.xwd__cell--highlighted /* Highlighted word cell */ {
            fill: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__cell--highlighted.xwd__cell--shaded /* Shaded + highlighted cell */ {
            fill: ${cwColors.cw_shaded_highlighted_cell};
        }

        .xwd__cell--selected, .xwd__cell--related.xwd__cell--highlighted.xwd__cell--selected /* Selected cell */ {
            fill: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__cell--selected.xwd__cell--shaded /* Shaded + selected cell */{
            fill: ${cwColors.cw_shaded_selected_cell};
        }

        .xwd__cell--cell+circle, .xwd__cell--cell+path /* Circle within cell */ {
            stroke: ${cwColors.cw_circle_within_cell};
        }

        .xwd__clue--highlighted /* Highlighted clue */ {
            border-left-color: ${cwColors.cw_highlighted_cell_clue};
        }

        .xwd__clue--related /* Related clue */ {
            background-color: ${cwColors.cw_related_cell_clue};
        }

        .xwd__clue--selected /* Selected clue */ {
            background-color: ${cwColors.cw_selected_cell_clue};
        }

        .xwd__clue-bar-desktop--bar /* Main selected clue */ {
            background: ${cwColors.cw_main_selected_clue};
            color: white;
        }
    `;
}

function applyCrosswordColors(customColors = {}) {
    let style = document.getElementById("nyt-crossword-color-style");
    if (!style) {
        style = document.createElement("style");
        style.id = "nyt-crossword-color-style";
        document.head.appendChild(style);
    }
    style.textContent = buildCrosswordColorsCSS(customColors);
}

function removeCrosswordColors() {
    const style = document.getElementById("nyt-crossword-color-style");
    if (style) {
        style.remove();
    }
}

function loadStoredCrosswordColors() {
    chrome.storage.sync.get(cwColorsStorageKey, (data) => {
        const saved = data?.[cwColorsStorageKey]?.crosswords || {};
        const colors = {};
        for (const [key, value] of Object.entries(saved)) {
            colors[key] = value?.hex || defaultCrosswordColors[key];
        }
        applyCrosswordColors(colors);
    });
}

function enableMidiDarkMode() {
    const svgURL_Settings = chrome.runtime.getURL("svgs/settings-black.svg");
    const svgURL_Help = chrome.runtime.getURL("svgs/help.svg");
    const svgURL_Pencil = chrome.runtime.getURL("svgs/pencil-black.svg");
    const svgURL_PencilActive = chrome.runtime.getURL("svgs/pencil-active.svg");
    const svgURL_Assistance = chrome.runtime.getURL("svgs/assistance-black.svg");
    const svgURL_Checkmark = chrome.runtime.getURL("svgs/check-standard.svg");
    const svgURL_Error404Small = chrome.runtime.getURL("svgs/error404-illustration-s.svg");
    const svgURL_Error404Medium = chrome.runtime.getURL("svgs/error404-illustration-m.svg");
    const svgURL_Error404XL = chrome.runtime.getURL("svgs/error404-illustration-xl.svg");
    const midiCSS = `
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
            background: #0f0f0f;
            scrollbar-color: white #0f0f0f;
        }

        .CustomNav-module_customNav__RX0TG, .pz-nav-drawer nav {
            background-color: #0f0f0f;
        }

        .pz-icon-nyt, .pz-icon-athletic {
            filter: invert(1);
        }        

        .pz-icon-daily {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Crossword-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-midi {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Midi-Icon-Normalized-Color.svg");
        }
        
        .pz-icon-mini {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Mini-Icon-Normalized-Color.svg");
        }

        .pz-icon-connections {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Connections-Icon-Dark-Mode.svg");
        }

        .pz-icon-spelling-bee {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/SpellingBee-Icon-Normalized-Color.svg");
        }

        .pz-icon-wordle {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/page-icons/wordle-icon-padded.svg");
        }

        .pz-icon-pips {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Pips-Icon-Normalized-Color.svg");
        }

        .pz-icon-strands {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Strands-Icon-Normalized-Color.svg")
        }

        .pz-icon-letter-boxed {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/LetterBoxed-Icon-Normalized-Color.svg");
        }

        .pz-icon-tiles {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Tiles-Icon-Normalized-Color.svg");
        }

        .pz-icon-sudoku {
            background-image: url("https://www.nytimes.com/games-assets/v2/assets/wordle/nav-icons/Sudoku-Icon-Normalized-Color.svg");
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

        .DirectLink-module_directLink__pill__lFxm9 {
            background-color: white;
            color: black;
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

        /* Loading Background + Starting Popup */

        .pz-desktop .xwd__loading {
            background-color: #0f0f0f;
        }

        .xwd__modal--overlay {
            background-color: #00000060;
        }

        .pz-game-field {
            background: #0f0f0f;
        }

        .xwd__modal--body {
            background-color: #0f0f0f;
            box-shadow: 0 3px 12px -1px rgba(255, 255, 255, .3);
            color: white;
        }

        .xwd__start-modal--icon.midi {
            filter: invert(1);
        }

        .pz-moment__button {
            background: white;
            color: black;
        }

        .pz-moment__button.primary:active {
            background: #e4e4e4;
        }

        /* Game Toolbar */

        .xwd__timer--button {
            background-color: #0f0f0f;
        }

        .xwd__tool--button button {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__tool--button :hover {
            background-color: #777777;
            color: white;
        }

        .xwd__toolbar_icon--settings-gear {
            background-image: url("${svgURL_Settings}");
        }

        .xwd__timer--button i {
            filter: invert(1);
        }

        .xwd__toolbar_icon--support {
            background-image: url("${svgURL_Help}");
        }

        .xwd__toolbar_icon--pencil {
            background-image: url("${svgURL_Pencil}");
        }

        .xwd__toolbar_icon--pencil-active {
            background-image: url("${svgURL_PencilActive}");
        }

        .xwd__toolbar_icon--cheat-menu {
            background-image: url("${svgURL_Assistance}");
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink, .xwd__support-menu .xwd__menu--item a,
        .xwd__support-menu .xwd__menu--item {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__support-menu .xwd__menu--item .xwd__menu--btnlink:hover, .xwd__support-menu .xwd__menu--item a:hover,
        .xwd__support-menu .xwd__menu--item:hover {
            background-color: #777777;
        }

        .Icon-module_iconWrapper__ZfKPm path {
            fill: white;
        }

        /* Settings + Reaveal Puzzle Popups */

        .xwd__settings-modal--form {
            scrollbar-color: white #0f0f0f;
        }

        .xwd__settings-btns--wrapper .pz-moment__button.secondary {
            color: white;
            border: 1px solid white;
            opacity: 1;
        }

        .xwd__settings-btns--wrapper .secondary:disabled {
            color: white;
            border: 1px solid white;
            opacity: .5;
        }

        .xwd__modal--close .pz-icon {
            filter: invert(1);
        }

        .xwd__modal--button-container .pz-moment__button.secondary {
            color: white;
            border: 1px solid white;
        }

        /* Game Page */

        .xwd__layout_puzzle--desktop {
            background-color: #0f0f0f;
            color: white;
        }

        .xwd__clue-list--list {
            scrollbar-color: black white;
        }

        .xwd__clue--filled span {
            color: #959595;
        }

        .xwd__clue-bar-desktop--bar.obscured, .xwd__clue-list--obscured li span:last-child {
            background-color: #777777;
            color: #777777;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header {
            border-top: solid 6px white;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a,
        .xwd__editorial-content--editorialCard .xwd__editorial-content--kicker,
        .xwd__editorial-content--editorialCard .xwd__editorial-content--meta {
            color: white;
        }

        .xwd__editorial-content--subGameplayGrid .xwd__editorial-content--header a::after {
            border-right: 2px solid white;
            border-top: 2px solid white;
        }

        /* Congrats Page */

        .xwd__congrats-modal--content, .mini__congrats-modal--content {
            color: white;
        }

        body .css-1k8l6v3 hr {
            border-top: 2px solid white;
        }

        .xwd__modal--close:hover {
            color: #777777;
        }

        .xwd__share-modal_shareLink {
            color: white;
        }

        .xwd__share-modal_shareLinkButton.xwd__share-modal_copiedLink {
            background-image: url("${svgURL_Checkmark}");
        }

        /* Subscribe Popup */

        ._momentButton_e4jbe_2._primary_e4jbe_37 {
            background-color: white;
            color: black;
        }

        .xwd__modal--button-container .mini-welcome-subscribe-anon-cta_button {
            background-color: #0f0f0f;
            border: 2px solid white;
            color: white;
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
    style.id = "midistyle";
    style.innerText = midiCSS;
    document.head.appendChild(style);
    loadStoredCrosswordColors();
}

function disableMidiDarkMode() {
    const styleElement = document.getElementById("midistyle");
    if (styleElement) {
        styleElement.remove();
    }
}

chrome.runtime.onMessage.addListener(function(message) {
    if (message.action == "enableMidiDarkMode") {
        if (document.getElementById("midistyle")) {
            disableMidiDarkMode();
        } else {
            enableMidiDarkMode();
        }
    }
    if (message.action === "applyCrosswordColors") {
        applyCrosswordColors(message.colors || {});
    }
});

chrome.storage.sync.get("midiDarkModeEnabled", function(data) {
    if (data.midiDarkModeEnabled) {
        enableMidiDarkMode();
    } 
});