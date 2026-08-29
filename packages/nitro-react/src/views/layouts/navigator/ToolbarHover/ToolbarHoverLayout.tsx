import { ReactNode } from 'react';

import { Border, BoxLayout, Region } from '#base/theme';

import { ToolbarHoverLayoutItemBasicItem } from './ToolbarHoverLayoutItemBasicItem';

/** Generated from `3070_toolbar_hover_xml` (layout "toolbar_hover", 252x36) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ToolbarHoverLayoutProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const ToolbarHoverLayout = ({ itemsItemList, layout }: ToolbarHoverLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 252, height: 36, ...layout }}>
            <Region
                dropShadow={{ distance: 3, alpha: 0.6 }}
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <Border
                    variant="6"
                    name="toolbar_hover"
                    tintColor="#79756e"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Region
                        name="item_list"
                        layout={{ position: 'absolute', left: 7, right: 0, top: 7, bottom: 4, flexDirection: 'column' }}
                    >
                        {itemsItemList ?? (
                            <ToolbarHoverLayoutItemBasicItem />
                        )}
                    </Region>
                </Border>
            </Region>
        </Region>
    );
};
