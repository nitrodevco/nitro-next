import { IAvatarEffect } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

import { effectsAfterActivated, effectsAfterAdded, effectsAfterExpired, effectsAfterSelected, effectsFromList, lastWornAfterChoice, NO_LAST_WORN, UserAvatarEffect } from './avatarEffectsModel';

export type { UserAvatarEffect } from './avatarEffectsModel';

/**
 * The avatar effects the user owns and the one last worn - what the inventory's `EffectsModel`
 * keeps; the list logic is in `avatarEffectsModel`.
 */
type State = {
    avatarEffects: UserAvatarEffect[];
    /**
     * The effect the player last chose to wear, so it can be put on again in the next room
     * (`effects.reactivate.on.room.entry`). Cleared when the player takes it off, and whenever any
     * effect expires, as `EffectsModel.setEffectExpired` does.
     */
    lastWornEffect: number;
};

type Actions = {
    /** The whole wardrobe, as `AvatarEffectsMessage` sends it. */
    setAvatarEffects: (effects: IAvatarEffect[]) => void;
    /** One more copy of an effect - a new one if it was not there at all. */
    addAvatarEffect: (effect: IAvatarEffect) => void;
    /** A copy ran out: the next waits, or the effect is gone with its last one. */
    expireAvatarEffect: (type: number) => void;
    /** The effect was switched on: it starts counting down, and is the one worn. */
    activateAvatarEffect: (type: number, duration: number, isPermanent: boolean) => void;
    /** The effect now being worn; anything else stops being worn. Zero means none. */
    selectAvatarEffect: (type: number) => void;
    /** The player chose to wear this effect, or (zero or less) to wear none. */
    setLastWornEffect: (type: number) => void;
};

export const UserEffectsSliceInitialState: State = {
    avatarEffects: [],
    lastWornEffect: NO_LAST_WORN,
};

export type UserEffectsSlice = State & Actions;

export const createUserEffectsSlice: StateCreator<UserEffectsSlice, [], [], UserEffectsSlice> = set => ({
    ...UserEffectsSliceInitialState,
    setAvatarEffects: effects => set({ avatarEffects: effectsFromList(effects) }),
    addAvatarEffect: effect => set(x => ({ avatarEffects: effectsAfterAdded(x.avatarEffects, effect) })),
    expireAvatarEffect: type => set(x => ({ avatarEffects: effectsAfterExpired(x.avatarEffects, type), lastWornEffect: NO_LAST_WORN })),
    activateAvatarEffect: (type, duration, isPermanent) => set(x => ({ avatarEffects: effectsAfterActivated(x.avatarEffects, type, duration, isPermanent) })),
    selectAvatarEffect: type => set(x => ({ avatarEffects: effectsAfterSelected(x.avatarEffects, type) })),
    setLastWornEffect: type => set({ lastWornEffect: lastWornAfterChoice(type) }),
});
