import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `offer_category_dropmenu` of MarketPlaceOwnItemsWidget2 - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItemProps {
    layout?: BoxLayout;
    onOfferCategoryDropmenu?: () => void;
}

export const MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItem = ({ layout, onOfferCategoryDropmenu }: MarketPlaceOwnItemsWidget2OfferCategoryDropmenuItemProps) => {
    return (
        <Dropmenu
            variant="3"
            name="offer_category_dropmenu"
            onPointerTap={onOfferCategoryDropmenu}
            layout={{ width: 90, height: 25, flexShrink: 0, ...layout }}
        >
            OPEN
        </Dropmenu>
    );
};
