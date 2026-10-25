import { useMemo } from 'react';

import { GetChatStyleLibrary, IChatStyle } from '#base/chat';

/** The chat style for an id, falling back to the default style like the Flash library did. */
export const useChatStyle = (styleId: number): IChatStyle | undefined => useMemo(() => GetChatStyleLibrary().getStyle(styleId), [ styleId ]);

/** Every style the library loaded, for the chat input's picker. */
export const useChatStyles = (): IChatStyle[] => useMemo(() => {
    const library = GetChatStyleLibrary();

    return library.getStyleIds().map(id => library.getStyle(id)).filter((style): style is IChatStyle => !!style);
}, []);
