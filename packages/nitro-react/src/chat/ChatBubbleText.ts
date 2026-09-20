import { Texture } from 'pixi.js';

import { HABBO_TEXT_STYLES, normalizeFlashTextFormat, parseFlashTextMarkup, renderBrowserTextCanvas, renderFlashTextCanvas } from '#base/theme/font/flash-text';

export interface ChatBubbleTextRender {
    texture: Texture;
    /** The laid-out text's extent (the Flash `TextField.textWidth` / `textHeight`). */
    textWidth: number;
    textHeight: number;
    /** `TextField.numLines`. */
    lineCount: number;
}

/** `0xRRGGBB` -> `#rrggbb` for the rich-text markup. */
export const chatColorToCss = (color: number): string => `#${(color & 0xffffff).toString(16).padStart(6, '0')}`;

/**
 * `HabboFreeFlowChat.fixHtml`'s escape: `<` and `>` only. An `&amp;` a user types is read as an
 * entity by the text field, in Flash and here alike.
 */
export const escapeChatMarkup = (text: string): string => text
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Rasterises a bubble's html-ish text (`<b>name: </b>message`, `<i>...</i>`, `<font color>`,
 * `<u>`) through the Flash text renderer, the same one every other piece of Habbo text in this
 * client uses, so the chat font is the client's own embedded Ubuntu at the style's size.
 * Word-wrapped at `wrapWidth` like the Flash `TextField` with `wordWrap = true` and a fixed
 * width. A message with a character the captured fonts do not carry is drawn with the browser's
 * canvas text in the same layout instead.
 */
export const renderChatBubbleText = (markup: string, fontFace: string, fontSize: number, color: number, wrapWidth: number): ChatBubbleTextRender | undefined => {
    if (!markup.length) return undefined;

    // `u_chat_speak` is the client's own Ubuntu 12 chat style (kerning, sharpness, thickness);
    // the bubble style's face and size override it where a style asks for something else.
    const format = normalizeFlashTextFormat({ ...HABBO_TEXT_STYLES.u_chat_speak, fontFamily: fontFace, fontSize, color });
    const runs = parseFlashTextMarkup(markup, format);
    const options = { wordWrap: true, wrapWidth: Math.max(1, Math.floor(wrapWidth)), breakWords: true };
    const rendered = renderFlashTextCanvas(runs, format, options) ?? renderBrowserTextCanvas(runs, options);

    if (!rendered) return undefined;

    // Owned by the bubble and destroyed with it - kept out of Pixi's global `Cache`.
    const texture = Texture.from(rendered.canvas, true);

    texture.source.scaleMode = 'nearest';

    const lineCount = (rendered.lineHeight > 0) ? Math.max(1, Math.round(rendered.textHeight / rendered.lineHeight)) : 1;

    return { texture, textWidth: Math.ceil(rendered.textWidth), textHeight: Math.ceil(rendered.textHeight), lineCount };
};
