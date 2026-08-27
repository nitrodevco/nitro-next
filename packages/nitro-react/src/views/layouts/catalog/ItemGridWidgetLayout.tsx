import { Border, BoxLayout, Region, ScrollArea } from '#base/theme';

/** Generated from `1651_itemGridWidget_xml` (layout "itemGridWidget", 360x200) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ItemGridWidgetLayoutProps {
    layout?: BoxLayout;
}

export const ItemGridWidgetLayout = ({ layout }: ItemGridWidgetLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 360, height: 200, ...layout }}>
            <Region
                params={2064}
                layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}
            >
                <Border
                    variant="6"
                    params={2192}
                    blend={0.5}
                    layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
                />
                <ScrollArea
                    orientation="vertical"
                    layout={{ position: 'absolute', left: 4, right: 4, top: 4, bottom: 4 }}
                >
                    <Region
                        name="itemGrid"
                        params={2192}
                        layout={{ flexDirection: 'row', flexWrap: 'wrap', gap: 3, width: '100%' }}
                    />
                </ScrollArea>
            </Region>
        </Region>
    );
};
