import { EditEventComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useNavigatorActions, useNavigatorSelectors, useTranslation, useWebSocketContext } from '#base/context';
import { FieldErrorPopup, Frame } from '#base/theme';

/*
 * RoomEventViewCtrl — rev_room_event (241x191, frame style 3): name (max 25) and
 * description (max 100) inputs saving on unfocus via EditEvent(adId, name, desc);
 * caption swaps to editcaption while an event runs, createevent otherwise. The
 * end/cancel buttons are dead in this build (their container ships empty).
 * RoomAdError puts the server's filtered text back into the offending field.
 */
export const NavigatorRoomEventEditorView = () => {
    const { roomEventEditorOpen, roomEventData, roomAdError } = useNavigatorSelectors();
    const { closeRoomEventEditor, setRoomAdError } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const [name, setName] = useState(roomEventData?.eventName ?? '');
    const [description, setDescription] = useState(roomEventData?.eventDescription ?? '');
    const [nameError, setNameError] = useState('');

    if (!roomEventEditorOpen) return null;

    /* onUnfocus — only saves while an event runs; the name is mandatory */
    const save = () => {
        if (!roomEventData) return;

        setNameError('');
        setRoomAdError(undefined);

        if (name.trim() === '') {
            setNameError(t('navigator.eventsettings.nameerr'));

            return;
        }

        send(new EditEventComposer({ id: roomEventData.adId, name, description }));
    };

    /* onRoomAdError — 0 hits the name, 1 the description; filteredText replaces the input */
    const serverNameError = roomAdError?.errorCode === 0 ? t('roomad.error.0.description') : '';
    const serverDescError = roomAdError?.errorCode === 1 ? t('roomad.error.0.description') : '';

    return (
        <Frame
            caption={t(roomEventData ? 'navigator.eventsettings.editcaption' : 'navigator.createevent')}
            className="inset-0 m-auto w-60.25 h-47.75"
            contentClassName="relative"
            id="navigator-room-event-editor"
            resizeDirection="none"
            variant="3"
            onClose={closeRoomEventEditor}>
            {/* inputs_cont (11,4) 218 wide */}
            <span className="absolute left-2.75 top-1 text-style-regular">{t('navigator.eventsettings.name')}</span>
            <div className="absolute left-2.75 top-5 w-54.25">
                {(nameError !== '' || serverNameError !== '') && <FieldErrorPopup className="absolute -top-6 left-0 z-10" text={nameError !== '' ? nameError : serverNameError} />}
                <input
                    className="w-full h-3.75 px-1 bg-white border border-black text-style-regular"
                    maxLength={25}
                    type="text"
                    value={serverNameError !== '' ? roomAdError!.filteredText : name}
                    onBlur={save}
                    onChange={event => { setName(event.target.value); if (serverNameError !== '') setRoomAdError(undefined); }} />
            </div>
            <span className="absolute left-2.75 top-10 text-style-regular">{t('navigator.eventsettings.desc')}</span>
            <div className="absolute left-2.75 top-14 w-54.25">
                {serverDescError !== '' && <FieldErrorPopup className="absolute -top-6 left-0 z-10" text={serverDescError} />}
                <textarea
                    className="w-full h-22 px-1 bg-white border border-black text-style-regular resize-none"
                    maxLength={100}
                    value={serverDescError !== '' ? roomAdError!.filteredText : description}
                    onBlur={save}
                    onChange={event => { setDescription(event.target.value); if (serverDescError !== '') setRoomAdError(undefined); }} />
            </div>
        </Frame>
    );
}
