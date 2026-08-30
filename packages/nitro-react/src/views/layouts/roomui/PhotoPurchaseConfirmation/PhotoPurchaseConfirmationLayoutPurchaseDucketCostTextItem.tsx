import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `purchase_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps {
    captionPurchaseDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem = ({ captionPurchaseDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps) => {
    return (
        <ThemeText
            text={captionPurchaseDucketCostText ?? ''}
            textStyle="text-style-u-bold"
            name="purchase_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, ...layout }}
        />
    );
};
