# Refactoring backlog

Refactors worth doing in `nitro-react`, from an October 2026 review of the package against
[Client code conventions](client-conventions.md), [Layout views](layout-views.md) and
[Porting gotchas](porting-gotchas.md). Paths are under `packages/nitro-react/src` unless they name
another package. Give a new item its evidence, the change and its size (S, M, L), and re-check the
evidence before work starts. When an item lands, move it to Done as the rule it set, or drop it if
it set none; git history keeps the details.

## Open

- **Packet callbacks in commands** (a decision). 30 command files export `on*` callbacks that
  handlers call; other features keep that logic in the handler. Document the pattern or apply one
  placement.
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

Left as they are, on purpose:

- `useChatAvatarHead`'s cache: a bounded LRU (64) of head-only, chat-direction renders that the
  theme's per-mount texture does not keep across bubbles.
- `TableView` highlights: each `TextCell` fades on its own timer, as Flash's cells do, and only a
  highlighted cell runs one.
- The wired variable-picker block: identical only in `HasVariable` and `RemoveVariable`.
