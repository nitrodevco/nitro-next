import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { InventoryTradingNameScamWarningLayoutContentList, InventoryTradingNameScamWarningLayoutContentListProps } from './InventoryTradingNameScamWarningLayoutContentList';

/** Generated from `1310_inventory_trading_name_scam_warning_xml` (layout "inventory_trading_name_scam_warning", 356x333) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface InventoryTradingNameScamWarningLayoutProps {
    contentList?: InventoryTradingNameScamWarningLayoutContentListProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const InventoryTradingNameScamWarningLayout = ({ contentList, layout, onClose }: InventoryTradingNameScamWarningLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="inventory_trading_name_scam_warning_frame"
            name="inventory_trading_name_scam_warning_frame"
            caption={t('inventory.trading.namescam.title')}
            tintColor="#d43d59"
            onClose={onClose}
            resizeDirection="y"
            layout={{ width: 356, height: 333, minWidth: 356, maxWidth: 356, minHeight: 333, ...layout }}
        >
            <InventoryTradingNameScamWarningLayoutContentList {...contentList} />
        </Frame>
    );
};
