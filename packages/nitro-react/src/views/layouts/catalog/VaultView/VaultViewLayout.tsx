import { useTranslation } from '#base/context';
import { BoxLayout, Frame } from '#base/theme';

import { VaultViewLayoutEarningsContentArea, VaultViewLayoutEarningsContentAreaProps } from './VaultViewLayoutEarningsContentArea';

/** Generated from `1540_vault_view_xml` (layout "vault_view", 422x536) by scripts/generate-layout-views.ts - do not edit by hand. */
export interface VaultViewLayoutProps {
    earningsContentArea?: VaultViewLayoutEarningsContentAreaProps;
    layout?: BoxLayout;
    onClose?: () => void;
}

export const VaultViewLayout = ({ earningsContentArea, layout, onClose }: VaultViewLayoutProps) => {
    const t = useTranslation();

    return (
        <Frame
            variant="3"
            id="VaultBase"
            name="VaultBase"
            caption={t('earnings.title')}
            tintColor="#418db0"
            onClose={onClose}
            layout={{ width: 422, height: 536, minWidth: 422, minHeight: 536, ...layout }}
        >
            <VaultViewLayoutEarningsContentArea {...earningsContentArea} />
        </Frame>
    );
};
