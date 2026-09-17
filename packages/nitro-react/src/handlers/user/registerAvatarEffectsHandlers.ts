import { AvatarEffectActivatedMessage, AvatarEffectAddedMessage, AvatarEffectExpiredMessage, AvatarEffectSelectedMessage, AvatarEffectsMessage } from '@nitrodevco/nitro-packets';

import { WebSocketConnection } from '#base/context/communication';
import { userStore } from '#base/context/user';

import { on, subscribeAll } from '../packetSubscriptions';

/**
 * The avatar's effects wardrobe - `AvatarEffectsHandler` feeding `EffectsModel`. The list arrives
 * whole on login and is patched from there: one added, one used up, one switched on, one worn.
 */
export const registerAvatarEffectsHandlers = ({ subscribe }: WebSocketConnection) => {
    const { setAvatarEffects, addAvatarEffect, removeAvatarEffect, activateAvatarEffect, selectAvatarEffect } = userStore.getState();

    return subscribeAll(subscribe, [
        on(AvatarEffectsMessage, (data) => {
            setAvatarEffects(data.effects);
        }),

        on(AvatarEffectAddedMessage, (data) => {
            addAvatarEffect({
                type: data.type,
                subType: data.subType,
                duration: data.duration,
                inactiveEffectsInInventory: 1,
                secondsLeftIfActive: 0,
                isPermanent: data.isPermanent,
            });
        }),

        on(AvatarEffectExpiredMessage, (data) => {
            removeAvatarEffect(data.type);
        }),

        on(AvatarEffectActivatedMessage, (data) => {
            activateAvatarEffect(data.type, data.duration, data.isPermanent);
        }),

        on(AvatarEffectSelectedMessage, (data) => {
            selectAvatarEffect(data.type);
        }),
    ]);
};
