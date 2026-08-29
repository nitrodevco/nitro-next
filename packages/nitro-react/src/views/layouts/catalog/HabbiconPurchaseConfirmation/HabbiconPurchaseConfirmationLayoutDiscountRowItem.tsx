import { useTranslation } from '#base/context';
import { BoxLayout, Region, ThemeText } from '#base/theme';

/** Row template `discount_row` of HabbiconPurchaseConfirmationLayout - pass real rows through its `items…` slot. */
export interface HabbiconPurchaseConfirmationLayoutDiscountRowItemProps {
    captionDiscountAmount?: string;
    captionDiscountLabel?: string;
    layout?: BoxLayout;
    visibleDiscountAmount?: boolean;
    visibleDiscountLabel?: boolean;
}

export const HabbiconPurchaseConfirmationLayoutDiscountRowItem = ({ captionDiscountAmount, captionDiscountLabel, layout, visibleDiscountAmount, visibleDiscountLabel }: HabbiconPurchaseConfirmationLayoutDiscountRowItemProps) => {
    const t = useTranslation();

    return (
        <Region
            name="discount_row"
            layout={{ width: 327, height: 17, flexShrink: 0, ...layout }}
        >
            {(visibleDiscountLabel ?? true) && (
                <Region
                    name="discount_label"
                    layout={{ position: 'absolute', left: 0, width: 58, top: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDiscountLabel ?? t('habbicon_purchase.confirm.discount')}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#5f4c16' }}
                    />
                </Region>
            )}
            {(visibleDiscountAmount ?? true) && (
                <Region
                    name="discount_amount"
                    layout={{ position: 'absolute', left: 232, width: 95, bottom: 0, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionDiscountAmount ?? '0'}
                        textStyle="text-style-u-bold"
                        textOptions={{ fill: '#5f4c16', align: 'right' }}
                    />
                </Region>
            )}
        </Region>
    );
};
