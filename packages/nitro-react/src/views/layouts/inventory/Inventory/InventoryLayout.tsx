import { ReactNode } from 'react';

import { useTranslation } from '#base/context';
import { BoxLayout, Frame, Region } from '#base/theme';

import { InventoryLayoutTopContent, InventoryLayoutTopContentProps } from './InventoryLayoutTopContent';

/** Generated from `1278_inventory_xml` (layout "inventory", 490x342) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryLayoutProps {
    layout?: BoxLayout;
    onClose?: () => void;
    subContentArea?: ReactNode;
    topContent?: InventoryLayoutTopContentProps;
}

export const InventoryLayout = ({ layout, onClose, subContentArea, topContent }: InventoryLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="inventoryBase"
            name="inventoryBase"
            caption={t('inventory.title')}
            tintColor="#418db0"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 490, height: 342, minWidth: 490, maxWidth: 490, minHeight: 300, ...layout }}
        >
            <InventoryLayoutTopContent {...topContent} />
            <Region
                name="subContentArea"
                layout={{ position: 'absolute', left: 0, right: 0, top: 301, height: 1 }}
            >
                {subContentArea}
            </Region>
        </Frame>
    );
};
