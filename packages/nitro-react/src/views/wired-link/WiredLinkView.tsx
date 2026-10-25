/**
 * The WIRED Link window - Flash `roomevents/wired_link/WiredLinkView` on `wired_link_view_xml`:
 * the network the Link is connected to (`selected_text`) with "Clear connection", "My networks"
 * (a `TableView` of `WiredLinkNetworkTableObject`s: name, connected Links, status - `Connect`,
 * `Connected` or `Linked in room` - and `Manage`), "New network:" with "Create network", the
 * "Receive messages sent by this room" checkbox, which saves at once, and the status line.
 *
 * The window is the Flash template itself; the code fills it as `WiredLinkView` does. The rows are
 * the controller's networks in `WiredLinkNetworkTableObject.compare` order, each `Connected` when it
 * is the Link's network (`_current`).
 */
import type { WiredLinkNetworkType } from '@nitrodevco/nitro-packets';

import { compareWiredLinkNetworks, createWiredLinkNetwork, getWiredLinkNetwork, hideWiredLink, requestWiredLinkConnections, saveWiredLink, setWiredLinkReceiveLocal } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useTranslation } from '#base/context/system';
import { useWiredLinkActions, useWiredStore, WIRED_LINK_FRAME_ID } from '#base/context/wired';
import { TemplateWindow } from '#base/theme';
import { TableCell, TableColumn, TableView } from '#base/views/shared/table/TableView';
import { uintToHexColor } from '#base/wired';

/** `WiredLinkNetworkTableObject`'s status colours: connected, linked in room. */
const STATUS_CONNECTED_COLOR = uintToHexColor(2650950);
const STATUS_LINKED_COLOR = uintToHexColor(5592405);

export const WiredLinkView = () => {
    const t = useTranslation();
    const { send } = useWebSocketContext();
    const networks = useWiredStore(x => x.linkNetworks);
    const selectedNetworkId = useWiredStore(x => x.linkSelectedNetworkId);
    const receiveLocal = useWiredStore(x => x.linkReceiveLocal);
    const status = useWiredStore(x => x.linkStatus);
    const nameInput = useWiredStore(x => x.linkNameInput);
    const { patchWiredLink } = useWiredLinkActions();
    const setNameInput = (linkNameInput: string) => patchWiredLink({ linkNameInput });

    const rows = [ ...networks ].sort(compareWiredLinkNetworks);
    const selected = getWiredLinkNetwork(selectedNetworkId);

    const columns: TableColumn[] = [
        { id: 'name', title: t('wiredlink.column.name', 'wiredlink.column.name'), widthFactor: 0.44, alignment: 'left' },
        { id: 'count', title: t('wiredlink.column.count', 'wiredlink.column.count'), widthFactor: 0.22 },
        { id: 'status', title: t('wiredlink.column.status', 'wiredlink.column.status'), widthFactor: 0.21 },
        { id: 'manage', title: '', widthFactor: 0.13 },
    ];

    // `WiredLinkNetworkTableObject.getTableCell`.
    const getCell = (network: WiredLinkNetworkType, columnId: string): TableCell => {
        const current = network.id === selectedNetworkId;

        switch (columnId) {
            case 'name': return { text: network.name };
            case 'count': return { text: String(network.connectionCount) };
            case 'status':
                if (!current && !network.linkedInCurrentRoom) return { type: 'link', text: t('wiredlink.status.connect', 'wiredlink.status.connect'), onLinkClick: () => saveWiredLink(send, network.id, receiveLocal) };

                return { text: t(current ? 'wiredlink.status.connected' : 'wiredlink.status.linked_in_room'), textColor: current ? STATUS_CONNECTED_COLOR : STATUS_LINKED_COLOR };
            default: return { type: 'link', text: t('wiredlink.manage', 'wiredlink.manage'), onLinkClick: () => requestWiredLinkConnections(send, network.id) };
        }
    };

    // `onReceiveLocalChanged`: the box saves when it differs from what the controller has.
    const toggleReceiveLocal = () => setWiredLinkReceiveLocal(send, !receiveLocal);
    const clear = () => saveWiredLink(send, '0', receiveLocal);

    return (
        <TemplateWindow
            id="habbo-user-defined-room-events-com/wired_link_view_xml"
            frame={{ id: WIRED_LINK_FRAME_ID, centered: true, resizeDirection: 'y', onClose: hideWiredLink }}
            bindings={{
                // `updateConnectionText`.
                selected_text: { caption: selected ? t('wiredlink.selected', 'wiredlink.selected', { name: selected.name }) : '${wiredlink.selected.none}' },
                clear_btn: { onPointerTap: clear },
                clear_caption: { onPointerTap: clear },
                table_view: {
                    children: (
                        <TableView
                            columns={columns}
                            rows={rows}
                            getRowId={network => network.id}
                            getCell={getCell}
                            canSelect
                            emptyText=""
                            layout={{ position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' }}
                        />
                    ),
                },
                network_name: { caption: nameInput, onChange: setNameInput },
                create_btn: { onPointerTap: () => createWiredLinkNetwork(send, nameInput) },
                receive_local: { selected: receiveLocal, onPointerTap: toggleReceiveLocal },
                receive_label_region: { onPointerTap: toggleReceiveLocal },
                receive_label: { onPointerTap: toggleReceiveLocal },
                // `setStatus`.
                status_text: { caption: status, visible: status.length > 0 },
            }}
        />
    );
};
