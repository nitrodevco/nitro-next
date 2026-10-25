/**
 * Where you are in the line into a full room - Flash `RoomQueueWidget`, on `habbo-room-ui-com`'s
 * `room_queue` layout (`createWindow`), opened where the layout places it (47, 33). `showInterface`
 * sets `info_text` to the line's position text - `room.queue[.spectator].position[.hc]`, with the
 * position registered as its `%position%` (`onQueueStatus`). The frame's `close` tag and
 * `cancel_button` both leave the line (`exitQueue`); leaving the line is leaving the room.
 *
 * The layout's `spectator_info` and `change_button` are `visible="false"` and Flash's widget never
 * shows them; the port shows `spectator_info` in the spectator line and `change_button` (`changeQueue`)
 * when the server offers another line. Their layout rects overlap `cancel_button` (and `change_button`
 * lies below the frame), so while either is up `arrange` stacks them as the port always has - the
 * cancel button centred at the bottom, the change button under it in a frame grown to 176; with neither,
 * every control is at the layout's pixels.
 */
import { TemplateWindow, TemplateWindows } from '#base/theme';

export interface RoomQueueViewProps {
    /** How many are ahead, plus you. */
    position: number;
    /** Whether this is the spectator line or the visitor one - they are worded differently. */
    spectator: boolean;
    /** A club line moves faster, and says so. */
    clubQueue: boolean;
    /** Only offered when there is another line to move to. */
    canChangeQueue: boolean;
    onChangeQueue: () => void;
    /** Leaving the queue leaves the room. */
    onExit: () => void;
}

const QUEUE_TEMPLATE = 'habbo-room-ui-com/room_queue';

/** The layout's frame position: `buildFromXML` puts the window on the desktop there. */
const LAYOUT_POSITION = { x: 47, y: 33 };

/** The port's frame height with `change_button` under `cancel_button`. */
const CHANGE_FRAME_HEIGHT = 176;

/** The gap the port keeps under `cancel_button` for `change_button`. */
const CHANGE_ROW_HEIGHT = 34;

/** Where the port puts `spectator_info` in the content area (the layout's 21, 68, 266 lie under the cancel button and past the frame). */
const SPECTATOR_INFO_RECT = [ 14, 58, 200, 29 ] as const;

export const RoomQueueView = ({ position, spectator, clubQueue, canChangeQueue, onChangeQueue, onExit }: RoomQueueViewProps) => {
    const positionKey = spectator
        ? (clubQueue ? 'room.queue.spectator.position.hc' : 'room.queue.spectator.position')
        : (clubQueue ? 'room.queue.position.hc' : 'room.queue.position');
    const stacked = spectator || canChangeQueue;

    const arrange = ({ find }: TemplateWindows) => {
        if (!stacked) return;

        const content = find('cancel_button')?.parent;
        const cancel = find('cancel_button');

        if (!content || !cancel) return;

        const centre = (window: { width: number }) => Math.trunc((content.width - window.width) / 2);
        const change = canChangeQueue ? find('change_button') : undefined;

        cancel.setX(centre(cancel));
        cancel.setY(content.height - (change ? CHANGE_ROW_HEIGHT : 0) - cancel.height);

        if (change) {
            change.setX(centre(change));
            change.setY(content.height - change.height);
        }

        if (spectator) find('spectator_info')?.setRectangle(...SPECTATOR_INFO_RECT);
    };

    return (
        <TemplateWindow
            id={QUEUE_TEMPLATE}
            frame={{ id: 'room-queue', defaultPosition: LAYOUT_POSITION, rememberPosition: false, onClose: onExit }}
            height={canChangeQueue ? CHANGE_FRAME_HEIGHT : undefined}
            parameters={{ [positionKey]: { position: String(position) } }}
            bindings={{
                info_text: { caption: `\${${positionKey}}` },
                spectator_info: { visible: spectator },
                cancel_button: { onPointerTap: onExit },
                change_button: { visible: canChangeQueue, onPointerTap: onChangeQueue },
            }}
            arrange={arrange}
        />
    );
};
