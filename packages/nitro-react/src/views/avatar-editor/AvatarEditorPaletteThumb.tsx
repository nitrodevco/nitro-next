import { useState } from 'react';

import { LayoutImage, Region, ThemeImage } from '#base/theme';

export interface AvatarEditorPaletteThumbProps {
    color: string;
    isClub: boolean;
    selected: boolean;
    selectPalette: () => void;
}

export const AvatarEditorPaletteThumb = ({ color, isClub, selected, selectPalette }: AvatarEditorPaletteThumbProps) => {
    const [ isHovering, setIsHovering ] = useState<boolean>(false);

    return (
        <Region
            onPointerOver={_ => setIsHovering(true)}
            onPointerOut={_ => setIsHovering(false)}
            onPointerTap={selectPalette}
            layout={{ width: 15, height: 23, flexShrink: 0 }}
        >
            <ThemeImage
                src={LayoutImage('avatar-editor/avatar_editor_editor_clr_13x21_2.png')}
                tint={color}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            <ThemeImage
                src={LayoutImage((selected || isHovering) ? 'avatar-editor/avatar_editor_editor_clr_13x21_3.png' : 'avatar-editor/avatar_editor_editor_clr_13x21_1.png')}
                layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
            />
            {isClub && (
                <ThemeImage
                    name="club_icon"
                    src={LayoutImage('avatar-editor/icons_hc_icon_small.png')}
                    layout={{ position: 'absolute', left: 3, width: 10, top: 10, height: 9 }}
                />
            )}
        </Region>
    );
};
