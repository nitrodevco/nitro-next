/**
 * Not Flash's: the read-only client state a module reads (`api.state`) - the own user, their club and
 * purse, and the room they are in - kept as one frozen snapshot over the user, room and navigator
 * stores. A part keeps its identity until a field in it changes, so a module's component that selects
 * one draws again only then, and a module never depends on how the client's own stores are laid out.
 */
import { createStore, useStore } from 'zustand';

import { ClientModuleState, hasClientModulePermission, keepPart } from '#base/context/client-modules';
import { navigatorStore } from '#base/context/navigator';
import { roomStore } from '#base/context/room';
import { userStore } from '#base/context/user';

const read = (previous: ClientModuleState | undefined): ClientModuleState => {
    const user = userStore.getState();
    const room = roomStore.getState();
    const entered = navigatorStore.getState().enteredRoom;
    const roomId = room.room?.roomId;

    const next: ClientModuleState = {
        user: keepPart(previous?.user, {
            id: user.userId,
            name: user.name,
            figure: user.figure,
            gender: String(user.sex),
            motto: user.customData,
            securityLevel: Number(user.securityLevel),
            isAmbassador: user.isAmbassador,
        }),
        club: keepPart(previous?.club, {
            level: Number(user.clubLevel),
            days: user.clubSubscription.clubDays,
            periods: user.clubSubscription.clubPeriods,
        }),
        currencies: keepPart(previous?.currencies, {
            credits: user.credits,
            points: user.activityPoints,
        }),
        room: (roomId === undefined)
            ? undefined
            : keepPart(previous?.room, {
                    id: roomId,
                    name: (entered?.info.roomId === roomId) ? entered.info.name : '',
                    ownRoomIndex: room.ownRoomIndex,
                    isOwner: room.isRoomOwner,
                    controllerLevel: Number(room.controllerLevel),
                }),
    };

    if (previous && (next.user === previous.user) && (next.club === previous.club) && (next.currencies === previous.currencies) && (next.room === previous.room)) return previous;

    return Object.freeze(next);
};

/** The snapshot, rebuilt as the stores under it change, from the first module that reads it on. */
const stateStore = createStore<ClientModuleState>(() => read(undefined));
let started = false;

const start = () => {
    if (started) return;

    started = true;

    const update = () => stateStore.setState(read(stateStore.getState()), true);

    userStore.subscribe(update);
    roomStore.subscribe(update);
    navigatorStore.subscribe(update);
    update();
};

export const getClientModuleState = (): ClientModuleState => {
    start();

    return stateStore.getState();
};

export const subscribeClientModuleState = (listener: (state: ClientModuleState, previous: ClientModuleState) => void) => {
    start();

    return stateStore.subscribe(listener);
};

/** A React hook over the snapshot: `selector` should return a part or a value, not a new object. */
export const useClientModuleState = <T>(selector: (state: ClientModuleState) => T): T => {
    start();

    return useStore(stateStore, selector);
};

export const clientModuleHasPermission = (node: string, level?: number) => {
    const { securityLevel, permissionNodes } = userStore.getState();

    return hasClientModulePermission({ securityLevel: Number(securityLevel), permissionNodes }, node, level);
};
