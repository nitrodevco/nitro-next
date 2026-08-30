import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `product_name` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: TargetedOfferPurchaseConfirmationLayoutProductNameItemProps) => {
    return (
        <ThemeText
            text={captionProductName ?? '001 lorem ipsum title that wraps around'}
            textStyle="text-style-u-bold"
            textOptions={{ wordWrap: true, wordWrapWidth: 177 }}
            name="product_name"
            verticalAlign="top"
            layout={{ width: 177, flexShrink: 0, ...layout }}
        />
    );
};
