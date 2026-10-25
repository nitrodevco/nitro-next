# Refactoring backlog

Refactors worth doing in `nitro-react`, from a review of the package against
[Client code conventions](client-conventions.md), [Layout views](layout-views.md) and
[Porting gotchas](porting-gotchas.md) (October 2026). Paths are under `packages/nitro-react/src`
unless they name another package. Each item gives the evidence, the change and its size
(S, M, L); the order within a section is the suggested order.

Items marked **verified** were confirmed by reading the code; the rest come from the review's
file and line evidence and should be re-checked before work starts. Update an item's status when
it lands, and remove it once it is done and nothing points at it.

## Refactors that fix bugs

### 1. Handler refs updated in passive effects

`hooks/room/useRoomEventDispatcher.ts` keeps the caller's handler in a ref that a passive effect
(`useEffect`) updates. A room frame, ticker tick or Pixi event that arrives between a commit and
its passive effects calls the previous render's handler - a bubble placed over the previous
object, an overlay drawn with the previous alpha. **Verified.**

The same pattern is in `hooks/catalog/useCatalogWidgetEvent.ts`,
`hooks/room/chat/useChatInputContentRequest.ts`, `hooks/room/images/useRoomEngineTexture.ts`,
`hooks/room/useRoomFloorPlanDrawing.ts`, nitro-theme's `hooks/useLayoutEvent.ts`, and in about
fifteen components and views (`ChatFlowProvider`, `ChatHistoryTray`, `HintArrowView`,
`NotificationsView`, `TableView`, `QuestProgressBar`, `NavigatorRoomInfoPopup`,
`FurniturePresentOpenedWidget`, `CatalogItemGridWidgetView`, `CatalogRoomAdsWidgetView`,
`usePetNamePurchase`, `ToolbarSoundSettingsView`, `WiredRoomLogsView`, `RoomChatInputView`).

Change: one `useLatest(value)` hook in nitro-theme that writes its ref in a layout effect, used at
every site. M. **Done:** nitro-theme's `hooks/useLatest.ts`, used at every site above and at the
ones that had already moved to a layout effect by hand (`RoomCanvas`, `RoomEventHandler`,
`ScaledRoomOverlay`, `useRoomObjectBubblePlacement`, `useRoomPreviewer`, ...). Write a ref as
`useLatest(value)`, not `useRef` plus an effect.

### 2. One hook for placing things over room objects

`components/room/overlay/ScaledRoomOverlay.tsx` and `hooks/room/useRoomObjectBubblePlacement.ts`
each place a node on `RoomRenderedEvent`, place it again on the node's `layout` event, hide it
until placed and size it from its computed layout. Change: one `useRoomFramePlacement(nodeRef,
place)` both use. Do it after item 1. M. **Done:** `hooks/room/useRoomFramePlacement.ts` (with
`getLayoutSize`); the bubble keeps its sampling and smoothing, the overlay its scaling and drag.

### 3. Room object values read during render

`hooks/room/useRoomUserData.ts` reads the carried item, effect, posture and stand-up flag from
`roomObject.model` while rendering; `hooks/room/useRoomFurnitureData.ts` and
`hooks/room/useRoomObjectName.ts` do the same for furni. Nothing re-renders the component when the
model changes, and the React Compiler keeps the values cached across unrelated renders, so the
avatar menu can show a hand item that was dropped. **Verified.**

Change: read them from the store the packet handlers write, or subscribe with
`useSyncExternalStore` to the room's object updates as `useRoomIsInitialized` does. M. **Done**
for `useRoomUserData` and `useRoomFurnitureData`: `hooks/room/useRoomObjectModelVersion.ts` checks
the model's update counter each room frame, and the reads take that version. Confirmed live: the
infostand's hand item row now follows the model. `useRoomObjectName` reads only the type id, which
does not change, and is left as it is.

### 4. One window pointer-drag hook

Eight drag loops add their own `window` listeners: `WiredSlider`, `ToolbarSoundSettingsView`,
`FurnitureStackHeightView`, `useFurnitureSlider`, `useFloorPlanSliderDrag`, `CameraPhotoLabView`,
`ChatHistoryTray` (two) and `ScaledRoomOverlay`. Only `useFurnitureSlider` handles
`pointercancel`, checks `pointerId` and converts to stage space. `ScaledRoomOverlay` and
`ChatHistoryTray` remove their listeners only on pointer up, so unmounting mid-drag leaks them
(**verified** for `ScaledRoomOverlay`). `CameraPhotoLabView`'s effect has no dependency list and
re-subscribes on every move.

Change: `useWindowPointerDrag({ onMove, onEnd })` owning listeners, cleanup, cancel and pointer id,
with optional local-space conversion; a slider-knob hook on top for the four sliders. M. **Done:**
`hooks/useWindowPointerDrag.ts` (`tools/window-pointer-drag.test.mjs`), used by all eight and by a
ninth the review missed, `useRoomFloorPlanDrawing`. Local-space conversion stays with
`useFurnitureSlider`, its only user. The slider-knob hook is `hooks/useSliderKnobDrag.ts`
(`tools/slider-knob-drag.test.mjs`), used by `WiredSlider`, `ToolbarSoundSettingsView` and
`FurnitureStackHeightView`; the floor plan bars pick by absolute place, not a knob, so they keep
`useFloorPlanSliderDrag`. Seen while checking: the
chat history pulled past its top does not spring back - before this change as after it.

### 5. Group forum state kept twice

`commands/groups/groupForumCommands.ts` holds fourteen module-level variables; `forumsList`,
`forumData` and `threadsList` duplicate `groupStore.forumView` and every handler writes both. A
store reset does not clear the module copy. `goToGroupForumMessage` sets `goToMessageIndex`, but
its reader `takeGroupForumGoTo` has no caller, so a `groupforum/<group>/<thread>/<index>` link
opens the page and never goes to the message. **Verified.**

Change: `forumView` as the only copy, the request bookkeeping in `GroupForumSlice`, and the go-to
read where the thread opens. M. **Done:** the controller's fields are `GroupForumSlice.forumSession`
(`patchForumSession`), so the store's reset clears them; `GroupForumView` takes the go-to once per
arriving page and scrolls as `scrollToSpecificElement(index, true)` does. Checked live (October
2026): a `groupforum/<g>/<t>/34` link sends `GetForumStats`, `GetThread` and `GetMessages`, and with
a 40-message thread fed to the handlers (the development hotel has no forum) the view opens page
2/2 at message 34 and clears the go-to. `arrange` in `GroupForumView` patched the group store
with the window's width while `TemplateView` rendered, which React warned about on the forum's first
open; it now keeps the width in a ref that a layout effect writes, and `setGroupForumWindowRect`
writes nothing when the rect is unchanged. Not checked live (Turbo was down): open a forum and look
for the warning.

### 6. Chat bubble positions in a flipped room

`components/room/widgets/chat/ChatFlowProvider.tsx` (`getUserScreenLocation`) projects a room
location with `canvas.scale`; `Room.getRoomObjectScreenLocation` uses the negative scale when the
canvas is flipped, as does `VariableLeaderboardLocationProjector`. **Verified.** Change: one
shared projection, checked in a flipped room. S. **Done:** `chat/chatScreenPoint.ts`, Flash's
`HabboFreeFlowChat.getScreenPointFromRoomLocation` with the flip (`tools/chat-screen-point.test.mjs`).
The leaderboard projector stays its own: it ports WIN63's `VariableLeaderboardLocationProjector`,
which measures differently and already flips. Checked live: after `:flip` a new bubble sits over
the avatar's flipped screen location.

### 7. Wired source types resolved at `createForm`, which Flash does not do

The review assumed Flash saves the picker's first option for a saved source type the picker does
not offer, and that 15 elements lacked that resolution. The AS3 says the opposite: Flash saves the
raw value unchanged - see [Wired](wired.md#a-source-type-the-picker-does-not-offer). The same holds
for every `hasCustomTypePicker` element (ChangeVariable, GiveVariable, RemoveVariable, PlaceFurni,
ProgressAchievement, ProgressRewardTrack, GiveFromChest, InitiateTransaction, CustomContract,
JumpStrength, Projectile, SelectorFilter, VariableFilter, VariablePlaceholder; the leaderboard addon
is newer than the AS3 here, but its merged type is always global, so the case cannot arise).

So the places the port resolves the form are the unfaithful ones:

- `resolveConditionMergedTypes` (`wired/elements/condition/conditionShared.ts`) in HasVariable,
  VariableAge, VariableValue and ChestHasAmount;
- `resolveVariableReferenceTarget` (`wired/elements/action/ActionVariableReference.ts`), used at
  `createForm` by PlaceFurni, ProgressAchievement, ProgressRewardTrack, CustomContract, JumpStrength,
  Projectile, SelectorFilter, VariableFilter and VariablePlaceholder;
- selector `WithVariable` (`resolveSourceTypeSelection` in its `createForm`); trigger
  `VariableUpdate` resolves too and needs its own check.

Change: keep the raw target in every form, remove those resolutions, and leave the fallback to the
pickers' display (`WiredSourceTypePicker`, `WiredNewSourceTypePicker`, which already show the first
option). Fix the docblocks that state the wrong rule (`sourceTypeColors.ts`, `conditionShared.ts`,
`ActionVariableReference.ts`, `WiredVariableSections.ts`). Saving such a box then sends what the
server sent. S-M. **Done:** `resolveConditionMergedTypes` and `resolveVariableReferenceTarget` are
gone and every form keeps the saved target (`tools/wired-unoffered-source-type.test.mjs`, which
fails on the old forms); `resolveSourceTypeSelection` is the pickers' display only. `VariableUpdate`
keeps its resolution: its target is not saved, only retargets the variable picker, and an
unoffered one leaves Flash's selector - and so the picker - on the first option. Not checked live
(Turbo was down).

### 8. Boolean configuration read five ways

`configReader().configBoolean` follows Flash's `getBoolean` ("1"/"true"); 17 sites compare
`config[key] === true` (`catalogCommands`, `dailyTasksCommands`, `raidProtectionCommands`,
`getWiredPermissions`, `bridgeOfferCenter`, `registerInventoryTradingHandlers`, ...), and
`groupCommands`, `avatarEditorCommands` and `catalogRecyclerCommands` have their own readers. A
value copied from the hotel's external variables as text reads false at every `=== true` site.
Change: `configBoolean(key)` and `configString(key)` over the system store, used everywhere. S-M.
**Done:** `configBoolean` / `configString` (`context/system/configValues.ts`) outside React and
`useConfigBoolean` (`context/system/selectors`) in components, both Flash's `getBoolean` with a
fallback only for an unset key; every `config[key] === true` and the 108
`useConfigValue<boolean>(key) === true` / `?? x` reads in views go through them, and the private
readers in `groupCommands` and `avatarEditorCommands` are gone. (`catalogRecyclerCommands`' reader
is for numbers.) Read a flag with these, never `=== true`.

## Convention drift

### 9. Moderation outside the store, action and command structure

`context/moderation` has no action hooks and there is no
`commands/moderation/moderationCommands.ts`; the moderation views call `getState()` 22 times and
send 28 packets directly, and two import `moderationIssueSends` from `handlers/moderation`.
**Verified** (`getState` count). Change: `useModerationActions`, `useModerationIssueActions` and a
moderation commands file. The local drift tool's exemption saying moderation is not ported is
stale. M. **Done:** `commands/moderation/moderationCommands.ts` holds every request and action the views sent (and `moderationIssueSends`, moved from the
handlers); the views use `useModerationActions` / `useModerationIssueActions` / `useWindowActions`,
with no `getState()` or `send(new …)` left. The drift exemption is removed. Checked live without a
moderator account: with a client-side `ModeratorInit`, the room tool, chatlogs, user info and room
visits send their requests, and user info, mod action and the issue browser open; Turbo's answers
need a moderator account.

### 10. Packets sent from views

79 `send(new …Composer)` calls across 31 view files, against "send packets through commands";
outside moderation the largest are `AvatarEditor`, `NavigatorView` and
`InfoBubbleOwnAvatarView`. Move them as those views are touched. M, incremental. **Done:** no view
under `views/` constructs a composer; the sends are commands in their features' files (and a new
`roomFurnitureCommands.ts`), with the same packets in the same order. Room widget components keep
their direct sends, as the conventions allow. Spot-checked live: navigator search and room entry,
the own avatar menu's dance, the avatar editor's save.

### 11. Other store-access deviations

- `commands/room/cameraCommands.ts` defines `cameraStore` and `useCameraStore` outside `context/`. S.
- `getState()` in views: `CustomUserNotificationView`, `VariableLeaderboardWidget`,
  `VariableLeaderboardAddonView`, `RoomObjectMenuPet`; actions selected from a store in
  `ModActionView`, `ModRoomToolView`, `ModSendMessageView`, `VariableLeaderboardAddonView`,
  `CustomUserNotificationWidget`. S.
- `roomStore.getState().room` where `getRoom()` is the convention: `helpCommands`,
  `questCommands`, `raidProtectionCommands`, `roomThumbnailCameraCommands`, `roomUserCommands`,
  `registerHelpHandlers`, `registerAvatarEffectsHandlers`. S.
- `handlers/wired/registerWiredVariableLeaderboardHandlers.ts` keeps `send` in a module variable
  and exports user commands a widget imports from `#base/handlers`. S.

**Done:** `context/camera` holds the camera store, with actions for what its commands wrote with
`setState`. The views' store reads moved to commands (`openCostumes`, `openPetRevivalOffer`, the
leaderboard location edit's `updateLeaderboardLocationEdit` / `endLeaderboardLocationEdit` /
`dragLeaderboardLocation`), and their actions come from actions hooks. `getRoom()` at every site.
The leaderboard's subscription, variable and page commands are in
`commands/wired/wiredVariableLeaderboardCommands.ts`, taking `send` like other commands.

### 12. Navigator store and copies of the current room

`context/navigator/store/NavigatorStore.ts` (515 lines) covers about eight concerns without slices.
The current room's id and owner are also kept in `groupStore`, `moderationStore`, `roomStore` and a
closure in `registerRoomDirectoryHandlers`. Change: slices; derive the room's identity where the
copies' timing agrees with Flash's. M-L. **Done:** eight slices (search, window, categories,
current room, room visits, room entry, room event, room settings) behind the same `NavigatorStore`
type. The groups copy went: `HabboGroupsManager._roomId` is set and kept as `NavigatorData`'s
id is, so `onGuildCreated` reads the navigator's. The others stay, as their timings differ in
Flash too: moderation's `currentFlatId` is reset on leaving, `roomStore` and the room directory's
id follow the room engine's session. Found on the way: the navigator never ran `onRoomExit` or
`onRoomEnter`'s reset of the entered room's info; it does now
(`tools/navigator-current-room.test.mjs`). Checked live: leaving keeps the room id and drops the
owner flag and the entered room's info; entering again fills them.

## Duplication and size

- **Room cameras.** `RoomThumbnailCameraWidget` and `StarterRoomCameraWidget` are near copies, and
  neither uses `collectRoomPhotoData` (`commands/room/cameraCommands.ts`). A `useRoomViewfinder` hook;
  the starter camera's UI moved to a view. S-M. **Done:** `components/room/useRoomViewfinder.ts` (the texture, its
  per-frame redraw and unfit check, and `collect` over `collectRoomPhotoData`); the starter
  camera's window is `views/room-widgets/starter-room-camera/StarterRoomCameraView.tsx`. Checked
  live: the thumbnail camera captures and Turbo saves it; the starter camera shows the room and
  closes on zoom out (its capture needs a staff account in a starter room).
- **Second clocks.** Seven views run their own one-second `setInterval` clock (`QuestsView`,
  `DailyTasksView`, `useAvatarEditorEffects`, `ModIssueHandlerView`, `ModIssueBrowserView`,
  `RoomEffectsView`, `VariableLeaderboardWidget`) beside `hooks/useSecondsClock.ts`. An epoch
  variant of it. S. **Done:** `hooks/useClock.ts` - an epoch or monotonic clock at each
  view's own period (500 ms to 30 s, as before), one shared interval per period, and paused for a
  view that ran its clock only while shown.
- **Pet images.** The pet figure string is built in `usePetImageTexture`, `useCollectiblePetTexture`,
  `useChatPetFace` and nitro-renderer's `Room.getRoomObjectPetImageArgs` (and in Nitro Studio). One
  exported builder in nitro-renderer. Directions differ by unit (degrees, eighths), not by mistake. S.
  **Done** in the client: nitro-renderer's `petImageValue` (`tools/pet-image-value.test.mjs`). Nitro
  Studio's copy (`preview/engine/chat.ts`) can use it too - that is the Studio repository's change.
- **Image caches.** `useChatAvatarHead` keeps its own avatar cache beside nitro-theme's
  `useAvatarImageTexture` and renders inside `getSnapshot`; `useChatPetFace` and
  `usePartThumbnail` repeat the same retained-texture structure. M. **Left:** the chat head cache is
  a bounded LRU (64) of head-only, chat-direction renders that the theme's per-mount texture does not
  keep across bubbles; merging them would trade that reuse for one hook.
- **Small helpers already in nitro-theme.** Hex colour (`OnboardingView`, `OnboardingWidgets`,
  `FurnitureDimmerWidget`, `CatalogGuildSelectorWidgetView`), clamp (`VariableFxState`,
  `VariableFxPreviewStatus`), two digits (`CountdownWidget`, `InfostandPetView`); three furni-name
  lookups with different fallbacks. S. **Done:** they use `toCssHexColor`, `clamp` (re-exported as
  `utils/clamp`) and `twoDigits`. Left as they are: the dimmer's colour text is upper case, so not the
  same helper; the furni-name lookups' fallbacks are their Flash classes' own (`FurniChooserWidgetHandler`
  starts from the object's type, the infostand from nothing).
- **Large files.** `RoomChatInputView` (completion, NUX reminder, flood countdown, placement hooks),
  `CatalogProductViewWidgetView` (avatar pose, preview population, zoom easing - its effect reads
  `zoomProgress` only as the start value, by design; its tick now stops on arrival), `AvatarEditor` (NFT handling, save flow),
  `commands/collectibles/collectiblesCommands.ts` (split along its section banners; its slices only expose
  generic `patch*` actions). M each. **Done:** hooks beside each view (`useChatInputCompletion`,
  `useChatNuxReminder`, `useChatFloodCountdown`, `useChatInputPlacement`; `useProductPreview`,
  `useProductPreviewAvatarPose`, `useProductPreviewZoom`; `useAvatarEditorNfts`,
  `useAvatarEditorSave`) and nine `collectibles*Commands.ts` modules, one per section, every export
  kept. The collectibles slices' generic `patch*` actions are unchanged. Checked live: chat
  completion, the flood countdown, the product preview's clothing, zoom and pose, the avatar editor's
  save. Not checked: the NUX reminder, NFT outfits, the collectibles windows.
- **Wired boilerplate.** 34 definitions are only `{ holder, code, createForm: () => ({}) }`, and the
  variable-picker merged-section block repeats across definitions. A helper for each. S. **Done:**
  `noInputElement(holder, code)` (`WiredElement.ts`) for the 26 that are exactly that; each keeps
  its file and Flash docblock, as `docs/wired.md` has one file per element class. The picker block is
  identical only in `HasVariable` and `RemoveVariable` - the others vary in title, custom sources or
  `setMergedType` - so it is left.
- **Template numbers in code.** `AvatarEditor` (`CONTENT_HEIGHT`, `SIDE_CONTAINER_X`) and
  `ToolbarView` (`BAR_HEIGHT`, `ITEMS_X`) copy values the loaded layout holds; read them with
  `findTemplateChild` as `RoomChatInputView` does. S. **Done:** both read from their loaded layouts
  (`bottom_bar_left`'s height and `toolbar_items`' x; `AvatarEditorContent`'s height and
  `sideContainer`'s x); the editor's frame waits for its content's layout. Checked live: the
  toolbar and editor land on the old constants' sizes.
- **TableView highlights.** Each `TextCell` runs its own 16 ms interval for its highlight; one shared
  ticker. S. **Left:** Flash's `TableView` cells each fade on their own timer too, and only a
  highlighted cell runs one; the cost is re-renders while it fades, not the timers.
- **Chat definitions for Nitro Studio.** `chat/ChatStyleDefinitions.ts`, `chat/ChatConstants.ts` and
  the bubble layout depend only on nitro-api and are copied into Nitro Studio; moving them down a
  package retires those copies. M. **Done** in the client: `ChatStyleDefinitions`, `ChatConstants`,
  `ChatMarkup`, `ChatTabLayout` and `ChatBubbleText` are nitro-theme's `src/chat`
  (`@nitrodevco/nitro-theme/chat`), which Nitro Studio already depends on. Studio's own copies
  (`src/lib/chatBubble.ts`, `src/lib/flashText.ts`, `src/preview/engine/chat.ts`) can import them
  instead - that is the Studio repository's change.
- **`type Send`** is redeclared in 67 files; export it once from `context/communication`. S. **Done:**
  `Send` (`context/communication/WebSocketContext.ts`), in all 78 files that spelled it out.

## Decisions to make

- **Unused action hooks.** 26 `use*Actions` hooks have no importer; the conventions ask for one per
  slice and the dead-code check exempts them. Keep them for command-driven features, or relax the
  rule. **Done:** relaxed - a slice has an action hook only where a component calls its actions,
  as commands and handlers read them with `getState()`. The 26 are deleted (badge leaderboard,
  collectibles, daily tasks, earnings, game tokens, help, offer center, quests, reward track, four
  catalogue slices, the recycler, the room chooser, user social and ten wired slices), and the
  dead-code check no longer exempts action hooks.
- **Packet callbacks in commands.** 30 command files export `on*` callbacks that handlers call;
  other features keep that logic in the handler. Document the pattern or apply one placement.

## Done

- Item 1, handler refs (`useLatest`).
- Item 2, one room-frame placement hook (`useRoomFramePlacement`).
- Item 3, room object values read during render (`useRoomObjectModelVersion`).
- Item 4, window pointer drags (`useWindowPointerDrag`).
- Item 5, group forum state in the store, and the link's go-to scroll.
- Item 6, chat bubble positions in a flipped room.
- Item 7, forms keep a saved source type their picker does not offer, as Flash does.
- Item 8, boolean configuration read as Flash does (`configBoolean`, `useConfigBoolean`).
- Item 9, moderation through actions hooks and `moderationCommands`.
- Item 10, views send packets only through commands.
- Item 11, the camera store in `context`, store reads out of views, `getRoom()`, leaderboard commands.
- Item 12, navigator store slices; the groups copy of the room id derived.
- Unused action hooks deleted; a slice has one only where a component calls its actions.
