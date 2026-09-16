import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RoomDimmerChangeStateComposer, RoomDimmerGetPresetsComposer, RoomDimmerPresetsMessageType, RoomDimmerSavePresetComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { useRoomDimmerHandler } from '#base/handlers';
import { FurnitureDimmerView } from '#base/views/room-widgets/furniture/FurnitureDimmerView';

/** `#RRGGBB`, upper case, the shape `RoomSession.sendRoomDimmerSavePresetMessage` puts on the wire. */
const colorHex = (color: number) => `#${color.toString(16).padStart(6, '0').toUpperCase()}`;

/**
 * The room dimmer. Opening it asks the server for the room's three saved moods; everything the
 * dialog shows comes back in that one packet, so there is no state to keep between openings.
 *
 * Editing a mood previews it in your own room straight away - the same
 * `updateRoomObjectRoomColor` Flash used for its preview - and Apply is what sends it, which is
 * when everyone else sees it and the dimmer's own state event lights the room for good.
 */
export const FurnitureDimmerWidget = () => {
    // Only this dialog is told these things, and only while it is open.
    useRoomDimmerHandler();

    const request = useRoomWidget<RoomDimmerPresetsMessageType>(RoomObjectWidgetRequestEvent.DIMMER);
    const room = useRoomSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const presetData = request?.data;
    const [ selectedPresetId, setSelectedPresetId ] = useState<number>(-1);
    const [ draft, setDraft ] = useState<{ color: number; brightness: number; effectId: number } | undefined>(undefined);
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);

    const objectId = request?.objectId ?? -1;

    // A different dimmer starts from its own presets, never the last one's choices.
    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setSelectedPresetId(-1);
        setDraft(undefined);
    }

    // Opening the dialog is what asks for the presets; a second dimmer asks again.
    useEffect(() => {
        if (objectId < 0) return;

        send(new RoomDimmerGetPresetsComposer({ objectId }));
    }, [ objectId, send ]);

    if (!request || !room || !presetData) return null;

    const presetId = (selectedPresetId > 0) ? selectedPresetId : presetData.selectedPresetId;
    const preset = presetData.presets.find(entry => entry.id === presetId) ?? presetData.presets[0];

    if (!preset) return null;

    const current = draft ?? { color: preset.color, brightness: preset.light, effectId: preset.type };

    /** Lights your own room with the mood being edited, without telling anyone else. */
    const preview = (next: { color: number; brightness: number; effectId: number }) => {
        setDraft(next);
        room.updateRoomObjectRoomColor(next.color, next.brightness, next.effectId === 2);
    };

    const selectPreset = (id: number) => {
        const chosen = presetData.presets.find(entry => entry.id === id);

        setSelectedPresetId(id);
        setDraft(undefined);

        if (chosen) room.updateRoomObjectRoomColor(chosen.color, chosen.light, chosen.type === 2);
    };

    return (
        <FurnitureDimmerView
            presets={presetData.presets}
            selectedPresetId={presetId}
            isOn={presetData.isOn}
            color={current.color}
            brightness={current.brightness}
            effectId={current.effectId}
            onSelectPreset={selectPreset}
            onChangeColor={color => preview({ ...current, color })}
            onChangeBrightness={brightness => preview({ ...current, brightness })}
            onChangeEffect={effectId => preview({ ...current, effectId })}
            onApply={() => send(new RoomDimmerSavePresetComposer({
                presetNumber: presetId,
                effectTypeId: current.effectId,
                colorHex: colorHex(current.color),
                brightness: current.brightness,
                apply: true,
                objectId,
            }))}
            onToggle={() => send(new RoomDimmerChangeStateComposer({ objectId }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.DIMMER)}
        />
    );
};
