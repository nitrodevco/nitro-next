/**
 * The wired upgrade's confirmation - Flash `chests/settings/WiredChestWiredUpdateConfirmationView`,
 * drawn from its template `chest_wired_upgrade_xml` (353x287), opened by the settings window's wired
 * button: the chest's picture with the wired badge, what the upgrade does, the warning, its (free)
 * cost, and cancel / buy - all the template's own but the picture. A starter chest cannot take the
 * upgrade: buy is disabled and the reason shows (`updateUI`).
 *
 * Buy disables itself and hands over to the settings window (`ChestSettingsUI.confirmUpgrade`),
 * which saves; this window stays until the settings window goes.
 */
import { useState } from 'react';

import { useTranslation } from '#base/context/system';
import { TemplateWindow } from '#base/theme';

import { WiredChestImage } from './WiredChestUpgradeView';

export interface WiredChestWiredUpgradeViewProps {
    furniTypeId: number;
    isStarterChest: boolean;
    onBuy: () => void;
    onClose: () => void;
}

export const WiredChestWiredUpgradeView = ({ furniTypeId, isStarterChest, onBuy, onClose }: WiredChestWiredUpgradeViewProps) => {
    const t = useTranslation();
    const [ bought, setBought ] = useState(false);

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/chest_wired_upgrade_xml"
            frame={{ id: 'wired-chest-wired-upgrade', centered: true, rememberPosition: false, onClose }}
            bindings={{
                product_image: { children: <WiredChestImage furniTypeId={furniTypeId} /> },
                error_text: {
                    visible: isStarterChest,
                    caption: isStarterChest ? t('wiredchests.upgrade.wired.error', '', { reason: t('wiredchests.upgrade.wired.error.reason.rookie_chest') }) : '',
                },
                cancel_button: { onPointerTap: onClose },
                buy_button: {
                    disabled: bought || isStarterChest,
                    onPointerTap: () => {
                        if (bought || isStarterChest) return;

                        setBought(true);
                        onBuy();
                    },
                },
            }}
        />
    );
};
