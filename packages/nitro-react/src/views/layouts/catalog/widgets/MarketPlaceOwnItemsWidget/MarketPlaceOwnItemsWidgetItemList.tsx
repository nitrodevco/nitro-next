import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MarketPlaceOwnItemsWidgetExpiredItemItem } from './MarketPlaceOwnItemsWidgetExpiredItemItem';
import { MarketPlaceOwnItemsWidgetOngoingItemItem } from './MarketPlaceOwnItemsWidgetOngoingItemItem';
import { MarketPlaceOwnItemsWidgetSoldItemItem } from './MarketPlaceOwnItemsWidgetSoldItemItem';

/** Named region `item_list` of MarketPlaceOwnItemsWidget - configured through the parent's `itemList` prop. */
export interface MarketPlaceOwnItemsWidgetItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetItemList = ({ itemsItemList, layout }: MarketPlaceOwnItemsWidgetItemListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 72, bottom: 36, ...layout }}
        >
            <Region
                name="item_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsItemList ?? (
                    <>
                        <MarketPlaceOwnItemsWidgetOngoingItemItem />
                        <MarketPlaceOwnItemsWidgetSoldItemItem />
                        <MarketPlaceOwnItemsWidgetExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
