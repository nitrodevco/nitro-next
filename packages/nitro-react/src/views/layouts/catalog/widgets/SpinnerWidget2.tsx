import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags, layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `spinnerWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `quantitySelection` of SpinnerWidget2 - configured through the parent's `quantitySelection` prop. */
export interface SpinnerWidget2QuantitySelectionProps {
    captionPromoInfo?: string;
    captionQuantityLabel?: string;
    layout?: BoxLayout;
    srcThumbStar?: string;
    visibleDiscountContainer?: boolean;
}

export const SpinnerWidget2QuantitySelection = ({ captionPromoInfo, captionQuantityLabel, layout, srcThumbStar, visibleDiscountContainer }: SpinnerWidget2QuantitySelectionProps) => {
    const t = useTranslation();
    const [ textValueValue, setTextValueValue ] = useState('');

    return (
        <Region
            name="quantitySelection"
            layout={{ position: 'absolute', left: 0, width: 200, top: 0, height: 25, ...layout }}
        >
            <Region
                name="quantityLabel"
                layout={{ position: 'absolute', left: 0, width: 100, top: 3, height: 17, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionQuantityLabel ?? t('catalog.bundlewidget.quantity')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleDiscountContainer ?? false}
                layout={{ position: 'absolute', left: 65, width: 135, top: 0, height: 25 }}
            >
                <Border
                    variant="3"
                    name="discountContainer"
                    tintColor="#92d27c"
                    layout={{ width: '100%', height: '100%' }}
                >
                    <ThemeImage
                        name="thumbStar"
                        src={srcThumbStar ?? layoutImage('catalogue_bundle_star.png')}
                        layout={{ position: 'absolute', left: 108, width: 30, top: -2, height: 30 }}
                    />
                    <Region
                        name="promo.info"
                        layout={{ position: 'absolute', left: 28, width: 82, top: 5, height: 15, maxWidth: 82, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                    >
                        <ThemeText text={captionPromoInfo ?? t('shop.bonus.items.count')} />
                    </Region>
                </Border>
            </Region>
            <Border
                variant="0"
                name="quantityInput"
                layout={{ position: 'absolute', left: 65, width: 30, top: 0, height: 25 }}
            >
                <TextInput
                    value={textValueValue}
                    onChange={setTextValueValue}
                    layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                />
            </Border>
        </Region>
    );
};

/** Named region `spinnerWidget` of SpinnerWidget2 - configured through the parent's `spinnerWidget` prop. */
export interface SpinnerWidget2Props extends CatalogWidgetFlags {
    captionTextHeader?: string;
    layout?: BoxLayout;
    onButtonLess?: () => void;
    onButtonMore?: () => void;
    quantitySelection?: SpinnerWidget2QuantitySelectionProps;
    visibleButtonLess?: boolean;
    visibleButtonMore?: boolean;
}

export const SpinnerWidget2 = ({ captionTextHeader, layout, onButtonLess, onButtonMore, quantitySelection, visibleButtonLess, visibleButtonMore }: SpinnerWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="spinnerWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region
                name="text_header"
                visible={false}
                layout={{ position: 'absolute', left: 7, width: 100, top: 5, height: 15, maxWidth: 100, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionTextHeader ?? t('catalog.bundlewidget.spinner.select.amount')}
                    textOptions={{ fill: '#666666' }}
                />
            </Region>
            <Region
                visible={visibleButtonLess ?? false}
                layout={{ position: 'absolute', left: 139, width: 14, top: 13, height: 14 }}
            >
                <ContainerButton
                    variant="3"
                    name="button_less"
                    onPointerTap={onButtonLess}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Icon
                        variant="7"
                        name="icon_less"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 13, top: 4, height: 12 }}
                    />
                </ContainerButton>
            </Region>
            <Region
                visible={visibleButtonMore ?? false}
                layout={{ position: 'absolute', left: 139, width: 14, top: -1, height: 15 }}
            >
                <ContainerButton
                    variant="3"
                    name="button_more"
                    onPointerTap={onButtonMore}
                    layout={{ width: '100%', height: '100%' }}
                >
                    <Icon
                        variant="6"
                        name="icon_more"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 11, top: 4, height: 11 }}
                    />
                </ContainerButton>
            </Region>
            <SpinnerWidget2QuantitySelection {...quantitySelection} />
        </Region>
    );
};
