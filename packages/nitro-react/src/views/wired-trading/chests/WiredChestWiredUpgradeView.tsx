/**
 * The wired upgrade's confirmation - Flash `chests/settings/WiredChestWiredUpdateConfirmationView`
 * on `chest_wired_upgrade_xml` (353x287), opened by the settings window's wired button: the
 * chest's picture with the wired badge, what the upgrade does, the warning, its (free) cost, and
 * cancel / buy. A starter chest cannot take the upgrade: buy is disabled and the reason shows.
 *
 * Buy disables itself and hands over to the settings window (`ChestSettingsUI.confirmUpgrade`),
 * which saves; this window stays until the settings window goes.
 */
import { useState } from 'react';

import { useConfigValue, useTranslation } from '#base/context/system';
import { Box, Button, ButtonThick, Frame, ThemeImage, ThemeText } from '#base/theme';
import { WiredStyleProvider } from '#base/views/wired-setup/kit/WiredStyleContext';
import { WiredText } from '#base/views/wired-setup/kit/WiredText';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

import { WiredChestPreview } from './WiredChestUpgradeView';

const ERROR_COLOR = '#c42f3d';

export interface WiredChestWiredUpgradeViewProps {
    furniTypeId: number;
    isStarterChest: boolean;
    onBuy: () => void;
    onClose: () => void;
}

export const WiredChestWiredUpgradeView = ({ furniTypeId, isStarterChest, onBuy, onClose }: WiredChestWiredUpgradeViewProps) => {
    const t = useTranslation();
    const imageLibraryUrl = useConfigValue<string>('image.library.url') ?? '';
    const [ bought, setBought ] = useState(false);

    return (
        <Frame
            variant="3"
            id="wired-chest-wired-upgrade"
            caption={t('wiredchests.upgrade.title')}
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            resizeDirection="none"
            rememberPosition={false}
            centered
            onClose={onClose}
            contentLayout={{ paddingLeft: 0, paddingRight: 0, marginBottom: 0 }}
            layout={{ position: 'absolute', width: 353, height: 287 }}
        >
            <Box layout={{ position: 'relative', width: 353, height: 254 }}>
                <WiredChestPreview furniTypeId={furniTypeId} />
                <ThemeImage
                    src={`${imageLibraryUrl}catalogue/icon_80.png`}
                    layout={{ position: 'absolute', left: 10 + 89, top: 12 + 7, width: 30, height: 30 }}
                />
                <Box layout={{ position: 'absolute', left: 143, top: 15, width: 197, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={t('wiredchests.upgrade.wired.info')}
                        textStyle="u_bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 197, fontSize: 14 }}
                        verticalAlign="top"
                        layout={{ width: 197 }}
                    />
                    <WiredStyleProvider style={UBUNTU_WIRED_STYLE}>
                        <WiredText
                            text="${wiredchests.big_fat_warning}"
                            html
                        />
                    </WiredStyleProvider>
                </Box>
                <Box layout={{ position: 'absolute', left: 142, top: 137, height: 22, flexDirection: 'row', gap: 4 }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="u_regular"
                        layout={{ marginTop: 1 }}
                    />
                    <ThemeText
                        text={t('wiredchests.upgrade.wired.cost')}
                        textStyle="u_regular"
                        textOptions={{ fontSize: 14 }}
                        flashFormat={{ bold: true }}
                        layout={{ marginTop: 1 }}
                    />
                </Box>
                {isStarterChest && (
                    <ThemeText
                        text={t('wiredchests.upgrade.wired.error', '', { reason: t('wiredchests.upgrade.wired.error.reason.rookie_chest') })}
                        textStyle="u_bold"
                        textOptions={{ fill: ERROR_COLOR, wordWrap: true, wordWrapWidth: 327 }}
                        verticalAlign="top"
                        layout={{ position: 'absolute', left: 12, top: 174, width: 327 }}
                    />
                )}
                <Box layout={{ position: 'absolute', left: 13, top: 214, width: 325, height: 27, flexDirection: 'row', justifyContent: 'space-between' }}>
                    <Button
                        variant="3"
                        onPointerTap={onClose}
                        layout={{ width: 110, height: 27 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        disabled={bought || isStarterChest}
                        onPointerTap={() => {
                            if (bought || isStarterChest) return;

                            setBought(true);
                            onBuy();
                        }}
                        layout={{ width: 110, height: 27 }}
                    >
                        {t('catalog.purchase_confirmation.buy')}
                    </ButtonThick>
                </Box>
            </Box>
        </Frame>
    );
};
