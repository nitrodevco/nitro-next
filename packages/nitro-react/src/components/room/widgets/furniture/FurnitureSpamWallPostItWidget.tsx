import { IRoomWidgetRequest, RoomWidgetEnum } from '@nitrodevco/nitro-api';
import { AddSpamWallPostItComposer } from '@nitrodevco/nitro-packets';
import { useRef, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { SpamWallPostItData } from '#base/handlers';
import { FurnitureStickieView } from '#base/views/room-widgets/furniture/FurnitureStickieView';

/** `SpamWallPostItFurniWidget.onEditPostItRequest`: a new note is yellow and empty. */
const NEW_NOTE_COLOR = 'FFFF33';

/**
 * The spam wall's note - `SpamWallPostItFurniWidget`, `StickieFurniWidget`'s `stickie` layout opened
 * by the server rather than by a placed post-it. Each request is a fresh note
 * (`onEditPostItRequest`): yellow, empty, and editable with its colours (`controller = true`).
 *
 * Nothing is sent until the note closes: a colour press only recolours it (`sendSetColor`), and the
 * close button sends what is written in the colour picked (`hideInterface(true)` ->
 * `RoomWidgetSpamWallPostItFinishEditingMessage` -> `AddSpamWallPostItMessageComposer`). The bin
 * only closes it (`sendDelete`).
 */
export const FurnitureSpamWallPostItWidget = () => {
    const request = useRoomWidget<SpamWallPostItData>(RoomWidgetEnum.SPAMWALL_POSTIT_WIDGET);

    if (!request?.data) return null;

    return (
        <SpamWallPostItNote
            key={request.sequence}
            request={request}
            data={request.data}
        />
    );
};

const SpamWallPostItNote = ({ request, data }: { request: IRoomWidgetRequest<SpamWallPostItData>; data: SpamWallPostItData }) => {
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ colorHex, setColorHex ] = useState(NEW_NOTE_COLOR);
    const [ text, setText ] = useState('');
    // The note as last written, for the close: the field reports its text as it loses the focus to that same press.
    const latest = useRef({ colorHex: NEW_NOTE_COLOR, text: '' });

    const onClose = () => closeRoomWidget(RoomWidgetEnum.SPAMWALL_POSTIT_WIDGET);

    return (
        <FurnitureStickieView
            objectType={request.objectType}
            colorHex={colorHex}
            text={text}
            canModify
            onSave={(color, message) => {
                latest.current = { colorHex: color, text: message };
                setColorHex(color);
                setText(message);
            }}
            onDelete={onClose}
            onClose={() => {
                send(new AddSpamWallPostItComposer({ objectId: data.itemId, location: data.location, colorHex: latest.current.colorHex, text: latest.current.text }));
                onClose();
            }}
        />
    );
};
