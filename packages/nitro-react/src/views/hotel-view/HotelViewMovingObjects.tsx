/**
 * `MovingBackgroundObjects` in `moving_objects_container`: the reception's moving bitmaps
 * (`movingBackgroundObjects`), over the horizon and under the widgets, the hotel top and the left
 * backdrop - each one above the ones before it.
 *
 * `WidgetContainerLayout.onTimingCode` makes them once the background schedule's code is known,
 * and once only: a later code does not remake them. They are the layout's, which outlives a room
 * visit, so they are kept here past the reception closing, frozen where they were - `update` only
 * runs while the reception is shown.
 */
import { GetTicker } from '@nitrodevco/nitro-renderer';
import { Container as PixiContainer, Sprite, Texture, Ticker } from 'pixi.js';
import { useEffect, useRef, useState } from 'react';

import { hotelViewProperty, useConfigData, useSystemStore } from '#base/context/system';
import { Box, loadTexture } from '#base/theme';

import { createMovingBackgroundObjects, MovingBackgroundObject, updateMovingBackgroundObjects } from './movingBackgroundObjects';

/** The layout's objects, made once. */
let movingObjects: MovingBackgroundObject[] | undefined;

export interface HotelViewMovingObjectsProps {
    width: number;
    height: number;
}

export const HotelViewMovingObjects = ({ width, height }: HotelViewMovingObjectsProps) => {
    const code = useSystemStore(x => x.hotelViewBackgroundCode);
    const config = useConfigData();
    const [ container, setContainer ] = useState<PixiContainer | null>(null);
    const size = useRef({ width, height });

    useEffect(() => {
        size.current = { width, height };
    }, [ width, height ]);

    useEffect(() => {
        if (!container || (code === undefined)) return;

        movingObjects ??= createMovingBackgroundObjects(key => hotelViewProperty(config, key), code, hotelViewProperty(config, 'image.library.url'));

        const objects = movingObjects;

        if (!objects.length) return;

        // Each image once: `null` while it loads, or when it could not be.
        const textures = new Map<string, Texture | null>();
        const textureOf = (url: string): Texture | undefined => {
            const texture = textures.get(url);

            if (texture !== undefined) return texture ?? undefined;

            textures.set(url, null);
            void loadTexture(url).then(loaded => textures.set(url, loaded ?? null));

            return undefined;
        };
        const sprites = objects.map(() => container.addChild(new Sprite({ visible: false })));

        const tick = (ticker: Ticker) => {
            const stage = { width: size.current.width, height: size.current.height, desktopHeight: size.current.height, random: Math.random };

            updateMovingBackgroundObjects(objects, ticker.deltaMS, stage, (object) => {
                const texture = textureOf(object.sprite.asset);

                return texture ? { width: texture.width, height: texture.height } : undefined;
            });

            objects.forEach((object, index) => {
                const sprite = sprites[index];
                const texture = textureOf(object.sprite.asset);

                sprite.visible = !!texture;

                if (!texture) return;

                sprite.texture = texture;
                sprite.position.set(object.sprite.x, object.sprite.y);
                sprite.width = object.sprite.width ?? texture.width;
                sprite.height = object.sprite.height ?? texture.height;
            });
        };

        GetTicker().add(tick);

        return () => {
            GetTicker().remove(tick);

            for (const sprite of sprites) sprite.destroy();
        };
    }, [ container, code, config ]);

    return (
        <Box
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width, height }}
        >
            <pixiContainer ref={setContainer} />
        </Box>
    );
};
