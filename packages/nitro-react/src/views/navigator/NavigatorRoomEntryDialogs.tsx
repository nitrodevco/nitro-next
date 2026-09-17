import { QuitComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useInterpolate, useTranslation } from '#base/context/system';
import { useGoToRoom } from '#base/hooks';
import { Border, Box, Button, Frame, Region, TextInput, ThemeText } from '#base/theme';

const DIALOG_POSITION = { position: 'absolute', top: 120, left: 320 } as const;

/**
 * Port of the Flash navigator's room-entry popups: `GuestRoomDoorbell` (doorbell_xml, 3013),
 * `GuestRoomPasswordInput` (passwd_input_xml, 3000) and the `SimpleAlertView` the cant-connect
 * / generic-error handlers raise. Lives outside the navigator window so it stays up after the
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
    const goToRoom = useGoToRoom();

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
            goToRoom(room.roomId);
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
                layout={{ ...DIALOG_POSITION, width: 270, height: 182, minWidth: 270, minHeight: 182 }}
            >
                <ThemeText
                    text={interpolate(room.name)}
                    layout={{ position: 'absolute', left: 10, width: 64, top: 14, height: 17 }}
                />
                <ThemeText
                    text={info}
                    textOptions={{ wordWrap: true, wordWrapWidth: 240 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, right: 8, top: 35, bottom: 40 }}
                />
                <Region
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 240, top: 108, height: 36 }}
                >
                    <Region
                        onPointerTap={cancel}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, right: 154, top: 0, bottom: 0 }}
                    >
                        <ThemeText
                            text={waiting ? t('navigator.doorbell.button.cancel.entering') : t('generic.cancel')}
                            layout={{ position: 'absolute', left: 3, top: 8, height: 17 }}
                        />
                    </Region>
                    {!waiting && (
                        <Button
                            variant="3"
                            onPointerTap={ring}
                            layout={{ position: 'absolute', right: 5, width: 190, top: 4, height: 28 }}
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
            goToRoom(room.roomId, password);
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
                layout={{ ...DIALOG_POSITION, width: 237, height: 217, minWidth: 237, minHeight: 217 }}
            >
                <ThemeText
                    text={interpolate(room.name)}
                    textStyle="text-style-u-bold"
                    layout={{ position: 'absolute', left: 10, width: 176, top: 16, height: 16 }}
                />
                <ThemeText
                    text={mode === 'password_retry' ? t('navigator.password.retryinfo') : t('navigator.password.info')}
                    textOptions={{ wordWrap: true, wordWrapWidth: 205 }}
                    verticalAlign="top"
                    layout={{ position: 'absolute', left: 10, width: 205, top: 35, height: 68 }}
                />
                <ThemeText
                    text={t('navigator.password.enter')}
                    layout={{ position: 'absolute', left: 10, width: 97, top: 107, height: 21 }}
                />
                <TextInput
                    password
                    value={password}
                    onChange={setPassword}
                    onEnter={tryPassword}
                    layout={{ position: 'absolute', left: 113, width: 100, top: 107, height: 19 }}
                />
                <Region
                    backgroundColor="#eaece8"
                    layout={{ position: 'absolute', left: 10, width: 207, top: 142, height: 34 }}
                >
                    <Region
                        onPointerTap={closeDialog}
                        cursor="pointer"
                        layout={{ position: 'absolute', left: 0, width: 83, top: 5, height: 26 }}
                    >
                        <ThemeText
                            text={t('generic.cancel')}
                            layout={{ position: 'absolute', left: 0, right: 0, top: 3, height: 17 }}
                        />
                    </Region>
                    <Button
                        variant="3"
                        onPointerTap={tryPassword}
                        layout={{ position: 'absolute', left: 110, width: 92, top: 3, height: 28 }}
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
                variant="0"
                id="navigator-alert"
                caption={t(alert.titleKey)}
                onClose={() => setAlert(undefined)}
                defaultPosition={{ x: 360, y: 160 }}
                layout={{ position: 'absolute', width: 240 }}
            >
                <Border layout={{ minHeight: 80, paddingLeft: 9, paddingRight: 9, paddingTop: 6, paddingBottom: 6 }}>
                    <ThemeText
                        layout={{ flex: 1 }}
                        text={t(alert.messageKey)}
                        textStyle="text-style-regular"
                        textOptions={{ fill: '#000000', wordWrap: true, wordWrapWidth: 210 }}
                    />
                </Border>
                <Box layout={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginTop: 3 }}>
                    <Button
                        layout={{ height: 22, minWidth: 60 }}
                        onPointerTap={() => setAlert(undefined)}
                    >
                        {t('generic.ok')}
                    </Button>
                </Box>
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
