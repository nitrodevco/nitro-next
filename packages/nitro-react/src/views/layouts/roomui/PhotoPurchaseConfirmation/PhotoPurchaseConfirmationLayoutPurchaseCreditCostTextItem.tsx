import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `purchase_credit_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps {
    captionPurchaseCreditCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem = ({ captionPurchaseCreditCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps) => {
    return (
        <ThemeText
            text={captionPurchaseCreditCostText ?? ''}
            textStyle="text-style-u-bold"
            name="purchase_credit_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
