import { GenericErrorMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';
import { systemStore } from '#base/context/system';

import { on, subscribeAll } from '../packetSubscriptions';

/** `GenericErrorMessage.errorCode` for being kicked out of the room by its owner. */
const KICKED_ERROR_CODE = 4008;

/**
 * Flash's `GenericErrorHandler`: of the generic errors only a kick is about the room session
 * (`RSEME_KICKED`), and `RoomUI.roomSessionDialogEventHandler` shows it as `room.error.kicked`
 * under `generic.alert.title`. With no room there is no session and nothing is shown. The
 * navigator's own errors are `registerNavigatorHandlers`'.
 */
export const registerRoomGenericErrorHandlers = ({ subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(GenericErrorMessage, (data) => {
        if ((data.errorCode !== KICKED_ERROR_CODE) || !getRoom()) return;

        const { showAlert, getLocalizationValue } = systemStore.getState();

        showAlert(getLocalizationValue('generic.alert.title'), getLocalizationValue('room.error.kicked'));
    }),
]);
