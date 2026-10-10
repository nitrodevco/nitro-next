/**
 * Keeps a laid-out `NineSliceSprite` or `TilingSprite` from losing its size for good.
 *
 * `@pixi/layout` sizes those two by setting `width` / `height` to `bounds * (computed / bounds)`
 * (`baseComputeLayoutData` with the `fill` object fit). Once a pass has laid one out at 0 on an axis -
 * a window that sizes itself to its content is 0 high until the content is measured - the next pass
 * divides by that 0: `0 * (137 / 0)` is `NaN`, the sprite's size stays `NaN` from then on, and its art
 * never draws again (a `WiredTradingFrame` window opened before any other window showed no frame).
 *
 * The guard gives such a sprite a size of 1 on an axis that is not a positive number before the layout
 * computes it, so the division always has something to divide by; the size the layout then sets is
 * exactly the computed one, 0 included.
 */
import { Container, NineSliceSprite, TilingSprite } from 'pixi.js';

type ComputeLayoutData = (this: Container, computedLayout: { width: number; height: number }) => unknown;

let installed = false;

/** Wraps the views' `computeLayoutData`, the one `@pixi/layout` mixes into `ViewContainer`; once per page. */
export const guardLayoutViewSizes = (): void => {
    if (installed) return;

    installed = true;

    for (const View of [ NineSliceSprite, TilingSprite ]) {
        const prototype = View.prototype as unknown as { computeLayoutData?: ComputeLayoutData };
        const compute = prototype.computeLayoutData;

        if (typeof compute !== 'function') continue;

        prototype.computeLayoutData = function (this: Container, computedLayout) {
            if (!(this.width > 0)) this.width = 1;
            if (!(this.height > 0)) this.height = 1;

            return compute.call(this, computedLayout);
        };
    }
};
