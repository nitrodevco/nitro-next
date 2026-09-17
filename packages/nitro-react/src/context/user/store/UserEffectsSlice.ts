import { IAvatarEffect } from '@nitrodevco/nitro-packets';
import { StateCreator } from 'zustand';

/**
 * One avatar effect as the effects window shows it: the server's snapshot plus the two things
 * `EffectsModel` tracked on top of it - whether it has been switched on, and whether it is the
 * one currently being worn.
 */
export interface UserAvatarEffect extends IAvatarEffect {
    /** Switched on: it is counting down and can be worn. */
    isActive: boolean;
    /** The one actually on the avatar. */
    isInUse: boolean;
}

type State = {
    avatarEffects: UserAvatarEffect[];
};

type Actions = {
    /** The whole wardrobe, as `AvatarEffectsMessage` sends it. */
    setAvatarEffects: (effects: IAvatarEffect[]) => void;
    /** One more copy of an effect - a new one if it was not there at all. */
    addAvatarEffect: (effect: IAvatarEffect) => void;
    removeAvatarEffect: (type: number) => void;
    /** The effect was switched on: it starts counting down. */
    activateAvatarEffect: (type: number, duration: number, isPermanent: boolean) => void;
    /** The effect now being worn; anything else stops being worn. Zero means none. */
    selectAvatarEffect: (type: number) => void;
};

export const UserEffectsSliceInitialState: State = {
    avatarEffects: [],
};

export type UserEffectsSlice = State & Actions;

const toUserEffect = (effect: IAvatarEffect): UserAvatarEffect => ({
    ...effect,
    // Anything with time left on it, or that never runs out, is already switched on.
    isActive: effect.isPermanent || (effect.secondsLeftIfActive > 0),
    isInUse: false,
});

export const createUserEffectsSlice: StateCreator<UserEffectsSlice, [], [], UserEffectsSlice> = set => ({
    ...UserEffectsSliceInitialState,
    setAvatarEffects: effects => set({ avatarEffects: effects.map(toUserEffect) }),
    addAvatarEffect: effect => set((x) => {
        const existing = x.avatarEffects.find(other => other.type === effect.type);

        if (!existing) return { avatarEffects: [ ...x.avatarEffects, toUserEffect(effect) ] };

        return {
            avatarEffects: x.avatarEffects.map(other => ((other.type === effect.type)
                ? { ...other, inactiveEffectsInInventory: other.inactiveEffectsInInventory + 1 }
                : other)),
        };
    }),
    removeAvatarEffect: type => set(x => ({ avatarEffects: x.avatarEffects.filter(effect => effect.type !== type) })),
    activateAvatarEffect: (type, duration, isPermanent) => set(x => ({
        avatarEffects: x.avatarEffects.map(effect => ((effect.type === type)
            ? { ...effect, isActive: true, isInUse: true, isPermanent, secondsLeftIfActive: duration }
            : effect)),
    })),
    selectAvatarEffect: type => set(x => ({
        avatarEffects: x.avatarEffects.map(effect => ({ ...effect, isInUse: effect.type === type })),
    })),
});
