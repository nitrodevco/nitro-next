import { BoxLayout } from '../Box';

/**
 * Whether a layout means "stretch between my insets" on an axis: both insets set, no size.
 * A Yoga *container* genuinely stretches like that, but a *leaf* (sprite, text, canvas) keeps
 * its intrinsic size instead - `@pixi/layout` defaults a leaf's unset size to its texture's
 * own. Leaf components use this to know when they must host themselves in a stretching
 * container (Pixi) or compute the spanned size themselves (DOM `calc(100% - insets)`).
 */
export const insetStretchAxes = (layout: BoxLayout | undefined, explicitWidth?: number, explicitHeight?: number): { x: boolean; y: boolean } => ({
    x: !!layout && layout.left !== undefined && layout.right !== undefined && layout.width === undefined && explicitWidth === undefined,
    y: !!layout && layout.top !== undefined && layout.bottom !== undefined && layout.height === undefined && explicitHeight === undefined,
});
