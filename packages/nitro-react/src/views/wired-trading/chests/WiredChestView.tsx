/**
 * The wired chest window - Flash `wired_trading/chests/WiredChestWrapperView`, drawn from its
 * template `chest_generic_xml`: a header with the chest's description and its two settings buttons,
 * the contents of the chest type in `chest_contents` (`WiredChestFurniContentsView` /
 * `WiredChestCoinContentsView`, the subcontroller's view), and a footer with the lock options, the
 * capacity and the buttons.
 *
 * `setSubController`: the window is as wide as the contents plus what the layout has around
 * `chest_contents` (2), `chest_contents` as high as the contents, and the window as high as
 * `main_list` plus the frame's title bar and bottom edge (35).
 *
 * What the viewer may do (`canRead` / `canEdit` / `canWithdraw`, all "owner, or the wired menu's
 * read / write permission") and whether the chest has the wired upgrade decide the layout
 * (`updateLayout`) and which parts are disabled (`updateUI`, `Util.disableSection`):
 *
 * - no read access: only the contents, the bottom "space used" line and a "donate" button;
 * - read access, no wired upgrade: the settings buttons, the capacity text and upgrade button,
 *   the log and withdraw-all buttons;
 * - wired upgrade: the lock options, the capacity input and the lock info button instead of the
 *   capacity text.
 *
 * The lock checkbox asks first: locking as someone other than the owner (`wiredchests.lock.confirm`)
 * and unlocking always (`wiredchests.unlock.confirm`). Every change to the options goes out at
 * once (`onOptionsChanged`); the capacity input goes out on Enter or a click away, and is held to
 * the chest's maximum capacity while typed. The form is refilled from the chest furni's data
 * whenever that changes (`updateUIOptions`).
 *
 * `lock_info_bubble` is taken out of the window onto the desktop; the info button shows it beside
 * itself (`relocateBubbleFocus`) and it hides when it loses the focus (`WE_DEACTIVATED`) or another
 * chest is shown.
 *
 * The furni chest's window can be resized in Flash (415-595 x 390-730); here it keeps the size
 * `setSubController` gives it.
 */
import { Container as PixiContainer } from 'pixi.js';
import { useMemo, useRef, useState } from 'react';

import { getWiredChestMaxCapacity, isWiredStarterChest, requestWiredChestLogs, setWiredChestOptions, startWiredChestDeposit, withdrawAllFromWiredChest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useInterpolate, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { useWiredHasReadPermission, useWiredHasWritePermission } from '#base/context/wired';
import {
    useWiredChestActions, useWiredTradingStore, WIRED_CHEST_KEY_AUTO_LOCK, WIRED_CHEST_KEY_CAPACITY, WIRED_CHEST_KEY_CAPACITY_LEVEL, WIRED_CHEST_KEY_DESC, WIRED_CHEST_KEY_EVERYONE_CAN_DONATE,
    WIRED_CHEST_KEY_IS_WIRED_ENABLED, WIRED_CHEST_KEY_LOCKED, WIRED_CHEST_KEY_NAME, WIRED_CHEST_TYPE_COIN, WiredChestFurniData, WiredChestView as WiredChestViewData,
} from '#base/context/wired-trading';
import { Box, TemplateWindow, TemplateWindows, useOutsideClick, useTemplateFrame } from '#base/theme';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';

import { WIRED_COIN_CHEST_HEIGHT, WIRED_COIN_CHEST_WIDTH, WiredChestCoinContentsView } from './WiredChestCoinContentsView';
import { WIRED_FURNI_CHEST_HEIGHT, WIRED_FURNI_CHEST_WIDTH, WiredChestFurniContentsView } from './WiredChestFurniContentsView';

const TEMPLATE = 'habbo-user-defined-room-events-com/chest_generic_xml';

/** `lock_info_bubble`'s height in the layout. */
const LOCK_INFO_BUBBLE_HEIGHT = 536;

/** What the footer's controls hold between two `SetChestOptions`. */
interface ChestOptionsForm {
    locked: boolean;
    autoLock: boolean;
    capacity: string;
}

/** `updateUIOptions`: the form as the chest furni's data has it. */
const readOptions = (data: Record<string, string>): ChestOptionsForm => ({
    locked: data[WIRED_CHEST_KEY_LOCKED] !== '0',
    autoLock: data[WIRED_CHEST_KEY_AUTO_LOCK] !== '0',
    capacity: data[WIRED_CHEST_KEY_CAPACITY] ?? '',
});

/**
 * `setSubController` / `updateLayout`: the window as wide as the contents and `chest_contents` as
 * high, the window following `main_list`. What lies around them (`§_-92g§`, `§_-G2c§`) is measured
 * as the constructor measures it, right after `buildFromXML` - from the layout's own sizes, before
 * `updateLayout` hides the footer's rows.
 */
const arrangeFor = (contentsWidth: number, contentsHeight: number) => ({ find, root }: TemplateWindows) => {
    const window = root();
    const contents = find('chest_contents');
    const header = find('header');
    const footer = find('footer');
    const mainList = find('main_list');

    if (!window?.element || !contents?.element || !header?.element || !footer?.element || !mainList) return;

    const chromeWidth = window.element.width - contents.element.width;
    const chromeHeight = window.element.height - contents.element.height - footer.element.height - header.element.height;

    window.setWidth(contentsWidth + chromeWidth);
    contents.setHeight(contentsHeight);
    window.setHeight(mainList.height + chromeHeight);
};

/** The lock info bubble on the desktop, placed by `relocateBubbleFocus`, hidden on a click elsewhere. */
const LockInfoBubble = ({ anchor, onClose }: { anchor: WiredTradingBubbleAnchor; onClose: () => void }) => {
    const ref = useRef<PixiContainer>(null);

    useOutsideClick(ref, onClose);

    return (
        <Box
            ref={ref}
            zIndex={100000}
            layout={{ position: 'absolute', left: Math.round(anchor.x + anchor.width + 3), top: Math.round(anchor.y + 1 + (anchor.height / 2) - (LOCK_INFO_BUBBLE_HEIGHT / 2)) }}
        >
            <TemplateWindow
                id={TEMPLATE}
                part="lock_info_bubble"
                bindings={{ '': { visible: true } }}
            />
        </Box>
    );
};

export interface WiredChestViewProps {
    view: WiredChestViewData;
    furni: WiredChestFurniData;
    onClose: () => void;
}

export const WiredChestView = ({ view, furni, onClose }: WiredChestViewProps) => {
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const interpolate = useInterpolate();
    const config = useConfigData();
    const floorItems = useSystemStore(x => x.floorItems);
    const { showConfirm } = useWindowActions();
    const { setChestSettings, setChestNotificationSettings, setChestUpgrade } = useWiredChestActions();
    const hasReadPermission = useWiredHasReadPermission();
    const hasWritePermission = useWiredHasWritePermission();
    const itemCount = useWiredTradingStore(x => x.chestItems.length);
    const coins = useWiredTradingStore(x => x.chestCoins);
    const frame = useTemplateFrame({ id: 'wired-chest', defaultPosition: { x: 60, y: 50 }, resizeDirection: 'none', onClose });
    const [ form, setForm ] = useState<ChestOptionsForm>(() => readOptions(furni.data));
    const [ formFrom, setFormFrom ] = useState(furni);
    /** The shown bubble's anchor, for the chest it was opened on: `show` hides it for another. */
    const [ lockInfo, setLockInfo ] = useState<{ chestId: number; anchor: WiredTradingBubbleAnchor } | undefined>(undefined);

    // `viewingChestUpdated` -> `updateUIOptions`: the chest's data changed, the form follows it.
    if (formFrom !== furni) {
        setFormFrom(furni);
        setForm(readOptions(furni.data));
    }

    const { chestId, chestType, isOwner, isRoomOwner } = view;
    const { data } = furni;
    const isCoinChest = (chestType === WIRED_CHEST_TYPE_COIN);
    const isWiredEnabled = (data[WIRED_CHEST_KEY_IS_WIRED_ENABLED] === '1');
    const className = floorItems[furni.furniTypeId]?.className ?? '';
    const isStarterChest = isWiredStarterChest(config, className);
    const maxCapacity = getWiredChestMaxCapacity(config, chestType, isStarterChest, data);
    const canRead = isOwner || hasReadPermission;
    const canEdit = isOwner || hasWritePermission;
    const count = isCoinChest ? coins : itemCount;
    const isEmpty = (count <= 0);
    const canWithdraw = !isEmpty && canEdit && (!form.locked || isOwner);
    const everyoneCanDonate = (data[WIRED_CHEST_KEY_EVERYONE_CAN_DONATE] === '1');
    const total = data[WIRED_CHEST_KEY_CAPACITY] ?? '';
    const chestName = data[WIRED_CHEST_KEY_NAME] ?? '';
    const description = data[WIRED_CHEST_KEY_DESC] || '${wiredchests.description_placeholder}';
    const contentsWidth = isCoinChest ? WIRED_COIN_CHEST_WIDTH : WIRED_FURNI_CHEST_WIDTH;
    const contentsHeight = isCoinChest ? WIRED_COIN_CHEST_HEIGHT : WIRED_FURNI_CHEST_HEIGHT;
    const arrange = useMemo(() => arrangeFor(contentsWidth, contentsHeight), [ contentsWidth, contentsHeight ]);

    const lockDisabled = !isOwner && (!isRoomOwner || form.locked);
    const upgradeDisabled = isStarterChest || !isOwner;

    let upgradeTooltip = '';

    if (isStarterChest) upgradeTooltip = interpolate('${wiredchests.upgrade.result.error.10}');
    else if (!isOwner) upgradeTooltip = interpolate('${wiredchests.upgrade.error.reason.not_owner}');

    /** `onOptionsChanged`. */
    const applyOptions = (next: ChestOptionsForm) => {
        setForm(next);
        setWiredChestOptions(send, chestId, next.locked, next.autoLock, parseInt(next.capacity, 10) || 0);
    };

    /** `onAttemptLockChest` / `onAttemptUnlockChest`. */
    const onToggleLock = () => {
        if (lockDisabled) return;

        if (!form.locked) {
            if (isOwner) {
                applyOptions({ ...form, locked: true });

                return;
            }

            showConfirm(interpolate('${wiredchests.lock.confirm.title}'), interpolate('${wiredchests.lock.confirm.desc}'), () => applyOptions({ ...form, locked: true }));

            return;
        }

        showConfirm(interpolate('${wiredchests.unlock.confirm.title}'), interpolate('${wiredchests.unlock.confirm.desc}'), () => applyOptions({ ...form, locked: false }));
    };

    /** `onCapacityChange`: never above the maximum. */
    const onCapacityChange = (value: string) => {
        const digits = value.replace(/[^0-9]/g, '');

        setForm({ ...form, capacity: ((parseInt(digits, 10) || 0) > maxCapacity) ? String(maxCapacity) : digits });
    };

    /** `onWithdrawAllClick`. */
    const onWithdrawAll = () => showConfirm(interpolate('${wiredchests.withdraw_all.confirm.title}'), interpolate('${wiredchests.withdraw_all.confirm.desc}'), () => withdrawAllFromWiredChest(send, chestId));

    const showLocking = canRead && isWiredEnabled;
    const startDepositDisabled = !everyoneCanDonate && (!canEdit || (form.locked && !isOwner));

    return (
        <>
            <TemplateWindow
                id={TEMPLATE}
                frame={frame}
                arrange={arrange}
                bindings={{
                    // `updateUI`: the chest's name, or the subcontroller's title.
                    '': { caption: chestName.length ? chestName : t(isCoinChest ? 'wiredchests.coin_chest' : 'wiredchests.furni_chest') },
                    desc: { caption: description },
                    notification_settings_button: {
                        visible: canRead,
                        disableSection: !isOwner,
                        onPointerTap: () => {
                            if (isOwner) setChestNotificationSettings({ chestId, chestType });
                        },
                    },
                    settings_button: {
                        visible: canRead,
                        disableSection: !isOwner,
                        onPointerTap: () => {
                            if (isOwner) setChestSettings({ chestId, chestType, furniTypeId: furni.furniTypeId, isStarterChest });
                        },
                    },
                    chest_contents: {
                        children: isCoinChest
                            ? (
                                    <WiredChestCoinContentsView
                                        chestId={chestId}
                                        className={className}
                                        canWithdraw={canWithdraw}
                                    />
                                )
                            : (
                                    <WiredChestFurniContentsView
                                        chestId={chestId}
                                        canWithdraw={canWithdraw}
                                    />
                                ),
                    },
                    // Moved onto the desktop when the window is built: never drawn inside it.
                    lock_info_bubble: { visible: false },
                    lock_info_button: {
                        visible: showLocking,
                        onPointerTap: event => setLockInfo({ chestId, anchor: getWiredTradingBubbleAnchor(event) }),
                    },
                    locking_options: { visible: showLocking },
                    lock_chest_cbx: { selected: form.locked, disableSection: lockDisabled, onPointerTap: onToggleLock },
                    auto_lock_chest_cbx: {
                        selected: form.autoLock,
                        disableSection: !isOwner,
                        onPointerTap: () => {
                            if (isOwner) applyOptions({ ...form, autoLock: !form.autoLock });
                        },
                    },
                    capacity_options: { visible: canRead },
                    item_count_text: { visible: canRead && !isWiredEnabled, caption: t('wiredchests.space_used2', '', { count: String(count), total }) },
                    capacity_override_container: { visible: isWiredEnabled },
                    capacity_input_border: { disableSection: !isOwner },
                    capacity_input: {
                        caption: form.capacity,
                        restrict: '0-9',
                        onChange: onCapacityChange,
                        onEnter: () => applyOptions(form),
                        onBlur: () => {
                            if (isOwner) applyOptions(form);
                        },
                    },
                    upgrade_capacity_container: { visible: canRead },
                    max_capacity_txt: { caption: t('wiredchests.max_capacity', '', { max_capacity: String(maxCapacity) }) },
                    upgrade_capacity_region: { tooltip: upgradeTooltip },
                    upgrade_capacity_btn: {
                        disableSection: upgradeDisabled,
                        onPointerTap: () => {
                            if (!upgradeDisabled) setChestUpgrade({ chestId, chestType, furniTypeId: furni.furniTypeId, capacityLevel: parseInt(data[WIRED_CHEST_KEY_CAPACITY_LEVEL] ?? '0', 10) || 0 });
                        },
                    },
                    withdraw_all_btn: {
                        visible: canRead,
                        disableSection: !canWithdraw,
                        onPointerTap: () => {
                            if (canWithdraw) onWithdrawAll();
                        },
                    },
                    start_deposit_btn: {
                        caption: canRead ? '${wiredchests.start_deposit}' : '${wiredchests.donate}',
                        disableSection: startDepositDisabled,
                        onPointerTap: () => {
                            if (!startDepositDisabled) startWiredChestDeposit(send, chestId);
                        },
                    },
                    view_logs_btn: {
                        visible: canRead,
                        disableSection: !canRead,
                        onPointerTap: () => {
                            if (canRead) requestWiredChestLogs(send, chestId);
                        },
                    },
                    item_count_text_bottom: { visible: !canRead, caption: t('wiredchests.space_used', '', { count: String(count), total }) },
                }}
            />
            {lockInfo && (lockInfo.chestId === chestId) && (
                <LockInfoBubble
                    anchor={lockInfo.anchor}
                    onClose={() => setLockInfo(undefined)}
                />
            )}
        </>
    );
};
