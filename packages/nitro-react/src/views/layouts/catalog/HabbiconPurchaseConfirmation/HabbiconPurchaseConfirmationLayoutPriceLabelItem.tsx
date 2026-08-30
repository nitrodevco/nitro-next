import { useTranslation } from '#base/context';
import { BoxLayout, ThemeText } from '#base/theme';

/** Row template `price_label` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceLabelItemProps {
    captionPriceLabel?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceLabelItem = ({ captionPriceLabel, layout }: HabbiconPurchaseConfirmationLayoutPriceLabelItemProps) => {
    const t = useTranslation();

    return (
        <ThemeText
            text={captionPriceLabel ?? t('catalog.purchase.confirmation.dialog.cost')}
            textStyle="text-style-u-regular"
            name="price_label"
            layout={{ width: 237, height: 17, flexShrink: 0, ...layout }}
        />
    );
};
