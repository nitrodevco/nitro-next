import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `quantity` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutQuantityItemProps {
    captionQuantity?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutQuantityItem = ({ captionQuantity, layout }: PurchaseConfirmationLayoutQuantityItemProps) => {
    return (
        <ThemeText
            text={captionQuantity ?? 'X 123'}
            textStyle="text-style-u-bold"
            name="quantity"
            layout={{ width: 41, flexShrink: 0, ...layout }}
        />
    );
};
