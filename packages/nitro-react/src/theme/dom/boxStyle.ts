import { CSSProperties } from 'react';

import { BoxLayout } from '../Box';

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
    if (!layout) return { boxSizing: 'border-box', display: 'flex', position: 'relative' };

    return {
        boxSizing: 'border-box',
        display: layout.display === 'none' ? 'none' : 'flex',

        // Yoga's `position: 'absolute'` child is always positioned relative to its nearest
        // yoga-participating parent, regardless of that parent's own `position` - unlike CSS,
        // which only anchors absolutely-positioned descendants to the nearest *positioned*
        // ancestor. Defaulting every non-absolute box to `relative` (a no-op for its own
        // position, since no offsets are implied) closes that gap generically instead of
        // requiring every caller with an absolutely-positioned child to opt in themselves.
        position: layout.position === 'absolute' ? 'absolute' : 'relative',
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
        // Same class of bug as `gap`/`rowGap`/`columnGap` below: `flex` is a shorthand the
        // browser immediately decomposes into `flex-grow`/`flex-shrink`/`flex-basis` (CSSOM has
        // no separate storage for the shorthand itself) - setting `flex` and then clearing
        // `flexGrow`/`flexShrink`/`flexBasis` to `undefined` in the same style patch wipes out
        // the very longhands `flex` had just set, so `layout.flex` alone (no caller ever also
        // sets the three longhands independently) silently rendered as no flex sizing at all -
        // a scroll track's `flex: 1` never grew to fill its column, collapsing to its `minHeight`
        // floor instead.
        flex: layout.flex,
        ...(layout.flexGrow !== undefined && { flexGrow: layout.flexGrow }),
        ...(layout.flexShrink !== undefined && { flexShrink: layout.flexShrink }),
        ...(layout.flexBasis !== undefined && { flexBasis: layout.flexBasis }),

        // `rowGap`/`columnGap` are only spread in when actually set, never as an explicit
        // `undefined` key alongside `gap` - React's client-side style patching clears a CSS
        // property whenever its value is `undefined`, and since `gap` is a shorthand that
        // the browser immediately decomposes into the `row-gap`/`column-gap` longhands (CSSOM
        // has no separate storage for the shorthand itself), setting `gap` and then clearing
        // `rowGap: undefined`/`columnGap: undefined` right after wipes out the very
        // sub-properties `gap` had just set - so `layout.gap` silently rendered as no gap at
        // all whenever a caller didn't also pass `rowGap`/`columnGap` (i.e. always, since no
        // caller in this codebase sets them independently).
        gap: layout.gap,
        ...(layout.rowGap !== undefined && { rowGap: layout.rowGap }),
        ...(layout.columnGap !== undefined && { columnGap: layout.columnGap }),

        width: layout.width,
        height: layout.height,
        // CSS flex items default `min-width`/`min-height` to `auto`, which resolves to the
        // item's own min-content size - a flex item normally refuses to shrink below the size
        // its content demands, however tight its container is. Yoga has no such floor (an
        // unset min bound is simply 0, so a flex-shrunk item keeps shrinking with its
        // siblings) - `theme` is built entirely against Yoga's model (every scrollable
        // area, tab row, and text column assumes children shrink to fit rather than force
        // their container to overflow), so without this override every one of those DOM
        // counterparts silently disagreed with its Pixi original: content demanded more room
        // than was available and pushed past the frame instead of being clipped/scrolled.
        // A caller-supplied `minWidth`/`minHeight` still wins.
        minWidth: layout.minWidth ?? 0,
        minHeight: layout.minHeight ?? 0,
        maxWidth: layout.maxWidth,
        maxHeight: layout.maxHeight,
        aspectRatio: layout.aspectRatio,

        // Same shorthand-vs-longhand class of bug as `gap`/`flex` above - `margin`/`padding`
        // decompose into their four side longhands the same way, so the side props are only
        // spread in when actually set rather than as an unconditional (frequently `undefined`)
        // key that would wipe out whatever the shorthand alone had just set (e.g. Border's
        // `layout={{ padding: 4 }}` callers, common throughout views-pixi/catalog).
        margin: layout.margin,
        ...(layout.marginTop !== undefined && { marginTop: layout.marginTop }),
        ...(layout.marginBottom !== undefined && { marginBottom: layout.marginBottom }),
        ...(layout.marginLeft !== undefined && { marginLeft: layout.marginLeft }),
        ...(layout.marginRight !== undefined && { marginRight: layout.marginRight }),

        padding: layout.padding,
        ...(layout.paddingTop !== undefined && { paddingTop: layout.paddingTop }),
        ...(layout.paddingBottom !== undefined && { paddingBottom: layout.paddingBottom }),
        ...(layout.paddingLeft !== undefined && { paddingLeft: layout.paddingLeft }),
        ...(layout.paddingRight !== undefined && { paddingRight: layout.paddingRight }),

        overflow: layout.overflow,
    };
};
