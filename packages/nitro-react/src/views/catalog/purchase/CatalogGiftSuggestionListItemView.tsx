import { Region, ThemeText } from '#base/theme';

/** `COLOR_EVEN` / `COLOR_ODD` / `COLOR_HIGHLIGHT` of `PurchaseConfirmationDialog`. */
const COLOR_EVEN = '#eeeeee';
const COLOR_ODD = '#ffffff';
const COLOR_HIGHLIGHT = '#ccd1da';

export interface CatalogGiftSuggestionListItemViewProps {
    /** The friend's name as markup, the typed part in `<b>`. */
    markup: string;
    index: number;
    highlighted: boolean;
    onHover: () => void;
    onSelect: () => void;
}

/**
 * One row of the gift window's friend suggestions - `suggestion_list_item_new.xml` (262x20), which
 * `updateSuggestions` clones per name: the row's colour alternates by index (`getColor`) and is
 * `COLOR_HIGHLIGHT` on the highlighted row (`highlightSuggestion`), and `name_text` shows the name
 * with the typed part in bold. The pointer over a row highlights it (`onSuggestionsMouseOver`), a
 * press takes it (`onSuggestionsClick`).
 */
export const CatalogGiftSuggestionListItemView = ({ markup, index, highlighted, onHover, onSelect }: CatalogGiftSuggestionListItemViewProps) => (
    <Region
        name="suggestion_list_item"
        backgroundColor={highlighted ? COLOR_HIGHLIGHT : (((index % 2) === 0) ? COLOR_EVEN : COLOR_ODD)}
        backgroundAlpha={1}
        onPointerOver={onHover}
        onPointerTap={onSelect}
        cursor="pointer"
        layout={{ position: 'relative', width: 262, height: 20, flexShrink: 0 }}
    >
        <ThemeText
            name="name_text"
            text={markup}
            markup
            textStyle="u_regular"
            flashFormat={{ thickness: -15, sharpness: 80 }}
            clip
            verticalAlign="top"
            layout={{ position: 'absolute', left: 0, width: 261, top: 0, height: 20 }}
        />
    </Region>
);
