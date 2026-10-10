# Hotel view reference and checks

This pass replaces the temporary navigation card with the default reception's
background and implements `WidgetContainerLayout.activate`, `onTimingCode`, and
`setBackgroundGraphics`. It also draws the logged-in figure through
`AvatarImageWidget`, and receives the AS3 promo-article and community-goal packet
data for their reception views. Navigation remains available through the toolbar.

## Reference findings

- September AS3: `WIN63-202609091217-117204808/scripts-deob/com/sulake/habbo/friendbar/landingview/`.
  `layout/WidgetContainerLayout.as` decides background scheduling, visibility and
  retention. Its layout was extracted directly from that revision's SWF DefineBinaryData.
- HTML5 workbench: release `r_5fe2d203ec900f056bb65ecb`, original
  `client/generated/habbo-friend-bar-com.hab` contains
  `landing_view_default_dynamic_layout_xml`. It matches September's extracted XML
  after newline normalization. `client/habbo-air/HabboAirLauncher.app.js` contains
  the corresponding controller, identified by its background names, layout names,
  scheduling key and method flow. Its extracted declaration is pinned separately;
  this does not assert that the entire official release matches September AS3.

Local reference inputs are retained in the ignored directory
`packages/nitro-react/scripts/hotel-reference/`. No proprietary reference code is
shipped. The manifest pins the layout, official evidence and AS3 controller/parser.

```powershell
$env:NITRO_HOTEL_REFERENCE_ROOT = (Resolve-Path packages/nitro-react/scripts/hotel-reference).Path
$env:NITRO_AS3_ROOT = 'E:/Development/Habbo/SWF Sources/WIN63-202609091217-117204808/scripts-deob'
node tools/layout-reference.mjs tools/references/hotel-view.json tmp/hotel-reference-report.json
node --test tools/hotel-view.test.mjs
```

The tests compare the initial background table to the pinned XML when those local
inputs are present; this check is explicitly skipped when they are absent. Other
tests cover packet field order, composer payload, schedule filtering, room-hidden
updates, activation requests, retained images and listener cleanup.

The compact report's three review items are resolved as follows:

- `left-right_divider` starts hidden and this controller never reveals it.
- Hotel-top and logo images are remote `image.library.url` resources, not embedded
  bundle art. The existing ThemeImage/FlashBitmap path preserves their bitmap rules.
- `hideWarningIfPresent` hides the layout editor's warning unconditionally.

The six added config values follow the workbench's captured external variables
(`.workbench/gamedata-fixture/external_variables.txt`), with the source image-library
URL used for the unmodified reception logo (protocol-relative host normalized to HTTPS).
They are a September snapshot, not an
automatic external-variables refresh.

## Verification and limits

The live local emulator connection rendered reception, including the matching timing
reply and remote artwork. Browser captures are `tmp/hotel-live.png` (1264x569),
`tmp/hotel-1172x822.png`, `tmp/hotel-800x600.png`, and
`tmp/hotel-navigation.png` (toolbar Rooms button opens the navigator above reception).
These are inspection artifacts, not approved official screenshot baselines.

AS3 retains a layer's last URI when the new configuration omits it, and does not
apply a replacement while the layer is hidden. One focused Jev request checked
these interpretations; its retention judgment was uncertain. The AS3 branch and
regression tests, rather than that judgment, determine the implementation.

The widget slots are ported (`DynamicLayoutManager` -> `HotelViewWidgetGrid`): the
hotel's `landing.view.dynamic.slot.*` variables put `bonusrare` in slot 1 and scheduled
`widgetcontainer`s in slots 2-5, each asking the timing code of its own schedule and drawing
the `generic` widget that code names (`caption`, `subcaption`, `bodytext`, `spacing`,
`catalogbutton`, `internallinkbutton`, `link`, `customtimer` with the window manager's
`CountdownWidget`). The reception, the grid, the generic widget and its elements, the promo
article and the empty widget container are drawn from their `habbo-friend-bar-com` templates
(`landing_view_default_dynamic_layout`, `dynamic_widget_grid`, `generic_widget`, `element_*`,
`promo_article`, `widget_container_widget`). The live emulator capture `tmp/hotel-slots-2.png` shows the bonus rare and
four scheduled promos, with offsets, pane gap and row spacing matching a capture from the AIR
client. Only the slot and code variables of the current schedule are in `nitro-config.json`.

Captions use the layout's `spacing="-0.6"`. The exact text renderer used to refuse any letter
spacing, and so did Sulake's JS build (`native letterSpacing is not implemented yet`), which
dropped those captions to browser text. The advanced layouts now add it to the pen after each
glyph. At 0 no step changes, but `scripts/flash-text-golden` was not available to hash-check.

Still open: body texts with non-ASCII punctuation (`Ã¢â‚¬â€œ`, `Ã¢â‚¬â„¢`) fall back to browser text because
the captured AIR font bundles hold printable ASCII only; the caption's `max_lines="2"` is not
enforced; the promo-article and community-goal widgets draw their data but not their layouts
(carousel, links, meter, voting); the new-identity override, moving
background objects and alternate configured layouts are not ported; the bonus rare's credits
button has no hotel web page to open.


## PR #37 merge reconciliation

The merge with `pixi-render` keeps one reception lifecycle in `registerHotelViewHandlers` and
one state slice in `systemStore`. The mount component only controls visibility, avoiding a
second set of activation requests. AS3 `WidgetContainerLayout.setBackgroundGraphics` retains
the previous URI for missing values and hidden layers; the feature branch's stateful handling
is retained. The base branch's newer campaign schedules replace the duplicated older keys.

The base branch's bonus rare geometry and slot separators are retained, with the feature
branch's timer and campaign dispatch. `GenericWidget.configureLayout` and the official
JavaScript implementation place a bitmap beside the content column; the merged view measures
both, plus floating timers, so their size contributes to the slot. Normal text preserves the
base branch's `normalPenLayout`, while advanced text preserves caption letter spacing.

Verification: React TypeScript check, changed-file ESLint, barrel check, and six reception
regressions passed. Jev screens were reviewed against AS3 and the official JavaScript; its
per-file omission flags include behavior delegated to the handler and child components and
are not treated as behavioral authority. The browser reached the loading screen; authenticated
reception rendering remains unverified because this checkout lacks the local emulator bridge
and socket override present in the development checkout. No screenshot baseline was changed.
