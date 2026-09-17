import { AvatarGenderType, RoomControllerLevelEnum, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { SetMannequinFigureComposer, SetMannequinNameComposer, UseFurnitureComposer } from '@nitrodevco/nitro-packets';
import { useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom, useRoomStore, useRoomWidget, useRoomWidgetActions } from '#base/context/room';
import { useOwnClubLevel, useUserStore } from '#base/context/user';
import { FurnitureMannequinView, MannequinScreen } from '#base/views/room-widgets/furniture/FurnitureMannequinView';

import { asMannequinFigure, getMannequinClubLevel, withMannequinOutfit } from './mannequinFigure';

/**
 * A mannequin. Which face of the dialog opens is decided the moment it opens, exactly as
 * `MannequinWidget.resolveFirstWindowContent` decided it: whoever can decorate the room gets the
 * dummy's own controls, and everyone else gets the offer to wear the outfit - or the reason they
 * can't, because it was cut for another gender or costs a club they aren't in.
 *
 * Saving stores whatever the sender is wearing, so its composer carries only the furni.
 */
export const FurnitureMannequinWidget = () => {
    const request = useRoomWidget(RoomObjectWidgetRequestEvent.MANNEQUIN);
    const room = useRoom();
    const ownFigure = useUserStore(x => x.figure);
    const sex = useUserStore(x => x.sex);
    const clubLevel = useOwnClubLevel();
    const isRoomOwner = useRoomStore(x => x.isRoomOwner);
    const controllerLevel = useRoomStore(x => x.controllerLevel);
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ screen, setScreen ] = useState<MannequinScreen | undefined>(undefined);
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);

    const objectId = request?.objectId ?? -1;

    // A different mannequin is a different dialog, so it opens on its own first screen again.
    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setScreen(undefined);
    }

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.MANNEQUIN);

    if (!request || !room) return null;

    const roomObject = room.getRoomObject(request.objectId, request.category);

    if (!roomObject) return null;

    const name = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinName) ?? '';
    const figure = roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinFigure) ?? '';
    const gender = (roomObject.model.getValue<string>(RoomObjectVariableEnum.FurnitureMannequinGender) ?? AvatarGenderType.Male) as AvatarGenderType;

    const canModify = isRoomOwner || (controllerLevel >= RoomControllerLevelEnum.Guest);
    const isWrongGender = (gender.toLowerCase() !== (sex ?? '').toLowerCase());
    // What the outfit itself costs, not what the person who dressed the dummy happened to have.
    const requiredClubLevel = getMannequinClubLevel(figure, gender);
    // Your own level is the club enum, whose members are these same numbers.
    const needsClub = (Number(clubLevel) < requiredClubLevel);

    const currentScreen: MannequinScreen = screen
        ?? (canModify ? 'main' : isWrongGender ? 'wrong-gender' : needsClub ? 'no-club' : 'peer');

    /*
     * The preview is never simply the dummy's figure: its own screens strip the outfit back onto
     * a faceless head, while the ones offering it to you show it on you.
     */
    const previewFigure = (currentScreen === 'peer' || currentScreen === 'no-club')
        ? withMannequinOutfit(ownFigure, figure)
        : asMannequinFigure((currentScreen === 'save') ? ownFigure : figure);

    const onWear = () => {
        // The button re-checks in the order the Flash widget did, club before gender.
        if (needsClub) {
            setScreen('no-club');

            return;
        }

        if (isWrongGender) {
            setScreen('wrong-gender');

            return;
        }

        send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }));
        onClose();
    };

    return (
        <FurnitureMannequinView
            name={name}
            figure={previewFigure}
            gender={(currentScreen === 'peer' || currentScreen === 'no-club' || currentScreen === 'save') ? sex : gender}
            clubLevel={requiredClubLevel}
            screen={currentScreen}
            onScreenChange={setScreen}
            onSaveName={newName => send(new SetMannequinNameComposer({ objectId: request.objectId, name: newName }))}
            onSaveOutfit={() => {
                send(new SetMannequinFigureComposer({ objectId: request.objectId }));
                onClose();
            }}
            onWear={onWear}
            onClose={onClose}
        />
    );
};
