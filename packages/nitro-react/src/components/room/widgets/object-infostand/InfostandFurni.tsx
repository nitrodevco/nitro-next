import { FurniturePickupMode, FurnitureUsagePolicyEnum, ISimpleRoomObjectData, RoomControllerLevelEnum, RoomObjectOperationType, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';

import { useOwnIsModerator, useOwnUserId, useRoomPermissionsSelector, useSystemActions } from '#base/context';
import { useRoomFurnitureData, useRoomObjectInteraction, useRoomObjectModify } from '#base/hooks';
import { InfostandFurniViewPixi } from '#base/views-pixi/room-widgets/object-infostand/InfostandFurniViewPixi';

type InfostandFurniViewProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
};

export const InfostandFurni = (props: InfostandFurniViewProps) => {
    const { objectData, onClose } = props;
    const { objectId, category } = objectData;
    const furniData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const isModerator = useOwnIsModerator();
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const { modifyRoomObject } = useRoomObjectModify();
    const { changeItemState } = useRoomObjectInteraction();
    const { toggleWindow } = useSystemActions();

    if (!furniData?.furnitureData) return null;

    let canMove = false;
    let canRotate = false;
    let canSeeFurniId = false;
    let canUse = false;
    let pickupMode = FurniturePickupMode.None;
    let godMode = false;

    const isValidController = controllerLevel >= RoomControllerLevelEnum.Guest;

    if (isValidController || furniData.ownerId === ownUserId || isRoomOwner || isModerator) {
        canMove = true;
        canRotate = !furniData.isWallItem;

        if (controllerLevel >= RoomControllerLevelEnum.Moderator) godMode = true;
    }

    if (furniData.ownerId === ownUserId || isModerator) pickupMode = FurniturePickupMode.Full;
    else if (isRoomOwner || controllerLevel >= RoomControllerLevelEnum.GuildAdmin) pickupMode = FurniturePickupMode.Eject;

    if (furniData.isStickie) pickupMode = FurniturePickupMode.None;

    if (isModerator) canSeeFurniId = true;

    if (furniData.usagePolicy === FurnitureUsagePolicyEnum.Everybody || (furniData.usagePolicy === FurnitureUsagePolicyEnum.Controller && isValidController) || (furniData.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX && isValidController) || (furniData.extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT && isValidController)) canUse = true;

    const hasButtons = canMove || canRotate || pickupMode !== FurniturePickupMode.None || canUse;

    const processAction = (action: string) => {
        switch (action) {
            case 'move':
                modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_MOVE);
                break;
            case 'rotate':
                modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE);
                break;
            case 'eject':
                modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_EJECT);
                break;
            case 'pickup':
                modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
                break;
            case 'use':
                changeItemState(objectId, category, 0, false);
                break;
            case 'buy':
                toggleWindow('catalog', { offerId: furniData.furnitureData?.purchaseOfferId });
                break;
            default:
                break;
        }
    };

    return (
        <InfostandFurniViewPixi
            furniData={furniData}
            canMove={canMove}
            canRotate={canRotate}
            canUse={canUse}
            pickupMode={pickupMode}
            hasButtons={hasButtons}
            canSeeFurniId={canSeeFurniId}
            godMode={godMode}
            processAction={processAction}
            onClose={onClose}
        />
    );
};
