import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureEcotronBoxView } from '#base/views/room-widgets/furniture/FurnitureEcotronBoxView';

/** The Furni-Matic box prompt: confirm, then use the box and wait for the prize. */
export const FurnitureEcotronBoxWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.ECOTRONBOX);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.ECOTRONBOX);

    if (!request) return null;

    const onOpen = () => {
        send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }));
        onClose();
    };

    return (
        <FurnitureEcotronBoxView
            name={furnitureData?.name ?? ''}
            onOpen={onOpen}
            onClose={onClose}
        />
    );
};
