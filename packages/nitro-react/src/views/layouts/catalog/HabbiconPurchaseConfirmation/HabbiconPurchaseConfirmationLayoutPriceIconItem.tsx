import { BoxLayout, Icon } from '#base/theme';

/** Row template `price_icon` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceIconItemProps {
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceIconItem = ({ layout }: HabbiconPurchaseConfirmationLayoutPriceIconItemProps) => {
    return (
        <Icon
            variant="34"
            name="price_icon"
            layout={{ width: 22, height: 22, flexShrink: 0, ...layout }}
        />
    );
};
