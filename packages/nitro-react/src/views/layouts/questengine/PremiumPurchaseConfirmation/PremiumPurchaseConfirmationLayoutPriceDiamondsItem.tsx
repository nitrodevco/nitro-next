import { BoxLayout, Region } from '#base/theme';

/** Row template `price_diamonds` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps {
    captionPriceDiamonds?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPriceDiamondsItem = ({ captionPriceDiamonds, layout }: PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps) => {
    return (
        <Region
            name="price_diamonds"
            layout={{ width: 10, height: 18, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            {captionPriceDiamonds ?? '0'}
        </Region>
    );
};
