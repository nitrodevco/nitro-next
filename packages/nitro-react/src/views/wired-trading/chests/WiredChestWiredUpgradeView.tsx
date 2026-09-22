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

import { WiredChestPreview } from './WiredChestUpgradeView';

const ERROR_COLOR = '#c42f3d';
/** The frame's `margin_*` vars. */
const FRAME_MARGINS = [ 1, 25, 1, 7 ] as const;
/** `properties_itemlist`'s 197px texts wrap at the field width less the 2px gutters. */
const TEXT_WRAP = 193;

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
            margins={FRAME_MARGINS}
            layout={{ position: 'absolute', width: 353, height: 287 }}
        >
            {/* `content`: an item list, so the buttons move up while the error text is hidden. */}
            <Box layout={{ position: 'absolute', left: 0, top: 8, width: 351, flexDirection: 'column', gap: 10 }}>
                <Box layout={{ position: 'relative', width: 349, height: 164, flexShrink: 0, overflow: 'hidden' }}>
                    <WiredChestPreview furniTypeId={furniTypeId} />
                    {/* `wired_icon`, at 89,7 of the preview's border. */}
                    <ThemeImage
                        src={`${imageLibraryUrl}catalogue/icon_80.png`}
                        bitmap={{ stretchedX: false, stretchedY: false, pivot: 'top right' }}
                        layout={{ position: 'absolute', left: 10 + 89, top: 12 + 7, width: 30, height: 30 }}
                    />
                    <Box layout={{ position: 'absolute', left: 143, top: 15, width: 197, flexDirection: 'column', gap: 4 }}>
                        <ThemeText
                            text={t('wiredchests.upgrade.wired.info')}
                            textStyle="u_bold"
                            textOptions={{ wordWrap: true, wordWrapWidth: TEXT_WRAP, fontSize: 14 }}
                            verticalAlign="top"
                            layout={{ width: 197 }}
                        />
                        <ThemeText
                            text={t('wiredchests.big_fat_warning')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: TEXT_WRAP }}
                            markup
                            verticalAlign="top"
                            layout={{ width: 197 }}
                        />
                    </Box>
                    <Box layout={{ position: 'absolute', left: 142, top: 137, height: 22, flexDirection: 'row' }}>
                        <ThemeText
                            text={t('catalog.purchase.confirmation.dialog.cost')}
                            textStyle="u_regular"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                            layout={{ marginTop: 1 }}
                        />
                        <ThemeText
                            text={t('wiredchests.upgrade.wired.cost')}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                            layout={{ marginTop: 1 }}
                        />
                    </Box>
                </Box>
                {isStarterChest && (
                    <ThemeText
                        text={t('wiredchests.upgrade.wired.error', '', { reason: t('wiredchests.upgrade.wired.error.reason.rookie_chest') })}
                        textStyle="u_bold"
                        textOptions={{ fill: ERROR_COLOR, wordWrap: true, wordWrapWidth: 323 }}
                        verticalAlign="top"
                        layout={{ marginLeft: 12, width: 327 }}
                    />
                )}
                <Box layout={{ marginLeft: 13, height: 27, flexDirection: 'row', gap: 105, flexShrink: 0 }}>
                    <Button
                        variant="3"
                        onPointerTap={onClose}
                        layout={{ width: 110, height: 27 }}
                    >
                        {t('catalog.purchase_confirmation.cancel')}
                    </Button>
                    <ButtonThick
                        variant="5"
                        tintColor="#00aa00"
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
