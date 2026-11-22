# Refactoring backlog

Refactors worth doing in `nitro-react`, from an October 2026 review of the package against
[Client code conventions](client-conventions.md), [Layout views](layout-views.md) and
[Porting gotchas](porting-gotchas.md). Paths are under `packages/nitro-react/src` unless they name
another package. Give a new item its evidence, the change and its size (S, M, L), and re-check the
evidence before work starts. When an item lands, move it to Done as the rule it set, or drop it if
it set none; git history keeps the details.

## Open

- **Packet callbacks in commands** (a decision, then M). 44 command files export 122 `on*`
  functions (30 files in October); 107 are called from handlers, and other features keep that
  logic in the handler. The same prefix also names UI entry points a view calls
  (`onTradingAcceptPressed`, `onGamesToolbarClick`, `onCatalogPageLink`). Suggested: move the
  packet callbacks to the handler side and keep `commands/` for what the UI calls, renamed off
  `on*`; or document the pattern. Count again before starting:
  `grep -rlE '^export const on[A-Z]' commands`.
- **The client module runtime** (M). `commands/client-modules` holds 18 modules, most of them a
  runtime rather than commands: the loader (`clientModuleLoader`), the API object
  (`createClientModuleApi`, `ClientModuleApi`), the plugin message codec, HTTP, libraries, the
  event bus. `theme/` carries the extension side of templates (`templatePatches.ts`, 820 lines,
  `themeLive`, `themeSession`, `dataWindows`), against "no feature code in `theme/`". Move the
  runtime to its own `src/client-modules/` as `chat/`, `sound/` and `preview/` are, and leave in
  `commands/` only functions that send packets and write stores.
- **nitro-theme's template monoliths** (M, `packages/nitro-theme/src/template`).
  `TemplateView.tsx` is 2,261 lines, of which `ElementContent` is 452 and `ownFaceOf` 404: split
  the faces by element type. `templateLayout.ts` is 1,995 lines holding about ten Flash window
  classes (`LayoutWindow` 531, `ListWindow`, `GridWindow`, `ScrollableWindow`, `BoxSizerWindow`,
  ...): one file per class, as nitro-renderer keeps its ports.
- **Nitro Studio's copies** (the Studio repository's change). Its pet figure builder
  (`preview/engine/chat.ts`) can use nitro-renderer's `petImageValue`, and its chat copies
  (`src/lib/chatBubble.ts`, `src/lib/flashText.ts`, `src/preview/engine/chat.ts`) can import
  `@nitrodevco/nitro-theme/chat`.
- **Not checked live** after their refactors: the group forum (open one and look for React's
  warning about a store write during render), wired forms keeping a saved source type their picker
  does not offer, the chat NUX reminder, NFT outfits and the collectibles windows.

## Done

Rules finished refactors set that [Client code conventions](client-conventions.md) does not state:

- Write a ref to the latest handler or value as nitro-theme's `useLatest(value)`, which writes it
  in a layout effect, not `useRef` plus an effect - a room frame, ticker tick or Pixi event between
  a commit and its passive effects would call the previous render's handler.
- Place a node over a room object with `hooks/room/useRoomFramePlacement.ts`, as
  `ScaledRoomOverlay` and `useRoomObjectBubblePlacement` do.
- A hook that reads `roomObject.model` while rendering takes
  `hooks/room/useRoomObjectModelVersion.ts`'s version, or nothing re-renders it when the model
  changes and the React Compiler keeps the stale value (the avatar menu showed a dropped hand item).
- A drag that listens on `window` uses `hooks/useWindowPointerDrag.ts` (listeners, cleanup,
  `pointercancel`, pointer id), and a slider knob `hooks/useSliderKnobDrag.ts`; the floor plan bars
  pick by absolute place, not a knob, so they keep `useFloorPlanSliderDrag`.
- Feature state lives in a store slice, not module variables, so the store's reset clears it (the
  group forum controller's fields are `GroupForumSlice.forumSession`).
- Project a chat location with `chat/chatScreenPoint.ts` (Flash's
  `HabboFreeFlowChat.getScreenPointFromRoomLocation`, with the flip).
  `VariableLeaderboardLocationProjector` stays its own: it ports WIN63's projector, which measures
  differently and already flips.
- Wired forms keep a saved source type their picker does not offer, as Flash does - see
  [Wired](wired.md#a-source-type-the-picker-does-not-offer).
- The groups copy of the current room id is derived. The other copies (moderation's
  `currentFlatId`, `roomStore`, the room directory's id) stay, as their timings differ in Flash too.
- A view's clock is `hooks/useClock.ts` (epoch or monotonic, one shared interval per period, paused
  for a view that runs it only while shown), not its own `setInterval`.
- The pet figure string comes from nitro-renderer's `petImageValue`; its callers' directions differ
  by unit (degrees, eighths), not by mistake.
- Hex colour, clamp and two-digit text use nitro-theme's `toCssHexColor`, `clamp` (re-exported as
  `utils/clamp`) and `twoDigits`. The dimmer's colour text is upper case, so not that helper, and
  each furni-name lookup keeps its Flash class's fallback (`FurniChooserWidgetHandler` starts from
  the object's type, the infostand from nothing).
- The room cameras share `components/room/useRoomViewfinder.ts`.
- A wired element with no input is `noInputElement(holder, code)` (`WiredElement.ts`), still one
  file per element class.
- Read a number the loaded layout holds with `findTemplateChild`, not a constant (`AvatarEditor`,
  `ToolbarView`).
- A large view keeps its logic in hooks beside it (`useChatInputCompletion`, `useProductPreview`,
  `useAvatarEditorSave`, ...); the collectibles commands are nine `collectibles*Commands.ts`, one
  per section.
- The chat definitions (`ChatStyleDefinitions`, `ChatConstants`, `ChatMarkup`, `ChatTabLayout`,
  `ChatBubbleText`) are nitro-theme's `src/chat`.
- `Send` is exported once, from `context/communication/WebSocketContext.ts`.
- The checks that read only the source - `tools/store-access.mjs`, `tools/dead-code.mjs` and
  `generate-barrels.ts --check` - are committed and run in CI's `conventions` job, so a merged
  branch cannot bring back what they report; the drift checks that need Habbo's client stay local.
- The preview host's logic is `src/preview/` and its views `views/preview`: a view fills the
  stores with samples through `preview/designSamples.ts` and takes actions from the action hooks.
- A tools test loads the repository's TypeScript through `tools/load-source.mjs` (esbuild):
  `loadModule` for one module and its stubs, `createLoader` for a module and the real sources it
  imports. A test of a module that needs no stubs lives in its package's `test/` and imports it
  (nitro-renderer and nitro-packets have one now). `yarn test` runs the packages' tests, Nitro
  Studio's aside, then the tools tests, and CI runs `yarn test`. Nine tools tests keep a loader of
  their own: lazily built stubs, methods lifted out of a class, a source rewritten before it runs.
- nitro-react's tests are typechecked by its `typecheck` script (and CI) through
  `test/tsconfig.json`: `composite` off, so the sources they import need no listing, and `node`
  types beside `vite/client`, which the app's own program leaves out.

Left as they are, on purpose:

- `useChatAvatarHead`'s cache: a bounded LRU (64) of head-only, chat-direction renders that the
  theme's per-mount texture does not keep across bubbles.
- `TableView` highlights: each `TextCell` fades on its own timer, as Flash's cells do, and only a
  highlighted cell runs one.
- The wired variable-picker block: identical only in `HasVariable` and `RemoveVariable`.
