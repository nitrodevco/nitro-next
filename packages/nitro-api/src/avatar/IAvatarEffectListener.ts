export interface IAvatarEffectListener {
    resetEffect(effect: number): void;
    readonly disposed: boolean;
}
