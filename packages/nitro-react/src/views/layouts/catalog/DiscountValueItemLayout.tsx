import { useTranslation } from '#base/context';
import { BoxLayout, Icon, Region, ThemeImage, ThemeText } from '#base/theme';

/** Generated from `1552_discountValueItem_xml` (layout "discountValueItem", 180x37) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface DiscountValueItemLayoutProps {
    discountValueContainer?: DiscountValueItemLayoutDiscountValueContainerProps;
    layout?: BoxLayout;
}

export const DiscountValueItemLayout = ({ discountValueContainer, layout }: DiscountValueItemLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 180, height: 37, ...layout }}>
            <DiscountValueItemLayoutDiscountValueContainer {...discountValueContainer} />
        </Region>
    );
};

/** Named region `total_value_container` of DiscountValueItemLayout - configured through the parent's `totalValueContainer` prop. */
export interface DiscountValueItemLayoutTotalValueContainerProps {
    captionTotalCurrencyValueLeft?: string;
    captionTotalCurrencyValueRight?: string;
    captionTotalText?: string;
    layout?: BoxLayout;
}

export const DiscountValueItemLayoutTotalValueContainer = ({ captionTotalCurrencyValueLeft, captionTotalCurrencyValueRight, captionTotalText, layout }: DiscountValueItemLayoutTotalValueContainerProps) => {
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
                <ThemeText text={captionTotalText ?? t('catalog.bundlewidget.discount.total')} />
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
            />
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
            />
        </Region>
    );
};

/** Named region `discount_value_container` of DiscountValueItemLayout - configured through the parent's `discountValueContainer` prop. */
export interface DiscountValueItemLayoutDiscountValueContainerProps {
    captionDiscountCurrencyValueLeft?: string;
    captionDiscountCurrencyValueRight?: string;
    captionDiscountText?: string;
    layout?: BoxLayout;
    srcIconBitmap?: string;
    srcIconSplashBitmap?: string;
    totalValueContainer?: DiscountValueItemLayoutTotalValueContainerProps;
}

export const DiscountValueItemLayoutDiscountValueContainer = ({ captionDiscountCurrencyValueLeft, captionDiscountCurrencyValueRight, captionDiscountText, layout, srcIconBitmap, srcIconSplashBitmap, totalValueContainer }: DiscountValueItemLayoutDiscountValueContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="discount_value_container"
            layout={{ position: 'absolute', left: 0, width: 180, top: 0, height: 37, minHeight: 37, maxHeight: 37, ...layout }}
        >
            <Region
                name="total_value_backgroundbackground"
                backgroundColor="#737373"
                layout={{ position: 'absolute', left: 0, right: 0, top: 1, height: 15 }}
            />
            <Region
                name="discount_value_backgroundbackground"
                backgroundColor="#009100"
                layout={{ position: 'absolute', left: 0, right: 0, top: 17, height: 15 }}
            />
            <Region
                name="header_container"
                layout={{ position: 'absolute', right: 152, width: 28, top: 2, height: 31 }}
            >
                <ThemeImage
                    name="icon_splash_bitmap"
                    src={srcIconSplashBitmap}
                    layout={{ position: 'absolute', left: -12, width: 40, top: -4, height: 40 }}
                />
                <ThemeImage
                    name="icon_bitmap"
                    src={srcIconBitmap}
                    layout={{ position: 'absolute', left: 1, width: 14, top: 6, height: 14 }}
                />
            </Region>
            <DiscountValueItemLayoutTotalValueContainer {...totalValueContainer} />
            <Region
                name="discount_value_container"
                layout={{ position: 'absolute', right: -3, width: 155, top: 17, height: 15 }}
            >
                <Region
                    name="discount_text"
                    layout={{ position: 'absolute', left: -3, width: 147, top: 1, height: 14, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionDiscountText ?? t('catalog.bundlewidget.discount.save')}
                        textOptions={{ fill: '#ffffff' }}
                    />
                </Region>
                <Region
                    name="discount_currency_value_left"
                    layout={{ position: 'absolute', left: 24, width: 39, top: -1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionDiscountCurrencyValueLeft ?? '00000'}
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
                <Icon
                    variant="0"
                    name="discount_currency_icon_left"
                    layout={{ position: 'absolute', left: 65, width: 14, top: 1, height: 14 }}
                />
                <Region
                    name="discount_currency_value_right"
                    layout={{ position: 'absolute', left: 92, width: 38, top: -1, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end' }}
                >
                    <ThemeText
                        text={captionDiscountCurrencyValueRight ?? '00000'}
                        textOptions={{ fill: '#ffffff', align: 'right' }}
                    />
                </Region>
                <Icon
                    variant="0"
                    name="discount_currency_icon_right"
                    layout={{ position: 'absolute', left: 133, width: 14, top: 1, height: 14 }}
                />
            </Region>
        </Region>
    );
};
