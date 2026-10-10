# Porting gotchas

Traps that cost a retry, each hit at least once. Read this before building a view; add to it when
a new one costs you time. Rules with a longer story live in the other guides in `docs/`; this is the short list.

## Theme

- **`display: 'none'` does not hide a theme `Icon`** - it drops the icon's position and draws it at
  the parent's corner. Render it conditionally (`{cond && <Icon ... />}`).
- **A leaf placed by insets alone stays 1x1** (`left: 0, right: 0, height: 1` on a `ColorLayer`
  draws one pixel, not a line). State the length too - `width: '100%'` - as `FillLayout` does.
  `TextInput`'s `border` drew four corner dots in every window that used it until this was fixed.
- **`Box` lays out in a row by default.** A bubble with an arrow under it needs
  `flexDirection: 'column'`.
- **Check the component's props before adding diagnostic labels.** Named-control browser
  diagnostics require matching UI instrumentation; optional tooling may not be in your branch.
- **A Flash `TextFieldManager` hint is real text**, in the field's normal colour, cleared on focus -
  not a grey `placeholder`. See `NavigatorRoomCreateView`'s name and description fields.
- **Config booleans go through `useConfigValue<boolean>(key) === true`**, and the key must be in
  `nitro-config.json`: a missing key is silently `false`.
- **A table lifted out of a Flash method** lives in `context/<feature>/store/`, not in the view
  file (fast refresh fails lint), and gets a `scripts/drift/constants.py` entry.
- **A template id is its bundle's key, and the libraries name them differently**: some keep the
  asset's `_xml` suffix (`habbo-friend-bar-com/bonus_rare_promo_xml`), others drop it
  (`habbo-groups-com/group`). A wrong id draws nothing and logs nothing - check the library's keys.
- **`Util.disableSection` is the `disableSection` binding**, on the window the AS3 passes it: it
  disables everything inside and halves the leaves' blend as Flash does (buttons are only disabled).
  Do not fade by hand with `alpha` as well. A button the code holds down (`state |= 0x10`) is `pressed`.
- **A `Frame` opens at its layout's position**: pass `defaultPosition` from the layout's root
  container (the messenger's is (120, 120)); without it the window opens in the top-left corner.
- **Check the available scrolling API.** `scrollResetKey` resets to the start. Chat auto-scroll
  belongs with the messenger implementation; do not assume a separate WIP branch's props exist.

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

- **Use Turbo for development.** Connect to its configured WebSocket endpoint with a Turbo-issued
  SSO ticket. Validate packet fields against AS3 and Turbo code before changing a parser to fit
  unexpected data. Fix missing server behavior in Turbo and verify the real receive path.
- Synthetic packet replay can isolate a client parser or handler, but cannot establish that the
  server emits the correct packet or that the full interaction works.

## Tooling

Local Jev and `live-check` helpers are optional; confirm availability before using these commands.

- **Asset changes need a bundle rebuild.** If the builder or source resources are unavailable,
  obtain the prerequisites before claiming the change works. Do not add a URL fallback for bundled
  assets to work around a missing local tool. See [development setup](development.md).
- **Windows:** Python text mode writes CRLF (`newline=''`); global `yarn` may be v1 (`corepack
  yarn`, or `node scripts/...`); Git Bash heredocs break on backticks and `${}` - write a script
  file, or edit with the editor tools.
- **`jev.mjs invented` on a shared file** (a `register*Handlers.ts`) reads the other listeners as
  invention: pass `file:from-to` for your part.
- **`live-check inject <Packet> '[values]'`** delivers a server packet through the real parser and
  listeners (`__nitroInject`, dev builds). Use it to isolate client handling; also verify the corresponding
  real Turbo exchange.
- **Tests that load modules in a `vm`**: arrays and objects from the sandbox are another realm, so
  `deepEqual` fails on identical values - spread them (`[ ...items ]`) before comparing.
- **Find controls by name, not by screenshot**: `live-check find <name>`, `click --name`,
  `wait-for --name`, `state <store> <field>`. A screenshot is for how it looks, not where it is.

## Room camera and display transforms

Source revision: `WIN63-202609091217-117204808`. Recheck after a revision change.

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
  In the installed Pixi reconciler used during this investigation, `useEffectEvent` failed at
  runtime despite typechecking; verify runtime support before adopting it.
- **Dimensions have different meanings.** AS3 `RoomSpriteCanvas.width/height` include `_scale`;
  Nitro exposes unscaled dimensions. `RoomEngine.updateRoomCamera` saves full canvas dimensions
  before shrinking its tracking rectangle. Carry units through comparisons and normalization.
- **A forced flip inverts both axes.** `RoomSpriteCanvas.setTransform` keeps positive logical
  scale and uses signed display scale for rendering, culling and inverse mouse coordinates.
  Normalize negative bounding extents; preserve the flip during zoom. Object anchors/bounds and
  the camera pause/reset must agree with that same transform.

These are reference findings, not a statement that every local branch contains the fixes.
