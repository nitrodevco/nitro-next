import { IPartColor } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { PartThumbnail } from '#base/hooks';
import { Box, getRenderMode, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

export interface AvatarEditorPartThumbProps {
    selected: boolean;
    /** The part's sprite stack (see `usePartThumbnails`); undefined while its library loads. */
    thumbnail?: PartThumbnail;
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

export const AvatarEditorPartThumb = ({ selected, thumbnail, colors, usesColors, isClub, isSellable, isClear, disabled, selectPart }: AvatarEditorPartThumbProps) => {
    const [ isHovering, setIsHovering ] = useState<boolean>(false);
    const isPixi = getRenderMode() !== 'dom';

    return (
        <Region
            onPointerOver={_ => setIsHovering(true)}
            onPointerOut={_ => setIsHovering(false)}
            onPointerTap={selectPart}
            layout={{ width: CELL, height: CELL, flexShrink: 0, alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}
        >
            { (selected || isHovering) && (
                <ThemeImage
                    src={layoutImage('avatar_editor_parts_hilite.png')}
                    alpha={selected ? 1 : 0.5}
                    layout={{ position: 'absolute', left: 0, top: 0 }}
                />
            )}
            { isClear && (
                <ThemeImage src={layoutImage('avatar_editor_generic_remove_selection.png')} />
            )}
            { !isClear && !thumbnail && (
                <ThemeImage
                    name="loading"
                    src={layoutImage('avatar_editor_avatar_editor_download_icon.png')}
                />
            )}
            {thumbnail && isPixi && (
                <Box
                    alpha={disabled ? 0.2 : 1}
                    layout={{ position: 'absolute', left: Math.floor((CELL - thumbnail.width) / 2), top: Math.floor((CELL - thumbnail.height) / 2), width: thumbnail.width, height: thumbnail.height }}
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
                    src={layoutImage('icons_hc_icon_small.png')}
                    layout={{ position: 'absolute', right: 0, width: 10, bottom: 1, height: 9 }}
                />
            )}
            {isSellable && (
                <ThemeImage
                    src={layoutImage('icons_wearable.png')}
                    layout={{ position: 'absolute', left: 0, width: 17, bottom: 0, height: 20 }}
                />
            )}
        </Region>
    );
};
