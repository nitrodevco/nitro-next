import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `price_diamonds` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps {
    captionPriceDiamonds?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPriceDiamondsItem = ({ captionPriceDiamonds, layout }: PremiumPurchaseConfirmationLayoutPriceDiamondsItemProps) => {
    return (
        <ThemeText
            text={captionPriceDiamonds ?? '0'}
            name="price_diamonds"
            layout={{ width: 10, height: 18, flexShrink: 0, ...layout }}
        />
    );
};
