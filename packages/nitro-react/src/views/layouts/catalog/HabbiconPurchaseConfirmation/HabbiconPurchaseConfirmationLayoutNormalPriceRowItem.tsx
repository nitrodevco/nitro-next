import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `normal_price_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutNormalPriceRowItemProps {
    captionNormalPriceAmount?: string;
    captionNormalPriceLabel?: string;
    layout?: BoxLayout;
    visibleNormalPriceAmount?: boolean;
    visibleNormalPriceLabel?: boolean;
}

export const HabbiconPurchaseConfirmationLayoutNormalPriceRowItem = ({ captionNormalPriceAmount, captionNormalPriceLabel, layout, visibleNormalPriceAmount, visibleNormalPriceLabel }: HabbiconPurchaseConfirmationLayoutNormalPriceRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="normal_price_row"
            layout={{ width: 327, height: 17, flexShrink: 0, ...layout }}
        >
            {(visibleNormalPriceLabel ?? true) && (
                <Region
                    name="normal_price_label"
                    layout={{ position: 'absolute', left: 0, width: 80, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionNormalPriceLabel ?? t('habbicon_purchase.confirm.normal_price')}
                        textStyle="text-style-u-regular"
                    />
                </Region>
            )}
            {(visibleNormalPriceAmount ?? true) && (
                <Region
                    name="normal_price_amount"
                    layout={{ position: 'absolute', right: 0, width: 95, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionNormalPriceAmount ?? '0'}
                        textStyle="text-style-u-regular"
                        textOptions={{ align: 'right' }}
                    />
                </Region>
            )}
        </Region>
    );
};
