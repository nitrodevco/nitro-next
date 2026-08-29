import { ReactNode } from 'react';

import { BoxLayout, Region, ScrollArea } from '#base/theme';

import { MarketPlaceWidget2OfferItemItem } from './MarketPlaceWidget2OfferItemItem';

/** Named region `offer_list` of MarketPlaceWidget2 - configured through the parent's `offerList` prop. */
export interface MarketPlaceWidget2OfferListProps {
    itemsOfferList?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceWidget2OfferList = ({ itemsOfferList, layout }: MarketPlaceWidget2OfferListProps) => {
    return (
        <ScrollArea
            orientation="vertical"
            layout={{ position: 'absolute', left: 0, width: 360, top: 170, bottom: 13, ...layout }}
        >
            <Region
                name="offer_list"
                layout={{ flexDirection: 'column', gap: 1, width: '100%' }}
            >
                {itemsOfferList ?? (
                    <MarketPlaceWidget2OfferItemItem />
                )}
            </Region>
        </ScrollArea>
    );
};
