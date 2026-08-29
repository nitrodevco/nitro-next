import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `purchase_credit_cost_text` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps {
    captionPurchaseCreditCostText?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItem = ({ captionPurchaseCreditCostText, layout }: PhotoPurchaseConfirmationLayoutPurchaseCreditCostTextItemProps) => {
    return (
        <Region
            name="purchase_credit_cost_text"
            layout={{ width: 4, height: 4, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseCreditCostText ?? ''}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
