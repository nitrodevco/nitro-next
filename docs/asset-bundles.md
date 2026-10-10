# Asset bundles

Everything the client draws that is not downloaded from the hotel ships in a `.nitro` bundle -
the same zip archive the room engine already loads furniture, pets and figures from, so there is
one `AssetManager` holding every bitmap and `GetAssetManager().getTexture(<name>)` reaches any of
them from anywhere. `scripts/build-asset-bundles.ts` writes them:

```sh
yarn workspace @nitrodevco/nitro-react build-asset-bundles     # all of them
node scripts/build-asset-bundles.ts nitro-layouts fonts        # or just these
```

| Bundle | Mode | Holds |
|---|---|---|
| `nitro-layouts` | loose | the client's own art no Flash library has: the floor plan editor's tiles under `assets/window-manager`, `assets/avatar-editor` |
| `fonts` | loose | the captured `*.air51.json` AIR bundles |
| `font-faces` | loose | the `.ttf` faces the browser falls back to |
| `loading-screen` | loose | `assets/loading-screen` - the loading screen's frame and photos, loaded by name before anything else and unloaded (`unloadAssetBundle`) once the client replaces the screen |
| `sounds` | loose | the `.mp3` sounds under `assets/sounds`, loaded by name the first time one plays |

One bundle is not built here: Nitro Studio builds and publishes them from the client release's
art and the hotel's own (see [Nitro Studio](nitro-studio.md)), and the client loads each from its
own config key (`HOTEL_BUNDLE_KEYS` in `utils/assetBundles.ts`):

| Bundle | Key | Holds |
|---|---|---|
| `effect-icons` | `effect.icons.url` | the effect icons, `effect-icons-fx_icon_<id>` |

The window templates are Studio's too, one bundle per Flash library rather than one file:
named after the library, from `asset.bundles.templates` with `%libname%` the library (`loadTemplateBundle`).
Each holds `templates.json` - the library's `<layout>`s converted by the theme's `layoutToTemplate`,
keyed `<library>/<asset>` (`habbo-toolbar-com/purse_xml`) - and every bitmap of the library's, the
ones no layout names too, named `<library>-<asset>`: that is where the art the views draw with
`LayoutImage('<library>/<asset>.png')` comes from. The window manager's carries the UI theme too,
as the Habbo client draws its window skins from that library: every window skin's sprite on one sheet
(`theme.png`, `theme_spritesheet.json`) and `theme-variants.json` - every variant, the cascade and the
icon set's rects (`themeRegistry.ts`) - which `preloadThemeAssets` reads. A bitmap a layout finds in the window manager's
library is in `habbo-window-manager-com`'s only, which `useTemplate` loads with any
library's and the preload fetches at boot. Any other library's bundle is loaded the first time one
of its bitmaps is asked for (`lazyBundleForAsset`: a Flash asset name has no `-`, so the library is
the name up to its last one).

The chat styles are a library's bundle too, as the Habbo client reads them out of its
`habbo-free-flow-chat-com` library: `bundled/templates/habbo-free-flow-chat-com.nitro`, loaded as
`habbo-free-flow-chat-com` (preloaded - the room's chat needs it), with the bitmaps named
as the library names them (`habbo-free-flow-chat-com-style_<assetId>_<file>`, and the chat
history tray's `habbo-free-flow-chat-com-tray_bar`, `-close_x`, `-scrollbar_thumb` ...) and
`chat-style-definitions.json` beside them. Nitro Studio's chat bubble builder writes it: the styles
from its chat styles, every other bitmap from the library's `.hab`, which the workspace keeps and
edits with the template libraries. So are the
renderer's own bitmaps, as the Habbo client keeps them: the Variable FX in
`bundled/templates/habbo-room-object-visualization-lib.nitro` (loaded by the room engine's
`VariableFxAssetLibrary`), with `variable-fx-tables.json` beside them, and the avatar additions in
`bundled/templates/habbo-avatar-render-lib.nitro` beside the avatar data's tables (geometry, part sets,
actions, ... - which `LoadAvatarData` reads and lets go of), preloaded because the room draws the
additions by name. Both keep the names the library gives the bitmaps.

The client ships no copy: with a key (or `asset.bundles.templates`) unset, that bundle is not loaded - and without the window manager's,
no window has its chrome.

An **atlas** bundle packs its PNGs into one sheet plus a Pixi `SpritesheetData` manifest
(`<name>.png` + `<name>_spritesheet.json`), which is one GPU upload the per-asset textures share.
A **loose** bundle is one PNG entry per asset, its own texture. `<name>.json` is the asset data
(the collection's name and its assets); every other JSON entry is a table for that bundle's own
consumer, read back with `getBundleFile`, and anything else is bytes (`getBundleBinary`).

Which mode a bundle wants is a measured question, not a rule. Packing shrank the old wired art by
a quarter (427 -> 316 KiB) and grew the old layout art by a third (699 -> 902 KiB): many small homogeneous PNGs
deflate better than one big sheet of mixed art, whose ~7-18% of unused space is real pixels that
still have to encode. Re-measure before flipping a bundle over, and keep the atlas where the win
is the texture count rather than the bytes.

Rules that come out of that:

- **An asset's name is its path under `public/assets`**, extension dropped, `/` and any remaining
  `.` turned into `-`: `window-manager/tile_preview_0.png` -> `window-manager-tile_preview_0`. That makes it unique across
  every bundle by construction, and the build fails on a collision. `LayoutImage` builds exactly
  that name - and a library bitmap's `<library>-<asset>` the same way, from `<library>/<asset>.png`,
  which no folder here shares a name with. The dot
  matters: `GraphicAssetCollection.removeFileExtension` cuts a name at its last dot, which is how
  `x-0.12.png` and its `x-0.2.png` sibling would arrive as one asset.
- **The loose PNGs are build input, not files the client fetches.** They stay under
  `public/assets/<folder>/` - the drift checks read them - but `vite.config.ts`'s `pruneBundledAssets` deletes every one of them from `dist/` after
  the build, by the `absorbed` list in `public/assets/bundles/bundles.json`. There is no url
  fallback behind a bundle any more: a missing asset is a console error, not a slow path.
- **Rebuild after touching anything under `public/assets/**`.** A bundle that is a revision behind
  does not fail; it draws the old art. `bundles.json` records the file behind every asset, so the
  pack is auditable rather than trusted.
- **What is preloaded is `asset.bundles.preload` in `nitro-config.json`**, fetched by
  `preloadAssetBundles()` before the first view renders. `effect-icons` is
  deliberately out of it: a texture request for one of its assets pulls the bundle in on its own
  (`lazyBundleForAsset` in `utils/assetBundles.ts`), so adding a lazy bundle means adding its name
  prefix there. `font-faces` is out of it too; `preloadFlashFonts` starts it in the background.
  `scripts/drift/bundle_loading.py` holds every bundle to one of those ways in (preloaded, a lazy
  prefix every one of its assets carries and no other bundle's does, or loaded by name in code):
  a bundle reached by none of them is art that never draws.
- **The builder owns `public/assets/bundles/`.** A full run drops the archives the previous
  `bundles.json` lists and the current table no longer builds, so a renamed bundle does not leave
  its old file behind to be served. A `.nitro` no manifest ever named is left alone.
- **A `ThemeImage`'s `src` is an asset name or a url**, told apart by `isAssetName` - a name has no
  scheme, no `/` and no `.`. Either way it resolves to a `Texture` through the asset manager; a
  bundled bitmap is never fetched by url.
