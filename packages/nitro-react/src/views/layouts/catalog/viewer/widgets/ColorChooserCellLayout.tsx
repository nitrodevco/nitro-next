import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `1702_color_chooser_cell_xml` (layout "color_chooser_cell", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ColorChooserCellLayoutProps {
    layout?: BoxLayout;
    srcBorder?: string;
    srcChosen?: string;
    srcColor?: string;
}

export const ColorChooserCellLayout = ({ layout, srcBorder, srcChosen, srcColor }: ColorChooserCellLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 20, height: 20, ...layout }}>
            <Region
                name="color_chooser_cell"
                params={17}
                layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
            >
                <ThemeImage
                    name="border"
                    tags={[ 'BG_BORDER' ]}
                    params={2192}
                    src={srcBorder}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
                <ThemeImage
                    name="color"
                    tags={[ 'COLOR_IMAGE' ]}
                    params={2192}
                    src={srcColor}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
                <ThemeImage
                    name="chosen"
                    tags={[ 'COLOR_CHOSEN' ]}
                    params={2192}
                    src={srcChosen}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
            </Region>
        </Region>
    );
};
