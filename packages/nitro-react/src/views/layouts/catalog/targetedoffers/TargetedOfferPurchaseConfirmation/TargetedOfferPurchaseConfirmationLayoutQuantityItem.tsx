import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `quantity` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout }: TargetedOfferPurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        <ThemeText
            text={captionQuantity ?? ''}
            textStyle="text-style-u-bold"
            name="quantity"
            layout={{ width: 41, flexShrink: 0, ...layout }}
        />
    );
};
