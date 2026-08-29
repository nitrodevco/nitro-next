import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeText } from '#base/theme';

/** Named region `total_value_container` of DiscountValueItemLayout - configured through the parent's `totalValueContainer` prop. */
export interface DiscountValueItemLayoutTotalValueContainerProps {
    captionTotalCurrencyValueLeft?: string;
    captionTotalCurrencyValueRight?: string;
    captionTotalText?: string;
    layout?: BoxLayout;
    striketroughTotalCurrencyLeft?: ReactNode;
    striketroughTotalCurrencyRight?: ReactNode;
}

export const DiscountValueItemLayoutTotalValueContainer = ({ captionTotalCurrencyValueLeft, captionTotalCurrencyValueRight, captionTotalText, layout, striketroughTotalCurrencyLeft, striketroughTotalCurrencyRight }: DiscountValueItemLayoutTotalValueContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="total_value_container"
            layout={{ position: 'absolute', right: -3, width: 155, top: 1, height: 15, ...layout }}
        >
            <Region
                name="total_text"
                layout={{ position: 'absolute', left: -3, width: 147, top: 1, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                {captionTotalText ?? t('catalog.bundlewidget.discount.total')}
            </Region>
            <Region
                name="total_currency_value_left"
                layout={{ position: 'absolute', left: 24, width: 39, top: -1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionTotalCurrencyValueLeft ?? '00000'}
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Icon
                variant="0"
                name="total_currency_icon_left"
                layout={{ position: 'absolute', left: 65, width: 14, top: 1, height: 14 }}
            />
            <Region
                name="striketrough_total_currency_left"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 25, width: 55, top: 7, height: 2 }}
            >
                {striketroughTotalCurrencyLeft}
            </Region>
            <Region
                name="total_currency_value_right"
                layout={{ position: 'absolute', left: 92, width: 38, top: -1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
            >
                <ThemeText
                    text={captionTotalCurrencyValueRight ?? '00000'}
                    textOptions={{ align: 'right' }}
                />
            </Region>
            <Icon
                variant="0"
                name="total_currency_icon_right"
                layout={{ position: 'absolute', left: 133, width: 14, top: 1, height: 14 }}
            />
            <Region
                name="striketrough_total_currency_right"
                backgroundColor="#000000"
                layout={{ position: 'absolute', left: 92, width: 55, top: 7, height: 2 }}
            >
                {striketroughTotalCurrencyRight}
            </Region>
        </Region>
    );
};
