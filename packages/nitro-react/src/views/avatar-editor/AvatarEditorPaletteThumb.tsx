import { useState } from 'react';

import { LayoutImage, Region, ThemeImage } from '#base/theme';

export interface AvatarEditorPaletteThumbProps {
    color: string;
    isClub: boolean;
    selected: boolean;
    selectPalette: () => void;
}

const CENTERED = { stretchedX: false, stretchedY: false, pivot: 'center' } as const;

/**
 * One colour of a palette grid - the `palette_template` row of the `AvatarEditorContent` layout,
 * driven as Flash's `AvatarEditorGridColorItem`: the `avatar_editor_editor_clr_13x21_2` swatch
 * coloured by the part colour, the `_1` border (`_3` while selected or under the pointer) and the
 * HC icon for a club colour.
 */
export const AvatarEditorPaletteThumb = ({ color, isClub, selected, selectPalette }: AvatarEditorPaletteThumbProps) => {
    const [ isHovering, setIsHovering ] = useState<boolean>(false);

    return (
        <Region
            name="palette_template"
            onPointerOver={_ => setIsHovering(true)}
            onPointerOut={_ => setIsHovering(false)}
            onPointerTap={selectPalette}
            layout={{ width: 15, height: 23, flexShrink: 0 }}
        >
            <ThemeImage
                name="color"
                src={LayoutImage('avatar-editor/avatar_editor_editor_clr_13x21_2.png')}
                bitmap={CENTERED}
                tint={color}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                name="border"
                src={LayoutImage((selected || isHovering) ? 'avatar-editor/avatar_editor_editor_clr_13x21_3.png' : 'avatar-editor/avatar_editor_editor_clr_13x21_1.png')}
                bitmap={CENTERED}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            {isClub && (
                <ThemeImage
                    name="club_icon"
                    src={LayoutImage('avatar-editor/icons_hc_icon_small.png')}
                    bitmap={CENTERED}
                    layout={{ position: 'absolute', left: 3, width: 10, top: 10, height: 9 }}
                />
            )}
        </Region>
    );
};
