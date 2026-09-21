import { Container as PixiContainer, FederatedPointerEvent } from 'pixi.js';
import { useMemo } from 'react';

import { Box, LayoutImage, useTextureFromUrl } from '#base/theme';
import {
    buildFloorPlanHeightMap, FLOOR_PLAN_LEVELS, FLOOR_PLAN_TILE_IMAGES, FLOOR_PLAN_ZOOM_LARGE, FLOOR_PLAN_ZOOM_NORMAL,
    floorPlanHeightColors, FloorPlanModel, floorPlanOccupiedHeightColors, FloorPlanTile,
} from '#base/utils';

export interface FloorPlanHeightMapViewProps {
    model: FloorPlanModel;
    /** `FLOOR_PLAN_ZOOM_NORMAL` or `FLOOR_PLAN_ZOOM_LARGE` - the magnifier under the map switches between them. */
    zoom: number;
    entryPoint: FloorPlanTile | null;
    /** The container the drawing gesture measures the pointer against. */
    attachHeightMap: (node: PixiContainer | null) => void;
    onPointerDown: (event: FederatedPointerEvent) => void;
}

/**
 * The map you draw on - `HeightMapEditor.updateView`. Flash composited one `BitmapData` out of a
 * tinted clone of the tile bitmap per height; here each tile is a sprite of the one shared texture
 * with that height's colour as its `tint`, which is the same multiply without a cache of clones.
 *
 * The sprites carry no layout of their own and sit at the positions the picture worked out, so the
 * layout engine has one node to measure however many thousand tiles the map holds.
 */
export const FloorPlanHeightMapView = ({ model, zoom, entryPoint, attachHeightMap, onPointerDown }: FloorPlanHeightMapViewProps) => {
    const tileImages = FLOOR_PLAN_TILE_IMAGES[(zoom === FLOOR_PLAN_ZOOM_LARGE) ? FLOOR_PLAN_ZOOM_LARGE : FLOOR_PLAN_ZOOM_NORMAL];
    const baseTexture = useTextureFromUrl(LayoutImage(tileImages.base));
    const entryTexture = useTextureFromUrl(LayoutImage(tileImages.entry));

    const colors = useMemo(() => floorPlanHeightColors(FLOOR_PLAN_LEVELS), []);
    const occupiedColors = useMemo(() => floorPlanOccupiedHeightColors(FLOOR_PLAN_LEVELS), []);
    const picture = useMemo(() => buildFloorPlanHeightMap(model, zoom, entryPoint, colors, occupiedColors), [ model, zoom, entryPoint, colors, occupiedColors ]);

    return (
        <Box
            ref={attachHeightMap}
            label="heightmap_bitmap"
            eventMode="static"
            cursor="pointer"
            onPointerDown={onPointerDown}
            layout={{ width: picture.width, height: picture.height, flexShrink: 0 }}
        >
            {picture.tiles.map((tile) => {
                const texture = tile.isEntry ? entryTexture : baseTexture;

                if (!texture) return null;

                return (
                    <pixiSprite
                        key={`${tile.x}-${tile.y}`}
                        texture={texture}
                        x={tile.screenX}
                        y={tile.screenY}
                        tint={tile.isEntry ? undefined : tile.tint}
                        roundPixels
                        eventMode="none"
                    />
                );
            })}
        </Box>
    );
};
