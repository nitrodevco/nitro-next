/**
 * The wired menu's chests tab - `WiredMenuChestsTab` on `chests_container` of `wired_menu_view_xml`:
 * locking and unlocking the user's own chests in the room, locking every chest (owner or staff,
 * after a confirmation), and the room's last ten chest transactions (`TransactionPreviewTableObject`)
 * in `logs_table_container`, with a button to the full transaction log, which is the wired trading
 * windows' own.
 *
 * `updateButtonsUI`: the own chests' buttons need write permission, locking all the owner or staff,
 * and all three wait out a lock just sent.
 *
 * The reference server (turbo-cloud) implements no chest or transaction packets, so against it
 * the tab stays on its loading view.
 */
import type { IWiredTransactionInfo } from '@nitrodevco/nitro-packets';

import { lockAllWiredChests, lockOwnWiredChests, openWiredUserProfile, viewWiredChestsLogsInDetail } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredHasWritePermission, useWiredIsRoomOwnerOrStaff, useWiredStore } from '#base/context/wired';
import { Box, TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

export const WiredMenuChestsTab = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const preview = useWiredStore(x => x.chestsPreview);
    const lockPending = useWiredStore(x => x.chestsLockPending);
    const hasWritePermission = useWiredHasWritePermission();
    const isRoomOwnerOrStaff = useWiredIsRoomOwnerOrStaff();

    const loc = (key: string) => t(key, '');

    // `createTransactionTable`.
    const columns: TableColumn[] = [
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

    const getCell = (info: IWiredTransactionInfo, columnId: string): TableCell => {
        switch (columnId) {
            case 'type': return { text: t(`wiredmenu.chests.transaction.type.${info.transactionType}`, `wiredmenu.chests.transaction.type.${info.transactionType}`) };
            case 'username': return { type: 'link', text: info.userName, inspectable: true, onLinkClick: () => openWiredUserProfile(send, info.userId) };
            case 'deposits': return { text: summarize(info.depositFurniCount, info.depositCoinsCount) };
            default: return { text: summarize(info.withdrawFurniCount, info.withdrawCoinsCount) };
        }
    };

    /*
     * `updateTransactionLogsUI`: `Util.disableSection(logs_table_container, logs.length == 0)`. The
     * section's walk reaches the `TableView`'s windows in Flash, but a binding's `disableSection`
     * stops at what the layout holds, so the table the code adds is faded and disabled here.
     */
    const tableDisabled = (preview !== null) && !preview.length;

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_menu_view_xml"
            part="chests_container"
            bindings={{
                '': { visible: true },
                lock_own_button: { disableSection: !hasWritePermission || lockPending, onPointerTap: () => lockOwnWiredChests(send, true) },
                unlock_own_button: { disableSection: !hasWritePermission || lockPending, onPointerTap: () => lockOwnWiredChests(send, false) },
                lock_all_button: { disableSection: !isRoomOwnerOrStaff || lockPending, onPointerTap: () => lockAllWiredChests(send) },
                logs_table_container: {
                    children: (
                        <Box
                            alpha={tableDisabled ? 0.5 : 1}
                            eventMode={tableDisabled ? 'none' : 'auto'}
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        >
                            <TableView
                                columns={columns}
                                rows={preview ?? []}
                                getRowId={info => String(info.transactionId)}
                                getCell={getCell}
                                layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                            />
                        </Box>
                    ),
                },
                view_in_detail_button: { onPointerTap: () => viewWiredChestsLogsInDetail(send) },
            }}
        />
    );
};
