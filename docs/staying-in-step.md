# Staying in step with the client

Much of this repo is the Flash client's own data, carried over by hand or by generator, and the
client moves on with every revision (`production.version` in `nitro-config.json` names the one
being ported). Data that falls behind renders wrong instead of failing: the companion pets stood
still because the bundled animation table predated them. After a revision bump, and before blaming
code for something that "almost works", check the data:

```sh
cd scripts/drift && sh run-all.sh     # from the repository root; git-ignored, local; exits 1 and prints DRIFT lines, or "No drift."
```

The checks read the AS3 from `scripts/habbo-as3` (`known.FLASH_ROOT`) and the client bundles from
`scripts/habbo-js-resources` (`known.RESOURCES`); see
[Habbo reference code](development.md#habbo-reference-code). After a revision bump, replace both
with the new revision's before trusting a run: nothing checks that they match `production.version`.
A clean run prints one `ok` line per check. Every deliberate difference is an entry in
`scripts/drift/known.py` with its reason, so a `DRIFT` line is always new: fix it, or - when the
port differs on purpose - add the entry *and* say why in the code it concerns. Do not let findings
accumulate as "known noise"; that is how seventeen missing variable keys went unread.

The checks read the AS3, which predates the client releases the port has since followed. A feature
ported from a newer release's `scripts/habbo-js` is a deliberate difference too: check it against
that build, then list it where each check reports it, with `known.newer_client(feature, commit)`
as the reason. To see which findings a release brings, run the suite with the previous build's
bundles as well (`HABBO_RESOURCES=../prev-95/habbo-js-resources sh run-all.sh`) and diff the
`DRIFT` lines.

| What | Source of truth | How it gets here |
|---|---|---|
| The avatar data the renderer starts from (the `habbo-avatar-render-lib` bundle from `asset.bundles.templates`, nitro-api's `IAvatarRenderData`) | the client release's `habbo-avatar-render-lib` (`HabboAvatarGeometry`, `HabboAvatarPartSets`, the placeholder `HabboAvatarFigure`, `dance_sixseven_animation`, `action_offset_lay` / `_swim`, `HabboAvatarAnimation`) and the hotel's `HabboAvatarActions.xml` | Nitro Studio imports both (Workspace > Habbo) into its workspace's gamedata and builds them into the bundle on import, edit and publish; `run-all.sh` diffs the studio's copies against the SWF |
| `HabboAvatarActionsDefault.ts` (the stand and the snowwar postures) | the XML literal in `AvatarRenderManager.as` - Flash code, not an asset | by hand; diffed (its offsets come with the avatar data) |
| `nitro-theme/src/font/flash-text/habboTextStyles.ts` | `styles_css` in the SWF (`scripts/habbo-js-resources/habbo-window-manager-com/text_styles_css.txt`) | `node scripts/generate-habbo-text-styles.ts ../../scripts/habbo-js-resources/habbo-window-manager-com/text_styles_css.txt` from `packages/nitro-react` |
| `nitro-react/src/context/notifications/store/NotificationConfig.ts` | `habbo_notifications_config_xml` and the bitmaps of `HabboNotificationsCom.as` | by hand; `notifications_config.py` diffs styles, view timings and asset names |
| `IncomingHeader.ts` / `OutgoingHeader.ts` and the packet classes | the packet generator output directory | see Packets; `packets.py` checks names, ids and registration, `wire.py` what each packet reads and writes |
| Which incoming packets the client acts on (`handlers/**`) | the Flash component that constructs the message id's `*MessageEvent` - `addHabboConnectionMessageEvent(new XMessageEvent(onX))` | by hand; `handlers.py` reports a registered packet nothing subscribes to (naming the Flash class that handles it, so the gap reads as a missing feature), a stale `known.HANDLERS_UNHANDLED` entry, and a listener on a packet Flash never acts on (`known.HANDLERS_PORT_ONLY`) |
| `nitro-api` enums, constant classes and event classes that mirror a Flash constant class (`RoomObjectVariableEnum`, `RoomWidgetEnum`, `RoomObjectWidgetRequestEvent`, `PetType`, ...), and same-named constant classes in nitro-renderer / nitro-react | the `.as` class - same name, or paired in `known.PAIRED` / `MERGED` (obfuscated or renamed), or by value overlap (`enums.py -v` lists the pairs) | by hand; the *values* must be Flash's strings, typos and case included (`furniture_expirty_timestamp`, `GAME_TOKEN`, `ROWRE__STICKIE`). A nitro-api class that pairs with nothing is drift until `known.ENUMS_UNPAIRED` says why; every `RoomObjectWidgetRequestEvent` member needs a widget or handler case, or a `known.WIDGET_REQUESTS_UNHANDLED` reason |
| `scripts/habbo-js-resources/<component>/` (git-ignored; the input of `generate-habbo-text-styles.ts` and the layout XML the hand-written views cite) | the component bundles the client release ships, of the revision `production.version` names | `node scripts/habbo-js-export/index.mjs <release .asar>`, which also refreshes `scripts/habbo-js`; then regenerate the text styles and re-read the views whose layout changed. `binary_data.py` reports a bundled asset whose bytes differ from the decompiled client's of the same published name (the two references being different builds), unless `known.REFERENCE_BUILD_SKEW` says why it stands (the port follows the AS3 copy, or already the bundle's, or Nitro Studio serves the asset) |
| Class constants the port mirrors from a Flash class (`AvatarLogic`, `AvatarVisualization`, `AnimationFrame`, `LayerData`, the Variable FX tables and paint colours) and tables copied out of a Flash method, array or switch (post-it colours, pet/bot placing and friend list error texts, visitor steps, thumbnail `DRAW_ORDER`, `PRODUCT_IMAGES`, dimmer colours, trophy themes, mannequin clothing, ...) | the `.as` class or method named in each docblock | by hand, under Flash's names; `constants.py` compares every static const of the paired class (an obfuscated Flash name maps through its `rename`; one the port leaves out needs a `skip` reason) and, for `AvatarLogic`, the timeouts Flash writes as literals. `enums.py` skips a file whose docblock names `drift/constants.py`; add a table to `constants.py` when you carry a new one |
| `RoomObjectLogicFactory` / `RoomObjectVisualizationFactory` | `RoomObjectFactory.as` / `RoomObjectVisualizationFactory.as` | by hand; a type only Flash builds falls back to the basic class, so list it in the factory's comment or port it |
| The hand-written `views/**` built from a Flash layout - the controls each one draws | `<layout>_xml` of the revision, and the `.as` class that drives the window | by hand; `layout_views.py` records each layout's named controls beside its view in `known.LAYOUT_VIEWS` and reports one the client added, dropped or reordered. Add the row with the view, or the view falls behind unnoticed; a control the port leaves out on purpose stays in the list and the view's docblock says why (`RoomInfoView` names all four of its own). `layout_fills.py` holds the same views to the layout's `background` flag: `WindowController` paints a `color` as a rectangle only where the element carries `background="true"`, so filling one without it invents a panel (the navigator's `border` at (-3, -3) painted 577x578 of `#eceae0` across the content area). A tinted `Border` is not counted: skin art draws with or without the flag (`me_menu_other_settings`'s `settings_brdr`, the whole panel). `layout_text_styles.py` holds each named text of the layout to the view's element of that name: the text style the layout resolves to (its `text_style`, else its window style's theme default) and the `font_face` it sets over it |
| `nitro-react/src/wired/elements/<holder>/<holder>Codes.ts` (the six `*Codes` classes, whole) and the `<holder>Elements.ts` registration order | `wired_setup/<holder>/<Holder>Codes.as` and `ActionTypes.as` / `TriggerConfs.as` / ... push order | by hand; `wired_tables.py` compares names and values, and the sequence of codes the registered elements answer to |
| Other wired constant tables: the variable FX editor enums, `WiredMenuSlice`'s error codes, `WiredEnvironmentSlice`'s click options, the wired enums of nitro-packets (`QuantifierType`, `WiredVariableTarget`, `TradeRequirementType`, ...) | the (mostly obfuscated) `.as` class named in each docblock | by hand; `wired_tables.py` compares values, and that every obfuscated Flash name is named in the port file |
| `nitro-react/src/wired/styles/*WiredStyle.ts` | `uibuilder/styles/<Name>WiredStyle.as` getters, and the `wired_style_<name>_xml` templates | by hand; `wired_tables.py` diffs the getters only - the templates are not checked (`known.WIRED_STYLE_TEMPLATES_UNCHECKED`) |
| The config flags the port reads, in `public/config/nitro-config.json` | the hotel's `external_variables` (Nitro Studio's `gamedata/ExternalVariables.json`) and the keys the `.as` files name | by hand; `config_keys.py` reports a key the hotel sets that the config lacks, and a key no Flash class names (Nitro's own go in `known.CONFIG_KEYS_PORT_ONLY`). A key read through a string constant (`useConfigValue(WARDROBE_SLOTS_KEY)`) is followed to its value, in its own file or another file's export; a read it cannot resolve is reported, not skipped |
| The hotel view's run-time keys in `nitro-config.json` - `landing.view.dynamic.slot.<n>.*`, `landing.view.common.*`, `landing.view.background_<name>.*`, and `landing.view.<code>.widget/.conf/.layout` for every code a slot's schedule names | the hotel's `external_variables` | by hand; `config_keys.py` holds each one the hotel sets to the hotel's value, as the literal-read check above cannot see keys built at run time. A schedule the hotel moved on from shows old promotions; a code with no keys leaves its slot empty |
| The chat styles (`chat-style-definitions.json` and the bitmaps in the `habbo-free-flow-chat-com` template bundle); `ChatMarkup.ts` palettes, `ChatConstants.ts` bubble widths | `chatstyles_xml`, every `style_<assetId>_regpoints` and bitmap of `HabboFreeFlowChatCom.as` (read as `ChatStyleLibrary.as` reads them); `ChatMarkup.as`, `ChatBubbleWidth.as` | the styles are not carried: Nitro Studio's chat bubble builder writes the bundle (see [Asset bundles](asset-bundles.md)); the palettes and widths are by hand. `chat_styles.py` diffs the regpoints keys and flags `ChatStyleLibrary` models, the palettes and the width mapping; the styles' rows and pixels are not compared with Flash until it reads the bundle (it prints a note). `studio.py` holds the bundle's shape to what the client loads |
| The UI theme - every theme component's variants, their art, the cascade and the icon set - and `TEXT_STYLES` in `nitro-theme/src/utils/textStyles.ts` | the `(type, style)` rows of `habbo_element_description_xml`, the window layouts and skins they name, `habbo_skin_icon_set_xml` + `habbo_icons_png` (the client release's `habbo-window-manager-com.hab`), `styles_css` | not carried: Nitro Studio builds the theme from the client release (`server/theme/` there), compares it a component at a time on Workspace > Habbo (UI theme), and publishes it in the window manager library's bundle (`habbo-window-manager-com`), which nitro-react loads from `asset.bundles.templates` into `themeRegistry`. `TEXT_STYLES` derives its entries from `HABBO_TEXT_STYLES` |
| `nitro-react/src/context/catalog/page/CatalogLayouts.ts` (which widgets each layout code creates, and the aliases), `CatalogWidgetEnum` and the `PageLocalization` tables; the pages themselves draw from the layout templates | `CatalogPage.createWidgets`'s walk over each `layout_*_xml`, the layouts' manifest refs, `CatalogWidgetEnum.as`, `PageLocalization.as` | by hand; `catalog_layouts.py` holds the tables to the layout XML and manifest and the enum to Flash's `createWidget` cases, and `constants.py` the localization tables |
| `nitro-theme/src/utils/dynamicStyles.ts` - the hover/press/disabled effects a layout names with `dynamic_style` (`lifted_hover`, `brightness_and_shadow_under`, `_gentle`, `reward_track_item`, `button`) | `DynamicStyleManager.fillStyleTable()` and `DynamicStyle`'s constructor defaults | by hand; `dynamic_styles.py` compares every style's effective rule for the host and each `#icon` / `#bg` child in every state, through the port's own `resolveDynamicStyleRule`. A name the port lacks draws nothing and fails nothing (`button` went missing that way) |
| The text keys the port asks for (`t('...')`, `'${...}'`, any key literal inside a `t(...)` call, and the key-shaped strings of a file that hands `t()` a variable) | the embedded `default_localizations` + the hotel's external texts (Nitro Studio's `gamedata/DefaultLocalizations_en.json`, `ExternalTexts.json`) and the keys Flash's classes and layouts name | `localization_keys.py` reports a key in neither file that no Flash class or layout names |
| `nitro-react/src/context/system/store/HotelViewSlice.ts` initial background table and `views/hotel-view/HotelView.tsx` | `landing_view_default_dynamic_layout_xml` and `WidgetContainerLayout.as` | `tools/references/hotel-view.json` pins sources; `tools/hotel-view.test.mjs` checks background names and initial URIs against the pinned layout (currently skipped: its local copy is gone) and tests schedule transitions. See `tools/hotel-view-reference.md`; visual parity still needs matching official screenshots. |
| The names Nitro Studio's hand item builder takes for granted: the `CarryItem` / `UseItem` actions (`cri` / `usei`, drawing `crr` / `drk` on `handRight`), the `ri` part, `hh_human_item` as a mandatory library, and its sprites' `<size>_<crr\|drk>_ri_<asset>_<direction>_<frame>` names (`studio-hand-items.ts`, `hand-item-store.ts`) | the avatar data's `HabboAvatarActions` and `HabboAvatarPartSets` (the `habbo-avatar-render-lib` bundle), the renderer's `AvatarAssetDownloadManager`, and the workspace's `hh_human_item` | by hand; `hand_items.py` holds the builder's code and the served actions to them, and every `ri` sprite of the library to the pattern - after a rename, the merge that keeps the workspace's own hand items through Habbo's updates finds nothing to put back. `served_gamedata.py` sets the builder's own `CarryItem` / `UseItem` params aside (the ids its record lists) before holding the served actions to the source |
| Nitro Studio's copies of other code's tables: `FURNITURE_CATEGORIES` (`shared/gamedata.ts`), the config keys and url patterns `buildConfigUrls` writes into nitro-config.json (`shared/layout.ts`), the showroom's `room.sql` (`server/showroom-rooms.ts`), and the custom chat style bundle (`server/chat-styles.ts`, with `CHAT_STYLE_FILES` from `shared/api/chat-styles.ts`) | turbo-cloud's `FurnitureCategory`, `RoomModelEntity`, `RoomEntity` and `FurnitureEntity`; the keys nitro-react and nitro-renderer read and the `%placeholders%` they fill; nitro-react's `chatStyleAssetName`, `ChatStyleDefinition`, `ChatStyleAssetFile`, `isStaticChatStyle` and what `ChatStyleLibrary` loads | by hand; `studio.py` compares the categories; holds every inserted column to its entity and every `required` property to the insert (all three `room.sql` tables); reports a key the config lacks or no client code reads, or a placeholder nothing fills (`catalog.asset.url`, read by the catalog and missing from the config, made every wallpaper, floor and landscape picture a 404); and holds the chat style bundle's asset names, catalogue entry and fields, bundle name (the `habbo-free-flow-chat-com` library's template bundle under `bundled/templates`, which the client reads from `asset.bundles.templates`), bitmap files and id range to what the client reads - a bundle packed any other way loads and yields no style. It also holds the chat styles' default id and NFT range to nitro-react's, its room engine library names (`ROOM_OBJECT_LIBRARIES`, `ROOM_CONTENT_LIBRARY` in `shared/layout.ts`) to what the renderer's `RoomContentLoader.getAssetUrls` asks for, the preview's expressions to `AvatarExpressionEnum` and its pet postures and faces to what the workspace's pets have, an effect override's key to `AvatarActionStateType` (an action name never matches, so the override never plays), and every config key the preview or the server reads outside `shared/layout.ts` to the config, or a `known.STUDIO_CONFIG_ABSENT` reason |

Rules that come out of that:

- When a type is added to `RoomObjectLogicType` / `RoomObjectVisualizationType`, add its factory
  case in the same change: an enum member without a class that builds it is half a port.
- A deliberate gap is written down where the fallback happens (the logic factory's `default:`).
- The few values Nitro's asset pipeline adds that Flash never had (`furniture_isometric_bb`) are
  extensions, not drift; leave them.
- Mirror the whole Flash class, not only the members the feature at hand needs: a key with no
  reader costs nothing, and a missing one makes the next port invent a string literal. Take the
  value from the `.as` file, never from memory or an older Nitro: `FurnitureTypeEnum.GameToken` was
  `'game_token'` where the wire says `'GAME_TOKEN'`, and nothing fails until that product arrives.
- Say in the enum's docblock which Flash classes it mirrors. `RoomObjectVariableEnum` folds
  `RoomVariableEnum.as` and a few string literals into one enum; undocumented, the second class
  went unchecked and seven of its keys were missing. A new merge or an obfuscated source also goes
  into `MERGED` / `PAIRED` in `known.py`, or the check cannot see it.
- A member Flash does not have and nothing reads (`Swim = 'swm'`) is dead code; delete it.
  One the port does read (a Nitro-only request type such as `RoomObjectWidgetRequestEvent.YOUTUBE`)
  goes into `known.PORT_ONLY` with the reason, and the class docblock says it is Nitro's own.
- An event class's `type` strings are Flash's too, prefix included (`REPSE_`, not a prefix derived
  from the port's class name): nothing fails on a wrong one, but no Flash reference will match it.
  When a port class keeps Nitro's name for a Flash event (`RoomWidgetUpdateRoomObjectEvent` for
  `RoomWidgetRoomObjectUpdateEvent`), pair it in `known.PAIRED`.
- A new hand-carried table gets a row above and a check in `scripts/drift` in the same change;
  data with no check drifts.
- Refresh Nitro Studio's gamedata after a revision bump, as
  [Nitro Studio](nitro-studio.md#gamedata-and-localization) describes: `config_keys.py` and
  `localization_keys.py` read its workspace's gamedata, and say so when it is missing.
- **The avatar data is loaded, not compiled in.** `useAvatarLoader` reads the avatar render
  library's bundle (`asset.bundles.templates`) with the renderer's `LoadAvatarData` and starts the
  avatar manager from it (`init(data)`) before the figure map, effect map and figure data; `init`
  applies the baked-in `HabboAvatarActionsDefault` first and the hotel's actions over it (Flash's
  `initActions` then `updateActions`). After a revision bump, import the hotel's and the client
  release's data in Nitro Studio (Workspace > Habbo) and publish - the renderer does not change.
- **The UI theme is loaded, not compiled in.** Nitro Studio builds every variant from the client
  release's window manager library: its fields from the element description row and the window
  layout it names, its art from its skin, as `BitmapSkinRenderer` draws it (`server/theme/skinArt.ts`
  there). Which layer a group of skin entities becomes - sprite, nine-slice, composite, tile - and
  where each entity sits in it is the theme's own rule, `skinLayers` in nitro-theme, so the builder
  and the components that draw its layers share one contract; Studio reads the skin and cuts or
  draws the bitmaps those layers ask for. Where the port draws a field the client's files do not
  give (`captionTop`, a pointer's margin), `theme-rules.json` holds it, with a note; the art is
  always the client's. After a revision bump, import the UI theme on Workspace > Habbo and publish.
- An entity marked `colorize="false"` is one `BitmapSkinRenderer.draw` copies *without* the
  window's colour, so it never goes into a layer the theme tints: the builder draws such pieces as
  an untinted `overlay` (`ThemeWithStatesVariant.overlays`), or as `plain` where a frame needs all
  three at once - a tinted title bar, the pale body under it and a shine over both. Where **every**
  entity carries it the skin is never tinted: the variant says `colorize: false` (`ThemeBase`,
  honoured by `useThemeVariant`), and a call site's `tintColor` is dropped too, or the wired
  dialog's `_frame.color = style.frameColor` darkens the light frame Flash leaves alone.
- An entity's `<scale>` says how the client *re-places* it, not only how it resizes: only `strech`
  and `tiled` resize; `move` follows the right/bottom edge, `center` sits in the middle of the
  **rendered** window, and `fixed` stays where it is at its own size. A skin that is one clean
  grid becomes a nine-slice (repeating its centre where the centre tiles); one that is not becomes
  a composite of every entity, each placed by its own scale mode - never a nine-slice stretched
  whole. A skin is as big as its entities' far edge from (0, 0): its transparent margins (a
  bubble's 6px, the illumina header's 12px) are part of it. Check a skin change against the client
  **with a tint applied** - an untinted screenshot hides every tint-dependent defect.
- "No drift." covers only what the checks look at. When asked to look for drift, run the suite,
  then ask what it cannot see: the wire format findings came from a tree the suite had just
  passed. A blind spot that is found becomes a check, not a one-off fix.
