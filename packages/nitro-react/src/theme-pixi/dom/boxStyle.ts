import type { CSSProperties } from 'react';

import type { BoxLayout } from '../Box';

/**
 * Translates a `BoxLayout` (the Yoga/flexbox style object `Box`'s `layout` prop already
 * accepts, from `@pixi/layout`) into a React inline `style` object for the DOM render target.
 * Yoga's own style vocabulary already mirrors CSS flexbox property names and semantics almost
 * exactly (`flexDirection`, `justifyContent`, `alignItems`, `padding*`, `position`, `gap`,
 * `flex`/`flexGrow`/`flexShrink`/`flexBasis`, percentage/pixel sizing, ...) - this is a direct
 * pass-through for the properties both share, not a re-derivation. `boxSizing` is pinned to
 * `border-box` to match Yoga's own box model (padding/border are included in a node's `width`/
 * `height` there, unlike CSS's default `content-box`).
 */
export const boxLayoutToStyle = (layout: BoxLayout | undefined): CSSProperties => {
    if (!layout) return { boxSizing: 'border-box', display: 'flex' };

    return {
        boxSizing: 'border-box',
        display: layout.display === 'none' ? 'none' : 'flex',

        position: layout.position,
        top: layout.top,
        left: layout.left,
        right: layout.right,
        bottom: layout.bottom,

        flexDirection: layout.flexDirection,
        flexWrap: layout.flexWrap,
        justifyContent: layout.justifyContent,
        alignItems: layout.alignItems,
        alignSelf: layout.alignSelf,
        alignContent: layout.alignContent,
        flex: layout.flex,
        flexGrow: layout.flexGrow,
        flexShrink: layout.flexShrink,
        flexBasis: layout.flexBasis,
        gap: layout.gap,
        rowGap: layout.rowGap,
        columnGap: layout.columnGap,

        width: layout.width,
        height: layout.height,
        minWidth: layout.minWidth,
        minHeight: layout.minHeight,
        maxWidth: layout.maxWidth,
        maxHeight: layout.maxHeight,
        aspectRatio: layout.aspectRatio,

        margin: layout.margin,
        marginTop: layout.marginTop,
        marginBottom: layout.marginBottom,
        marginLeft: layout.marginLeft,
        marginRight: layout.marginRight,

        padding: layout.padding,
        paddingTop: layout.paddingTop,
        paddingBottom: layout.paddingBottom,
        paddingLeft: layout.paddingLeft,
        paddingRight: layout.paddingRight,

        overflow: layout.overflow,
    };
};
