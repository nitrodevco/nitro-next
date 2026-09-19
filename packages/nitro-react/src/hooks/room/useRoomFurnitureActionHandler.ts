import { RoomControllerLevelEnum, RoomObjectCategoryEnum, RoomObjectFurnitureActionEvent, RoomObjectOperationType } from '@nitrodevco/nitro-api';
import { DiceOffComposer, EnterOneWayDoorComposer, GetItemDataComposer, GetJukeboxPlayListComposer, GetNowPlayingComposer, GetSoundMachinePlayListComposer, SpinWheelOfFortuneComposer, ThrowDiceComposer } from '@nitrodevco/nitro-packets';

import { useWebSocketContext } from '#base/context/communication';
import { RoomMusicKind, useOwnControllerLevel, useRoom, useRoomMouseActions, useRoomSelectedObject, useRoomSoundActions } from '#base/context/room';

/**
 * What a furniture logic asks the client to do on its behalf - Flash's
 * `RoomObjectEventHandler.handleRoomObjectFurnitureActionEvent`: the dice, the wheel of fortune,
 * a one-way door and a post-it each send their packet; a sound machine or jukebox announces
 * itself so the room knows what is playing (`handleObjectSoundMachineEvent` /
 * `handleObjectJukeboxEvent`, which raised the `RoomEngineSoundMachineEvent`s the music
 * controller listened to); and an avatar or usable furni claims and releases the pointer cursor.
 */
export const useRoomFurnitureActionHandler = () => {
    const room = useRoom();
    const controllerLevel = useOwnControllerLevel();
    const selectedObject = useRoomSelectedObject();
    const { addCursorOwner, removeCursorOwner } = useRoomMouseActions();
    const { setRoomMusic, setRoomMusicPlaying, clearRoomMusic } = useRoomSoundActions();
    const { send } = useWebSocketContext();

    /** Flash ignored a machine that was only being carried across the room, not placed yet. */
    const isBeingPlaced = (objectId: number, category: RoomObjectCategoryEnum) =>
        !!selectedObject && (selectedObject.objectId === objectId) && (selectedObject.category === category) && (selectedObject.operation === RoomObjectOperationType.OBJECT_PLACE);

    const handleMusicEvent = (event: RoomObjectFurnitureActionEvent, category: RoomObjectCategoryEnum, kind: RoomMusicKind) => {
        if (isBeingPlaced(event.objectId, category)) return;

        switch (event.type) {
            // `HabboMusicController.onJukeboxInit` / `onSoundMachineInit`: one machine plays per room, the newest wins.
            case RoomObjectFurnitureActionEvent.JUKEBOX_INIT:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT:
                setRoomMusic({ objectId: event.objectId, kind, playing: false });

                if (kind === 'jukebox') send(new GetNowPlayingComposer({}));

                return;
            // `JukeboxPlayListController.startPlaying` / `SoundMachinePlayListController.startPlaying`: a machine switched on asks for its list.
            case RoomObjectFurnitureActionEvent.JUKEBOX_START:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_START:
                setRoomMusicPlaying(event.objectId, true);
                send(kind === 'jukebox' ? new GetJukeboxPlayListComposer({}) : new GetSoundMachinePlayListComposer({}));

                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP:
                setRoomMusicPlaying(event.objectId, false);

                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE:
                clearRoomMusic(event.objectId);
        }
    };

    const handleFurnitureActionEvent = (event: RoomObjectFurnitureActionEvent) => {
        if (!room) return;

        const category = room.getRoomObjectCategoryForType(event.objectType);

        switch (event.type) {
            case RoomObjectFurnitureActionEvent.DICE_ACTIVATE:
                send(new ThrowDiceComposer({ objectId: event.objectId }));
                return;
            case RoomObjectFurnitureActionEvent.DICE_OFF:
                send(new DiceOffComposer({ objectId: event.objectId }));
                return;
            case RoomObjectFurnitureActionEvent.USE_HABBOWHEEL:
                send(new SpinWheelOfFortuneComposer({ objectId: event.objectId }));
                return;
            case RoomObjectFurnitureActionEvent.ENTER_ONEWAYDOOR:
                send(new EnterOneWayDoorComposer({ objectId: event.objectId }));
                return;
            // Using a post-it opens nothing by itself: the item data that comes back is what raises the widget.
            case RoomObjectFurnitureActionEvent.STICKIE:
                send(new GetItemDataComposer({ objectId: event.objectId }));
                return;
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_INIT:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_START:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.SOUND_MACHINE_DISPOSE:
                handleMusicEvent(event, category, 'sound_machine');
                return;
            case RoomObjectFurnitureActionEvent.JUKEBOX_INIT:
            case RoomObjectFurnitureActionEvent.JUKEBOX_START:
            case RoomObjectFurnitureActionEvent.JUKEBOX_MACHINE_STOP:
            case RoomObjectFurnitureActionEvent.JUKEBOX_DISPOSE:
                handleMusicEvent(event, category, 'jukebox');
                return;
            case RoomObjectFurnitureActionEvent.MOUSE_ARROW:
                removeCursorOwner(event.objectId, category);
                return;
            // Furniture shows the hand only to someone who may use it; avatars always do.
            case RoomObjectFurnitureActionEvent.MOUSE_BUTTON:
                if (((category !== RoomObjectCategoryEnum.Floor) && (category !== RoomObjectCategoryEnum.Wall)) || (controllerLevel >= RoomControllerLevelEnum.Guest)) addCursorOwner(event.objectId, category);
        }
    };

    return { handleFurnitureActionEvent };
};
