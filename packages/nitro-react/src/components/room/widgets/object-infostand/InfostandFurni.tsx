/**
 * The infostand for furniture - `InfoStandFurniView` and its crackable, jukebox and song disk
 * variants. It works out what you may do with the object - move, rotate, pick up or eject, use,
 * wired inspect - the way `InfoStandFurniView.update` did, and gathers what the variants show. In
 * wired play test mode (`playTestMode`) only what a visitor could do is offered.
 *
 * The Builders Club parts: the place more button (`bcOfferId >= 0 && availableForBuildersClub &&
 * canPlaceWithBC()`, under `infostand.place_more.enabled`) starts placing another from the
 * Builders Club (`InfoStandWidget.requestItemToMover`); the owner line of a Builders Club furni opens
 * that catalogue at the furni's offer, or just the catalogue (`onOwnerRegion`); and picking up a
 * Builders Club furni the Builders Club no longer offers asks first (`pickupObjectWithConfirmation`).
 */
import { CatalogTypeEnum, CrackableDataType, FurniId, FurnitureLabelData, FurnitureSpecialType, FurnitureUsagePolicyEnum, ISimpleRoomObjectData, MapDataType, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectOperationType, RoomObjectVariableEnum, RoomWidgetEnumItemExtradataParameter } from '@nitrodevco/nitro-api';
import { GetSongInfoComposer, SetObjectDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useMemo } from 'react';

import { openClientLink, openGroupInfo, openProfile, openRentConfirmationWindow, requestGroupDetails, requestInfostandItemToMover, toggleCatalog } from '#base/commands';
import { furniKindOf } from '#base/context/client-modules';
import { useWebSocketContext } from '#base/context/communication';
import { useGroupStore } from '#base/context/groups';
import { useIsRoomOwner, useOwnControllerLevel, useRoom, useRoomPlayTestMode, useRoomStore, useRoomWidgetActions } from '#base/context/room';
import { useConfigBoolean, useTranslation, useWindowActions } from '#base/context/system';
import { ClientGates, useClientGate, useOwnUserId } from '#base/context/user';
import { useWiredHasWritePermission, useWiredShowInspectButton } from '#base/context/wired';
import { useCanPlaceWithBuildersClub, useRoomFurnitureData, useRoomObjectInteraction, useRoomObjectModify, useSecondsClock } from '#base/hooks';
import { FURNITURE_LABEL_SETTINGS_WIDGET, FURNITURE_RECOLOR_WIDGET, getFurniturePickupMode, PICKUP_FULL, PICKUP_NONE } from '#base/utils';
import { InfostandFurniDetails, InfostandFurniVariant, InfostandFurniView } from '#base/views/room-widgets/object-infostand/InfostandFurniView';
import { useClientModuleMenuButtons } from '#base/views/room-widgets/object-menu/useClientModuleMenuButtons';

type InfostandFurniProps = {
    objectData: ISimpleRoomObjectData;
    onClose: () => void;
};

/**
 * `InfoStandWidget.onFurniInfo`'s choice of view, by the furni's infostand extra param: the jukebox,
 * a song disk, a crackable, or the plain furni view.
 */
const furniVariant = (extraParam: string): InfostandFurniVariant => {
    if (extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) return 'jukebox';
    if (extraParam.indexOf(RoomWidgetEnumItemExtradataParameter.SONGDISK) !== -1) return 'songdisk';
    if (extraParam.indexOf(RoomWidgetEnumItemExtradataParameter.CRACKABLE_FURNI) !== -1) return 'crackable';

    return 'furni';
};

export const InfostandFurni = ({ objectData, onClose }: InfostandFurniProps) => {
    const { objectId, category } = objectData;
    const room = useRoom();
    const furniData = useRoomFurnitureData(objectId, category);
    const ownUserId = useOwnUserId();
    const isAnyRoomController = useClientGate(ClientGates.AnyRoomController);
    const canStealFurni = useClientGate(ClientGates.FurniSteal);
    const canSaveBranding = useClientGate(ClientGates.FurniBranding);
    // `createWindow` disposes `custom_variables` without `hasSecurity(5)`.
    const canSeeCustomVariables = useClientGate(ClientGates.FurniCustomVariables);
    const controllerLevel = useOwnControllerLevel();
    const isRoomOwner = useIsRoomOwner();
    const isFreeFurniMovementsMode = useRoomStore(x => x.isFreeFurniMovementsMode);
    const playTestMode = useRoomPlayTestMode();
    const showWiredInspectButton = useWiredShowInspectButton();
    const hasWiredWritePermission = useWiredHasWritePermission();
    const nowPlayingSongId = useRoomStore(x => x.nowPlayingSongId);
    const songInfoById = useRoomStore(x => x.songInfoById);
    const groupDetails = useGroupStore(x => (furniData?.groupId ? x.detailsById[furniData.groupId] : undefined));
    const useButtonEnabled = useConfigBoolean('infostand.use.button.enabled');
    const clockMs = useSecondsClock();
    const placeMoreEnabled = useConfigBoolean('infostand.place_more.enabled');
    const buildersClubEnabled = useConfigBoolean('builders.club.enabled');
    const canPlaceWithBuildersClub = useCanPlaceWithBuildersClub();
    const { modifyRoomObject } = useRoomObjectModify();
    const { changeItemState } = useRoomObjectInteraction();
    const { openRoomWidget } = useRoomWidgetActions();
    const { showWindow, hideWindow, showConfirm } = useWindowActions();
    const t = useTranslation();
    const { send } = useWebSocketContext();

    const groupId = furniData?.groupId ?? 0;
    const extraParam = furniData?.extraParam ?? '';
    const songDiskId = extraParam.startsWith(RoomWidgetEnumItemExtradataParameter.SONGDISK) ? parseInt(extraParam.substring(RoomWidgetEnumItemExtradataParameter.SONGDISK.length), 10) : -1;
    const songToName = (songDiskId >= 0) ? songDiskId : ((extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) ? nowPlayingSongId : -1);
    const songKnown = !!songInfoById[songToName];

    // `handleGetFurniInfoMessage`: a guild furni asks who its guild is, without opening anything.
    useEffect(() => {
        if (groupId <= 0) return;

        requestGroupDetails(send, groupId);
    }, [ groupId, send ]);

    // A disk or a playing jukebox names its song; the names only come on request.
    useEffect(() => {
        if ((songToName <= 0) || songKnown) return;

        send(new GetSongInfoComposer({ songIds: [ songToName ] }));
    }, [ songToName, songKnown, send ]);

    // The furni as client modules' buttons are given it (`api.contextMenu`, menu `furni`).
    const objectType = room?.getRoomObject(objectId, category)?.type;
    const moduleTarget = useMemo(() => {
        const kind = furniKindOf(category);

        return (kind && (objectType !== undefined)) ? { id: objectId, kind, type: objectType } : undefined;
    }, [ objectId, category, objectType ]);
    const moduleButtons = useClientModuleMenuButtons('furni', moduleTarget);

    if (!room || !furniData || (!furniData.furnitureData && !furniData.name)) return null;

    const roomObject = room.getRoomObject(objectId, category);

    if (!roomObject) return null;

    const isOwner = furniData.ownerId === ownUserId;
    const hasRights = controllerLevel >= RoomControllerLevelEnum.Guest;
    // Free furni movements mode (a wired configuration item) hands move, rotate and use to everyone; play test mode takes them from the rest.
    const canMove = isFreeFurniMovementsMode || (!playTestMode && (hasRights || isOwner || isRoomOwner || isAnyRoomController));
    const variant = furniVariant(extraParam);
    const isCrackable = (variant === 'crackable');

    let canUse = false;

    if (useButtonEnabled) {
        if (furniData.usagePolicy === FurnitureUsagePolicyEnum.Everybody) canUse = true;
        if (!playTestMode && hasRights && ((furniData.usagePolicy === FurnitureUsagePolicyEnum.Controller) || (extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) || (extraParam === RoomWidgetEnumItemExtradataParameter.USABLE_PRODUCT))) canUse = true;
    }

    if (useButtonEnabled && isFreeFurniMovementsMode) canUse = true;

    // A crackable is there to be hit.
    if (isCrackable) canUse = true;

    const pickupMode = getFurniturePickupMode({
        playTestMode,
        isStickie: !!furniData.isStickie,
        isOwner,
        isRoomOwner,
        isGuildAdmin: controllerLevel >= RoomControllerLevelEnum.GuildAdmin,
        isAnyRoomController,
        canStealFurni,
        isBuildersClub: FurniId.isBuilderClubId(objectId),
    });

    // A recolorable floor furni's colour (`furniture_recolorable_color`); undefined for any other furni.
    const recolorableColor = (category === RoomObjectCategoryEnum.Floor) ? roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureRecolorableColor) : undefined;
    const isRecolorable = (recolorableColor !== undefined) && !isNaN(recolorableColor);
    // `update`: the recolor button, outside play test mode, for a room owner or controller.
    const canRecolor = isRecolorable && !playTestMode && (hasRights || isRoomOwner || isAnyRoomController);
    // `InfoStandWidget`'s place more: a recolorable is placed again in its own colour, `r,g,b`.
    const placeMoreParam = isRecolorable ? [ (recolorableColor >> 16) & 0xff, (recolorableColor >> 8) & 0xff, recolorableColor & 0xff ].join(',') : extraParam;

    // `update`: the label settings button for a WIRED label (`furniture_label_data` of type 0), outside play test
    // mode, for whoever may modify the room's wired (`wiredMenu.hasWritePermission`).
    const labelData = roomObject.model.getValue<FurnitureLabelData | undefined>(RoomObjectVariableEnum.FurnitureLabelData);
    const canLabelSettings = !playTestMode && !!labelData && (labelData.type === FurnitureLabelData.TYPE_LABEL) && hasWiredWritePermission;

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

    const furnitureData = furniData.furnitureData;
    const ownerKind = FurniId.isBuilderClubId(objectId) ? 'builders_club' : (FurniId.isTempId(objectId) ? 'temporary' : 'user');
    // `set expiration`: shown while the owner line names you - never on a builders club or temporary furni.
    const showsExpiration = (ownerKind === 'user') && isOwner && (expiration >= 0);
    const bcOfferId = furnitureData?.bcOfferId ?? -1;
    const isCoins = (furnitureData?.specialType === FurnitureSpecialType.CoinsChest);
    const isChest = isCoins || (furnitureData?.specialType === FurnitureSpecialType.FurniChest);

    const details: InfostandFurniDetails = {
        variant,
        name: furniData.name,
        // Flash draws the room object itself (`getRoomObjectImage`): a poster is its own `poster<id>`,
        // the furnidata's one `poster` item has no asset.
        className: roomObject.type.startsWith('poster') ? roomObject.type : (furniData.furnitureData?.className ?? roomObject.type),
        colorIndex: furniData.furnitureData?.colorIndex ?? 0,
        isNft: (furniData.furnitureData?.className ?? '').startsWith('nft_'),
        ownerKind,
        ownerId: furniData.ownerId,
        ownerName: furniData.ownerName,
        expiration: showsExpiration ? expiration : -1,
        group: (groupId > 0) ? { name: groupDetails?.groupName ?? '', badge: groupDetails?.badgeCode ?? '' } : undefined,
        uniqueSerial: stuffData.isUnique ? { number: stuffData.uniqueNumber, series: stuffData.uniqueSeries } : undefined,
        // `showChestData`: a furni or coins chest (`FurniCategory` 24 / 25 - the furnidata's special type) with map data, named or not.
        chest: (mapData && isChest) ? { name: mapData.chestName, contents: mapData.getValue('contents_count'), isCoins, isWiredEnabled: mapData.getValue('is_wired_enabled') === '1', isLocked: mapData.getValue('locked') === '1' } : undefined,
        customVariables: !canSeeCustomVariables ? undefined : customVariableNames.map(name => ({ name, value: furnitureDataMap[name] ?? '' })),
        staffDetails: isAnyRoomController ? { id: objectId, branding: brandingOptions } : undefined,
        crackable: (isCrackable && (stuffData instanceof CrackableDataType)) ? { hits: stuffData.hits, target: stuffData.target } : undefined,
        jukebox: (extraParam === RoomWidgetEnumItemExtradataParameter.JUKEBOX) ? { playing: nowPlayingSongId >= 0, songName: song?.songName ?? '', creator: song?.creator ?? '' } : undefined,
        songDisk: (songDiskId >= 0) ? { songName: song?.songName ?? '', creator: song?.creator ?? '' } : undefined,
        canPlaceMore: placeMoreEnabled && (bcOfferId >= 0) && !!furnitureData?.availableForBuildersClub && canPlaceWithBuildersClub,
        canBuy: !((isOwner && (expiration >= 0))) && ((furniData.furnitureData?.purchaseOfferId ?? -1) >= 0),
        canRent: !((isOwner && (expiration >= 0))) && ((furniData.furnitureData?.rentOfferId ?? -1) >= 0),
        // `updatePurchaseButtonVisibility`: your own running rental can be extended or bought out when its type allows it.
        canExtend: isOwner && (expiration >= 0) && !!furniData.furnitureData?.rentCouldBeUsedForBuyout,
        canBuyout: isOwner && (expiration >= 0) && !!furniData.furnitureData?.purchaseCouldBeUsedForBuyout,
    };

    return (
        <InfostandFurniView
            details={details}
            canMove={canMove}
            canRotate={canMove && !furniData.isWallItem}
            canUse={canUse}
            canWiredInspect={!playTestMode && showWiredInspectButton}
            pickupMode={pickupMode}
            // `update`: `button_list.visible = move || rotate || pickupMode != 0 || use || recolor` - rotate only ever with move.
            canRecolor={canRecolor}
            onRecolor={() => openRoomWidget({ type: FURNITURE_RECOLOR_WIDGET, objectId, category, objectType: roomObject.type })}
            // `RWFAM_LABEL_SETTINGS`: `RWFLE_FURNITURE_LABEL_SETTINGS_OPEN` for the label widget.
            canLabelSettings={canLabelSettings}
            onLabelSettings={() => openRoomWidget({ type: FURNITURE_LABEL_SETTINGS_WIDGET, objectId, category, objectType: roomObject.type })}
            buttonsVisible={canMove || (pickupMode !== PICKUP_NONE) || canUse || canLabelSettings || canRecolor || (moduleButtons.length > 0)}
            moduleButtons={moduleButtons}
            canSaveBranding={canSaveBranding}
            onMove={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_MOVE)}
            onRotate={() => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_ROTATE_POSITIVE)}
            onPickup={() => {
                onClose();

                if (pickupMode !== PICKUP_FULL) {
                    modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_EJECT);

                    return;
                }

                // `pickupObjectWithConfirmation`: a builders club furni the Builders Club no longer has is gone once picked up.
                if (FurniId.isBuilderClubId(objectId) && buildersClubEnabled && !furnitureData?.availableForBuildersClub) {
                    showConfirm(t('generic.alert.title'), t('room.confirm.not_in_warehouse'), () => modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_PICKUP));

                    return;
                }

                modifyRoomObject(objectId, category, RoomObjectOperationType.OBJECT_PICKUP);
            }}
            onUse={() => changeItemState(objectId, category, 0, false)}
            onWiredInspect={() => (wiredInspectId !== undefined) && openClientLink(send, `wiredmenu/open/inspection/0/${wiredInspectId}`)}
            onBuy={() => showWindow('catalog', { offerId: furniData.furnitureData?.purchaseOfferId })}
            onRent={() => showWindow('catalog', { offerId: furniData.furnitureData?.rentOfferId })}
            onExtend={() => furniData.furnitureData && openRentConfirmationWindow(send, furniData.furnitureData, false, objectId)}
            onBuyout={() => furniData.furnitureData && openRentConfirmationWindow(send, furniData.furnitureData, true, objectId)}
            onPlaceMore={() => requestInfostandItemToMover({ bcOfferId, category, classId: furnitureData?.id ?? 0, extraParam: placeMoreParam })}
            onOpenOwner={() => {
                // `onOwnerRegion`: a builders club furni opens that catalogue - at its offer while it still has one.
                if (ownerKind === 'builders_club') {
                    if (furnitureData?.availableForBuildersClub && (furnitureData.purchaseOfferId >= 0)) {
                        hideWindow('catalog');
                        showWindow('builders_catalog', { offerId: furnitureData.purchaseOfferId });
                    } else {
                        toggleCatalog(CatalogTypeEnum.BuildersClub);
                    }

                    return;
                }

                if ((ownerKind === 'user') && (furniData.ownerId > 0)) openProfile(send, furniData.ownerId);
            }}
            onOpenGroup={() => openGroupInfo(send, groupId)}
            onSaveBranding={values => send(new SetObjectDataComposer({ objectId, data: new Map(values.map(({ key, value }) => [ key, value.split('\t').join('') ])) }))}
            onSetCustomVariables={values => send(new SetObjectDataComposer({ objectId, data: new Map(values.map(({ name, value }) => [ name, value ])) }))}
            onClose={onClose}
        />
    );
};
