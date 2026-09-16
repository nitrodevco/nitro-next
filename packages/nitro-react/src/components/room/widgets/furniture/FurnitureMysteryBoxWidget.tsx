import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { MysteryBoxWaitingCanceledComposer } from '@nitrodevco/nitro-packets';

import { useFurnitureDataSelector, useOwnUserInfo, useRoomWidget, useRoomWidgetActions, useTranslation, useWebSocketContext } from '#base/context';
import { MysteryBoxData, useRoomMysteryBoxHandler } from '#base/handlers';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureMysteryBoxRewardView } from '#base/views/room-widgets/furniture/FurnitureMysteryBoxRewardView';
import { FurnitureMysteryBoxView } from '#base/views/room-widgets/furniture/FurnitureMysteryBoxView';

/**
 * A mystery box, which cannot be opened alone: using it starts a wait for whoever holds the
 * other half. Using the furni is sent by the request handler, so until the server says the wait
 * has begun there is nothing on screen - and what finally appears is the prize.
 */
export const FurnitureMysteryBoxWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomMysteryBoxHandler();

    const request = useRoomWidget<MysteryBoxData>(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const { userId } = useOwnUserInfo();
    const { floorItems } = useFurnitureDataSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);

    const data = request?.data;

    if (!request || !data) return null;

    if (data.prize) {
        const product = floorItems[data.prize.classId];

        return (
            <FurnitureMysteryBoxRewardView
                rewardName={product?.localizedName ?? t(`productdata.${data.prize.contentType}.name`, data.prize.contentType)}
                onClose={onClose}
            />
        );
    }

    const isOwner = (!!furnitureData?.ownerId && (furnitureData.ownerId === userId));

    return (
        <FurnitureMysteryBoxView
            isOwner={isOwner}
            onCancel={() => {
                // The wait belongs to whoever owns the box, so that is who calls it off.
                send(new MysteryBoxWaitingCanceledComposer({ furnitureOwnerId: furnitureData?.ownerId ?? 0 }));
                onClose();
            }}
            onClose={onClose}
        />
    );
};
