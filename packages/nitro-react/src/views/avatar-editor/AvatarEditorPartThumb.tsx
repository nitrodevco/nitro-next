import { IPartColor } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { PartThumbnailRequest, usePartThumbnail } from '#base/hooks';
import { Box, LayoutImage, Region, ThemeImage } from '#base/theme';

export interface AvatarEditorPartThumbProps {
    selected: boolean;
    /** The part this cell shows - its thumbnail is requested (and its library downloaded) when the cell mounts. */
    part: PartThumbnailRequest;
    setType: string;
    /** The figure's selected colours - layer `n` of the thumbnail is tinted by `colors[n - 1]`. */
    colors: (IPartColor | undefined)[];
    usesColors: boolean;
    isClub: boolean;
    isSellable: boolean;
    isClear: boolean;
    disabled?: boolean;
    selectPart: () => void;
}

const CELL = 50;

const CENTERED = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

/**
 * One part of the parts grid - the `thumb_template` row of the `AvatarEditorContent` layout,
 * driven as Flash's `AvatarEditorGridPartItem`: the `avatar_editor_parts_hilite` backdrop (full
 * while selected, at half under the pointer), the part's thumbnail centred in the 50x50 `bitmap`
 * (the remove icon for the clear item, the download icon while its library loads, a fifth of its
 * alpha when it cannot be worn), the HC icon and the sellable icon.
 */

export const AvatarEditorPartThumb = ({ selected, part, setType, colors, usesColors, isClub, isSellable, isClear, disabled, selectPart }: AvatarEditorPartThumbProps) => {
    const [ isHovering, setIsHovering ] = useState<boolean>(false);
    const thumbnail = usePartThumbnail(isClear ? undefined : part, setType);

    return (
        <Region
            onPointerOver={_ => setIsHovering(true)}
            onPointerOut={_ => setIsHovering(false)}
            onPointerTap={selectPart}
            name="thumb_template"
            layout={{ width: CELL, height: CELL, flexShrink: 0, overflow: 'hidden' }}
        >
            { (selected || isHovering) && (
                <ThemeImage
                    name="hover"
                    src={LayoutImage('avatar-editor/avatar_editor_parts_hilite.png')}
                    bitmap={CENTERED}
                    alpha={selected ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 0, width: CELL, top: 0, height: CELL }}
                />
            )}
            { isClear && (
                <ThemeImage
                    src={LayoutImage('avatar-editor/avatar_editor_generic_remove_selection.png')}
                    bitmap={CENTERED}
                    layout={{ position: 'absolute', left: 0, width: CELL, top: 0, height: CELL }}
                />
            )}
            { !isClear && !thumbnail && (
                <ThemeImage
                    name="loading"
                    src={LayoutImage('catalog/avatar_editor_avatar_editor_download_icon.png')}
                    bitmap={CENTERED}
                    layout={{ position: 'absolute', left: 0, width: CELL, top: 0, height: CELL }}
                />
            )}
            {thumbnail && (
                <Box
                    alpha={disabled ? 0.2 : 1}
                    layout={{ position: 'absolute', left: Math.trunc((CELL - thumbnail.width) / 2), top: Math.trunc((CELL - thumbnail.height) / 2), width: thumbnail.width, height: thumbnail.height }}
                >
                    {thumbnail.layers.map((layer, index) => (
                        <pixiSprite
                            key={index}
                            texture={layer.texture}
                            tint={usesColors && layer.colorLayerIndex > 0 ? colors[layer.colorLayerIndex - 1]?.rgb ?? 0xffffff : 0xffffff}
                            eventMode="none"
                            layout={{ position: 'absolute', left: layer.x, top: layer.y, width: layer.texture.width, height: layer.texture.height }}
                        />
                    ))}
                </Box>
            )}
            {isClub && (
                <ThemeImage
                    name="club_icon"
                    src={LayoutImage('avatar-editor/icons_hc_icon_small.png')}
                    bitmap={CENTERED}
                    layout={{ position: 'absolute', left: 40, width: 10, top: 40, height: 9 }}
                />
            )}
            {isSellable && (
                <ThemeImage
                    name="sellable_icon"
                    src={LayoutImage('avatar-editor/icons_wearable.png')}
                    bitmap={{ stretchedX: false, stretchedY: false, pivot: 'bottom left' }}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 30, height: 20 }}
                />
            )}
        </Region>
    );
};
