import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `purchase_count` of PhotoPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PhotoPurchaseConfirmationLayoutPurchaseCountItemProps {
    captionPurchaseCount?: string;
    layout?: BoxLayout;
}

export const PhotoPurchaseConfirmationLayoutPurchaseCountItem = ({ captionPurchaseCount, layout }: PhotoPurchaseConfirmationLayoutPurchaseCountItemProps) => {
    return (
        <Region
            name="purchase_count"
            layout={{ width: 11, height: 19, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPurchaseCount ?? '0'}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};
