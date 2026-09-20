import { RoomId } from '@nitrodevco/nitro-api';
import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { forwardRef, useEffect, useImperativeHandle, useRef } from 'react';

import { RoomPreviewerApi, RoomPreviewerOptions, useRoomPreviewer } from '#base/hooks';
import { Box, BoxLayout } from '#base/theme';

/** What a parent drives the preview with, through a ref - the hook's own API. */
export type RoomPreviewerHandle = RoomPreviewerApi;

export interface RoomPreviewerProps extends RoomPreviewerOptions {
    /** Which temp preview room to use - previews with different ids don't share a room. */
    roomId?: number;
    onPointerTap?: (event: FederatedPointerEvent) => void;
    layout?: BoxLayout;
    /**
     * Fires once the preview room exists (it's created one render after mount) and again if it
     * is recreated. Effects that want to drive the preview on mount should key off this rather
     * than reading `ref.current.room` - that's still undefined during the first effect pass.
     */
    onReady?: (api: RoomPreviewerApi) => void;
}

const useReadyCallback = (api: RoomPreviewerApi, onReady?: (api: RoomPreviewerApi) => void) => {
    const latest = useRef({ api, onReady });

    // Kept current from an effect (not during render) so the room effect below can call the
    // newest callback with the newest api without depending on either.
    useEffect(() => {
        latest.current = { api, onReady };
    });

    useEffect(() => {
        if (api.room) latest.current.onReady?.(latest.current.api);
    }, [ api.room ]);
};

export const RoomPreviewer = forwardRef<RoomPreviewerHandle, RoomPreviewerProps>(({ roomId = RoomId.TEMP_ROOM_CATALOG, transparent = true, scale, showWalls, showFloor, onPointerTap, layout, onReady }, ref) => {
    const containerRef = useRef<PixiContainer | null>(null);
    const api = useRoomPreviewer(roomId, containerRef, { transparent, scale, showWalls, showFloor });

    useImperativeHandle(ref, () => api, [ api ]);
    useReadyCallback(api, onReady);

    // Same shape as the catalog's product preview (the reference that renders): the sized,
    // clipped box is the outer one, and the room's master canvas is parented into an inner
    // absolutely-filled box whose measured size drives the room canvas.
    return (
        <Box
            onPointerTap={onPointerTap}
            layout={{ position: 'relative', width: '100%', height: '100%', overflow: 'hidden', ...layout }}
        >
            <Box
                ref={containerRef}
                layout={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' }}
            />
        </Box>
    );
});

RoomPreviewer.displayName = 'RoomPreviewer';
