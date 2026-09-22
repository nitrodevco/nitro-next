import { useTranslation } from '#base/context/system';
import { Button, Frame, ThemeText } from '#base/theme';

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

/**
 * Where you are in the line into a full room, on the `room_queue` layout (229x118, frame style 3,
 * margins 6/25/6/5) that `RoomQueueWidget.createWindow` builds. Closing it is leaving: Flash
 * wired the close button to the same exit as the button under it.
 *
 * The layout's `spectator_info` and `change_button` are `visible="false"` and Flash's widget never
 * shows them; the port shows them for the spectator line and when the server offers another line.
 * Their rects in the layout overlap `cancel_button` (and `change_button` sits below the frame), so
 * while either is up the view keeps the port's own stacking (and grows the frame for the change
 * button); with neither, every control is at the layout's pixels.
 */
export const RoomQueueView = ({ position, spectator, clubQueue, canChangeQueue, onChangeQueue, onExit }: RoomQueueViewProps) => {
    const t = useTranslation();

    const positionKey = spectator
        ? (clubQueue ? 'room.queue.spectator.position.hc' : 'room.queue.spectator.position')
        : (clubQueue ? 'room.queue.position.hc' : 'room.queue.position');
    const stacked = spectator || canChangeQueue;

    return (
        <Frame
            variant="3"
            id="room-queue"
            caption={t('room.queue.title')}
            tintColor="#418db0"
            dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
            onClose={onExit}
            defaultPosition={{ x: 160, y: 120 }}
            rememberPosition={false}
            resizeDirection="none"
            margins={[ 6, 25, 6, 5 ]}
            layout={{ position: 'absolute', width: 229, height: canChangeQueue ? 176 : 118 }}
        >
            <ThemeText
                text={t(positionKey, 'Your position in the queue: %position%', { position: String(position) })}
                textStyle="u_bold"
                textOptions={{ wordWrap: true, wordWrapWidth: 213, align: 'center' }}
                name="info_text"
                verticalAlign="top"
                layout={{ position: 'absolute', left: 0, width: 217, top: 21, height: 17 }}
            />
            {spectator && (
                <ThemeText
                    text={t('room.queue.spectator.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 200 }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    name="spectator_info"
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 14, width: 200, top: 58, height: 29 }}
                />
            )}
            <Button
                variant="3"
                name="cancel_button"
                onPointerTap={onExit}
                layout={stacked
                    ? { position: 'absolute', alignSelf: 'center', width: 154, bottom: canChangeQueue ? 34 : 0, height: 27 }
                    : { position: 'absolute', left: 31, width: 154, top: 50, height: 27 }}
            >
                {t('room.queue.button.exit')}
            </Button>
            {canChangeQueue && (
                <Button
                    variant="3"
                    name="change_button"
                    onPointerTap={onChangeQueue}
                    layout={{ position: 'absolute', alignSelf: 'center', width: 178, bottom: 0, height: 26 }}
                >
                    {t('room.queue.spectatormode')}
                </Button>
            )}
        </Frame>
    );
};
