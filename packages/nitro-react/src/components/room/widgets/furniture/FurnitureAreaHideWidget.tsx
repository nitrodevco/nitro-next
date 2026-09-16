import { IRoomObjectController, RoomObjectVariableEnum, RoomObjectWidgetRequestEvent } from '@nitrodevco/nitro-api';
import { SetAreaHideDataComposer, UseFurnitureComposer } from '@nitrodevco/nitro-packets';
import { RoomAreaSelectionManager } from '@nitrodevco/nitro-renderer';
import { useEffect, useState } from 'react';

import { useRoomSelector, useRoomWidget, useRoomWidgetActions, useWebSocketContext } from '#base/context';
import { AreaHideData } from '#base/handlers';
import { AreaHideOption, FurnitureAreaHideView } from '#base/views/room-widgets/furniture/FurnitureAreaHideView';

/** The area as it is being edited, before Apply sends it. */
type AreaHideDraft = {
    rootX: number;
    rootY: number;
    width: number;
    length: number;
    invisible: boolean;
    wallItems: boolean;
    inverted: boolean;
};

/** The area as the furni itself has it, which is where the dialog starts from. */
const readArea = (roomObject: IRoomObjectController): AreaHideDraft => ({
    rootX: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideRootX) ?? 0,
    rootY: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideRootY) ?? 0,
    width: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideWidth) ?? 0,
    length: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideLength) ?? 0,
    invisible: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideInvisibility) === 1,
    wallItems: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideWallItems) === 1,
    inverted: roomObject.model.getValue<number>(RoomObjectVariableEnum.FurnitureAreaHideInvert) === 1,
});

/**
 * An area-hide furni, whose dialog is only half the story: the area itself is marked on the room
 * floor, through the same selection manager Flash used. Opening the dialog lights the current
 * area, Select lets a new one be dragged out, and the draft is not sent until Apply - so a
 * half-drawn area never reaches the server.
 */
export const FurnitureAreaHideWidget = () => {
    const request = useRoomWidget<AreaHideData>(RoomObjectWidgetRequestEvent.AREA_HIDE);
    const room = useRoomSelector();
    const { closeRoomWidget } = useRoomWidgetActions();
    const { send } = useWebSocketContext();
    const [ draft, setDraft ] = useState<AreaHideDraft | undefined>(undefined);
    const [ lastObjectId, setLastObjectId ] = useState<number>(-1);

    const objectId = request?.objectId ?? -1;

    // A different furni is a different area; nothing of the last one carries over.
    if (objectId !== lastObjectId) {
        setLastObjectId(objectId);
        setDraft(undefined);
    }

    const roomObject = (room && request) ? room.getRoomObject(request.objectId, request.category) : undefined;

    /*
     * Whether the area is hiding anything at this moment. The furni's own state answers when the
     * dialog opens; after that the server's word is kept on the request, because a room object
     * model is not reactive and nothing here would notice it change.
     */
    const isOn = request?.data?.isOn ?? (roomObject?.getState() === 1);

    /*
     * The selection manager is the room's, not the widget's, so it is claimed while the dialog
     * is open and handed back when it closes - leaving it activated would keep every piece of
     * furniture see-through. A furni that is already hiding its area has nothing to select: the
     * area is fixed until it is switched off again, which is what Flash's `updateAreaSelecting`
     * did each time the state changed.
     */
    useEffect(() => {
        if (!room || !request || isOn) return;

        const roomObject = room.getRoomObject(request.objectId, request.category);

        if (!roomObject) return;

        const current = readArea(roomObject);

        const activated = room.areaSelection.activate(
            (rootX, rootY, width, length) => setDraft(previous => ({ ...(previous ?? current), rootX, rootY, width, length })),
            RoomAreaSelectionManager.HIGHLIGHT_DARKEN,
        );

        if (activated) room.areaSelection.setHighlight(current.rootX, current.rootY, current.width, current.length);

        return () => {
            room.areaSelection.deactivate();
        };
    }, [ room, request?.objectId, request?.category, isOn ]);

    const onClose = () => closeRoomWidget(RoomObjectWidgetRequestEvent.AREA_HIDE);

    if (!request || !room || !roomObject) return null;

    const current: AreaHideDraft = draft ?? readArea(roomObject);

    const toggleOption = (option: AreaHideOption, value: boolean) => setDraft({ ...current, [option]: value });

    return (
        <FurnitureAreaHideView
            width={current.width}
            length={current.length}
            invisible={current.invisible}
            wallItems={current.wallItems}
            inverted={current.inverted}
            isOn={isOn}
            onToggleOption={toggleOption}
            onSelect={() => room.areaSelection.startSelecting()}
            onClear={() => room.areaSelection.clearHighlight()}
            onApply={() => send(new SetAreaHideDataComposer({ objectId: request.objectId, ...current }))}
            onToggle={() => send(new UseFurnitureComposer({ objectId: request.objectId, param: 0 }))}
            onClose={onClose}
        />
    );
};
