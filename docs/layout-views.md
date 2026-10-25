# Views from Flash window templates

A window or widget draws the Flash layout its controller builds, as data: `TemplateWindow` (in
`src/theme`) loads the template with `useTemplate` and the theme's `TemplateView` draws each element
as the theme component its type is, at the rect the layout gives it. A template's id is
`<library>/<asset>` - the asset the controller builds the window from (`getAssetByName("purse_xml")`
is `habbo-toolbar-com/purse_xml`). Nitro Studio converts every `<layout>` of a library with the
theme's `layoutToTemplate` into that library's template bundle (named after the library, from
`asset.bundles.templates`); see [Asset bundles](asset-bundles.md).

What the controller does with its named elements (`findChildByName`) comes in as `bindings`: a
caption, whether it shows, a click, the children it adds to a container. What it does once the
layout is built (moving, resizing, stacking) is `arrange`. Name the Flash method in a comment
beside each binding:

```tsx
<TemplateWindow
    id="habbo-quest-engine-com/Achievements"
    arrange={arrange}
    bindings={{
        back_button: { onPointerTap: back },
        // `refreshCategoryList`.
        categories_cont: { visible: !category, children: tiles.map(...) },
    }}
/>
```

What Flash builds in code rather than in a layout (a table, a previewer, a rotating image) is
drawn by the port's own components inside the layout's containers. To write a view, read the
layout XML under `scripts/habbo-js-resources/<component>/` and the AS3 controller in `scripts/habbo-as3`
that builds it (`scripts/habbo-js` shows how Habbo's JavaScript port binds the same layout).
The template supplies geometry, skins and text styles; a view only carries the numbers the
controller's code adds.

## Bitmaps

A bitmap is the Flash library's own, referenced with `LayoutImage('<library>/<asset>.png')` -
`habbo-room-ui-com/roomtools_gear.png` - which is the *asset name* of the bitmap
(`habbo-room-ui-com-roomtools_gear`), not a url. The client ships none of them: the library's
template bundle carries every bitmap of the library, and asking for one loads its bundle.

The library is where the client finds the bitmap, the way `getAssetByName` does: the library the
layout is in when it has the bitmap - a file of its own or a manifest alias (a region of a sheet) -
and else the window manager's, which every library draws from. The asset name is the library's,
without the `_png`.

An asset name is **not unique across the client**: every library embeds its own art, so there are
a dozen `heart_png`, four `camera_png`, three `slider_obj_png`. The library in the name answers
that by construction: `habbo-room-ui-com/zoom_in.png` is the room tools' own and nothing else.
Name the library whose layout draws the bitmap (or the window manager's, where that one has no
such bitmap), never whichever library happens to have the name. `scripts/drift/assets.py` holds
every literal `LayoutImage('<library>/...')` to the library as `scripts/habbo-js-resources` has it.

The art no library has - the floor plan editor's tiles, the avatar editor's remove-selection icon -
is the client's own, under `public/assets/<folder>/` and named after its path
(`window-manager/tile_preview_0.png`).

## Reference builds

**The bundles and the AS3 are not the same build.** `scripts/habbo-js-resources` comes from a
newer client release than the `scripts/habbo-as3` decompile. `binary_data.py` holds one against the
other, and the assets that differ - most of them catalog page layouts, plus the me menu's settings,
the games lobby and the default texts the newer build extends - are listed in
`known.REFERENCE_BUILD_SKEW` with why. For those, the drift checks and the views follow the AS3.

`layout_views.py`, `layout_fills.py` and `layout_text_styles.py` hold the hand-written views to the
layouts they draw; see [Staying in step](staying-in-step.md).
