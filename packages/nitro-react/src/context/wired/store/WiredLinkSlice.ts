/**
 * The WIRED Link window - Flash `WiredLinkController` (`roomevents/wired_link`) and the state its
 * two views keep: `WiredLinkView` (`wired_link_view_xml`: the selected network, "My networks",
 * the new network field, "Receive messages sent by this room" and the status line) and
 * `WiredLinkConnectionsView` (`wired_link_connections_view_xml`: one network's connected rooms,
 * rename and delete).
 *
 * The window belongs to one Link furni (`linkFurniId`) the user owns; `linkFurniId` 0 is
 * `invalidate`d - no window. Network ids are strings and `"0"` is no network.
 */
import type { WiredLinkConnectionType, WiredLinkNetworkType } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/** `WiredLinkController.SAVE` / `CREATE` / `RENAME` / `DELETE` / `CONNECTIONS` - the operation a result answers. */
export const WIRED_LINK_OPERATION_SAVE = 1;
export const WIRED_LINK_OPERATION_CREATE = 2;
export const WIRED_LINK_OPERATION_RENAME = 3;
export const WIRED_LINK_OPERATION_DELETE = 4;
export const WIRED_LINK_OPERATION_CONNECTIONS = 5;

/** No network. */
export const WIRED_LINK_NO_NETWORK = '0';

/** The frame ids, which are also what brings each window to the front. */
export const WIRED_LINK_FRAME_ID = 'wired_link';
export const WIRED_LINK_CONNECTIONS_FRAME_ID = 'wired_link_connections';

/** `WiredLinkConnectionsView`'s state while it is up. */
export interface WiredLinkConnectionsState {
    networkId: string;
    /** `_networkName` - the name the caption shows. */
    networkName: string;
    /** `network_name`'s text. */
    nameInput: string;
    connections: WiredLinkConnectionType[];
    /** `status_text` and whether it is an error (`11351092`) rather than loading (`5592405`). */
    status: string;
    statusError: boolean;
}

type State = {
    linkRoomId: number;
    linkFurniId: number;
    /** `selectedNetworkId` - the network the server says the Link is connected to. */
    linkSelectedNetworkId: string;
    /** `_-s1O` - the network the last save asked for. */
    linkSavedNetworkId: string;
    linkReceiveLocal: boolean;
    linkNetworks: WiredLinkNetworkType[];
    /** `_-O10` - the network whose connections were asked for and have not arrived. */
    linkPendingConnectionsId: string;
    linkVisible: boolean;
    /** `WiredLinkView`'s `status_text`. */
    linkStatus: string;
    /** `WiredLinkView`'s `network_name`. */
    linkNameInput: string;
    linkConnections: WiredLinkConnectionsState | null;
};

type Actions = {
    patchWiredLink: (patch: Partial<State> | ((state: State) => Partial<State>)) => void;
};

export const WiredLinkSliceInitialState: State = {
    linkRoomId: 0,
    linkFurniId: 0,
    linkSelectedNetworkId: WIRED_LINK_NO_NETWORK,
    linkSavedNetworkId: WIRED_LINK_NO_NETWORK,
    linkReceiveLocal: false,
    linkNetworks: [],
    linkPendingConnectionsId: WIRED_LINK_NO_NETWORK,
    linkVisible: false,
    linkStatus: '',
    linkNameInput: '',
    linkConnections: null,
};

export type WiredLinkSlice = State & Actions;

export const createWiredLinkSlice: StateCreator<WiredLinkSlice, [], [], WiredLinkSlice> = set => ({
    ...WiredLinkSliceInitialState,
    patchWiredLink: patch => set(patch),
});
