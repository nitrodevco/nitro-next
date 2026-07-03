import type { Filter } from 'pixi.js';

export interface IAvatarDataContainer {
    readonly ink: number;
    readonly reds: number[] | undefined;
    readonly greens: number[] | undefined;
    readonly blues: number[] | undefined;
    readonly alphas: number[] | undefined;
    readonly paletteIsGrayscale: boolean;
    readonly colorTransform: Filter | undefined;
}
