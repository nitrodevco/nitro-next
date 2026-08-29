import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { Border, BoxLayout, Button, Region, WidgetSlot } from '#base/theme';

import { InventoryLayoutNftNameItem } from './InventoryLayoutNftNameItem';
import { InventoryLayoutNftTypeItem } from './InventoryLayoutNftTypeItem';
import { InventoryLayoutOffertotradeBtnItem2 } from './InventoryLayoutOffertotradeBtnItem2';
import { InventoryLayoutOffertotradeCntItem2 } from './InventoryLayoutOffertotradeCntItem2';
import { InventoryLayoutTradeableInfoRegionItem2 } from './InventoryLayoutTradeableInfoRegionItem2';

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainer2Props {
    itemsIconsElementList?: ReactNode;
    itemsNftInfo?: ReactNode;
    itemsOfferOptions?: ReactNode;
    layout?: BoxLayout;
    nftImage?: ReactNode;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    rarityItemOverlayWidget?: ReactNode;
    uniqueLimitedItemOverlayWidget?: ReactNode;
    visibleNextItemButton?: boolean;
    visibleRarityItemOverlayWidget?: boolean;
    visibleUniqueLimitedItemOverlayWidget?: boolean;
    visibleViewItemButton?: boolean;
}

export const InventoryLayoutPreviewContainer2 = ({ itemsIconsElementList, itemsNftInfo, itemsOfferOptions, layout, nftImage, onNextItemButton, onViewItemButton, rarityItemOverlayWidget, uniqueLimitedItemOverlayWidget, visibleNextItemButton, visibleRarityItemOverlayWidget, visibleUniqueLimitedItemOverlayWidget, visibleViewItemButton }: InventoryLayoutPreviewContainer2Props) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <Border
                variant="2"
                tintColor="#d8d8d8"
                layout={{ position: 'absolute', left: 0, width: 175, top: 5, height: 188 }}
            >
                <Region
                    name="nft_info"
                    layout={{ position: 'absolute', left: 5, right: 0, top: 5, height: 35, flexDirection: 'column', gap: 1 }}
                >
                    {itemsNftInfo ?? (
                        <>
                            <InventoryLayoutNftNameItem />
                            <InventoryLayoutNftTypeItem />
                        </>
                    )}
                </Region>
                <WidgetSlot
                    widgetType="product_image"
                    name="nft_image"
                    layout={{ position: 'absolute', left: 2, width: 170, top: 45, height: 110 }}
                >
                    {nftImage}
                </WidgetSlot>
                <Region
                    name="offer_options"
                    layout={{ position: 'absolute', left: -18, right: 5, top: 160, flexDirection: 'row', gap: 10 }}
                >
                    {itemsOfferOptions ?? (
                        <>
                            <InventoryLayoutOffertotradeCntItem2 />
                            <InventoryLayoutOffertotradeBtnItem2 />
                        </>
                    )}
                </Region>
            </Border>
            <Region
                name="icons_element_list"
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column' }}
            >
                {itemsIconsElementList ?? (
                    <InventoryLayoutTradeableInfoRegionItem2 />
                )}
            </Region>
            {(visibleRarityItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="rarity_item_overlay_preview"
                    name="rarity_item_overlay_widget"
                    layout={{ position: 'absolute', right: 23, width: 36, top: 5, height: 30 }}
                >
                    {rarityItemOverlayWidget}
                </WidgetSlot>
            )}
            {(visibleUniqueLimitedItemOverlayWidget ?? false) && (
                <WidgetSlot
                    widgetType="limited_item_overlay_preview"
                    name="unique_limited_item_overlay_widget"
                    layout={{ position: 'absolute', right: 21, width: 40, top: 4, height: 40 }}
                >
                    {uniqueLimitedItemOverlayWidget}
                </WidgetSlot>
            )}
            {(visibleNextItemButton ?? false) && (
                <Button
                    variant="3"
                    name="nextItemButton"
                    onPointerTap={onNextItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 16, width: 131, top: 5, height: 23 }}
                >
                    {t('inventory.furni.next')}
                </Button>
            )}
            {(visibleViewItemButton ?? false) && (
                <Button
                    variant="3"
                    name="viewItemButton"
                    onPointerTap={onViewItemButton}
                    textStyle="text-style-button-shiny-regular"
                    layout={{ position: 'absolute', right: 16, width: 131, top: 31, height: 23 }}
                >
                    {t('inventory.furni.view')}
                </Button>
            )}
        </Region>
    );
};
