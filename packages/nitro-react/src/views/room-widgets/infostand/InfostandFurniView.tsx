import { FurniturePickupMode, FurnitureUsagePolicyEnum, type IRoomFurnitureData, RoomControllerLevelEnum, RoomObjectOperationType, RoomWidgetEnumItemExtradataParameter } from "@nitrodevco/nitro-api";

import { Button, FurnitureImage } from "#base/components";
import { useIsModerator, useOwnUserId, useRoomPermissionsSelector } from "#base/context";
import { useRoomObjectInteraction, useRoomObjectModify } from "#base/hooks";
import { useLocalizationStore } from "#base/stores";

type InfostandFurniViewProps = {
    data: IRoomFurnitureData | undefined;
    onClose: () => void;
}

export const InfostandFurniView = (props: InfostandFurniViewProps) => {
    const { data } = props;
    const ownUserId = useOwnUserId();
    const isModerator = useIsModerator();
    const { controllerLevel, isRoomOwner } = useRoomPermissionsSelector();
    const getLocalizationValue = useLocalizationStore(x => x.getLocalizationValue);
    const getLocalizationValueParams = useLocalizationStore(x => x.getLocalizationValueParams);
    const { modifyRoomObject } = useRoomObjectModify();
    const { changeItemState } = useRoomObjectInteraction();

    if (!data?.furnitureData) return null;

    let canMove = false;
    let canRotate = false;
    let canSeeFurniId = false;
    let canUse = false;
    let pickupMode = FurniturePickupMode.None;
    let godMode = false;

    const isValidController = controllerLevel >= RoomControllerLevelEnum.Guest;

    if (isValidController || data.ownerId === ownUserId || isRoomOwner || isModerator) {
        canMove = true;
        canRotate = !data.isWallItem;

        if (controllerLevel >= RoomControllerLevelEnum.Moderator) godMode = true;
    }

    if (data.ownerId === ownUserId || isModerator) pickupMode = FurniturePickupMode.Full;
    else if (isRoomOwner || controllerLevel >= RoomControllerLevelEnum.GuildAdmin) pickupMode = FurniturePickupMode.Eject;

    if (data.isStickie) pickupMode = FurniturePickupMode.None;

    if (isModerator) canSeeFurniId = true;

    if (data.usagePolicy === FurnitureUsagePolicyEnum.Everybody || (data.usagePolicy === FurnitureUsagePolicyEnum.Controller && isValidController) || (data.extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX && isValidController) || (data.extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT && isValidController)) canUse = true;

    return (
        <div className="flex flex-col items-end gap-2">
            <div className="infostand-container">
                <div className="infostand-header">
                    {data.name}
                    <i className="infostand-close" onClick={e => props.onClose()} />
                </div>
                <hr className="infostand-separator" />
                <div className="flex-1 gap-1 p-1 size-full">
                    <div className="flex items-center justify-center w-full py-1 overflow-hidden">
                        <FurnitureImage type={data.furnitureData.className} colorIndex={data.furnitureData.colorIndex} direction={4} />
                    </div>
                </div>
                <hr className="infostand-separator" />
                <div className="flex w-full gap-1 p-1">
                    <p className="text-[9px] text-white font-goldfish-bold">{getLocalizationValueParams('furni.owner', ['name'], [data.ownerName])}</p>
                    {canSeeFurniId && <p className="text-[9px] text-white font-goldfish-bold">ID: {data.id}</p>}
                </div>
            </div>
            <div className="flex justify-end gap-2">
                {canMove && <Button variant="infostand" size="sm" onClick={e => modifyRoomObject(data.objectId, data.category, RoomObjectOperationType.OBJECT_MOVE)}>{getLocalizationValue('infostand.button.move')}</Button>}
                {canRotate && <Button variant="infostand" size="sm" onClick={e => modifyRoomObject(data.objectId, data.category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}>{getLocalizationValue('infostand.button.rotate')}</Button>}
                {pickupMode === FurniturePickupMode.Eject && <Button variant="infostand" size="sm" onClick={e => modifyRoomObject(data.objectId, data.category, RoomObjectOperationType.OBJECT_EJECT)}>{getLocalizationValue(`infostand.button.eject`)}</Button>}
                {pickupMode === FurniturePickupMode.Full && <Button variant="infostand" size="sm" onClick={e => modifyRoomObject(data.objectId, data.category, RoomObjectOperationType.OBJECT_PICKUP)}>{getLocalizationValue(`infostand.button.pickup`)}</Button>}
                {canUse && <Button variant="infostand" size="sm" onClick={e => changeItemState(data.objectId, data.category, 0, false)}>{getLocalizationValue('infostand.button.use')}</Button>}
            </div>
        </div>
    );
}