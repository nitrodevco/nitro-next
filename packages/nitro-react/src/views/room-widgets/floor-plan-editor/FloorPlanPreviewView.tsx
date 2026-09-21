import { Texture } from 'pixi.js';
import { useMemo } from 'react';

import { Box, LayoutImage, useTextureFromUrl } from '#base/theme';
import { buildFloorPlanPreview, FLOOR_PLAN_PREVIEW_TILE_IMAGES, FloorPlanModel, FloorPlanTile } from '#base/utils';

export interface FloorPlanPreviewViewProps {
    model: FloorPlanModel;
    entryPoint: FloorPlanTile | null;
}

/**
 * The isometric preview beside the map - `FloorPlanPreviewer.updatePreview`. Each tile picks one
 * of seventeen bitmaps by which of its corners a neighbour one level up covers, so a raised tile
 * draws its own walls.
 *
 * Flash rebuilt this on a two-second timer (`BCFloorPlanEditor.PREVIEW_UPDATE_MS`) and had a
 * refresh button beside it for when that felt slow. Here it follows the map directly: the picture
 * is derived from the rows, so a drawn tile shows up in the same render that drew it, and neither
 * the timer nor the button has anything left to do.
 */
/**
 * The seventeen bitmaps, resolved once. A hook may not be called in a loop, and one hook per drawn
 * tile would be thousands of them, so the list is written out - it is a fixed table, and the
 * builder above indexes straight into it.
 */
const usePreviewTileTextures = (): (Texture | undefined)[] => [
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[0])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[1])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[2])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[3])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[4])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[5])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[6])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[7])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[8])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[9])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[10])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[11])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[12])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[13])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[14])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[15])),
    useTextureFromUrl(LayoutImage(FLOOR_PLAN_PREVIEW_TILE_IMAGES[16])),
];

export const FloorPlanPreviewView = ({ model, entryPoint }: FloorPlanPreviewViewProps) => {
    const picture = useMemo(() => buildFloorPlanPreview(model, entryPoint), [ model, entryPoint ]);
    const textures = usePreviewTileTextures();

    return (
        <Box
            label="preview_bitmap"
            layout={{ width: picture.width, height: picture.height, flexShrink: 0 }}
        >
            {picture.tiles.map((tile, index) => {
                const texture = textures[tile.type];

                if (!texture) return null;

                return (
                    <pixiSprite
                        key={index}
                        texture={texture}
                        x={tile.screenX}
                        y={tile.screenY}
                        roundPixels
                        eventMode="none"
                    />
                );
            })}
        </Box>
    );
};
