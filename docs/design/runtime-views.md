# Runtime views and theme packs: design notes

Status: proposal only, nothing built yet. Written 2026-09-25.

## Goal

A tool for changing nitro-react without rebuilding it:

- add or change theme variants (skins, tints, window layouts, text styles),
- restyle or re-lay-out existing windows and widgets,
- build new custom views,
- and ship all of this as shareable packs the client loads when needed, instead of compiling it
  into the bundle.

## How Flash and the JS client do it

The Habbo client never loaded behaviour at runtime. It loaded the *look*:

- A `<layout>` XML is a tree of elements (`type`, `style`, rect, `name`, vars). `WindowParser`
  builds it into windows on demand.
- Behaviour is compiled AS3 (or its JS conversion). The controller builds the layout, then finds
  elements by name and wires them up: `_window.findChildByName("buy_button").addEventListener(...)`.
  `findChildByName` appears in 557 files under `scripts/flash-js`.
- So a layout can move, restyle, resize or re-skin anything, but it cannot add a feature. An
  element the controller does not look up by name is decoration.

That split is what makes loading views on the fly safe and cheap, and this port should copy it.

## Does it make sense? Yes, with that split

**Performance is not the problem.** A window template is tens to a few hundred nodes. Turning
JSON into React elements takes microseconds to a millisecond. The real costs are the same
whether the tree comes from a TSX file or a template:

- texture uploads and bundle fetches,
- flash-text rasterisation,
- Yoga layout.

The client already pays those at runtime. What an interpreted tree does lose:

- React Compiler memoisation of the tree. Get it back by building the element tree once per
  template (cache it by template id and version) and only re-binding what changes.
- Per-node props merging. This is fine as long as bindings are resolved once per render and not
  per node per frame.

The network cost is a small JSON file per window, zipped into a `.nitro` like `nitro-layouts`
already is. It is lazy-loaded the same way `lazyBundleForAsset` pulls in a library's bundle.

**The real risks are elsewhere:**

1. **Type safety.** Bindings become strings. A renamed element silently stops working, which is
   the same failure the Flash client had. Mitigate with a schema for each window that lists the
   named slots its controller binds, and validate every template against it at load time and in
   the tool.
2. **Security.** Shared packs are untrusted input. Templates must be pure data: no code, no
   expressions that evaluate, no packet sending by name. Only a whitelist of components and a
   whitelist of bindings. Code plugins (below) are a separate thing that only the hotel operator
   installs.
3. **Versioning.** A template written against one controller's slot schema breaks when the
   controller changes. Every pack declares `schemaVersion` and the slot-schema version per
   window. If a template is invalid or stale, log it and fall back to the built-in view.
   Never render half of it.
4. **Drift discipline.** The built-in views are held to Flash by `scripts/drift`. Overrides are
   hotel customisation on top of that, not a replacement for it. The built-ins stay in TS and
   stay checked.

## Proposed architecture

Three layers, in order of risk and effort. Each layer is useful on its own.

### 1. Theme packs: data only, low risk, do this first

The `*_VARIANTS` tables are already data wearing TS syntax: a sheet id, a `windowLayout(...)`
name, a tint colour, a text style (see `theme/Button.tsx`). Move them to JSON:

- The built-in variant tables are generated JSON in the `theme` bundle. (Done: Nitro Studio builds
  it from the client release's window manager library, `server/theme/` there, and nitro-react
  reads it into `themeRegistry`.)
- A pack adds or overrides entries by `(type, style id)` and ships its own art atlas. Asset
  names are already globally unique by path, so the pack gets its own prefix
  (`pack-<id>-...`).
- `useThemeVariant` reads from a registry: built-ins merged with the active packs, in order.
- Custom style ids use a reserved range (for example 90000+), so a pack can never collide with
  a Flash id.

### 2. View templates: look without logic

- **Format:** JSON, not XML. It is the same model as Flash's layout (element type, style,
  layout box, name, vars), but parsed natively with no XML parser at runtime. The generator
  (`generate-layout-views.ts`) already turns the Flash XML into this tree before printing TSX.
  Have it also emit JSON, and the Flash layouts become the first templates for free.
- **Renderer:** `<TemplateView id="catalog_ubuntu" bind={...} />` walks the tree and maps each
  element type to a theme component (`Frame`, `Button`, `ThemeText`, `Region`, ...). It uses the
  element-description mapping the generator already knows.
- **Binding:** a hook such as `useTemplate('catalog_ubuntu', slots)` passes named slots in:
  `{ header_title: { text }, buy_button: { onPointerTap, disabled }, item_grid: <CatalogGrid/> }`.
  Slots can be props or whole React subtrees, so complex parts (grids, room previews,
  InfiniteGrid) stay in real code, and the template only positions them.
- **Controllers stay in TS.** A window that supports overrides becomes controller plus default
  template, instead of a hand-written view. This is opt-in, one window at a time. Start with the
  windows hotels actually want to restyle: catalog layouts (already a data-driven,
  layout-code-keyed system), the navigator, the toolbar, and the infostand.
- **Custom pages that need no new logic** can be built from templates plus a small action
  vocabulary: `openWindow`, `openClientLink`, `openCatalogPage`, `showUrl`. Every one of these
  is already a client link (`openClientLink`), so actions are strings the client already
  validates.

### 3. Code plugins: new behaviour, trusted only

A truly new feature (a new packet, a new store) needs code. Load it as an ES module from a URL
with a dynamic `import()`:

- The host exposes one versioned API object: the theme kit, `TemplateView`, stores through
  selectors, `send`/`subscribe`, and `registerWindow`. React and Pixi are shared through an
  import map, so a plugin does not bundle its own copies.
- Only the hotel operator installs plugins, through the config file, never through a pack a
  user shares. Plugins are pinned by content hash.
- Treat this as a separate project. It is the part that costs real maintenance, because the host
  API becomes a public contract.

## The tool

Put it in `nitro-studio`. It already manages bundles, workspaces and versions, serves
the hotel's assets, and has a preview surface (`src/preview`). Pages:

- **Theme editor:** pick a `(type, style)`, see it rendered at several sizes and states with a
  tint applied (an untinted preview hides tint-dependent defects; see `docs/staying-in-step.md`),
  then edit the entry or import art. Its art is cut by the same rules as the client's theme
  (`server/theme/skinArt.ts`).
- **Template editor:** a tree plus property panel and a live preview. The preview is a real
  nitro-react page mounted with mock slot data from each window's slot schema. Validation runs
  as you edit: unknown slot, missing required slot, unknown style id.
- **Pack builder:** writes `<pack>.nitro` (the templates' JSON, variant JSON, an atlas, and a
  manifest with id, version, schemaVersion and the client revision). The client lists packs in
  `nitro-config.json` (`theme.packs`, `views.packs`).
- **Dev loop:** Nitro Studio pushes pack changes to a running `yarn dev` over a websocket,
  and the client swaps the registry entry. That gives hot reload without a Vite rebuild.

## Production checklist

- Content-hashed pack URLs with immutable caching. The manifest in `nitro-config.json` names
  the hashes.
- Preload the packs for windows open at boot (`asset.bundles.preload`). Everything else is lazy
  and fetched on first open, and `useRevealWhenSettled` already hides the frame until it has
  laid out.
- Validate at load with the schema, fall back to the built-in, and report once per template.
- Memoise the parsed tree by `(templateId, packVersion)`.
- Add a drift-style check in Nitro Studio: every template validated against the current
  slot schemas before a pack is published.

## Recommendation

Build layer 1, then layer 2 for a handful of windows, then decide about layer 3. Theme packs and
look-only templates give most of the "easy modification" value, keep behaviour typed and
checked, and are safe to share. Loading arbitrary views with logic on demand is where cost and
risk grow. Hold it back until there is a concrete feature that templates plus client-link
actions cannot express.
