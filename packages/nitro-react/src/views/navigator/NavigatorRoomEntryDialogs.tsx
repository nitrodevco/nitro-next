import { useState } from 'react';

import { goToRoom, quitRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { NavigatorRoomEntryDialog, useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { TemplateWindow, useTemplateFrame } from '#base/theme';

/**
 * `doorbell` and `passwd_input`'s frames stand where their layouts put them: `IncomingMessages`
 * opens both with no point to centre them on.
 */
const DOORBELL_POSITION = { x: 131, y: 129 };
const PASSWORD_POSITION = { x: 100, y: 74 };

interface DialogProps {
    dialog: NavigatorRoomEntryDialog;
    onClose: () => void;
}

/**
 * `GuestRoomDoorbell` over `habbo-navigator-com/doorbell_xml`. `show` fills in the room's name and,
 * before ringing, `navigator.doorbell.info` with the ring button; `ringDoorbell` asks for the room
 * and hides the window until the server answers. `showWaiting` (the server took the ring) and
 * `showNoAnswer` hide the ring button and say so; from then on the cancel - `cancel_region` or the
 * header close - also quits the room session it was waiting on.
 */
const DoorbellDialog = ({ dialog, onClose }: DialogProps) => {
    const { setRoomEntryDialogMode } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const { room, mode } = dialog;
    const waiting = (mode === 'doorbell_waiting') || (mode === 'doorbell_no_answer');

    // `close`: while waiting, cancelling also quits the pending room session.
    const cancel = () => {
        if (waiting) quitRoom(send);

        onClose();
    };
    const frame = useTemplateFrame({ id: 'navigator_doorbell', defaultPosition: DOORBELL_POSITION, rememberPosition: false, onClose: cancel });

    const info = (mode === 'doorbell_no_answer') ? '${navigator.doorbell.no.answer}' : (waiting ? '${navigator.doorbell.waiting}' : '${navigator.doorbell.info}');

    return (
        <TemplateWindow
            id="habbo-navigator-com/doorbell_xml"
            frame={frame}
            bindings={{
                room_name: { caption: interpolate(room.name) },
                info: { caption: info },
                cancel: { caption: waiting ? '${navigator.doorbell.button.cancel.entering}' : '${generic.cancel}' },
                cancel_region: { onPointerTap: cancel },
                ring: {
                    visible: !waiting,
                    // `ringDoorbell`: `goToRoom(flatId, true)`, then `hide()` until the server answers.
                    onPointerTap: () => {
                        goToRoom(send, room.roomId);
                        setRoomEntryDialogMode('doorbell_rung');
                    },
                },
            }}
        />
    );
};

/**
 * `GuestRoomPasswordInput` over `habbo-navigator-com/password_input_xml`. `show` fills in the room's
 * name, empties `password_input` and says `navigator.password.info`; `onTry` asks for the room with
 * what was typed and hides the window, which a refusal (`GenericErrorMessage` -100002) brings back
 * with `navigator.password.retryinfo` and the field emptied again (`showRetry`). Enter in the field
 * does nothing, as in Flash: only `try` sends.
 */
const PasswordDialog = ({ dialog, onClose }: DialogProps) => {
    const { setRoomEntryDialogMode } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const frame = useTemplateFrame({ id: 'navigator_password', defaultPosition: PASSWORD_POSITION, rememberPosition: false, onClose });
    const [ password, setPassword ] = useState('');
    const { room, mode } = dialog;

    return (
        <TemplateWindow
            id="habbo-navigator-com/password_input_xml"
            frame={frame}
            bindings={{
                room_name: { caption: interpolate(room.name) },
                info: { caption: (mode === 'password_retry') ? '${navigator.password.retryinfo}' : '${navigator.password.info}' },
                password_input: { caption: password, onChange: setPassword },
                cancel_region: { onPointerTap: onClose },
                try: {
                    onPointerTap: () => {
                        goToRoom(send, room.roomId, password);
                        setRoomEntryDialogMode('password_sent');
                    },
                },
            }}
        />
    );
};

/**
 * `SimpleAlertView` over `habbo-navigator-com/nav_simple_alert_xml`, the alert the navigator's
 * can't-connect and generic error handlers raise: the frame captioned with its title, `body_text`
 * its message, centred on the desktop (`AlertView.show`). OK or the header close dismisses it.
 */
const SimpleAlert = ({ titleKey, messageKey, onClose }: { titleKey: string; messageKey: string; onClose: () => void }) => {
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'navigator_alert', centered: true, rememberPosition: false, onClose });

    return (
        <TemplateWindow
            id="habbo-navigator-com/nav_simple_alert_xml"
            frame={frame}
            bindings={{
                '': { caption: t(titleKey) },
                body_text: { caption: t(messageKey) },
                ok: { onPointerTap: onClose },
            }}
        />
    );
};

/**
 * The navigator's room-entry popups - the doorbell, the password input and the simple alert. They
 * live outside the navigator window so they stay up after it closes: Flash builds them on the
 * desktop, not inside the navigator frame. A dialog that is sent off (`doorbell_rung`,
 * `password_sent`) is hidden, not closed, until the server answers; each opening of the password
 * input starts with an empty field.
 */
export const NavigatorRoomEntryDialogs = () => {
    const roomEntryDialog = useNavigatorStore(x => x.roomEntryDialog);
    const alert = useNavigatorStore(x => x.alert);
    const { setRoomEntryDialog, setAlert } = useNavigatorActions();
    const mode = roomEntryDialog?.mode;
    const showDoorbell = (mode === 'doorbell') || (mode === 'doorbell_waiting') || (mode === 'doorbell_no_answer');
    const showPassword = (mode === 'password') || (mode === 'password_retry');
    const closeDialog = () => setRoomEntryDialog(undefined);

    return (
        <>
            {roomEntryDialog && showDoorbell && (
                <DoorbellDialog
                    dialog={roomEntryDialog}
                    onClose={closeDialog}
                />
            )}
            {roomEntryDialog && showPassword && (
                <PasswordDialog
                    // `show` empties the field each time it opens, the retry included.
                    key={mode}
                    dialog={roomEntryDialog}
                    onClose={closeDialog}
                />
            )}
            {alert && (
                <SimpleAlert
                    titleKey={alert.titleKey}
                    messageKey={alert.messageKey}
                    onClose={() => setAlert(undefined)}
                />
            )}
        </>
    );
};
