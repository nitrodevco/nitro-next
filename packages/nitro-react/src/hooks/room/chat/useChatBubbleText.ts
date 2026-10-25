import { ChatBubbleTextRender, renderChatBubbleText } from '@nitrodevco/nitro-theme/chat';
import { useEffect, useMemo, useState } from 'react';

import { FlashTextRenderer, readAtGlyphRevision, useMissingGlyphRefresh } from '#base/theme';
import { destroyOwnedTexture } from '#base/utils';

/**
 * Rasterises a bubble's markup through the Flash text renderer and owns the resulting texture -
 * destroyed when the markup changes or the bubble unmounts. `undefined` for empty markup.
 * `tableTabs` lays `[a]` columns out (`ChatTabLayout`) at the chat font's `fontSizeScale`. A
 * message with a glyph still loading is drawn in browser text, then again in the client's own once
 * it lands (`useMissingGlyphRefresh`).
 */
export const useChatBubbleText = (markup: string, fontFace: string, fontSize: number, color: number, wrapWidth: number, tableTabs: boolean = false, fontSizeScale: number = 1): ChatBubbleTextRender | undefined => {
    const [ glyphRevision, setGlyphRevision ] = useState(() => FlashTextRenderer.revision);
    const render = useMemo(() => readAtGlyphRevision(glyphRevision, () => renderChatBubbleText(markup, fontFace, fontSize, color, wrapWidth, tableTabs, fontSizeScale)), [ markup, fontFace, fontSize, color, wrapWidth, tableTabs, fontSizeScale, glyphRevision ]);

    useMissingGlyphRefresh(render?.exact === false, glyphRevision, setGlyphRevision);

    useEffect(() => () => destroyOwnedTexture(render?.texture), [ render ]);

    return render;
};
