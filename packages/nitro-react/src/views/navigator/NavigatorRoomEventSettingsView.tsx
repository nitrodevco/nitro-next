import { useState } from 'react';

import { editRoomEvent } from '#base/commands';
import { useWebSocketContext } from '#base/context/communication';
import { useNavigatorActions, useNavigatorStore } from '#base/context/navigator';
import { useTranslation } from '#base/context/system';
import { TemplateBindings, TemplateWindow, useTemplateFrame } from '#base/theme';

import { NavigatorErrorPopup } from './NavigatorErrorPopup';

/**
 * The room event's settings - `RoomEventViewCtrl` over `habbo-navigator-com/iro_event_settings_xml`,
 * which the event card's edit link toggles.
 *
 * `show` fills the fields from the running event under `navigator.eventsettings.editcaption`; with
 * no event it is `navigator.createevent` with both fields back at their empty info text
 * (`goBackToInitialState`). Each field is a `TextFieldManager` (25 and 100 characters): the first
 * focus of a field holding its info text empties it, and leaving either field saves the event
 * (`onUnfocus` -> `save`) once the name passes `checkMandatory` - else the name turns
 * `0xf1a39b` with `navigator.eventsettings.nameerr` over it. A `RoomAdErrorMessage` puts the
 * server's filtered text back in the field it names, with `roomad.error.0.description` over it.
 *
 * The layout's `buttons` container is empty and nothing in Flash adds to it: `onEndButtonClick`
 * (`CancelEventMessageComposer`) and `onCancelButtonClick` are never wired, so there is no way to
 * end an event from here.
 */
const TEMPLATE = 'habbo-navigator-com/iro_event_settings_xml';

/** The `TextFieldManager` limits `prepareWindow` builds the two fields with. */
const MAX_NAME_LENGTH = 25;
const MAX_DESCRIPTION_LENGTH = 100;

/** `displayError`'s `textBackgroundColor`. */
const ERROR_BACKGROUND = 0xf1a39b;

/** `event_name` and `event_desc` in `inputs_cont`, where `displayError` puts its popup over them. */
const NAME_FIELD = { left: 0, top: 16, width: 217 };
const DESCRIPTION_FIELD = { left: 0, top: 52, width: 217 };

/** `RoomAdErrorMessageParser.errorCode`: which field the server filtered. */
const ROOM_AD_ERROR_NAME = 0;
const ROOM_AD_ERROR_DESCRIPTION = 1;

/** A `TextFieldManager`'s field: its text, whether it still holds its (empty) info text, and its error. */
interface ManagedField {
    text: string;
    info: boolean;
    error: string | undefined;
}

/** `checkMandatory`'s `isInputValid`: not the info text, and more than two characters once trimmed. */
const isFieldValid = (field: ManagedField) => !field.info && (field.text.trim().length > 2);

export const NavigatorRoomEventSettingsView = () => {
    const roomEventData = useNavigatorStore(x => x.roomEventData);
    const roomAdError = useNavigatorStore(x => x.roomAdError);
    const { setRoomEventSettingsVisible } = useNavigatorActions();
    const { send } = useWebSocketContext();
    const t = useTranslation();
    const frame = useTemplateFrame({ id: 'navigator_room_event_settings', centered: true, onClose: () => setRoomEventSettingsVisible(false) });

    // `show` -> `editEvent` / `createEvent`, with `clearErrors` first.
    const [ name, setName ] = useState<ManagedField>(() => (roomEventData ? { text: roomEventData.eventName, info: false, error: undefined } : { text: '', info: true, error: undefined }));
    const [ description, setDescription ] = useState<ManagedField>(() => (roomEventData ? { text: roomEventData.eventDescription, info: false, error: undefined } : { text: '', info: true, error: undefined }));
    const [ seenRoomAdError, setSeenRoomAdError ] = useState(roomAdError);

    // `onRoomAdError`: `clearErrors`, then the field the server refused takes its filtered text and the error.
    if (seenRoomAdError !== roomAdError) {
        setSeenRoomAdError(roomAdError);

        if (roomAdError) {
            const refused = { text: roomAdError.filteredText, info: false, error: t('roomad.error.0.description') };

            setName(field => ((roomAdError.errorCode === ROOM_AD_ERROR_NAME) ? refused : { ...field, error: undefined }));
            setDescription(field => ((roomAdError.errorCode === ROOM_AD_ERROR_DESCRIPTION) ? refused : { ...field, error: undefined }));
        }
    }

    /** `onInputClick` on `WE_FOCUSED`: a field holding its info text is emptied and its colour restored. */
    const focus = (setField: (update: (field: ManagedField) => ManagedField) => void) => setField(field => (field.info ? { text: '', info: false, error: field.error } : field));

    /** `onUnfocus` -> `save`: `isMandatoryFieldsFilled`, then `EditEventMessageComposer` for the running event. */
    const save = () => {
        if (!roomEventData) return;

        setDescription(field => ({ ...field, error: undefined }));

        if (!isFieldValid(name)) {
            setName(field => ({ ...field, error: t('navigator.eventsettings.nameerr') }));

            return;
        }

        setName(field => ({ ...field, error: undefined }));

        editRoomEvent(send, roomEventData.adId, name.info ? '' : name.text, description.info ? '' : description.text);
    };

    const bindings: TemplateBindings = {
        '': { caption: roomEventData ? t('navigator.eventsettings.editcaption') : t('navigator.createevent') },
        event_name: {
            caption: name.text,
            maxChars: MAX_NAME_LENGTH,
            backgroundColor: name.error ? ERROR_BACKGROUND : undefined,
            onFocus: () => focus(setName),
            onChange: text => setName(field => ({ ...field, text, info: false })),
            onBlur: save,
        },
        event_desc: {
            caption: description.text,
            maxChars: MAX_DESCRIPTION_LENGTH,
            backgroundColor: description.error ? ERROR_BACKGROUND : undefined,
            onFocus: () => focus(setDescription),
            onChange: text => setDescription(field => ({ ...field, text, info: false })),
            onBlur: save,
        },
        inputs_cont: {
            children: (
                <>
                    {name.error && (
                        <NavigatorErrorPopup
                            text={name.error}
                            fieldLeft={NAME_FIELD.left}
                            fieldTop={NAME_FIELD.top}
                            fieldWidth={NAME_FIELD.width}
                        />
                    )}
                    {description.error && (
                        <NavigatorErrorPopup
                            text={description.error}
                            fieldLeft={DESCRIPTION_FIELD.left}
                            fieldTop={DESCRIPTION_FIELD.top}
                            fieldWidth={DESCRIPTION_FIELD.width}
                        />
                    )}
                </>
            ),
        },
    };

    return (
        <TemplateWindow
            id={TEMPLATE}
            frame={frame}
            bindings={bindings}
        />
    );
};
