import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `purchase_count` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCountItemProps {
    captionPurchaseCount?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCountItem = ({ captionPurchaseCount, layout }: PhotoPurchaseConfirmationLayoutPurchaseCountItemProps) => {
    return (
        <ThemeText
            text={captionPurchaseCount ?? '0'}
            textStyle="text-style-u-regular"
            name="purchase_count"
            layout={{ width: 11, height: 19, flexShrink: 0, ...layout }}
        />
    );
};
