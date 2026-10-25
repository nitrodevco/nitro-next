import { ChangeQueueComposer, QuitComposer, RoomQueueTargetType } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { RoomQueueView } from '#base/views/room-widgets/room-queue/RoomQueueView';

/**
 * The line into a full room. It stands outside the room itself, because it is up while there is
 * no room yet - the same place the doorbell and password popups live.
 */
export const RoomQueueWidget = () => {
    const roomQueue = useNavigatorStore(x => x.roomQueue);
    const { setRoomQueue } = useNavigatorActions();
    const { send } = useWebSocketContext();

    if (!roomQueue) return null;

    return (
        <RoomQueueView
            position={roomQueue.position}
            spectator={roomQueue.spectator}
            clubQueue={roomQueue.clubQueue}
            canChangeQueue={roomQueue.canChangeQueue}
            onChangeQueue={() => {
                send(new ChangeQueueComposer({
                    target: roomQueue.spectator ? RoomQueueTargetType.Visitor : RoomQueueTargetType.Spectator,
                }));

                // The server answers with the new line's status; until then there is nothing to show.
                setRoomQueue(undefined);
            }}
            onExit={() => {
                send(new QuitComposer({}));
                setRoomQueue(undefined);
            }}
        />
    );
};
