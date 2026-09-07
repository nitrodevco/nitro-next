import { useEffect, useMemo } from 'react';

import { ChatBubbleTextRender, renderChatBubbleText } from '#base/chat';

/**
 * Rasterises a bubble's markup through truffle and owns the resulting texture - destroyed when
 * the markup changes or the bubble unmounts. `undefined` while truffle hasn't finished loading.
 */
export const useChatBubbleText = (markup: string, fontFace: string, fontSize: number, color: number, wrapWidth: number): ChatBubbleTextRender | undefined => {
    const render = useMemo(() => renderChatBubbleText(markup, fontFace, fontSize, color, wrapWidth), [ markup, fontFace, fontSize, color, wrapWidth ]);

    useEffect(() => () => render?.texture.destroy(true), [ render ]);

    return render;
};
