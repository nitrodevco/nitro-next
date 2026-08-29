import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { NavigatorFrame2LayoutCategoryAddQuickLinkItem } from './NavigatorFrame2LayoutCategoryAddQuickLinkItem';
import { NavigatorFrame2LayoutCategoryBackItem } from './NavigatorFrame2LayoutCategoryBackItem';
import { NavigatorFrame2LayoutCategoryShowMoreItem } from './NavigatorFrame2LayoutCategoryShowMoreItem';
import { NavigatorFrame2LayoutCategoryToggleRowsItem } from './NavigatorFrame2LayoutCategoryToggleRowsItem';
import { NavigatorFrame2LayoutCategoryToggleTilesItem } from './NavigatorFrame2LayoutCategoryToggleTilesItem';

/** Named region `category_controls_itemlist` of NavigatorFrame2Layout - configured through the parent's `categoryControlsItemlist` prop. */
export interface NavigatorFrame2LayoutCategoryControlsItemlistProps {
    itemsCategoryControlsItemlist?: ReactNode;
    layout?: BoxLayout;
}

export const NavigatorFrame2LayoutCategoryControlsItemlist = ({ itemsCategoryControlsItemlist, layout }: NavigatorFrame2LayoutCategoryControlsItemlistProps) => {
    return (
        <Region
            name="category_controls_itemlist"
            layout={{ position: 'absolute', right: 14, width: 83, top: 1, height: 26, flexDirection: 'row', gap: 5, ...layout }}
        >
            {itemsCategoryControlsItemlist ?? (
                <>
                    <NavigatorFrame2LayoutCategoryToggleTilesItem />
                    <NavigatorFrame2LayoutCategoryToggleRowsItem />
                    <NavigatorFrame2LayoutCategoryShowMoreItem />
                    <NavigatorFrame2LayoutCategoryBackItem />
                    <NavigatorFrame2LayoutCategoryAddQuickLinkItem />
                </>
            )}
        </Region>
    );
};
