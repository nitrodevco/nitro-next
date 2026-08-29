import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1702_color_chooser_cell_xml` (layout "color_chooser_cell", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ColorChooserCellLayoutProps {
    colorChooserCell?: ColorChooserCellLayoutColorChooserCellProps;
    layout?: BoxLayout;
}

export const ColorChooserCellLayout = ({ colorChooserCell, layout }: ColorChooserCellLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <ColorChooserCellLayoutColorChooserCell {...colorChooserCell} />
        </Region>
    );
};

/** Named region `color_chooser_cell` of ColorChooserCellLayout - configured through the parent's `colorChooserCell` prop. */
export interface ColorChooserCellLayoutColorChooserCellProps {
    layout?: BoxLayout;
    onColorChooserCell?: () => void;
    srcBorder?: string;
    srcChosen?: string;
    srcColor?: string;
    tags?: string[];
}

export const ColorChooserCellLayoutColorChooserCell = ({ layout, onColorChooserCell, srcBorder, srcChosen, srcColor, tags }: ColorChooserCellLayoutColorChooserCellProps) => {
    return (
        <Region
            name="color_chooser_cell"
            tags={tags}
            onPointerTap={onColorChooserCell}
            cursor="pointer"
            layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32, ...layout }}
        >
            <ThemeImage
                name="border"
                tags={[ 'BG_BORDER' ]}
                src={srcBorder}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="color"
                tags={[ 'COLOR_IMAGE' ]}
                src={srcColor}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
            <ThemeImage
                name="chosen"
                tags={[ 'COLOR_CHOSEN' ]}
                src={srcChosen}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            />
        </Region>
    );
};
