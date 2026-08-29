import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `product_name` of TargetedOfferPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface TargetedOfferPurchaseConfirmationLayoutProductNameItemProps {
    captionProductName?: string;
    layout?: BoxLayout;
}

export const TargetedOfferPurchaseConfirmationLayoutProductNameItem = ({ captionProductName, layout }: TargetedOfferPurchaseConfirmationLayoutProductNameItemProps) => {
    return (
        <Region
            name="product_name"
            layout={{ width: 177, flexShrink: 0, flexDirection: 'row', alignItems: 'flex-start', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionProductName ?? '001 lorem ipsum title that wraps around'}
                textStyle="text-style-u-bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 177 }}
            />
        </Region>
    );
};
