import { RoomObjectCategoryEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { ControlYoutubeDisplayPlaybackComposer, SetYoutubeDisplayPlaylistComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { ClientGates, useClientGate, useOwnUserId } from '#base/context/user';
import { YoutubeData } from '#base/handlers';
import { isFurnitureOwnedBy } from '#base/utils';
import { FurnitureYoutubeView } from '#base/views/room-widgets/furniture/FurnitureYoutubeView';

/**
 * A video display. What it can play and what it is playing both come from the server, which the
 * request handler asks as the furni is used. `FurnitureYoutubeDisplayWidgetHandler` offers the
 * controls to the display's owner or `hasSecurity(4)` (`ClientGates.YoutubeControlAny`); everyone
 * else only gets to see what is on.
 */
export const FurnitureYoutubeWidget = () => {
    const request = useRoomWidget<YoutubeData>(RoomObjectWidgetRequestEvent.YOUTUBE);
    const room = useRoom();
    const ownUserId = useOwnUserId();
    const controlsAny = useClientGate(ClientGates.YoutubeControlAny);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const data = request?.data;

    if (!request || !data || (data.furniId !== request.objectId)) return null;

    const canControl = isFurnitureOwnedBy(room?.getRoomObject(request.objectId, RoomObjectCategoryEnum.Floor), ownUserId) || controlsAny;

    return (
        <FurnitureYoutubeView
            playlists={data.playlists}
            selectedPlaylistId={data.selectedPlaylistId}
            videoId={data.videoId}
            canControl={canControl}
            onSelectPlaylist={playlistId => send(new SetYoutubeDisplayPlaylistComposer({ objectId: request.objectId, playlistId }))}
            onControl={commandId => send(new ControlYoutubeDisplayPlaybackComposer({ objectId: request.objectId, commandId }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.YOUTUBE)}
        />
    );
};
