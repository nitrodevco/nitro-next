import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItem } from './MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItem';
import { MarketPlaceOwnItemsWidget2SearchButtonItem } from './MarketPlaceOwnItemsWidget2SearchButtonItem';
import { MarketPlaceOwnItemsWidget2SearchInputBorderItem } from './MarketPlaceOwnItemsWidget2SearchInputBorderItem';
import { MarketPlaceOwnItemsWidget2SearchLabelItem } from './MarketPlaceOwnItemsWidget2SearchLabelItem';

/** Named region `search_container` of MarketPlaceOwnItemsWidget2 - configured through the parent's `searchContainer` prop. */
export interface MarketPlaceOwnItemsWidget2SearchContainerProps {
    itemsSearchContainer?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidget2SearchContainer = ({ itemsSearchContainer, layout }: MarketPlaceOwnItemsWidget2SearchContainerProps) => {
    return (
        <Region
            name="search_container"
            layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsSearchContainer ?? (
                <>
                    <MarketPlaceOwnItemsWidget2SearchLabelItem />
                    <MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItem />
                    <MarketPlaceOwnItemsWidget2SearchInputBorderItem />
                    <MarketPlaceOwnItemsWidget2SearchButtonItem />
                </>
            )}
        </Region>
    );
};
