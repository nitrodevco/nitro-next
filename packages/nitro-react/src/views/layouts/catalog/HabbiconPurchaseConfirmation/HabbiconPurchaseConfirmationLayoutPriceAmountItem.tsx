import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `price_amount` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceAmountItemProps {
    captionPriceAmount?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceAmountItem = ({ captionPriceAmount, layout }: HabbiconPurchaseConfirmationLayoutPriceAmountItemProps) => {
    return (
        <Region
            name="price_amount"
            layout={{ width: 12, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPriceAmount ?? '0'}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};
