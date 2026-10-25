import { Container as PixiContainer } from 'pixi.js';

import { Box, LayoutImage, useTextureFromUrl } from '#base/theme';
import { FLOOR_PLAN_TILE_IMAGES, FLOOR_PLAN_ZOOM_LARGE, FLOOR_PLAN_ZOOM_NORMAL, FloorPlanHeightMapTile, FloorPlanPicture } from '#base/utils';

/**
 * The map you draw on - `HeightMapEditor.updateView`, drawn into `heightmap_bitmap`. Flash composited
 * one `BitmapData` out of a tinted clone of the tile bitmap per height; here each tile is a sprite of
 * the one shared texture with that height's colour as its `tint`, which is the same multiply without
 * a cache of clones.
 *
 * The sprites carry no layout of their own and sit at the positions the picture worked out, so the
 * layout engine has one node to measure however many thousand tiles the map holds. The picture sits
 * at the bitmap's `pivot_point` (`center`) when the window is larger than it.
 */
export interface FloorPlanHeightMapViewProps {
    picture: FloorPlanPicture<FloorPlanHeightMapTile>;
    /** `FLOOR_PLAN_ZOOM_NORMAL` or `FLOOR_PLAN_ZOOM_LARGE` - the magnifier under the map switches between them. */
    zoom: number;
    /** The picture the drawing gesture measures the pointer against. */
    attachHeightMap: (node: PixiContainer | null) => void;
}

export const FloorPlanHeightMapView = ({ picture, zoom, attachHeightMap }: FloorPlanHeightMapViewProps) => {
    const tileImages = FLOOR_PLAN_TILE_IMAGES[(zoom === FLOOR_PLAN_ZOOM_LARGE) ? FLOOR_PLAN_ZOOM_LARGE : FLOOR_PLAN_ZOOM_NORMAL];
    const baseTexture = useTextureFromUrl(LayoutImage(tileImages.base));
    const entryTexture = useTextureFromUrl(LayoutImage(tileImages.entry));

    return (
        <Box
            eventMode="none"
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%', justifyContent: 'center', alignItems: 'center' }}
        >
            <Box
                ref={attachHeightMap}
                label="heightmap_picture"
                eventMode="none"
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
        </Box>
    );
};
