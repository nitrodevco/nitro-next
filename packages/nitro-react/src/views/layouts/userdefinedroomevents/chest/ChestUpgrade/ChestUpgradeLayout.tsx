import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { ChestUpgradeLayoutContent, ChestUpgradeLayoutContentProps } from './ChestUpgradeLayoutContent';

/** Generated from `1180_chest_upgrade_xml` (layout "chest_upgrade", 353x287) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface ChestUpgradeLayoutProps {
    content?: ChestUpgradeLayoutContentProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const ChestUpgradeLayout = ({ content, layout, onClose }: ChestUpgradeLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            caption={t('wiredchests.upgrade.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 353, height: 287, minWidth: 275, minHeight: 150, ...layout }}
        >
            <ChestUpgradeLayoutContent {...content} />
        </Frame>
    );
};
