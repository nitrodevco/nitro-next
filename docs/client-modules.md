# Client modules

A Turbo plugin can ship JavaScript that runs inside the client: a **client module**. It is how a
hotel adds windows, toolbar icons and overlays of its own without a fork of the client. Turbo's
`docs/client-modules.md` owns the server side (how a plugin declares a module and where its files
are served); this page is the client's.

## The exchange

The client asks for the `client.modules` extension (version 1) with the others after the user
object (`registerUserInfoHandlers`). A Turbo server that accepts it sends
`TurboClientModulesMessage` (header **30009**): `int count`, then per module `string key` (the
plugin's), `string url`, `string version`, `string sha256` (hex, `''` = unchecked). It is the whole
set every time - right after the capability answer, and again whenever a plugin adds, removes or
reloads one. The set is taken only once the extension is accepted
(`handlers/client-modules/registerClientModuleHandlers.ts`); a server that declines it stops what ran.

## Loading (`commands/client-modules/clientModuleLoader.ts`)

- The URL is resolved against the page and must be `http(s)`. A module on another origin than the
  client's is refused unless its origin (`https://cdn.example.com`) or host (`cdn.example.com:8443`)
  is in the configuration value `client.modules.hosts` (a list, or one comma-separated text). The
  page's query cannot set it: a link that also names another `socket.url` would otherwise let any
  server run code in the hotel's page.
- A module that is refused or throws in `activate` is a console warning that names what to change
  (for the host check: the origin to add to `client.modules.hosts`), and is reported to a Turbo
  server (`commands/client-modules/clientExtensionReports.ts`), which logs it naming the setting and
  lists it on the plugin's page in the admin panel.
- With a SHA-256 the file is fetched, hashed with `crypto.subtle` and run from those very bytes
  through a `blob:` URL, so what runs is what was checked. A mismatch refuses it. Such a module must
  be **one file**: a relative `import` inside it has nothing to resolve against. Files beside it are
  found with `new URL('icon.png', api.baseUrl)`, not `import.meta.url`.
- The module's default export (or its named exports) has `activate(api)` and optionally
  `deactivate()`. A module whose version, URL or hash changes is deactivated and the new one
  activated; one the server no longer names is deactivated.
- A module that fails to load or throws in `activate` is left out and logged; the others run.
  Refusals are `NitroLogger.warn` lines under `ClientModules`.

## Shared libraries

A module must not bundle React: a second copy cannot draw into the client's tree. The client
hands its own over, as `api.libs` and as the global `NitroClientModuleHost` (set before the first
module is imported, so a bundled module can bind them at its top level):

| `libs.` | What |
| --- | --- |
| `react`, `reactJsxRuntime` | The client's React (`createElement`, hooks) and its JSX runtime |
| `theme` | `#base/theme`: `Frame`, `TemplateWindow`, `Box`, `Region`, `ThemeText`, `RichText`, `Button`, ... |
| `zustand.useStore` | To read a store in a component |
| `stores.user` / `room` / `system` | The app-wide stores. **Deprecated since 1.1**: their shape is the client's own and changes between releases; read `api.state` and `api.events` instead |

A module built with a bundler (the SDK's preset below) maps `react`, `react/jsx-runtime` and the theme to small shims that
re-export from `globalThis.NitroClientModuleHost`, and marks nothing else external. Pixi's elements
need no import: the client registers them, and a module names them as JSX intrinsics
(`pixiGraphics`, `pixiContainer`).

## Writing a module with the SDK (`packages/client-module-sdk`)

`@nitrodevco/client-module-sdk` is what a module is written against: the API's types, a few helpers
and the bundler preset. A module is TypeScript and JSX with ordinary imports; the build gives one file
that uses the client's own React and theme.

```tsx
import { assetUrl, defineModule, useApi, type ClientModuleWindowProps } from '@nitrodevco/client-module-sdk';
import { Button, Frame, ThemeText } from '@nitrodevco/client-module-sdk/theme';
import { useState } from 'react';

const Counter = ({ close }: ClientModuleWindowProps) => {
    const api = useApi();
    const [ clicks, setClicks ] = useState(0);

    return (
        <Frame id={`${api.key}-counter`} variant="3" caption={api.texts.get('counter.title', 'Counter')} centered onClose={close} layout={{ width: 200, height: 100 }}>
            <ThemeText text={String(clicks)} textStyle="u_regular" />
            <Button variant="101" onPointerTap={() => setClicks(clicks + 1)}>+1</Button>
        </Frame>
    );
};

export default defineModule({
    activate(api) {
        api.windows.register('counter', Counter);
        api.toolbar.add({ id: 'counter', icon: assetUrl('icon.png'), onClick: () => api.windows.toggle('counter') });
    },
});
```

| Import | What |
| --- | --- |
| `defineModule({ activate, deactivate? })` | The module's default export, typed |
| `useApi()` | The API the module was activated with, from any component or helper |
| `assetUrl(path)` | A file beside the module in its plugin's `wwwroot/` (`new URL(path, api.baseUrl)`) |
| `defineChannel<T>(key)`, `useChannel(channel)` | `api.channels` for one key, typed with what is published on it (`publish`, `subscribe`, `get`), and its value in a component, drawn again when it changes |
| `type ClientModuleApi`, `ClientModuleWindowProps`, ... | The API's types (`src/api.d.ts`) |
| `type ClientModuleMessageOf<typeof schema>` | A plugin message's data, typed from its schema written `as const` (`ClientModuleMessageSchema`, the JSON `client.messages` sends) |
| `@nitrodevco/client-module-sdk/theme` | `Box`, `Button`, `Frame`, `Region`, `RichText`, `ThemeText`, `TemplateWindow`: the client's own, read from `NitroClientModuleHost` as the module loads; their props typed with what a module passes (`src/theme-types.d.ts`) |
| `@nitrodevco/client-module-sdk/build` | `clientModuleBuildOptions({ entry, outfile, minify? })` for esbuild, and `clientModuleHostPlugin()` |

The build preset bundles everything into the one file except `react`, `react/jsx-runtime` and
`zustand`, which resolve to the client's (`NitroClientModuleHost`) when the module runs, so there is
no second React.

```js
import * as esbuild from 'esbuild';
import { clientModuleBuildOptions } from '@nitrodevco/client-module-sdk/build';

await esbuild.build(clientModuleBuildOptions({ entry: 'client/src/index.tsx', outfile: 'dist/counter/wwwroot/counter.js' }));
```

Turbo's `dotnet new turbo-plugin` template (turbo-cloud `templates/turbo-plugin`) sets all of this
up with the server half and one `npm run dev`. The SDK is not on npm yet: a plugin names this
folder (`"file:<nitro-next>/packages/client-module-sdk"`).

**Keeping it true.** The SDK's types are written for module authors, without the client's
internals, so a module builds outside this repository. `commands/client-modules/clientModuleSdk.check.ts`
compares them with `ClientModuleApi.ts` part by part in both directions, and checks that each
template patch field, binding and theme prop the SDK types is one the client takes: a member added
to or changed in the API fails `npx tsc -p packages/nitro-react/tsconfig.typecheck.json` until the SDK has it too.
`yarn workspace @nitrodevco/client-module-sdk test` bundles a module with the preset and runs it on
a stand-in host.

## The API (version 1.2, `commands/client-modules/ClientModuleApi.ts`)

`api.version` is 1 and `api.minor` 2: version 1.1 added `state`, `events`, `contextMenu` and
`chatCommands`, 1.2 `channels` and `links.handle`'s `path`, without changing a member of 1. A
plain-JavaScript module that may meet an older client reads `api.minor ?? 0` (or `api.state?.`,
`api.channels?.`); one typed with the SDK is built against 1.2.

| Part | What |
| --- | --- |
| `state.get()`, `state.subscribe(listener)`, `state.use(selector)`, `state.hasPermission(node, level?)` | The own user (`id`, `name`, `figure`, `gender`, `motto`, `securityLevel`, `isAmbassador`), their `club` (`level` 0/1/2, `days`, `periods`), `currencies` (`credits`, `points` by activity point type) and the `room` they are in (`id`, `name`, `ownRoomIndex`, `isOwner`, `controllerLevel`; `undefined` outside a room), read-only (`commands/client-modules/clientModuleState.ts`). A part keeps its identity until a field in it changes, so `use(x => x.user)` in a component draws again only then; select a part or a value, never a new object. `hasPermission` is the client gates' rule: the node when the server sent permission nodes (Turbo's `permission.nodes`), else `securityLevel >= level` when a level is named, else no |
| `events.on(name, handler)` | `room.entered` / `room.left` (`{ roomId }`, as the room session starts and ends), `room.avatar.added` / `removed` / `clicked` (`{ roomIndex, userId, kind, name, figure, isOwnUser }`, `kind` `user`, `pet`, `bot` or `rentable_bot`), `room.furni.added` / `removed` / `clicked` (`{ id, kind: 'floor' \| 'wall', type }`, `type` the furni class name) and `room.chat` (`{ roomIndex, speaker, text, kind: 'talk' \| 'shout' \| 'whisper', styleId }`) from the moment the handler is added (`clientModuleEvents.ts`): from the room store, the room's own object events (`RoomEngineObjectEvent` `ADDED` / `REMOVED` / `SELECTED`) and the bubbles the room shows. Nothing listens until a module does |
| `contextMenu.add({ id, menu, label, icon?, when?, onClick })` | A button in a room menu, after the client's rows: `user` (another user's avatar menu), `ownUser` (the own avatar's) or `furni` (the furni infostand's button row). The button is a row of the menu's own template, added as the module's template patch - a copy of one of its plain rows, named `<key>:<id>` (the inspector and `templates.report` list it), hidden in the layout and shown by the menu while `when(target)` passes (asked each time the menu is drawn). `icon` (an image URL) is drawn at the row's right in the avatar menus, where Habbo's ducket row has its icon; the infostand's buttons have none. `onClick(target)` gets the avatar or furni, as the events name them. The avatar menus list them on their main page only |
| `chatCommands.register({ name, aliases?, description, parameters?, run })` | A `:name` command run in the client. The chat input offers it with the client's own and the server's (`parameters`: `{ name, optional?, type? }`, `type` `word`, `number`, `user` - the room's users offered - or `rest`). A line it matches (its first word, any case, an alias too) is not said: `run({ args, text })` runs, and returning `false` lets the line go on to the server as typed. The client's own commands (`:furni`, `:chooser`, the wired ones) run first, so a module cannot take them; a module's runs before the line reaches a server command of the same name |
| `windows.register(id, Component, { onTop? })`, `open(id, params?)`, `close(id)`, `toggle(id)` | A window drawn in the window layer while open; the component gets `params` and `close` and draws its own `Frame` or `TemplateWindow`. `onTop` keeps it above every other window (a HUD, a timer), under the toolbar's menus, popups and modal dialogs |
| `toolbar.add({ id, icon, tooltip?, onClick })` | An icon after the bottom bar's divider while it is expanded; the bar and the chat area make room for it |
| `meMenu.add({ id, caption, onClick })`, `meMenu.toggle()` | A me menu entry: a clone of `profile` with its own caption, before the spacer; `toggle` opens or closes the me menu, as Habbo's `toolbar/memenu` link does |
| `links.handle(prefix, fn, { path? })`, `links.open(link)` | In-client links `<prefix>/...` the client has no route of its own for. With `path` (`'news/*'`: the parts after the prefix, `*` any one part) only links whose parts begin with it. A link goes to the handlers of the most specific path that matches (the most parts, a named part before `*`), and only when none does to every handler of the whole prefix (`clientModuleLinkRoutes.ts`). Two modules on one prefix and path both get its links: a conflict, warned as it is made and listed by the extension inspector (alt-click) - give each module a path of its own |
| `channels.publish(key, value)`, `channels.subscribe(key, handler)`, `channels.get(key)` | Data modules share by key instead of encoding it in a link (`clientModuleChannels.ts`). `publish` hands the value to the key's subscribers and keeps it as the key's value; `subscribe` gets each value from then on and, at once, the one kept - so a module loaded after the publisher still gets it - as `handler(value, from)`, `from` the publishing module's key. When a module stops its subscriptions go and each value it left is cleared: its subscribers get `undefined`. Values are passed as they are (publish plain data, a new object for a change); a handler that throws is logged and the others still run. Typed in the SDK with `defineChannel<T>(key)` |
| `packets.registerParser(header, parse, listener)`, `registerComposer(header)`, `send(header, ...values)` | Extension packets at 20000-32767 outside Turbo's 30000-30099, never over a header the client already has; values are ints, strings and booleans |
| `messages.on(name, handler)`, `messages.send(name, data)` | The plugin's named messages (Turbo's `client.messages`, `docs/plugin-messages.md` there): read into an object of the fields the server's schema names, and written from one, so a module never sees a header. `on` for a name the server has not listed warns once (the handler is kept: a plugin loading sends its module before its list); `send` for one warns and sends nothing. A field the schema lacks is ignored and a missing one sent as its default (0, '', false, []), each logged once per name. Optional (`api.messages?.`): clients before it have none |
| `http.get(path, query?)`, `http.post(path, body?)`, `put`, `patch`, `delete` | The module's own plugin's web routes, `/api/plugins/<key>/<path>` on the hotel's public web host (Turbo's `docs/plugin-web-routes.md`), signed in as the player: the client asks the server for a token over `web.session` (30011 / 30012), sends it as `Authorization: Bearer`, keeps it until it nearly runs out and asks again once on a 401; the module never sees it. Resolves `{ ok, status, data, error }` (never throws for an HTTP error; `status` 0 when the hotel serves no routes or the path would leave the plugin's own) |
| `config.get(key)`, `texts.get(key, fallback?, replacements?)` | The hotel's configuration and texts |
| `sounds.play(id)` | A sample of the client's sound manager |
| `room.avatarOverlay(render)`, `room.leave()` | `render({ roomIndex, userId, name, isOwnUser })` is drawn above each user's head every frame, under the windows; `leave` quits the room for the hotel view, as the toolbar's hotel view icon does |
| `hotelView.addLayer(component, { replacesBackground })` | `component({ width, height })` is drawn in the reception at its size while it is shown, with its moving objects: over the background art, under the widgets, the hotel top and the left backdrop. Later layers are drawn over earlier ones. With `replacesBackground` the layer is the backdrop: the reception's own background bitmaps are hidden while it is added |
| `hotelView.addWidget(slot, component)` | `component({ slot, width })` is drawn in a reception widget slot (`landing.view.dynamic.slot.<n>`: 1 across the top, 2 and 4 the left column, 3 and 5 the right, 6 the bottom slot) in place of the hotel's configured widget while it is added, laid out as the slot's widget: the slot takes the size the component draws at, and its row and the gaps follow (`HotelViewWidgetGrid`). `width` is the slot's pane (`landing.view.dynamic.leftPaneWidth` for 1, 2, 4 and 6, `rightPaneWidth` for 3 and 5). The last widget added for a slot is drawn; a slot out of 1-6 is refused with a warning. A plugin that decides its widgets on the server sends them in a named message and the module adds one per slot |
| `notifications.registerLayout(name, { template, height })`, `notifications.add(name, text, { image?, link?, stay?, timeDisplay?, id? })` | A bubble in the client's notification stack drawn from a template of the bundles. `stay` keeps it up (no time out, a click does not dismiss it), `timeDisplay` is how long (ms) another stays, an `id` is not added twice while up; `add` returns the function that takes it down |
| `notifications.setIllustration(resolve)` | The picture of every simple alert and notification popup, open or yet to open: `resolve({ kind, caption, message, illustration })` is shown each (`kind` `alert` or `popup`, `illustration` an asset name or URL, `undefined` for none) and answers another, or `undefined` to leave it; hooks run in the order they were set. The dialogs themselves are never rewritten, so taking the hook out puts the client's picture back |
| `templates.patch(id, ops, { order? })`, `templates.bind(id, element, binding)`, `templates.report(id)` | Changes a core window's template as data and binds what the elements it added do; patches from every plugin apply together, in order, with conflicts and misses reported (`docs/template-patches.md`) |

Links a module's own toolbar or settings view can open (`links.open`), the actions the stock widgets use: `room/zoom` (one-click
zoom of the current room, while `zoom.enabled`), `room/like` (rate the current room, when it may be rated),
`settings/sound/save`, `settings/sound/preview/<ui>/<furni>/<trax>` (each 0..1), `settings/ignore-room-invites/<0|1>`,
`settings/disable-camera-follow/<0|1>`.

Every `register`/`add`/`handle` returns a function that takes that one thing out; whatever a module
added is taken out by the client when it stops, so `deactivate` only undoes what the module did
outside the API. Everything a module draws sits in an error boundary of its own.

## Drawing a module's windows

`libs.theme` (the SDK's `/theme`) has what a themed window needs beyond the client's own skins:

- **A frameless window**: `Frame variant="none"` draws no skin, shadow, header or scaler and crops
  nothing; it is still a window - raised on a press, kept where it was dragged - and is dragged by any
  press its content does not take (a press on a button is the button's), or by a `Region dragTrigger`
  in it. A theme makes one of the client's windows frameless with `frame.overrides` (`"variant": "none"`)
  or a template patch (`docs/template-patches.md`).
- **Panes**: `Frame panes={...}` draws other frames beside the window, placed against its top left and
  not cropped by it: a navigation pane that moves, raises and closes with it, behind the window's art
  (`panesInFront` for over). A pane's header drags the window, as any nested frame's header drags the
  window it is in (Flash's `WindowController.update`: a `mouse_dragging_trigger` drags its nearest
  `mouse_dragging_target`).
- **Rich text**: `ThemeText markup` takes Flash `htmlText` (`<b>`, `<i>`, `<u>`, `<font color>`, `<br>`,
  `<a href>`) in any face: a face the captured Flash fonts lack is drawn by the browser with each run
  styled (`docs/text.md`). `RichText html={...} width={...}` draws HTML a module was given - a news
  article's body - as paragraphs, `h1`-`h6`, lists, line breaks, pictures, bold, italic, underline,
  colours and links; everything else is dropped (scripts, styles and frames with their text), links
  only `http(s)` or in-client `event:` ones, pictures only from the page's origin or `imageHosts`.
  Nothing of the HTML is ever shown as tags or run (`nitro-theme` `utils/richText.ts`).

## The loading screen

The loading screen is up before any module loads, so a theme styles it with the configuration value
**`loading.screen`** (an object, or the object as JSON text; Turbo merges each plugin's entries into the
variables, as `templates.patches`). Read at boot (`views/loading-screen/loadingScreenStyle.ts`); each key
it leaves out is Habbo's own:

```json
{ "loading.screen": {
    "background": "#202020", "backgroundImage": "/c_images/reception/view.png", "backgroundSaturation": 0.1,
    "photo": false, "box": { "width": 300, "height": 197, "color": "#656159", "radius": 8 },
    "logo": "/c_images/loading/logo.png", "text": "loading.message", "textColor": "#ffffff", "textSize": 16,
    "bar": { "width": 260, "outline": "#ffffff", "well": "#000000", "fill": "#ffffff" }, "percent": false } }
```

`backgroundImage` covers the screen (its saturation as CSS `saturate()`), `photo: false` leaves out
Habbo's photo frame and centres the rest on `box`, `text` is a text key or the text itself (in place of
the revolving `client.starting.revolving` lines), `bar` takes `fillBottom` for a two-tone fill, and
`percentColor` the percentage's colour. A value of the wrong type is ignored.

## Replacing the toolbar

A theme replacing the stock toolbar can set `chat.input.width` to a positive number of stage
pixels to center the chat bar at that width, clamped to the viewport with 12 pixels on each side.
`chat.input.bottom` is an optional nonnegative gap below the chat bar, also in stage pixels.
Without these values, chat keeps its AS3 toolbar-aware placement. The chat template still owns
the arrangement of its style selector, text field and optional extra button.

The existing `seasonalcurrencyindicator.enabled`, `eventinfo.enabled` and
`notifications.new_feature.active` settings control the seasonal currency strip, room event card
and configured promotions. `notifications.moderation.disclaimer.enabled` defaults to `true`;
a hotel supplying its own entry notice can set it to `false` to omit the stock disclaimer.

## Plugin messages (`client.messages`)

The client asks for `client.messages` with the other Turbo extensions. The server answers with
`TurboPluginMessagesMessage` (header 30010): per message its `name`, the `header` the server gave it
(the same both ways) and its `schema`, after the capability answer and again whenever the set
changes. `commands/client-modules/pluginMessages.ts` registers each header's parser and composer as
extension packets, so a header a module took with `packets.registerParser` stays its own (the
message is skipped, with a warning).

The schema is compact JSON: an array of `[name, type]` fields (camelCase), where a type is `'int'`,
`'long'`, `'bool'`, `'string'`, `'double'`, `['array', type]`, `['map', type]` (a server
`Dictionary<string, T>`) or `['object', fields]`.
`pluginMessageCodec.ts` reads and writes from it in Habbo's wire encoding: ints, a long as its high
and low int, a byte for a bool, a string after its length, a double as its 8 IEEE bytes, an array as
an int count and its items, a map as an int count and each key (a string) and value, a record as its
fields. A map reads as a plain object (each key an own property); a module writes one as an object or
a `Map`. For typed modules a generator can map the
schema to TypeScript: `int`, `long` and `double` are `number`, `bool` is `boolean`, `string` is
`string`, an array `T[]`, a map `Record<string, T>` and an object an interface of its fields
(`ClientModuleMessageOf` in the SDK does this). Tests:
`packages/nitro-react/test/pluginMessageCodec.test.ts` (`yarn workspace @nitrodevco/nitro-react test`).

## Example

Turbo's plugin template (`templates/turbo-plugin`, `client/src/index.tsx`) uses all four parts of 1.1:
the own user's name from `state`, a room event, an avatar menu button and a chat command.

`docs/examples/client-modules/hello/` is a module with no build step: a toolbar icon and a me
menu entry that open a window, the `hello/open` link, a bar over the user's own avatar, and a
button that sends the plugin's `hello.wave` message and shows its `hello.waved` answer. Turbo's
example plugin serves the same files.
