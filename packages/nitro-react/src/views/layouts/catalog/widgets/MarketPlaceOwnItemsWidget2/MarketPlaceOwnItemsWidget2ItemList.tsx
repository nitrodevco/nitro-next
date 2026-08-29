import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MarketPlaceOwnItemsWidget2ExpiredItemItem } from './MarketPlaceOwnItemsWidget2ExpiredItemItem';
import { MarketPlaceOwnItemsWidget2OngoingItemItem } from './MarketPlaceOwnItemsWidget2OngoingItemItem';
import { MarketPlaceOwnItemsWidget2SoldItemItem } from './MarketPlaceOwnItemsWidget2SoldItemItem';

/** Named region `item_list` of MarketPlaceOwnItemsWidget2 - configured through the parent's `itemList` prop. */
export interface MarketPlaceOwnItemsWidget2ItemListProps {
    itemsItemList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidget2ItemList = ({ itemsItemList, layout }: MarketPlaceOwnItemsWidget2ItemListProps) => {
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
                        <MarketPlaceOwnItemsWidget2OngoingItemItem />
                        <MarketPlaceOwnItemsWidget2SoldItemItem />
                        <MarketPlaceOwnItemsWidget2ExpiredItemItem />
                    </>
                )}
            </Region>
        </ScrollArea>
    );
};
