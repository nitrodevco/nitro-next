/**
 * A sound the sound manager hands out - Flash's obfuscated `§_-a1D§` (`IHabboSound`), which
 * `HabboSoundBase`, `HabboSoundWithPitch` and `TraxSequencer` implement. Times are seconds.
 */
export interface IHabboSound {
    play(length?: number): boolean;
    stop(): boolean;
    volume: number;
    position: number;
    readonly length: number;
    readonly ready: boolean;
    readonly finished: boolean;
    fadeOutSeconds: number;
    fadeInSeconds: number;
}
