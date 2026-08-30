import { BoxLayout, Dropmenu } from '#base/theme';

/** Row template `offer_category_dropmenu` of MarketPlaceOwnItemsWidget - pass real rows through its `items…` slot. */
export interface MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItemProps {
    layout?: BoxLayout;
    onOfferCategoryDropmenu?: () => void;
}

export const MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItem = ({ layout, onOfferCategoryDropmenu }: MarketPlaceOwnItemsWidgetOfferCategoryDropmenuItemProps) => {
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
