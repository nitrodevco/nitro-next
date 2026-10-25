import { NitroLogger, RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RemoveItemComposer } from '@nitrodevco/nitro-packets';
import { GetRoomContentLoader } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import type { InventoryExternalImageRequest } from '#base/commands';
import { openProfile } from '#base/commands';
import { reportPhoto } from '#base/commands/help/helpCommands';
import { useWebSocketContext } from '#base/context/communication';
import { getInventoryWallItemById, useInventoryStore } from '#base/context/inventory';
import { useOwnControllerLevel, useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useConfigBoolean, useConfigValue, useTranslation, useWindowActions } from '#base/context/system';
import type { PhotoData } from '#base/utils';
import { parsePhotoData, readPhotoExtraDataId, resolvePhotoUrl } from '#base/utils';
import { FurnitureExternalImageView } from '#base/views/room-widgets/furniture/FurnitureExternalImageView';

/** Posters keep their picture at the root of the image host; selfies live a folder deeper. */
const PHOTO_POSTER_TYPE = 'photo_poster';

/**
 * Flash `getType`: the kind of picture a furni type holds - the two camera posters are a
 * `photo_poster`, the plain wall item a `selfie`, anything else `legacy`.
 */
const getExternalImageType = (type: string | undefined): string => {
    switch (type) {
        case 'external_image_wallitem_poster':
        case 'external_image_wallitem_poster_small':
            return PHOTO_POSTER_TYPE;
        case 'external_image_wallitem':
            return 'selfie';
        default:
            return 'legacy';
    }
};

/**
 * `readFurniJson`: data with an `id` names a photo whose details are on the extra data service -
 * `loadExternalData` loads `extra_data_service_url` + the id and `loadPhoto` reads the answer as it
 * would the furni's own data; any other data is the photo itself. Undefined while the answer is out,
 * and for one that failed (Flash logs it and leaves the empty picture `clearImage` drew).
 */
const usePhotoData = (furnitureData: string | undefined): { photo: PhotoData | undefined; extraDataId: string } => {
    const extraDataServiceUrl = useConfigValue<string>('extra_data_service_url') ?? '';
    const extraDataId = readPhotoExtraDataId(furnitureData);
    const [ loaded, setLoaded ] = useState<{ id: string; photo: PhotoData | undefined } | undefined>(undefined);

    useEffect(() => {
        if (!extraDataId) return;

        let current = true;

        fetch(extraDataServiceUrl + extraDataId)
            .then((response) => {
                if (!response.ok) throw new Error(`${response.status} ${response.statusText}`);

                return response.text();
            })
            // `onExternalDataLoaded`: an empty answer shows nothing.
            .then(text => current && text.length && setLoaded({ id: extraDataId, photo: parsePhotoData(text) }))
            .catch(error => NitroLogger.warn('Extra data loading failed', error));

        return () => {
            current = false;
        };
    }, [ extraDataId, extraDataServiceUrl ]);

    if (!extraDataId) return { photo: parsePhotoData(furnitureData), extraDataId: '' };

    return { photo: (loaded?.id === extraDataId) ? loaded.photo : undefined, extraDataId };
};

/**
 * A photo on the wall. The picture itself is not the client's - the furni carries a scrap of
 * JSON naming it (or only its id, the rest on the extra data service), and the image is fetched
 * from the stories host the configuration points at.
 *
 * The browse buttons (`showNext` / `showPrevious`) step through the room's wall items of the shown
 * one's type, in the room engine's order (`getWallItemsOfCurrentTypeInRoom`), round from the last
 * to the first; they show for two or more, never for an inventory item.
 *
 * The inventory's `viewItemButton` shows a photo it holds the same way (`showWithFurniID`, through
 * `showInventoryUseProductSelection`): the wall item with that strip id, its type the wall item
 * type's name, and no report or remove button.
 *
 * `removebutton` (`hasRightsToRemove`: controller level 4 up) asks first - `windowManager.confirm` with
 * the `inventory.remove.external_image_wallitem_*` texts, its ok button captioned "delete" - and on ok
 * `deleteCard` destroys the wall item (`deleteRoomObject(id, 20)` -> `RemoveItem`); the viewer closes
 * as the item leaves the room.
 */
export const FurnitureExternalImageWidget = () => {
    const request = useRoomWidget<Partial<InventoryExternalImageRequest>>(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE);
    const room = useRoom();
    const { send } = useWebSocketContext();
    const { closeRoomWidget } = useRoomWidgetActions();
    const furniGroups = useInventoryStore(x => x.furniGroups);
    const controllerLevel = useOwnControllerLevel();
    const { showConfirm } = useWindowActions();
    const t = useTranslation();
    const imageUrlBase = useConfigValue<string>('stories.image_url_base') ?? '';
    // `ExternalImageWidgetHandler.isSelfieReportingEnabled`.
    const selfieReportingEnabled = useConfigBoolean('stories.report.selfie.enabled');
    // `showWithRoomObject`'s object: the one asked for, until the browse buttons show another.
    const [ browsed, setBrowsed ] = useState<{ request: unknown; objectId: number } | undefined>(undefined);

    const inventoryItemId = request?.data?.inventoryItemId;
    const inventoryItem = (inventoryItemId !== undefined) ? getInventoryWallItemById(furniGroups, inventoryItemId) : undefined;
    const objectId = (browsed && (browsed.request === request)) ? browsed.objectId : (request?.objectId ?? -1);
    const roomObject = (request && room && (inventoryItemId === undefined)) ? room.getRoomObject(objectId, request.category ?? RoomObjectCategoryEnum.Wall) : undefined;
    const furnitureData = inventoryItem ? inventoryItem.stuffData.getLegacyString() : roomObject?.model.getValue<string>(RoomObjectVariableEnum.FurnitureData);
    const { photo, extraDataId } = usePhotoData(furnitureData);

    if (!request || !room) return null;

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE);

    if (inventoryItemId !== undefined) {
        if (!inventoryItem) return null;

        // `§_-UX§ = getWallItemType(type)`.
        const type = getExternalImageType(GetRoomContentLoader().getFurnitureWallNameForTypeId(inventoryItem.typeId));

        return (
            <FurnitureExternalImageView
                imageUrl={photo ? resolvePhotoUrl(photo.url, imageUrlBase, type === PHOTO_POSTER_TYPE) : ''}
                creatorName={photo?.creatorName ?? ''}
                time={photo?.time ?? 0}
                caption={photo?.caption ?? ''}
                reportVisible={false}
                removeVisible={false}
                browseVisible={false}
                onReport={() => undefined}
                onRemove={() => undefined}
                onBrowse={() => undefined}
                onSender={() => photo && openProfile(send, photo.creatorId)}
                onClose={onClose}
            />
        );
    }

    if (!roomObject) return null;

    const type = getExternalImageType(roomObject.type);
    // `getWallItemsOfCurrentTypeInRoom`: the room's wall items of the shown one's type.
    const sameType = room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Wall).filter(x => x.type === roomObject.type);
    const onBrowse = (step: number) => {
        if (!sameType.length) return;

        const index = sameType.findIndex(x => x.id === roomObject.id);
        const next = (index + step + sameType.length) % sameType.length;

        setBrowsed({ request, objectId: sameType[next].id });
    };
    // `onDeleteConfirm`: `deleteCard` of the shown item on ok.
    const onRemove = () => {
        const itemId = roomObject.id;

        showConfirm(t('inventory.remove.external_image_wallitem_header'), t('inventory.remove.external_image_wallitem_body'), () => send(new RemoveItemComposer({ itemId })), { okCaption: t('inventory.remove.external_image_wallitem_delete') });
    };

    return (
        <FurnitureExternalImageView
            imageUrl={photo ? resolvePhotoUrl(photo.url, imageUrlBase, type === PHOTO_POSTER_TYPE) : ''}
            creatorName={photo?.creatorName ?? ''}
            time={photo?.time ?? 0}
            caption={photo?.caption ?? ''}
            reportVisible={(type === PHOTO_POSTER_TYPE) || selfieReportingEnabled}
            browseVisible={sameType.length > 1}
            // `openReportImage`: the sender, their name, the photo's extra data id (none for a photo that
            // carries its own url) and the wall item.
            onReport={() => reportPhoto(photo?.creatorId ?? 0, photo?.creatorName ?? '', extraDataId, roomObject.id)}
            removeVisible={Number(controllerLevel) >= Number(RoomControllerLevelEnum.RoomOwner)}
            onRemove={onRemove}
            onBrowse={onBrowse}
            onSender={() => photo && openProfile(send, photo.creatorId)}
            onClose={onClose}
        />
    );
};
