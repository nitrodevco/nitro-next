/**
 * Not Flash's: rooms a client module draws beside the room on screen (`api.room.createSecondary`,
 * `api.room.keepWhenLeft`, docs/client-modules.md). Each is a room of the room engine like the one
 * on screen - its objects, its content loading, its frame - fed through the client's own room content
 * handlers (`getRoomContentHandlers`) with the room store pointed at a store of its own
 * (`runInRoomStoreScope`), so nothing of the room on screen or its windows hears it. Its canvas is drawn
 * in the active canvas's room layer, over that canvas's black backing and under its display, placed so
 * that its tile (0, 0, 0) sits on the active room's tile `offset`, and follows the camera, a drag and
 * the zoom every frame; it takes no pointer events (`secondaryRoomTileAt` tells `RoomCanvas` its floor).
 *
 * When the session enters a room a module draws, the client takes that room as it is
 * (`adoptSecondaryRoom`): the same objects and canvas, its store's state, and the camera starting
 * from where it was drawn. A room a module asked to keep is not disposed when the session goes to
 * another room (`keepRoomBeingLeft`) but drawn on as one of these. With no module using any of it,
 * none of this runs.
 */
import { IncomingPacketConstructor, IRoom, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';
import {
    AvatarEffectMessage, CarryObjectMessage, DanceMessage, DiceValueMessage, ExpressionMessage, FavoriteMembershipUpdateMessage, FloorHeightMapMessage, FurniRecolorUpdateMessage, GamePlayerValueMessage, HeightMapMessage, HeightMapUpdateMessage,
    ItemAddMessage, ItemDataUpdateMessage, ItemRemoveMessage, ItemRemoveMultipleMessage, ItemsMessage, ItemsStateUpdateMessage, ItemStateUpdateMessage, ItemUpdateMessage, ObjectAddMessage, ObjectDataUpdateMessage, ObjectRemoveMessage,
    ObjectRemoveMultipleMessage, ObjectsDataUpdateMessage, ObjectsMessage, ObjectUpdateMessage, OneWayDoorStatusMessage, RoomEntryTileMessage, RoomPropertyMessage, RoomVisualizationSettingsMessage, SleepMessage, SlideObjectBundleMessage,
    UseObjectMessage, UserChangeMessage, UserRemoveMessage, UsersMessage, UserTypingMessage, UserUpdateMessage, WiredMovementsMessage,
} from '@nitrodevco/nitro-packets';
import { GetRoomEngine, GetRoomStage, GetTicker } from '@nitrodevco/nitro-renderer';
import { ColorMatrixFilter } from 'pixi.js';
import { StoreApi } from 'zustand';

import type { ClientModuleSecondaryRoom, ClientModuleSecondaryRoomOptions, ClientModuleSecondaryRoomStatus } from '#base/context/client-modules';
import { createRoomStore, getRoomContentHandlers, RoomState, roomStateOf, RoomStore, roomStore, runInRoomStoreScope } from '#base/context/room';

import { corePacketOf, corePacketParserOf } from '../client-modules/clientModuleCorePackets';
import { parseRoomFloorTiles, roomFloorTileAt, RoomFloorTiles, RoomTileLocation, secondaryRoomScreenOffset } from './secondaryRoomGeometry';

/** The core room packets a secondary room takes: the floor and height maps, its furniture and its avatars. */
const ROOM_CONTENT_PACKETS: ReadonlySet<IncomingPacketConstructor<object>> = new Set<IncomingPacketConstructor<object>>([
    FloorHeightMapMessage, HeightMapMessage, HeightMapUpdateMessage, RoomEntryTileMessage, RoomPropertyMessage, RoomVisualizationSettingsMessage,
    ObjectsMessage, ObjectAddMessage, ObjectUpdateMessage, ObjectRemoveMessage, ObjectRemoveMultipleMessage, ObjectDataUpdateMessage, ObjectsDataUpdateMessage,
    ItemsMessage, ItemAddMessage, ItemUpdateMessage, ItemRemoveMessage, ItemRemoveMultipleMessage, ItemDataUpdateMessage, ItemStateUpdateMessage, ItemsStateUpdateMessage,
    SlideObjectBundleMessage, WiredMovementsMessage, DiceValueMessage, OneWayDoorStatusMessage, FurniRecolorUpdateMessage,
    UsersMessage, UserUpdateMessage, UserRemoveMessage, UserChangeMessage, ExpressionMessage, DanceMessage, AvatarEffectMessage, SleepMessage, CarryObjectMessage, UseObjectMessage, UserTypingMessage, FavoriteMembershipUpdateMessage, GamePlayerValueMessage,
]);

/** After Pixi's NORMAL-priority ticks - the camera and a drag move the active canvas there - and before its LOW-priority render. */
const PLACE_PRIORITY = -10;

interface Entry {
    owner: string;
    roomId: number;
    room: IRoom | undefined;
    store: StoreApi<RoomStore> | undefined;
    options: Required<ClientModuleSecondaryRoomOptions>;
    status: ClientModuleSecondaryRoomStatus;
    filter: ColorMatrixFilter | undefined;
    styled: boolean;
    warn: (message: string) => void;
}

const drawn: Entry[] = [];
/** The rooms modules keep when the session leaves them, by room id (`keepRoomWhenLeft`). */
const waiting = new Map<number, Entry>();
/** The floor model each room was last given (`noteRoomFloorModel`), for the floor tile under the pointer. */
const floorModels = new WeakMap<IRoom, string>();
const floorTiles = new WeakMap<IRoom, { model: string; tiles: RoomFloorTiles }>();
/** The rooms the session entered while a module drew them (`wasDrawnBeforeEntry`). */
const adopted = new WeakSet<IRoom>();
/** Where an adopted room's camera starts: its screen offset as it was drawn (`takeRoomCameraStart`). */
const cameraStarts = new WeakMap<IRoom, { x: number; y: number }>();

let ticking = false;

const clamp01 = (value: number | undefined, fallback: number) => ((typeof value === 'number') && Number.isFinite(value)) ? Math.min(1, Math.max(0, value)) : fallback;

const optionsOf = (options: ClientModuleSecondaryRoomOptions, previous?: Required<ClientModuleSecondaryRoomOptions>): Required<ClientModuleSecondaryRoomOptions> => ({
    offset: options.offset ? { x: Number(options.offset.x) || 0, y: Number(options.offset.y) || 0, z: Number(options.offset.z) || 0 } : (previous?.offset ?? { x: 0, y: 0, z: 0 }),
    alpha: clamp01(options.alpha, previous?.alpha ?? 1),
    greyscale: clamp01(options.greyscale, previous?.greyscale ?? 0),
    tint: ((typeof options.tint === 'number') && Number.isInteger(options.tint)) ? (options.tint & 0xFFFFFF) : (previous?.tint ?? 0xFFFFFF),
});

/** The room on screen, never a scope's: the tick and the pointer run outside any. */
const activeRoom = () => roomStore.getState().room;

const applyStyle = (entry: Entry) => {
    const master = entry.room?.canvas?.master;

    if (!master) return;

    const { alpha, greyscale, tint } = entry.options;

    master.alpha = alpha;
    master.tint = tint;

    if (greyscale > 0) {
        // Not clipped to the viewport: at zoom 0 it runs inside the active canvas's half-size pass, whose
        // texture has twice the resolution, and Pixi clips a pass nested in it to the viewport divided by
        // that resolution - the top left quarter of the screen. The canvas's filter area clips it instead.
        entry.filter ??= new ColorMatrixFilter({ clipToViewport: false });
        entry.filter.saturate(-greyscale, false);

        master.filters = [ entry.filter ];
    } else if (entry.filter) {
        master.filters = [];
        entry.filter.destroy();
        entry.filter = undefined;
    }

    entry.styled = true;
};

/** Puts the canvas back as a room on screen draws it: on the stage, taking the pointer, its own backing and colours. */
const unstyle = (entry: Entry) => {
    const canvas = entry.room?.canvas;
    const master = canvas?.master;

    if (master) {
        master.alpha = 1;
        master.tint = 0xFFFFFF;
        master.filters = [];
        master.eventMode = 'static';
    }

    entry.filter?.destroy();
    entry.filter = undefined;

    canvas?.setBackgroundVisible(true);
    canvas?.setCompositedByParent(false);
};

/** Each frame: every drawn room placed against the active canvas, at its size, scale and flip. */
const place = () => {
    const active = activeRoom()?.canvas;
    const display = active?.display;
    const layer = display?.parent;

    if (!active || !display || !layer) return;

    for (const entry of drawn) {
        const room = entry.room;

        if (!room || room.disposed) continue;

        let canvas = room.canvas;

        if (!canvas) {
            canvas = room.getRoomCanvas(active.width, active.height, active.geometry.scale);
            entry.styled = false;
        } else {
            canvas.initialize(active.width, active.height);

            if (canvas.geometry.scale !== active.geometry.scale) canvas.geometry.scale = active.geometry.scale;
        }

        if (canvas.scale !== active.scale) canvas.setScale(active.scale);
        if (canvas.isFlipped !== active.isFlipped) canvas.setFlip(active.isFlipped);
        if (canvas.backgroundVisible) canvas.setBackgroundVisible(false);
        // Inside the active canvas's room layer, whose own pass reduces it at zoom 0.
        if (!canvas.compositedByParent) canvas.setCompositedByParent(true);

        const master = canvas.master;

        if (!master) continue;

        if (master.parent !== layer) {
            layer.addChildAt(master, layer.getChildIndex(display));
            master.eventMode = 'none';
        }

        if (!entry.styled) applyStyle(entry);

        const offset = secondaryRoomScreenOffset(active, canvas, entry.options.offset);

        if (offset) room.setRoomInstanceRenderingCanvasOffset(offset);
    }
};

const updateTicking = () => {
    const needed = drawn.length > 0;

    if (needed === ticking) return;

    ticking = needed;

    if (needed) GetTicker().add(place, undefined, PLACE_PRIORITY);
    else GetTicker().remove(place);
};

const removeDrawn = (entry: Entry) => {
    const index = drawn.indexOf(entry);

    if (index >= 0) drawn.splice(index, 1);

    updateTicking();
};

const disposeEntry = (entry: Entry) => {
    if ((entry.status === 'disposed') || (entry.status === 'entered')) return;

    if (entry.status === 'waiting') {
        if (waiting.get(entry.roomId) === entry) waiting.delete(entry.roomId);
    } else {
        removeDrawn(entry);

        entry.filter?.destroy();
        entry.filter = undefined;

        GetRoomEngine().disposeRoom(entry.roomId);
    }

    entry.status = 'disposed';
    entry.room = undefined;
    entry.store = undefined;
};

const applyPacket = (entry: Entry, given: unknown) => {
    // A plugin message's carried field ({ header, packet }) stands for its packet.
    const packet = corePacketOf(given);

    if (entry.status !== 'drawn' || !entry.store) {
        entry.warn(`apply: room ${entry.roomId} is ${entry.status}; only a drawn room takes packets.`);

        return false;
    }

    const parser = corePacketParserOf(packet);

    if (!parser) {
        entry.warn('apply: give it what api.packets.parseCore read, or a plugin message\'s carried packet field.');

        return false;
    }

    if (!ROOM_CONTENT_PACKETS.has(parser)) {
        entry.warn(`apply: ${parser.name} is not one of a room's content packets.`);

        return false;
    }

    const handlers = getRoomContentHandlers(parser);

    runInRoomStoreScope(entry.store, () => {
        for (const handler of handlers) {
            try {
                handler(packet as object);
            } catch (error) {
                entry.warn(`apply: ${parser.name} failed: ${error instanceof Error ? error.message : String(error)}`);
            }
        }
    });

    return true;
};

const handleOf = (entry: Entry): ClientModuleSecondaryRoom => ({
    roomId: entry.roomId,
    get status() {
        return entry.status;
    },
    apply: packet => applyPacket(entry, packet),
    setOptions: (options) => {
        entry.options = optionsOf(options, entry.options);
        entry.styled = false;

        if (entry.status === 'drawn') applyStyle(entry);
    },
    dispose: () => disposeEntry(entry),
});

const isTaken = (roomId: number) => drawn.some(entry => entry.roomId === roomId) || waiting.has(roomId);

/** A room drawn beside the room on screen; `undefined`, and `warn` told why, for the room the session is in or one drawn already. */
export const createSecondaryRoom = (owner: string, roomId: number, options: ClientModuleSecondaryRoomOptions, warn: (message: string) => void): ClientModuleSecondaryRoom | undefined => {
    if (!Number.isInteger(roomId) || (roomId <= 0)) {
        warn(`createSecondary: ${roomId} is not a room id.`);

        return undefined;
    }

    if ((activeRoom()?.roomId === roomId) || isTaken(roomId)) {
        warn(`createSecondary: room ${roomId} is ${(activeRoom()?.roomId === roomId) ? 'the room the session is in' : 'drawn already'}.`);

        return undefined;
    }

    const room = GetRoomEngine().createRoom(roomId);
    const store = createRoomStore();

    store.getState().setRoom(room);

    const entry: Entry = { owner, roomId, room, store, options: optionsOf(options), status: 'drawn', filter: undefined, styled: false, warn };

    drawn.push(entry);
    updateTicking();

    return handleOf(entry);
};

/** The room the session is in, kept and drawn on as a secondary room once the session goes to another one. */
export const keepRoomWhenLeft = (owner: string, options: ClientModuleSecondaryRoomOptions, warn: (message: string) => void): ClientModuleSecondaryRoom | undefined => {
    const room = activeRoom();

    if (!room) {
        warn('keepWhenLeft: the session is in no room.');

        return undefined;
    }

    if (waiting.has(room.roomId)) {
        warn(`keepWhenLeft: room ${room.roomId} is kept already.`);

        return undefined;
    }

    const entry: Entry = { owner, roomId: room.roomId, room, store: undefined, options: optionsOf(options), status: 'waiting', filter: undefined, styled: false, warn };

    waiting.set(room.roomId, entry);

    return handleOf(entry);
};

/**
 * The session leaves `room` for `nextRoomId`: whether a module keeps it. A kept room takes the room
 * store's state with it and is drawn on as a secondary room. Leaving for the hotel view keeps nothing.
 */
export const keepRoomBeingLeft = (room: IRoom | undefined, nextRoomId: number | undefined): boolean => {
    if (!room) return false;

    const entry = waiting.get(room.roomId);

    if (!entry) return false;

    waiting.delete(room.roomId);

    if ((entry.room !== room) || (nextRoomId === undefined) || (nextRoomId === room.roomId) || room.disposed) {
        entry.status = 'disposed';
        entry.room = undefined;

        return false;
    }

    const store = createRoomStore();

    store.setState(roomStateOf(roomStore));
    room.setStackingHeightMap({ getTileHeight: (x, y) => store.getState().getTileHeight(x, y) });

    // The session's own avatar leaves with it. The room's UserRemove for it goes to the players still
    // in the room, never to the one leaving, so without this it would stand on in the kept room (and
    // again, beside the new one, when the session comes back and the room is adopted).
    const own = store.getState().ownRoomIndex;

    if (own >= 0) {
        room.removeRoomObject(own, RoomObjectCategoryEnum.Unit);
        store.getState().removeUser(own);
        store.setState({ ownRoomIndex: -1 });
    }

    entry.store = store;
    entry.status = 'drawn';
    entry.styled = false;

    drawn.push(entry);
    updateTicking();

    return true;
};

/**
 * The session enters `roomId`: the room a module draws there, taken as it is - its state for the room
 * store, its canvas back on the stage, the camera to start where it was drawn - or `undefined`.
 */
export const adoptSecondaryRoom = (roomId: number): { room: IRoom; state: RoomState } | undefined => {
    const entry = drawn.find(x => x.roomId === roomId);

    if (!entry?.room || !entry.store || entry.room.disposed) return undefined;

    const { room, store } = entry;

    removeDrawn(entry);
    unstyle(entry);

    const canvas = room.canvas;

    if (canvas?.master) {
        // On the stage as `RoomCanvas` puts a room's canvas there, over the others.
        GetRoomStage().addChild(canvas.master);

        cameraStarts.set(room, { x: canvas.screenOffsetX, y: canvas.screenOffsetY });
    }

    adopted.add(room);

    entry.status = 'entered';
    entry.room = undefined;
    entry.store = undefined;

    return { room, state: roomStateOf(store) };
};

/** Whether the session entered `room` while a module drew it: the room's content packets the server sends again then find it built. */
export const wasDrawnBeforeEntry = (room: IRoom) => adopted.has(room);

/** Where an adopted room's camera starts, once: its screen offset as it was drawn. */
export const takeRoomCameraStart = (room: IRoom) => {
    const start = cameraStarts.get(room);

    if (start) cameraStarts.delete(room);

    return start;
};

/** The floor model a room was given (`registerRoomMappingHandlers`), for `secondaryRoomTileAt`. */
export const noteRoomFloorModel = (room: IRoom, model: string) => floorModels.set(room, model);

/** Whether any secondary room is drawn. */
export const hasSecondaryRooms = () => drawn.length > 0;

/** The floor tile of a secondary room under a stage point, the room drawn last first. */
export const secondaryRoomTileAt = (x: number, y: number): (RoomTileLocation & { roomId: number }) | undefined => {
    for (let index = drawn.length - 1; index >= 0; index--) {
        const room = drawn[index].room;
        const canvas = room?.canvas;
        const model = room ? floorModels.get(room) : undefined;

        if (!room || !canvas?.master?.parent || (model === undefined)) continue;

        let floor = floorTiles.get(room);

        if (floor?.model !== model) {
            floor = { model, tiles: parseRoomFloorTiles(model) };
            floorTiles.set(room, floor);
        }

        const tile = roomFloorTileAt(canvas, floor.tiles, x, y);

        if (tile) return { roomId: room.roomId, ...tile };
    }

    return undefined;
};
