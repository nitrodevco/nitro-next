import { OpenFlatConnectionComposer, QuitComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, Frame } from '#base/theme';

/**
 * GuestRoomDoorbell — layout doorbell (270x182, frame style 3, margins 6/25/6/7)
 * at (131,129): room_name (10,14) Ubuntu 12 bold, info (10,35) 240x66 word-wrapped,
 * button bar (10,108) 240x36 #EAECE8 holding the underlined cancel link (region 86
 * wide, text at 3,8) and the ring button (45,4) 190x28 style 3.
 *
 * Ring sends a plain OpenFlatConnection and hides the window; the waiting state
 * comes back as DoorbellMessage with an empty username. Once waiting, closing the
 * window (cancel or X) sends the cancel-entering composer.
 */
export const NavigatorDoorbellView = () => {
    const { doorbell } = useNavigatorSelectors();
    const { hideDoorbellWindow, closeDoorbell } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    if (!doorbell || !doorbell.visible) return null;

    const info = doorbell.noAnswer
        ? t('navigator.doorbell.no.answer')
        : (doorbell.waiting ? t('navigator.doorbell.waiting') : t('navigator.doorbell.info'));

    const ring = () => {
        send(new OpenFlatConnectionComposer({ roomId: doorbell.room.roomId, password: '', unknown1: -1 }));

        hideDoorbellWindow();
    };

    const close = () => {
        if (doorbell.waiting) send(new QuitComposer({}));

        closeDoorbell();
    };

    return (
        <Frame
            caption={t('navigator.doorbell.title')}
            className="absolute left-32.75 top-32.25 w-67.5 h-45.5"
            id="navigator-doorbell"
            resizeDirection="none"
            variant="3"
            onClose={close}>
            <div className="relative size-full">
                <span className="absolute left-2.5 top-3.5 block font-ubuntu text-xs font-bold whitespace-nowrap">{doorbell.room.name}</span>
                <span className="absolute left-2.5 top-8.75 block w-60 h-16.5 font-ubuntu text-xs break-words">{info}</span>
                <div className="absolute left-2.5 top-27 w-60 h-9 bg-[#EAECE8]">
                    <div className="absolute left-0 top-0 w-21.5 h-full flex items-center cursor-pointer" onClick={close}>
                        <span className="pl-0.75 font-ubuntu text-xs underline">
                            {(doorbell.waiting || doorbell.noAnswer) ? t('navigator.doorbell.button.cancel.entering') : t('generic.cancel')}
                        </span>
                    </div>
                    {!doorbell.waiting && !doorbell.noAnswer &&
                        <Button className="absolute left-11.25 top-1 w-47.5 h-7" variant="3" onClick={ring}>
                            {t('navigator.doorbell.button.ring')}
                        </Button>}
                </div>
            </div>
        </Frame>
    );
}
