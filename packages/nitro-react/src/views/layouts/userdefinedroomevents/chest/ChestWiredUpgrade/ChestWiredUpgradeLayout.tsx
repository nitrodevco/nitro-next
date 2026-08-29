import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { ChestWiredUpgradeLayoutContent, ChestWiredUpgradeLayoutContentProps } from './ChestWiredUpgradeLayoutContent';

/** Generated from `1129_chest_wired_upgrade_xml` (layout "chest_wired_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestWiredUpgradeLayoutProps {
    content?: ChestWiredUpgradeLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChestWiredUpgradeLayout = ({ content, layout, onClose }: ChestWiredUpgradeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.upgrade.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 287, minWidth: 275, minHeight: 150, ...layout }}
        >
            <ChestWiredUpgradeLayoutContent {...content} />
        </Frame>
    );
};
