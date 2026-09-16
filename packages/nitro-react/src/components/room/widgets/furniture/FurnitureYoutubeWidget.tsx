import { RoomControllerLevelEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { ControlYoutubeDisplayPlaybackComposer, SetYoutubeDisplayPlaylistComposer } from '@nitrodevco/nitro-packets';

import { useRoomPermissionsSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomYoutubeHandler, YoutubeData } from '#base/handlers';
import { FurnitureYoutubeView } from '#base/views/room-widgets/furniture/FurnitureYoutubeView';

/**
 * A video display. What it can play and what it is playing both come from the server, which the
 * request handler asks as the furni is used; changing either is a decorating job, so everyone
 * else only gets to see what is on.
 */
export const FurnitureYoutubeWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomYoutubeHandler();

    const request = useRoomWidget<YoutubeData>(RoomObjectWidgetRequestEvent.YOUTUBE);
    const { isRoomOwner, controllerLevel } = useRoomPermissionsSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const data = request?.data;

    if (!request || !data || (data.furniId !== request.objectId)) return null;

    const canControl = isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest);

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
