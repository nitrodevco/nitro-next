import { RoomEngineEvent } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { useRoomEventDispatcher } from '#base/hooks';
import { Box } from '#base/theme';

import { RoomObjectInfostandWidget } from './object-infostand';
import { RoomObjectMenuWidget } from './object-menu';

/**
 * Pixi port of components/room/widgets/RoomWidgets.tsx. DOM used `createPortal` to mount into
 * `#ui-container` (a sibling of the room's own DOM subtree) since it lived outside RoomContainer;
 * Pixi content can't be portaled into a DOM element, so this mounts directly as a normal child
 * of the shared Pixi Application's stage instead (see Nitro.tsx), with its own local
 * `RoomEngineEvent.INITIALIZED`/`DISPOSED`-driven `isReady` tracking mirroring
 * components/room/RoomContainer.tsx's own (duplicated rather than shared across the DOM/Pixi
 * boundary, since RoomContainer itself remains DOM-based).
 */
export const RoomWidgetsPixi = () => {
    const [ isReady, setIsReady ] = useState<boolean>(false);

    useRoomEventDispatcher(RoomEngineEvent.INITIALIZED, () => setIsReady(true));
    useRoomEventDispatcher(RoomEngineEvent.DISPOSED, () => setIsReady(false));

    if (!isReady) return null;

    return (
        <>
            <RoomObjectMenuWidget />
            <Box layout={{ position: 'absolute', right: 4, bottom: 58 }}>
                <RoomObjectInfostandWidget />
            </Box>
        </>
    );
};
