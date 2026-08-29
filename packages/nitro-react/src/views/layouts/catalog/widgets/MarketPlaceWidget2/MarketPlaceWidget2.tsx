import { useTranslation } from '#base/context';
import { Border, BoxLayout, ButtonGroupCenter, ButtonGroupLeft, ButtonGroupRight, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

import { MarketPlaceWidget2OfferList, MarketPlaceWidget2OfferListProps } from './MarketPlaceWidget2OfferList';

/**
 * Catalog widget `marketPlaceWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplace_1621Layout); each passes its own placement through `layout`.
 */
/** Named region `marketPlaceWidget` of MarketPlaceWidget2 - configured through the parent's `marketPlaceWidget` prop. */
export interface MarketPlaceWidget2Props extends CatalogWidgetFlags {
    captionStatusText?: string;
    layout?: BoxLayout;
    offerList?: MarketPlaceWidget2OfferListProps;
    onSearchAdvanced?: () => void;
    onSearchByActivity?: () => void;
    onSearchByValue?: () => void;
}

export const MarketPlaceWidget2 = ({ captionStatusText, layout, offerList, onSearchAdvanced, onSearchByActivity, onSearchByValue }: MarketPlaceWidget2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <Region layout={{ position: 'absolute', left: 0, width: 360, top: 0, bottom: 0 }}>
                <Region
                    name="search_selector"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 0, height: 25 }}
                >
                    <ButtonGroupLeft
                        variant="100"
                        name="search_by_activity"
                        onPointerTap={onSearchByActivity}
                        textStyle="text-style-il-button"
                        layout={{ position: 'absolute', left: 0, right: 253, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_by_activity')}
                    </ButtonGroupLeft>
                    <ButtonGroupCenter
                        variant="100"
                        name="search_by_value"
                        onPointerTap={onSearchByValue}
                        textStyle="text-style-il-button"
                        layout={{ position: 'absolute', left: 107, right: 147, top: 0, height: 25, minWidth: 106, maxWidth: 106 }}
                    >
                        {t('catalog.marketplace.search_by_value')}
                    </ButtonGroupCenter>
                    <ButtonGroupRight
                        variant="100"
                        name="search_advanced"
                        onPointerTap={onSearchAdvanced}
                        textStyle="text-style-il-button"
                        layout={{ position: 'absolute', left: 213, right: 40, top: 0, height: 25, minWidth: 107, maxWidth: 107 }}
                    >
                        {t('catalog.marketplace.search_advanced')}
                    </ButtonGroupRight>
                </Region>
                <Border
                    variant="100"
                    name="search_container"
                    tintColor="#efefef"
                    layout={{ position: 'absolute', left: 0, width: 360, top: 30, height: 120 }}
                />
                <Region
                    name="status_text"
                    layout={{ position: 'absolute', left: 2, width: 62, top: 155, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
                >
                    <ThemeText
                        text={captionStatusText ?? t('lorem.title')}
                        textStyle="text-style-u-small"
                    />
                </Region>
                <MarketPlaceWidget2OfferList {...offerList} />
            </Region>
        </Region>
    );
};
