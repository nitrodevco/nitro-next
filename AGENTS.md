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
  `avatarEditorStore`. Read in React with `useXStore(x => x.field)`, one field per call - never
  select an object literal. Outside React use `xStore.getState()`.
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
- The listener parameter is `data`, in parentheses. A single call may be an expression body;
  anything else is a block.
- The handler that consumes an answer is the one that sends the request
  (`on(UserObjectMessage, () => send(new GetIgnoredUsersComposer({})))`).
- Register the file in `handlers/registerHandlers.ts` (the barrel is generated). Only a handler
  whose store is created with a window registers from that window, with `useRegisterHandlers`.
- Something that is not a packet listener (a store subscription bridging into the renderer)
  still returns its unsubscribe and is named for what it does, not `*Handlers`.
- No React in `handlers/`. If a listener needs a value React owns, the value belongs in a store.

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

- Pixi text goes through `ThemeText` with a `textStyle` key; tooltips through `Region`.
  `Frame` needs an explicit `layout.height`, or its content is clipped. A `CheckBox` and its
  label are siblings in a row `Box`, not nested.
- Compare enums with `Number(a) === Number(b)` or against the enum constant; string enums and
  numeric packet fields do not line up otherwise.
- Never destroy a Pixi texture before React has committed the element that replaces it.
- Config flags (`useConfigValue('infostand.motto.change.enabled')`) gate features the way the
  Flash `getBoolean(...)` calls did; default to what Flash defaulted to.

### Widget views from Flash layouts

`packages/nitro-react/scripts/layouts/` holds the Flash window layouts already converted to React.
Read the generated layout for geometry and text styles, then write the view by hand under
`views/`, keeping the numbers and dropping the scaffolding (lorem-ipsum defaults, per-element
`visible*` props, one-file-per-region). Bitmaps come from `scripts/images/` into
`public/assets/images/layouts/<name>.png`, referenced with `LayoutImage(...)`.

## Packets (`nitro-packets`)

Many generated parsers and composers are empty. To complete one:

1. Copy the body from the same path under `D:\Habbo\packet-tool\out`. Keep the repo's header id;
   never copy `IncomingHeader.ts`, `OutgoingHeader.ts` or the `Get*Packets.ts` maps.
2. Put this comment at the top of the file - it is the marker
   `scripts/sync-generated-packets.ts` uses to leave the file alone on the next sync:
   `// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.`
3. Rename generic parameters (`param2`) to what they mean, using the Flash parser or
   `com/sulake/habbo/session/*` for field meanings.
4. Register the class in `GetIncomingPackets.ts` / `GetOutgoingPackets.ts` and both barrels
   (`src/index.ts`, `src/incoming|outgoing/index.ts`, sorted case-insensitively). An
   unregistered packet fails at runtime with "Invalid listener: not registered".
5. Incoming parsers map to typed objects (`{ userId, selectedBadges: IHabboUserBadge[] }`), with
   the interface exported from the message file unless a shared parser already defines it.

`nitro-api` types that mirror packets (`IUserInfo`, `IRoomUserData`) get optional fields when a
newer packet adds them, with the slice default set alongside.

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
