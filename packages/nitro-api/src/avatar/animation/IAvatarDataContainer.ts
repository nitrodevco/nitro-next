import { Filter } from 'pixi.js';

export interface IAvatarDataContainer {
    readonly ink: number;
    readonly reds: number[] | undefined;
    readonly greens: number[] | undefined;
    readonly blues: number[] | undefined;
    readonly alphas: number[] | undefined;
    readonly paletteIsGrayscale: boolean;
    readonly colorTransform: Filter | undefined;
    /** What Flash did to the finished avatar bitmap: greyscale + palette map for a greyscale palette, otherwise green channel copied into alpha (ink 37). */
    readonly imageFilter: Filter | undefined;
}
