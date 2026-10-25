# Template patches

Not Flash's. A plugin changes a core window - its colours, a hidden element, a new button - as
**data applied to the window's template**, instead of shipping a copy of the whole library with the
change baked in. Several plugins can change the same window; none needs to know of the others; a
client release that renames an element is reported, not silently mis-drawn. Turbo's side and the
framework model are in turbo-cloud `docs/extensions.md`; worked examples (a theme and an add-on on
the same purse) are in turbo-cloud `docs/examples/template-patches`.

## Addressing an element

Windows are drawn from Habbo's own layouts (`templates.json` in each library's bundle,
`docs/layout-views.md`). A template is named `<library>/<asset>`, as the client's code loads it
(`habbo-toolbar-com/purse_xml`). An element is named exactly as a **binding** names it
(`templateBindings.ts`), which is how the window's own code reaches it with `findChildByName`:

| Key | Element |
| --- | --- |
| `''` | the window itself (the template's root) |
| `'help_button'` | the first element named so, Flash's search order |
| `'panel/help_button'` | one inside `panel` |
| `'#bg'` | the first with that tag |
| `'@8'` | the window's 9th child (for unnamed elements); `'help_button/@0'` its first child |

To find names: Nitro Studio's template preview, or the library's `templates.json`.

## Operations

```ts
{ element: 'help_button', set: { color: 0xff2e9b3c, caption: '${my.text}', hidden: false } }
{ element: 'beta_sign', remove: true }
{ element: 'settings_button', insert: 'after', add: { like: 'help_button', name: 'skills', y: 63, caption: 'Skills' } }
```

- **`set`**: the layout's own properties - `x`, `y`, `width`, `height`, `style`, `dynamicStyle`,
  `caption`, `hidden`, `color` (`0xAARRGGBB`), `background`, `blend`, and `vars` (merged by key).
  Behaviour is not a layout property: what a click does stays the window's code's. Resizing the
  window itself (`''`) resizes its layout by as much, so it is drawn and hit at its new size.
- **`remove`**: takes the element and its children out.
- **`insert`** `before` / `after` an element, or `first` / `last` inside it. **`like`** starts the new
  element as a copy of one the template has - its type, look, input flags (`params`) and children -
  with the given fields over it: a button "like the help button" is a real button without knowing
  Flash's window flags. Without `like`, give `tag` and the rest yourself.

An added element is named `<owner>:<name>` (the owner is the plugin's key), so it never meets a name
of the template's or of another plugin's. The owner reaches it by its short name in later ops and
in bindings; nobody else can.

## Where patches come from

- **A plugin with no code** (a theme): `wwwroot/template-patches.json` in its folder. Turbo lists it
  for clients in the merged variable `templates.patches` (`{ "<plugin key>": "<url>" }`) while the
  plugin is loaded; the plugin names it nowhere. Clients load the files as they start.

  ```json
  { "patches": [ { "template": "habbo-toolbar-com/purse_xml", "order": -10, "ops": [
      { "element": "help_button", "set": { "color": 4281244476 } } ] } ] }
  ```

- **A client module**: `api.templates.patch(templateId, ops, { order })`, and
  `api.templates.bind(templateId, element, binding)` for what an element it added does (a click, a
  caption that changes, a picture). Both are taken out when the module stops; the window is drawn as
  before. `api.templates.report(templateId)` gives the last application's conflicts and misses.

## Order, conflicts, misses

Patches apply by `order` (lower first; a base theme takes a negative one), then plugin key, then as
added - never by load timing. When two owners set the same property of the same element the later
one's value is used and the conflict is logged (`TemplatePatches`) and kept in the report. An op
whose element the template does not have (a renamed element in a new client release) is skipped,
logged and reported; the others still apply. A hotel takes a plugin's file away with an empty url in
its own `templates.patches`.

## Where it lives

- `@nitrodevco/nitro-theme` `template/templatePatch.ts`: `applyTemplatePatches` (pure, tested in
  `packages/nitro-theme/test`: `yarn workspace @nitrodevco/nitro-theme test`).
- nitro-react `theme/templatePatches.ts`: the patches and bindings added, `patchedTemplate` (cached
  per template and change), `useTemplateExtensionBindings`, `loadTemplatePatchFiles`.
- `theme/useTemplate.ts` reads every template through `patchedTemplate`; `theme/TemplateWindow.tsx`
  draws extension bindings under the window's own.

A React Compiler note for anyone touching this: memoised code recomputes only on what it reads, so
patch state reaches components as a value they read (a `useSyncExternalStore` snapshot), never as a
version number only listed as a dependency.

## Not yet

- Variables (and so patch files) are read as the client starts: a plugin's file added or changed
  reaches a player at their next load. Modules' patches come and go live.
- Patches change templates. Windows Nitro draws with React components rather than a template have no
  elements to patch.
- Bitmaps are replaced per element (`vars.asset_uri`, a binding's `asset`); replacing one bitmap of a
  library everywhere (frame art) still needs a library override.
