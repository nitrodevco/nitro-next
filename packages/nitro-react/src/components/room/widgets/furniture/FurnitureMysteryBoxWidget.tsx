import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { MysteryBoxWaitingCanceledComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemStore } from '#base/context/system';
import { getMysteryBoxKeyColor, useOwnUserId, useUserStore } from '#base/context/user';
import { MysteryBoxData } from '#base/handlers';
import { useRoomFurnitureData } from '#base/hooks';
import { getFurnitureDataForProductType } from '#base/utils';
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
    const userId = useOwnUserId();
    const boxColor = useUserStore(x => x.mysteryBoxColor);
    const keyColor = useUserStore(x => x.mysteryKeyColor);
    const floorItems = useSystemStore(x => x.floorItems);
    const wallItems = useSystemStore(x => x.wallItems);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MYSTERYBOX_OPEN_DIALOG);

    const data = request?.data;

    if (!request || !data) return null;

    if (data.prize) {
        // `showRewardWindow` draws a floor (`s`) or wall (`i`) prize from the room engine by its class id.
        const product = getFurnitureDataForProductType({ floorItems, wallItems }, data.prize.contentType, data.prize.classId);

        return (
            <FurnitureMysteryBoxRewardView
                rewardType={product?.className}
                rewardColorIndex={product?.colorIndex ?? 0}
                onClose={onClose}
            />
        );
    }

    const isOwner = (!!furnitureData?.ownerId && (furnitureData.ownerId === userId));
    // `showWaitWindow`: the owner's box colour or the other's key colour - the pair share one - when the session has it.
    const colour = isOwner ? boxColor : keyColor;

    return (
        <FurnitureMysteryBoxView
            isOwner={isOwner}
            color={(colour !== '') ? getMysteryBoxKeyColor(colour) : undefined}
            onCancel={() => {
                // The wait belongs to whoever owns the box, so that is who calls it off.
                send(new MysteryBoxWaitingCanceledComposer({ furnitureOwnerId: furnitureData?.ownerId ?? 0 }));
                onClose();
            }}
            onClose={onClose}
        />
    );
};
