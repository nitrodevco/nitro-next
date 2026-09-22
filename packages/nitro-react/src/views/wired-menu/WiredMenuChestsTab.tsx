/**
 * The wired menu's chests tab - `WiredMenuChestsTab` on `chests_container`: locking and unlocking
 * the user's own chests in the room, locking every chest (owner or staff, after a confirmation),
 * and the room's last ten chest transactions (`TransactionPreviewTableObject`) with a button to
 * the full transaction log, which is the wired trading windows' own.
 *
 * The reference server (turbo-cloud) implements no chest or transaction packets, so against it
 * the tab stays on its loading view.
 */
import type { IWiredTransactionInfo } from '@nitrodevco/nitro-packets';

import { lockAllWiredChests, lockOwnWiredChests, openWiredUserProfile, viewWiredChestsLogsInDetail } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredIsRoomOwnerOrStaff, useWiredStore } from '#base/context/wired';
import { Border, Box, Button, ThemeText } from '#base/theme';

import { WiredTableCell, WiredTableColumn, WiredTableView } from '../wired-common/WiredTableView';

const ChestButton = ({ label, disabled, onPress, left, top, width }: { label: string; disabled: boolean; onPress: () => void; left: number; top: number; width: number }) => (
    <Box
        alpha={disabled ? 0.5 : 1}
        layout={{ position: 'absolute', left, top, width, height: 30 }}
    >
        <Button
            variant="3"
            disabled={disabled}
            onPointerTap={onPress}
            layout={{ width, height: 30 }}
        >
            {label}
        </Button>
    </Box>
);

export const WiredMenuChestsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const preview = useWiredStore(x => x.chestsPreview);
    const lockPending = useWiredStore(x => x.chestsLockPending);
    const hasWritePermission = useWiredHasWritePermission();
    const isRoomOwnerOrStaff = useWiredIsRoomOwnerOrStaff();

    const loc = (key: string) => t(key, '');
    const logs = preview ?? [];

    const columns: WiredTableColumn[] = [
        { id: 'type', title: loc('wiredmenu.chests.room_logs.column.type'), widthFactor: 0.28 },
        { id: 'username', title: loc('wiredmenu.chests.room_logs.column.username'), widthFactor: 0.24 },
        { id: 'withdraws', title: loc('wiredmenu.chests.room_logs.column.withdraws'), widthFactor: 0.24 },
        { id: 'deposits', title: loc('wiredmenu.chests.room_logs.column.deposits'), widthFactor: 0.24 },
    ];

    // `TransactionPreviewTableObject.summarize`.
    const summarize = (furni: number, coins: number): string => {
        if ((furni <= 0) && (coins <= 0)) return '-';
        if ((furni > 0) && (coins === 0)) return t('wiredmenu.chests.room_logs.only_furni', '', { amount: String(furni) });
        if ((furni === 0) && (coins > 0)) return t('wiredmenu.chests.room_logs.only_coins', '', { amount: String(coins) });

        return t('wiredmenu.chests.room_logs.furni_and_coins', '', { amount: String(furni), amount2: String(coins) });
    };

    const getCell = (info: IWiredTransactionInfo, columnId: string): WiredTableCell => {
        switch (columnId) {
            case 'type': return { text: t(`wiredmenu.chests.transaction.type.${info.transactionType}`, `wiredmenu.chests.transaction.type.${info.transactionType}`) };
            case 'username': return { type: 'link', text: info.userName, inspectable: true, onLinkClick: () => openWiredUserProfile(send, info.userId) };
            case 'deposits': return { text: summarize(info.depositFurniCount, info.depositCoinsCount) };
            default: return { text: summarize(info.withdrawFurniCount, info.withdrawCoinsCount) };
        }
    };

    return (
        <>
            <Box layout={{ position: 'absolute', left: 14, top: 18, width: 472, height: 110 }}>
                <ThemeText
                    text={t('wiredmenu.chests.chest_control', 'wiredmenu.chests.chest_control')}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                />
                <Border
                    variant="3"
                    tintColor="#dadada"
                    layout={{ position: 'absolute', left: 0, top: 20, width: 472, height: 90 }}
                >
                    <ChestButton
                        label={t('wiredmenu.chests.chest_control.lock_own', 'wiredmenu.chests.chest_control.lock_own')}
                        disabled={!hasWritePermission || lockPending}
                        onPress={() => lockOwnWiredChests(send, true)}
                        left={10}
                        top={10}
                        width={221}
                    />
                    <ChestButton
                        label={t('wiredmenu.chests.chest_control.unlock_own', 'wiredmenu.chests.chest_control.unlock_own')}
                        disabled={!hasWritePermission || lockPending}
                        onPress={() => lockOwnWiredChests(send, false)}
                        left={241}
                        top={10}
                        width={221}
                    />
                    <ChestButton
                        label={t('wiredmenu.chests.chest_control.lock_all', 'wiredmenu.chests.chest_control.lock_all')}
                        disabled={!isRoomOwnerOrStaff || lockPending}
                        onPress={() => lockAllWiredChests(send)}
                        left={10}
                        top={50}
                        width={221}
                    />
                </Border>
            </Box>
            <Box layout={{ position: 'absolute', left: 14, top: 139, width: 472, height: 228 }}>
                <ThemeText
                    text={t('wiredmenu.chests.room_logs', 'wiredmenu.chests.room_logs')}
                    textStyle="u_regular"
                    flashFormat={{ bold: true }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 0, top: 0, height: 17 }}
                />
                {/* `title_extra` grows with `auto_size` left but carries `WINDOW_PARAM_ON_RESIZE_ALIGN_RIGHT`, so it keeps its right edge. */}
                <ThemeText
                    text={t('wiredmenu.chests.room_logs.extra', 'wiredmenu.chests.room_logs.extra')}
                    textStyle="u_regular"
                    textOptions={{ align: 'right' }}
                    alpha={0.5}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 272, top: 0, width: 197, height: 17 }}
                />
                <Box
                    alpha={logs.length ? 1 : 0.5}
                    eventMode={logs.length ? 'auto' : 'none'}
                    layout={{ position: 'absolute', left: 0, top: 20, width: 472, height: 168 }}
                >
                    <WiredTableView
                        columns={columns}
                        rows={logs}
                        getRowId={info => String(info.transactionId)}
                        getCell={getCell}
                        layout={{ width: 472, height: 168, flex: 0 }}
                    />
                </Box>
                <ChestButton
                    label={t('wiredmenu.chests.room_logs.view_detail', 'wiredmenu.chests.room_logs.view_detail')}
                    disabled={false}
                    onPress={() => viewWiredChestsLogsInDetail(send)}
                    left={0}
                    top={197}
                    width={114}
                />
            </Box>
        </>
    );
};
