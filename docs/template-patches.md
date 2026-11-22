# Template patches

Not Flash's. A plugin changes a core window - its colours, a hidden element, a new button - as
**data applied to the window's template**, not by shipping a changed copy of the library. Plugins
changing one window need not know of each other, and a client release that renames an element is
reported, not silently mis-drawn. Turbo's side and the framework model are in turbo-cloud
`docs/extensions.md`; worked examples (a theme and an add-on on the same purse) in turbo-cloud
`docs/examples/template-patches`.

## Addressing an element

Windows are drawn from Habbo's own layouts (`templates.json` in each library's bundle,
`docs/layout-views.md`). A template is named `<library>/<asset>` as the client's code loads it
(`habbo-toolbar-com/purse_xml`); an element exactly as a **binding** names it
(`templateBindings.ts`), which is how the window's code finds it with `findChildByName`:

| Key | Element |
| --- | --- |
| `''` | the window itself (the template's root) |
| `'help_button'` | the first element named so, Flash's search order |
| `'panel/help_button'` | one inside `panel` |
| `'#bg'` | the first with that tag |
| `'@8'` | the window's 9th child (for unnamed elements); `'help_button/@0'` its first child |

To find names, **alt-click the element** in the client. Staff need Turbo's `client.inspector`; a
development build needs `NitroInspector()` in the browser console (off by default; on at once, no
reload; kept in localStorage until `NitroInspector(false)`; the console says which, and when an
alt-click finds no template element). The extension inspector shows the template id, the element's
key, type, style, rect and ancestors, its skins ([the skin map](#the-skin-map)) and the patches on
it and its ancestors, and copies a patch for it (also logged as `[Inspector]`); Alt+Shift-click
copies its skin's overlay entry instead. A patch whose ops are a function of the context (below)
is listed with the ops it gives the clicked window. Nitro Studio's template preview and the
library's `templates.json` use the same names.

## Operations

```ts
{ element: 'help_button', set: { color: 0xff2e9b3c, caption: '${my.text}', hidden: false } }
{ element: 'beta_sign', remove: true }
{ element: 'settings_button', insert: 'after', add: { like: 'help_button', name: 'skills', y: 63, caption: 'Skills' } }
{ element: 'title', move: 'first', to: 'header' }
{ element: 'search', set: { width: 180, params: { scale: [ 'fixed', 'fixed' ] } } }
{ element: '', set: { width: 309, limits: [ 309, 309, 230, null ] } }
{ element: 'navigationContainer', wrap: { tag: 'frame', name: 'nav', style: '0', caption: 'Shop', margins: [ 6, 28, 6, 6 ] } }
{ element: 'tab_button/icon', bind: { asset: 'icons/tab${item.index}.png' }, items: true }
```

- **`set`**: the layout's own properties - `x`, `y`, `width`, `height`, `style`, `dynamicStyle`,
  `caption`, `hidden`, `color` (`0xAARRGGBB`), `background`, `blend`, `vars` and `params` (each
  merged by key). `params` are the layout flags (`TemplateParams`): `scale` (per axis, how the
  element follows its parent's resize: `fixed`, `move`, `stretch`, `center`), `align`,
  `accommodate`, `boundToParent`, ...; `scale: [ 'fixed', 'fixed' ]` stops a widened element
  stretching. Click behaviour is not layout and stays the window's code's. Resizing the window
  itself (`''`) resizes its layout by as much, so it is drawn and hit at its new size.
  **`limits`**, the layout's size limits (`[ width_min, width_max, height_min, height_max ]`, `null`
  for none), are replaced whole: a window whose layout pins its width (the navigator's `578` /
  `578`) ignores `width` until its limits allow it. A `set` of a field the window's code binds on
  that element (the catalogue's title `caption`) changes nothing and is reported **ineffective**
  (below); bind it with `override: true` instead.
- **`bind`**: `api.templates.bind` as data - see "A binding as data" below.
- **`arrange`**: `api.templates.arrange` as data - see "An arrangement as data" below.
- **`move`** `before` / `after` the element `to` names, or `first` / `last` inside it. The element
  and its children **keep their names**, so the window's code still finds (`findChildByName`) and
  binds them - a title moved from a list into a header still shows the code's caption. Its `x` /
  `y` become its new parent's (set them in a later op). A move into the element or its descendants,
  or to an element the template lacks, is reported and moves nothing; the window itself (`''`) does
  not move.
- **`remove`**: takes the element and its children out.
- **`wrap`**: puts a new element (built like `insert`'s `add`) in the element's place, at its rect
  unless `add` gives one, with the element inside at (0, 0), keeping its children and name so the
  window's code still finds and binds it. The window itself (`''`) is not wrapped.
- **`insert`** `before` / `after` an element, or `first` / `last` inside it. **`like`** starts the new
  element as a copy of one in the template - type, look, input flags (`params`) and children - with
  the given fields over it, so a button "like the help button" is a real button without knowing
  Flash's window flags. Without `like`, give `tag` and the rest yourself. `bindAs` (below) names it
  for the window's code.

An added element is named `<owner>:<name>` (the owner is the plugin's key), so it never collides
with the template's or another plugin's names. Only its owner reaches it by the short name, in later
ops and bindings.

**`bindAs`** instead gives an added element a name the window's code fills but the template lacks,
so the code's own binding reaches it. The catalogue's code puts a `frontpage4` page's text 0 into
`ctlg_txt1`, which `layout_frontpage_featured` lacks; a theme laying that page out as its own front
page places the text where it wants, and panel edits of the text show there:

```ts
{ element: 'ctlg_txt2', insert: 'after', add: { like: 'ctlg_txt2', bindAs: 'ctlg_txt1', y: 240 } }
```

Later ops (any owner's) reach it by that name. A name the template already has, or an earlier patch
took, is a conflict (`property: 'bindAs'`, owners `(template)` or the first owner, then this one)
and the element keeps its owned name (`name`, or `bindAs` without one).

## Many templates at once

A patch's `template` may be a pattern (`*` for any run of characters) to cover a family of windows.
Every catalogue page layout is 360 wide; a theme whose page area holds 342 narrows them all, and the
catalogue sizes its page container by the patched page (`CatalogView`, as Flash takes the page
window's width):

```json
{ "template": "habbo-catalog-com/layout_*", "ops": [ { "element": "", "set": { "width": 342 } } ] }
```

Each page's parts follow the resize by their own `scale` flags; a part pinned to its width is
patched on its own. An op whose element a matched template lacks is a miss on that template.
Bindings and post-layout hooks (a module's and an `arrange` op's) take a pattern too.

The catalogue's navigation rows are as tall as their templates (`normal_topitem_template`,
`normal_subitem_template`, 21 in Habbo's layout): taller rows (`set: { height: 25 }`) get room in an
open branch's list, as `updateChildListHeight` adds up each item's height.

## A layout that follows what a patch adds

Don't add up heights in a patch: the sum breaks when another plugin adds a row or a client release
changes a margin. Set Flash's own layout flags instead (`vars` and `params`), which make a window
follow its content:

- a list with **`resize_on_item_update`** (a `vars` key) takes the length of its items;
- an element with **`reflectToParent`** (`params`, per axis) passes its change of size to its
  parent - a growing list grows its window by as much;
- an element with **`scale`** `stretch` on an axis (`params`) follows its parent's change of size on
  it - a border round the window grows with it; `move` keeps it at the same distance from the far
  edge;
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

The list places the button (no `y`), and the purse is as tall as its four buttons whatever else is
patched in. What the flags cannot say - a frame a margin taller than its list - needs a post-layout
hook (`api.templates.arrange`, below).

## The window's own frame: one address

A patch on a window's root (`''`) restyles its frame, whatever the window's code sets:

```json
{ "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "", "set": { "color": 4288688176, "style": "3", "position": { "x": 84, "y": 153 } } } ] }
```

- **`color`** (`0xAARRGGBB`) tints the frame, **`style`** is its skin (`none` for frameless, below)
  and **`position`** (`{ "x", "y" }` from the desktop's top left, whole pixels) is where the window
  first opens, until the player moves it. These override the window's code: the catalogue colours
  its own frame (`refreshCatalogWindowChrome`), yet a root `color` is drawn. `position` on any other
  element, or on a window whose root is not a frame (the purse's root is a `container`), is
  reported ineffective.
- **A window Nitro draws without a template** (the wired setup window, `wired-setup`) is named by its
  frame's id as the patch's `template`, with the same root ops:
  `{ "template": "wired-setup", "ops": [ { "element": "", "set": { "style": "102", "color": 4282019493 } } ] }`.
  [The skin map](#the-skin-map) lists these windows (`nitro` windows) with their ids and skins. A
  template window's frame id (`catalog`, `navigator`) works the same way.
- **Precedence**, lowest first: what the window's code passes, the hotel's `frame.overrides` (below),
  a patch naming the frame's id, a patch on the template's root. Patches among themselves apply by
  `order`.
- **Moving a piece of the room screen**: a window with no frame of its own (the toolbar, the purse,
  the friend bar, the chat input, the room tools) is drawn where its code puts it. A root `x`/`y`
  offsets it by the new value minus the layout's own, so it still follows its anchor as the screen
  resizes. Not Flash's (its code overwrote the layout's `x`/`y`):
  `{ "template": "habbo-friend-bar-com/new_bar_xml", "ops": [ { "element": "", "set": { "x": -200, "y": -100 } } ] }`
  draws the friend bar 200 px left of and 100 px above its place. The theme studio's room screen
  (`Room screen (HUD)`) does this by dragging a whole piece.

## A window of separately framed panes

A theme can split a core window into panes without copying it: make the window frameless
(`set: { style: 'none' }` on `''`, or `frame.overrides` `"variant": "none"`: no skin, header or
scaler, nothing cropped), then wrap each part in its own `frame` placed anywhere, inside or past the
old rectangle. The code still finds every part by name, and the panes act as one window: a press
anywhere raises it, a pane's header drags it (as Flash's drag trigger drags its nearest drag
target), and an added pane's close button closes it. The catalogue as a page and a separate
navigation frame:

```ts
api.templates.patch('habbo-catalog-com/catalog_ubuntu_with_tabs', [
    { element: '', set: { style: 'none' } },
    { element: 'layoutContainer', wrap: { tag: 'frame', name: 'page', style: '3', margins: [ 6, 6, 6, 6 ] } },
    { element: 'navigationContainer', wrap: { tag: 'frame', name: 'nav', style: '0', caption: 'Shop', margins: [ 6, 28, 6, 6 ] } },
    { element: 'nav', set: { x: 600 } },
]);
```

A wrapped part keeps its position in its pane. Code that places a part from its parent's size checks
`templateWrapperOf`: the catalogue right-aligns its page as Habbo does, but starts it at its pane's
origin when wrapped.

## Where patches come from

- **A plugin with no code** (a theme): `wwwroot/template-patches.json` in its folder. Turbo lists it
  for clients in the merged variable `templates.patches` (`{ "<plugin key>": "<url>" }`) while the
  plugin is loaded; the plugin names it nowhere. Clients load the files at startup and again when
  one changes (Live reload, below).

  ```json
  { "patches": [ { "template": "habbo-toolbar-com/purse_xml", "order": -10, "ops": [
      { "element": "help_button", "set": { "color": 4281244476 } } ] } ] }
  ```

- **A client module**: `api.templates.patch(templateId, ops, { order })`;
  `api.templates.bind(templateId, element, binding)` for what an element it added does (a click, a
  changing caption, a picture), or a `bind` op in its patch for values only; and
  `api.templates.arrange(templateId, fn)`, run after the window's own layout code. All are removed
  when the module stops, and the window draws as before. `api.templates.report(templateId)` gives
  the last application's conflicts, misses and errors, and the ops each owner's patches gave it
  (`ops`).

## A window's context

Some windows give extensions what they show (the infostand: the user shown) as a read-only
**context** of flat values, listed per window below. A module's `patch` ops and `bind` binding may
be a **function of the context** instead of a value:

```ts
api.templates.patch('habbo-room-ui-com/user_view', ctx => (ctx.isOwnUser ? [ { element: 'info_border', set: { color: 0xff2e7d32 } } ] : []));
api.templates.bind('habbo-room-ui-com/user_view', 'badge', ctx => ({ caption: `#${ctx.userId}` }));
```

A function is called once per context, not per render: the patched template is cached per
template, patch list and context values (the last 16 contexts per template), so showing a user
again or redrawing for a new motto reuses it. A template no function patches is patched once. A
throwing function is skipped and reported (`report().errors`); other patches still apply. Keep
context values to what the window shows - they are a cache key.

| Template | Context keys |
| --- | --- |
| `habbo-room-ui-com/user_view` (user infostand) | `type: 'user'`, `userId`, `name`, `figure`, `gender`, `isOwnUser` |
| `habbo-room-ui-com/bot_view` | `type: 'bot'`, `name`, `figure`, `gender` |
| `habbo-room-ui-com/rentable_bot_view` | `type: 'rentable_bot'`, `name`, `figure`, `gender`, `ownerName` |
| `habbo-room-ui-com/pet_view` | `type: 'pet'`, `name`, `figure`, `isOwnPet` |
| `habbo-room-ui-com/furni_view` (furni infostand; `jukebox_view`, `songdisk_view`, `crackable_furni_view` the same) | `type: 'furni'`, `objectId`, `category` (`floor` / `wall`), `typeId` (the furnidata id, -1 for none), `className`, `name`, `description`, `ownerId`, `ownerName` |
| `habbo-groups-com/new_extended_profile` (profile) | `userId`, `name`, `figure`, `isOwnUser` |
| `habbo-new-navigator/navigator_frame_2_xml` (navigator) | `tab` (the selected tab's search code: `hotel_view`, `myworld_view`, `roomads_view`, `official_view`), `searchCode` (the results' search code: the tab's, a category's `category__<name>` once its "more" is pressed, a saved search's; `''` before the first results) |
| `habbo-catalog-com/catalog_ubuntu_with_tabs` (catalogue window) | `layoutCode` (the open page's, `''` before one), `pageId` (`-1` before one), `hasHeaderImage` (the page has its own header picture; otherwise the window binds the room builder's as a fallback), `hasHeaderText` (it has a header description) |
| `habbo-catalog-com/layout_<code>` (a catalogue page) | `layoutCode`, `pageId`, and the keys of the `EMBEDDED` widgets drawn in it: the total price's (`totalPriceWidget`) `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver`, `quantity` while an offer is selected |

Items carry their own context where the code gives one, laid over their window's for the functions
that bind them (an `items` binding of the window, or a binding of the template the item is drawn
from - see "Windows drawn inside another"):

| Item | Context keys |
| --- | --- |
| a catalogue tab (`tab_button` in `catalog_ubuntu_with_tabs`) | `pageId`, `pageName`, `icon` (the node's icon id), `iconUrl` (`catalog.icons.url` for it), `selected` |
| `habbo-catalog-com/productViewWidget` (the product view of a page) | `offerId`, `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver` while an offer is shown |
| `habbo-catalog-com/price_display`, `habbo-catalog-com/priceDisplayWidget` (a price, the price box on a product) | `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver` |

Any other window passes none (`{}`); pass `context` to a window's `TemplateWindow` to give it one.
A theme that shows the search row on two tabs only, and a Create button on My World only:

```ts
api.templates.patch('habbo-new-navigator/navigator_frame_2_xml', ctx => [
    { element: 'search_tools', set: { hidden: ctx.tab !== 'hotel_view' && ctx.tab !== 'roomads_view' } },
    { element: 'create_room', set: { hidden: ctx.tab !== 'myworld_view' } },
]);
```

Habbo's furni infostand shows no description (none of its layouts has a `description_text`). A
theme that prints it above the owner adds a text, fills it from the context and sizes it after the
window's own layout (`arrange`, below):

```ts
api.templates.patch('habbo-room-ui-com/furni_view', [ { element: 'owner_spacer', insert: 'before', add: { name: 'description', like: 'name_text' } } ]);
api.templates.bind('habbo-room-ui-com/furni_view', 'description', ctx => ({ caption: String(ctx.description ?? '') }));
api.templates.arrange('habbo-room-ui-com/furni_view', ({ find, root }) => {
    const text = find(`${api.key}:description`), list = find('infostand_element_list'), border = find('info_border'), view = root();

    if (!text || !list || !border || !view) return;

    text.setHeight(text.textHeight + 5);
    list.setHeight(list.scrollableRegion.height);
    border.setHeight(list.height + 20);
    view.setHeight(view.scrollableRegion.height);
});
```

## Binding the window's own elements

`bind` reaches the elements a module added. With **`{ override: true }`** it reaches one the
window's code binds, named as the code names it, and wins over the code's binding for each field it
sets, so a theme can recolour, hide or retitle what the code sets each render. That alone is no
conflict; a field two modules' overrides set is: the last wins and the conflict is reported with
its owners in order (`(window)` first when the code sets it too, then the modules), in `report()`
and on the console when it changes. Without `override` the v1 rule stands: a module binds only what
it added.

### Rows of a list

Rows a window's code adds to a list (a clone per room, `TemplateItem`) carry their own bindings, so
a window binding does not reach them. With **`{ items: true }`** the element is bound in each clone
that has it instead (with `override`, over the code's row binding), and a binding function is also
given the clone: `item.key` (the code's key, a room's id), `item.index` (its place in its list,
from 0) and `item.list` (the list's name). Rows alternating a theme's own colours:

```ts
api.templates.bind('habbo-new-navigator/navigator_frame_2_xml', 'navigator_entry_row_container',
    (ctx, item) => ({ color: (item!.index % 2) ? 0xffffffff : 0xffdee4f2 }), { override: true, items: true });
```

A clone whose prototype lacks the element (another list's rows) is not bound and is no miss. A field
two modules set is one conflict for all rows, logged and reported once. The function runs on every
row draw (the index changes with the list), so keep it to arithmetic on `item` and the context.
Without item bindings, rows draw as before.

```ts
api.templates.bind('habbo-room-ui-com/user_view', 'name_text', ctx => ({ color: ctx.isOwnUser ? 0x8fd14f : 0xffffff }), { override: true });
```

A theme draws the catalogue's tabs as icons: a bitmap added to the tab template, bound per tab from
the tab's context (`tab_button`'s caption can be hidden the same way):

```ts
api.templates.patch('habbo-catalog-com/catalog_ubuntu_with_tabs', [
    { element: 'tab_button', insert: 'last', add: { tag: 'bitmap', name: 'icon', x: 4, y: 3, width: 20, height: 20 } },
]);
api.templates.bind('habbo-catalog-com/catalog_ubuntu_with_tabs', 'icon', ctx => ({ asset: String(ctx.iconUrl) }), { items: true });
```

### Windows drawn inside another

Some windows are drawn inside another as one of its items: a catalogue page's widget views
(`productViewWidget`, `purchaseWidget`, `itemGridWidget`, built into the page's window by
`attachWidgetView`), each grid item, a price. A template's bindings (`override` ones too) reach
these as they reach a standalone window, the function given the window's context with the item's
own over it:

```ts
// The product's name black whatever the preview shows, and a price box in the currency's colour.
api.templates.bind('habbo-catalog-com/productViewWidget', 'ctlg_product_name', { color: 0x000000 }, { override: true });
api.templates.bind('habbo-catalog-com/priceDisplayWidget', '', ctx => ({ color: (Number(ctx.priceInCredits) > 0) ? 0xe2ae1d : 0x6c6b6b }), { override: true });
```

## A binding as data: `bind`

A theme with no code (a plugin's `template-patches.json`, a hotel's patch in the admin panel) binds
an element with a **`bind` op**, the data form of `api.templates.bind`. Its values are data, with
placeholders filled each time the window (or row) is drawn:

| Placeholder | Is |
| --- | --- |
| `${ctx.<key>}` | the window's context key (the table above); in a row, the row's own over it, as a binding function is given it |
| `${item.<key>}` | with `"items": true`, the row drawn: `key`, `index` (from 0), `list`, or a key of the row's own context (a catalogue tab's `pageId`, `pageName`, `icon`, `iconUrl`, `selected`) |
| `${text.<key>}` | the text of the key (the key itself while the texts lack it, as Flash shows it) |
| `${style:<name>}` | a theme style property, filled as the file is read (turbo-cloud `docs/plugin-data.md`) |

A value that is exactly one placeholder keeps its type (`"selected": "${ctx.selected}"` is a
boolean, a colour a number); a placeholder inside text is written into it. A **relative `asset`** is
a file beside the patch file: in the plugin's own `wwwroot` (for a hotel's patch, the hotel's own
served files - staff upload them on Plugins > Hotel theme > Images and paste the path shown,
`styles/tab0.png`; for a module's `api.templates.patch`, its base). An absolute address
(`https://...`, `/...`, a `${...}` the window fills from the hotel's variables) is used as is.

The catalogue's tabs drawn as icons by a theme with no code - the bitmap added and bound in one file,
the icons in its `wwwroot/icons/`:

```json
{ "patches": [ { "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "tab_button", "insert": "last", "add": { "tag": "bitmap", "name": "icon", "x": 6, "y": 5, "width": 20, "height": 20 } },
    { "element": "tab_button/icon", "bind": { "asset": "icons/tab${item.index}.png", "tooltip": "${item.pageName}" }, "items": true } ] } ] }
```

The rules are the module `bind`'s:
- **Owner**: the binding is the file's plugin's (the hotel's, `hotel`, for a panel patch). Without
  `override` the op binds an element its owner added, by the short name its `insert` gave it (in any
  patch of the same file); with **`"override": true`**, one the window's code binds, named as the
  code names it, laid over the code's binding for the fields it sets.
- **Order**: bindings - a file's and a module's - are laid by the patch's `order`, then plugin key,
  then as added (a module's `bind` is order 0).
- **Report**: the op is applied when the patched template has its element, otherwise unmatched (a
  console warning and the plugin's client report); two overrides of one field conflict as two
  modules' do. A placeholder with no value for a drawn window (a context key it does not give)
  leaves the field to the window and is reported once (`patch.unmatched`, `<element>:${ctx.key}`).
  An op the client cannot bind (below) is skipped and reported **ineffective** (`patch.ineffective`,
  `<element>:bind`), as is an `asset` that does not load (a 404, a bundle asset no bundle has), with
  a console warning and its address (`<element>:<url>`). Neither counts as applied; an owner none of
  whose ops applied is not reported applied.
- **No nesting**: a placeholder is filled once, from the key as written, so
  `${text.icon.${item.index}}` names no text (the inner one is never filled). Bind the row's own
  value (`icons/tab${item.index}.png`) or one whole key; the check below refuses a nested one.
- **Fields**: `caption`, `htmlText`, `tooltip`, `asset`, `helpPage` (text); `visible`, `background`,
  `greyscale`, `disabled`, `selected`, `italic`, `underline`, `crop` (true or false); `color`,
  `backgroundColor`, `etchingColor`, `alpha`, `blend`, `rotation` (numbers). What a click does stays
  the code's: there is no handler in data. A `bind` op given by a function of the context is an
  error - its values read `${ctx.*}` instead. Before the panel saves it, Turbo's patch check refuses
  an op with an unknown field or placeholder root, a placeholder inside another, or `${item.*}`
  without `"items": true`.

## After the window's layout code

`api.templates.arrange(templateId, (windows, ctx) => { ... })` runs each time a window of the
template is laid out, after its own code's `arrange`, with the same window model
(`windows.find(name)`, `windows.root()`; `setRectangle`, `setHeight`, `textHeight`, ...), for what a
patch cannot say statically - a frame as tall as its list plus a margin. Several modules' hooks run
in the order added; one that throws is skipped, logged once and kept in `report().errors`; a
module's hooks are all removed when it stops.

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

## An arrangement as data: `arrange`

A theme with no code lays an element out after the window's layout with an **`arrange` op**, the
data form of `api.templates.arrange`: each of **`x`**, **`y`**, **`width`**, **`height`** is a
number or a **formula** worked out once the window's own code (and earlier ops) laid it out; the
element takes them in one `setRectangle`, as code sizes it, and a field not given keeps the
element's. A formula reads:

| In a formula | Is |
| --- | --- |
| `${<element>.<measure>}` | an element's `x`, `y`, `width`, `height`, `textWidth` or `textHeight` as laid out so far (an earlier op's change included); the element named as any op names it, one its owner added by its short name |
| `${window.<measure>}` | the window itself (`""` is the window as the op's `element`) |
| `${ctx.<key>}` | the window's context key (`null` when the window does not give it) |
| `${style:<name>}` | a theme style property, filled as the file is read: a number here |
| `12`, `0xff`, `'pets'`, `true`, `false`, `null` | values |
| `+ - * / %`, `== != < <= > >=`, `&& \|\| !`, `a ? b : c`, `( )` | sums, tests and choices, as in JavaScript |
| `min(a, b, ...)`, `max(...)`, `round(a)`, `floor(a)`, `ceil(a)`, `abs(a)` | numbers |
| `oneOf(value, a, b, ...)` | whether `value` is one of the others: `oneOf(${ctx.layoutCode}, 'pets', 'pets2')` |

The catalogue's page under a header picture only some pages have - the picture 290 x 75 when the
page has one, the page under the header's text but on the info layouts:

```json
{ "patches": [ { "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "catalog.header.image", "arrange": { "x": 26, "width": "${ctx.hasHeaderImage} ? 290 : 0", "height": "${ctx.hasHeaderImage} ? 75 : 0" } },
    { "element": "layoutContainer", "arrange": { "y": "!${ctx.hasHeaderImage} ? 0 : ${ctx.hasHeaderText} && !oneOf(${ctx.layoutCode}, 'pets', 'pets2', 'pets3', 'trophies') ? ${catalog.header.description.y} + ${catalog.header.description.textHeight} + 8 : ${catalog.header.image.y} + 83" } },
    { "element": "layoutContainer", "arrange": { "height": "436 - ${layoutContainer.y}" } } ] } ] }
```

The second op on `layoutContainer` reads the `y` the first gave it: the fields of one op are worked
out from the window before it, ops in their order. The rules are the module `arrange`'s and the
`bind` op's:
- **Owner and order**: the op runs after the window's own `arrange`, with the module hooks and other
  files' ops by the patch's `order`, then plugin key, then as added (a module's `arrange` is order 0).
- **Report**: the op is applied when the patched template has its element and every element its
  formulas read, otherwise unmatched (naming the missing one). A field whose formula gives no number
  for a drawn window (an element that is not there, a sum over a context key the window does not
  give) keeps the layout's and is reported once (`patch.unmatched`, `<element>:arrange:<what>`). An
  op the client cannot run (an unknown field, function or measure, a broken formula, `${item.*}` or
  `${text.*}`, a placeholder inside another, a formula longer than 500 characters, nested deeper than
  32 - brackets, calls, choices and signs inside one another - or a call with more than 16 values)
  is skipped and reported **ineffective** (`<element>:arrange`); Turbo's patch check refuses it
  before the panel saves it, with the same sentence.
- An `arrange` op given by a function of the context is an error: its formulas read `${ctx.*}`
  instead. Code is still the tool for what a formula cannot say: a loop over rows, a value the
  window's context does not give.

## Windows as data

A plugin with no code can bring its own windows: each `wwwroot/windows/<name>.json` in its folder
(`<name>`: small letters, digits, `-`, `_`). Turbo lists them for clients in the merged variable
`templates.windows` (`{ "<plugin key>/<name>": "<url>" }`) while the plugin is loaded; the plugin
names them nowhere. The panel's Theme studio makes them (**New window**: from a starter, blank, or a
copy of a game window) in the theme staff work on.

```json
{ "title": "Welcome",
  "template": { "name": "welcome", "width": 310, "height": 190, "elements": [
    { "tag": "frame", "name": "window", "x": 0, "y": 0, "width": 310, "height": 190, "style": "3",
      "caption": "Welcome", "margins": [ 1, 30, 1, 1 ], "vars": {}, "children": [
        { "tag": "static_bitmap", "name": "image", "x": 10, "y": 10, "width": 90, "height": 90,
          "vars": { "asset_uri": "styles/frank.png" }, "children": [] },
        { "tag": "button_thick", "name": "close_button", "x": 92, "y": 118, "width": 126, "height": 28,
          "style": "3", "caption": "Close", "vars": {}, "children": [] } ] } ] },
  "buttons": { "close_button": { "close": true } },
  "entries": [ { "where": "memenu", "caption": "Welcome" } ] }
```

- `template` is a template in the template bundles' shape (`templateData.ts`), drawn like any
  template window from the window manager's skins, so it looks like the game's. Its id is
  **`<plugin key>/windows/<name>`**: patches, bindings, arranges and the inspector reach it by that
  id as they reach `<library>/<asset>`. A relative `asset_uri` is a path in the plugin's `wwwroot/`
  (`styles/frank.png`), as in a patch file; `${image.library.url}...` is filled from the hotel's
  variables.
- `buttons`: what a named element does when clicked - `{ "close": true }` closes the window,
  `{ "link": "<link>" }` opens an in-client link (`navigator/goto/<room>`, `habbopages/<page>`,
  another window's `window/<plugin key>/<name>`; `event:` in front is read too),
  `{ "show": "<element>" }` shows that element and hides the others the window's buttons show - tabs,
  each showing its page (the first named is shown as it opens, and the shown page's button is
  selected). The frame's close button closes it.
- `entries`: where players open it from - `{ "where": "memenu", "caption": "..." }` an entry in the me
  menu, `{ "where": "toolbar", "icon": "<image>", "tooltip": "..." }` an icon in the bottom bar.
- The link **`window/<plugin key>/<name>`** opens it from anything that opens a link: a notice's or
  the hotel view's button, a catalogue page, a habbo page (`event:window/hotel/welcome`), the
  server's in-client link.

The admin API refuses a file no client could draw (turbo-cloud `docs/plugin-data.md`); a file that
reaches a client anyway and is no window is logged and skipped. Its entries and window are listed by
the plugin's key with the modules' (`theme/dataWindows.ts`,
`commands/client-modules/dataWindowCommands.ts`).

## Windows drawn without a template

Windows Nitro draws with a `Frame` of its own (the wired setup window) have no elements to patch;
a patch naming the frame's id restyles their frame ([above](#the-windows-own-frame-one-address)). The
hotel variable **`frame.overrides`** does the same, below every patch:

```json
{ "frame.overrides": { "wired-setup": { "variant": "0", "color": "#3a6ea5" } } }
```

An entry is keyed by the frame's id (the window's desktop id: `wired-setup`), or by the window's
layout name for a template's root frame; `variant` is the frame style, `color` its tint
(`#rrggbb`, `0xRRGGBB` / `0xAARRGGBB` or a number). `position` (`{ "x": 84, "y": 153 }`, from the
desktop's top left) is where any framed window first opens, the catalogue (`catalog`) included,
until the player moves it. The navigator (`navigator`) opens where the server's preferences put it,
as in Flash (`NavigatorView.setInitialWindowDimensions`); the theme's position overrides them until
the player drags the window in that browser, then their saved place wins. Opened at the theme's
position, the window's place is sent to the server only once the player moves or resizes it, so a
place saved on another device is kept. The window's code supplies defaults for what an entry
omits. Turbo merges each plugin's entries in (turbo-cloud `docs/extensions.md`).

```json
{ "frame.overrides": { "catalog": { "position": { "x": 84, "y": 153 } } } }
```

## A theme's skins

What a theme's variants (its `theme-variants.json`) and its module windows can say beyond Habbo's:

- **`tintMode`** on a variant (or a `Frame` / `Border` / `Header`'s prop): `multiply` (the client's
  `ColorTransform`, the default) or `subtract`, each channel the colour less the art's darkness
  (`colour - (255 - value)`): white art takes the colour, black stays, a grey comes out darker
  (#e0e0e0 under #6fa6e2: #5087c3, multiply's #6192c6). For art drawn for that tint; the tinted copy
  is made once per art and colour.
- A header variant's **`captionPadding`**: the caption's margin either side (8 in Habbo's layouts),
  and **`closeAt`** (from the header's top right) inside the header's box: a press reaches nothing
  past it, so a negative inset is drawn at the edge and warned about; widen the header (a border) to
  place the button further out.
- A `Frame`'s `textColor` colours its header's caption as well as its text.
- `RichText`'s `listMarker` (`{ align: 'right', gap }`: the marker right-aligned `gap` pixels before
  the text, as a browser draws an `li`); an editor's blank line (`<p><br></p>`) is kept, a line per
  break.

## The previewer's room

The room every object showcase draws in (the catalogue's product view, the inventory's preview) is
Flash's floor `110` and wall `99999` (`RoomPreviewer.createRoomForPreviews`). The hotel variable
**`room.previewer`** names other plane types, read when a previewer room is first made:
`{ "room.previewer": { "floorType": "101", "wallType": "101", "landscapeType": "1.1" } }`.
The catalogue keeps one showcase room while it lives (`HabboCatalog.initializeRoomPreviewer`) and,
as in Flash, a previewed floor, wallpaper or view paints it for later previews: an item is added to
the room as it is (`ProductViewCatalogWidget.onPreviewProduct` sets the planes for a room pattern
only), so a page shown after Spaces draws its items in the pattern last previewed (on the hotel view
floor `101` and the wallpaper's; in a room, the room's own). `room.previewer`'s look holds only
until a pattern is first previewed.

## Replacing one bitmap of a library

The hotel variable **`asset.overlays`** replaces single bitmaps of a template library - one frame's
art, one icon - instead of a theme shipping a copy of the whole library:

```json
{ "asset.overlays": {
    "habbo-window-manager-com/theme-habbo-frame-frame-default": "/gamedata/plugins/mytheme/frame.png?v=...",
    "habbo-room-ui-com/roomtools_gear": "https://cdn.example.com/gear.png" } }
```

The asset is named as the library's bundle names it: a bitmap of the library's own by its asset
name, a sprite of the window manager library's theme sheet (`theme.png`: every frame, button and
border skin) by its sprite name, `theme-...` (the frames of the bundle's `theme_spritesheet.json`).
The bitmap loads with the library's bundle and replaces the library's before anything draws it, in
a frame's nine-slice and shadow alike. Keep its size: a frame's slice rects are the sheet sprite's
(another size is used and logged). One that fails to load is logged and the library's own stays. A
plugin names a file of its `wwwroot/` by path (`"frame.png"`); Turbo gives clients its address.
Staff need no file of their own: Turbo's base theme `habbo` names the common frame and border
sprites as image styles (turbo-cloud `docs/plugin-data.md`), so Plugins > Hotel theme uploads their
art, and a theme with `"extends": "habbo"` gets it as defaults.

**An overlay re-skins every window drawing that skin**, not only the one you looked at. A sprite is
the art of a skin - a component's style: `border` style `9`, `frame` style `3` - and some sprites
are the art of several (`theme-habbo-frame-frame-default` is frames 0, 1 and 2). Replace the purse's
border-9 art and the "Start your Habbo Journey" box, also border 9, changes with it; the skin map
below lists every window a skin is drawn in. To change one window alone, give it another skin (a
patch's `style`, or `frame.overrides`' `variant` for a frame) or its own colour.

### The skin map

`skins.json`, served with the client (`<client>/skins.json`), lists every skin of the theme (the
sprites it draws with their size and nine-slice, its default tint, and the template windows and
element keys that draw it) and every sprite with the skins it is in. Windows Nitro draws without a
template are listed by frame id with the key `''` (`"wired-setup": [ "" ]` under `frame:0`,
`frame:3` and `frame:102`, the frame styles of the wired styles), the address a patch names them by;
an id the code builds at runtime is a pattern (`wired-reward-*`):

```json
{ "skins": { "border:9": {
    "component": "border", "style": "9", "tintColor": "#686661",
    "sprites": [ { "part": "layer", "sprite": "theme-habbo-border-9-border-9-default",
        "overlay": "habbo-window-manager-com/theme-habbo-border-9-border-9-default",
        "width": 15, "height": 16, "slice": { "left": 7, "top": 7, "right": 7, "bottom": 8 } } ],
    "windows": { "habbo-toolbar-com/purse_xml": [ "@0" ], "...": [] } } },
  "sprites": { "theme-habbo-frame-frame-default": { "width": 27, "height": 46, "skins": [ "frame:0", "frame:1", "frame:2" ] } } }
```

A skin is the element's own `style`, else the one the components around it hand down (a frame's
header and close button take the frame's), else `0`; a window's code may set another as it draws.
The client's build writes the file from the template bundles its `nitro-config.json` names
(`tools/skin-map.mjs`, run by `vite.config.ts`; the development server makes it on the first
request). A hotel that publishes other bundles runs the tool against them:
`node tools/skin-map.mjs --from <bundles url with %libname% | folder> --out <client>/skins.json`.

The same run writes `template-index.json` (`<client>/template-index.json`): every template
window's element tree, each element with its key (what a patch's `element` or a binding names it
by; none for an element no key reaches), tag, name, style, tags (`#icon`), rect
(`[x, y, width, height]`), caption, `hidden`, and the text keys its caption and variables show
(`texts`); under `frames`, the frame ids of the windows Nitro draws itself, with their frame styles:

```json
{ "templates": { "habbo-toolbar-com/purse_xml": { "name": "grid_purse", "width": 230, "height": 77,
    "elements": [ { "key": "", "tag": "container", "rect": [ -38, 0, 230, 77 ], "children": [
        { "key": "@0", "tag": "border", "style": "9", "rect": [ 0, 0, 230, 76 ] },
        { "key": "credit_count_button", "tag": "region", "name": "credit_count_button", "style": "3",
          "rect": [ 0, 19, 52, 19 ], "texts": [ "purse_coins" ] } ] } ] } },
  "frames": { "wired-setup": [ "0", "102", "3" ] } }
```

Beside them, the **window map** (`tools/window-map.mjs`, read from the client's source): `windows`
are what a player sees as a window - a template whose root is a `frame`, a frame Nitro draws itself
(by its frame id), and the main template of a view nothing else holds (the toolbar, the purse, the
infostand) - each with its English `name` (its caption's text, from `--texts` or the config's
`gamedata.urls.externalTexts`), its `area` (Catalogue, Navigator, Inventory, Toolbar & purse, Room,
Chat, Friends & messenger, Groups, Wired, Help & moderation, Games, Hotel view, Loading), its title's
text key (`caption`), the source file that opens it and the `parts` drawn inside it. `parts` lists,
per part (a grid item, a catalogue page layout, a widget, a list row), the windows it is drawn in,
so "shared by 15 windows" is `windows.length`. A part belongs to the windows of the file naming it,
or of the files above it by imports (through the barrels, and only through files importing what
names it). `unused` lists the templates the client never draws; `orphans` those drawn but in no
window.

```json
{ "windows": { "habbo-catalog-com/catalog_ubuntu_with_tabs": { "name": "Catalogue", "area": "Catalogue",
      "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "caption": "catalog.title",
      "source": "views/catalog/CatalogView.tsx", "parts": [ "habbo-catalog-com/badgeGridItem", "..." ] } },
  "parts": { "habbo-catalog-com/badgeGridItem": { "windows": [ "habbo-catalog-com/catalog_ubuntu", "habbo-catalog-com/catalog_ubuntu_with_tabs" ] } },
  "orphans": [], "unused": [ "..." ] }
```

The preview host draws a window in named states (its `ready` lists them: the catalogue's front,
furni and badge display pages) with the game's own view and sample content, so parts are drawn where
they are in the game. Its `report` lists every template drawn (`parts`), and a press reports the
window, the part the element is in, the template and key naming it there (inside a badge:
`badgeGridItem`, `badgeWidget`, so a patch made from it changes the part) and the path to it.

A window editor asks it for every element at once (`{ window: 'design', boxes: true }`) and gets
`boxes` each time one moves (until `boxes: false`): every element a key reaches in the window and
what is drawn inside it, named in its own template, with each drawing's position in page CSS pixels
(each of a list's rows) and its tag, name and tags. The admin panel's Theme studio draws its
multi-select outlines, marquee, guides to other elements and debug rects, names and tags from them.
A draft's patch file may name `base`, where its owner's files are: a theme the hotel gives no player
yet has no entry in `templates.patches`, and a picture its ops bind by a relative path
(`styles/logo.png`) is read beside it.

The admin panel's **Windows & skins** page (Plugins > Windows & skins) reads these files through the
server, so the element tree, skins and text keys are there without the inspector. Windows Nitro
draws with React components rather than a template use the same skins but are not listed.

The extension inspector reads the same: an Alt-clicked element's card shows its `style`, each skin
it draws (its own, then those drawn inside it: a frame's header, close button, scaler) with every
sprite's name, size and nine-slice, and how many windows draw that skin. **Alt+Shift-click** puts
the `asset.overlays` entry of its skin's sprites on the clipboard instead of the patch, each named
after a file for your theme to ship:

```json
{ "asset.overlays": { "habbo-window-manager-com/theme-habbo-border-9-border-9-default": "habbo-border-9-border-9-default.png" } }
```

In a development build, once the windows settle (5 s after the last new sprite was drawn), the
console says what each theme sheet overlay re-skins: the skins and the windows drawing them, or,
for one no window drawn since page load uses, a warning naming its skins and the sprites of that
kind the open windows do draw (the catalogue's `theme-habbo-frame-3-frame-3-default 64x64` when
you overlaid frame 0's). An overlay naming a sprite no skin draws is warned about too. Production
builds compile the check out.

### Recipe: restyle a frame or a border

1. Open the window and Alt-click its frame or border (a development build needs `NitroInspector()`
   first; staff need `client.inspector`). The card names the skin (`frame 3` for the catalogue,
   `border 9` for the purse) and its sprites: `theme-habbo-frame-3-frame-3-default 64x64,
   nine-slice 10,33,10,10 (layer)` and its `-plain` twin (the untinted pieces). The `-plain` twin is
   drawn **over** the tinted layer: leave it transparent wherever the window's colour should show (an
   opaque copy hides the colour; a development build's console warns when a `-plain` overlay is
   opaque over more than a quarter of its tinted art).
2. Read "drawn by N windows": that is everything your art will change.
3. Alt+Shift-click to copy the overlay entry. Draw each sprite at the size the card gives, keeping
   the nine-slice corners where they were (the slice rects are the sheet's), and save it under the
   name in the entry.
4. Put the files in your plugin's `wwwroot/` and the entry in its `gamedata/external_variables.json`
   (or a `theme.json` image property with that `overlay`, so staff can swap it: turbo-cloud
   `docs/plugin-data.md`). A frame's art is tinted by the window's colour (`colorize` pieces), so
   paint it light, or set the colour with `frame.overrides`.
5. Reload the client: the console notes every window the overlay re-skins.

## Order, conflicts, misses

Patches apply by `order` (lower first; a base theme takes a negative one), then plugin key, then as
added - never by load timing. When two owners set the same property of the same element, the later
wins and the conflict is logged (`TemplatePatches`) and kept in the report; so with two owners'
`arrange` ops on one field of one element (`property: 'arrange.<field>'`): they run in the same
order, so the later one's rect is kept. An op whose element the template lacks (a renamed element
in a new client release) is skipped with a console warning and reported; the others still apply.
An op that matched but changes nothing drawn (a field the code binds on that element, a `position`
off the window's own frame, a `bind` the client cannot bind or whose `asset` does not load) is a
console warning and reported **ineffective** (`patch.ineffective`, reason `<element>.<field>`,
`<element>:bind`, `<element>:<url>`) once the window is drawn, and not counted as applied. Each
owner's applied, unmatched, ineffective and clashing ops, and its code that threw (context ops, a
binding, a post-layout hook: `module.failed`), also go to a Turbo server's extension inspector
(`TurboClientExtensionReportComposer`, part of `client.modules`), whose log names the miss and whose
admin panel lists it on the plugin. A hotel drops a plugin's file with an empty url in its own
`templates.patches`.

## Live reload

When staff change the look a player draws - their theme's patches, style values, images, fonts, the
hotel's texts, or which theme they get - Turbo sends the named message `turbo.theme.changed { theme,
revision, url }` (turbo-cloud `docs/plugin-data.md`, "Live reload"), and `theme/themeLive.ts` reads
the look at `url` (`{ theme, variables }`) and redraws what changed in the open windows, with no
reload and the room session kept:

| Changed | Drawn by |
| --- | --- |
| `templates.patches`, `templates.styles` | `loadTemplatePatchFiles` (a file at a new address replaces its owner's last once loaded; every file is read again when style values change); open template windows are patched again as they read the patch list |
| `asset.overlays` | `reapplyAssetOverlays`: reloads each bitmap whose overlay changed, puts one no longer named back to the library's own (kept when first replaced), registers the theme sheet's sprites again; then `notifyThemeArtChanged`, and every component reading a texture through the theme's hooks redraws in place - a window keeps its place, order, scroll and typed text |
| `frame.overrides` | `Frame`, which reads it from the variables |
| `text.fonts`, `text.styles.overrides`, `text.faces.overrides` | `loadTextFonts` and the overrides set again; template windows drawn anew |
| `templates.windows` | `loadDataWindows`: the plugins' windows as data read again |
| `gamedata.urls.externalTexts`, `text.overrides` | `reloadHotelTexts`: the hotel's texts with the theme's own over them; those that changed laid over the shown, key by key |

A burst of messages draws only the last. `asset.bundles.templates.overrides` and `loading.screen`
are read at the next load.

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
  `utils/assetOverlays.ts` (reading `asset.overlays`), `template/templateSkins.ts` (the skin map:
  `templateElementSkins`, `themeSkinSprites`, `buildSkinMap`; tested in `packages/nitro-theme/test`),
  `tools/skin-map.mjs` (writes `skins.json`); nitro-react `utils/skinMap.ts` (fetches it) and
  `utils/assetOverlayCheck.ts` (the development build's overlay check); nitro-react
  `utils/assetOverlays.ts` (applied by `loadAssetBundle`; a template of a library waits for its
  overlays; `reapplyAssetOverlays` for live reload), the theme sheet's overlaid sprites sliced from
  their own bitmap (`themeAssetBundle.ts`); nitro-react `theme/themeLive.ts` (live reload).

React Compiler: memoised code recomputes only on what it reads, so patch state reaches components as
a value they read (a `useSyncExternalStore` snapshot), never as a version number only listed as a
dependency. The theme's texture hooks (`usePixiTexture`, `usePixiEffectTexture`) opt out
(`'use no memo'`): the compiler would keep a key's texture, and art changed in place is another
texture under the same key.

## Not yet

- A window as data keeps no state beyond the page its tabs show: lists filled from the server and
  inputs need a client module.
- Windows Nitro draws with React components rather than a template have no elements to patch: only
  their frame changes, by a root patch naming its id or `frame.overrides`.
- `room.previewer` is read as the client starts: a change reaches a player at their next load.
- A template's extension `arrange` runs for windows drawn on their own, not yet for one drawn as
  another window's item (a catalogue widget's view): arrange the page's window instead.
