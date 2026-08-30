import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

import { DiscountValueItemLayoutTotalValueContainer, DiscountValueItemLayoutTotalValueContainerProps } from './DiscountValueItemLayoutTotalValueContainer';

/** Named region `discount_value_container` of DiscountValueItemLayout - configured through the parent's `discountValueContainer` prop. */
export interface DiscountValueItemLayoutDiscountValueContainerProps {
    captionDiscountCurrencyValueLeft?: string;
    captionDiscountCurrencyValueRight?: string;
    captionDiscountText?: string;
    discountValueBackgroundbackground?: ReactNode;
    layout?: BoxLayout;
    srcIconBitmap?: string;
    srcIconSplashBitmap?: string;
    tintIconBitmap?: string;
    tintIconSplashBitmap?: string;
    totalValueBackgroundbackground?: ReactNode;
    totalValueContainer?: DiscountValueItemLayoutTotalValueContainerProps;
}

export const DiscountValueItemLayoutDiscountValueContainer = ({ captionDiscountCurrencyValueLeft, captionDiscountCurrencyValueRight, captionDiscountText, discountValueBackgroundbackground, layout, srcIconBitmap, srcIconSplashBitmap, tintIconBitmap, tintIconSplashBitmap, totalValueBackgroundbackground, totalValueContainer }: DiscountValueItemLayoutDiscountValueContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="discount_value_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, minHeight: 37, maxHeight: 37, ...layout }}
        >
            <Region
                name="total_value_backgroundbackground"
                backgroundColor="#737373"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15 }}
            >
                {totalValueBackgroundbackground}
            </Region>
            <Region
                name="discount_value_backgroundbackground"
                backgroundColor="#009100"
                layout={{ position: 'absolute', left: 0, right: 0, top: 17, height: 15 }}
            >
                {discountValueBackgroundbackground}
            </Region>
            <Region
                name="header_container"
                layout={{ position: 'absolute', right: 152, width: 28, top: 2, height: 31 }}
            >
                <ThemeImage
                    name="icon_splash_bitmap"
                    src={srcIconSplashBitmap}
                    tint={tintIconSplashBitmap}
                    layout={{ position: 'absolute', left: -12, width: 40, top: -4, height: 40 }}
                />
                <ThemeImage
                    name="icon_bitmap"
                    src={srcIconBitmap}
                    tint={tintIconBitmap}
                    layout={{ position: 'absolute', left: 1, width: 14, top: 6, height: 14 }}
                />
            </Region>
            <DiscountValueItemLayoutTotalValueContainer {...totalValueContainer} />
            <Region
                name="discount_value_container"
                layout={{ position: 'absolute', right: -3, width: 155, top: 17, height: 15 }}
            >
                <ThemeText
                    text={captionDiscountText ?? t('catalog.bundlewidget.discount.save')}
                    textOptions={{ fill: '#ffffff' }}
                    name="discount_text"
                    layout={{ position: 'absolute', left: -3, width: 147, top: 1, height: 14 }}
                />
                <ThemeText
                    text={captionDiscountCurrencyValueLeft ?? '00000'}
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                    name="discount_currency_value_left"
                    layout={{ position: 'absolute', left: 24, width: 39, top: -1, height: 17 }}
                />
                <Icon
                    variant="0"
                    name="discount_currency_icon_left"
                    layout={{ position: 'absolute', left: 65, width: 14, top: 1, height: 14 }}
                />
                <ThemeText
                    text={captionDiscountCurrencyValueRight ?? '00000'}
                    textOptions={{ fill: '#ffffff', align: 'right' }}
                    name="discount_currency_value_right"
                    layout={{ position: 'absolute', left: 92, width: 38, top: -1, height: 17 }}
                />
                <Icon
                    variant="0"
                    name="discount_currency_icon_right"
                    layout={{ position: 'absolute', left: 133, width: 14, top: 1, height: 14 }}
                />
            </Region>
        </Region>
    );
};
