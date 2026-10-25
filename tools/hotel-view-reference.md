# Hotel view reference and checks

This pass replaces the temporary navigation card with the default reception's
background and implements `WidgetContainerLayout.activate`, `onTimingCode`, and
`setBackgroundGraphics`. It also draws the logged-in figure through
`AvatarImageWidget`, and receives the AS3 promo-article and community-goal packet
data for their reception views. Navigation remains available through the toolbar.

## Reference findings

- AS3: `scripts/habbo-as3/com/sulake/habbo/friendbar/landingview/`.
  `layout/WidgetContainerLayout.as` decides background scheduling, visibility and
  retention.
- Habbo's JavaScript port: `scripts/habbo-js-resources/habbo-friend-bar-com/landing_view_default_dynamic_layout.xml`
  is the layout the release bundles, and `scripts/habbo-js` holds the corresponding controller,
  identified by its background names, layout names, scheduling key and method flow. This does
  not assert that an entire release matches the AS3.

`tools/references/hotel-view.json` pins the sources this pass was checked against. Against the
current reference folders: the bundle's layout matches the `official-default.xml` pin, not the
`layout` pin (the layout extracted from the September SWF, which differs from it); the
`WidgetContainerLayout.as` pin no longer matches `scripts/habbo-as3`. Review the differences before
repinning; never repin only to make the test pass.

```powershell
node --test tools/hotel-view.test.mjs
```

The background-table test reads the pinned layout from an ignored local path that no longer exists
(see `tools/hotel-view.test.mjs`), so it is currently always skipped. The other tests cover packet
field order, composer payload, schedule filtering, room-hidden updates, activation requests,
retained images and listener cleanup.

Three review items from the layout are resolved as follows:

- `left-right_divider` starts hidden and this controller never reveals it.
- Hotel-top and logo images are remote `image.library.url` resources, not embedded
  bundle art. The existing ThemeImage/FlashBitmap path preserves their bitmap rules.
- `hideWarningIfPresent` hides the layout editor's warning unconditionally.

The six added config values follow the hotel's external variables as captured in September
(a local workbench fixture, not in the repository), with the source image-library URL used for the
unmodified reception logo (protocol-relative host normalized to HTTPS). They are a snapshot, not an
automatic external-variables refresh.

## Verification and limits

The live local emulator connection rendered reception, including the matching timing
reply and remote artwork, at 1264x569, 1172x822 and 800x600, and with the toolbar's Rooms button
opening the navigator above reception. Those captures were local inspection artifacts, not
approved screenshot baselines, and are not kept.

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
`promo_article`, `widget_container_widget`). A live emulator capture showed the bonus rare and
four scheduled promos, with offsets, pane gap and row spacing matching a capture from the AIR
client. Only the slot and code variables of the current schedule are in `nitro-config.json`.

Captions use the layout's `spacing="-0.6"`. The exact text renderer used to refuse any letter
spacing, and so did Sulake's JS build (`native letterSpacing is not implemented yet`), which
dropped those captions to browser text. The advanced layouts now add it to the pen after each
glyph. At 0 no step changes; the letter-spacing path was not hash-checked against the original
renderer.

Still open: the caption's `max_lines="2"` is not
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
branch's timer and campaign dispatch. `GenericWidget.configureLayout` and Habbo's
JavaScript port place a bitmap beside the content column; the merged view measures
both, plus floating timers, so their size contributes to the slot. Normal text preserves the
base branch's `normalPenLayout`, while advanced text preserves caption letter spacing.

Verification: React TypeScript check, changed-file ESLint, barrel check, and six reception
regressions passed. Jev screens were reviewed against AS3 and Habbo's JavaScript port; its
per-file omission flags include behavior delegated to the handler and child components and
are not treated as behavioral authority. The browser reached the loading screen; authenticated
reception rendering remains unverified because this checkout lacks the local emulator bridge
and socket override present in the development checkout. No screenshot baseline was changed.
