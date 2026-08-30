import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, ThemeText } from '#base/theme';
import { CatalogWidgetFlags } from '#base/views/layouts/layoutAssets';

import { MarketPlaceOwnItemsWidgetItemList, MarketPlaceOwnItemsWidgetItemListProps } from './MarketPlaceOwnItemsWidgetItemList';
import { MarketPlaceOwnItemsWidgetSearchContainer, MarketPlaceOwnItemsWidgetSearchContainerProps } from './MarketPlaceOwnItemsWidgetSearchContainer';

/**
 * Catalog widget `marketPlaceOwnItemsWidget` (see CatalogWidgetEnum.as / the matching *CatalogWidget.as) - the page
 * layout reserves a container by that name and the client attaches the widget to it. Shared by 1 page
 * (LayoutMarketplaceOwnItems_1575Layout); each passes its own placement through `layout`.
 */
/** Named region `marketPlaceOwnItemsWidget` of MarketPlaceOwnItemsWidget - configured through the parent's `marketPlaceOwnItemsWidget` prop. */
export interface MarketPlaceOwnItemsWidgetProps extends CatalogWidgetFlags {
    captionRedeemInfo?: string;
    captionStatusText?: string;
    itemList?: MarketPlaceOwnItemsWidgetItemListProps;
    layout?: BoxLayout;
    onMarkAsSeenButton?: () => void;
    onRecallAllButton?: () => void;
    searchContainer?: MarketPlaceOwnItemsWidgetSearchContainerProps;
    visibleMarkAsSeenButton?: boolean;
}

export const MarketPlaceOwnItemsWidget = ({ captionRedeemInfo, captionStatusText, itemList, layout, onMarkAsSeenButton, onRecallAllButton, searchContainer, visibleMarkAsSeenButton }: MarketPlaceOwnItemsWidgetProps) => {
    const t = useTranslation();

    return (
        <Region
            name="marketPlaceOwnItemsWidget"
            layout={{ position: 'absolute', ...layout }}
        >
            <ThemeText
                text={captionRedeemInfo ?? t('catalog.marketplace.own_info')}
                textStyle="text-style-u-italic"
                textOptions={{ wordWrap: true, wordWrapWidth: 340 }}
                name="redeem_info"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 10, width: 340, top: 0, height: 57, minWidth: 340, maxWidth: 340 }}
            />
            <MarketPlaceOwnItemsWidgetSearchContainer {...searchContainer} />
            <ThemeText
                text={captionStatusText ?? t('lorem.title')}
                textStyle="text-style-u-small"
                name="status_text"
                layout={{ position: 'absolute', left: 0, width: 62, bottom: 5, height: 15 }}
            />
            <Button
                variant="3"
                name="recall_all_button"
                tintColor="#e33934"
                onPointerTap={onRecallAllButton}
                textStyle="text-style-il-regular-white"
                layout={{ position: 'absolute', right: 21, width: 64, bottom: 2, height: 24 }}
            >
                {t('shop.marketplace.recall.all.button')}
            </Button>
            {(visibleMarkAsSeenButton ?? false) && (
                <Button
                    variant="3"
                    name="mark_as_seen_button"
                    onPointerTap={onMarkAsSeenButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 21, width: 90, bottom: 2, height: 24 }}
                >
                    {t('shop.marketplace.mark.as.seen.button')}
                </Button>
            )}
            <MarketPlaceOwnItemsWidgetItemList {...itemList} />
        </Region>
    );
};
