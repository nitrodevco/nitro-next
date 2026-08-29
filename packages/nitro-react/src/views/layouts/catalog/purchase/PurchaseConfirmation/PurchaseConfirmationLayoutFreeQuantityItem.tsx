import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `freeQuantity` of PurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface PurchaseConfirmationLayoutFreeQuantityItemProps {
    captionFreeQuantity?: string;
    layout?: BoxLayout;
}

export const PurchaseConfirmationLayoutFreeQuantityItem = ({ captionFreeQuantity, layout }: PurchaseConfirmationLayoutFreeQuantityItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="freeQuantity"
            layout={{ width: 161, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionFreeQuantity ?? t('shop.bonus.items.count')}
                textStyle="text-style-u-bold"
            />
        </Region>
    );
};
