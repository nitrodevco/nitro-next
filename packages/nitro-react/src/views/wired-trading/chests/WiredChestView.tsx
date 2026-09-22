/**
 * The wired chest window - Flash `wired_trading/chests/WiredChestWrapperView` on
 * `chest_generic_xml`: a header with the chest's description and its two settings buttons, the
 * contents of the chest type in the middle (`WiredChestFurniContentsView` / `WiredChestCoinContentsView`),
 * and a footer with the lock options, the capacity and the buttons. The window is as wide as the
 * contents plus 2 and as high as header, contents and footer plus the frame's 35.
 *
 * What the viewer may do (`canRead` / `canEdit` / `canWithdraw`, all "owner, or the wired menu's
 * read / write permission") and whether the chest has the wired upgrade decide the layout
 * (`updateLayout`) and which parts are disabled (`updateUI`):
 *
 * - no read access: only the contents, a "space used" line and a "donate" button;
 * - read access, no wired upgrade: the settings buttons, the capacity text and upgrade button,
 *   the log and withdraw-all buttons;
 * - wired upgrade: also the lock options, the capacity input and the lock info bubble.
 *
 * The lock checkbox asks first: locking as someone other than the owner (`wiredchests.lock.confirm`)
 * and unlocking always (`wiredchests.unlock.confirm`). Every change to the options goes out at
 * once (`SetChestOptions`); the capacity input goes out on Enter or when it loses focus, and is
 * held to the chest's maximum capacity while typed. The form is refilled from the chest furni's
 * data whenever that changes (`updateUIOptions`).
 *
 * The furni chest's window can be resized in Flash (415-595 x 390-730); here it keeps the
 * layout's size.
 */
import { useState } from 'react';

import { getWiredChestMaxCapacity, isWiredStarterChest, requestWiredChestLogs, setWiredChestOptions, startWiredChestDeposit, withdrawAllFromWiredChest } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useConfigData, useInterpolate, useSystemStore, useTranslation, useWindowActions } from '#base/context/system';
import { useWiredHasReadPermission, useWiredHasWritePermission } from '#base/context/wired';
import {
    useWiredChestActions, useWiredTradingStore, WIRED_CHEST_KEY_AUTO_LOCK, WIRED_CHEST_KEY_CAPACITY, WIRED_CHEST_KEY_CAPACITY_LEVEL, WIRED_CHEST_KEY_DESC, WIRED_CHEST_KEY_EVERYONE_CAN_DONATE,
    WIRED_CHEST_KEY_IS_WIRED_ENABLED, WIRED_CHEST_KEY_LOCKED, WIRED_CHEST_KEY_NAME, WIRED_CHEST_TYPE_COIN, WiredChestFurniData, WiredChestView as WiredChestViewData,
} from '#base/context/wired-trading';
import { Border, Box, Button, CheckBox, ContainerButton, Frame, LayoutImage, Region, TextInput, ThemeImage, ThemeText } from '#base/theme';
import { getWiredTradingBubbleAnchor, WiredTradingBubbleAnchor } from '#base/views/wired-trading/common/wiredTradingBubbleAnchor';
import { WiredTradingInfoBubble } from '#base/views/wired-trading/common/WiredTradingInfoBubble';
import { WiredTradingPlusButton } from '#base/views/wired-trading/common/WiredTradingPlusButton';

import { WIRED_COIN_CHEST_HEIGHT, WIRED_COIN_CHEST_WIDTH, WiredChestCoinContentsView } from './WiredChestCoinContentsView';
import { WIRED_FURNI_CHEST_HEIGHT, WIRED_FURNI_CHEST_WIDTH, WiredChestFurniContentsView } from './WiredChestFurniContentsView';

const HEADER_HEIGHT = 51;
const FOOTER_HEIGHT = 123;
/** `§_-G2c§`: the frame's title bar and bottom edge around `main_list`. */
const FRAME_CHROME_HEIGHT = 35;
/** `§_-92g§`. */
const FRAME_CHROME_WIDTH = 2;
/** The frame's `margin_*` vars: `main_list` starts under the title bar, flush with the edges. */
const FRAME_MARGINS = [ 0, 33, 0, 0 ] as const;
/** `lock_info_bubble_texts`: its 353px texts wrap at the field width less the 2px gutters. */
const BUBBLE_TEXT_WIDTH = 353;
const BUBBLE_TEXT_WRAP = BUBBLE_TEXT_WIDTH - 4;
const TEXT_BLEND = 0.6;

/** The rules of `lock_info_bubble_texts`: seven about locking, four about capacity. */
const LOCK_RULES = [ 1, 2, 3, 4, 5, 6, 7 ];
const CAPACITY_RULES = [ 1, 2, 3, 4 ];

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

interface OptionRowProps {
    selected: boolean;
    disabled: boolean;
    label: string;
    onToggle: () => void;
}

/** A checkbox of `locking_options` and its caption, 5 apart. */
const OptionRow = ({ selected, disabled, label, onToggle }: OptionRowProps) => (
    <Box layout={{ flexDirection: 'row', height: 16, gap: 5, alignItems: 'flex-start' }}>
        <CheckBox
            variant="3"
            selected={selected}
            disabled={disabled}
            onPointerTap={() => {
                if (!disabled) onToggle();
            }}
            layout={{ width: 15, height: 15, marginTop: 1 }}
        />
        <ThemeText
            text={label}
            textStyle="u_regular"
        />
    </Box>
);

/**
 * The header's 24x24 settings buttons: a `container_button` of style 7 around its `#icon`, both
 * `dynamic_style="button"` in `chest_generic` - so the icon's hover, press and disabled looks are
 * the style's, not a fade of its own.
 */
const HeaderIconButton = ({ icon, iconLeft, iconTop, iconWidth, iconHeight, right, tooltip, disabled, onPress }: { icon: string; iconLeft: number; iconTop: number; iconWidth: number; iconHeight: number; right: number; tooltip: string; disabled: boolean; onPress: () => void }) => (
    <Region
        tooltip={tooltip}
        layout={{ position: 'absolute', right, top: 7, width: 24, height: 24 }}
    >
        <ContainerButton
            variant="7"
            dynamicStyle="button"
            disabled={disabled}
            onPointerTap={() => {
                if (!disabled) onPress();
            }}
            layout={{ width: 24, height: 24 }}
        >
            <ThemeImage
                src={LayoutImage(icon)}
                bitmap={{ stretchedX: false, stretchedY: false, etchingColor: 0x48000000, fitSizeToContents: true }}
                dynamicRole="icon"
                layout={{ position: 'absolute', left: iconLeft, top: iconTop, width: iconWidth, height: iconHeight }}
            />
        </ContainerButton>
    </Region>
);

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
    const [ form, setForm ] = useState<ChestOptionsForm>(() => readOptions(furni.data));
    const [ formFrom, setFormFrom ] = useState(furni);
    const [ lockInfoAnchor, setLockInfoAnchor ] = useState<WiredTradingBubbleAnchor | undefined>(undefined);

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
    const width = contentsWidth + FRAME_CHROME_WIDTH;
    const height = HEADER_HEIGHT + contentsHeight + FOOTER_HEIGHT + FRAME_CHROME_HEIGHT;

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

    /** `onCapacityChange`: digits only, never above the maximum. */
    const onCapacityChange = (value: string) => {
        const digits = value.replace(/[^0-9]/g, '');

        setForm({ ...form, capacity: ((parseInt(digits, 10) || 0) > maxCapacity) ? String(maxCapacity) : digits });
    };

    const onWithdrawAll = () => showConfirm(interpolate('${wiredchests.withdraw_all.confirm.title}'), interpolate('${wiredchests.withdraw_all.confirm.desc}'), () => withdrawAllFromWiredChest(send, chestId));

    const showLocking = canRead && isWiredEnabled;
    const showCapacity = canRead;
    const showCapacityOverride = canRead && isWiredEnabled;

    return (
        <>
            <Frame
                variant="3"
                id="wired-chest"
                caption={chestName.length ? chestName : t(isCoinChest ? 'wiredchests.coin_chest' : 'wiredchests.furni_chest')}
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                resizeDirection="none"
                defaultPosition={{ x: 60, y: 50 }}
                onClose={onClose}
                margins={FRAME_MARGINS}
                layout={{ position: 'absolute', width, height }}
            >
                <Box layout={{ position: 'absolute', left: 0, top: 0, width, height: HEADER_HEIGHT + contentsHeight + FOOTER_HEIGHT, flexDirection: 'column' }}>
                    <Box layout={{ position: 'relative', width, height: HEADER_HEIGHT, flexShrink: 0 }}>
                        <Region
                            backgroundColor="#dadada"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: HEADER_HEIGHT }}
                        />
                        <Region
                            backgroundColor="#c0c0c0"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 50, height: 1 }}
                        />
                        <ThemeText
                            text={interpolate(description)}
                            textStyle="u_bold"
                            alpha={TEXT_BLEND}
                            textOptions={{ wordWrap: true, wordWrapWidth: 376 }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 10, top: 10, width: 380 }}
                        />
                        {canRead && (
                            <>
                                <HeaderIconButton
                                    icon="wired/wired_chests_bell_icon.png"
                                    iconLeft={6}
                                    iconTop={4}
                                    iconWidth={12}
                                    iconHeight={15}
                                    right={39}
                                    tooltip={interpolate('${tooltip.notification_settings}')}
                                    disabled={!isOwner}
                                    onPress={() => setChestNotificationSettings({ chestId, chestType })}
                                />
                                <HeaderIconButton
                                    icon="wired/wired_chests_gear_icon.png"
                                    iconLeft={5}
                                    iconTop={5}
                                    iconWidth={14}
                                    iconHeight={14}
                                    right={10}
                                    tooltip={interpolate('${tooltip.settings}')}
                                    disabled={!isOwner}
                                    onPress={() => setChestSettings({ chestId, chestType, furniTypeId: furni.furniTypeId, isStarterChest })}
                                />
                            </>
                        )}
                    </Box>
                    <Box layout={{ position: 'relative', width, height: contentsHeight, flexShrink: 0, paddingLeft: 1 }}>
                        {isCoinChest
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
                                )}
                    </Box>
                    <Box layout={{ position: 'relative', width, height: FOOTER_HEIGHT, flexShrink: 0 }}>
                        <Region
                            backgroundColor="#dadada"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 110 }}
                        />
                        <Border
                            variant="2"
                            tintColor="#dadada"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 87, height: 36 }}
                        />
                        <Region
                            backgroundColor="#c0c0c0"
                            layout={{ position: 'absolute', left: 1, right: 1, top: 0, height: 1 }}
                        />
                        <Box layout={{ position: 'absolute', left: 17, right: 0, top: 7, flexDirection: 'column', gap: 4 }}>
                            {showLocking && (
                                <Box layout={{ flexDirection: 'column', height: 41, gap: 4 }}>
                                    <OptionRow
                                        selected={form.locked}
                                        disabled={!isOwner && (!isRoomOwner || form.locked)}
                                        label={t('wiredchests.lock_chest')}
                                        onToggle={onToggleLock}
                                    />
                                    <OptionRow
                                        selected={form.autoLock}
                                        disabled={!isOwner}
                                        label={t('wiredchests.auto_lock_chest')}
                                        onToggle={() => applyOptions({ ...form, autoLock: !form.autoLock })}
                                    />
                                    <Region
                                        backgroundColor="#b0b0b0"
                                        layout={{ width: 429, height: 1 }}
                                    />
                                </Box>
                            )}
                            {showCapacity && (
                                <Box layout={{ position: 'relative', height: 30 }}>
                                    {showCapacityOverride
                                        ? (
                                                <Box layout={{ position: 'absolute', left: 0, top: 2, height: 22, flexDirection: 'row', gap: 6 }}>
                                                    <ThemeText
                                                        text={t('wiredchests.capacity')}
                                                        textStyle="u_regular"
                                                        layout={{ marginTop: 2 }}
                                                    />
                                                    <Box
                                                        alpha={isOwner ? 1 : 0.5}
                                                        eventMode={isOwner ? 'passive' : 'none'}
                                                        layout={{ width: 65, height: 22 }}
                                                    >
                                                        <Border
                                                            variant="4"
                                                            layout={{ width: 65, height: 22 }}
                                                        >
                                                            <TextInput
                                                                flashPlacement
                                                                restrict="0-9"
                                                                backgroundColor={null}
                                                                focusedBackgroundColor={null}
                                                                value={form.capacity}
                                                                onChange={onCapacityChange}
                                                                onEnter={() => applyOptions(form)}
                                                                onFocusChange={(focused) => {
                                                                    if (!focused && isOwner) applyOptions(form);
                                                                }}
                                                                textStyle="u_regular"
                                                                layout={{ position: 'absolute', left: 5, top: 3, width: 55, height: 17 }}
                                                            />
                                                        </Border>
                                                    </Box>
                                                </Box>
                                            )
                                        : (
                                                <ThemeText
                                                    text={t('wiredchests.space_used2', '', { count: String(count), total })}
                                                    textStyle="u_regular"
                                                    alpha={TEXT_BLEND}
                                                    layout={{ position: 'absolute', left: 0, top: 4 }}
                                                />
                                            )}
                                    <Box layout={{ position: 'absolute', right: 16, top: 0, height: 25, flexDirection: 'row', gap: 6 }}>
                                        <ThemeText
                                            text={t('wiredchests.max_capacity', '', { max_capacity: String(maxCapacity) })}
                                            textStyle="u_regular"
                                            alpha={TEXT_BLEND}
                                            layout={{ marginTop: 4 }}
                                        />
                                        <Box layout={{ marginTop: 2 }}>
                                            <WiredTradingPlusButton
                                                disabled={isStarterChest || !isOwner}
                                                tooltip={upgradeTooltip}
                                                onPress={() => setChestUpgrade({ chestId, chestType, furniTypeId: furni.furniTypeId, capacityLevel: parseInt(data[WIRED_CHEST_KEY_CAPACITY_LEVEL] ?? '0', 10) || 0 })}
                                            />
                                        </Box>
                                    </Box>
                                    <Region
                                        backgroundColor="#b0b0b0"
                                        layout={{ position: 'absolute', left: 0, top: 29, width: 429, height: 1 }}
                                    />
                                </Box>
                            )}
                        </Box>
                        {/* After the options, which would otherwise take its clicks. */}
                        {showLocking && (
                            <Region
                                cursor="pointer"
                                onPointerTap={event => setLockInfoAnchor(getWiredTradingBubbleAnchor(event))}
                                layout={{ position: 'absolute', right: 19, top: 6, width: 18, height: 18 }}
                            >
                                <ThemeImage
                                    src={LayoutImage('shared/icons_info_grey.png')}
                                    bitmap={{ stretchedX: false, stretchedY: false, fitSizeToContents: true }}
                                    layout={{ position: 'absolute', left: 0, top: 0, width: 18, height: 18 }}
                                />
                            </Region>
                        )}
                        <Box layout={{ position: 'absolute', left: 17, top: 87, height: 30, flexDirection: 'row', gap: 13 }}>
                            {canRead && (
                                <Button
                                    variant="3"
                                    disabled={!canWithdraw}
                                    onPointerTap={onWithdrawAll}
                                    layout={{ width: 89, height: 30 }}
                                >
                                    {t('wiredchests.withdraw_all')}
                                </Button>
                            )}
                            <Button
                                variant="3"
                                disabled={!everyoneCanDonate && (!canEdit || (form.locked && !isOwner))}
                                onPointerTap={() => startWiredChestDeposit(send, chestId)}
                                layout={{ width: 92, height: 30 }}
                            >
                                {t(canRead ? 'wiredchests.start_deposit' : 'wiredchests.donate')}
                            </Button>
                        </Box>
                        {canRead
                            ? (
                                    <Button
                                        variant="3"
                                        onPointerTap={() => requestWiredChestLogs(send, chestId)}
                                        layout={{ position: 'absolute', right: 17, top: 87, width: 73, height: 30 }}
                                    >
                                        {t('wiredchests.view_logs')}
                                    </Button>
                                )
                            : (
                                    <ThemeText
                                        text={t('wiredchests.space_used', '', { count: String(count), total })}
                                        textStyle="u_regular"
                                        alpha={TEXT_BLEND}
                                        layout={{ position: 'absolute', right: 15, top: 94 }}
                                    />
                                )}
                    </Box>
                </Box>
            </Frame>
            {lockInfoAnchor && (
                <WiredTradingInfoBubble
                    anchor={lockInfoAnchor}
                    width={385}
                    height={536}
                    onClose={() => setLockInfoAnchor(undefined)}
                >
                    <Box layout={{ flexDirection: 'column', width: BUBBLE_TEXT_WIDTH, gap: 1 }}>
                        <ThemeText
                            text={t('wiredchests.lock_info.title')}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                        />
                        <Box layout={{ width: 30, height: 7 }} />
                        <ThemeText
                            text={t('wiredchests.lock_info.desc')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: BUBBLE_TEXT_WRAP }}
                            verticalAlign="top"
                        />
                        {LOCK_RULES.map(rule => (
                            <ThemeText
                                key={`lock${rule}`}
                                text={t(`wiredchests.lock_info.rule_${rule}`)}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: BUBBLE_TEXT_WRAP }}
                                markup
                                verticalAlign="top"
                            />
                        ))}
                        <Box layout={{ width: 30, height: 14 }} />
                        <ThemeText
                            text={t('wiredchests.capacity_info.title')}
                            textStyle="u_bold"
                            textOptions={{ fontSize: 14 }}
                            verticalAlign="top"
                        />
                        <Box layout={{ width: 30, height: 7 }} />
                        <ThemeText
                            text={t('wiredchests.capacity_info.desc')}
                            textStyle="u_regular"
                            textOptions={{ wordWrap: true, wordWrapWidth: BUBBLE_TEXT_WRAP }}
                            verticalAlign="top"
                        />
                        {CAPACITY_RULES.map(rule => (
                            <ThemeText
                                key={`capacity${rule}`}
                                text={t(`wiredchests.capacity_info.rule_${rule}`)}
                                textStyle="u_regular"
                                textOptions={{ wordWrap: true, wordWrapWidth: BUBBLE_TEXT_WRAP }}
                                markup
                                verticalAlign="top"
                            />
                        ))}
                    </Box>
                </WiredTradingInfoBubble>
            )}
        </>
    );
};
