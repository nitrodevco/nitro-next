import { QuitComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { goToRoom } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

const DIALOG_POSITION = { position: 'absolute', top: 120, left: 320 } as const;

/**
 * Port of the Flash navigator's room-entry popups: `GuestRoomDoorbell` (`doorbell_xml`),
 * `GuestRoomPasswordInput` (`password_input_xml`, layout "passwd_input") and the `SimpleAlertView`
 * (`nav_simple_alert_xml`) the cant-connect / generic-error handlers raise. Lives outside the navigator window so it stays up after the
 * navigator closes (Flash builds them on the desktop, not inside the navigator frame).
 */
export const NavigatorRoomEntryDialogs = () => {
    const roomEntryDialog = useNavigatorStore(x => x.roomEntryDialog);
    const alert = useNavigatorStore(x => x.alert);
    const { setRoomEntryDialog, setRoomEntryDialogMode, setAlert } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const interpolate = useInterpolate();
    const t = useTranslation();
    const [ password, setPassword ] = useState('');

    const closeDialog = () => {
        setRoomEntryDialog(undefined);
        setPassword('');
    };

    const renderDoorbell = () => {
        if (!roomEntryDialog) return null;

        const { room, mode } = roomEntryDialog;
        const waiting = mode === 'doorbell_waiting' || mode === 'doorbell_no_answer';
        const info = mode === 'doorbell_no_answer' ? t('navigator.doorbell.no.answer') : waiting ? t('navigator.doorbell.waiting') : t('navigator.doorbell.info');

        // ringDoorbell(): goToRoom(flatId, true) then hide() - the window comes back when the server answers
        const ring = () => {
            goToRoom(send, room.roomId);
            setRoomEntryDialogMode('doorbell_rung');
        };

        // close(): while waiting, cancelling also quits the pending room session
        const cancel = () => {
            if (waiting) send(new QuitComposer({}));

            closeDialog();
        };

        return (
            <Frame
                variant="3"
                id="navigator-doorbell"
                caption={t('navigator.doorbell.title')}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                onClose={cancel}
                resizeDirection="none"
                margins={[ 6, 25, 6, 7 ]}
                layout={{ ...DIALOG_POSITION, width: 270, height: 182, minWidth: 270, minHeight: 182 }}
            >
                <ThemeText
                    name="room_name"
                    text={interpolate(room.name)}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, top: 14 }}
                />
                <ThemeText
                    name="info"
                    text={info}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, wordWrap: true, wordWrapWidth: 236 }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, right: 8, top: 35, bottom: 49 }}
                />
                <Region
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 240, top: 108, height: 36 }}
                >
                    <Region
                        name="cancel_region"
                        onPointerTap={cancel}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 86, top: 0, height: 36 }}
                    >
                        <ThemeText
                            name="cancel"
                            text={waiting ? t('navigator.doorbell.button.cancel.entering') : t('generic.cancel')}
                            textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                            flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 3, top: 8 }}
                        />
                    </Region>
                    {!waiting && (
                        <Button
                            variant="3"
                            name="ring"
                            onPointerTap={ring}
                            // 190 wide in the layout, but a button fits its caption (`ButtonController`'s
                            // `WE_CHILD_RESIZED` -> `width = 0`), keeping its right edge (on_resize_align_right).
                            layout={{ position: 'absolute', right: 5, top: 4, height: 28 }}
                        >
                            {t('navigator.doorbell.button.ring')}
                        </Button>
                    )}
                </Region>
            </Frame>
        );
    };

    const renderPasswordInput = () => {
        if (!roomEntryDialog) return null;

        const { room, mode } = roomEntryDialog;

        // onTry(): goToRoom(flatId, true, password) then hide() - a rejection (GenericError -100002) re-shows it with the retry text
        const tryPassword = () => {
            goToRoom(send, room.roomId, password);
            setRoomEntryDialogMode('password_sent');
        };

        return (
            <Frame
                variant="3"
                id="navigator-password"
                caption={t('navigator.password.title')}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                onClose={closeDialog}
                resizeDirection="none"
                margins={[ 6, 25, 6, 7 ]}
                layout={{ ...DIALOG_POSITION, width: 237, height: 217, minWidth: 237, minHeight: 217 }}
            >
                <ThemeText
                    name="room_name"
                    text={interpolate(room.name)}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ bold: true, antiAliasType: 'advanced' }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 176, top: 16, height: 16 }}
                />
                <ThemeText
                    name="info"
                    text={mode === 'password_retry' ? t('navigator.password.retryinfo') : t('navigator.password.info')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12, wordWrap: true, wordWrapWidth: 201 }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 205, top: 35, height: 68 }}
                />
                <ThemeText
                    text={t('navigator.password.enter')}
                    textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                    flashFormat={{ antiAliasType: 'advanced' }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 97, top: 107, height: 21 }}
                />
                <TextInput
                    password
                    value={password}
                    onChange={setPassword}
                    onEnter={tryPassword}
                    fontFamily="Ubuntu"
                    fontSize={12}
                    flashPlacement
                    border="#000000"
                    alwaysShowSelection
                    backgroundColor={null}
                    focusedBackgroundColor={null}
                    layout={{ position: 'absolute', left: 113, width: 100, top: 107, height: 19 }}
                />
                <Region
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 207, top: 142, height: 34, overflow: 'hidden' }}
                >
                    <Region
                        name="cancel_region"
                        onPointerTap={closeDialog}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 83, top: 5, height: 26 }}
                    >
                        <ThemeText
                            name="cancel"
                            text={t('generic.cancel')}
                            textOptions={{ fontFamily: 'Ubuntu', fontSize: 12 }}
                            flashFormat={{ underline: true, antiAliasType: 'advanced' }}
                            verticalAlign="top"
                            layout={{ position: 'absolute', left: 0, top: 3 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        name="try"
                        onPointerTap={tryPassword}
                        // 188 wide in the layout, but a button fits its caption (`ButtonController`'s
                        // `WE_CHILD_RESIZED` -> `width = 0`).
                        layout={{ position: 'absolute', left: 110, top: 3, height: 28 }}
                    >
                        {t('navigator.password.button.try')}
                    </Button>
                </Region>
            </Frame>
        );
    };

    const renderAlert = () => {
        if (!alert) return null;

        return (
            <Frame
                variant="3"
                id="navigator-alert"
                caption={t(alert.titleKey)}
                tintColor="#418db0"
                dropShadow={{ distance: 4, alpha: 0.35, blur: 4 }}
                onClose={() => setAlert(undefined)}
                // `AlertView`: centred on the desktop (`Util.getLocationRelativeTo`).
                centered
                rememberPosition={false}
                resizeDirection="none"
                margins={[ 6, 25, 6, 7 ]}
                layout={{ position: 'absolute', width: 193, height: 157, minWidth: 193, minHeight: 157 }}
            >
                <ThemeText
                    name="body_text"
                    text={t(alert.messageKey)}
                    textStyle="regular"
                    textOptions={{ wordWrap: true, wordWrapWidth: 156 }}
                    clip
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 12, width: 160, top: 14, height: 78 }}
                />
                <Button
                    variant="3"
                    name="ok"
                    onPointerTap={() => setAlert(undefined)}
                    layout={{ position: 'absolute', left: 62, width: 60, top: 97, height: 22, minWidth: 60, maxWidth: 60 }}
                >
                    {t('generic.ok')}
                </Button>
            </Frame>
        );
    };

    const mode = roomEntryDialog?.mode;
    const showDoorbell = mode === 'doorbell' || mode === 'doorbell_waiting' || mode === 'doorbell_no_answer';
    const showPassword = mode === 'password' || mode === 'password_retry';

    return (
        <>
            {showDoorbell && renderDoorbell()}
            {showPassword && renderPasswordInput()}
            {renderAlert()}
        </>
    );
};
