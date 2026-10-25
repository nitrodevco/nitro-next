/**
 * The layout that stretches a node over the whole of its parent's box - every skin layer, mask and
 * backdrop that fills its component. Insets alone do not size a leaf (`@pixi/layout` defaults its
 * size to the texture's own), so the `100%` width and height are stated as well.
 */
import type { BoxLayout } from '../Box';

export const FillLayout: BoxLayout = { position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, width: '100%', height: '100%' };
