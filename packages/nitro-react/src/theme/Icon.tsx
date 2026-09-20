/**
 * The client's `<icon style="N">`: template `icon_N` of `habbo_skin_icon_set_xml`, one rect of
 * the SWF's `habbo_icons_png` - bundled as the theme asset `icon-set-src` (see
 * `utils/themeUrls.ts`) and cut by `utils/iconSetFrames.ts`. That sheet and its rects are the
 * authority on what a style shows and how big it is; the numbering is the skin's own, so a call
 * site names the style the Flash layout names, never a made-up word for the picture.
 *
 * This is the only icon component. What the client draws from an asset library instead - a
 * `<static_bitmap asset_uri="...">` or a `<bitmap>` a class fills with `getAssetByName(...)` -
 * is layout art, not an icon: draw it with a `ThemeImage` whose `src` is the asset's own
 * `LayoutImage`, the way the rest of `views/` does. The two are not interchangeable: the
 * navigator's controls, the
 * purse's buttons and the friend list's row buttons are all library bitmaps, and only the
 * accept/decline check and cross, the triangles and the extended-profile eye are icon-set styles.
 *
 * A `layout` prop is always applied (defaulting to `{}`) even when the caller doesn't pass one -
 * without it this is invisible to @pixi/layout's yoga tree in Pixi mode (see `Layout.getRoot` in
 * @pixi/layout: an object with no `.layout` set is skipped entirely, staying at Pixi's raw
 * default position instead of being placed by its flex parent).
 */
import { Container as PixiContainer } from 'pixi.js';
import { forwardRef } from 'react';

import { BoxLayout } from './Box';
import { ThemeImage } from './ThemeImage';
import { DynamicStyleRole, ICON_SET_FRAMES, ThemeLayoutMeta } from './utils';

export interface IconProps extends ThemeLayoutMeta {
    /** The `icon_set` template number (`<icon style="N">`). */
    variant: string | number;
    /** The element's `color` attribute - the icon set is drawn white and tinted per call site. */
    tintColor?: string;
    /** The Flash window `blend` - the icon's opacity. */
    alpha?: number;
    /** A `#icon` / `#bg` tag under a `dynamicStyle` host. */
    dynamicRole?: DynamicStyleRole;
    layout?: BoxLayout;
}

export const Icon = forwardRef<PixiContainer, IconProps>(({ variant, tintColor, alpha, dynamicRole, tooltip, layout }, ref) => {
    const frame = ICON_SET_FRAMES[String(variant)];

    if (!frame) return null;

    return (
        <ThemeImage
            ref={ref}
            textureKey="icon-set-src"
            frame={frame}
            tint={tintColor}
            alpha={alpha}
            dynamicRole={dynamicRole}
            tooltip={tooltip}
            layout={layout ?? {}}
        />
    );
});

Icon.displayName = 'Icon';
