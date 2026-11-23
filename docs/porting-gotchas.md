# Porting gotchas

Traps that have each cost a retry. Read this before building a view; add to it when a new one
costs you time. Rules with a longer story live in the other guides in `docs/`.

## Theme

- **`display: 'none'` does not hide a theme `Icon`** - it drops the icon's position and draws it at
  the parent's corner. Render it conditionally (`{cond && <Icon ... />}`).
- **Insets alone do not size a leaf**: one without a texture stays 1x1 (`left: 0, right: 0,
  height: 1` on a `ColorLayer` draws one pixel, not a line; `TextInput`'s `border` once drew four
  corner dots), and a textured one keeps its texture's size. State the length too -
  `width: '100%'` - as `FillLayout` does; see [Client conventions](client-conventions.md).
- **`Box` lays out in a row by default.** A bubble with an arrow under it needs
  `flexDirection: 'column'`.
- **Check the component's props before adding diagnostic labels.** Named-control browser
  diagnostics need matching UI instrumentation, which may not be in your branch.
- **A Flash `TextFieldManager` hint is real text**, in the field's normal colour, cleared on focus -
  not a grey `placeholder`. See `NavigatorRoomCreateView`'s name and description fields.
- **Config booleans go through `useConfigValue<boolean>(key) === true`**, and the key must be in
  `nitro-config.json` under Flash's name - see the config section of
  [Client conventions](client-conventions.md).
- **A table lifted out of a Flash method** lives in `context/<feature>/store/`, not in the view
  file (fast refresh lint warns, and the gates allow no new warnings), and gets a
  `scripts/drift/constants.py` entry.
- **A template id is its bundle's key, and the libraries name them differently**: some keep the
  asset's `_xml` suffix (`habbo-friend-bar-com/bonus_rare_promo_xml`), others drop it
  (`habbo-groups-com/group`). A wrong id draws nothing and logs nothing - check the library's keys.
- **`Util.disableSection` is the `disableSection` binding**, on the window the AS3 passes it: it
  disables everything inside and halves the leaves' blend as Flash does (buttons are only disabled).
  Do not fade by hand with `alpha` as well. A button the code holds down (`state |= 0x10`) is `pressed`.
- **A skin that vanishes until another window opens** is a `NaN`-sized nine-slice or tiling sprite:
  `@pixi/layout` scales them by `computed / bounds`, so one laid out at 0 once never recovers.
  `guardLayoutViewSizes` (theme `utils/layoutViewSizeGuard.ts`) prevents it; dump `getWindowLayer()`
  sizes before suspecting the art.
- **A `Frame` opens at its layout's position**: pass `defaultPosition` from the layout's root
  container (the messenger's is (120, 120)), or the window opens in the top-left corner.
- **Check the available scrolling API.** `scrollResetKey` resets to the start. Chat auto-scroll
  belongs with the messenger implementation; do not assume a WIP branch's props exist.
- **A dragged window leaves its box.** A window that drags itself without a frame
  (`draggable_with_mouse` on a container: the trophy, stickie, ecotron card, external image,
  camera, quest tracker) moves inside whatever `Box` the view placed it with. That box's hit area
  prunes the window wherever it is dragged out of it: the part outside draws but takes no press,
  which goes to the room, and the window cannot be grabbed there again. A box that only places such
  a window, and every box between it and the desktop, is `pointerTransparent`
  (`FurnitureTemplatePanel`, `CameraView`). A frame is not affected: it moves onto the desktop.
  A window Flash docks in an item list is the list's: the list puts it back on its axis after each
  move and clips it to the list (`arrangedIn` binding, and a clipping slot - `QuestTrackerView`).
  Development builds warn on the first drag of a window that is cut off (`findDragCutOff`, theme
  `drag/dragCutOff.ts`).
- **Pixel art goes on whole pixels.** `@pixi/layout` centres a sprite in its box by its
  `objectPosition` unrounded, so an odd difference puts it on a half pixel, and `roundPixels` then
  rounds its two edges apart: some GPUs drop or double a column of the bitmap, a different one
  wherever the window is dragged (the trophy's title lost a column of its "p"). Flash floors such
  offsets - `TextSkinRenderer.draw` puts a field at `Math.floor(width / 2 - field.width / 2)`, a
  centred window goes at `Math.floor(parent / 2) - Math.floor(size / 2)` - and so does the port
  where it places one: `FlashText` floors its sprite's offset (`placeOnWholePixels`).

## Reference material

- **Reference revisions can differ.** Check constants, counts and gating against the AS3 revision
  named by `production.version`, even when another reference is easier to read.
- **The decompiler writes some integers in hex** (`new RoomLayout(2, 0x0200, "w")` is 512). A regex
  over AS3 numbers takes `-?(?:0x[0-9a-fA-F]+|\d+)`.
- **The AS3 often has a legacy and a new path.** The legacy navigator asks `CanCreateRoom` first;
  the new one opens the window directly. The brief's "Who reaches it" section shows both; port the
  one the shipped UI reaches.
- **A port comment about Flash is a claim, not a fact.** Re-check one in the AS3 before building on
  it (the `hasVip` comment was right; others have not been).

## Servers

- **Packet replay is not a server check.** Injecting a message isolates a client parser or
  handler; it does not show that Turbo sends it. See [Nitro and Turbo development](turbo-development.md).

## Tooling

Local Jev and `live-check` helpers are optional; confirm availability before using these commands.

- **Asset changes need a bundle rebuild.** If the builder or source resources are unavailable,
  obtain them before claiming the change works; do not add a URL fallback for bundled assets to
  work around a missing local tool. See [Asset bundles](asset-bundles.md).
- **Windows:** Python text mode writes CRLF (`newline=''`); global `yarn` may be v1 (`corepack
  yarn`, or `node scripts/...`); Git Bash heredocs break on backticks and `${}` - write a script
  file, or edit with the editor tools.
- **`jev.mjs invented` on a shared file** (a `register*Handlers.ts`) reads the other listeners as
  invention: pass `file:from-to` for your part.
- **`live-check inject <Packet> '[values]'`** delivers a server packet through the real parser
  and listeners. The client has no injection hook of its own; without `live-check`, write the frame
  to the socket as [Server gaps](server-gaps.md#checking-a-client-feature-without-the-server)
  describes.
- **Tests that load modules in a `vm`**: arrays and objects from the sandbox are another realm, so
  `deepEqual` fails on identical values - spread them (`[ ...items ]`) before comparing.
- **Find controls by name, not by screenshot**: `live-check find <name>`, `click --name`,
  `wait-for --name`, `state <store> <field>`. A screenshot is for how it looks, not where it is.

## Room camera and display transforms

Source revision: `WIN63-202609091217-117204808`; recheck after a revision change. The names below
are Flash's; the port's camera is nitro-react's `useRoomCamera` over nitro-renderer's
`RoomSpriteCanvas.setTransform`.

- **Read branch getters.** `RoomEngine.useOffsetScrolling` returns literal `true`; the alternative
  geometry-scrolling branch is unreachable in this revision. By contrast, special room effect 2
  dispatches a forced zoom event and reaches canvas flipping. Trace both producer and consumer.
- **Camera following runs only at display scale 1 and while upright.**
  `RoomEngine.updateRoomCamera` returns for `canvas.scale != 1` or `isFlipped`. Check zoom 0,
  zoom 2 and the return to 1, not just a stationary overview. `RoomCamera.update` uses divisor 12;
  do not invent a configurable speed override.
- **Following needs initialization and current state.** `RoomEngine.setOwnUserId` assigns the
  camera target; `RoomCamera.targetObjectLoc` copies coordinates. A retained mutable vector hides
  later movement. A React ticker must see the latest committed callback after identity arrives.
  `useEffectEvent` typechecked but failed at runtime in the Pixi reconciler installed at the time;
  verify runtime support before adopting it.
- **Dimensions have different meanings.** AS3 `RoomSpriteCanvas.width/height` include `_scale`;
  Nitro exposes unscaled dimensions. `RoomEngine.updateRoomCamera` saves full canvas dimensions
  before shrinking its tracking rectangle. Carry units through comparisons and normalization.
- **A forced flip inverts both axes.** `RoomSpriteCanvas.setTransform` keeps positive logical
  scale and uses signed display scale for rendering, culling and inverse mouse coordinates.
  Normalize negative bounding extents; preserve the flip during zoom. Object anchors/bounds and
  the camera pause/reset must agree with that same transform.

These are reference findings, not a statement that every local branch contains the fixes.
