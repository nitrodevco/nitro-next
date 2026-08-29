import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1666_colourGridWidget_xml` (layout "colourGridWidget", 115x100) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ColourGridWidgetLayoutProps {
    colourGrid?: ColourGridWidgetLayoutColourGridProps;
    layout?: BoxLayout;
}

export const ColourGridWidgetLayout = ({ colourGrid, layout }: ColourGridWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 115, height: 100, ...layout }}>
            <Region layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}>
                <Border
                    variant="6"
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ColourGridWidgetLayoutColourGrid {...colourGrid} />
            </Region>
        </Region>
    );
};

/** Named region `colourGrid` of ColourGridWidgetLayout - configured through the parent's `colourGrid` prop. */
export interface ColourGridWidgetLayoutColourGridProps {
    layout?: BoxLayout;
    tags?: string[];
}

export const ColourGridWidgetLayoutColourGrid = ({ layout, tags }: ColourGridWidgetLayoutColourGridProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 2, right: 2, top: 2, bottom: 2, ...layout }}
        >
            <Region
                name="colourGrid"
                tags={tags}
                layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 2, width: '100%' }}
            />
        </ScrollArea>
    );
};
