import { Container as PixiContainer } from 'pixi.js';
import { useEffect, useState } from 'react';

import { useNotificationActions } from '#base/context/notifications';
import { Box, useLayoutSize } from '#base/theme';

/**
 * Tells the notification stack where it starts: `IHabboToolbar.extensionView.screenHeight`, and
 * the `EVE_EXTENSION_VIEW_RESIZED` that made `HabboNotificationViewManager.refreshTopMargin`
 * restack. Flash's extension view is the column in the top right corner that holds the purse and
 * whatever is docked under it; here that is the box this is mounted in, as its last child. It
 * draws nothing and takes no room - it measures its parent, which starts at the top of the screen,
 * so the parent's height is how far down the column reaches.
 *
 * The bubbles themselves cannot live in that column: a themed `Box` is only hit-tested over its
 * own laid-out area, and they hang below it.
 */
export const NotificationsExtensionAnchor = () => {
    const [ node, setNode ] = useState<PixiContainer | null>(null);
    const { setExtensionHeight } = useNotificationActions();

    // In the DOM render mode the node is an element (see `useLayoutEvent`), whose parent is its `parentElement`.
    const column = node ? (node.parent ?? (node as unknown as HTMLElement).parentElement as unknown as PixiContainer | null) : null;
    const { height } = useLayoutSize(column);

    useEffect(() => {
        setExtensionHeight(Math.ceil(height));
    }, [ height, setExtensionHeight ]);

    return (
        <Box
            ref={setNode}
            layout={{ position: 'absolute', width: 0, height: 0 }}
        />
    );
};
