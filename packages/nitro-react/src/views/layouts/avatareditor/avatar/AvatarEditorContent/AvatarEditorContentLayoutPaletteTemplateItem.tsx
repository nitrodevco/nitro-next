import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `palette_template` of AvatarEditorContentLayout - pass real rows through its `items…` slot. */
export interface AvatarEditorContentLayoutPaletteTemplateItemProps {
    layout?: BoxLayout;
    onPaletteTemplate?: () => void;
    srcBorder?: string;
    srcClubIcon?: string;
    srcColor?: string;
    tintColor?: string;
    visibleBorder?: boolean;
    visibleClubIcon?: boolean;
    visibleColor?: boolean;
}

export const AvatarEditorContentLayoutPaletteTemplateItem = ({ layout, onPaletteTemplate, srcBorder, srcClubIcon, srcColor, tintColor, visibleBorder, visibleClubIcon, visibleColor }: AvatarEditorContentLayoutPaletteTemplateItemProps) => {
    return (
        <Region
            name="palette_template"
            onPointerTap={onPaletteTemplate}
            cursor="pointer"
            layout={{ width: 15, height: 23, flexShrink: 0, ...layout }}
        >
            {(visibleColor ?? true) && (
                <ThemeImage
                    name="color"
                    src={srcColor}
                    tint={tintColor}
                    layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
                />
            )}
            {(visibleBorder ?? true) && (
                <ThemeImage
                    name="border"
                    src={srcBorder ?? layoutImage('avatar_editor_editor_clr_13x21_1.png')}
                    layout={{ position: 'absolute', left: 1, width: 13, top: 0, height: 21 }}
                />
            )}
            {(visibleClubIcon ?? true) && (
                <ThemeImage
                    name="club_icon"
                    src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                    layout={{ position: 'absolute', left: 3, width: 10, top: 10, height: 9 }}
                />
            )}
        </Region>
    );
};
