import { RoomObjectVariableEnum, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { SetObjectDataComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { ClientGates, useClientGate } from '#base/context/user';
import { FurnitureVimeoView } from '#base/views/room-widgets/furniture/FurnitureVimeoView';

/** `VimeoDisplayWidgetHandler.VIDEO_ID_KEY` - where the screen's map stuff data keeps its video. */
const VIDEO_ID_KEY = 'videoId';

/**
 * A `furniture_vimeo` screen opened with `RWE_VIMEO` - Flash's `VimeoDisplayWidgetHandler`
 * (`§_-E1f§`) and `VimeoDisplayWidget`. The video is read off the furni's `videoId` once, as the
 * window opens (`show`); staff (`hasSecurity(5)`) may type another, which `setVideo` stores on the
 * furni with `SetObjectDataMessageComposer` and the window shows straight away.
 */
export const FurnitureVimeoWidget = () => {
    const request = useRoomWidget(RoomWidgetEnum.VIMEO);
    const room = useRoom();
    const canEdit = useClientGate(ClientGates.VimeoEdit);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ shown, setShown ] = useState<{ sequenceKey: string; videoId: number } | undefined>(undefined);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    // `show` reads the furni once per opening; a video set from the window since then wins.
    const sequenceKey = `${request.objectId}:${request.sequence}`;
    const furniVideoId = parseInt(roomObject.model.getValue<Record<string, string>>(RoomObjectVariableEnum.FurnitureData)?.[VIDEO_ID_KEY] ?? '', 10) || 0;
    const videoId = (shown?.sequenceKey === sequenceKey) ? shown.videoId : furniVideoId;

    const setVideo = (next: number) => {
        send(new SetObjectDataComposer({ objectId: request.objectId, data: new Map([ [ VIDEO_ID_KEY, next.toString() ] ]) }));
        setShown({ sequenceKey, videoId: next });
    };

    return (
        <FurnitureVimeoView
            key={request.objectId}
            videoId={videoId}
            canEdit={canEdit}
            onSetVideo={setVideo}
            onClose={() => closeRoomWidget(RoomWidgetEnum.VIMEO)}
        />
    );
};
