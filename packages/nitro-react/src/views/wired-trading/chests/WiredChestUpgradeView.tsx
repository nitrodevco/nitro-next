/**
 * The chest capacity upgrade - Flash `chests/upgrade_confirmation/WiredChestUpgradeConfirmationView`,
 * drawn from its template `chest_upgrade_xml` (353x287): the chest's picture, what the upgrade adds,
 * the capacity now and after, how many upgrades to buy, the price, and cancel / buy.
 *
 * - `initializeDropMenu`: the amount runs from 1 up to what is left of
 *   `wired.<coins|furni>_chest.max_upgrades` after the levels already bought; at the maximum the
 *   selection is disabled.
 * - `updateUI`: each upgrade adds `upgrade_capacity` to `initial_capacity + level * upgrade_capacity`,
 *   and costs `wired.chests.upgrade_cost_credits` credits and `upgrade_cost_diamonds` diamonds
 *   (999 each when unset; a zero price is hidden, the "+" only shows with both). At the maximum,
 *   or when the purse cannot pay, `error_text` shows the reason and buy is disabled.
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
import { useFurnitureImageTexture } from '#base/hooks';
import { TemplateWindow, ThemeImage } from '#base/theme';

/** `getActivityPointsForType(5)`: diamonds. */
const DIAMONDS_TYPE = 5;
const DEFAULT_UPGRADE_COST = 999;

/** `getInteger(key, 999)`. */
const configInteger = (config: Record<string, unknown>, key: string, fallback: number): number => {
    const value = Number(config[key]);

    return Number.isFinite(value) ? Math.trunc(value) : fallback;
};

/** `getFurnitureImage(type, Vector3d(90), 64)`: the chest furni at 64, facing 90 degrees. */
const useChestTexture = (furniTypeId: number) => {
    const furniData = useSystemStore(x => x.floorItems[furniTypeId]);

    return useFurnitureImageTexture(furniData?.className, furniData?.colorIndex ?? 0, 2, RoomGeometryScaleType.ZoomedIn, 0).texture;
};

/**
 * `showChestPreview`: the picture in a template's `product_image`, unscaled in its middle
 * (`pivot_point` center) - given to it as its children.
 */
export const WiredChestImage = ({ furniTypeId }: { furniTypeId: number }) => {
    const texture = useChestTexture(furniTypeId);

    if (!texture) return null;

    return (
        <ThemeImage
            texture={texture}
            bitmap={{ stretchedX: false, stretchedY: false, pivot: 'center' }}
            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
        />
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
    const amounts = [ '1' ];

    for (let level = capacityLevel + 2, amount = 2; level <= maxUpgrades; level++, amount++) amounts.push(String(amount));

    const atCapacity = (capacityLevel >= maxUpgrades);
    const amount = selection + 1;
    const cannotPay = (credits < (costCredits * amount)) || (diamonds < (costDiamonds * amount));

    let errorKey: string | undefined = undefined;

    if (atCapacity) errorKey = 'wiredchests.upgrade.error.reason.at_capacity';
    else if (cannotPay) errorKey = 'wiredchests.upgrade.error.reason.not_enough_currency';

    const currentCapacity = initialCapacity + (capacityLevel * upgradeCapacity);
    const purchaseCapacity = upgradeCapacity * amount;

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/chest_upgrade_xml"
            frame={{ id: 'wired-chest-upgrade', centered: true, rememberPosition: false, onClose }}
            bindings={{
                product_image: { children: <WiredChestImage furniTypeId={furniTypeId} /> },
                product_name: { caption: t('wiredchests.upgrade.capacity.extra', '', { purchase_capacity: String(purchaseCapacity) }) },
                current_capacity: { caption: t('wiredchests.upgrade.capacity.current', '', { current_capacity: String(currentCapacity) }) },
                new_capacity: { caption: t('wiredchests.upgrade.capacity.new', '', { new_capacity: String(currentCapacity + purchaseCapacity) }) },
                amount_selection_dropmenu: {
                    options: amounts,
                    selection,
                    disabled: atCapacity,
                    onSelect: setSelection,
                },
                price_credits: { visible: costCredits !== 0, caption: String(costCredits * amount) },
                price_diamonds: { visible: costDiamonds !== 0, caption: String(costDiamonds * amount) },
                plus: { visible: (costCredits !== 0) && (costDiamonds !== 0) },
                error_text: { visible: errorKey !== undefined, caption: errorKey ? t('wiredchests.upgrade.error', '', { reason: t(errorKey, errorKey) }) : '' },
                cancel_button: { onPointerTap: onClose },
                buy_button: {
                    disabled: buying || (errorKey !== undefined),
                    onPointerTap: () => {
                        if (buying || errorKey) return;

                        setBuying(true);
                        upgradeWiredChest(send, chestId, amount);
                    },
                },
            }}
        />
    );
};
