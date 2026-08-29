import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `purchase_ducket_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps {
    captionPurchaseDucketCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItem = ({ captionPurchaseDucketCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseDucketCostTextItemProps) => {
    return (
        <Region
            name="purchase_ducket_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseDucketCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
