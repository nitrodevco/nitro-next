import { ColorConverter, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { SetRoomBackgroundColorDataComposer, UseFurnitureComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { FurnitureBackgroundColorView } from '#base/views/room-widgets/furniture/FurnitureBackgroundColorView';

/**
 * The background toner. Its three channels live on the furni's model, so the dialog opens with
 * whatever the room is wearing; changing a slider only moves the swatch, and Apply is what
 * sends the colour on. The room itself is tinted by the toner's own state event coming back,
 * never by the dialog - the same one-way street Flash used.
 */
export const FurnitureBackgroundColorWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.BACKGROUND_COLOR);
    const room = useRoomSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ draft, setDraft ] = useState<{ hue: number; saturation: number; lightness: number } | undefined>(undefined);
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);

    const objectId = request?.objectId ?? -1;

    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setDraft(undefined);
    }

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const current = draft ?? {
        hue: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureRoomBackgroundColorHue) ?? 0,
        saturation: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureRoomBackgroundColorSaturation) ?? 0,
        lightness: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureRoomBackgroundColorLightness) ?? 0,
    };

    /* The three channels are one packed colour, which is what the dialog's swatch shows. */
    const previewColor = ColorConverter.hslToRGB(
        ((current.hue & 0xFF) << 16) | ((current.saturation & 0xFF) << 8) | (current.lightness & 0xFF),
    );

    return (
        <FurnitureBackgroundColorView
            hue={current.hue}
            saturation={current.saturation}
            lightness={current.lightness}
            previewColor={`#${previewColor.toString(16).padStart(6, '0')}`}
            isOn={roomObject.getState() === 1}
            onChange={(hue, saturation, lightness) => setDraft({ hue, saturation, lightness })}
            onApply={() => send(new SetRoomBackgroundColorDataComposer({ objectId: request.objectId, ...current }))}
            onToggle={() => send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.BACKGROUND_COLOR)}
        />
    );
};
