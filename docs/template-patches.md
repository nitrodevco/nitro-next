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

To find names, **alt-click the element** in the client (staff holding Turbo's `client.inspector`,
or a development build after `NitroInspector()` in the browser console - off by default, remembered
in localStorage until `NitroInspector(false)`): the extension inspector shows the template id, the element's key, its
type, rect and the elements it is in, the patches on it and on what holds it, and puts a patch for
it on the clipboard (also logged as `[Inspector]`). A patch whose ops are a function of the window's
context (below) is listed with the ops it gives the window clicked. Nitro Studio's template preview
and the library's `templates.json` have the same names.

## Operations

```ts
{ element: 'help_button', set: { color: 0xff2e9b3c, caption: '${my.text}', hidden: false } }
{ element: 'beta_sign', remove: true }
{ element: 'settings_button', insert: 'after', add: { like: 'help_button', name: 'skills', y: 63, caption: 'Skills' } }
{ element: 'title', move: 'first', to: 'header' }
{ element: 'search', set: { width: 180, params: { scale: [ 'fixed', 'fixed' ] } } }
{ element: 'navigationContainer', wrap: { tag: 'frame', name: 'nav', style: '0', caption: 'Shop', margins: [ 6, 28, 6, 6 ] } }
```

- **`set`**: the layout's own properties - `x`, `y`, `width`, `height`, `style`, `dynamicStyle`,
  `caption`, `hidden`, `color` (`0xAARRGGBB`), `background`, `blend`, `vars` and `params` (each
  merged by key). `params` are the layout flags (`TemplateParams`): `scale` (how the element follows
  its parent's resize, per axis: `fixed`, `move`, `stretch`, `center`), `align`, `accommodate`,
  `boundToParent`, ... - a widened element stops stretching with `scale: [ 'fixed', 'fixed' ]`.
  Behaviour is not a layout property: what a click does stays the window's code's. Resizing the
  window itself (`''`) resizes its layout by as much, so it is drawn and hit at its new size.
- **`move`** `before` / `after` the element `to` names, or `first` / `last` inside it: the element
  and its children go there and **keep their names**, so the window's code still finds them
  (`findChildByName`) and binds them - a title lifted out of a list into a header still shows the
  code's caption. Its `x` / `y` are now its new parent's (set them in a later op). A move into the
  element itself or one of its children, or to an element the template lacks, is reported and moves
  nothing; the window itself (`''`) does not move.
- **`remove`**: takes the element and its children out.
- **`wrap`**: puts a new element (built as `insert`'s `add` is) in the element's place, at the element's
  rect unless `add` gives its own, and the element inside it at (0, 0) - its children with it and its
  name kept, so the window's code still finds and binds it. The window itself (`''`) is not wrapped.
- **`insert`** `before` / `after` an element, or `first` / `last` inside it. **`like`** starts the new
  element as a copy of one the template has - its type, look, input flags (`params`) and children -
  with the given fields over it: a button "like the help button" is a real button without knowing
  Flash's window flags. Without `like`, give `tag` and the rest yourself.

An added element is named `<owner>:<name>` (the owner is the plugin's key), so it never meets a name
of the template's or of another plugin's. The owner reaches it by its short name in later ops and
in bindings; nobody else can.

## A layout that follows what a patch adds

Don't add up heights in a patch: a sum is wrong as soon as another plugin adds a row too, or a
client release changes a margin. Flash's own layout flags make a window follow its content, and a
patch can set them (`vars` and `params`):

- a list with **`resize_on_item_update`** (a `vars` key) takes the length of its items;
- an element with **`reflectToParent`** (`params`, per axis) makes its own change of size to its
  parent - a list that grows grows the window it is in by as much;
- an element with **`scale`** `stretch` on an axis (`params`) follows its parent's change of size on
  it - a border round the window grows with the window; `move` keeps it at the same distance from the
  far edge;
- a container with **`accommodate`** `expand` / `resize` (`params`) grows (and shrinks) to hold its
  children.

The purse's button list (`'@8'`, unnamed) given a fourth button:

```ts
api.templates.patch('habbo-toolbar-com/purse_xml', [
    { element: 'settings_button', insert: 'after', add: { like: 'help_button', name: 'skills' } },
    // The list fits its items and passes its growth to the purse...
    { element: '@8', set: { vars: { resize_on_item_update: true }, params: { reflectToParent: [ false, true ] } } },
    // ...whose outer border stretches with it.
    { element: '@0', set: { params: { scale: [ 'fixed', 'stretch' ] } } },
]);
```

The list places the button itself (no `y`), and the purse is as tall as its four buttons whatever
else is patched in. What the flags cannot say - a frame a margin taller than its list - is a
post-layout hook's (`api.templates.arrange`, below).

## A window of separately framed panes

A theme can split a core window into panes without a copy of it: the window's frame becomes
frameless (`set: { style: 'none' }` on `''`, or `frame.overrides` `"variant": "none"`: no skin, header or
scaler, and nothing cropped), and each part is wrapped in a `frame` of its own and placed where the
theme wants it, inside or past the window's old rectangle. The window's code still finds every part
by its name; the panes move, raise and close as one window: a press anywhere in it raises it, a pane's
header drags it (a nested frame's header drags the window it is in, as Flash's drag trigger drags its
nearest drag target), and a pane a patch added closes the window with its close button. The catalogue
as a page and a separate navigation frame:

```ts
api.templates.patch('habbo-catalog-com/catalog_ubuntu_with_tabs', [
    { element: '', set: { style: 'none' } },
    { element: 'layoutContainer', wrap: { tag: 'frame', name: 'page', style: '3', margins: [ 6, 6, 6, 6 ] } },
    { element: 'navigationContainer', wrap: { tag: 'frame', name: 'nav', style: '0', caption: 'Shop', margins: [ 6, 28, 6, 6 ] } },
    { element: 'nav', set: { x: 600 } },
]);
```

A wrapped part keeps its own position in its pane; a window's code that places it from its old parent's
size (the catalogue right-aligns its page in its parent) now places it in the pane's.

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
  caption that changes, a picture). `api.templates.arrange(templateId, fn)` runs after the window's
  own layout code. All are taken out when the module stops; the window is drawn as before.
  `api.templates.report(templateId)` gives the last application's conflicts, misses and errors, and
  the ops each owner's patches gave it (`ops`).

## A window's context

Some windows tell extensions what they show - the infostand the user it shows - as a read-only
**context**: flat values, documented per window below. A module's `patch` ops and `bind` binding may
be a **function of the context** instead of a value:

```ts
api.templates.patch('habbo-room-ui-com/user_view', ctx => (ctx.isOwnUser ? [ { element: 'info_border', set: { color: 0xff2e7d32 } } ] : []));
api.templates.bind('habbo-room-ui-com/user_view', 'badge', ctx => ({ caption: `#${ctx.userId}` }));
```

A function is called once per context, not per render: the patched template is kept per template,
patch list and context values (the last 16 contexts of each template), so showing a user again, or
redrawing for a new motto, reuses it. A template no function patches is patched once whatever the
context, as before. A function that throws is skipped and reported (`report().errors`); the other
patches still apply. Keep a context's values to what the window shows - they are a cache key.

| Template | Context keys |
| --- | --- |
| `habbo-room-ui-com/user_view` (user infostand) | `type: 'user'`, `userId`, `name`, `figure`, `gender`, `isOwnUser` |
| `habbo-room-ui-com/bot_view` | `type: 'bot'`, `name`, `figure`, `gender` |
| `habbo-room-ui-com/rentable_bot_view` | `type: 'rentable_bot'`, `name`, `figure`, `gender`, `ownerName` |
| `habbo-room-ui-com/pet_view` | `type: 'pet'`, `name`, `figure`, `isOwnPet` |
| `habbo-groups-com/new_extended_profile` (profile) | `userId`, `name`, `figure`, `isOwnUser` |

Any other window passes none (`{}`); a window is given one by passing `context` to its `TemplateWindow`.

## Binding the window's own elements

`bind` reaches the elements a module added. With **`{ override: true }`** it reaches one the
window's code binds itself, named as the code names it: the module's binding is laid over the
code's, and for each field it sets the module's value is used - a theme can recolour, hide or retitle
what the code sets each render. Each field the code (or another module) sets too is reported as a
conflict, its owners `(window)` and the module, in `report()` and on the console when it changes.
Without `override` the v1 rule stands: a module binds only what it added.

```ts
api.templates.bind('habbo-room-ui-com/user_view', 'name_text', ctx => ({ color: ctx.isOwnUser ? 0x8fd14f : 0xffffff }), { override: true });
```

## After the window's layout code

`api.templates.arrange(templateId, (windows, ctx) => { ... })` runs each time a window of the
template is laid out, after its own code's `arrange`, with the same window model
(`windows.find(name)`, `windows.root()`; `setRectangle`, `setHeight`, `textHeight`, ...). Use it for
what a patch cannot say statically - a frame as tall as its list plus a margin. Hooks of several
modules run in the order added; one that throws is skipped, logged once and kept in
`report().errors`; all of a module's are removed when it stops.

```ts
api.templates.arrange('habbo-room-ui-com/user_view', ({ find, root }) => {
    const list = find('infostand_element_list');
    const border = find('info_border');
    const view = root();

    if (!list || !border || !view) return;

    border.setHeight(list.height + 30);
    view.setHeight(border.height);
});
```

## Windows drawn without a template

Windows Nitro draws with a `Frame` of its own (the wired setup window) have no elements to patch.
Their frame takes a style from the hotel variable **`frame.overrides`**:

```json
{ "frame.overrides": { "wired-setup": { "variant": "0", "color": "#3a6ea5" } } }
```

An entry is found by the frame's id (the window's id on the desktop: `wired-setup`), or by the
window's name in its layout for a template's root frame; `variant` is the frame style, `color` its
tint (`#rrggbb`, `0xRRGGBB` / `0xAARRGGBB` or a number). What the window's code passes stays the
default for what an entry leaves out. Turbo merges each plugin's entries in (turbo-cloud
`docs/extensions.md`).

## Replacing one bitmap of a library

The hotel variable **`asset.overlays`** replaces single bitmaps of a template library - one frame's
art, one icon - instead of a theme shipping a copy of the whole library:

```json
{ "asset.overlays": {
    "habbo-window-manager-com/theme-habbo-frame-frame-default": "/gamedata/plugins/mytheme/frame.png?v=...",
    "habbo-room-ui-com/roomtools_gear": "https://cdn.example.com/gear.png" } }
```

The asset is named as the library's bundle has it: a bitmap of the library's own by its asset name,
a sprite of the theme sheet the window manager library carries (`theme.png`: every frame, button and
border skin) by its sprite name, `theme-...` (the frames of the bundle's `theme_spritesheet.json`).
The bitmap is loaded as the library's bundle loads and stands in for the library's before anything
draws it - a frame's art in its nine-slice and its shadow alike. Keep the bitmap's size: a frame's
slice rects are of the sheet's sprite (one of another size is used and logged). One that does not
load is logged and the library's own stays. A plugin names a file of its `wwwroot/` by its path
(`"frame.png"`); Turbo gives clients its address.

## Order, conflicts, misses

Patches apply by `order` (lower first; a base theme takes a negative one), then plugin key, then as
added - never by load timing. When two owners set the same property of the same element the later
one's value is used and the conflict is logged (`TemplatePatches`) and kept in the report. An op
whose element the template does not have (a renamed element in a new client release) is skipped,
a console warning and reported; the others still apply. Each owner's applied, unmatched and
clashing ops, and its code that threw (ops of a context, a binding, a post-layout hook: `module.failed`),
also go to a Turbo server's extension inspector (`TurboClientExtensionReportComposer`,
part of `client.modules`), whose log names the miss and whose admin panel lists it on the plugin. A hotel takes a plugin's file away with an empty url in
its own `templates.patches`.

## Where it lives

- `@nitrodevco/nitro-theme` `template/templatePatch.ts`: `applyTemplatePatches`, the rule bindings
  and overrides merge by (`mergeTemplateBindings`) and post-layout hooks run in
  (`chainTemplateArranges`) - pure, tested in `packages/nitro-theme/test` with the purse's layout
  following an added button (`yarn workspace @nitrodevco/nitro-theme test`).
- nitro-react `theme/templatePatches.ts`: the patches, bindings and arranges added,
  `patchedTemplate` (cached per template, patch list and - for patches that read it - context),
  `useTemplateExtensionBindings`, `useTemplateExtensionArrange`, `loadTemplatePatchFiles`.
- `theme/useTemplate.ts` reads every template through `patchedTemplate` during render;
  `theme/TemplateWindow.tsx` passes the window's `context` and draws extension bindings under (or,
  overriding, over) the window's own.
- `@nitrodevco/nitro-theme` `utils/frameOverrides.ts` (`frame.overrides`, read by `Frame`) and
  `utils/assetOverlays.ts` (reading `asset.overlays`); nitro-react `utils/assetOverlays.ts` (applied
  by `loadAssetBundle`; a template of a library waits for its overlays), the theme
  sheet's overlaid sprites sliced from their own bitmap (`themeAssetBundle.ts`).

A React Compiler note for anyone touching this: memoised code recomputes only on what it reads, so
patch state reaches components as a value they read (a `useSyncExternalStore` snapshot), never as a
version number only listed as a dependency.

## Not yet

- Variables (and so patch files) are read as the client starts: a plugin's file added or changed
  reaches a player at their next load. Modules' patches come and go live.
- Patches change templates. Windows Nitro draws with React components rather than a template have no
  elements to patch; their frame takes `frame.overrides`, nothing else.
- `asset.overlays` and `frame.overrides` are read as the client starts, like patch files: a change
  reaches a player at their next load.
