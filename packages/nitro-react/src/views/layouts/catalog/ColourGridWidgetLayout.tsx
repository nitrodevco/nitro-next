import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1666_colourGridWidget_xml` (layout "colourGridWidget", 115x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ColourGridWidgetLayoutProps {
    layout?: BoxLayout;
}

export const ColourGridWidgetLayout = ({ layout }: ColourGridWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 100, ...layout }}>
            <Region
                params={2192}
                layout={{ position: 'absolute', left: 0, width: 115, top: 0, height: 100 }}
            >
                <Border
                    variant="6"
                    params={2192}
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, width: 115, top: 0, height: 100 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 2, width: 111, top: 2, height: 96 }}
                >
                    <Region
                        name="colourGrid"
                        params={2192}
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
                    />
                </ScrollArea>
            </Region>
        </Region>
    );
};
