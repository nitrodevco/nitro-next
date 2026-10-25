# Text

All UI text goes through `ThemeText` (and `TextInput`) with a `textStyle` key, and
`nitro-theme`'s `src/font/flash-text` draws it exactly as the Flash client did.

**A style is named the way the client names it** - `u_regular`, `il_button`, `id_heading_1`. That
one spelling is the key of `HABBO_TEXT_STYLES`, the `textStyle` prop a view passes, and the value a
layout's `text_style` var carries. `TEXT_STYLES` in `nitro-theme/src/utils/textStyles.ts` is
derived from `HABBO_TEXT_STYLES` rather than listed beside it (it only adds the browser-text face
each style falls back to), so a style added to the generated table is a theme style the moment it
lands. There is no second `text-style-*` spelling any more.

**A text's format is its style plus the `TextField` vars its layout declares over it**, the way
`TextController.setTextFormatting` layers them. Three of those vars have Pixi equivalents and ride
in `textOptions` - `font_face` as `fontFamily`, `font_size` as `fontSize`, `text_color` as `fill`.
The rest have none, so they ride in `flashFormat`: `bold`, `italic`, `underline`, `spacing`,
`leading`, `antialias_type`, `grid_fit_type`, `thickness`, `sharpness`, `kerning`, `etching_color`
and `etching_position`. `ThemeText` folds both onto the style before rasterising, so an override is
still Flash-exact - it does **not** drop the text to the browser's canvas, which is what made a
`fontSize: 11` room-tools label the only blurry text on the bar. Only a face none of the captured
fonts covers still falls back.

Three things about those vars that are easy to get wrong, and that the theme's template code
encodes (`themeDefaultTextStyle` in `utils/textStyles.ts`, used by `template/measureTemplateText.ts`):

- **A text with no `text_style` var is not `regular`.** The window's `style` id picks a theme, and
  `ThemeManager`'s three real themes each default `text_style` differently: Volter (ids 0-2)
  `regular`, Ubuntu (3-7) and Misc (10000-10007) `u_regular`, Illumina Light and Dark (100-199,
  200-299) `il_regular`. The layout editor writes a var out only where it differs from that
  default, so reading a missing `text_style` as `regular` put Volter 9 under the 1,708 texts the
  Ubuntu and Illumina themes cover.
- **A falsy var is usually no var at all.** `setTextFormatting` re-applies the style over every
  property whose recorded value is falsy (`if(!_loc2_.sharpness)`), so the `sharpness="0"`,
  `leading="0"`, `spacing="0"`, `kerning="false"` and `text_color="0x0"` the layout editor writes
  on almost every text are the *style's* values, not zeroes. The setters that record a string
  escape that - `setBold` writes `"bold"` whether the var is true or false, and `setItalic` and
  `setUnderline` likewise - so `bold`, `italic` and `underline` count either way, and
  `setEtchingColor` is guarded by `== null`, so `0x0` counts too.
- **`grid_fit_type` is the one setter that records nothing**, so a `text_style` var listed after it
  puts an advanced style's grid fit back to `pixel` over it. Vars apply in document order.
  `advanced` + `subpixel` has no exact rendering - Sulake's own build throws on it - so those texts
  draw in canvas text, here and in the client this renderer came from.

`UbuntuThick` is a fourth embedded face that about forty layout texts name. The client's window
manager bundle carries it (`ubuntuThick_bold_air51.json`, `ubuntuThick_bold.ttf` in
`scripts/habbo-js-resources/habbo-window-manager-com`), but the port ships neither, so a template
text naming it passes the face through as `fontFamily`, which no shipped font covers, and draws in
browser text.

- `flash-text/air32/` is a port of Sulake's bit-exact re-implementation of Adobe AIR's text
  rasterizer. Its arithmetic is deliberately literal: every `Math.fround`, every rounding helper
  and the order of operations reproduce 32-bit float behaviour. Do not "simplify" it; a change
  there is only safe if the rendered pixels stay identical to the original's. The original is the
  rasterizer Habbo's JavaScript port carries: `scripts/habbo-js/runtime/Air32NativeTextRenderer.js`
  and the AIR text helpers in `scripts/habbo-js/vendor/vendor.js` - so when a text question
  outgrows the port, read it there in its own context.
- `habboTextStyles.ts` is generated from the client's `styles.css` by
  `packages/nitro-react/scripts/generate-habbo-text-styles.ts`, from
  `scripts/habbo-js-resources/habbo-window-manager-com/text_styles_css.txt`. Regenerate it, never edit it; it is the whole list of
  theme styles, so a style it gains is one a view can name that day and one it loses is a
  `textStyle` that stops typechecking - never a hand-written font beside it.
- A theme or a hotel can set a style to another's format, or change its fields, at run time
  (`setTextStyleOverrides`: the window manager bundle's `text-styles.json`, then the config's
  `text.styles.overrides` - see [theme packs](asset-bundles.md#theme-packs)). It replaces the entries of
  `HABBO_TEXT_STYLES` and `TEXT_STYLES` in place, so every reader draws and measures the new format;
  a text already drawn keeps the old one, which is why both apply before the client leaves the
  loading screen. A layout text that names its face itself (`font_face`) keeps that face over any
  style; a theme or hotel reaches it by the face instead (`setFontFaceOverrides`: the window manager
  bundle's `text-faces.json`, then the config's `text.faces.overrides`), which `templateTextFormat` and
  `templateFontSize` apply to every template text naming it. A style the exact renderer cannot take in its new format falls back to browser
  text, as any other does. A layout's `spacing` var stays exact on either anti-aliasing: as in
  Flash, whose `TextFormat.letterSpacing` ignores `antiAliasType`, Volter's normal layout adds it
  after every glyph as the advanced one does (`layoutNormalText`).
- Fonts are captured bundles in `public/assets/fonts/*.air51.json`, shipped in `fonts.nitro` and
  registered once at boot by `preloadFlashFonts()`. They cover the Latin script (U+0021-017F:
  ASCII, Latin-1 and Latin Extended-A, so every hotel's language) and U+2000-22FF (dashes, curly
  quotes, currency, fractions, arrows, maths) - each glyph decoded the first time it is drawn.
  The few of those marks a face lacks (no face has the U+2010-2012 hyphens or the primes) are
  drawn as their ASCII look-alikes (`GLYPH_STAND_INS` in `FlashTextRenderer.ts`, one character for
  one). The rest of each font (Cyrillic, Greek, Latin Extended-B, Latin Extended Additional, ...)
  is in `public/assets/fonts-extended/*.air51.json`, shipped in `fonts-extended.nitro`, which no
  boot path loads: the boot bundle has every glyph's `DefineFont3` metrics, so the first text with
  a glyph the font has but the face cannot draw yet starts the fetch (`setMissingGlyphLoader`),
  draws in browser text that once, and draws again when the glyphs land - `ThemeText` and chat
  bubbles through `useMissingGlyphRefresh`, template measures through the font revision in their
  cache key. A string with a character no font has (emoji) - or a raw
  `fontFamily`/`fontSize` override - falls back to the browser's text
  in the same `.ttf` faces, so never assume a text is a Flash bitmap. Those faces are
  `font-faces.nitro`, added to `document.fonts` from the archive's own bytes by
  `registerBrowserFonts` - started by `preloadFlashFonts` at boot but never awaited, because they are only the fallback.
- A rendered text is a bitmap with Flash's 2px `TextField` gutter on every side; caret and
  selection geometry (`flashTextCaretRect`) is in that same space.
- The `il_*` styles are etched: a translucent white line under every glyph, made for dark text
  on a light panel. Never put a light `fill` on one - the etch shows through as a smear. Flash
  has separate un-etched styles for that (`il_button_white`, `il_frame_title_white`,
  `il_regular_white`, ...); use those.
- For anything that is not a `ThemeText` - chat bubbles, a texture you own - use
  `renderFlashTextCanvas` (plain text or `parseFlashTextMarkup` runs) and fall back to
  `renderBrowserTextCanvas`, the way `chat/ChatBubbleText.ts` does.

The words come from two files, loaded in Flash's order by `useLocalizationLoader` and parsed the
way `CoreLocalizationManager.parseLocalizationData` does (`utils/localizationData.ts`: the key ends
at the first `=`, `\n` is a line break):

1. The `habbo-localization-com` library's bundle (`asset.bundles.templates` with `%libname%` the
   library) - the client's embedded `default_localizations` with the language's file over it, one
   `default_localizations_<lang>.txt` per language. Only one language is parsed at a time
   (`localizationCommands.ts`): `localization.default.language`'s at boot (default `en`, and `en`
   when the bundle has none for it, as `loadDefaultEmbedLocalizations` falls back), and another
   when `:lang <code>` asks for it, with the hotel's texts laid back over it. Most `wiredmenu.*`
   texts exist only here.
2. `gamedata.urls.externalTexts` - the hotel's texts, which override the first.

Both come from Nitro Studio (`packages/nitro-studio`): the hotel's texts from its Habbo
import, the default localizations from the client release (Workspace > Habbo, client data),
each `DefaultLocalizations_<lang>.json` built into the library's bundle (`localization-bundle.ts`);
a text that is wrong or cut off is fixed there, never patched in the client. Use Flash's
key and Flash's parameter names (`t('infostand.text.badges_rank', '', { rank: '#3' })` fills
`%rank%`). A key that neither file has and no Flash class or layout names is one the port made up:
it only ever shows as the bare key. `localization_keys.py` lists them.
