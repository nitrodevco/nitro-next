/**
 * The chest capacity upgrade - Flash `chests/upgrade_confirmation/WiredChestUpgradeConfirmationView`
 * on `chest_upgrade_xml` (353x287): the chest's picture, what the upgrade adds, the capacity now
 * and after, how many upgrades to buy, the price, and cancel / buy.
 *
 * - `initializeDropMenu`: the amount runs from 1 up to what is left of
 *   `wired.<coins|furni>_chest.max_upgrades` after the levels already bought; at the maximum the
 *   selection is disabled.
 * - `updateUI`: each upgrade adds `upgrade_capacity` to `initial_capacity + level * upgrade_capacity`,
 *   and costs `wired.chests.upgrade_cost_credits` credits and `upgrade_cost_diamonds` diamonds
 *   (999 each when unset; a zero price is hidden, the "+" only shows with both). At the maximum,
 *   or when the purse cannot pay, a red reason shows and buy is disabled.
 * - Buy sends `UpgradeChest` with the amount and disables itself; the window closes on the
 *   result, which the handler turns into a notification.
 */
import { RoomGeometryScaleType } from '@nitrodevco/nitro-api';
import { useState } from 'react';

import { getWiredChestConfigInteger, upgradeWiredChest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useSystemStore, useTranslation } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { WiredChestUpgradeRequest } from '#base/context/wired-trading';
import { Border, Box, Button, ButtonThick, Frame, Icon, ThemeText } from '#base/theme';
import { useFurnitureImageTexturePixi } from '#base/views/catalog/useFurnitureImageTexturePixi';
import { WiredDropdown } from '#base/views/wired-setup/kit/WiredDropdown';
import { WiredFlow } from '#base/views/wired-setup/kit/WiredFlow';
import { WiredStyleProvider } from '#base/views/wired-setup/kit/WiredStyleContext';
import { UBUNTU_WIRED_STYLE } from '#base/wired';

/** `getActivityPointsForType(5)`: diamonds. */
const DIAMONDS_TYPE = 5;
const DEFAULT_UPGRADE_COST = 999;
const ERROR_COLOR = '#c42f3d';

/** `getInteger(key, 999)`. */
const configInteger = (config: Record<string, unknown>, key: string, fallback: number): number => {
    const value = Number(config[key]);

    return Number.isFinite(value) ? Math.trunc(value) : fallback;
};

/** `product_image`: the chest furni at 64, facing 90 degrees, in the 126x152 border. */
export const WiredChestPreview = ({ furniTypeId }: { furniTypeId: number }) => {
    const furniData = useSystemStore(x => x.floorItems[furniTypeId]);
    const { texture, width, height } = useFurnitureImageTexturePixi(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0);

    return (
        <Border
            variant="0"
            tintColor="#f1f1f1"
            layout={{ position: 'absolute', left: 10, top: 12, width: 126, height: 152, alignItems: 'center', justifyContent: 'center' }}
        >
            {texture && (
                <pixiSprite
                    texture={texture}
                    width={width}
                    height={height}
                    layout={{}}
                />
            )}
        </Border>
    );
};

export interface WiredChestUpgradeViewProps {
    request: WiredChestUpgradeRequest;
    onClose: () => void;
}

export const WiredChestUpgradeView = ({ request, onClose }: WiredChestUpgradeViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const config = useConfigData();
    const credits = useUserStore(x => x.credits);
    const diamonds = useUserStore(x => x.activityPoints[DIAMONDS_TYPE] ?? 0);
    const [ selection, setSelection ] = useState(0);
    const [ buying, setBuying ] = useState(false);
    const { chestId, chestType, furniTypeId, capacityLevel } = request;

    const initialCapacity = getWiredChestConfigInteger(config, chestType, 'initial_capacity');
    const upgradeCapacity = getWiredChestConfigInteger(config, chestType, 'upgrade_capacity');
    const maxUpgrades = getWiredChestConfigInteger(config, chestType, 'max_upgrades');
    const costCredits = configInteger(config, 'wired.chests.upgrade_cost_credits', DEFAULT_UPGRADE_COST);
    const costDiamonds = configInteger(config, 'wired.chests.upgrade_cost_diamonds', DEFAULT_UPGRADE_COST);

    // `initializeDropMenu`: "1", then one more for every level still to buy after the next.
    const amounts = [ { id: 0, label: '1' } ];

    for (let level = capacityLevel + 2, amount = 2; level <= maxUpgrades; level++, amount++) amounts.push({ id: amounts.length, label: String(amount) });

    const atCapacity = (capacityLevel >= maxUpgrades);
    const amount = selection + 1;
    const cannotPay = (credits < (costCredits * amount)) || (diamonds < (costDiamonds * amount));

    let errorKey: string | undefined = undefined;

    if (atCapacity) errorKey = 'wiredchests.upgrade.error.reason.at_capacity';
    else if (cannotPay) errorKey = 'wiredchests.upgrade.error.reason.not_enough_currency';

    const currentCapacity = initialCapacity + (capacityLevel * upgradeCapacity);
    const purchaseCapacity = upgradeCapacity * amount;

    return (
        <Frame
            variant="3"
            id="wired-chest-upgrade"
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
                <Box layout={{ position: 'absolute', left: 143, top: 15, width: 197, flexDirection: 'column', gap: 4 }}>
                    <ThemeText
                        text={t('wiredchests.upgrade.capacity.extra', '', { purchase_capacity: String(purchaseCapacity) })}
                        textStyle="text-style-u-headline-small"
                        textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                        verticalAlign="top"
                        layout={{ width: 197 }}
                    />
                    <ThemeText
                        text={t('wiredchests.upgrade.capacity.current', '', { current_capacity: String(currentCapacity) })}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                        verticalAlign="top"
                        layout={{ width: 197 }}
                    />
                    <ThemeText
                        text={t('wiredchests.upgrade.capacity.new', '', { new_capacity: String(currentCapacity + purchaseCapacity) })}
                        textStyle="text-style-u-bold"
                        textOptions={{ wordWrap: true, wordWrapWidth: 197 }}
                        verticalAlign="top"
                        layout={{ width: 197 }}
                    />
                    <Box layout={{ flexDirection: 'row', gap: 5, height: 25 }}>
                        <ThemeText
                            text={t('wiredchests.upgrade.capacity.amount')}
                            textStyle="text-style-u-regular"
                            layout={{ marginTop: 3 }}
                        />
                        <WiredStyleProvider style={UBUNTU_WIRED_STYLE}>
                            <WiredFlow direction="row">
                                <WiredDropdown
                                    options={amounts}
                                    selected={selection}
                                    onSelect={setSelection}
                                    width={58}
                                    disabled={atCapacity}
                                />
                            </WiredFlow>
                        </WiredStyleProvider>
                    </Box>
                </Box>
                <Box layout={{ position: 'absolute', left: 142, top: 137, height: 22, flexDirection: 'row' }}>
                    <ThemeText
                        text={t('catalog.purchase.confirmation.dialog.cost')}
                        textStyle="text-style-u-regular"
                        layout={{ marginTop: 1, marginRight: 4 }}
                    />
                    <Box layout={{ flexDirection: 'row', gap: 2, height: 25 }}>
                        {(costCredits !== 0) && (
                            <ThemeText
                                text={String(costCredits * amount)}
                                textStyle="text-style-u-headline-small"
                                layout={{ marginTop: 1 }}
                            />
                        )}
                        <Icon variant={34} />
                        {(costCredits !== 0) && (costDiamonds !== 0) && (
                            <ThemeText
                                text="+"
                                textStyle="text-style-u-headline-small"
                                layout={{ marginTop: 1 }}
                            />
                        )}
                        {(costDiamonds !== 0) && (
                            <ThemeText
                                text={String(costDiamonds * amount)}
                                textStyle="text-style-u-headline-small"
                                layout={{ marginTop: 1 }}
                            />
                        )}
                        <Icon variant={41} />
                    </Box>
                </Box>
                {errorKey && (
                    <ThemeText
                        text={t('wiredchests.upgrade.error', '', { reason: t(errorKey, errorKey) })}
                        textStyle="text-style-u-bold"
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
                        disabled={buying || (errorKey !== undefined)}
                        onPointerTap={() => {
                            if (buying || errorKey) return;

                            setBuying(true);
                            upgradeWiredChest(send, chestId, amount);
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
