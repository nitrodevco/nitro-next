import type { IAvatarEffect } from '@nitrodevco/nitro-packets';

/**
 * One avatar effect as the effects window shows it: the server's snapshot plus what
 * `EffectsModel` tracked on top of it - whether it has been switched on, whether it is the one
 * being worn, and how many copies there are in all.
 */
export interface UserAvatarEffect extends IAvatarEffect {
    /** Switched on: it is counting down and can be worn. */
    isActive: boolean;
    /** The one actually on the avatar. */
    isInUse: boolean;
    /**
     * `Effect.amountInInventory`: every copy, the one that is running included. The list's own
     * `inactiveEffectsInInventory` leaves it out, which is why the window never reads that.
     */
    amountInInventory: number;
    /**
     * When (`Date.now()`) the running copy's time left was known: when the list arrived, or the copy
     * was switched on. `Effect` stamps the same moment with a `Date` and counts down from it, since
     * the server sends the time left once and never again.
     */
    activatedAt: number;
}

/** `secondsLeftIfActive` of a copy that is not running: the list's `-1`. */
export const NOT_RUNNING = -1;

/** `EffectsModel.lastActivatedEffect` when there is none. */
export const NO_LAST_WORN = -1;

/** The effect to wear again in the next room after the player chose `type`; choosing none (zero or less) leaves none. */
export const lastWornAfterChoice = (type: number): number => ((type > 0) ? type : NO_LAST_WORN);

/** `IncomingMessages.onAvatarEffects`: zero or more seconds left is running; only `-1` is not. */
const toUserEffect = (effect: IAvatarEffect, now: number): UserAvatarEffect => {
    const isActive = effect.isPermanent || (effect.secondsLeftIfActive >= 0);

    return {
        ...effect,
        isActive,
        isInUse: false,
        amountInInventory: effect.inactiveEffectsInInventory + (isActive ? 1 : 0),
        activatedAt: now,
    };
};

export const effectsFromList = (effects: IAvatarEffect[], now: number = Date.now()): UserAvatarEffect[] => effects.map(effect => toUserEffect(effect, now));

/**
 * `Effect.secondsLeft`: a running copy counts down from when its time left was known, and never
 * goes below zero - Flash never ends it by itself either, it waits for the server's expiry. A copy
 * that is not running shows what it was sent, and a permanent one has no countdown.
 */
export const secondsLeftOf = (effect: UserAvatarEffect, now: number = Date.now()): number => {
    if (!effect.isActive || effect.isPermanent) return effect.secondsLeftIfActive;

    // A clock read before the copy started (a window left open while nothing counted) is no time spent.
    const elapsedSeconds = Math.max(0, now - effect.activatedAt) / 1000;

    return Math.max(0, Math.floor(effect.secondsLeftIfActive - elapsedSeconds));
};

/** Over this many seconds left, an effect's time shows as days. */
export const EFFECT_SECONDS_PER_DAY = 86400;

/**
 * `EffectsParamView.setSecondsLeft` / `EffectView.setTimeLeft`: an effect's time left as `hh:mm:ss`
 * from an hour up, `mm:ss` under it.
 */
export const formatEffectTimeLeft = (seconds: number): string => {
    // `twoDigits`, kept here: this model loads without the client's imports (tools/avatar-effects.test.mjs).
    const twoDigits = (value: number) => String(value).padStart(2, '0');
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor(seconds / 60) % 60;
    const rest = seconds % 60;

    return (hours > 0) ? `${twoDigits(hours)}:${twoDigits(minutes)}:${twoDigits(rest)}` : `${twoDigits(minutes)}:${twoDigits(rest)}`;
};

/**
 * `EffectsModel.addEffect`: one more copy of an effect it has, or a new one that is not running.
 * An effect given for good arrives running, since there is no timer to start.
 */
export const effectsAfterAdded = (effects: UserAvatarEffect[], added: IAvatarEffect, now: number = Date.now()): UserAvatarEffect[] => {
    if (effects.some(effect => effect.type === added.type)) {
        return effects.map(effect => ((effect.type === added.type)
            ? { ...effect, amountInInventory: effect.amountInInventory + 1, inactiveEffectsInInventory: effect.inactiveEffectsInInventory + 1 }
            : effect));
    }

    return [
        ...effects,
        toUserEffect({
            ...added,
            inactiveEffectsInInventory: added.isPermanent ? 0 : 1,
            secondsLeftIfActive: added.isPermanent ? added.duration : NOT_RUNNING,
        }, now),
    ];
};

/**
 * `EffectsModel.setEffectActivated`: every other effect stops being worn, and this one is running
 * and worn. A waiting copy is the one that started, so there is one fewer waiting; the total is
 * the same, because the running copy counts.
 */
export const effectsAfterActivated = (effects: UserAvatarEffect[], type: number, duration: number, isPermanent: boolean, now: number = Date.now()): UserAvatarEffect[] => effects.map((effect) => {
    if (effect.type !== type) return effect.isInUse ? { ...effect, isInUse: false } : effect;

    const startsACopy = !effect.isActive && !isPermanent;

    return {
        ...effect,
        isActive: true,
        isInUse: true,
        isPermanent,
        secondsLeftIfActive: effect.isActive ? effect.secondsLeftIfActive : duration,
        activatedAt: effect.isActive ? effect.activatedAt : now,
        inactiveEffectsInInventory: startsACopy ? Math.max(0, effect.inactiveEffectsInInventory - 1) : effect.inactiveEffectsInInventory,
    };
});

/**
 * `EffectsModel.setEffectExpired`: with more than one copy the running one is used up and the
 * rest wait; with the last copy the effect is gone.
 */
export const effectsAfterExpired = (effects: UserAvatarEffect[], type: number): UserAvatarEffect[] => {
    const expired = effects.find(effect => effect.type === type);

    if (!expired) return effects;

    if (expired.amountInInventory <= 1) return effects.filter(effect => effect.type !== type);

    return effects.map(effect => ((effect.type === type)
        ? {
                ...effect,
                isActive: false,
                isInUse: false,
                amountInInventory: effect.amountInInventory - 1,
                inactiveEffectsInInventory: effect.amountInInventory - 1,
                secondsLeftIfActive: NOT_RUNNING,
            }
        : effect));
};

/** The effect now worn; anything else stops being worn. Zero or less means none. */
export const effectsAfterSelected = (effects: UserAvatarEffect[], type: number): UserAvatarEffect[] => effects.map(effect => ((effect.isInUse === (effect.type === type))
    ? effect
    : { ...effect, isInUse: effect.type === type }));

/**
 * `EffectsModel.useEffect` for an effect worn before: what to send to wear it again. Nothing when
 * the effect is gone (it expired, or was never kept); otherwise the select, preceded by the
 * activate when it is not running.
 */
export const wearAgain = (effects: UserAvatarEffect[], type: number): { activate: boolean } | undefined => {
    if (type <= 0) return undefined;

    const effect = effects.find(other => other.type === type);

    return effect ? { activate: !effect.isActive } : undefined;
};
