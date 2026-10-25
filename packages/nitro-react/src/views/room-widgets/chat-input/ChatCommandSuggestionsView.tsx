import { escapeMarkup, FloatingPopup, Region } from '#base/theme';
import { IChatCommandSuggestion } from '#base/utils';
import { CatalogGiftSuggestionListItemView } from '#base/views/catalog/purchase/CatalogGiftSuggestionListItemView';

/** `suggestion_list_item_new`: each row 20 high. */
const ROW_HEIGHT = 20;
/** The 1px `#999999` the gift window's `suggestion_container` shows round its list. */
const BORDER = 1;
const BORDER_COLOR = '#999999';
/** Clear of the chat bar's own border. */
const GAP_ABOVE_INPUT = 2;
/** What a command does, after its usage: the grey of the chat field's own placeholder. */
const DETAIL_COLOR = '#777777';
/** Between the usage and what the command does. */
const DETAIL_GAP = '   ';

export interface ChatCommandSuggestionsViewProps {
    /** Screen x of the list's left edge, and screen y of the chat bar's top: the list sits on it. */
    x: number;
    bottom: number;
    width: number;
    suggestions: IChatCommandSuggestion[];
    highlightIndex: number;
    onHover: (index: number) => void;
    onSelect: (index: number) => void;
    onClose: () => void;
}

/**
 * The row's text with its bold run, as `updateSuggestions` sets it with `setTextFormat(bold, start,
 * end)`, and what a command does after it in grey; `clip` cuts what the row cannot hold.
 */
const markupOf = ({ label, boldStart, boldEnd, detail }: IChatCommandSuggestion) => {
    const text = (boldEnd > boldStart)
        ? `${escapeMarkup(label.slice(0, boldStart))}<b>${escapeMarkup(label.slice(boldStart, boldEnd))}</b>${escapeMarkup(label.slice(boldEnd))}`
        : escapeMarkup(label);

    return detail.length ? `${text}${DETAIL_GAP}<font color="${DETAIL_COLOR}">${escapeMarkup(detail)}</font>` : text;
};

/**
 * Not Flash's: what the chat input offers while a `:command` is typed (`chat.commands`). Habbo's
 * chat input completes nothing, so this is Habbo's one completion list moved onto it: the gift
 * window's friend suggestions (`suggestion_container` with its `suggestion_list` of
 * `suggestion_list_item_new` rows, `CatalogGiftSuggestionListItemView`), rows alternating
 * `#eeeeee` and white, the highlighted one `#ccd1da`, the typed part in bold. The gift list drops
 * below its name field; the chat bar is at the foot of the screen, so this one stands on top of
 * it, as the style menu does, and floats over the room as a desktop window of its own
 * (`FloatingPopup`). A row that is only a hint (the usage line) takes no pointer.
 */
export const ChatCommandSuggestionsView = ({ x, bottom, width, suggestions, highlightIndex, onHover, onSelect, onClose }: ChatCommandSuggestionsViewProps) => {
    const height = (suggestions.length * ROW_HEIGHT) + (BORDER * 2);

    return (
        <FloatingPopup
            x={Math.round(x)}
            y={Math.round(bottom) - GAP_ABOVE_INPUT - height}
            onOutsideClick={onClose}
            layout={{ width, height }}
        >
            <Region
                name="suggestion_container"
                backgroundColor={BORDER_COLOR}
                backgroundAlpha={1}
                layout={{ position: 'absolute', left: 0, top: 0, width, height }}
            >
                <Region
                    name="suggestion_list"
                    layout={{ position: 'absolute', left: BORDER, top: BORDER, width: width - (BORDER * 2), flexDirection: 'column' }}
                >
                    {suggestions.map((suggestion, index) => (
                        <CatalogGiftSuggestionListItemView
                            key={`${index}:${suggestion.label}`}
                            markup={markupOf(suggestion)}
                            index={index}
                            width={width - (BORDER * 2)}
                            highlighted={(suggestion.replacement !== null) && (index === highlightIndex)}
                            onHover={(suggestion.replacement !== null) ? () => onHover(index) : undefined}
                            onSelect={(suggestion.replacement !== null) ? () => onSelect(index) : undefined}
                        />
                    ))}
                </Region>
            </Region>
        </FloatingPopup>
    );
};
