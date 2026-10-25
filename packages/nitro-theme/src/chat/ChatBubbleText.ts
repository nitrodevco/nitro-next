import { Texture } from 'pixi.js';

import { FlashTextFormat, flashTextLinkAtPoint, FlashTextRenderer, HABBO_TEXT_STYLES, layoutFlashTextLines, measureBrowserText, normalizeFlashTextFormat, parseFlashTextMarkup, parseFlashTextMarkupWithLinks, renderBrowserTextCanvas, renderFlashTextCanvas } from '../font/flash-text';
import { ChatTabMeasureLayout, layoutChatTabs } from './ChatTabLayout';

/**
 * A chat bubble's text: escaping a message for the bubble's markup as `HabboFreeFlowChat.fixHtml`
 * does, and rasterising that markup to a texture through the Flash text renderer.
 */
export interface ChatBubbleTextRender {
    texture: Texture;
    /** The laid-out text's extent (the Flash `TextField.textWidth` / `textHeight`). */
    textWidth: number;
    textHeight: number;
    /** `TextField.numLines`. */
    lineCount: number;
    /** Drawn by the Flash text renderer - `false` when it fell back to the browser's text. */
    exact: boolean;
    /** The `href` of the link (`<a href>`) whose glyphs hold a point of the text, if any. */
    linkAt: (x: number, y: number) => string | undefined;
}

/**
 * `HabboFreeFlowChat.fixHtml`'s escape: `<` and `>` only. An `&amp;` a user types is read as an
 * entity by the text field, in Flash and here alike.
 */
export const escapeChatMarkup = (text: string): string => text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/** The unwrapped layout `ChatTabLayout.calculateLayout` measures cells in: exact where it can be, else the browser's. */
const measureChatTabCells = (format: FlashTextFormat): ChatTabMeasureLayout => (markup) => {
    const runs = parseFlashTextMarkup(markup, format);
    const exact = (text: string, runFormat: FlashTextFormat) => FlashTextRenderer.measure(text, runFormat);
    const lines = layoutFlashTextLines(runs, {}, exact);

    if (lines) return { lines, measure: exact };

    const browserLines = layoutFlashTextLines(runs, {}, measureBrowserText);

    return browserLines ? { lines: browserLines, measure: measureBrowserText } : null;
};

/**
 * Rasterises a bubble's html-ish text (`<b>name: </b>message`, `<i>...</i>`, `<font color>`,
 * `<u>`) through the Flash text renderer, the same one every other piece of Habbo text in this
 * client uses, so the chat font is the client's own embedded Ubuntu at the style's size.
 * Word-wrapped at `wrapWidth` like the Flash `TextField` with `wordWrap = true` and a fixed
 * width. A message with a character the captured fonts do not carry is drawn with the browser's
 * canvas text in the same layout instead.
 */
export const renderChatBubbleText = (markup: string, fontFace: string, fontSize: number, color: number, wrapWidth: number, tableTabs: boolean = false, fontSizeScale: number = 1): ChatBubbleTextRender | undefined => {
    if (!markup.length) return undefined;

    // `u_chat_speak` is the client's own Ubuntu 12 chat style (kerning, sharpness, thickness);
    // the bubble style's face and size override it where a style asks for something else.
    const format = normalizeFlashTextFormat({ ...HABBO_TEXT_STYLES.u_chat_speak, fontFamily: fontFace, fontSize, color });
    // `ChatTabLayout.apply`: `[a]` columns get tab stops; without them the text is drawn as it is.
    const tabs = tableTabs ? layoutChatTabs(markup, fontSizeScale, measureChatTabCells(format)) : null;
    const { runs, links } = parseFlashTextMarkupWithLinks(tabs?.markup ?? markup, format);
    const options = { wordWrap: true, wrapWidth: Math.max(1, Math.floor(wrapWidth)), breakWords: true, tabStops: tabs?.tabStops };
    const exact = renderFlashTextCanvas(runs, format, options);
    const rendered = exact ?? renderBrowserTextCanvas(runs, options);

    if (!rendered) return undefined;

    // Owned by the bubble and destroyed with it - kept out of Pixi's global `Cache`.
    const texture = Texture.from(rendered.canvas, true);

    const lineCount = (rendered.lineHeight > 0) ? Math.max(1, Math.round(rendered.textHeight / rendered.lineHeight)) : 1;

    const linked = { ...rendered, links };

    return { texture, textWidth: Math.ceil(rendered.textWidth), textHeight: Math.ceil(rendered.textHeight), lineCount, exact: !!exact, linkAt: (x, y) => flashTextLinkAtPoint(linked, x, y) };
};
