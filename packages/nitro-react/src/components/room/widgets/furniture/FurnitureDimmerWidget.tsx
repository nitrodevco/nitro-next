import { RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { RoomDimmerChangeStateComposer, RoomDimmerGetPresetsComposer, RoomDimmerPresetsMessageType, RoomDimmerSavePresetComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { FurnitureDimmerView } from '#base/views/room-widgets/furniture/FurnitureDimmerView';

/** `#RRGGBB`, upper case, the shape `RoomSession.sendRoomDimmerSavePresetMessage` puts on the wire. */
const colorHex = (color: number) => `#${color.toString(16).padStart(6, '0').toUpperCase()}`;

type Mood = { color: number; brightness: number; effectId: number };

const sameMood = (a: Mood, b: Mood) => a.color === b.color && a.brightness === b.brightness && a.effectId === b.effectId;

/**
 * The room dimmer. Opening it asks the server for the room's three saved moods; everything the
 * dialog shows comes back in that one packet, so there is no state to keep between openings.
 *
 * Editing a mood previews it in your own room straight away - the same
 * `updateRoomObjectRoomColor` Flash used for its preview - and Apply is what sends it, which is
 * when everyone else sees it and the dimmer's own state event lights the room for good.
 */
export const FurnitureDimmerWidget = () => {
    const request = useRoomWidget<RoomDimmerPresetsMessageType>(RoomObjectWidgetRequestEvent.DIMMER);
    const room = useRoom();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();

    const presetData = request?.data;
    const [ selectedPresetId, setSelectedPresetId ] = useState<number>(-1);
    const [ draft, setDraft ] = useState<Mood | undefined>(undefined);
    // Moods saved from this dialog since the presets came, by preset id: Flash keeps them in its own
    // preset items (`DimmerFurniWidget.storeCurrentSetting`), so a tab shows its edit again.
    const [ saved, setSaved ] = useState<Record<number, Mood>>({});
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);
    const [ lastPresets, setLastPresets ] = useState<RoomDimmerPresetsMessageType['presets'] | undefined>(undefined);

    const objectId = request?.objectId ?? -1;

    // A different dimmer starts from its own presets, never the last one's choices.
    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setSelectedPresetId(-1);
        setDraft(undefined);
    }

    // New presets start the dialog over on the selected one (`DimmerFurniWidget.onPresets`). The
    // dimmer's own state coming back - after Apply, Turn off, Turn on - only says on or off
    // (`onDimmerState` sets `isOn` and `DimmerView.update` redoes the buttons): the preset shown
    // and its edit stay, so the brightness knob stays where it was let go.
    if (presetData?.presets !== lastPresets) {
        setLastPresets(presetData?.presets);
        setSelectedPresetId(-1);
        setDraft(undefined);
        setSaved({});
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

    const moodOf = (entry: typeof preset): Mood => saved[entry.id] ?? { color: entry.color, brightness: entry.light, effectId: entry.type };

    const current = draft ?? moodOf(preset);

    /** `storeCurrentSetting`: while on, the mood shown is saved to its preset, unless it is that preset already and not applied. */
    const store = (apply: boolean) => {
        if (!presetData.isOn) return;
        if (!apply && sameMood(current, moodOf(preset))) return;

        setSaved({ ...saved, [preset.id]: current });
        send(new RoomDimmerSavePresetComposer({
            presetNumber: preset.id,
            effectTypeId: current.effectId,
            colorHex: colorHex(current.color),
            brightness: current.brightness,
            apply,
            objectId,
        }));
    };

    /** Lights your own room with the mood being edited, without telling anyone else. */
    const preview = (next: Mood) => {
        setDraft(next);
        room.updateRoomObjectRoomColor(next.color, next.brightness, next.effectId === 2);
    };

    // Flash `DimmerView.onTabClick` stores the mood being left, unapplied, before it shows the next.
    const selectPreset = (id: number) => {
        const chosen = presetData.presets.find(entry => entry.id === id);

        if (!chosen || chosen.id === preset.id) return;

        store(false);
        setSelectedPresetId(id);
        setDraft(undefined);

        const mood = moodOf(chosen);

        room.updateRoomObjectRoomColor(mood.color, mood.brightness, mood.effectId === 2);
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
            onApply={() => store(true)}
            onToggle={() => send(new RoomDimmerChangeStateComposer({ objectId }))}
            onClose={() => closeRoomWidget(RoomObjectWidgetRequestEvent.DIMMER)}
        />
    );
};
