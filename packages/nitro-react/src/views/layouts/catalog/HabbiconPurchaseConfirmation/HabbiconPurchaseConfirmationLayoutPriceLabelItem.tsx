import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `price_label` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutPriceLabelItemProps {
    captionPriceLabel?: string;
    layout?: BoxLayout;
}

export const HabbiconPurchaseConfirmationLayoutPriceLabelItem = ({ captionPriceLabel, layout }: HabbiconPurchaseConfirmationLayoutPriceLabelItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="price_label"
            layout={{ width: 237, height: 17, flexShrink: 0, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start', ...layout }}
        >
            <ThemeText
                text={captionPriceLabel ?? t('catalog.purchase.confirmation.dialog.cost')}
                textStyle="text-style-u-regular"
            />
        </Region>
    );
};
