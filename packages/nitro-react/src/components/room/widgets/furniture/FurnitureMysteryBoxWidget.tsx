import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { MysteryBoxWaitingCanceledComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemStore } from '#base/context/system';
import { useUserStore } from '#base/context/user';
import { MysteryBoxData } from '#base/handlers';
import { useRoomFurnitureData } from '#base/hooks';
import { FurnitureMysteryBoxRewardView } from '#base/views/room-widgets/furniture/FurnitureMysteryBoxRewardView';
import { FurnitureMysteryBoxView } from '#base/views/room-widgets/furniture/FurnitureMysteryBoxView';

/**
 * A mystery box, which cannot be opened alone: using it starts a wait for whoever holds the
 * other half. Using the furni is sent by the request handler, so until the server says the wait
 * has begun there is nothing on screen - and what finally appears is the prize.
 */
export const FurnitureMysteryBoxWidget = () => {
    const request = useRoomWidget<MysteryBoxData>(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);
    const furnitureData = useRoomFurnitureData(request?.objectId ?? -1, request?.category ?? 0);
    const userId = useUserStore(x => x.userId);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);

    const data = request?.data;

    if (!request || !data) return null;

    if (data.prize) {
        // `showRewardWindow` draws a floor (`s`) or wall (`i`) prize from the room engine by its class id.
        const product = (data.prize.contentType === 's') ? floorItems[data.prize.classId] : ((data.prize.contentType === 'i') ? wallItems[data.prize.classId] : undefined);

        return (
            <FurnitureMysteryBoxRewardView
                rewardType={product?.className}
                rewardColorIndex={product?.colorIndex ?? 0}
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
