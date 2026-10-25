import { StackedAdditionSprite } from './StackedAdditionSprite';

/** Something that renders into a slot of a `StackedAdditionStack` (Variable FX statuses above an avatar or furni). */
export interface IStackedAddition {
    readonly id: number;
    readonly disposed: boolean;
    isPartOfStack: boolean;
    /** False while fading out / invisible: the entry keeps its slot but no longer pushes the ones above it. */
    readonly contributesToStackLayout: boolean;
    readonly invisible: boolean;
    /** True once fully faded out; the stack drops the entry. */
    readonly isFinished: boolean;
    readonly requiresAnimationTick: boolean;
    update(sprite: StackedAdditionSprite, scale: number): void;
    animate(sprite: StackedAdditionSprite): boolean;
    dispose(): void;
}
