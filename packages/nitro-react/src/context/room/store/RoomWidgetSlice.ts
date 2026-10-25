import { IRoomWidgetContextMenu, IRoomWidgetRequest, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import { StateCreator } from 'zustand';

/**
 * The furniture widgets a room object has asked to open, keyed by the request type that asked -
 * the Flash client ran one handler per widget type, so a dimmer and a stickie can be open at
 * once and each closes on its own.
 */
type State = {
    openWidgets: Record<string, IRoomWidgetRequest>;
    /** The context menu of the currently selected furniture, if its logic offers one. */
    furnitureContextMenu: IRoomWidgetContextMenu | undefined;
};

type Actions = {
    openRoomWidget: (request: Omit<IRoomWidgetRequest, 'sequence'>) => void;
    /** Hands a widget the payload its own packet handler received, without disturbing the request. */
    updateRoomWidgetData: (type: string, data: unknown) => void;
    /**
     * The same, for a widget whose picture is built from several messages: each one merges what
     * it knows over what is already there instead of replacing it. Pass a function to build the
     * update from what is already there - two messages can land between renders, and only the
     * store knows what the first one left.
     */
    mergeRoomWidgetData: <TData extends object>(
        type: string,
        data: Partial<TData> | ((previous: Partial<TData>) => Partial<TData>),
    ) => void;
    closeRoomWidget: (type: string) => void;
    /** A logic tearing down says nothing about which widget, so everything aimed at the object goes. */
    closeRoomWidgetsForObject: (objectId: number, category: RoomObjectCategoryEnum) => void;
    setFurnitureContextMenu: (contextMenu: IRoomWidgetContextMenu | undefined) => void;
};

export const RoomWidgetSliceInitialState: State = {
    openWidgets: {},
    furnitureContextMenu: undefined,
};

export type RoomWidgetSlice = State & Actions;

export const createRoomWidgetSlice: StateCreator<RoomWidgetSlice, [], [], RoomWidgetSlice> = set => ({
    ...RoomWidgetSliceInitialState,
    openRoomWidget: request => set((x) => {
        const existing = x.openWidgets[request.type];
        // The same widget asked for again is the object telling it to re-read the model, so the
        // request is replaced but its sequence moves on - that bump is the widget's cue, and
        // whatever its packet handler had already delivered still stands. A different object
        // asking for the same widget starts over: its predecessor's payload is not its own.
        const isSameObject = !!existing && existing.objectId === request.objectId && existing.category === request.category;

        return {
            openWidgets: {
                ...x.openWidgets,
                [request.type]: {
                    ...request,
                    sequence: isSameObject ? (existing.sequence + 1) : 0,
                    data: isSameObject ? existing.data : undefined,
                },
            },
        };
    }),
    updateRoomWidgetData: (type, data) => set((x) => {
        const existing = x.openWidgets[type];

        if (!existing) return x;

        return { openWidgets: { ...x.openWidgets, [type]: { ...existing, data } } };
    }),
    mergeRoomWidgetData: (type, data) => set((x) => {
        const existing = x.openWidgets[type];

        if (!existing) return x;

        const previous = existing.data ?? {};
        const update = (typeof data === 'function') ? data(previous) : data;

        return { openWidgets: { ...x.openWidgets, [type]: { ...existing, data: { ...previous, ...update } } } };
    }),
    closeRoomWidget: type => set((x) => {
        if (!x.openWidgets[type]) return x;

        const openWidgets = { ...x.openWidgets };

        delete openWidgets[type];

        return { openWidgets };
    }),
    closeRoomWidgetsForObject: (objectId, category) => set((x) => {
        const entries = Object.entries(x.openWidgets).filter(([ , request ]) => request.objectId === objectId && request.category === category);

        if (!entries.length) return x;

        const openWidgets = { ...x.openWidgets };

        for (const [ type ] of entries) delete openWidgets[type];

        const closesContextMenu = x.furnitureContextMenu?.objectId === objectId && x.furnitureContextMenu.category === category;

        return { openWidgets, furnitureContextMenu: closesContextMenu ? undefined : x.furnitureContextMenu };
    }),
    setFurnitureContextMenu: contextMenu => set({ furnitureContextMenu: contextMenu }),
});
