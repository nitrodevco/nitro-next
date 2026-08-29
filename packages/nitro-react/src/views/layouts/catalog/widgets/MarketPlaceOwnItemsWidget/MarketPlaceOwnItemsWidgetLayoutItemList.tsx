import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MarketPlaceOwnItemsWidgetLayoutExpiredItemItem } from './MarketPlaceOwnItemsWidgetLayoutExpiredItemItem';
import { MarketPlaceOwnItemsWidgetLayoutOngoingItemItem } from './MarketPlaceOwnItemsWidgetLayoutOngoingItemItem';
import { MarketPlaceOwnItemsWidgetLayoutSoldItemItem } from './MarketPlaceOwnItemsWidgetLayoutSoldItemItem';

/** Named region `item_list` of MarketPlaceOwnItemsWidgetLayout - configured through the parent's `itemList` prop. */
export interface MarketPlaceOwnItemsWidgetLayoutItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetLayoutItemList = ({ itemsItemList, layout }: MarketPlaceOwnItemsWidgetLayoutItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 340, top: 120, height: 265, ...layout }}
        >
            <Region
                name="item_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsItemList ?? (
                    <>
                        <MarketPlaceOwnItemsWidgetLayoutOngoingItemItem />
                        <MarketPlaceOwnItemsWidgetLayoutSoldItemItem />
                        <MarketPlaceOwnItemsWidgetLayoutExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
