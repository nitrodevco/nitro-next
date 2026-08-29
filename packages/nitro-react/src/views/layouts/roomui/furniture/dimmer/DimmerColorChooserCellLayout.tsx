import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `992_dimmer_color_chooser_cell_xml` (layout "color_chooser_cell", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DimmerColorChooserCellLayoutProps {
    layout?: BoxLayout;
    onColorChooserCell?: () => void;
    srcBorder?: string;
    srcChosen?: string;
    srcColor?: string;
}

export const DimmerColorChooserCellLayout = ({ layout, onColorChooserCell, srcBorder, srcChosen, srcColor }: DimmerColorChooserCellLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="color_chooser_cell"
                onPointerTap={onColorChooserCell}
                cursor="pointer"
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
            >
                <ThemeImage
                    name="border"
                    src={srcBorder}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="color"
                    src={srcColor}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ThemeImage
                    name="chosen"
                    src={srcChosen}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
            </Region>
        </Region>
    );
};
