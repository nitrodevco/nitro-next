/**
 * One network's connected rooms - Flash `roomevents/wired_link/WiredLinkConnectionsView` on
 * `wired_link_connections_view_xml`, captioned `wiredlink.connections.title`: a `TableView` of
 * `WiredLinkConnectionTableObject`s (room name, room id, Link id, self-receiving, `Visit`), the
 * network's name with "Rename" (or Enter), "Delete network" behind a confirm, and the status line
 * (grey while loading, red for an error).
 */
import type { WiredLinkConnectionType } from '@nitrodevco/nitro-packets';

import { confirmDeleteWiredLinkNetwork, hideWiredLinkConnections, renameWiredLinkNetwork, setWiredLinkConnectionsNameInput, visitWiredLinkRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { WIRED_LINK_CONNECTIONS_FRAME_ID, WiredLinkConnectionsState } from '#base/context/wired';
import { TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';

/** `showLoading` / `showError`'s `textColor`. */
const STATUS_LOADING_COLOR = 5592405;
const STATUS_ERROR_COLOR = 11351092;

export interface WiredLinkConnectionsViewProps {
    view: WiredLinkConnectionsState;
}

export const WiredLinkConnectionsView = ({ view }: WiredLinkConnectionsViewProps) => {
    const t = useTranslation();
    const { send } = useWebSocketContext();

    const columns: TableColumn[] = [
        { id: 'room', title: t('wiredlink.column.room', 'wiredlink.column.room'), widthFactor: 0.28, alignment: 'left' },
        { id: 'room_id', title: t('wiredlink.column.room_id', 'wiredlink.column.room_id'), widthFactor: 0.2 },
        { id: 'furni', title: t('wiredlink.column.furni', 'wiredlink.column.furni'), widthFactor: 0.2 },
        { id: 'receive_local', title: t('wiredlink.column.receive_local', 'wiredlink.column.receive_local'), widthFactor: 0.2 },
        { id: 'visit', title: '', widthFactor: 0.12 },
    ];

    // `WiredLinkConnectionTableObject.getTableCell`.
    const getCell = (connection: WiredLinkConnectionType, columnId: string): TableCell => {
        switch (columnId) {
            case 'room': return { text: connection.roomName, inspectable: true, textFieldValue: connection.roomName };
            case 'room_id': return { text: String(connection.roomId) };
            case 'furni': return { text: String(connection.furniId) };
            case 'receive_local': return { text: t(connection.receiveLocal ? 'wiredlink.receive_local.yes' : 'wiredlink.receive_local.no') };
            default: return { type: 'link', text: t('wiredlink.visit_room', 'wiredlink.visit_room'), onLinkClick: () => visitWiredLinkRoom(send, connection.roomId) };
        }
    };

    const rename = () => renameWiredLinkNetwork(send, view.networkId, view.nameInput);
    const confirmDelete = () => confirmDeleteWiredLinkNetwork(send);

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_link_connections_view_xml"
            frame={{ id: WIRED_LINK_CONNECTIONS_FRAME_ID, centered: true, resizeDirection: 'y', onClose: hideWiredLinkConnections }}
            bindings={{
                wired_link_connections: { caption: t('wiredlink.connections.title', 'wiredlink.connections.title', { name: view.networkName }) },
                connections_table: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={view.connections}
                            getRowId={connection => `${connection.roomId}:${connection.furniId}`}
                            getCell={getCell}
                            canSelect={false}
                            emptyText=""
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                network_name: { caption: view.nameInput, onChange: setWiredLinkConnectionsNameInput, onEnter: rename },
                rename_btn: { onPointerTap: rename },
                delete_btn: { onPointerTap: confirmDelete },
                delete_caption: { onPointerTap: confirmDelete },
                status_text: { caption: view.status, color: view.statusError ? STATUS_ERROR_COLOR : STATUS_LOADING_COLOR },
            }}
        />
    );
};
