import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `price_credits` of PremiumPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PremiumPurchaseConfirmationLayoutPriceCreditsItemProps {
    captionPriceCredits?: string;
    layout?: BoxLayout;
}

export const PremiumPurchaseConfirmationLayoutPriceCreditsItem = ({ captionPriceCredits, layout }: PremiumPurchaseConfirmationLayoutPriceCreditsItemProps) => {
    return (
        <ThemeText
            text={captionPriceCredits ?? '0'}
            name="price_credits"
            layout={{ width: 10, height: 18, flexShrink: 0, ...layout }}
        />
    );
};
