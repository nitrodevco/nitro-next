import { AvatarGenderType, RoomControllerLevelEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';

import { useRoom, useRoomStore, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useSystemActions } from '#base/context/system';
import { FurnitureClothingChangeView } from '#base/views/room-widgets/furniture/FurnitureClothingChangeView';

/** What an undressed booth starts from, as Flash's handler had it. */
const DEFAULT_MALE_FIGURE = 'hd-99999-99999.lg-270-62';
const DEFAULT_FEMALE_FIGURE = 'hd-99999-99999.ch-630-62.lg-695-62';

/**
 * A clothing-change booth, which keeps one outfit for each gender and lends the avatar editor
 * out to dress them. Only someone who may decorate the room gets the choice.
 *
 * The editor keeps its own state behind its own provider, which the room is outside of, so the
 * booth hands over what it wants dressed as window parameters and the editor does the rest.
 */
export const FurnitureClothingChangeWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.CLOTHING_CHANGE);
    const room = useRoom();
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { showWindow } = useSystemActions();

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.CLOTHING_CHANGE);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    // Flash asks the same question of the infostand: this is a decorating job.
    if (!isRoomOwner && (controllerLevel < RoomControllerLevelEnum.Guest)) return null;

    const selectGender = (isMale: boolean) => {
        const stored = roomObject.model.getValue<string>(
            isMale ? RoomObjectVariableEnum.FurnitureClothingBoy : RoomObjectVariableEnum.FurnitureClothingGirl,
        );

        showWindow('avatar_editor', {
            clothingChange: {
                objectId: request.objectId,
                figure: (stored && stored.length) ? stored : (isMale ? DEFAULT_MALE_FIGURE : DEFAULT_FEMALE_FIGURE),
                gender: isMale ? AvatarGenderType.Male : AvatarGenderType.Female,
            },
        });
        onClose();
    };

    return (
        <FurnitureClothingChangeView
            onSelectGender={selectGender}
            onClose={onClose}
        />
    );
};
