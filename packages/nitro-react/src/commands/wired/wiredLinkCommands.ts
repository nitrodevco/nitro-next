/**
 * What the WIRED Link window does - Flash `WiredLinkController`'s packet handlers and public
 * methods, and the parts of `WiredLinkView` / `WiredLinkConnectionsView` they drive. Each
 * request is checked the way the controller checks it (`canEdit`, `validName`, `canConnect`),
 * then sent; the windows only change when the answer arrives (`registerWiredLinkHandlers`).
 */
import { RoomObjectCategoryEnum, RoomObjectVariableEnum } from '@nitrodevco/nitro-api';
import {
    WiredLinkConfigurationInvalidatedMessageType, WiredLinkConfigurationMessageType, WiredLinkConnectionsMessageType, WiredLinkCreateNetworkComposer, WiredLinkDeleteNetworkComposer, WiredLinkGetConfigurationComposer,
    WiredLinkGetConnectionsComposer, WiredLinkNetworkType, WiredLinkOperationResultMessageType, WiredLinkRenameNetworkComposer, WiredLinkSaveConfigurationComposer,
} from '@nitrodevco/nitro-packets';

import { Send } from '#base/context/communication';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { WIRED_LINK_CONNECTIONS_FRAME_ID, WIRED_LINK_FRAME_ID, WIRED_LINK_NO_NETWORK, WIRED_LINK_OPERATION_CONNECTIONS, WIRED_LINK_OPERATION_CREATE, WIRED_LINK_OPERATION_DELETE, WIRED_LINK_OPERATION_RENAME, WIRED_LINK_OPERATION_SAVE, wiredStore } from '#base/context/wired';

import { openClientLink } from '../system/clientLinkCommands';

/** `WiredLinkController.validName`: at most 255 characters and not only white space. */
const NETWORK_NAME_MAX_LENGTH = 255;
/** `wiredlink.error.3` / `.5` - the codes the controller answers itself. */
const ERROR_INVALID_NAME = 3;
const ERROR_LINKED_IN_ROOM = 5;

/** The alert `showReceiveLocalInfo` opens (`_-2B`) and the confirm `delete_btn` opens (`_-62w`) - at most one each. */
let receiveLocalDialogId: number | null = null;
let deleteDialogId: number | null = null;

const forgetReceiveLocalDialog = () => {
    receiveLocalDialogId = null;
};

const forgetDeleteDialog = () => {
    deleteDialogId = null;
};

const closeDialog = (id: number | null) => {
    if (id !== null) systemStore.getState().closeDialog(id);
};

const closeReceiveLocalDialog = () => {
    closeDialog(receiveLocalDialogId);
    receiveLocalDialogId = null;
};

const closeDeleteDialog = () => {
    closeDialog(deleteDialogId);
    deleteDialogId = null;
};

const link = () => wiredStore.getState();

/** `WiredLinkController.ownsTarget`: the furni is in the active room and is the user's. */
const ownsTarget = (roomId: number, furniId: number): boolean => {
    const room = getRoom();

    if (!room || (roomId !== room.roomId)) return false;

    const roomObject = room.getRoomObject(furniId, RoomObjectCategoryEnum.Floor);

    return !!roomObject?.model && (roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureOwnerId) === userStore.getState().userId);
};

/** `matchesTarget`: an answer for the Link whose window is open. */
const matchesTarget = (roomId: number, furniId: number): boolean => {
    const { linkRoomId, linkFurniId } = link();

    return (linkFurniId !== 0) && (roomId === linkRoomId) && (furniId === linkFurniId) && ownsTarget(roomId, furniId);
};

/** `getNetwork`. */
export const getWiredLinkNetwork = (networkId: string): WiredLinkNetworkType | undefined => link().linkNetworks.find(network => network.id === networkId);

/** `WiredLinkNetworkTableObject.compare`: the networks linked in this room first, then by name. */
export const compareWiredLinkNetworks = (a: WiredLinkNetworkType, b: WiredLinkNetworkType): number => {
    if (a.linkedInCurrentRoom !== b.linkedInCurrentRoom) return a.linkedInCurrentRoom ? -1 : 1;

    return a.name.localeCompare(b.name);
};

/** `WiredLinkController.invalidate`: everything goes and both windows hide. */
export const invalidateWiredLink = () => {
    closeReceiveLocalDialog();
    closeDeleteDialog();

    if (link().linkFurniId === 0 && !link().linkVisible) return;

    link().patchWiredLink({
        linkRoomId: 0,
        linkFurniId: 0,
        linkPendingConnectionsId: WIRED_LINK_NO_NETWORK,
        linkNetworks: [],
        linkSelectedNetworkId: WIRED_LINK_NO_NETWORK,
        linkSavedNetworkId: WIRED_LINK_NO_NETWORK,
        linkReceiveLocal: false,
        linkVisible: false,
        linkConnections: null,
    });
};

/** `canEdit`: the window is for a Link the user still owns - otherwise it closes. */
const canEdit = (): boolean => {
    const { linkRoomId, linkFurniId } = link();

    if (ownsTarget(linkRoomId, linkFurniId)) return true;

    invalidateWiredLink();

    return false;
};

/** `WiredLinkView.setStatus`. */
const setStatus = (status: string) => link().patchWiredLink({ linkStatus: status });

/** `WiredLinkConnectionsView.showError`. */
const showConnectionsError = (code: number) => link().patchWiredLink(state => (state.linkConnections ? { linkConnections: { ...state.linkConnections, status: `\${wiredlink.error.${code}}`, statusError: true } } : {}));

/** `WiredLinkView.operationFailed` - `updateReceiveLocal` is the checkbox drawing `linkReceiveLocal`, nothing to do. */
const operationFailed = (code: number, operation: number) => {
    const connections = link().linkConnections;

    if ((operation === WIRED_LINK_OPERATION_RENAME) && connections && (connections.networkId !== WIRED_LINK_NO_NETWORK)) {
        showConnectionsError(code);

        return;
    }

    if ((operation === WIRED_LINK_OPERATION_CONNECTIONS) || (operation === WIRED_LINK_OPERATION_DELETE)) {
        showConnectionsError(code);

        return;
    }

    setStatus(`\${wiredlink.error.${code}}`);
};

/** `WiredLinkController.onOpen` - the server opens a Link: its configuration is asked for when it is the user's. */
export const onWiredLinkOpen = (send: Send, furniId: number) => {
    const roomId = getRoom()?.roomId ?? 0;

    if (!ownsTarget(roomId, furniId)) return;

    send(new WiredLinkGetConfigurationComposer({ furniId }));
};

/** `onConfiguration` + `WiredLinkView.showConfiguration`. */
export const onWiredLinkConfiguration = (data: WiredLinkConfigurationMessageType) => {
    if (!ownsTarget(data.roomId, data.furniId)) return;

    closeReceiveLocalDialog();
    closeDeleteDialog();

    link().patchWiredLink({
        linkRoomId: data.roomId,
        linkFurniId: data.furniId,
        linkPendingConnectionsId: WIRED_LINK_NO_NETWORK,
        linkSelectedNetworkId: data.selectedNetworkId,
        linkSavedNetworkId: data.selectedNetworkId,
        linkReceiveLocal: data.receiveLocal,
        linkNetworks: [ ...data.networks ],
        linkNameInput: '',
        linkStatus: '',
        linkConnections: null,
        linkVisible: true,
    });

    systemStore.getState().bringWindowToFront(WIRED_LINK_FRAME_ID);
};

/** `onResult` + `WiredLinkView.operationSucceeded`. */
export const onWiredLinkOperationResult = (data: WiredLinkOperationResultMessageType) => {
    if (!matchesTarget(data.roomId, data.furniId)) return;

    if (data.resultCode !== 0) {
        operationFailed(data.resultCode, data.operation);

        return;
    }

    link().patchWiredLink((state) => {
        const networks = state.linkNetworks.filter(network => network.id !== data.removedNetworkId);

        for (const network of data.networks) {
            const index = networks.findIndex(existing => existing.id === network.id);

            if (index < 0) networks.push(network);
            else networks[index] = network;
        }

        let connections = state.linkConnections;

        if (connections) {
            if (connections.networkId === data.removedNetworkId) connections = null;

            for (const network of data.networks) {
                if (!connections || (connections.networkId !== network.id)) continue;

                // `networkRenamed` / `updateName`: the field follows the name unless the user typed another.
                connections = {
                    ...connections,
                    nameInput: (connections.nameInput === connections.networkName) ? network.name : connections.nameInput,
                    networkName: network.name,
                    status: (data.operation === WIRED_LINK_OPERATION_RENAME) ? '' : connections.status,
                    statusError: (data.operation === WIRED_LINK_OPERATION_RENAME) ? false : connections.statusError,
                };
            }
        }

        const created = (data.operation === WIRED_LINK_OPERATION_CREATE) && data.networks.some(network => network.name === state.linkNameInput);

        return {
            linkSelectedNetworkId: data.hasConfiguration ? data.selectedNetworkId : state.linkSelectedNetworkId,
            linkSavedNetworkId: (state.linkSavedNetworkId === data.removedNetworkId) ? WIRED_LINK_NO_NETWORK : state.linkSavedNetworkId,
            linkNetworks: networks,
            linkConnections: connections,
            linkNameInput: created ? '' : state.linkNameInput,
            linkStatus: '',
        };
    });
};

/** `onConnections` + `WiredLinkView.showConnections`: only the answer to the last request counts. */
export const onWiredLinkConnections = (data: WiredLinkConnectionsMessageType) => {
    if (!matchesTarget(data.roomId, data.furniId) || (data.networkId !== link().linkPendingConnectionsId)) return;

    link().patchWiredLink(state => ({
        linkPendingConnectionsId: WIRED_LINK_NO_NETWORK,
        linkStatus: '',
        linkConnections: (state.linkConnections?.networkId === data.networkId) ? { ...state.linkConnections, connections: data.connections, status: '', statusError: false } : state.linkConnections,
    }));
};

/** `onInvalidated` + `WiredLinkView.networkDeleted`. */
export const onWiredLinkInvalidated = (data: WiredLinkConfigurationInvalidatedMessageType) => {
    if (!matchesTarget(data.roomId, data.furniId)) return;

    link().patchWiredLink(state => ({
        linkNetworks: state.linkNetworks.filter(network => network.id !== data.deletedNetworkId),
        linkSelectedNetworkId: (state.linkSelectedNetworkId === data.deletedNetworkId) ? WIRED_LINK_NO_NETWORK : state.linkSelectedNetworkId,
        linkSavedNetworkId: (state.linkSavedNetworkId === data.deletedNetworkId) ? WIRED_LINK_NO_NETWORK : state.linkSavedNetworkId,
        linkConnections: (state.linkConnections?.networkId === data.deletedNetworkId) ? null : state.linkConnections,
        linkStatus: '${wiredlink.deleted}',
    }));

    if (!link().linkConnections) closeDeleteDialog();
};

/** `canConnect`: no network, or one no other Link of this room uses. */
export const canConnectWiredLink = (networkId: string): boolean => {
    if (networkId === WIRED_LINK_NO_NETWORK) return true;

    const network = getWiredLinkNetwork(networkId);

    return !!network && (!network.linkedInCurrentRoom || (networkId === link().linkSelectedNetworkId));
};

/** `save` - connect (`Connect`) or clear (`clear_btn`) with the receive setting. */
export const saveWiredLink = (send: Send, networkId: string, receiveLocal: boolean) => {
    if (!canEdit()) return;

    if (!canConnectWiredLink(networkId)) {
        operationFailed(ERROR_LINKED_IN_ROOM, WIRED_LINK_OPERATION_SAVE);

        return;
    }

    link().patchWiredLink({ linkSavedNetworkId: networkId, linkReceiveLocal: receiveLocal });

    send(new WiredLinkSaveConfigurationComposer({ furniId: link().linkFurniId, networkId, receiveLocal }));
};

/** `setReceiveLocal` - the checkbox saves at once; ticked with no network, it explains what that does. */
export const setWiredLinkReceiveLocal = (send: Send, receiveLocal: boolean) => {
    saveWiredLink(send, link().linkSavedNetworkId, receiveLocal);

    if (receiveLocal && (link().linkSavedNetworkId === WIRED_LINK_NO_NETWORK) && (link().linkFurniId !== 0) && (receiveLocalDialogId === null)) {
        const { showAlert, interpolate } = systemStore.getState();

        receiveLocalDialogId = showAlert(interpolate('${wiredlink.receive.local.title}'), interpolate('${wiredlink.receive.local.info}'), { onClose: forgetReceiveLocalDialog });
    }
};

/** `validName`. */
const validName = (name: string, operation: number): boolean => {
    if ((name.length <= NETWORK_NAME_MAX_LENGTH) && /\S/.test(name)) return true;

    operationFailed(ERROR_INVALID_NAME, operation);

    return false;
};

/** `createNetwork` - `create_btn`. */
export const createWiredLinkNetwork = (send: Send, name: string) => {
    if (validName(name, WIRED_LINK_OPERATION_CREATE) && canEdit()) send(new WiredLinkCreateNetworkComposer({ furniId: link().linkFurniId, name }));
};

/** `renameNetwork` - `rename_btn` or Enter in the connections window's name field. */
export const renameWiredLinkNetwork = (send: Send, networkId: string, name: string) => {
    if (getWiredLinkNetwork(networkId) && validName(name, WIRED_LINK_OPERATION_RENAME) && canEdit()) send(new WiredLinkRenameNetworkComposer({ furniId: link().linkFurniId, networkId, name }));
};

/** `deleteNetwork`. */
const deleteWiredLinkNetwork = (send: Send, networkId: string) => {
    if (getWiredLinkNetwork(networkId) && canEdit()) send(new WiredLinkDeleteNetworkComposer({ furniId: link().linkFurniId, networkId }));
};

/** `delete_btn` / `delete_caption`: asks first (`wiredlink.delete.title` / `.confirm`). */
export const confirmDeleteWiredLinkNetwork = (send: Send) => {
    if (deleteDialogId !== null) return;

    const { showConfirm, interpolate } = systemStore.getState();

    deleteDialogId = showConfirm(interpolate('${wiredlink.delete.title}'), interpolate('${wiredlink.delete.confirm}'), () => {
        deleteDialogId = null;

        const networkId = link().linkConnections?.networkId;

        if (networkId) deleteWiredLinkNetwork(send, networkId);
    }, { onCancel: forgetDeleteDialog, onClose: forgetDeleteDialog });
};

/** `getConnections` (`Manage`) + `WiredLinkView.showConnectionsLoading`. */
export const requestWiredLinkConnections = (send: Send, networkId: string) => {
    const network = getWiredLinkNetwork(networkId);

    if (!network || !canEdit()) return;

    closeDeleteDialog();

    link().patchWiredLink({
        linkPendingConnectionsId: networkId,
        linkConnections: { networkId, networkName: network.name, nameInput: network.name, connections: [], status: '${wiredlink.loading.connections}', statusError: false },
    });

    systemStore.getState().bringWindowToFront(WIRED_LINK_CONNECTIONS_FRAME_ID);

    send(new WiredLinkGetConnectionsComposer({ furniId: link().linkFurniId, networkId }));
};

/** The connections window's name field. */
export const setWiredLinkConnectionsNameInput = (nameInput: string) => link().patchWiredLink(state => (state.linkConnections ? { linkConnections: { ...state.linkConnections, nameInput } } : {}));

/** `visitRoom` - `Visit`. */
export const visitWiredLinkRoom = (send: Send, roomId: number) => openClientLink(send, `navigator/goto/${roomId}`);

/** `WiredLinkView.hide` (its close button): the connections window and the receive alert go with it. */
export const hideWiredLink = () => {
    closeReceiveLocalDialog();
    closeDeleteDialog();
    link().patchWiredLink({ linkVisible: false, linkConnections: null });
};

/** `WiredLinkConnectionsView.hide`. */
export const hideWiredLinkConnections = () => {
    closeDeleteDialog();
    link().patchWiredLink({ linkConnections: null });
};

/**
 * `onObjectChanged` (`REOE_REMOVED` / `REOE_UPDATED`): the Link leaving the room, or no longer
 * being the user's, closes its window.
 */
export const onWiredLinkObjectChanged = (furniId: number, removed: boolean) => {
    const { linkRoomId, linkFurniId } = link();

    if ((linkFurniId === 0) || (furniId !== linkFurniId)) return;

    if (removed || !ownsTarget(linkRoomId, linkFurniId)) invalidateWiredLink();
};
