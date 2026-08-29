import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MarketPlaceWidgetLayoutOfferItemItem } from './MarketPlaceWidgetLayoutOfferItemItem';

/** Named region `offer_list` of MarketPlaceWidgetLayout - configured through the parent's `offerList` prop. */
export interface MarketPlaceWidgetLayoutOfferListProps {
    itemsOfferList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceWidgetLayoutOfferList = ({ itemsOfferList, layout }: MarketPlaceWidgetLayoutOfferListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, right: 0, top: 170, height: 220, ...layout }}
        >
            <Region
                name="offer_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsOfferList ?? (
                    <MarketPlaceWidgetLayoutOfferItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};
