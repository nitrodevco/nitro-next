import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { CreditFurniRedeemComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { FurnitureCreditView } from '#base/views/room-widgets/furniture/FurnitureCreditView';

/**
 * The credit furni prompt. `FurnitureCreditLogic` reads the value off the furni's data when it
 * initialises, so the dialog needs no packet to open - only to redeem. An NFT credit furni
 * (`FurnitureNftCreditLogic`) opens the same prompt with its own wording, and only while
 * `nft.credit.converting.enabled` is on - `FurnitureCreditWidgetHandler.processWidgetMessage`.
 */
export const FurnitureCreditWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.CREDITFURNI);
    const room = useRoom();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const nftConvertingEnabled = useConfigValue<boolean>('nft.credit.converting.enabled') ?? false;

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.CREDITFURNI);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const isNftCredit = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureNftCredit) === 'true';

    if (isNftCredit && !nftConvertingEnabled) return null;

    const onExchange = () => {
        send(new CreditFurniRedeemComposer({ objectId: request.objectId }));
        onClose();
    };

    return (
        <FurnitureCreditView
            value={roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureCreditValue) ?? 0}
            isNftCredit={isNftCredit}
            onExchange={onExchange}
            onClose={onClose}
        />
    );
};
