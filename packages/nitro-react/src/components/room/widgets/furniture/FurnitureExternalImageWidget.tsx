import { RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useConfigValue } from '#base/context/system';
import { FurnitureExternalImageView } from '#base/views/room-widgets/furniture/FurnitureExternalImageView';

import { parsePhotoData, resolvePhotoUrl } from './furnitureWidgetData';

/** Posters keep their picture at the root of the image host; selfies live a folder deeper. */
const PHOTO_POSTER_TYPE = 'photo_poster';

/**
 * A photo on the wall. The picture itself is not the client's - the furni carries a scrap of
 * JSON naming it, and the image is fetched from the stories host the configuration points at.
 * A photo that carries only an id keeps its details on a separate service, which the port does
 * not call, so that kind shows nothing.
 */
export const FurnitureExternalImageWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE);
    const room = useRoom();
    const { closeRoomWidget } = useRoomWidgetActions();
    const imageUrlBase = useConfigValue<string>('stories.image_url_base') ?? '';

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const photo = parsePhotoData(roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureData));

    if (!photo) return null;

    return (
        <FurnitureExternalImageView
            imageUrl={resolvePhotoUrl(photo.url, imageUrlBase, roomObject.type === PHOTO_POSTER_TYPE)}
            creatorName={photo.creatorName}
            time={photo.time}
            caption={photo.caption}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.EXTERNAL_IMAGE)}
        />
    );
};
