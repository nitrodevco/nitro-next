import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonGroupLeft, ButtonGroupRight, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Generated from `1628_marketplace_offer_details_xml` (layout "marketplace_offer_details", 340x460) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface MarketplaceOfferDetailsLayoutProps {
    detailsContainer?: MarketplaceOfferDetailsLayoutDetailsContainerProps;
    layout?: BoxLayout;
}

export const MarketplaceOfferDetailsLayout = ({ detailsContainer, layout }: MarketplaceOfferDetailsLayoutProps) => {
    return (
        <Region layout={{ position: 'relative', width: 340, height: 460, ...layout }}>
            <MarketplaceOfferDetailsLayoutDetailsContainer {...detailsContainer} />
        </Region>
    );
};

/** Named region `text_container` of MarketplaceOfferDetailsLayout - configured through the parent's `textContainer` prop. */
export interface MarketplaceOfferDetailsLayoutTextContainerProps {
    captionAveragePrice?: string;
    captionItemDescription?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionOfferCount?: string;
    layout?: BoxLayout;
}

export const MarketplaceOfferDetailsLayoutTextContainer = ({ captionAveragePrice, captionItemDescription, captionItemName, captionItemPrice, captionOfferCount, layout }: MarketplaceOfferDetailsLayoutTextContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="text_container"
            layout={{ position: 'absolute', left: 73, width: 267, top: 28, height: 80, ...layout }}
        >
            <Region
                name="item_name"
                layout={{ position: 'absolute', left: 0, width: 74, top: 5, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                />
            </Region>
            <Region
                name="item_description"
                layout={{ position: 'absolute', left: 0, width: 73, top: 18, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemDescription ?? t('lorem.title')}
                    textStyle="text-style-u-italic"
                />
            </Region>
            <Region
                name="item_price"
                layout={{ position: 'absolute', left: 0, width: 186, top: 41, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionItemPrice ?? t('catalog.marketplace.offer_details.price')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="offer_count"
                layout={{ position: 'absolute', left: 0, width: 216, top: 54, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionOfferCount ?? t('catalog.marketplace.offer_details.offer_count')}
                    textStyle="text-style-u-small"
                />
            </Region>
            <Region
                name="average_price"
                layout={{ position: 'absolute', left: 0, width: 228, top: 67, height: 15, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText
                    text={captionAveragePrice ?? t('catalog.marketplace.offer_details.average_price')}
                    textStyle="text-style-u-small"
                />
            </Region>
        </Region>
    );
};

/** Named region `chart_selector` of MarketplaceOfferDetailsLayout - configured through the parent's `chartSelector` prop. */
export interface MarketplaceOfferDetailsLayoutChartSelectorProps {
    layout?: BoxLayout;
    onPriceDevelopment?: () => void;
    onTradeVolume?: () => void;
}

export const MarketplaceOfferDetailsLayoutChartSelector = ({ layout, onPriceDevelopment, onTradeVolume }: MarketplaceOfferDetailsLayoutChartSelectorProps) => {
    const t = useTranslation();

    return (
        <Region
            name="chart_selector"
            layout={{ position: 'absolute', left: 0, width: 340, top: 116, height: 34, ...layout }}
        >
            <ButtonGroupLeft
                variant="3"
                name="price_development"
                onPointerTap={onPriceDevelopment}
                layout={{ position: 'absolute', left: 0, width: 160, top: 0, height: 22, minWidth: 160, maxWidth: 160 }}
            >
                {t('catalog.marketplace.offer_details.price_development')}
            </ButtonGroupLeft>
            <ButtonGroupRight
                variant="3"
                name="trade_volume"
                onPointerTap={onTradeVolume}
                layout={{ position: 'absolute', left: 160, width: 160, top: 0, height: 22, minWidth: 160, maxWidth: 160 }}
            >
                {t('catalog.marketplace.offer_details.trade_volume')}
            </ButtonGroupRight>
        </Region>
    );
};

/** Named region `details_container` of MarketplaceOfferDetailsLayout - configured through the parent's `detailsContainer` prop. */
export interface MarketplaceOfferDetailsLayoutDetailsContainerProps {
    captionChartTitle?: string;
    chartSelector?: MarketplaceOfferDetailsLayoutChartSelectorProps;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onBuyButton?: () => void;
    srcChartBitmap?: string;
    srcItemImage?: string;
    textContainer?: MarketplaceOfferDetailsLayoutTextContainerProps;
}

export const MarketplaceOfferDetailsLayoutDetailsContainer = ({ captionChartTitle, chartSelector, layout, onBackButton, onBuyButton, srcChartBitmap, srcItemImage, textContainer }: MarketplaceOfferDetailsLayoutDetailsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="details_container"
            layout={{ position: 'absolute', left: 0, width: 340, top: 0, height: 460, ...layout }}
        >
            <Button
                variant="3"
                name="back_button"
                onPointerTap={onBackButton}
                layout={{ position: 'absolute', left: 0, width: 235, top: 0, height: 22 }}
            >
                {t('catalog.marketplace.offer_details.back')}
            </Button>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 66, top: 32, height: 62 }}
            >
                <ThemeImage
                    name="item_image"
                    src={srcItemImage}
                    layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 62 }}
                />
            </Border>
            <WidgetSlot
                widgetType="limited_item_overlay_preview"
                name="unique_item_overlay_widget"
                visible={false}
                layout={{ position: 'absolute', left: 34, width: 40, top: 30, height: 40 }}
            />
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                layout={{ position: 'absolute', left: 16, width: 40, top: 48, height: 40 }}
            />
            <MarketplaceOfferDetailsLayoutTextContainer {...textContainer} />
            <Button
                variant="3"
                name="buy_button"
                onPointerTap={onBuyButton}
                layout={{ position: 'absolute', right: 10, width: 39, top: 35, height: 22 }}
            >
                {t('buy')}
            </Button>
            <MarketplaceOfferDetailsLayoutChartSelector {...chartSelector} />
            <Region
                name="chart_title"
                layout={{ position: 'absolute', left: 0, width: 76, top: 145, height: 17, flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-start' }}
            >
                <ThemeText text={captionChartTitle ?? t('lorem.title')} />
            </Region>
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, width: 340, top: 165, height: 220 }}
            >
                <ThemeImage
                    name="chart_bitmap"
                    src={srcChartBitmap}
                    layout={{ position: 'absolute', left: 10, width: 320, top: 10, height: 200 }}
                />
            </Border>
        </Region>
    );
};
