/**
 * Not Flash's: the room events client modules subscribe to (`api.events.on`), raised from what the
 * client already keeps - the room store (the room and its user list), the room's own object events
 * (`RoomEngineObjectEvent` `ADDED`, `REMOVED` and `SELECTED`, as Flash's room engine raises them for
 * its widgets) and the chat bubbles the room shows (`insertRoomChat`). Nothing listens until a module
 * does: the first handler starts the subscriptions.
 */
import { INitroEvent, IRoom, NitroLogger, RoomEngineObjectEvent, RoomObjectCategoryEnum } from '@nitrodevco/nitro-api';

import { ClientModuleEventName, ClientModuleEvents, ClientModuleRoomFurni, diffRoomUsers, furniKindOf, toClientModuleAvatar } from '#base/context/client-modules';
import { roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';

type Handler<E extends ClientModuleEventName> = { moduleKey: string; handle: (data: ClientModuleEvents[E]) => void };

const handlers = new Map<ClientModuleEventName, Set<Handler<ClientModuleEventName>>>();
let started = false;

/** Hands `data` to every handler of `event`; one that throws is logged under its module and the others still run. */
export const emitClientModuleEvent = <E extends ClientModuleEventName>(event: E, data: ClientModuleEvents[E]) => {
    const listeners = handlers.get(event);

    if (!listeners?.size) return;

    for (const listener of [ ...listeners ]) {
        try {
            (listener as Handler<E>).handle(data);
        } catch (error) {
            NitroLogger.error('ClientModules', `${listener.moduleKey}: ${event} handler threw`, error);
        }
    }
};

/** Whether any module listens to `event`: the chat path asks before it builds a line. */
export const hasClientModuleEventHandlers = (event: ClientModuleEventName) => !!handlers.get(event)?.size;

const avatarOf = (roomIndex: number) => {
    const user = roomStore.getState().usersByRoomObjectId[roomIndex];

    return user && toClientModuleAvatar(user, userStore.getState().userId);
};

/** The furni the room has shown, by category and id: what a removal names, once the object is gone. */
const furniSeen = new Map<string, ClientModuleRoomFurni>();

/** The room's own object events: furni in and out, and what is clicked. */
const listenToRoom = (room: IRoom) => {
    const furniOf = (event: RoomEngineObjectEvent): ClientModuleRoomFurni | undefined => {
        const kind = furniKindOf(event.category);

        if (!kind) return undefined;

        const key = `${event.category}:${event.objectId}`;
        const known = furniSeen.get(key);
        const type = room.getRoomObject(event.objectId, event.category)?.type ?? known?.type;

        if (type === undefined) return undefined;

        const furni = ((known?.type === type) ? known : { id: event.objectId, kind, type });

        furniSeen.set(key, furni);

        return furni;
    };

    const onAdded = (event: INitroEvent) => {
        const furni = furniOf(event as RoomEngineObjectEvent);

        if (furni) emitClientModuleEvent('room.furni.added', furni);
    };

    const onRemoved = (event: INitroEvent) => {
        const objectEvent = event as RoomEngineObjectEvent;
        const furni = furniOf(objectEvent);

        furniSeen.delete(`${objectEvent.category}:${objectEvent.objectId}`);

        if (furni) emitClientModuleEvent('room.furni.removed', furni);
    };

    const onSelected = (event: INitroEvent) => {
        const objectEvent = event as RoomEngineObjectEvent;

        if (objectEvent.category === RoomObjectCategoryEnum.Unit) {
            const avatar = avatarOf(objectEvent.objectId);

            if (avatar) emitClientModuleEvent('room.avatar.clicked', avatar);

            return;
        }

        const furni = furniOf(objectEvent);

        if (furni) emitClientModuleEvent('room.furni.clicked', furni);
    };

    const removers = [
        room.eventDispatcher.addEventListener(RoomEngineObjectEvent.ADDED, onAdded),
        room.eventDispatcher.addEventListener(RoomEngineObjectEvent.REMOVED, onRemoved),
        room.eventDispatcher.addEventListener(RoomEngineObjectEvent.SELECTED, onSelected),
    ];

    return () => removers.forEach(remove => remove?.());
};

/** The room store's room and user list, watched from the first handler on for the page's life. */
const start = () => {
    if (started) return;

    started = true;

    let room = roomStore.getState().room;
    let users = roomStore.getState().usersByRoomObjectId;
    let stopRoom = room ? listenToRoom(room) : undefined;

    roomStore.subscribe((state) => {
        if (state.room !== room) {
            const left = room;

            stopRoom?.();
            stopRoom = undefined;
            furniSeen.clear();
            room = state.room;
            // A new room's list starts from no one: its users are added as they arrive.
            users = {};

            if (left) emitClientModuleEvent('room.left', { roomId: left.roomId });

            if (room) {
                stopRoom = listenToRoom(room);
                emitClientModuleEvent('room.entered', { roomId: room.roomId });
            }
        }

        if (state.usersByRoomObjectId === users) return;

        const { added, removed } = diffRoomUsers(users, state.usersByRoomObjectId);
        const ownUserId = userStore.getState().userId;

        users = state.usersByRoomObjectId;

        for (const user of removed) emitClientModuleEvent('room.avatar.removed', toClientModuleAvatar(user, ownUserId));
        for (const user of added) emitClientModuleEvent('room.avatar.added', toClientModuleAvatar(user, ownUserId));
    });
};

/** `handle` for every `event` until the returned function is called. */
export const onClientModuleEvent = <E extends ClientModuleEventName>(moduleKey: string, event: E, handle: (data: ClientModuleEvents[E]) => void) => {
    start();

    const listener = { moduleKey, handle } as Handler<ClientModuleEventName>;
    let listeners = handlers.get(event);

    if (!listeners) handlers.set(event, (listeners = new Set()));

    listeners.add(listener);

    return () => {
        listeners.delete(listener);
    };
};

/** The room index's avatar as a module is told of it, for the chat path. */
export const clientModuleAvatarOf = avatarOf;
