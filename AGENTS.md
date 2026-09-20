# nitro-next

A port of the Habbo Flash client to Pixi v8 + React. Yarn workspaces under `packages/`:

| Package | What it is |
|---|---|
| `nitro-api` | Shared interfaces, enums, events, utilities. No runtime state. |
| `nitro-packets` | Every incoming parser and outgoing composer, plus the header maps. |
| `nitro-renderer` | The room engine: object logics, visualizations, asset loading. |
| `nitro-react` | The client UI. Almost all feature work lands here. |

The reference implementation is the decompiled Flash client. When porting a feature, read the
Flash class first and name it in the docblock of what you write (`` `InfoStandWidgetHandler.checkUserWithRightsModerationLevel` ``).
Match its behaviour and gating rules; do not invent simpler ones.

## Gates

Run these before calling anything done. All of them must be clean.

```sh
npx tsc -p packages/nitro-react/tsconfig.typecheck.json --noEmit     # zero errors
npx eslint <changed files>                                           # zero errors, no new warnings
node scripts/generate-barrels.ts --check                             # from packages/nitro-react
```

Lint enforces the style: 4-space indent, single quotes, `[ a, b ]` array spacing, trailing commas
on multiline, `simple-import-sort` with `#base/*` as its own group. Run `eslint --fix` for the
mechanical fixes rather than hand-formatting.

The React Compiler is on. Never add `eslint-disable react-hooks/*`. When a rule fires, restructure:
no impure calls at render time (`performance.now()`, `Math.random()`, `new Date()` - use
`useSyncExternalStore` or a hook such as `useSecondsClock`), no `setState` synchronously inside an
effect to "sync" props (adjust during render instead, as `RoomBotSkillConfigurationWidget` does with
`loadedFor`), no reading `.current` during render.

## `nitro-react` layout

```
src/
  commands/     Plain functions that send packets and write stores - `<feature>Commands.ts`.
  context/      Zustand stores, one feature per directory.
  handlers/     Incoming packet listeners, registered once per connection.
  hooks/        React hooks. `hooks/room` is the room engine's event side.
  components/   Wiring: mounts, permissions, callbacks; renders a view.
  views/        Presentation, one window or widget per directory.
  theme/        The Pixi UI kit (Frame, Box, Button, ThemeText, ...). Do not add feature code here.
  chat/         Chat bubble models.
  utils/        Pure helpers.
```

Every `index.ts` under `context/<feature>`, `hooks`, `handlers`, `commands`, `components`, `utils`
and `chat` is generated: run `yarn generate-barrels` from `packages/nitro-react` after adding,
moving or deleting a file there, and never edit one by hand. `theme/index.ts` is curated by hand
and `views/` has no barrels - views are imported by path.

### Every file

- `.ts` unless the file contains JSX. Selector hooks, action hooks, stores, commands and most
  hooks are `.ts`.
- A docblock at the top saying what the module is and, for a port, which Flash class it
  ports. A reader should not need to open a second file to learn what the first one is for.
- No `eslint-disable`. The four that exist each carry a reason on the line; do not add a fifth
  without one, and prefer restructuring.
- No `TODO`. Do the thing, or say in the docblock what is missing and why, so the gap is
  documented rather than deferred.
- No copy-paste stubs and no dead code: a file nothing imports, or a slice that duplicates
  another under a different name, is deleted, not kept for later.

Imports go through the aliases: `#base/context/<feature>` (never `#base/context`),
`#base/commands`, `#base/handlers`, `#base/hooks`, `#base/theme`, `#base/utils`,
`#base/views/...` and `#base/components/...` by path.

### Stores (`context/<feature>`)

- **App-wide singletons**: `roomStore`, `userStore`, `systemStore`, `navigatorStore`,
  `avatarEditorStore`, `notificationStore`, `inventoryStore`, `wiredStore`, `wiredTradingStore`.
  Read in React with `useXStore(x => x.field)`, one field per call - never select an object
  literal. Outside React use `xStore.getState()`.
- **Window-scoped stores** (catalog, friends) keep a provider and are read with
  `useXStore(selector)` inside it; `useXStoreApi()` gives the raw store to handlers. Prefer a
  singleton: a window that should remember what it held when it reopens (the avatar editor's
  wardrobe) cannot do so from a store that is created with the window.
- Each store is composed of slices: `context/room/store/RoomBotsSlice.ts` exports a `State`, an
  `Actions` type, `XSliceInitialState` and `createXSlice`. `RoomStore.setRoom` resets every slice
  from its initial state, so put per-room data in a room slice and it is cleared for free.
- **Actions** are exposed by `context/<feature>/actions/useXActions.tsx`, which reads them off the
  store once and returns a constant object. Components take actions from there, not from a
  selector, so an action user never re-renders.
- **Selectors** with a name live in `context/<feature>/selectors/`, one hook per file, grouped
  by subdirectory. Add one when the same expression appears in three places.
- Constants that describe packet values (`BOT_SKILL_SETUP_CHAT = 2`) live next to the slice that
  stores them and are exported.
- Every slice's actions are exposed by an action hook. If a component needs an action the
  hooks do not offer, add it to the slice's hook (or add `useRoom<Slice>Actions.ts`) rather than
  reaching for `xStore.getState()` - that call belongs in handlers and commands only.

### Packet handlers (`handlers/`)

One file per Flash message handler, named `register<Feature>Handlers.ts`, in the directory of the
store it mainly writes (`handlers/room`, `handlers/user`, `handlers/navigator`). The shape:

```ts
/**
 * <What this covers and the Flash class it ports.>
 */
export const registerRoomInfostandHandlers = ({ send, subscribe }: WebSocketConnection) => {
    const { setBadges, setRelationships } = roomStore.getState();   // actions: stable, read once

    return subscribeAll(subscribe, [
        on(RoomReadyMessage, () => send(new GetHabboGroupBadgesComposer({}))),

        on(HabboUserBadgesMessage, (data) => {
            const room = getRoom();                                // state: read when the packet lands
            if (!room) return;

            setBadges(data.userId, data.selectedBadges);
        }),
    ]);
};
```

Rules:

- Destructure **actions** once at registration; read **state** through `xStore.getState()`
  inside the listener - `getRoom()` from `#base/context/room` for the room itself. Packets
  arrive in batches with no render between them, so anything captured at registration is a
  packet behind.
- The listener parameter is `data`. A single call may be an expression body, written without
  parentheses (`data => setBadges(data.userId, data.selectedBadges)`); anything else is a block,
  and a block takes them (`(data) => { ... }`) - `@stylistic/arrow-parens` enforces both.
- The handler that consumes an answer is the one that sends the request
  (`on(UserObjectMessage, () => send(new GetIgnoredUsersComposer({})))`).
- Register the file in `handlers/registerHandlers.ts` (the barrel is generated). Only a handler
  whose store is created with a window registers from that window, with `useRegisterHandlers`.
- Something that is not a packet listener (a store subscription bridging into the renderer)
  still returns its unsubscribe and is named for what it does, not `*Handlers`.
- No React in `handlers/`. If a listener needs a value React owns, the value belongs in a store.
- A registered incoming packet nobody subscribes to is a feature that silently does nothing: the
  packet arrives, is parsed and is dropped. `scripts/drift/handlers.py` holds every entry of
  `GetIncomingPackets.ts` against the subscription sites and against the Flash component that
  handles the same message id, so a parser with no listener is either wired up or listed in
  `known.HANDLERS_UNHANDLED` with what it waits for - the window, store or manager that is
  missing, never a blanket "not ported yet". Finishing a packet in `nitro-packets` is half the
  job; the other half is the listener, or the entry saying why there is none.

### Hooks (`hooks/`)

- Room engine events (`RoomWidgetUpdateRoomObjectEvent`, `RoomObjectWidgetRequestEvent`) are
  subscribed with `useRoomEventDispatcher(TYPE, handler)`; the hook keeps the latest handler in a
  ref, so pass a fresh closure and do not memoise it. Hooks that handle those events are named
  `useRoom<Thing>Handler`; the `Handler` suffix means engine events here, packets in `handlers/`.
- A hook that just binds a command to the socket or fixes one argument of a generic hook is not
  worth a file. Call `goToRoom(send, id)` or `useWindowVisibility('catalog')` at the use site.
- Hooks that derive a view model (`useRoomUserData` -> `AvatarInfo`) return one typed object with
  every flag the views need computed, so views stay free of permission logic.
- Data that a window carries when it opens travels as **window params**:
  `showWindow('catalog', { pageName })`, consumed by a `use<Window><Thing>Request` hook shaped like
  `useCatalogPageRequest` (act when the data is ready, then clear the param). Register the param
  type in `context/system/store/WindowRegistry.ts`. In-client links (`catalog/open/pets`) go
  through `openClientLink` in `commands/clientLinkCommands.ts`, which maps them onto this.

### Components and views

Two shapes, by what is being built:

- **Room widgets** (`components/room/widgets/<widget>/<Name>Widget.tsx` +
  `views/room-widgets/<widget>/<Name>View.tsx`): the component is mounted by `RoomWidgets`,
  reads stores, hooks and the socket, works out permissions and callbacks, and renders the view
  with props. The view is props and theme components. The Flash gating rule lives in the
  component, with the Flash method named in a comment.
- **Windows** (`views/<window>/<Name>View.tsx`, mounted by `components/<window>/<Name>Component.tsx`):
  the component decides visibility (and holds the provider for a window-scoped store); the view
  owns its wiring, the way `NavigatorView` and `CatalogView` do.

In either shape a view may read stores through selector and action hooks, translate with
`useTranslation`, and send packets through `commands`; it never calls `xStore.getState()` and
never registers packet handlers.

Naming: `*Widget` for a room widget's component, `*Component` for a window's mount, `*View` for
a view, and no `Pixi`/`Dom` suffix unless the file has a render-mode twin (the theme,
`RoomPreviewer`, `AvatarImage`). Sub-views of a window (`FriendListTab`, `AvatarEditorWardrobe`)
carry the window's name as a prefix.

- Text goes through `ThemeText` with a `textStyle` key (see Text below); tooltips through `Region`.
  `Frame` needs an explicit `layout.height`, or its content is clipped. A `CheckBox` and its
  label are siblings in a row `Box`, not nested.
- A pointer only reaches a child inside its parent's laid-out box: the event boundary prunes
  children outside a container's `hitArea`. A list, menu or sub menu that reaches past the thing
  that opened it - or past a window, which clips its content anyway - is a `FloatingPopup` (the
  window layer, whole-area hit testing, `onOutsideClick`), placed with `getGlobalRect(anchor)`.
  An absolutely positioned child of a small box draws but answers only where it overlaps the box.
- A drop menu is the theme's `Dropmenu`: `caption`, `options` (each with its own `onSelect`,
  `keepOpen` for an entry that lists more). It opens Flash's expanded view over itself, fits it on
  the screen and scrolls it (`placeExpandedDropmenu`), and closes on a pick or an outside press.
  Wrap it for a feature (`WiredDropdown`, `WiredMenuDropmenu`); do not build another list popup.
- Every `Frame` stays unrendered until its size and position have settled
  (`useRevealWhenSettled`), so a window never flashes small in a corner first. Content that
  keeps changing for a while still shows after 12 frames.
- Compare enums with `Number(a) === Number(b)` or against the enum constant; string enums and
  numeric packet fields do not line up otherwise.
- Never destroy a Pixi texture before React has committed the element that replaces it.
- Config flags (`useConfigValue('infostand.motto.change.enabled')`) gate features the way the
  Flash `getBoolean(...)` / `getProperty(...)` calls did, with Flash's key - never a new name
  (`badge.leaderboard.enabled` hid a badge rank Flash shows unconditionally). Flash reads them from
  the hotel's `external_variables`; this client does not load that file, so every key the hotel
  sets and the port reads goes into `public/config/nitro-config.json` with the hotel's value
  (nitro-tools' `gamedata/ExternalVariables.json`). A missing one is silently Flash's default -
  that is how `wired.menu.enabled` kept the wired menu off in the user's own room. `getBoolean`
  defaults to false, so a fallback is `=== true`, not `?? true`. `config_keys.py` checks all of it.

### Asset bundles

Everything the client draws that is not downloaded from the hotel ships in a `.nitro` bundle -
the same zip archive the room engine already loads furniture, pets and figures from, so there is
one `AssetManager` holding every bitmap and `GetAssetManager().getTexture(<name>)` reaches any of
them from anywhere. `scripts/build-asset-bundles.ts` writes them:

```sh
yarn workspace @nitrodevco/nitro-react build-asset-bundles     # all of them
node scripts/build-asset-bundles.ts theme chat-styles          # or just these
```

| Bundle | Mode | Holds |
|---|---|---|
| `theme` | atlas | `assets/theme` - the skin chrome `THEME_ASSETS` names |
| `chat-styles` | atlas | `assets/chat-styles`, plus every style's `chat_definition.json` merged into one `chat-style-definitions.json` |
| `effect-icons` | atlas | `assets/effect-icons` |
| `nitro-renderer` | atlas | `assets/renderer/**` - the avatar additions and the Variable FX bitmaps, plus the FX icon/renderer tables as `variable-fx-tables.json` |
| `nitro-wired` | atlas | `assets/wired` |
| `nitro-layouts` | loose | every `assets/<component>` layout folder, the catalog's included |
| `fonts` | loose | the captured `*.air51.json` AIR bundles |
| `font-faces` | loose | the `.ttf` faces the browser falls back to |

An **atlas** bundle packs its PNGs into one sheet plus a Pixi `SpritesheetData` manifest
(`<name>.png` + `<name>_spritesheet.json`), which is one GPU upload the per-asset textures share.
A **loose** bundle is one PNG entry per asset, its own texture. `<name>.json` is the asset data
(the collection's name and its assets); every other JSON entry is a table for that bundle's own
consumer, read back with `getBundleFile`, and anything else is bytes (`getBundleBinary`).

Which mode a bundle wants is a measured question, not a rule. Packing shrank `wired` by a quarter
(427 -> 316 KiB) and grew `nitro-layouts` by a third (699 -> 902 KiB): many small homogeneous PNGs
deflate better than one big sheet of mixed art, whose ~7-18% of unused space is real pixels that
still have to encode. Re-measure before flipping a bundle over, and keep the atlas where the win
is the texture count rather than the bytes.

Rules that come out of that:

- **An asset's name is its path under `public/assets`**, extension dropped, `/` and any remaining
  `.` turned into `-`: `room-ui/roomtools_gear.png` -> `room-ui-roomtools_gear`. That makes it
  unique across every bundle by construction, and the build fails on a collision. `LayoutImage`
  builds exactly that name, so a call site still names the file the Flash layout named. The dot
  matters: `GraphicAssetCollection.removeFileExtension` cuts a name at its last dot, which is how
  `border/15-default-shade-0.12.png` and its `0.2` sibling would arrive as one asset.
- **Art the room engine looks up by its bare Flash name keeps that name.** `AvatarVisualization`'s
  additions ask for `avatar_addition_user_typing` and the FX renderers for `variablefx_*`, so the
  folders that group them under `assets/renderer/` are listed in the bundle's `strip` and dropped
  from the name rather than prefixed onto it. A name built at run time (`'avatar_addition_number_'
  + n`) has no folder in front of it either, which `scripts/drift/assets.py` has to allow for.
- **The loose PNGs are build input, not files the client fetches.** They stay under
  `public/assets/<component>/` - the layout generator writes them there, and the drift checks read
  them - but `vite.config.ts`'s `pruneBundledAssets` deletes every one of them from `dist/` after
  the build, by the `absorbed` list in `public/assets/bundles/bundles.json`. There is no url
  fallback behind a bundle any more: a missing asset is a console error, not a slow path.
- **Rebuild after touching anything under `public/assets/**`.** A bundle that is a revision behind
  does not fail; it draws the old art. `bundles.json` records the file behind every asset, the way
  `layout-images.json` does for the layout bitmaps, so the pack is auditable rather than trusted.
- **What is preloaded is `asset.bundles.preload` in `nitro-config.json`**, fetched by
  `preloadAssetBundles()` before the first view renders. `effect-icons` and `font-faces` are
  deliberately out of it: a texture request for one of their assets pulls the bundle in on its own
  (`lazyBundleForAsset` in `utils/assetBundles.ts`), so adding a lazy bundle means adding its name
  prefix there.
- **The builder owns `public/assets/bundles/`.** A full run drops the archives the previous
  `bundles.json` lists and the current table no longer builds, so a renamed bundle does not leave
  its old file behind to be served. A `.nitro` no manifest ever named is left alone.
- **A `ThemeImage`'s `src` is an asset name or a url**, told apart by `isAssetName` - a name has no
  scheme, no `/` and no `.`. Pixi draws the texture; the DOM target needs a url, and
  `getAssetImageUrl` makes one (a `blob:` of the archive's own bytes for a loose asset, a canvas
  slice for a sheet frame).
- **A table a bundle carries is the one copy, and it lives beside the art it describes.** Each
  chat style's row is a `chat_definition.json` in its own folder - `{ id, flags, regPoints,
  bitmaps }`, with the folder name as the `assetId`, so that name is written once. The builder
  merges them in id order (which is `chatstyles_xml` order) into `chat-style-definitions.json`
  inside `chat-styles.nitro`, and `ChatStyleLibrary` reads that back; `ChatStyleDefinitions.ts` is
  only the types and the two id predicates. Adding a style is a folder with its bitmaps and its
  row - no TS to edit.

### Text

All UI text goes through `ThemeText` (and `TextInput`) with a `textStyle` key from
`theme/utils/textStyles.ts`. Each key carries a `habboKey` - the Flash client's own style name -
and `theme/font/flash-text` draws it exactly as the Flash client did:

- `flash-text/air32/` is a port of Sulake's bit-exact re-implementation of Adobe AIR's text
  rasterizer. Its arithmetic is deliberately literal: every `Math.fround`, every rounding helper
  and the order of operations reproduce 32-bit float behaviour. Do not "simplify" it; a change
  there is only safe if the rendered pixels stay identical: run
  `node scripts/flash-text-golden/run-check-ts.mjs` from `packages/nitro-react`, which hashes 7,832
  renders against the original renderer's output (`scripts/` is git-ignored, so the harness and
  the original in `scripts/flash-text-renderer` are local only).
- `habboTextStyles.ts` is generated from the client's `styles.css` by
  `scripts/generate-habbo-text-styles.ts`. Regenerate it, never edit it; a new theme style is a
  new `TEXT_STYLES` entry, `habboTextStyle('<habboKey>')` of an existing key - never a hand-written font.
- Fonts are captured bundles in `public/assets/fonts/*.air51.json`, shipped in `fonts.nitro` and
  registered once at boot by `preloadFlashFonts()`. They cover printable ASCII. A string with any
  other character - or a raw `fontFamily`/`fontSize` override - falls back to the browser's text
  in the same `.ttf` faces, so never assume a text is a Flash bitmap. Those faces are
  `font-faces.nitro`, added to `document.fonts` from the archive's own bytes by
  `registerBundledFonts` - started at boot but never awaited, because they are only the fallback.
- A rendered text is a bitmap with Flash's 2px `TextField` gutter on every side; caret and
  selection geometry (`flashTextCaretRect`) is in that same space.
- The `il_*` styles are etched: a translucent white line under every glyph, made for dark text
  on a light panel. Never put a light `fill` on one - the etch shows through as a smear. Flash
  has separate un-etched styles for that (`text-style-il-button-white`,
  `text-style-il-frame-title-white`, `text-style-il-regular-white`, ...); use those.
- For anything that is not a `ThemeText` - chat bubbles, a texture you own - use
  `renderFlashTextCanvas` (plain text or `parseFlashTextMarkup` runs) and fall back to
  `renderBrowserTextCanvas`, the way `chat/ChatBubbleText.ts` does.

The words come from two files, loaded in Flash's order by `useLocalizationLoader` and parsed the
way `CoreLocalizationManager.parseLocalizationData` does (`utils/localizationData.ts`: the key ends
at the first `=`, `\n` is a line break):

1. `gamedata.urls.defaultLocalizations` - the client's embedded `default_localizations` with the
   language's file over it. Most `wiredmenu.*` texts exist only here.
2. `gamedata.urls.externalTexts` - the hotel's texts, which override the first.

Both are generated by nitro-tools (`D:\Repositories\nitro\nitro-tools`: `GetExternalTexts`, and
`GetDefaultLocalizations`, which reads a local `HabboAir.swf` given with `--client-swf`); a text
that is wrong or cut off is fixed there and regenerated, never patched in the client. Use Flash's
key and Flash's parameter names (`t('infostand.text.badges_rank', '', { rank: '#3' })` fills
`%rank%`). A key that neither file has and no Flash class or layout names is one the port made up:
it only ever shows as the bare key. `localization_keys.py` lists them.

### Widget views from Flash layouts

`packages/nitro-react/scripts/layouts/` holds the Flash window layouts already converted to React.
Read the generated layout for geometry and text styles, then write the view by hand under
`views/`, keeping the numbers and dropping the scaffolding (lorem-ipsum defaults, per-element
`visible*` props, one-file-per-region). Bitmaps come from `scripts/images/` into
`public/assets/<component>/<name>.png`, referenced with `LayoutImage('<component>/<name>.png')` -
which is the *asset name* of the bitmap in its `.nitro` bundle, not a url. See Asset bundles.

The component is the client's own, kebab-cased, one folder per library beside the theme's own art:
`room-ui`, `catalog`, `toolbar`, `navigator` (`navigator` + `newnavigator`), `wired`
(`userdefinedroomevents`), `window-manager` (`windowmanager` + the `window/utils` layouts),
`friend-bar`, `friend-list`, `avatar-editor`, `quest-engine`, `help`, `games`, `groups`,
`inventory`, `messenger`, `moderation`, `notifications`, `discord`, `communication-demo` -
`ASSET_FOLDERS` in the generator maps a layout's folder onto it. A bitmap two components draw is
in `shared/` (one copy, never two), and a new layout bitmap goes in the folder of the component
that names it. The file name stays the Flash asset name.

An asset name is **not unique**: each client library embeds its own art, so the SWF holds a dozen
`heart_png`, four `camera_png`, three `slider_obj_png`, and the `<id>_` prefix of a `scripts/images`
file is the decompiler's running number over the whole SWF - it names no library and orders nothing
(the `roomui` bitmaps run from 1749 to 2856). Keeping "whichever file readdir yielded last" was
therefore a coin toss between libraries, and it lost seventeen times: the room tools toolbar drew
the 43x44 camera-mode `zoom_in` beside its own 18x18 `zoom_out`. Which file a name means is decided,
never guessed, in this order (`resolveImage` / `pickImage`):

1. **The libraries' own table.** `HabboWindowManagerCom.as` and friends publish each embedded
   bitmap as `public static var roomtools_zoom_in:Class = zoom_in_png$1d108f3d…;` - the right-hand
   side is `<embedded name>$<hash>`, the whole identity. That is the client answering the question,
   so it wins wherever it has an entry.
2. **The size the layout declares.** An unstretched `<static_bitmap width="18" height="18">` is
   drawn at the art's own size, so it picks the candidate whose pixels match.
3. Neither - a 9-slice, a bar the layout stretches, a bitmap no layout names - and the pick really
   is arbitrary: the generator keeps the old one, prints it at the end beside its candidates the
   way it prints missing images, and it needs a `known.LAYOUT_IMAGES_AMBIGUOUS` reason. A wrong
   bitmap fails nothing; it just draws wrong, so the ambiguity has to be visible.

`public/assets/layout-images.json` records the `scripts/images` file behind every bitmap written,
so the pick is auditable rather than trusted, and `layout_images.py` re-derives it from the
libraries and the layouts and holds the shipped bytes to it.

The conversions follow `scripts/binaryData`: after a refresh of the XML, regenerate them with
`yarn workspace @nitrodevco/nitro-react generate-layout-views` and read the diff - it is the list
of what the client changed, and the views written from those layouts are what has to follow.
`layouts.py` compares each registry entry's `xml` hash with the asset it came from, so a
conversion that is a revision behind is drift.

The generator owns its output folder and rewrites it whole: an edit made to a converted layout is
gone on the next run, so a fix belongs in the generator or in the hand-written view. What it does
protect is the art under `public/assets/<component>/`, which holds hand-placed bitmaps beside the
ones it copies (a view names many of them at runtime, out of a table). It prunes only what
`public/assets/layout-images.json` says it wrote - by that file's `<component>/<file>` path - and
leaves a hand-placed file untouched even when an asset of the same name exists in `scripts/images`.

### Wired (`src/wired`, `views/wired-*`)

The port of `com/sulake/habbo/roomevents/**`. A Flash element is a stateful widget tree; here it
is two files:

- `src/wired/elements/<holder>/<Name>.ts` - the **definition** (`WiredElementDefinition<Form>`,
  contract in `src/wired/WiredElement.ts`): `createForm` is `onEditStart`, `readIntParams` /
  `readStringParam` / `readVariableIds` are `read*FromForm`, pure functions of the form. Keep
  Flash's param order, magic numbers and `'n'` (`WIRED_VARIABLE_ID_NONE`) where Flash names it.
- `src/views/wired-setup/elements/<holder>/<Name>View.tsx` - `buildInputs`, drawn with the wired
  kit (`views/wired-setup/kit`, styled by `src/wired/styles`). None for `INPUTS_TYPE_NONE`.
- Register the pair in `<holder>Elements.ts` in Flash's push order. `src/wired` is pure `.ts`
  (barrel `#base/wired`); the `*Elements.ts` files import views and stay out of the barrel.

What a definition cannot compute from the triggerable comes through `WiredElementContext`
(`ctx`): config, localization, permissions, the user's groups, the room's achievements, and
`elementMemory` - the element fields Flash keeps between edits (a grown option list, a captured
figure, the last time zone), written through the definition's `rememberOnEdit` /
`rememberOnRead` into `WiredElementMemorySlice`. Never keep that state in a module variable.

Stores: `context/wired` (`wiredStore`: the setup session, clipboard, variables synchronizer,
environment, preferences, element memory, and the wired menu's slices) and
`context/wired-trading` (chests, contracts, the wired trade, transactions, rewards). Both are
singletons; `resetRoom` clears only what Flash drops with the room. The dialog's controller is
`commands/wiredCommands.ts` (`UserDefinedRoomEventsCtrl`), the menu's `wiredMenuCommands.ts`.

## Packets (`nitro-packets`)

Many generated parsers and composers are empty. To complete one:

1. Copy the body from the same path under `D:\Habbo\packet-tool\out`. Keep the repo's header id;
   never copy `IncomingHeader.ts`, `OutgoingHeader.ts` or the `Get*Packets.ts` maps.
2. Put this comment at the top of the file - it is the marker
   `scripts/sync-generated-packets.ts` uses to leave the file alone on the next sync:
   `// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.`
   The marker goes on with the first hand edit, not at the end: renaming one `param1` is a hand
   edit. 44 composers had real names and no marker, and one `--apply` would have reset them all.
3. Rename generic parameters (`param2`) to what they mean, using the Flash parser or
   `com/sulake/habbo/session/*` for field meanings.
4. Register the class in `GetIncomingPackets.ts` / `GetOutgoingPackets.ts` and both barrels
   (`src/index.ts`, `src/incoming|outgoing/index.ts`, sorted case-insensitively). An
   unregistered packet fails at runtime with "Invalid listener: not registered".
5. Incoming parsers map to typed objects (`{ userId, selectedBadges: IHabboUserBadge[] }`), with
   the interface exported from the message file unless a shared parser already defines it.

A packet class is named after its header (`IncomingHeader.CfhChatlogMessage` ->
`CfhChatlogMessage`), so that a rename in the protocol shows up as a class no header names.
When a header disappears, delete its class, its barrel lines and its registry entry together -
no commented-out registry lines, and no `class_123Composer` leftovers. `scripts/drift/packets.py`
reports classes no header names; a base class other composers extend (`UpdateWiredComposer`) is
the one legitimate exception, and it is listed in `scripts/drift/known.py`. Older classes still
carry an `Event` infix (`AchievementsEventMessage` for `AchievementsMessage`): they are
registered and in use, so rename one only together with everything that imports it.

Bringing packets in from the tool goes through `yarn sync-packets` in `packages/nitro-packets`
(dry by default), never a folder copy. The tool's tree and the repo's have grown apart in ways a
copy gets wrong:

- The tool moves classes between folders (`Wiredtrading/Chests` -> `Vault`, `Data/` -> per-feature
  `Data/`). The repo keeps its own path; a second copy under the new path is a duplicate export.
- A header served by an older class name already has its packet. `FigureSetIdsMessage.ts` sat
  empty in `Catalog/` beside the registered `FigureSetIdsEventMessage` - a shadow stub. Before
  adding a class, look the header up in `Get*Packets.ts`.
- An existing file is only overwritten while it is still an empty stub (`Type = object`). The
  sync lists everything else that differs for a diff by hand; `--force` is for a file you have
  just read both versions of.

### The wire format is the contract

A parser that reads the wrong thing does not fail - it hands back plausible garbage, and every
field after the mistake is wrong too. `scripts/drift/wire.py` reduces each filled-in parser to
the order of its `read*` calls (helpers expanded) and each composer to the number of values it
writes, and compares them with the tool's. Its first run found fourteen packets out of step,
among them `BadgesMessage` (two ints per badge never read), `AuthenticationOKMessage` (a short
array skipped, so `identityId` was the array's length), the messenger's messages (typed content
read as a bare string) and `WiredMovementsMessage` (three of its four item layouts). Rules that
come out of that:

- Finish a packet against the Flash parser, not against an older Nitro or what the server
  happened to send. When the tool and the repo disagree, the Flash parser decides: the tool gives
  up on some loops (`HeightMapUpdateMessage`) and drops helper calls
  (`WithdrawItemsFromChestComposer`), so it is evidence, not the truth.
- What Flash reads and throws away still has to be read. `UserChangeMessage` skipped a list of
  int triples and took the badges rank from the middle of it.
- Flash reads fields that were added to a packet over time only `if (bytesAvailable)`, each with
  its own default. Read them the same way - `AccountPreferencesMessage`'s tail, the chat
  messages' `chatBubbleWidthOverride` - so an older server still parses and a newer one is not cut short.
- A field behind a flag is `readBoolean() ? readInt() : NaN`, never a bare `readInt()`.
- A composer sends every value the Flash constructor puts in its array, defaults included
  (`BuildersClubPlaceRoomItemComposer`'s trailing `false`).
- A difference that is only in the shape of the code, or where the tool is the one that is wrong,
  goes into `WIRE_DIFFERENCES` in `scripts/drift/known.py` with the reason - after reading the
  Flash parser, not instead of it.

A packet with a `TODO` or an `undefined as any` field is a generator's unfinished output: it parses
short and is registered all the same. Fifteen of those sat in the tree unnoticed because nothing
consumed them yet. Replace one with the tool's body (and the `Data/` helpers it imports) or finish
it; `packets.py` now reports any that appear. The tool's output is not lint-clean and carries
ActionScript idioms that compile and do nothing in JS (`(date as any).month`), so after bringing a
body in: run `eslint --fix`, fix what is left by hand, put the marker on, and check whether the
repo already has the helper under another name before keeping the tool's copy
(`RoomSettingsParser` is the tool's `GetGuestRoomResultDataParser`; `wire.py`'s `reads()` will tell
you whether two parsers are the same).

`nitro-api` types that mirror packets (`IUserInfo`, `IRoomUserData`) get optional fields when a
newer packet adds them, with the slice default set alongside.

## Staying in step with the client

A lot of this repo is the Flash client's own data carried over by hand or by generator, and the
client moves on with every revision (`production.version` in `nitro-config.json` names the one
being ported). Data that quietly falls behind does not fail - it renders wrong: the companion
pets stood still because the bundled animation table predated them. After a revision
bump, and before blaming code for something that "almost works", check the data:

```sh
cd scripts/drift && sh run-all.sh     # git-ignored, local; exits 1 and prints DRIFT lines, or "No drift."
```

The checks read the revision from `production.version`, so they follow a bump on their own (and
say so when that client has not been decompiled to `D:\Habbo\<revision>\scripts-deob` yet). A
clean run prints one `ok` line per check. Every deliberate difference is an entry in
`scripts/drift/known.py` with its reason, so a `DRIFT` line is always new: fix it, or - when the
port differs on purpose - add the entry *and* say why in the code it concerns. Do not let findings
accumulate as "known noise"; that is how seventeen missing variable keys went unread.

| What | Source of truth | How it gets here |
|---|---|---|
| `nitro-renderer/src/avatar/data/HabboAvatarAnimations.ts` | `HabboAvatarAnimation_xml` in the SWF | `nitro-renderer/scripts/generate-avatar-animations.ts` - regenerate, never edit. Build input, not shipped code: `export-avatar-gamedata` writes it out as `gamedata/HabboAvatarAnimations.json` for the CDN (see below) |
| `HabboAvatarGeometry.ts`, `HabboAvatarPartSets.ts`, `HabboAvatarFigureDataDefault.ts`, `HabboAvatarBuiltInAnimations.ts` | the matching `_xml` assets | by hand; `run-all.sh` diffs them |
| `HabboAvatarActionsDefault.ts` | the XML literal in `AvatarRenderManager.as` | by hand; diffed |
| `HabboAvatarActions.ts` | `HabboAvatarActions.xml`, which Flash *downloads* - it is not in the SWF | by hand, and cannot be checked offline. Build input, as `HabboAvatarAnimations.ts` is |
| `theme/font/flash-text/habboTextStyles.ts` | `styles_css` in the SWF | `nitro-react/scripts/generate-habbo-text-styles.ts` |
| `nitro-react/src/context/notifications/store/NotificationConfig.ts` | `habbo_notifications_config_xml` and the bitmaps of `HabboNotificationsCom.as` | by hand; `notifications_config.py` diffs styles, view timings and asset names |
| `IncomingHeader.ts` / `OutgoingHeader.ts` and the packet classes | `D:\Habbo\packet-tool\out` | see Packets; `packets.py` checks names, ids and registration, `wire.py` what each packet reads and writes |
| Which incoming packets the client acts on (`handlers/**`, and the window hooks that use `useMessageListener`) | the Flash component that constructs the message id's `*MessageEvent` - `addHabboConnectionMessageEvent(new XMessageEvent(onX))` | by hand; `handlers.py` reports a registered packet nothing subscribes to (naming the Flash class that handles it, so the gap is read as a missing feature), a `known.HANDLERS_UNHANDLED` entry that has gone stale, and a listener on a packet Flash never acts on (`known.HANDLERS_PORT_ONLY`) |
| `nitro-api` enums, constant classes and event classes that mirror a Flash constant class (`RoomObjectVariableEnum`, `RoomWidgetEnum`, `RoomObjectWidgetRequestEvent`, `PetType`, ...), and same-named constant classes in nitro-renderer / nitro-react | the `.as` class - same name, or paired in `known.PAIRED` / `MERGED` (obfuscated or renamed), or by value overlap (`enums.py -v` lists the pairs) | by hand; the *values* must be Flash's strings, typos and case included (`furniture_expirty_timestamp`, `GAME_TOKEN`, `ROWRE__STICKIE`). A nitro-api class that pairs with nothing is drift until `known.ENUMS_UNPAIRED` says why; every `RoomObjectWidgetRequestEvent` member needs a widget or handler case, or a `known.WIDGET_REQUESTS_UNHANDLED` reason |
| `nitro-react/scripts/binaryData/*.bin` (git-ignored; the input of `generate-layout-views.ts`, `extract-skin-assets.ts`, `generate-habbo-text-styles.ts` and of the hand-written views that cite a layout) | `scripts-deob/_assets` of the revision | `binary_data.py` matches on `<asset>$<hash>` and reports stale, removed and new assets; `--fix` refreshes them, `-d` shows the diff. Then regenerate what reads them and re-read the views whose layout changed |
| `nitro-react/scripts/layouts/**` (git-ignored) and `public/assets/<component>/*.png` - the client's `<layout>` assets converted to React, the reference every hand-written view is drawn from | `nitro-react/scripts/binaryData/*_xml$*.bin` | `nitro-react/scripts/generate-layout-views.ts` (`yarn workspace @nitrodevco/nitro-react generate-layout-views`) - regenerate, never edit; `layouts.py` compares each registry entry's `xml` hash with its asset, and `layout_views.py` compares the client's controls with the hand-written views |
| Which `scripts/images` file each shipped layout bitmap is, recorded in `public/assets/layout-images.json` | the client libraries' `public static var <name>:Class = <file>$<hash>;` tables (`HabboWindowManagerCom.as`, ...) and the size each layout declares for the element drawing it | by the generator (see "Widget views from Flash layouts"); `layout_images.py` re-derives the pick and reports a bitmap whose shipped bytes are not the file the client's own table or the declared size names - a name several libraries export different art under and neither settles goes in `known.LAYOUT_IMAGES_AMBIGUOUS` with why the one shipped is kept |
| A port class's constants where the Flash class has them (`AvatarLogic`, `AvatarVisualization`, `AnimationFrame`, `LayerData`), and the tables lifted out of a Flash method (the post-it colours, the dimmer colours, ...) | the `.as` class | by hand, under Flash's names; `constants.py` compares every static const of the paired class (an obfuscated Flash name maps through its `rename`, one the port leaves out needs a `skip` reason) and, for `AvatarLogic`, the timeouts Flash writes as literals |
| `RoomObjectLogicFactory` / `RoomObjectVisualizationFactory` | `RoomObjectFactory.as` / `RoomObjectVisualizationFactory.as` | by hand; a type only Flash builds falls back to the basic class, so list it in the factory's comment or port it |
| The hand-written `views/**` built from a Flash layout - the controls each one draws | `<layout>_xml` of the revision, and the `.as` class that drives the window | by hand; `layout_views.py` records each layout's named controls beside its view in `known.LAYOUT_VIEWS` and reports one the client added, dropped or reordered. A view built from a layout with no row falls behind unnoticed, so add the row with the view; a control the port leaves out on purpose stays in the list and the view's docblock says why (`RoomInfoView` names all four of its own) |
| `nitro-react/src/wired/elements/<holder>/<holder>Codes.ts` (the six `*Codes` classes, whole) and the `<holder>Elements.ts` registration order | `wired_setup/<holder>/<Holder>Codes.as` and `ActionTypes.as` / `TriggerConfs.as` / ... push order | by hand; `wired_tables.py` compares names and values, and the sequence of codes the registered elements answer to |
| Other wired constant tables: the variable FX editor enums, `WiredMenuSlice`'s error codes, `WiredEnvironmentSlice`'s click options, the wired enums of nitro-packets (`QuantifierType`, `WiredVariableTarget`, `TradeRequirementType`, ...) | the (mostly obfuscated) `.as` class named in each docblock | by hand; `wired_tables.py` compares values, and that every obfuscated Flash name is named in the port file |
| `nitro-react/src/wired/styles/*WiredStyle.ts` | `uibuilder/styles/<Name>WiredStyle.as` getters, and the `wired_style_<name>_xml` templates | by hand; `wired_tables.py` diffs the getters only - the templates are not checked (`known.WIRED_STYLE_TEMPLATES_UNCHECKED`) |
| The config flags the port reads, in `public/config/nitro-config.json` | the hotel's `external_variables` (nitro-tools `gamedata/ExternalVariables.json`) and the keys the `.as` files name | by hand; `config_keys.py` reports a key the hotel sets that the config lacks, and a key no Flash class names (Nitro's own go in `known.CONFIG_KEYS_PORT_ONLY`) |
| Class constants mirrored whole outside nitro-api (`AvatarVisualization`, `AnimationFrame`, `LayerData`, the Variable FX tables and paint colours) and module tables copied out of a Flash array or switch (post-it colours, pet/bot placing and friend list error texts, visitor steps, thumbnail `DRAW_ORDER`, `PRODUCT_IMAGES`, dimmer colours, trophy themes, mannequin clothing, ...) | the `.as` class or method named in each docblock | by hand; `constants.py` reads both sides and compares them. A file whose docblock names `drift/constants.py` is left out of `enums.py`; add a table to `constants.py` when you carry a new one |
| `public/assets/chat-styles/<assetId>/chat_definition.json` and its `*.png`; `ChatMarkup.ts` palettes, `ChatConstants.ts` bubble widths | `chatstyles_xml`, every `style_<assetId>_regpoints` and bitmap of `HabboFreeFlowChatCom.as` (read as `ChatStyleLibrary.as` reads them); `ChatMarkup.as`, `ChatBubbleWidth.as` | by hand, bitmaps copied from the SWF images; `chat_styles.py` diffs every style's flags, regpoints keys and pixels, a regpoints key the library starts reading, the palettes and the width mapping |
| The theme's skin tables: every `*_VARIANTS` table under `nitro-react/src/theme`, `theme/utils/windowLayouts.ts`, `theme/utils/iconSetFrames.ts` + `public/assets/images/icon-set.png`, and `TEXT_STYLES` in `theme/utils/textStyles.ts` | the `(type, style)` rows of `habbo_element_description_xml`, the window layouts they name (`HabboWindowManagerCom.as`), `habbo_skin_icon_set_xml` + `habbo_icons_png`, `styles_css` | by hand, art cut from the skin sheets (`scripts/extract-skin-assets.ts`, then `yarn build-asset-bundles`); `theme_skin.py` diffs the style ids per type, button layouts, frame minimum sizes, row tints, icon rects and pixels, and holds every `TEXT_STYLES` entry to `habboTextStyle(habboKey)`. A style left out or added goes in `known.THEME_STYLES_NOT_PORTED` / `THEME_STYLES_PORT_ONLY` |
| The text keys the port asks for (`t('...')`, `'${...}'`) | the embedded `default_localizations` + the hotel's external texts (nitro-tools `gamedata/DefaultLocalizations_en.json`, `ExternalTexts.json`) and the keys Flash's classes and layouts name | `localization_keys.py` reports a key in neither file that no Flash class or layout names |

Rules that come out of that:

- An enum member without a class that builds it is half a port. When a type is added to
  `RoomObjectLogicType` / `RoomObjectVisualizationType`, add its factory case in the same change.
- A deliberate gap is written down where the fallback happens (the logic factory's `default:`),
  not left for the next reader to rediscover.
- Nitro's asset pipeline adds a few values Flash never had (`furniture_isometric_bb`). Those are
  extensions, not drift; leave them.
- Mirror the whole Flash class, not the members the feature at hand needs. A key with no reader
  yet costs nothing, and its absence makes the next port invent a string literal. Take the value
  from the `.as` file, never from memory or an older Nitro: `FurnitureTypeEnum.GameToken` was
  `'game_token'` where the wire says `'GAME_TOKEN'`, and nothing fails until that product arrives.
- Say in the enum's docblock which Flash classes it mirrors. `RoomObjectVariableEnum` folds
  `RoomVariableEnum.as` and a few string literals into one enum; undocumented, the second class
  was never checked and seven of its keys were missing. A new merge or an obfuscated source also
  goes into `MERGED` / `PAIRED` in `known.py`, or the check cannot see it.
- A member Flash does not have and nothing reads (`Swim = 'swm'`) is dead code; delete it.
  One the port does read (a Nitro-only request type such as `RoomObjectWidgetRequestEvent.YOUTUBE`)
  goes into `known.PORT_ONLY` with the reason, and the class docblock says it is Nitro's own.
- An event class's `type` strings are Flash's too, prefix included (`REPSE_`, not a prefix derived
  from the port's class name): nothing fails on a wrong one, but it is a value no Flash reference
  will ever match. When a port class keeps Nitro's name for a Flash event
  (`RoomWidgetUpdateRoomObjectEvent` for `RoomWidgetRoomObjectUpdateEvent`), pair it in `known.PAIRED`.
- A new hand-carried table gets a row above and a check in `scripts/drift` in the same change.
  Data with no check is data that will drift.
- Refresh nitro-tools' gamedata (`yarn start` there, with `--client-swf`) after a revision bump:
  `config_keys.py` and `localization_keys.py` read it, and say so when it is missing.
- **The avatar action and animation tables are served, not compiled in.** `HabboAvatarActions.ts`
  and `HabboAvatarAnimations.ts` are still the repo's source of record - generated from the SWF and
  held to it by the drift checks - but nothing imports them: the barrels do not export them, and
  `useAvatarLoader` fetches `avatar.actions.url` and `avatar.animations.url` the way Flash
  downloaded `HabboAvatarActions.xml`. `AvatarRenderManager.init()` applies the baked-in
  `HabboAvatarActionsDefault` first and the downloaded set goes over it, which is Flash's
  `initActions` then `updateActions`. So after a revision bump the order is: regenerate the `.ts`,
  run the drift check, `yarn workspace @nitrodevco/nitro-renderer export-avatar-gamedata`, and
  upload `packages/nitro-renderer/gamedata/*.json` to the hotel's `/gamedata`. A stale upload does
  not fail - the avatars just animate like the previous revision.
- Theme skin art is cut from the Flash skin bitmap along its skin XML's entities (`habbo_skin_*_xml`
  in `scripts/binaryData`), one image per entity that moves or stretches on its own - the
  `dropmenu` arrow was once baked into its frame, and stretched with it. Rebuild the bundles
  (`yarn build-asset-bundles` in nitro-react) after adding or replacing one.
- An entity marked `colorize="false"` is one `BitmapSkinRenderer.draw` copies *without* the
  window's colour, so it never goes into a sheet the theme tints. Where only some of a layout's
  entities carry the flag, `extract-skin-assets.ts`'s `plainOverlay` cuts them out - `'sheet'` for
  a same-size `-plain` sheet, `'pieces'` for one PNG per entity when the layout moves or centres
  it - and the variant draws them as an untinted `overlay` (`ThemeWithStatesVariant.overlays`);
  `exclude` does the same for a *colorizing* entity a nine-slice cannot carry. Where **every**
  entity carries it the skin is simply never tinted: the variant says `colorize: false`
  (`ThemeBase`, honoured by `useThemeVariant`), and a `tintColor` a call site passes is dropped
  too - that is what stopped the wired dialog's `_frame.color = style.frameColor` from darkening
  the light frame Flash leaves alone. `theme_skin.py` holds every row with untintable entities to
  one of those two shapes and reads the pixels back to prove it.
- An entity's `<scale>` says how the client *re-places* it, not only how it resizes: only `strech`
  and `tiled` resize, while `move` follows the right/bottom edge and `center` sits in the middle of
  the **rendered** window. A sheet is one size, so a `center` entity cut at its layout rect is
  wrong everywhere - the segmented picker's side gradient landed on its rounded bottom corner and
  squared it off, in the face's own colour, so it looked right until the picker tinted the selected
  segment. The extractor now throws on that: either `exclude` it and let the theme centre the piece
  (`CompositePiece`'s `alignSelf`), or `centeredInSheet` to keep it in the sheet centred for the
  sheet's own size. Check a skin change against the client **with a tint applied** - an untinted
  screenshot hides every tint-dependent defect, which is how this one survived a screenshot that
  passed.
- "No drift." only covers what the checks look at. When asked to look for drift, run the suite
  and then ask what it cannot see - that is where the wire format findings came from, in a tree
  the suite had just passed. A blind spot that is found becomes a check, not a one-off fix.

## Verifying

- Typecheck and lint are necessary, not sufficient. For UI, load it: the dev server is
  `yarn dev` on port 3000, and packets can be replayed against the client without a server by
  delivering them through the socket layer. Look at the result before reporting it works.
- When a bubble or widget never appears, check first that the room dispatches
  `RoomRenderedEvent` each tick and that the packet it waits for is registered.
- After renaming or moving files, a running Vite dev server can keep stale import URLs for the
  files that import them and the page loads blank with "Failed to fetch dynamically imported
  module". Restart the dev server (or touch the importers) before treating that as a bug.
- Say what was verified and how, what was not, and what depends on a subsystem that does not
  exist yet (trading, profile, group info, messenger conversations, report/help).
