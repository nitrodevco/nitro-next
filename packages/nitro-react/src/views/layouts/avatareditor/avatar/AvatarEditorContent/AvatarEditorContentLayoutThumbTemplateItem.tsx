import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Row template `thumb_template` of AvatarEditorContentLayout - pass real rows through its `items…` slot. */
export interface AvatarEditorContentLayoutThumbTemplateItemProps {
    layout?: BoxLayout;
    onThumbTemplate?: () => void;
    srcBitmap?: string;
    srcClubIcon?: string;
    srcHover?: string;
    srcSellableIcon?: string;
    tintBitmap?: string;
    visibleBitmap?: boolean;
    visibleClubIcon?: boolean;
    visibleHover?: boolean;
    visibleSellableIcon?: boolean;
}

export const AvatarEditorContentLayoutThumbTemplateItem = ({ layout, onThumbTemplate, srcBitmap, srcClubIcon, srcHover, srcSellableIcon, tintBitmap, visibleBitmap, visibleClubIcon, visibleHover, visibleSellableIcon }: AvatarEditorContentLayoutThumbTemplateItemProps) => {
    return (
        <Region
            name="thumb_template"
            onPointerTap={onThumbTemplate}
            cursor="pointer"
            layout={{ width: 50, height: 50, flexShrink: 0, ...layout }}
        >
            {(visibleHover ?? true) && (
                <ThemeImage
                    name="hover"
                    src={srcHover ?? layoutImage('avatar_editor_parts_hilite.png')}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50 }}
                />
            )}
            {(visibleBitmap ?? true) && (
                <ThemeImage
                    name="bitmap"
                    src={srcBitmap}
                    tint={tintBitmap}
                    layout={{ position: 'absolute', left: 0, width: 50, top: 0, height: 50, minWidth: 50, maxWidth: 50 }}
                />
            )}
            {(visibleClubIcon ?? true) && (
                <ThemeImage
                    name="club_icon"
                    src={srcClubIcon ?? layoutImage('icons_hc_icon_small.png')}
                    layout={{ position: 'absolute', left: 40, width: 10, top: 40, height: 9 }}
                />
            )}
            {(visibleSellableIcon ?? true) && (
                <ThemeImage
                    name="sellable_icon"
                    src={srcSellableIcon ?? layoutImage('icons_wearable.png')}
                    layout={{ position: 'absolute', left: 0, width: 17, top: 30, height: 20 }}
                />
            )}
        </Region>
    );
};
