import { useState } from 'react';

import { useCatalogStore } from '#base/context/catalog';
import { useSystemStore, useTranslation } from '#base/context/system';
import { TemplateWindow, ThemeImage } from '#base/theme';
import { getMarketplaceOfferTexts, isMarketplaceUniqueLimitedItem, MarketplaceOfferData, resolveMarketplaceStatsCategory } from '#base/utils';
import { LimitedItemPreviewOverlayView } from '#base/views/shared/LimitedItemPreviewOverlayView';
import { RarityItemGridOverlayView } from '#base/views/shared/RarityItemGridOverlayView';

import { CatalogMarketplaceOfferImageView } from './CatalogMarketplaceOfferImageView';
import { getMarketplaceChartTexture, isMarketplaceChartAvailable } from './marketplaceChart';

/** `chart_bitmap`'s size - what `MarketplaceChart.draw` is asked for. */
const CHART_WIDTH = 320;
const CHART_HEIGHT = 200;

/** `item_image`'s size, which the icon is centred in. */
const IMAGE_WIDTH = 66;
const IMAGE_HEIGHT = 62;

type ChartName = 'price_development' | 'trade_volume';

export interface CatalogMarketplaceOfferDetailsViewProps {
    offer: MarketplaceOfferData;
    safetyLocked: boolean;
    onBack: () => void;
    onBuy: () => void;
}

/**
 * `marketplace_offer_details` - the window `MarketPlaceCatalogWidget.showDetails` builds and adds to
 * the widget's container (`createWindow` + `addChild`) over the hidden main view: the offer's name
 * and description, its icon (with the extra data), the price (`offer_details.price`) and average
 * price (`offer_details.average_price`, the configuration's day count, " - " for no average) texts,
 * `buy` (disabled while safety locked), `back`, and the `price_development` / `trade_volume`
 * selector with its first button selected. A limited item shows the `unique_item_overlay_widget`
 * (`limited_item_overlay_preview`: its serial over the series size), an item with a rarity level
 * the `rarity_item_overlay_widget` (`rarity_item_overlay_grid`, as the layout names it, not the
 * preview widget); both are window-manager widgets, injected.
 *
 * `updateStats` fills the `chart_bitmap` (`MarketplaceChart.draw`, a code-drawn bitmap injected into
 * it), its `chart_title` (`offer_details.chart_title.<chart>` with the history's day count, or
 * `...not_available`) and the offer count once `MarketplaceItemStats` for this furni arrives, and
 * again when the selector changes. Until then the texts keep the layout's captions (`${lorem.title}`,
 * the offer count's own `%count%`) and the chart stays empty.
 */
export const CatalogMarketplaceOfferDetailsView = ({ offer, safetyLocked, onBack, onBuy }: CatalogMarketplaceOfferDetailsViewProps) => {
    const t = useTranslation();
    const wallItems = useSystemStore(x => x.wallItems);
    const averagePricePeriod = useCatalogStore(x => x.marketplaceAveragePricePeriod);
    const itemStats = useCatalogStore(x => x.marketplaceItemStats);
    // `showDetails` selects the selector's first button.
    const [ chart, setChart ] = useState<ChartName>('price_development');
    const { name, description } = getMarketplaceOfferTexts(offer, wallItems, t);

    // `set itemStats` keeps only the stats of the furni last asked about; those are this offer's.
    const stats = (itemStats && (itemStats.furniCategoryId === resolveMarketplaceStatsCategory(offer)) && (itemStats.furniTypeId === offer.furniId)) ? itemStats : undefined;
    const chartValues = stats ? ((chart === 'price_development') ? stats.averagePrices : stats.soldAmounts) : undefined;
    const chartTexture = (stats && chartValues) ? getMarketplaceChartTexture(CHART_WIDTH, CHART_HEIGHT, stats.dayOffsets, chartValues) : undefined;

    let chartTitle: string | undefined = undefined;

    if (stats) chartTitle = isMarketplaceChartAvailable(stats.dayOffsets) ? t(`catalog.marketplace.offer_details.chart_title.${chart}`, '', { days: String(stats.historyLength) }) : t('catalog.marketplace.offer_details.chart_title.not_available');

    const rarityLevel = offer.stuffData?.rarityLevel ?? -1;
    const isLimited = isMarketplaceUniqueLimitedItem(offer) && !!offer.stuffData;

    return (
        <TemplateWindow
            id="habbo-catalog-com/marketplace_offer_details"
            bindings={{
                back_button: { onPointerTap: onBack },
                buy_button: { disabled: safetyLocked, onPointerTap: onBuy },
                item_name: { caption: name },
                item_description: { caption: description },
                item_image: {
                    children: (
                        <CatalogMarketplaceOfferImageView
                            offer={offer}
                            withExtraData
                            width={IMAGE_WIDTH}
                            height={IMAGE_HEIGHT}
                        />
                    ),
                },
                unique_item_overlay_widget: isLimited
                    ? {
                            visible: true,
                            children: (
                                <LimitedItemPreviewOverlayView
                                    serialNumber={offer.stuffData?.uniqueNumber ?? 0}
                                    seriesSize={offer.stuffData?.uniqueSeries ?? 0}
                                />
                            ),
                        }
                    : { visible: false },
                rarity_item_overlay_widget: (rarityLevel >= 0)
                    ? { visible: true, children: <RarityItemGridOverlayView rarityLevel={rarityLevel} /> }
                    : { visible: false },
                item_price: { caption: t('catalog.marketplace.offer_details.price', '', { price: String(offer.price) }) },
                average_price: { caption: t('catalog.marketplace.offer_details.average_price', '', { days: String(averagePricePeriod), average: (offer.averagePrice === 0) ? ' - ' : String(offer.averagePrice) }) },
                offer_count: { caption: stats ? t('catalog.marketplace.offer_details.offer_count', '', { count: String(stats.offerCount) }) : undefined },
                price_development: { selected: chart === 'price_development', onPointerTap: () => setChart('price_development') },
                trade_volume: { selected: chart === 'trade_volume', onPointerTap: () => setChart('trade_volume') },
                chart_title: { caption: chartTitle },
                chart_bitmap: {
                    children: chartTexture && (
                        <ThemeImage
                            texture={chartTexture}
                            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
                            layout={{ position: 'absolute', left: 0, width: CHART_WIDTH, top: 0, height: CHART_HEIGHT }}
                        />
                    ),
                },
            }}
        />
    );
};
