import { useState } from 'react';

import { useCatalogStore } from '#base/context/catalog';
import { useSystemStore, useTranslation } from '#base/context/system';
import { Border, Button, ButtonGroupLeft, ButtonGroupRight, Region, ThemeImage, ThemeText } from '#base/theme';
import { getMarketplaceOfferTexts, isMarketplaceUniqueLimitedItem, MarketplaceOfferData, resolveMarketplaceStatsCategory } from '#base/utils';
import { UniqueItemPlaqueView } from '#base/views/room-widgets/object-infostand/UniqueItemPlaqueView';

import { CatalogRarityItemGridOverlayView } from '../page/widgets/CatalogRarityItemGridOverlayView';
import { getMarketplaceChartTexture, isMarketplaceChartAvailable } from './marketplaceChart';
import { getMarketplaceOfferIconUrl } from './marketplaceOfferIcon';

/** `chart_bitmap`'s size - what `MarketplaceChart.draw` is asked for. */
const CHART_WIDTH = 320;
const CHART_HEIGHT = 200;

type ChartName = 'price_development' | 'trade_volume';

export interface CatalogMarketplaceOfferDetailsViewProps {
    offer: MarketplaceOfferData;
    safetyLocked: boolean;
    onBack: () => void;
    onBuy: () => void;
}

/**
 * `marketplace_offer_details` (340x460) - `MarketPlaceCatalogWidget.showDetails`, drawn over the
 * widget in place of its main container: `back` (235x22), the icon centred in a 66x62 style 0
 * border, the name, description, price (`offer_details.price`), offer count and average price
 * (`offer_details.average_price`, the configuration's day count, " - " for no average) texts,
 * `buy` (disabled while safety locked), the `price_development` / `trade_volume` chart selector,
 * the `chart_title` and the 320x200 `chart_bitmap` in a style 0 border.
 *
 * `updateStats` fills the chart, its title (`offer_details.chart_title.<chart>` with the history's
 * day count, or `...not_available`) and the offer count once `MarketplaceItemStats` for this furni
 * arrives, and again when the selector changes. Flash's texts keep whatever parameter was last
 * registered until then - here the offer count shows the stats' count once they are in and the
 * text's own `%count%` before, the title `${lorem.title}` (the layout's caption) before, and the
 * chart stays empty.
 *
 * A limited item gets the `unique_item_overlay_widget` (`limited_item_overlay_preview`: its serial
 * over the series size) at 34,30, and an item with a rarity level the `rarity_item_overlay_widget`
 * (`rarity_item_overlay_grid`) at 16,48 (`MarketPlaceCatalogWidget.showOfferDetails`).
 */
export const CatalogMarketplaceOfferDetailsView = ({ offer, safetyLocked, onBack, onBuy }: CatalogMarketplaceOfferDetailsViewProps) => {
    const t = useTranslation();
    const wallItems = useSystemStore(x => x.wallItems);
    const averagePricePeriod = useCatalogStore(x => x.marketplaceAveragePricePeriod);
    const itemStats = useCatalogStore(x => x.marketplaceItemStats);
    // `showDetails` selects the selector's first button.
    const [ chart, setChart ] = useState<ChartName>('price_development');
    const { name, description } = getMarketplaceOfferTexts(offer, wallItems, t);
    const iconUrl = getMarketplaceOfferIconUrl(offer, true);

    // `set itemStats` keeps only the stats of the furni last asked about; those are this offer's.
    const stats = (itemStats && (itemStats.furniCategoryId === resolveMarketplaceStatsCategory(offer)) && (itemStats.furniTypeId === offer.furniId)) ? itemStats : undefined;
    const chartValues = stats ? ((chart === 'price_development') ? stats.averagePrices : stats.soldAmounts) : undefined;
    const chartTexture = (stats && chartValues) ? getMarketplaceChartTexture(CHART_WIDTH, CHART_HEIGHT, stats.dayOffsets, chartValues) : undefined;

    let chartTitle = t('lorem.title');

    if (stats) chartTitle = isMarketplaceChartAvailable(stats.dayOffsets) ? t(`catalog.marketplace.offer_details.chart_title.${chart}`, '', { days: String(stats.historyLength) }) : t('catalog.marketplace.offer_details.chart_title.not_available');

    const offerCountText = stats ? t('catalog.marketplace.offer_details.offer_count', '', { count: String(stats.offerCount) }) : t('catalog.marketplace.offer_details.offer_count');

    return (
        <Region
            name="details_container"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 460 }}
        >
            <Button
                variant="3"
                name="back_button"
                onPointerTap={onBack}
                layout={{ position: 'absolute', left: 0, width: 235, top: 0, height: 22 }}
            >
                {t('catalog.marketplace.offer_details.back')}
            </Button>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 66, top: 32, height: 62 }}
            >
                {(iconUrl !== '') && (
                    <ThemeImage
                        name="item_image"
                        src={iconUrl}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 62 }}
                    />
                )}
            </Border>
            {isMarketplaceUniqueLimitedItem(offer) && offer.stuffData && (
                <UniqueItemPlaqueView
                    serialNumber={offer.stuffData.uniqueNumber}
                    seriesSize={offer.stuffData.uniqueSeries}
                    layout={{ left: 34, top: 30 }}
                />
            )}
            {offer.stuffData && (offer.stuffData.rarityLevel >= 0) && (
                <Region
                    name="rarity_item_overlay_widget"
                    layout={{ position: 'absolute', left: 16, width: 40, top: 48, height: 40 }}
                >
                    <CatalogRarityItemGridOverlayView rarityLevel={offer.stuffData.rarityLevel} />
                </Region>
            )}
            <Region
                name="text_container"
                layout={{ position: 'absolute', left: 73, width: 267, top: 28, height: 80 }}
            >
                <ThemeText
                    name="item_name"
                    text={name}
                    textStyle="u_bold"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 5 }}
                />
                <ThemeText
                    name="item_description"
                    text={description}
                    textStyle="u_italic"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 18 }}
                />
                <ThemeText
                    name="item_price"
                    text={t('catalog.marketplace.offer_details.price', '', { price: String(offer.price) })}
                    textStyle="u_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 41 }}
                />
                <ThemeText
                    name="offer_count"
                    text={offerCountText}
                    textStyle="u_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 54 }}
                />
                <ThemeText
                    name="average_price"
                    text={t('catalog.marketplace.offer_details.average_price', '', { days: String(averagePricePeriod), average: (offer.averagePrice === 0) ? ' - ' : String(offer.averagePrice) })}
                    textStyle="u_small"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 67 }}
                />
            </Region>
            <Button
                variant="3"
                name="buy_button"
                disabled={safetyLocked}
                onPointerTap={onBuy}
                layout={{ position: 'absolute', left: 291, width: 39, top: 35, height: 22 }}
            >
                {t('buy')}
            </Button>
            <Region
                name="chart_selector"
                layout={{ position: 'absolute', left: 0, width: 340, top: 116, height: 34 }}
            >
                <ButtonGroupLeft
                    variant="3"
                    name="price_development"
                    selected={chart === 'price_development'}
                    onPointerTap={() => setChart('price_development')}
                    layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 22 }}
                >
                    {t('catalog.marketplace.offer_details.price_development')}
                </ButtonGroupLeft>
                <ButtonGroupRight
                    variant="3"
                    name="trade_volume"
                    selected={chart === 'trade_volume'}
                    onPointerTap={() => setChart('trade_volume')}
                    layout={{ position: 'absolute', left: 160, width: 160, top: 0, height: 22 }}
                >
                    {t('catalog.marketplace.offer_details.trade_volume')}
                </ButtonGroupRight>
            </Region>
            <ThemeText
                name="chart_title"
                text={chartTitle}
                textStyle="u_regular"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, top: 145 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 340, top: 165, height: 220 }}
            >
                {chartTexture && (
                    <ThemeImage
                        name="chart_bitmap"
                        texture={chartTexture}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                        layout={{ position: 'absolute', left: 10, width: CHART_WIDTH, top: 10, height: CHART_HEIGHT }}
                    />
                )}
            </Border>
        </Region>
    );
};
