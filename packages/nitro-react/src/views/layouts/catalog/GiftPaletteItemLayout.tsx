import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

/** Generated from `1614_gift_palette_item_xml` (layout "palette_item", 27x22) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface GiftPaletteItemLayoutProps {
    colorContainer?: GiftPaletteItemLayoutColorContainerProps;
    layout?: BoxLayout;
}

export const GiftPaletteItemLayout = ({ colorContainer, layout }: GiftPaletteItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 27, height: 22, ...layout }}>
            <GiftPaletteItemLayoutColorContainer {...colorContainer} />
        </Region>
    );
};

/** Named region `color_container` of GiftPaletteItemLayout - configured through the parent's `colorContainer` prop. */
export interface GiftPaletteItemLayoutColorContainerProps {
    layout?: BoxLayout;
    onColorContainer?: () => void;
    srcBorder?: string;
    srcColor?: string;
    srcSelection?: string;
    tags?: string[];
}

export const GiftPaletteItemLayoutColorContainer = ({ layout, onColorContainer, srcBorder, srcColor, srcSelection, tags }: GiftPaletteItemLayoutColorContainerProps) => {
    return (
        <Region
            name="color_container"
            tags={tags}
            backgroundColor="#ffffff"
            onPointerTap={onColorContainer}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22, ...layout }}
        >
            <ThemeImage
                name="color"
                src={srcColor ?? layoutImage('catalogue_color_picker_27x22_color.png')}
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
            />
            <ThemeImage
                name="border"
                src={srcBorder ?? layoutImage('catalogue_color_picker_27x22_border.png')}
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
            />
            <ThemeImage
                name="selection"
                src={srcSelection ?? layoutImage('catalogue_color_picker_27x22_selection.png')}
                layout={{ position: 'absolute', left: 0, width: 27, top: 0, height: 22 }}
            />
        </Region>
    );
};
