import { AvatarEffectActivatedComposer, AvatarEffectActivatedMessage, AvatarEffectAddedMessage, AvatarEffectExpiredMessage, AvatarEffectSelectedComposer, AvatarEffectSelectedMessage, AvatarEffectsMessage, RoomEntryInfoMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { getRoom } from '#base/context/room';
import { configBoolean, systemStore } from '#base/context/system';
import { userStore } from '#base/context/user';
import { wearAgain } from '#base/context/user/store/avatarEffectsModel';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The avatar's effects wardrobe - `AvatarEffectsHandler` feeding `EffectsModel`. The list arrives
 * whole on login and is patched from there: one added, one used up, one switched on, one worn.
 */
export const registerAvatarEffectsHandlers = ({ subscribe, send }: WebSocketConnection) => {
    const { setAvatarEffects, addAvatarEffect, expireAvatarEffect, activateAvatarEffect, selectAvatarEffect } = userStore.getState();

    /*
     * `HabboInventory.notifyChangedEffects` -> `EffectsWidgetHandler.onEffectsChanged` ->
     * `EffectsWidget.open`: the list, an added effect, one switched on and one used up each show the
     * window. The handler is only listening once a room has its UI, so the list sent at login, before
     * any room, shows nothing.
     */
    const showEffectsWindow = () => {
        if (!getRoom()) return;

        systemStore.getState().showWindow('avatar_effects');
    };

    return subscribeAll(subscribe, [
        on(AvatarEffectsMessage, (data) => {
            setAvatarEffects(data.effects);
            showEffectsWindow();
        }),

        on(AvatarEffectAddedMessage, (data) => {
            // One copy: a new effect starts with the one, an owned one gains it. The store works the
            // rest out, because what a copy is worth depends on what is already held.
            addAvatarEffect({
                type: data.type,
                subType: data.subType,
                duration: data.duration,
                inactiveEffectsInInventory: 1,
                secondsLeftIfActive: -1,
                isPermanent: data.isPermanent,
            });
            showEffectsWindow();
        }),

        on(AvatarEffectExpiredMessage, (data) => {
            expireAvatarEffect(data.type);
            showEffectsWindow();
        }),

        on(AvatarEffectActivatedMessage, (data) => {
            activateAvatarEffect(data.type, data.duration, data.isPermanent);
            showEffectsWindow();
        }),

        on(AvatarEffectSelectedMessage, (data) => {
            selectAvatarEffect(data.type);
        }),

        // `HabboInventory`: on entering a room, `effects.reactivate.on.room.entry` puts the effect
        // the player last chose back on - activating it first if it is not running - because the
        // server keeps nothing of what an avatar wore in the room it left.
        on(RoomEntryInfoMessage, () => {
            if (!configBoolean('effects.reactivate.on.room.entry')) return;

            const { avatarEffects, lastWornEffect } = userStore.getState();
            const again = wearAgain(avatarEffects, lastWornEffect);

            if (!again) return;

            if (again.activate) send(new AvatarEffectActivatedComposer({ effectType: lastWornEffect }));

            send(new AvatarEffectSelectedComposer({ effectType: lastWornEffect }));
        }),
    ]);
};
