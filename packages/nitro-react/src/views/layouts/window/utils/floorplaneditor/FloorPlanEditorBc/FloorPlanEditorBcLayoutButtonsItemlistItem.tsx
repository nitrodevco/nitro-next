import { ReactNode } from 'react';

import { BoxLayout, Region, ThemeImage } from '#base/theme';
import { layoutImage } from '#base/views/layouts/layoutAssets';

import { FloorPlanEditorBcLayoutAddTileItem } from './FloorPlanEditorBcLayoutAddTileItem';
import { FloorPlanEditorBcLayoutDecreaseHeightItem } from './FloorPlanEditorBcLayoutDecreaseHeightItem';
import { FloorPlanEditorBcLayoutIncreaseHeightItem } from './FloorPlanEditorBcLayoutIncreaseHeightItem';
import { FloorPlanEditorBcLayoutRemoveTileItem } from './FloorPlanEditorBcLayoutRemoveTileItem';
import { FloorPlanEditorBcLayoutSetEnterTileItem } from './FloorPlanEditorBcLayoutSetEnterTileItem';

/** Row template `buttons_itemlist` of FloorPlanEditorBcLayout - pass real rows through its `items…` slot. */
export interface FloorPlanEditorBcLayoutButtonsItemlistItemProps {
    itemsButtonsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const FloorPlanEditorBcLayoutButtonsItemlistItem = ({ itemsButtonsItemlist, layout }: FloorPlanEditorBcLayoutButtonsItemlistItemProps) => {
    return (
        <Region
            name="buttons_itemlist"
            layout={{ width: 320, height: 52, flexShrink: 0, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsButtonsItemlist ?? (
                <>
                    <FloorPlanEditorBcLayoutAddTileItem />
                    <FloorPlanEditorBcLayoutRemoveTileItem />
                    <FloorPlanEditorBcLayoutIncreaseHeightItem />
                    <FloorPlanEditorBcLayoutDecreaseHeightItem />
                    <FloorPlanEditorBcLayoutSetEnterTileItem />
                </>
            )}
            <ThemeImage
                src={layoutImage('landing_view_reception_horizontal.png')}
                layout={{ width: 2, height: 42, flexShrink: 0 }}
            />
            <ThemeImage
                src={layoutImage('landing_view_reception_horizontal.png')}
                layout={{ width: 2, height: 42, flexShrink: 0 }}
            />
        </Region>
    );
};
