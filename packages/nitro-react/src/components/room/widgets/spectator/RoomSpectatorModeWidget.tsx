import { useRoomIsSpectating } from '#base/context/room';
import { useViewportSize } from '#base/hooks';
import { RoomSpectatorModeView } from '#base/views/room-widgets/spectator/RoomSpectatorModeView';

/**
 * The frame over a spectated room - `RoomDesktop.createRoomView` adds it to the room view while the
 * session spectates, and `enterAfterSpectate` disposes it. The room view fills the client, so the
 * frame is the viewport's size.
 */
export const RoomSpectatorModeWidget = () => {
    const isSpectating = useRoomIsSpectating();
    const { width, height } = useViewportSize();

    if (!isSpectating) return null;

    return (
        <RoomSpectatorModeView
            width={width}
            height={height}
        />
    );
};
