/**
 * A room camera's viewfinder - what `RoomThumbnailCameraWidget`, the starter room camera and the camera
 * share: a texture the viewfinder sprite shows, redrawn from the room stage under the sprite's own place
 * on screen (`snapshotRoomCanvasToBitmap`), while `live` - every frame, or every `updateMs` (the camera's
 * `registerUpdateReceiver(this, 100)`). Drawn on the GPU: nothing is read back to the CPU until a shot. The camera works at normal zoom
 * and up, upright, checked every frame (`onRoomZoomed`): `onUnfit` takes it down otherwise.
 * `collect` is the shutter's half that reads the room - the render data of the room under the
 * viewfinder (`collectPhotoData` -> `RoomEngine.getRenderRoomMessage`, `SpriteDataCollector`).
 */
import { GetRoomStage, GetTicker, TextureUtils } from '@nitrodevco/nitro-renderer';
import { Matrix, Rectangle, RenderTexture, Sprite, Ticker } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { collectRoomPhotoData, isRoomUnfit } from '#base/commands';
import { useConfigValue } from '#base/context/system';
import { useOwnSecurityLevel } from '#base/context/user';
import { useLatest } from '#base/theme';

import { GetRoomBackgroundColor } from './roomBackgroundColor';

export const useRoomViewfinder = (width: number, height: number, live: boolean, onUnfit: () => void, updateMs = 0) => {
    const securityLevel = useOwnSecurityLevel();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const groupBadgeUrl = useConfigValue<string>('group.badge.url') ?? '';
    const [ texture ] = useState(() => RenderTexture.create({ width, height }));
    const viewfinder = useRef<Sprite>(null);
    const onUnfitRef = useLatest(onUnfit);

    // Destroyed with the room's and the UI's batches rebuilt first: the viewfinder drew it this frame.
    useEffect(() => () => TextureUtils.destroyTexture(texture), [ texture ]);

    useEffect(() => {
        if (!live) return;

        // The first frame draws at once.
        let sinceMs = updateMs;

        const update = (ticker: Ticker) => {
            if (isRoomUnfit()) {
                onUnfitRef.current();

                return;
            }

            const sprite = viewfinder.current;

            if (!sprite) return;

            if (updateMs > 0) {
                sinceMs += ticker.deltaMS;

                if (sinceMs < updateMs) return;

                sinceMs = 0;
            }

            const position = sprite.getGlobalPosition();

            TextureUtils.writeToTexture(GetRoomStage(), texture, true, new Matrix().translate(-position.x, -position.y));
        };

        GetTicker().add(update);

        return () => {
            GetTicker().remove(update);
        };
    }, [ live, texture, onUnfitRef, updateMs ]);

    /** The room under the viewfinder: its place on the stage and its render data, or nothing without a room. */
    const collect = () => {
        const sprite = viewfinder.current;

        if (!sprite) return undefined;

        const position = sprite.getGlobalPosition();
        const viewport = new Rectangle(Math.round(position.x), Math.round(position.y), width, height);
        const render = collectRoomPhotoData(viewport, GetRoomBackgroundColor(), imageLibraryUrl, groupBadgeUrl, securityLevel);

        return render && { viewport, render };
    };

    return { texture, viewfinder, collect };
};
