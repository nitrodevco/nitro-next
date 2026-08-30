import { useState } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, ContainerButton, Icon, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { CatalogWidgetFlags, layoutImage } from '#base/views/layouts/layoutAssets';

/**
 * Catalog widget `spinnerWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutDefault_1595Layout); each passes its own placement through `layout`.
 */
/** Named region `spinnerWidget` of SpinnerWidget - configured through the parent's `spinnerWidget` prop. */
export interface SpinnerWidgetProps extends CatalogWidgetFlags {
    captionPromoInfo?: string;
    captionQuantityLabel?: string;
    captionTextHeader?: string;
    layout?: BoxLayout;
    onButtonLess?: () => void;
    onButtonMore?: () => void;
    srcThumbStar?: string;
    visibleButtonLess?: boolean;
    visibleButtonMore?: boolean;
    visibleDiscountContainer?: boolean;
    visibleTextHeader?: boolean;
}

export const SpinnerWidget = ({ captionPromoInfo, captionQuantityLabel, captionTextHeader, layout, onButtonLess, onButtonMore, srcThumbStar, visibleButtonLess, visibleButtonMore, visibleDiscountContainer, visibleTextHeader }: SpinnerWidgetProps) => {
    const t = useTranslation();
    const [ textValueValue, setTextValueValue ] = useState('');

    return (
        <Region
            name="spinnerWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            {(visibleTextHeader ?? false) && (
                <ThemeText
                    text={captionTextHeader ?? t('catalog.bundlewidget.spinner.select.amount')}
                    textOptions={{ fill: '#666666' }}
                    name="text_header"
                    layout={{ position: 'absolute', left: 7, width: 100, top: 5, height: 15, maxWidth: 100 }}
                />
            )}
            {(visibleButtonLess ?? false) && (
                <ContainerButton
                    variant="3"
                    name="button_less"
                    onPointerTap={onButtonLess}
                    layout={{ position: 'absolute', left: 139, width: 14, top: 13, height: 14 }}
                >
                    <Icon
                        variant="7"
                        name="icon_less"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 13, top: 4, height: 12 }}
                    />
                </ContainerButton>
            )}
            {(visibleButtonMore ?? false) && (
                <ContainerButton
                    variant="3"
                    name="button_more"
                    onPointerTap={onButtonMore}
                    layout={{ position: 'absolute', left: 139, width: 14, top: -1, height: 15 }}
                >
                    <Icon
                        variant="6"
                        name="icon_more"
                        tintColor="#000000"
                        layout={{ position: 'absolute', left: 2, width: 11, top: 4, height: 11 }}
                    />
                </ContainerButton>
            )}
            <Region
                name="quantitySelection"
                layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
            >
                <ThemeText
                    text={captionQuantityLabel ?? t('catalog.bundlewidget.quantity')}
                    textOptions={{ fill: '#666666' }}
                    name="quantityLabel"
                    layout={{ position: 'absolute', left: 0, width: 100, top: 3, height: 17, maxWidth: 100 }}
                />
                {(visibleDiscountContainer ?? false) && (
                    <Border
                        variant="3"
                        name="discountContainer"
                        tintColor="#92d27c"
                        layout={{ position: 'absolute', left: 65, width: 135, top: 0, bottom: 0 }}
                    >
                        <ThemeImage
                            name="thumbStar"
                            src={srcThumbStar ?? layoutImage('catalogue_bundle_star.png')}
                            layout={{ position: 'absolute', left: 108, width: 30, top: -2, height: 30 }}
                        />
                        <ThemeText
                            text={captionPromoInfo ?? t('shop.bonus.items.count')}
                            name="promo.info"
                            layout={{ position: 'absolute', left: 28, width: 82, top: 5, height: 15, maxWidth: 82 }}
                        />
                    </Border>
                )}
                <Border
                    variant="0"
                    name="quantityInput"
                    layout={{ position: 'absolute', left: 65, width: 30, top: 0, bottom: 0 }}
                >
                    <TextInput
                        value={textValueValue}
                        onChange={setTextValueValue}
                        layout={{ position: 'absolute', left: 3, width: 22, top: 5, height: 15 }}
                    />
                </Border>
            </Region>
        </Region>
    );
};
