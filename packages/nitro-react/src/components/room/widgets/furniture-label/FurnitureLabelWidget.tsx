/**
 * The WIRED labels over the room (`FurnitureLabelWidget` + `FurnitureLabelView` as of
 * WIN63-202610131318, desktop widget `RWE_FURNITURE_LABEL`): each bubble is a room-scaled window that
 * zooms with the room. A furni with a label (its model's `furniture_label_data`)
 * shows it in a bubble above it: while the pointer is over the furni as a faded preview, open after
 * a click on the furni until the next click, and all the time when the label is always open. Its
 * viewer sees it when everyone may, or with the room's wired read permission (`canView`); with the
 * modify permission they may type into an open one, and the text is sent (`SetFurnitureLabelData`)
 * when the bubble closes or loses the focus with a text it has not sent yet (`saveIfChanged`).
 */
import { FurnitureLabelData, IRoom, RoomEngineFurnitureLabelEvent, RoomObjectCategoryEnum, RoomObjectVariableEnum, RoomWidgetUpdateRoomObjectEvent } from '@nitrodevco/nitro-api';
import { SetFurnitureLabelDataComposer } from '@nitrodevco/nitro-packets';
import { useEffect, useRef, useState } from 'react';

import { useWebSocketContext } from '#base/context/communication';
import { useRoom } from '#base/context/room';
import { useWiredHasReadPermission, useWiredHasWritePermission } from '#base/context/wired';
import { useRoomEventDispatcher } from '#base/hooks';
import { FurnitureLabelView } from '#base/views/room-widgets/furniture/FurnitureLabelView';

import { ScaledRoomOverlay } from '../../overlay';

/** `FurnitureLabelView.updatePosition`: the bubble's bottom this many room pixels above the furni's top. */
const GAP = 4;

/** One label's view: opened by a click, hovered, and the text typed but not yet confirmed by the room. */
interface LabelViewState {
    open: boolean;
    hovered: boolean;
    /** What the input holds when it is not the label's text. */
    draft?: string;
    /** `_lastSubmittedText`: the text sent and not yet confirmed. */
    submitted?: string;
}

const getLabelData = (room: IRoom | undefined, furnitureId: number): FurnitureLabelData | undefined => room?.getRoomObject(furnitureId, RoomObjectCategoryEnum.Floor)?.model.getValue<FurnitureLabelData | undefined>(RoomObjectVariableEnum.FurnitureLabelData);

/**
 * `FurnitureLabelView.updatePosition` (WIN63-202610131318, line 169-171): the bubble at the room's zoom,
 * centred over the furni with its bottom `4 * scale` above the furni's top; nowhere while the furni has
 * no place on screen.
 */
const placeOver = (room: IRoom, furnitureId: number) => (width: number, height: number, scale: number) => {
    const bounds = room.getRoomObjectBoundingRectangle(furnitureId, RoomObjectCategoryEnum.Floor);
    const location = room.getRoomObjectScreenLocation(furnitureId, RoomObjectCategoryEnum.Floor);

    return (bounds && location) ? { x: location.x - (width / 2), y: bounds.top - height - (GAP * scale) } : null;
};

export const FurnitureLabelWidget = () => {
    const room = useRoom();
    const canRead = useWiredHasReadPermission();
    const canModify = useWiredHasWritePermission();
    const { send } = useWebSocketContext();
    const [ views, setViews ] = useState<ReadonlyMap<number, LabelViewState>>(new Map());
    // A label's data changed in the engine: read again.
    const [ , setRevision ] = useState(0);

    const canView = (data: FurnitureLabelData | undefined): data is FurnitureLabelData => !!data && ((data.type === FurnitureLabelData.TYPE_LABEL) ? ((data.visibility === FurnitureLabelData.VISIBILITY_EVERYONE) || canRead) : canRead);

    // The views as the last change left them, so a change made from an event (and a send) happens once.
    const viewsRef = useRef<ReadonlyMap<number, LabelViewState>>(views);

    const update = (furnitureId: number, change: (view: LabelViewState | undefined) => LabelViewState | undefined) => {
        const next = new Map(viewsRef.current);
        const view = change(next.get(furnitureId));

        if (view) next.set(furnitureId, view);
        else next.delete(furnitureId);

        viewsRef.current = next;
        setViews(next);
    };

    /** `saveIfChanged`: without the permission the input goes back to the label's text. */
    const saveIfChanged = (furnitureId: number, view: LabelViewState): LabelViewState => {
        const data = getLabelData(room, furnitureId);
        const text = view.draft;

        if (!canModify || !data) return { ...view, draft: undefined };

        if ((text === undefined) || (text === data.text) || (text === view.submitted)) return view;

        send(new SetFurnitureLabelDataComposer({ furnitureId, text }));

        return { ...view, submitted: text };
    };

    useRoomEventDispatcher<RoomWidgetUpdateRoomObjectEvent>([
        RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED,
        RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER,
        RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT,
        RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED,
    ], (event) => {
        if (event.category !== RoomObjectCategoryEnum.Floor) return;

        const furnitureId = event.objectId;

        switch (event.type) {
            case RoomWidgetUpdateRoomObjectEvent.OBJECT_SELECTED:
                // `toggleLabel`.
                if (!canView(getLabelData(room, furnitureId))) return update(furnitureId, () => undefined);

                return update(furnitureId, view => (view?.open ? { ...saveIfChanged(furnitureId, view), open: false } : { ...(view ?? { hovered: false }), open: true }));
            case RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OVER:
                // `hoverLabel(true)`.
                if (!canView(getLabelData(room, furnitureId))) return update(furnitureId, () => undefined);

                return update(furnitureId, view => ({ ...(view ?? { open: false }), hovered: true }));
            case RoomWidgetUpdateRoomObjectEvent.OBJECT_ROLL_OUT:
                return update(furnitureId, view => (view && { ...view, hovered: false }));
            case RoomWidgetUpdateRoomObjectEvent.FURNI_REMOVED:
                return update(furnitureId, () => undefined);
        }
    });

    // `refreshLabel`: a label that may not be seen goes; one with no view yet gets one only when always open.
    useRoomEventDispatcher<RoomEngineFurnitureLabelEvent>(RoomEngineFurnitureLabelEvent.UPDATED, (event) => {
        const data = getLabelData(room, event.furnitureId);

        if (!canView(data)) update(event.furnitureId, () => undefined);
        else update(event.furnitureId, (view) => {
            if (!view) return data.alwaysOpen ? { open: false, hovered: false } : undefined;

            // `applyData`: a text being typed that is neither the old text nor the one sent stays; otherwise the new one shows.
            return ((view.draft !== undefined) && (view.draft !== view.submitted) && canModify) ? { ...view, submitted: undefined } : { ...view, draft: undefined, submitted: undefined };
        });

        setRevision(revision => revision + 1);
    });

    // The desktop widget is built with the room in Flash, before any label arrives; here the engine may
    // have read the room's labels first, so the always open ones already there get their views.
    useEffect(() => {
        if (!room) return;

        for (const object of room.getRoomObjectsForCategory(RoomObjectCategoryEnum.Floor)) {
            const data = getLabelData(room, object.id);

            if (data?.alwaysOpen && !viewsRef.current.has(object.id)) update(object.id, () => ({ open: false, hovered: false }));
        }
    }, [ room ]);

    if (!room) return null;

    return (
        <>
            {[ ...views.entries() ].map(([ furnitureId, view ]) => {
                const data = getLabelData(room, furnitureId);

                // `permissionsChanged`: one that may no longer be seen is not drawn.
                if (!canView(data)) return null;

                const shown = view.open || data.alwaysOpen;
                const interactive = view.open || (data.alwaysOpen && canModify);

                return (
                    // A bubble that is neither open, always open nor hovered is not drawn (`updatePresentation`).
                    (shown || view.hovered) && (
                        <ScaledRoomOverlay
                            key={furnitureId}
                            place={placeOver(room, furnitureId)}
                        >
                            <FurnitureLabelView
                                text={view.draft ?? data.text}
                                bubbleColor={data.bubbleColor}
                                shown={shown}
                                interactive={interactive}
                                editable={interactive && canModify}
                                onChange={text => update(furnitureId, current => current && { ...current, draft: text })}
                                onBlur={() => update(furnitureId, current => current && saveIfChanged(furnitureId, current))}
                            />
                        </ScaledRoomOverlay>
                    )
                );
            })}
        </>
    );
};
