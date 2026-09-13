import { Texture } from 'pixi.js';
import { getTruffle } from 'truffle-text/react';

import { bufferToCanvas } from '#base/theme/font/truffle';

export interface ChatBubbleTextRender {
    texture: Texture;
    /** The laid-out text's extent (the Flash `TextField.textWidth` / `textHeight`). */
    textWidth: number;
    textHeight: number;
}

/** `0xRRGGBB` -> `#rrggbb` for the rich-text markup. */
export const chatColorToCss = (color: number): string => `#${(color & 0xffffff).toString(16).padStart(6, '0')}`;

/** Escapes the three characters that would otherwise be read as markup (the Flash client escaped `<`/`>` and dropped numeric entities). */
export const escapeChatMarkup = (text: string): string => text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');

/**
 * Rasterises a bubble's html-ish text (`<b>name: </b>message`, `<i>...</i>`, `<font color>`,
 * `<u>`) through truffle, the same renderer every other piece of Habbo text in this client uses,
 * so the chat font is the client's own embedded Ubuntu at the style's size rather than a browser
 * fallback. Word-wrapped at `wrapWidth` like the Flash `TextField` with `wordWrap = true` and a
 * fixed width. Returns `undefined` before truffle has finished loading; the caller shows the
 * bubble without text rather than blocking.
 */
export const renderChatBubbleText = (markup: string, fontFace: string, fontSize: number, color: number, wrapWidth: number): ChatBubbleTextRender | undefined => {
    const truffle = getTruffle();

    if (!truffle || !markup.length) return undefined;

    try {
        // `u_chat_speak` is the client's own Ubuntu 12 chat preset (kerning, hinting, calibration);
        // the style's face/size override it where a style asks for something else.
        const baseStyle = truffle.resolveStyle('u_chat_speak', { fontFamily: fontFace, size: fontSize, color });
        const buffer = truffle.renderRichText(markup, baseStyle, { wordWrap: true, width: Math.max(1, Math.floor(wrapWidth)), color });
        const canvas = bufferToCanvas(buffer);
        // Owned by the bubble and destroyed with it - kept out of Pixi's global `Cache`.
        const texture = Texture.from(canvas, true);

        texture.source.scaleMode = 'nearest';

        const layout = buffer.richLayout ?? buffer.layout;

        return {
            texture,
            textWidth: Math.ceil(layout?.textWidth ?? buffer.width),
            textHeight: Math.ceil(layout?.textHeight ?? buffer.height),
        };
    } catch {
        return undefined;
    }
};
