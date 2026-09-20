/**
 * Text fitting for `WiredTableView` cells - the part of `com.sulake.core.window.components.TextController.refreshTextImage`
 * that `table_view_xml`'s `element_text` switches on with `overflow_replace="..."`.
 *
 * Flash only replaces an overflow when the field's `autoSize` is `none` or `right`, which for a
 * table is a column built with `"left"` (stored as `none`, see `TableColumn`) or `"right"`. A
 * centred column - the default - keeps its whole text and is cut off by the cell's bounds. So
 * this module answers two questions per cell: how wide is the text, and what is the longest
 * prefix that fits with the replacement appended.
 *
 * Widths come from the Flash text layout when the captured fonts cover the string and from
 * canvas metrics otherwise, the same two paths `ThemeText` draws with.
 */
import { CanvasTextMetrics } from 'pixi.js';

import { FLASH_TEXT_GUTTER, FlashTextRenderer, getHabboKey, getPixiTextStyle, HABBO_TEXT_STYLES, normalizeFlashTextFormat, TextStyleKey } from '#base/theme';

/** `overflow_replace` of `element_text`. */
export const TABLE_OVERFLOW_REPLACE = '...';

/** Left edge of every character, followed by the text's width - `TextField.textWidth`, gutter excluded. */
const charPositions = (text: string, textStyle: TextStyleKey): number[] => {
    const habboKey = getHabboKey(textStyle);
    const flash = habboKey ? FlashTextRenderer.measureCharPositions(text, normalizeFlashTextFormat(HABBO_TEXT_STYLES[habboKey])) : null;

    if (flash) return flash;

    const style = getPixiTextStyle(textStyle);
    const positions: number[] = [ 0 ];

    for (let index = 1; index <= text.length; index++) positions.push(CanvasTextMetrics.measureText(text.slice(0, index), style).width);

    return positions;
};

/** `TextField.textWidth` of a single line. */
export const measureTableText = (text: string, textStyle: TextStyleKey): number => {
    if (!text.length) return 0;

    const positions = charPositions(text, textStyle);

    return positions[positions.length - 1];
};

/**
 * Where the rule under an `underline="true"` text (`element_link`) goes, from the top of the
 * rendered text: one pixel under the baseline, as the browser fallback of the text renderer
 * draws it. 12 is that position for Volter at 9px, used until the captured fonts are loaded.
 */
export const tableLinkUnderlineY = (textStyle: TextStyleKey): number => {
    const habboKey = getHabboKey(textStyle);
    const metrics = habboKey ? FlashTextRenderer.metrics(normalizeFlashTextFormat(HABBO_TEXT_STYLES[habboKey])) : null;

    return metrics ? (FLASH_TEXT_GUTTER + Math.round(metrics.baseline) + 1) : 12;
};

export interface FittedTableText {
    text: string;
    /** `ITextWindow.isOverflown`: the text was shortened. `TableCellView.updateContents` then puts the full text in the tooltip. */
    overflown: boolean;
}

/**
 * The width loop of `refreshTextImage`: while `textWidth + margins > width`, drop one more
 * character and append the replacement. `availableWidth` is the window's width less its
 * `margin_left` / `margin_right`.
 */
export const fitTableText = (text: string, textStyle: TextStyleKey, availableWidth: number): FittedTableText => {
    if (!text.length || availableWidth <= 0) return { text, overflown: false };

    const positions = charPositions(text, textStyle);

    if (positions[positions.length - 1] <= availableWidth) return { text, overflown: false };

    const replaceWidth = measureTableText(TABLE_OVERFLOW_REPLACE, textStyle);
    let length = text.length;

    while (length > 0 && (positions[length] + replaceWidth) > availableWidth) length--;

    return { text: text.slice(0, length) + TABLE_OVERFLOW_REPLACE, overflown: true };
};
