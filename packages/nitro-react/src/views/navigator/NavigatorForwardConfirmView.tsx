import { GetGuestRoomComposer } from '@nitrodevco/nitro-packets';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { Button, Frame } from '#base/theme';

/**
 * navigator/ask_forward/<roomId> — once the room data arrives windowManager.confirm
 * raises ${navigator.forward_confirmation.title} with the desc's room_name filled in;
 * OK forwards through goToPrivateRoom (the GetGuestRoom roomForward flow).
 */
export const NavigatorForwardConfirmView = () => {
    const { forwardConfirm } = useNavigatorSelectors();
    const { hideForwardConfirm } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();

    if (!forwardConfirm) return null;

    const confirm = () => {
        send(new GetGuestRoomComposer({ roomId: forwardConfirm.roomId, enterRoom: false, roomForward: true }));

        hideForwardConfirm();
    };

    return (
        <Frame
            caption={t('navigator.forward_confirmation.title')}
            className="inset-0 m-auto w-48.25 h-39.25"
            id="navigator-forward-confirm"
            resizeDirection="none"
            variant="3"
            onClose={hideForwardConfirm}>
            <div className="relative size-full">
                <span className="absolute top-3.5 left-3 block w-40 h-19.5 text-style-regular break-words">
                    {t('navigator.forward_confirmation.desc', undefined, { room_name: forwardConfirm.roomName })}
                </span>
                <div className="absolute top-24.25 left-3 right-3 flex justify-between">
                    <Button className="w-15 h-5.5" variant="3" onClick={hideForwardConfirm}>{t('generic.cancel')}</Button>
                    <Button className="w-15 h-5.5" variant="3" onClick={confirm}>{t('generic.ok')}</Button>
                </div>
            </div>
        </Frame>
    );
}
