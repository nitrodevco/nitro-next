import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { UseFurnitureComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { FurnitureBannerDialogView } from '#base/views/room-widgets/furniture/FurnitureBannerDialogView';

/** The effect box is opened once and gone, so it asks before spending itself. */
export const FurnitureEffectBoxWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.EFFECTBOX_OPEN_DIALOG);

    if (!request) return null;

    return (
        <FurnitureBannerDialogView
            captionKey="effectbox.name.title"
            titleKey="effectbox.header.title"
            descriptionKey="effectbox.header.description"
            height={193}
            onConfirm={() => {
                send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }));
                onClose();
            }}
            onCancel={onClose}
        />
    );
};
