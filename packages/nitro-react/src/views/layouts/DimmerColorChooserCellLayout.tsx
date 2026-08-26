import { BoxLayout, Region, ThemeImage } from '#base/theme';

/** Generated from `992_dimmer_color_chooser_cell_xml` (layout "color_chooser_cell", 20x20) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DimmerColorChooserCellLayoutProps {
    layout?: BoxLayout;
}

export const DimmerColorChooserCellLayout = ({ layout }: DimmerColorChooserCellLayoutProps) => {
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
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
                <ThemeImage
                    name="color"
                    tags={[ 'COLOR_IMAGE' ]}
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
                <ThemeImage
                    name="chosen"
                    tags={[ 'COLOR_CHOSEN' ]}
                    params={2192}
                    src={undefined}
                    layout={{ position: 'absolute', left: 0, width: 40, top: 0, height: 32 }}
                />
            </Region>
        </Region>
    );
};
