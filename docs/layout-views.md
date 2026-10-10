# Widget views from Flash layouts

`packages/nitro-react/scripts/layouts/` holds the Flash window layouts already converted to React.
Read the generated layout for geometry and text styles, then write the view by hand under
`views/`, keeping the numbers and dropping the scaffolding (lorem-ipsum defaults, per-element
`visible*` props, one-file-per-region). A bitmap is the Flash library's own, referenced with
`LayoutImage('<library>/<asset>.png')` - `habbo-room-ui-com/roomtools_gear.png` - which is the
*asset name* of the bitmap (`habbo-room-ui-com-roomtools_gear`), not a url. The client ships none
of them: Nitro Studio packs every bitmap of a library into that library's template bundle
(named after the library, from `asset.bundles.templates`), and asking for one loads its bundle. See Asset
bundles.

The library is where the client finds the bitmap, the way `getAssetByName` does: the library the
layout is in when it has the bitmap - a file of its own or a manifest alias (a region of a sheet) -
and else the window manager's, which every library draws from. The asset name is the library's,
without the `_png`. The generator writes its `layoutImage()` calls that way (`resolveImage`), so a
conversion already names the right library.

An asset name is **not unique across the client**: every library embeds its own art, so there are
a dozen `heart_png`, four `camera_png`, three `slider_obj_png`. The library in the name answers
that by construction: `habbo-room-ui-com/zoom_in.png` is the room tools' own and nothing else.
Name the library whose layout draws the bitmap (or the window manager's, where that one has no
such bitmap), never whichever library happens to have the name. `assets.py` holds every literal
`LayoutImage('<library>/...')` to the library as `scripts/flash-js-resources` has it.

The art no library has - the floor plan editor's tiles, the avatar editor's remove-selection icon -
is the client's own, under `public/assets/<folder>/` and named after its path (`window-manager/tile_preview_0.png`).

The conversions follow the component XML under `scripts/flash-js-resources/`: after a refresh of
that, regenerate them with `yarn workspace @nitrodevco/nitro-react generate-layout-views` and read
the diff - it is the list of what the client changed, and the views written from those layouts are
what has to follow.
`layouts.py` compares each registry entry's `xml` hash with the asset it came from, so a
conversion that is a revision behind is drift.

How the generator finds a bitmap, in order (`resolveImage`):

1. **The exact name.** A bundle file *is* the published asset name, so `newnavigator_create_room`
   is `newnavigator_create_room.png` and that is the client's own answer. Where several components
   carry it, the one owning the layout wins (`RESOURCE_FOR_FOLDER`, the inverse of `ASSET_FOLDERS`).
2. **The libraries' alias table**, only for a name no bundle carries. Its right-hand side is the
   *embedded* file (`roomtools_zoom_in` -> `zoom_in_png$<hash>`), and without the hash - which the
   bundles drop - an embedded name is shared by several libraries' art. Trying it first shipped a
   23x23 icon for the 187x59 `newnavigator_create_room`; that is why it comes second.
3. Token stripping (`avatar_editor_tabs_ae_tabs_head` -> `ae_tabs_head`), then a manifest region.

The alias table and the class that builds each layout (which files its art under a component) are
read from the decompiled client, whose root the generator derives from `production.version` the
way `known.py` does. A bitmap no layout names statically but a view draws goes in `RUNTIME_IMAGES`
- the floor plan editor's tool art is there because its own layout is not in the bundles.

**The bundles and the decompiled client are not the same build.** `binary_data.py` holds one
against the other, and the assets that differ - 22 catalog page layouts, and the element
description, icon set and illumina border the theme is cut from - are listed in
`known.REFERENCE_BUILD_SKEW` with which side the port follows. Regenerating from the bundles is
fine for everything else; for those, the drift checks and the theme follow `scripts-deob`.

The generator owns its output folder and rewrites it whole: an edit made to a converted layout is
gone on the next run, so a fix belongs in the generator or in the hand-written view. It writes
nothing else - no art: the bitmaps are the libraries', in their template bundles.
