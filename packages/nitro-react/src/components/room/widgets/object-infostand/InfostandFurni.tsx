import { CrackableDataType, FurniId, FurnitureUsagePolicyEnum, ISimpleRoomObjectData, MapDataType, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectVariableEnum, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';
import { GetHabboGroupDetailsComposer, GetSongInfoComposer, SetObjectDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect } from 'react';

import { openClientLink, openProfile } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useOwnControllerLevel, useRoom, useRoomStore } from '#base/context/room';
import { useConfigValue, useSystemActions } from '#base/context/system';
import { useOwnSecurityLevel, useOwnUserId, useUserStore } from '#base/context/user';
import { useWiredShowInspectButton } from '#base/context/wired';
import { useRoomFurnitureData, useRoomObjectInteraction, useRoomObjectModify, useSecondsClock } from '#base/hooks';
import { InfostandFurniDetails, InfostandFurniView } from '#base/views/room-widgets/object-infostand/InfostandFurniView';

type InfostandFurniProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
};

/** `SecurityLevelEnum`: staff who count as a controller of every room, and who may save branding. */
const ANY_ROOM_CONTROLLER_SECURITY = 5;
const SAVE_BRANDING_SECURITY = 4;

/** `PickupMode`: none, eject someone else's furni, pick up your own. */
export const PICKUP_NONE = 0;
export const PICKUP_EJECT = 1;
export const PICKUP_FULL = 2;

/**
 * The infostand for furniture - `InfoStandFurniView`, with the crackable, jukebox and song disk
 * variants folded in. It works out what you may do with the object - move, rotate, pick up or
 * eject, use, wired inspect - the way `InfoStandFurniView.update` did, and gathers what the
 * variants show. In wired play test mode (`playTestMode`) only what a visitor could do is offered.
 */
export const InfostandFurni = ({ objectData, onClose }: InfostandFurniProps) => {
    const { objectId, category } = objectData;
    const room = useRoom();
    const furniData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const securityLevel = useOwnSecurityLevel();
    const controllerLevel = useOwnControllerLevel();
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const isFreeFurniMovementsMode = useRoomStore(x => x.isFreeFurniMovementsMode);
    const playTestMode = useRoomStore(x => x.playTestMode);
    const showWiredInspectButton = useWiredShowInspectButton();
    const nowPlayingSongId = useRoomStore(x => x.nowPlayingSongId);
    const songInfoById = useRoomStore(x => x.songInfoById);
    const groupDetails = useUserStore(x => (furniData?.groupId ? x.groupDetailsById[furniData.groupId] : undefined));
    const useButtonEnabled = useConfigValue<boolean>('infostand.use.button.enabled') ?? true;
    const clockMs = useSecondsClock();
    const { modifyRoomObject } = useRoomObjectModify();
    const { changeItemState } = useRoomObjectInteraction();
    const { showWindow } = useSystemActions();
    const { send } = useWebSocketContext();

    const groupId = furniData?.groupId ?? 0;
    const extraParam = furniData?.extraParam ?? '';
    const songDiskId = extraParam.startsWith(RoomWidgetEnumItemExtradataParameter.SONGDISK) ? parseInt(extraParam.substring(RoomWidgetEnumItemExtradataParameter.SONGDISK.length), 10) : -1;
    const songToName = (songDiskId >= 0) ? songDiskId : ((extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) ? nowPlayingSongId : -1);
    const songKnown = !!songInfoById[songToName];

    // `handleGetFurniInfoMessage`: a guild furni asks who its guild is, without opening anything.
    useEffect(() => {
        if (groupId <= 0) return;

        send(new GetHabboGroupDetailsComposer({ groupId, openDetails: false }));
    }, [ groupId, send ]);

    // A disk or a playing jukebox names its song; the names only come on request.
    useEffect(() => {
        if ((songToName <= 0) || songKnown) return;

        send(new GetSongInfoComposer({ songIds: [ songToName ] }));
    }, [ songToName, songKnown, send ]);

    if (!room || !furniData || (!furniData.furnitureData && !furniData.name)) return null;

    const roomObject = room.getRoomObject(objectId, category);

    if (!roomObject) return null;

    const isOwner = furniData.ownerId === ownUserId;
    const isAnyRoomController = Number(securityLevel) >= ANY_ROOM_CONTROLLER_SECURITY;
    const hasRights = controllerLevel >= RoomControllerLevelEnum.Guest;
    // Free furni movements mode (a wired configuration item) hands move, rotate and use to everyone; play test mode takes them from the rest.
    const canMove = isFreeFurniMovementsMode || (!playTestMode && (hasRights || isOwner || isRoomOwner || isAnyRoomController));
    const isCrackable = extraParam.startsWith(RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI);

    let canUse = false;

    if (useButtonEnabled) {
        if (furniData.usagePolicy === FurnitureUsagePolicyEnum.Everybody) canUse = true;
        if (!playTestMode && hasRights && ((furniData.usagePolicy === FurnitureUsagePolicyEnum.Controller) || (extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) || (extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT))) canUse = true;
    }

    if (useButtonEnabled && isFreeFurniMovementsMode) canUse = true;

    // A crackable is there to be hit.
    if (isCrackable) canUse = true;

    let pickupMode = PICKUP_NONE;

    // `updatePickupMode(event, playTestMode)`.
    if (!playTestMode) {
        if (isOwner || isAnyRoomController) pickupMode = PICKUP_FULL;
        else if (isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.GuildAdmin)) pickupMode = PICKUP_EJECT;

        if (furniData.isStickie) pickupMode = PICKUP_NONE;
    }

    // `RWFAM_WIRED_INSPECT`: a floor item by its id, a wall item by its negative id.
    const wiredInspectId = (category === RoomObjectCategoryEnum.Floor) ? objectId : ((category === RoomObjectCategoryEnum.Wall) ? -objectId : undefined);

    const expirySeconds = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExpiryTime) ?? -1;
    const expiryStamp = roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureExpiryTimestamp) ?? 0;
    // Counted down against the clock the model stamped the expiry with.
    const expiration = (expirySeconds < 0) ? expirySeconds : Math.max(0, expirySeconds - ((clockMs - expiryStamp) / 1000));

    const brandingOptions = extraParam.startsWith(RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS)
        ? extraParam.substring(RoomWidgetEnumItemExtradataParameter.BRANDING_OPTIONS.length).split('\t').map(pair => pair.split('=')).filter(pair => pair.length >= 2).map(([ key, ...value ]) => ({ key, value: value.join('=') }))
        : [];

    const customVariableNames = roomObject.model.getValue<string[]>(RoomObjectVariableEnum.FurnitureCustomVariables) ?? [];
    const furnitureDataMap = roomObject.model.getValue<Record<string, string>>(RoomObjectVariableEnum.FurnitureData) ?? {};
    const stuffData = furniData.stuffData;
    const mapData = (stuffData instanceof MapDataType) ? stuffData : undefined;
    const song = songInfoById[songToName];

    const details: InfostandFurniDetails = {
        name: furniData.name,
        description: furniData.description,
        className: furniData.furnitureData?.className ?? roomObject.type,
        colorIndex: furniData.furnitureData?.colorIndex ?? 0,
        isNft: (furniData.furnitureData?.className ?? '').startsWith('nft_'),
        ownerKind: FurniId.isBuilderClubId(objectId) ? 'builders_club' : (FurniId.isTempId(objectId) ? 'temporary' : 'user'),
        ownerId: furniData.ownerId,
        ownerName: furniData.ownerName,
        expiration: (isOwner && (expiration >= 0)) ? expiration : -1,
        group: (groupId > 0) ? { name: groupDetails?.groupName ?? '', badge: groupDetails?.badgeCode ?? '' } : undefined,
        uniqueSerial: stuffData.isUnique ? { number: stuffData.uniqueNumber, series: stuffData.uniqueSeries } : undefined,
        chest: (mapData && mapData.chestName.length) ? { name: mapData.chestName, contents: mapData.getValue('contents_count'), isCoins: furniData.furnitureData?.category === 'coin_chest', isLocked: (mapData.getValue('is_wired_enabled') === '1') && (mapData.getValue('locked') === '1') } : undefined,
        customVariables: customVariableNames.map(name => ({ name, value: furnitureDataMap[name] ?? '' })),
        staffDetails: isAnyRoomController ? { id: objectId, branding: brandingOptions } : undefined,
        crackable: (isCrackable && (stuffData instanceof CrackableDataType)) ? { hits: stuffData.hits, target: stuffData.target } : undefined,
        jukebox: (extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) ? { playing: nowPlayingSongId >= 0, songName: song?.songName ?? '', creator: song?.creator ?? '' } : undefined,
        songDisk: (songDiskId >= 0) ? { songName: song?.songName ?? '', creator: song?.creator ?? '' } : undefined,
        canBuy: !((isOwner && (expiration >= 0))) && ((furniData.furnitureData?.purchaseOfferId ?? -1) >= 0),
        canRent: !((isOwner && (expiration >= 0))) && ((furniData.furnitureData?.rentOfferId ?? -1) >= 0),
    };

    return (
        <InfostandFurniView
            details={details}
            canMove={canMove}
            canRotate={canMove && !furniData.isWallItem}
            canUse={canUse}
            canWiredInspect={!playTestMode && showWiredInspectButton}
            pickupMode={pickupMode}
            canSaveBranding={Number(securityLevel) >= SAVE_BRANDING_SECURITY}
            onMove={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_MOVE)}
            onRotate={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}
            onPickup={() => {
                modifyRoomObject(objectId, category, (pickupMode === PICKUP_FULL) ? RoomObjectOperationType.OBJECT_PICKUP : RoomObjectOperationType.OBJECT_EJECT);
                onClose();
            }}
            onUse={() => changeItemState(objectId, category, 0, false)}
            onWiredInspect={() => (wiredInspectId !== undefined) && openClientLink(send, `wiredmenu/open/inspection/0/${wiredInspectId}`)}
            onBuy={() => showWindow('catalog', { offerId: furniData.furnitureData?.purchaseOfferId })}
            onRent={() => showWindow('catalog', { offerId: furniData.furnitureData?.rentOfferId })}
            onOpenOwner={() => (furniData.ownerId > 0) && openProfile(send, furniData.ownerId)}
            onOpenGroup={() => send(new GetHabboGroupDetailsComposer({ groupId, openDetails: true }))}
            onSaveBranding={values => send(new SetObjectDataComposer({ objectId, data: new Map(values.map(({ key, value }) => [ key, value.split('\t').join('') ])) }))}
            onClose={onClose}
        />
    );
};
