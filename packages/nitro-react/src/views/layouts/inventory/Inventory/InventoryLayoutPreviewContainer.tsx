import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Button, Region, WidgetSlot } from '#base/theme';

import { InventoryLayoutPreviewElementList, InventoryLayoutPreviewElementListProps } from './InventoryLayoutPreviewElementList';
import { InventoryLayoutRecyclableInfoRegionItem } from './InventoryLayoutRecyclableInfoRegionItem';
import { InventoryLayoutTradeableInfoRegionItem } from './InventoryLayoutTradeableInfoRegionItem';

/** Named region `preview_container` of InventoryLayout - configured through the parent's `previewContainer` prop. */
export interface InventoryLayoutPreviewContainerProps {
    furniPreviewRegion?: ReactNode;
    furniPreviewWidget?: ReactNode;
    itemsIconsElementList?: ReactNode;
    layout?: BoxLayout;
    onFurniPreviewRegion?: () => void;
    onNextItemButton?: () => void;
    onViewItemButton?: () => void;
    previewElementList?: InventoryLayoutPreviewElementListProps;
    rarityItemOverlayWidget?: ReactNode;
    uniqueLimitedItemOverlayWidget?: ReactNode;
}

export const InventoryLayoutPreviewContainer = ({ furniPreviewRegion, furniPreviewWidget, itemsIconsElementList, layout, onFurniPreviewRegion, onNextItemButton, onViewItemButton, previewElementList, rarityItemOverlayWidget, uniqueLimitedItemOverlayWidget }: InventoryLayoutPreviewContainerProps) => {
    const t = useTranslation();

    return (
        <Region
            name="preview_container"
            layout={{ position: 'absolute', left: 290, width: 180, top: 27, bottom: -3, ...layout }}
        >
            <Region
                name="furni_preview_region"
                onPointerTap={onFurniPreviewRegion}
                cursor="pointer"
                layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50 }}
            >
                {furniPreviewRegion}
            </Region>
            <WidgetSlot
                widgetType="room_previewer"
                name="furni_preview_widget"
                layout={{ position: 'absolute', left: 5, right: 5, top: 0, bottom: 107, minHeight: 50 }}
            >
                {furniPreviewWidget}
            </WidgetSlot>
            <InventoryLayoutPreviewElementList {...previewElementList} />
            <Region
                name="icons_element_list"
                layout={{ position: 'absolute', left: 0, width: 52, top: 0, height: 34, flexDirection: 'column' }}
            >
                {itemsIconsElementList ?? (
                    <>
                        <InventoryLayoutTradeableInfoRegionItem />
                        <InventoryLayoutRecyclableInfoRegionItem />
                    </>
                )}
            </Region>
            <WidgetSlot
                widgetType="rarity_item_overlay_preview"
                name="rarity_item_overlay_widget"
                layout={{ position: 'absolute', right: 23, width: 36, top: 5, height: 30 }}
            >
                {rarityItemOverlayWidget}
            </WidgetSlot>
            <WidgetSlot
                widgetType="limited_item_overlay_preview"
                name="unique_limited_item_overlay_widget"
                layout={{ position: 'absolute', right: 21, width: 40, top: 4, height: 40 }}
            >
                {uniqueLimitedItemOverlayWidget}
            </WidgetSlot>
            <Button
                variant="3"
                name="nextItemButton"
                onPointerTap={onNextItemButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 16, width: 131, top: 5, height: 23 }}
            >
                {t('inventory.furni.next')}
            </Button>
            <Button
                variant="3"
                name="viewItemButton"
                onPointerTap={onViewItemButton}
                textStyle="text-style-button-shiny-regular"
                layout={{ position: 'absolute', right: 16, width: 131, top: 31, height: 23 }}
            >
                {t('inventory.furni.view')}
            </Button>
        </Region>
    );
};
