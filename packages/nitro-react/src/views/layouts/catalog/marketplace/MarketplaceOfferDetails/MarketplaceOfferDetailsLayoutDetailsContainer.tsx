import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, ButtonGroupLeft, ButtonGroupRight, Region, ThemeImage, ThemeText, WidgetSlot } from '#base/theme';

/** Named region `details_container` of MarketplaceOfferDetailsLayout - configured through the parent's `detailsContainer` prop. */
export interface MarketplaceOfferDetailsLayoutDetailsContainerProps {
    captionAveragePrice?: string;
    captionChartTitle?: string;
    captionItemDescription?: string;
    captionItemName?: string;
    captionItemPrice?: string;
    captionOfferCount?: string;
    layout?: BoxLayout;
    onBackButton?: () => void;
    onBuyButton?: () => void;
    onPriceDevelopment?: () => void;
    onTradeVolume?: () => void;
    rarityItemOverlayWidget?: ReactNode;
    srcChartBitmap?: string;
    srcItemImage?: string;
    tintChartBitmap?: string;
    tintItemImage?: string;
    uniqueItemOverlayWidget?: ReactNode;
    visibleUniqueItemOverlayWidget?: boolean;
}

export const MarketplaceOfferDetailsLayoutDetailsContainer = ({ captionAveragePrice, captionChartTitle, captionItemDescription, captionItemName, captionItemPrice, captionOfferCount, layout, onBackButton, onBuyButton, onPriceDevelopment, onTradeVolume, rarityItemOverlayWidget, srcChartBitmap, srcItemImage, tintChartBitmap, tintItemImage, uniqueItemOverlayWidget, visibleUniqueItemOverlayWidget }: MarketplaceOfferDetailsLayoutDetailsContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="details_container"
            layout={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0, ...layout }}
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
                    tint={tintItemImage}
                    layout={{ position: 'absolute', left: 0, width: 66, top: 0, height: 62 }}
                />
            </Border>
            {(visibleUniqueItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_item_overlay_widget"
                    layout={{ position: 'absolute', left: 34, width: 40, top: 30, height: 40 }}
                >
                    {uniqueItemOverlayWidget}
                </WidgetSlot>
            )}
            <WidgetSlot
                widgetType="rarity_item_overlay_grid"
                name="rarity_item_overlay_widget"
                layout={{ position: 'absolute', left: 16, width: 40, top: 48, height: 40 }}
            >
                {rarityItemOverlayWidget}
            </WidgetSlot>
            <Region
                name="text_container"
                layout={{ position: 'absolute', right: 0, width: 267, top: 28, height: 80 }}
            >
                <ThemeText
                    text={captionItemName ?? t('lorem.title')}
                    textStyle="text-style-u-bold"
                    name="item_name"
                    layout={{ position: 'absolute', left: 0, width: 74, top: 5, height: 17 }}
                />
                <ThemeText
                    text={captionItemDescription ?? t('lorem.title')}
                    textStyle="text-style-u-italic"
                    name="item_description"
                    layout={{ position: 'absolute', left: 0, width: 73, top: 18, height: 17 }}
                />
                <ThemeText
                    text={captionItemPrice ?? t('catalog.marketplace.offer_details.price')}
                    textStyle="text-style-u-small"
                    name="item_price"
                    layout={{ position: 'absolute', left: 0, width: 186, top: 41, height: 15 }}
                />
                <ThemeText
                    text={captionOfferCount ?? t('catalog.marketplace.offer_details.offer_count')}
                    textStyle="text-style-u-small"
                    name="offer_count"
                    layout={{ position: 'absolute', left: 0, width: 216, bottom: 11, height: 15 }}
                />
                <ThemeText
                    text={captionAveragePrice ?? t('catalog.marketplace.offer_details.average_price')}
                    textStyle="text-style-u-small"
                    name="average_price"
                    layout={{ position: 'absolute', left: 0, width: 228, bottom: -2, height: 15 }}
                />
            </Region>
            <Button
                variant="3"
                name="buy_button"
                onPointerTap={onBuyButton}
                layout={{ position: 'absolute', right: 10, width: 39, top: 35, height: 22 }}
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
                    onPointerTap={onPriceDevelopment}
                    layout={{ position: 'absolute', left: 0, width: 160, top: 0, bottom: 12, minWidth: 160, maxWidth: 160 }}
                >
                    {t('catalog.marketplace.offer_details.price_development')}
                </ButtonGroupLeft>
                <ButtonGroupRight
                    variant="3"
                    name="trade_volume"
                    onPointerTap={onTradeVolume}
                    layout={{ position: 'absolute', left: 160, width: 160, top: 0, bottom: 12, minWidth: 160, maxWidth: 160 }}
                >
                    {t('catalog.marketplace.offer_details.trade_volume')}
                </ButtonGroupRight>
            </Region>
            <ThemeText
                text={captionChartTitle ?? t('lorem.title')}
                name="chart_title"
                layout={{ position: 'absolute', left: 0, width: 76, top: 145, height: 17 }}
            />
            <Border
                variant="0"
                layout={{ position: 'absolute', left: 0, right: 0, top: 165, height: 220 }}
            >
                <ThemeImage
                    name="chart_bitmap"
                    src={srcChartBitmap}
                    tint={tintChartBitmap}
                    layout={{ position: 'absolute', left: 10, width: 320, top: 10, height: 200 }}
                />
            </Border>
        </Region>
    );
};
