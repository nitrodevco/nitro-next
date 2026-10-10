# Client code conventions

Read the relevant sections when changing `packages/nitro-react` code. Paths below are relative
to that package. These conventions also apply when reviewing the affected code. For Nitro Studio
UI, follow that application's own conventions; the client's Pixi-only rule does not apply to it.

```
src/
  commands/     Plain functions that send packets and write stores - `<feature>Commands.ts`.
  context/      Zustand stores, one feature per directory.
  handlers/     Incoming packet listeners, registered once per connection.
  hooks/        React hooks. `hooks/room` is the room engine's event side.
  components/   Wiring: mounts, permissions, callbacks; renders a view.
  views/        Presentation, one window or widget per directory.
  theme/        The Pixi UI kit (Frame, Box, Button, ThemeText, ...). Do not add feature code here.
                Everything renders through Pixi - there is no DOM render target, and no component
                has a DOM twin. React DOM mounts one thing: the canvas `PixiApplicationRoot` owns.
  chat/         Chat bubble models.
  utils/        Pure helpers.
```

Every `index.ts` under `context/<feature>`, `hooks`, `handlers`, `commands`, `components`, `utils`
and `chat` is generated: run `node scripts/generate-barrels.ts` (`yarn generate-barrels`) from `packages/nitro-react` after adding,
moving or deleting a file there, and never edit one by hand. `theme/index.ts` is curated by hand
and `views/` has no barrels - views are imported by path.

### Every file

- `.ts` unless the file contains JSX. Selector hooks, action hooks, stores, commands and most
  hooks are `.ts`.
- A docblock at the top saying what the module is and, for a port, which Flash class it
  ports. A reader should not need to open a second file to learn what the first one is for.
- No `eslint-disable`. The two that exist each carry a reason; do not add a third
  without one, and prefer restructuring.
- No `TODO`. Do the thing, or say in the docblock what is missing and why, so the gap is
  documented rather than deferred.
- No copy-paste stubs and no dead code: a file nothing imports, or a slice that duplicates
  another under a different name, is deleted, not kept for later. `scripts/drift/dead_code.py`
  reports a module nothing imports and a registered window nothing opens.

Lint enforces the style: 4-space indent, single quotes, `[ a, b ]` array spacing, trailing commas
on multiline, `simple-import-sort` with `#base/*` as its own group. Run `eslint --fix` for the
mechanical fixes rather than hand-formatting.

The React Compiler is on. Never add `eslint-disable react-hooks/*`. When a rule fires, restructure:
no impure calls at render time (`performance.now()`, `Math.random()`, `new Date()` - use
`useSyncExternalStore` or a hook such as `useSecondsClock`), no `setState` synchronously inside an
effect to "sync" props (adjust during render instead, as `RoomBotSkillConfigurationWidget` does with
`loadedFor`), no reading `.current` during render.

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
  `scripts/drift/store_access.py` reports an action selected from a store and a `getState()` in a
  view or component.

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
a view. Sub-views of a window (`FriendListFace`, `AvatarEditorWardrobe`) carry the window's name as
a prefix. Nothing carries a `Pixi` or `Dom` suffix: the client renders with Pixi only, and a name
like `BoxPixi` used to mean it had a DOM twin. `Pixi` in a name is the library
(`PixiApplicationRoot`, `usePixiTexture`, the `Container as PixiContainer` alias), never a target.

- Text goes through `ThemeText` with a `textStyle` key (see [text rendering](text.md)); tooltips through `Region`.
  `Frame` needs an explicit `layout.height`, or its content is clipped. A `CheckBox` and its
  label are siblings in a row `Box`, not nested.
- A pointer only reaches a child inside its parent's laid-out box: the event boundary prunes
  children outside a container's `hitArea`. A list, menu or sub menu that reaches past the thing
  that opened it - or past a window, which clips its content anyway - is a `FloatingPopup` (the
  window layer, whole-area hit testing, `onOutsideClick`), placed with `getGlobalRect(anchor)`.
  An absolutely positioned child of a small box draws but answers only where it overlaps the box.
- A passive `Box` is still a hit *target*: `EventBoundary.hitTestFn` reports a hit for any
  container carrying a `hitArea`, and the mode it tests is the one inherited from the nearest
  interactive ancestor, not the container's own. So a box that covers a sibling swallows that
  sibling's presses - a frame's `_CONTENT` lying over the header stopped the avatar editor being
  dragged. A window Flash never makes a mouse target (no `input_event_processor`; it builds its
  candidates with `groupParameterFilteredChildrenUnderPoint`) is `pointerTransparent`, which drops
  the `hitArea` and lets the press through to what is drawn beneath.
- **Every window clips its children.** `WindowModel._clipping` is `true` and `WindowController`
  extends it, so the default is on; `WindowRenderer` intersects each child against the parent's
  rectangle and clamps a negative offset to 0. Across the client's layouts `clipping="false"` is
  written 162 times - always on a feature's own container, never on a frame's content area. Do not
  read `WindowParser`'s `param1.clipping !== true`, which is the serialiser's "omit the default"
  test, as the runtime default: that mistake moved every frame's content and had to be undone.
- **Yoga resolves an edge by specificity, not by order**: `Left` beats `Horizontal` beats `All`,
  and `@pixi/layout`'s `applyStyle` just walks the style object calling one setter per key. So
  `{ ...config.layout, ...layout }` does not let a caller's `padding: 0` clear a variant's
  `paddingLeft: 8` - both reach Yoga and the longhand wins. Merge through `expandSides`, which
  expands the `padding` / `margin` / `inset` shorthands first so the later layer simply wins.
- **Insets alone do not size a leaf.** `@pixi/layout` defaults a leaf's size to `intrinsic` - its
  texture's own - so `left/top/right/bottom` on a `BackgroundLayer`, a nine-slice or the clipping
  `Graphics` leaves it at the sheet's size wherever the box is: a bubble drew a small blob of skin
  in its corner, and a 1x1 mask hid a whole frame. Put the insets on a plain container and let the
  art fill it (`FillLayout`), or state the size.
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
  (Nitro Studio's `gamedata/ExternalVariables.json`). A missing one is silently Flash's default -
  that is how `wired.menu.enabled` kept the wired menu off in the user's own room. `getBoolean`
  defaults to false, so a fallback is `=== true`, not `?? true`. `config_keys.py` checks all of it.
