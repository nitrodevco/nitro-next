import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `quantity` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout }: PurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        <Region
            name="quantity"
            layout={{ width: 41, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionQuantity ?? 'X 123'}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
