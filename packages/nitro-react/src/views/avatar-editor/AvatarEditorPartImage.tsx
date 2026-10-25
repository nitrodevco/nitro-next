/**
 * What a part cell's `bitmap` (50x50) shows - `AvatarEditorGridPartItem.updateThumbVisualization`:
 * the part's thumbnail (`renderThumb`, its colour layers tinted by the figure's colours) centred in
 * the bitmap, `avatar_editor_avatar_editor_download_icon` while its library downloads, and a fifth
 * of its alpha when it cannot be worn (`setAlpha(0.2)`). The clear cell shows the remove icon - the
 * client's own art, as no library has it.
 */
import { IPartColor } from '@nitrodevco/nitro-api';
import { AlphaFilter } from 'pixi.js';

import { PartThumbnailRequest, usePartThumbnail } from '#base/hooks';
import { Box, LayoutImage, ThemeImage } from '#base/theme';

export interface AvatarEditorPartImageProps {
    /** The part this cell shows - its thumbnail is requested (and its library downloaded) when the cell mounts. */
    part: PartThumbnailRequest;
    setType: string;
    /** The figure's selected colours - layer `n` of the thumbnail is tinted by `colors[n - 1]`. */
    colors: (IPartColor | undefined)[];
    usesColors: boolean;
    isClear: boolean;
    disabled: boolean;
}

/** `thumb_template`'s `bitmap`. */
const CELL = 50;

const CENTERED = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

/**
 * A part that cannot be worn fades as one bitmap, as Flash fades the one it composed: a container's
 * `alpha` would fade each colour layer on its own, their overlaps showing through one another. One
 * instance for every cell - a filter keeps no state about what it is on.
 */
const DISABLED_FILTER = new AlphaFilter({ alpha: 0.2 });

export const AvatarEditorPartImage = ({ part, setType, colors, usesColors, isClear, disabled }: AvatarEditorPartImageProps) => {
    const thumbnail = usePartThumbnail(isClear ? undefined : part, setType);

    if (isClear || !thumbnail) {
        return (
            <ThemeImage
                src={LayoutImage(isClear ? 'avatar-editor/avatar_editor_generic_remove_selection.png' : 'habbo-window-manager-com/avatar_editor_avatar_editor_download_icon.png')}
                bitmap={CENTERED}
                layout={{ position: 'absolute', left: 0, width: CELL, top: 0, height: CELL }}
            />
        );
    }

    return (
        <Box
            filters={disabled ? DISABLED_FILTER : undefined}
            layout={{ position: 'absolute', left: Math.trunc((CELL - thumbnail.width) / 2), top: Math.trunc((CELL - thumbnail.height) / 2), width: thumbnail.width, height: thumbnail.height }}
        >
            {thumbnail.layers.map((layer, index) => (
                <pixiSprite
                    key={index}
                    texture={layer.texture}
                    tint={(usesColors && (layer.colorLayerIndex > 0)) ? (colors[layer.colorLayerIndex - 1]?.rgb ?? 0xffffff) : 0xffffff}
                    eventMode="none"
                    layout={{ position: 'absolute', left: layer.x, top: layer.y, width: layer.texture.width, height: layer.texture.height }}
                />
            ))}
        </Box>
    );
};
