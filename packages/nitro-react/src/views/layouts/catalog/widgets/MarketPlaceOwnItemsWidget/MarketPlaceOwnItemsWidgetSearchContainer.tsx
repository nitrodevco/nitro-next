import { ReactNode } from 'react';

import { BoxLayout, Region } from '#base/theme';

import { MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem } from './MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem';
import { MarketPlaceOwnItemsWidgetSearchButtonItem } from './MarketPlaceOwnItemsWidgetSearchButtonItem';
import { MarketPlaceOwnItemsWidgetSearchInputBorderItem } from './MarketPlaceOwnItemsWidgetSearchInputBorderItem';
import { MarketPlaceOwnItemsWidgetSearchLabelItem } from './MarketPlaceOwnItemsWidgetSearchLabelItem';

/** Named region `search_container` of MarketPlaceOwnItemsWidget - configured through the parent's `searchContainer` prop. */
export interface MarketPlaceOwnItemsWidgetSearchContainerProps {
    itemsSearchContainer?: ReactNode;
    layout?: BoxLayout;
}

export const MarketPlaceOwnItemsWidgetSearchContainer = ({ itemsSearchContainer, layout }: MarketPlaceOwnItemsWidgetSearchContainerProps) => {
    return (
        <Region
            name="search_container"
            layout={{ position: 'absolute', left: 0, width: 347, top: 39, height: 26, flexDirection: 'row', gap: 10, ...layout }}
        >
            {itemsSearchContainer ?? (
                <>
                    <MarketPlaceOwnItemsWidgetSearchLabelItem />
                    <MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem />
                    <MarketPlaceOwnItemsWidgetSearchInputBorderItem />
                    <MarketPlaceOwnItemsWidgetSearchButtonItem />
                </>
            )}
        </Region>
    );
};
