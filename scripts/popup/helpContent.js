// Help dialog content for every custom color element, keyed by its data-key: 
// a description, a screenshot, and a shorter title when the label does not fit on one line

export const helpElementInfo = {
    cw_cell_borders: {
        description: "Thin lines drawn around every square in the grid.",
        image: "imgs/popup/CW/cell-borders.png"
    },
    cw_letter_number_in_cell: {
        description: "Typed letters and the small clue numbers.",
        image: "imgs/popup/CW/letter-and-number-in-cell.png"
    },
    cw_correct_letter_in_cell: {
        description: "Letters marked correct after using Check or Reveal.",
        image: "imgs/popup/CW/correct-letter-in-cell.png"
    },
    cw_empty_cell: {
        description: "Background of every open square you can type into.",
        image: "imgs/popup/CW/empty-cell.png"
    },
    cw_prefilled_cell: {
        description: "The solid black squares that split up words.",
        image: "imgs/popup/CW/prefilled-cell.png"
    },
    cw_shaded_cell: {
        description: "Squares a puzzle shades in as part of its theme.",
        image: "imgs/popup/CW/shaded-cell.png"
    },
    cw_related_cell_clue: {
        description: "Squares and clues linked to your current clue.",
        image: "imgs/popup/CW/related-cell.png"
    },
    cw_related_shaded_cell: {
        description: "A related square that is also shaded.",
        image: "imgs/popup/CW/related-and-shaded-cell.png"
    },
    cw_highlighted_cell_clue: {
        description: "The rest of your current word and its clue.",
        image: "imgs/popup/CW/highlighted-cell.png"
    },
    cw_shaded_highlighted_cell: {
        title: "Shaded + Highlighted",
        description: "A square in your current word that is also shaded.",
        image: "imgs/popup/CW/shaded-and-highlighted-cell.png"
    },
    cw_selected_cell_clue: {
        description: "The square your cursor is on, and its clue in the list.",
        image: "imgs/popup/CW/selected-cell.png"
    },
    cw_shaded_selected_cell: {
        description: "The cursor square when it's sitting on a shaded square.",
        image: "imgs/popup/CW/shaded-and-selected-cell.png"
    },
    cw_circle_within_cell: {
        description: "Circles some puzzles draw inside squares.",
        image: "imgs/popup/CW/circle-within-cell.png"
    },
    cw_main_selected_clue_bg: {
        description: "The bar above the grid showing your clue.",
        image: "imgs/popup/CW/main-selected-clue-bg.png"
    },
    cw_main_selected_clue_text: {
        description: "The clue written inside that bar.",
        image: "imgs/popup/CW/main-selected-clue-text.png"
    },
    sd_board_frame: {
        description: "The outer edge around the whole board.",
        image: "imgs/popup/SD/outer-border.png"
    },
    sd_inner_board_frame: {
        description: "The thicker lines that split the board into its boxes.",
        image: "imgs/popup/SD/inner-border.png"
    },
    sd_grid_lines: {
        description: "The thin lines between individual cells.",
        image: "imgs/popup/SD/grid-lines.png"
    },
    sd_empty_cell: {
        description: "Background of cells you still need to fill.",
        image: "imgs/popup/SD/empty-cell.png"
    },
    sd_prefilled_cell: {
        description: "Background of cells that start with a number.",
        image: "imgs/popup/SD/prefilled-cell.png"
    },
    sd_affected_no_number_cell: {
        title: "Affected + No Number",
        description: "Empty cells in the selected row, column, and box.",
        image: "imgs/popup/SD/affected-no-number-cell.png"
    },
    sd_affected_number_cell: {
        description: "Filled cells in the selected row, column, and box.",
        image: "imgs/popup/SD/affected-number-cell.png"
    },
    sd_selected_cell: {
        description: "The cell you currently have selected.",
        image: "imgs/popup/SD/selected-cell.png"
    },
    sd_filled_selected_number: {
        title: "Filled + Selected",
        description: "Cells you filled that match the selected cell's number.",
        image: "imgs/popup/SD/filled-selected-number.png"
    },
    sd_selected_number: {
        description: "Other cells showing the selected cell's number.",
        image: "imgs/popup/SD/selected-number.png"
    },
    sd_prefilled_selected_number: {
        title: "Prefilled + Selected",
        description: "Starting cells that match the selected cell's number.",
        image: "imgs/popup/SD/prefilled-selected-number.png"
    },
    sd_numbers: {
        description: "Every big number on the board, typed or given.",
        image: "imgs/popup/SD/numbers.png"
    },
    sd_candidate_number: {
        description: "Small pencil-mark notes inside a cell.",
        image: "imgs/popup/SD/candidate-number.png"
    },
    sd_confirmed_cell_number: {
        description: "Numbers confirmed correct after using Check.",
        image: "imgs/popup/SD/confirmed-cell-number.png"
    },
    sd_conflicted_cell_bubble: {
        description: "The dot marking cells that repeat a number.",
        image: "imgs/popup/SD/conflicted-cell-bubble.png"
    },
    sd_cell_correction: {
        description: "The line struck through a wrong number.",
        image: "imgs/popup/SD/cell-correction.png"
    },
    wd_empty_tile_border: {
        description: "Outline of tiles that don't have a letter yet.",
        image: "imgs/popup/WD/empty-tile-border.png"
    },
    wd_filled_tile_border: {
        description: "Outline of tiles you've typed into but haven't submitted.",
        image: "imgs/popup/WD/filled-tile-border.png"
    },
    wd_filled_tile_text: {
        description: "Letters you've typed but haven't submitted yet.",
        image: "imgs/popup/WD/filled-tile-text.png"
    },
    wd_absent_tile_background: {
        description: "Tiles and keys for letters that aren't in the word.",
        image: "imgs/popup/WD/absent-tile-bg.png"
    },
    wd_absent_tile_text: {
        title: "Absent Tile + Key Text",
        description: "Letters on absent tiles and keys.",
        image: "imgs/popup/WD/absent-tile-text.png"
    },
    wd_present_tile_background: {
        description: "Tiles and keys for letters in the wrong spot.",
        image: "imgs/popup/WD/present-tile-bg.png"
    },
    wd_present_tile_text: {
        title: "Present Tile + Key Text",
        description: "Letters on present tiles and keys.",
        image: "imgs/popup/WD/present-tile-text.png"
    },
    wd_correct_tile_background: {
        description: "Tiles and keys for letters in the right spot.",
        image: "imgs/popup/WD/correct-tile-bg.png"
    },
    wd_correct_tile_text: {
        title: "Correct Tile + Key Text",
        description: "Letters on correct tiles and keys.",
        image: "imgs/popup/WD/correct-tile-text.png"
    },
    wd_unused_letter_key_background: {
        description: "Keyboard keys you haven't guessed yet.",
        image: "imgs/popup/WD/unused-letter-key-bg.png"
    },
    wd_unused_letter_key_text: {
        description: "Letters and icons on keys you haven't guessed yet.",
        image: "imgs/popup/WD/unused-letter-key-text.png"
    },
    cn_card_background: {
        description: "Fill of the word cards you haven't picked.",
        image: "imgs/popup/CN/card-bg.png"
    },
    cn_card_text: {
        description: "Words on the cards you haven't picked.",
        image: "imgs/popup/CN/card-text.png"
    },
    cn_selected_card_background: {
        description: "Fill of the cards picked for your next guess.",
        image: "imgs/popup/CN/selected-card-bg.png"
    },
    cn_selected_card_text: {
        description: "Words on the cards you've picked.",
        image: "imgs/popup/CN/selected-card-text.png"
    },
    cn_solved_category_background_1: {
        description: "Bar shown after solving the 1st (easiest) group.",
        image: "imgs/popup/CN/solved-category-1-bg.png"
    },
    cn_solved_category_text_1: {
        title: "Solved Group Text #1",
        description: "Category name and words in the 1st group's bar.",
        image: "imgs/popup/CN/solved-category-1-text.png"
    },
    cn_solved_category_background_2: {
        description: "Bar shown after solving the 2nd group.",
        image: "imgs/popup/CN/solved-category-2-bg.png"
    },
    cn_solved_category_text_2: {
        title: "Solved Group Text #2",
        description: "Category name and words in the 2nd group's bar.",
        image: "imgs/popup/CN/solved-category-2-text.png"
    },
    cn_solved_category_background_3: {
        description: "Bar shown after solving the 3rd group.",
        image: "imgs/popup/CN/solved-category-3-bg.png"
    },
    cn_solved_category_text_3: {
        title: "Solved Group Text #3",
        description: "Category name and words in the 3rd group's bar.",
        image: "imgs/popup/CN/solved-category-3-text.png"
    },
    cn_solved_category_background_4: {
        description: "Bar shown after solving the 4th (hardest) group.",
        image: "imgs/popup/CN/solved-category-4-bg.png"
    },
    cn_solved_category_text_4: {
        title: "Solved Group Text #4",
        description: "Category name and words in the 4th group's bar.",
        image: "imgs/popup/CN/solved-category-4-text.png"
    },
    cn_mistakes_bubbles: {
        description: "Dots that count how many mistakes you have left.",
        image: "imgs/popup/CN/mistakes-bubbles.png"
    },
    cn_top_mistakes_text: {
        description: "The top instructions and the mistakes label.",
        image: "imgs/popup/CN/top-and-mistakes-text.png"
    }
};
