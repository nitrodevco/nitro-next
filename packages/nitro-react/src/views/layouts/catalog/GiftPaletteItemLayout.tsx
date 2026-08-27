import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1614_gift_palette_item_xml` (layout "palette_item", 27x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GiftPaletteItemLayoutProps {
    layout?: BoxLayout;
    onColorContainer?: () => void;
    srcBorder?: string;
    srcColor?: string;
    srcSelection?: string;
}

export const GiftPaletteItemLayout = ({ layout, onColorContainer, srcBorder, srcColor, srcSelection }: GiftPaletteItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 27, height: 22, ...layout }}>
            <Region
                name="color_container"
                params={17}
                backgroundColor="#ffffff"
                onPointerTap={onColorContainer}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
            >
                <ThemeImage
                    name="color"
                    params={16}
                    src={srcColor ?? layoutImage('catalogue_color_picker_27x22_color.png')}
                    layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
                />
                <ThemeImage
                    name="border"
                    params={16}
                    src={srcBorder ?? layoutImage('catalogue_color_picker_27x22_border.png')}
                    layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
                />
                <ThemeImage
                    name="selection"
                    params={16}
                    src={srcSelection ?? layoutImage('catalogue_color_picker_27x22_selection.png')}
                    layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
                />
            </Region>
        </Region>
    );
};
