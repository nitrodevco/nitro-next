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
or a development build after `NitroInspector()` in the browser console - off by default, on at once
with no reload, remembered in localStorage until `NitroInspector(false)`; the console says which it is,
and an alt-click that finds no template element says so too): the extension inspector shows the template id, the element's key, its
type, style, rect and the elements it is in, the skins it draws (their sprites and sizes, see
[the skin map](#the-skin-map)), the patches on it and on what holds it, and puts a patch for
it on the clipboard (also logged as `[Inspector]`) - Alt+Shift-click its skin's overlay entry. A patch whose ops are a function of the window's
context (below) is listed with the ops it gives the window clicked. Nitro Studio's template preview
and the library's `templates.json` have the same names.

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
  merged by key). `params` are the layout flags (`TemplateParams`): `scale` (how the element follows
  its parent's resize, per axis: `fixed`, `move`, `stretch`, `center`), `align`, `accommodate`,
  `boundToParent`, ... - a widened element stops stretching with `scale: [ 'fixed', 'fixed' ]`.
  Behaviour is not a layout property: what a click does stays the window's code's. Resizing the
  window itself (`''`) resizes its layout by as much, so it is drawn and hit at its new size.
  **`limits`** are the layout's size limits, `[ width_min, width_max, height_min, height_max ]`
  (`null` for none), replaced whole: a window its layout pins to one width (the navigator's
  `578` / `578`) keeps that width whatever `width` says until its limits let it go.
  What the window's code sets on an element is what it draws: a `set` of a field its code binds there
  (the catalogue's title `caption`) changes nothing and is reported **ineffective** (below) - give the
  element a binding with `override: true` instead.
- **`bind`**: what `api.templates.bind` does, written as data - see "A binding as data" below.
- **`arrange`**: what `api.templates.arrange` does, written as data - see "An arrangement as data" below.
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
  Flash's window flags. Without `like`, give `tag` and the rest yourself. `bindAs` (below) names it
  for the window's code.

An added element is named `<owner>:<name>` (the owner is the plugin's key), so it never meets a name
of the template's or of another plugin's. The owner reaches it by its short name in later ops and
in bindings; nobody else can.

**`bindAs`** instead gives an added element a name the window's code fills but the template lacks, so
the code's own binding reaches it. The catalogue's code puts a `frontpage4` page's text 0 into
`ctlg_txt1`, which `layout_frontpage_featured` has no field for; a theme laying that page out as its
own front page shows the text where it wants it, and a panel edit of the page's text shows there:

```ts
{ element: 'ctlg_txt2', insert: 'after', add: { like: 'ctlg_txt2', bindAs: 'ctlg_txt1', y: 240 } }
```

Later ops (any owner's) reach it by that name. A name the template already has, or that an earlier
patch took, is a conflict (`property: 'bindAs'`, owners `(template)` or the first owner, then this
one) and the element keeps its owned name (`name`, or `bindAs` without one).

## Many templates at once

A patch's `template` may be a pattern, `*` standing for any run of characters: one patch for a family
of windows. Every catalogue page layout is 360 wide; a theme whose page area holds 342 narrows them
all, and the catalogue sizes its page container by the patched page (`CatalogView`, as Flash takes
the page window's width):

```json
{ "template": "habbo-catalog-com/layout_*", "ops": [ { "element": "", "set": { "width": 342 } } ] }
```

Resizing the window itself resizes its layout by as much, so each page's parts follow by their own
`scale` flags; a part pinned to its width is patched on its own. An op whose element a matched
template lacks is a miss on that template, as for any patch. Bindings and post-layout hooks (a
module's and an `arrange` op's) take a pattern too.

The catalogue's navigation rows are as tall as their templates (`normal_topitem_template`,
`normal_subitem_template`, 21 in Habbo's layout): a theme's taller rows (`set: { height: 25 }`) give an
open branch's list room for them, as `updateChildListHeight` adds up each item's height.

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

## The window's own frame: one address

A patch on a window's root (`''`) restyles its frame, whatever the window's code sets:

```json
{ "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "", "set": { "color": 4288688176, "style": "3", "position": { "x": 84, "y": 153 } } } ] }
```

- **`color`** (`0xAARRGGBB`) tints the frame, **`style`** is its skin (`none` for frameless, below) and
  **`position`** (`{ "x", "y" }` from the desktop's top left, whole pixels) is where the window first
  opens - where the player has moved it since still wins. They go over what the window's code sets:
  the catalogue colours its own frame (`refreshCatalogWindowChrome`), and a root `color` is drawn
  anyway. `position` means nothing on any other element, or on a window whose root is no frame (the
  purse's root is a `container`): it is reported ineffective.
- **A window Nitro draws without a template** (the wired setup window, `wired-setup`) is named by its
  frame's id as the patch's `template`, with the same root ops:
  `{ "template": "wired-setup", "ops": [ { "element": "", "set": { "style": "102", "color": 4282019493 } } ] }`.
  The skin map lists these windows, their ids and skins (`nitro` windows, [the skin map](#the-skin-map)).
  A template window's frame id (`catalog`, `navigator`) works the same way.
- **Precedence**, lowest first: what the window's code passes, the hotel's `frame.overrides` (below),
  a patch naming the frame's id, a patch on the template's root. Patches among themselves apply by
  `order` as every patch does.
- **Moving a piece of the room screen**: a window with no frame of its own is drawn where its code
  puts it (the toolbar, the purse, the friend bar, the chat input, the room tools). A root `x`/`y`
  moves it that far from there - the root's new value minus the layout's own - so it keeps following
  its anchor as the screen resizes. Not Flash's (its code overwrote the layout's `x`/`y`):
  `{ "template": "habbo-friend-bar-com/new_bar_xml", "ops": [ { "element": "", "set": { "x": -200, "y": -100 } } ] }`
  draws the friend bar 200 px left of and 100 px above its place. The theme studio's room screen
  (`Room screen (HUD)`) does this by dragging a whole piece.

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

A wrapped part keeps its own position in its pane. A window's code that places a part from its parent's
size asks whether a patch wrapped it (`templateWrapperOf`): the catalogue right-aligns its page in the
window as Habbo does, and starts it at its pane's origin when a theme wrapped it in one.

## Where patches come from

- **A plugin with no code** (a theme): `wwwroot/template-patches.json` in its folder. Turbo lists it
  for clients in the merged variable `templates.patches` (`{ "<plugin key>": "<url>" }`) while the
  plugin is loaded; the plugin names it nowhere. Clients load the files as they start, and again
  when the file changes (Live reload, below).

  ```json
  { "patches": [ { "template": "habbo-toolbar-com/purse_xml", "order": -10, "ops": [
      { "element": "help_button", "set": { "color": 4281244476 } } ] } ] }
  ```

- **A client module**: `api.templates.patch(templateId, ops, { order })`, and
  `api.templates.bind(templateId, element, binding)` for what an element it added does (a click, a
  caption that changes, a picture) - or, for values only, a `bind` op in its patch. `api.templates.arrange(templateId, fn)` runs after the window's
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
| `habbo-room-ui-com/furni_view` (furni infostand; `jukebox_view`, `songdisk_view`, `crackable_furni_view` the same) | `type: 'furni'`, `objectId`, `category` (`floor` / `wall`), `typeId` (the furnidata id, -1 for none), `className`, `name`, `description`, `ownerId`, `ownerName` |
| `habbo-groups-com/new_extended_profile` (profile) | `userId`, `name`, `figure`, `isOwnUser` |
| `habbo-new-navigator/navigator_frame_2_xml` (navigator) | `tab` (the selected tab's search code: `hotel_view`, `myworld_view`, `roomads_view`, `official_view`), `searchCode` (the results' search code: the tab's, a category's `category__<name>` once its "more" is pressed, a saved search's; `''` before the first results) |
| `habbo-catalog-com/catalog_ubuntu_with_tabs` (catalogue window) | `layoutCode` (the open page's, `''` before one), `pageId` (`-1` before one), `hasHeaderImage` (the page has a header picture of its own: the window binds the room builder's as a fallback otherwise), `hasHeaderText` (it has a header description) |
| `habbo-catalog-com/layout_<code>` (a catalogue page) | `layoutCode`, `pageId`, and the keys of the `EMBEDDED` widgets drawn in it: the total price's (`totalPriceWidget`) `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver`, `quantity` while an offer is selected |

Items carry a context of their own where the code gives one, laid over their window's for the
functions that bind them (an `items` binding of the window, or a binding of the template the item is
drawn from - see "Windows drawn inside another"):

| Item | Context keys |
| --- | --- |
| a catalogue tab (`tab_button` in `catalog_ubuntu_with_tabs`) | `pageId`, `pageName`, `icon` (the node's icon id), `iconUrl` (`catalog.icons.url` for it), `selected` |
| `habbo-catalog-com/productViewWidget` (the product view of a page) | `offerId`, `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver` while an offer is shown |
| `habbo-catalog-com/price_display`, `habbo-catalog-com/priceDisplayWidget` (a price, the price box on a product) | `priceInCredits`, `priceInActivityPoints`, `activityPointType`, `priceInSilver` |

Any other window passes none (`{}`); a window is given one by passing `context` to its `TemplateWindow`.
A theme that shows the search row on two tabs only, and a Create button on My World only:

```ts
api.templates.patch('habbo-new-navigator/navigator_frame_2_xml', ctx => [
    { element: 'search_tools', set: { hidden: ctx.tab !== 'hotel_view' && ctx.tab !== 'roomads_view' } },
    { element: 'create_room', set: { hidden: ctx.tab !== 'myworld_view' } },
]);
```

Habbo's furni infostand shows no description (none of its layouts has a `description_text`). A theme
that prints it above the owner adds a text and fills it from the context, sized after the window's own
layout (`arrange`, below):

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
window's code binds itself, named as the code names it: the module's binding is laid over the
code's, and for each field it sets the module's value is used - a theme can recolour, hide or retitle
what the code sets each render. Laying it over the code's is what `override` asks for, so that alone
is no conflict. A field two modules' overrides set is: the last one's value is used and it is reported,
its owners in order (`(window)` first when the code sets it too, then the modules), in `report()` and
on the console when it changes. Without `override` the v1 rule stands: a module binds only what it added.

### Rows of a list

The rows a window's code adds to a list (a clone per room, `TemplateItem`) carry bindings of their
own, so a binding of the window does not reach them. With **`{ items: true }`** the element is bound
in each clone that has it instead - with `override` over the code's binding of the row - and a
binding function is also given which clone it draws: `item.key` (the code's key, a room's id),
`item.index` (its place in its list, from 0) and `item.list` (the name of the list holding it).
Rows alternate a theme's own colours without a constant of the code's:

```ts
api.templates.bind('habbo-new-navigator/navigator_frame_2_xml', 'navigator_entry_row_container',
    (ctx, item) => ({ color: (item!.index % 2) ? 0xffffffff : 0xffdee4f2 }), { override: true, items: true });
```

A clone whose prototype lacks the element (another list's rows) is not bound and is no miss. Every
row clashing alike, a field two modules set is one conflict, logged and reported once. The function
is called each time a row is drawn - its index changes with its list - so keep it to arithmetic on
`item` and the context. While no item binding is added a window's rows are drawn as before.

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
(`productViewWidget`, `purchaseWidget`, `itemGridWidget` - `attachWidgetView` builds them into the
page's window), each grid item, a price. A template's bindings (`override` ones too) reach those
windows as they reach a window drawn on its own, its function given the window's context with the
item's own over it:

```ts
// The product's name black whatever the preview shows, and a price box in the currency's colour.
api.templates.bind('habbo-catalog-com/productViewWidget', 'ctlg_product_name', { color: 0x000000 }, { override: true });
api.templates.bind('habbo-catalog-com/priceDisplayWidget', '', ctx => ({ color: (Number(ctx.priceInCredits) > 0) ? 0xe2ae1d : 0x6c6b6b }), { override: true });
```

## A binding as data: `bind`

A theme with no code - a plugin's `template-patches.json`, a hotel's patch in the admin panel - binds
an element with a **`bind` op**, which does what `api.templates.bind` does. Its values are data, with
placeholders filled each time the window (or row) is drawn:

| Placeholder | Is |
| --- | --- |
| `${ctx.<key>}` | the window's context key (the table above); in a row, the row's own over it, as a binding function is given it |
| `${item.<key>}` | with `"items": true`, the row drawn: `key`, `index` (from 0), `list`, or a key of the row's own context (a catalogue tab's `pageId`, `pageName`, `icon`, `iconUrl`, `selected`) |
| `${text.<key>}` | the text of the key (the key itself while the texts lack it, as Flash shows it) |
| `${style:<name>}` | a theme style property, filled as the file is read (turbo-cloud `docs/plugin-data.md`) |

A value that is one placeholder keeps its value's type (`"selected": "${ctx.selected}"` is a boolean, a
colour a number); one inside text is written into it. A **relative `asset`** is a file beside the patch
file: the plugin's own `wwwroot` (for a hotel's patch, the hotel's own served files - staff upload them on
Plugins > Hotel theme > Images and paste the path it shows, `styles/tab0.png`; for a module's
`api.templates.patch`, its base). An address of its own - `https://...`, `/...`, a `${...}` the
window fills from the hotel's variables - stays as it is.

The catalogue's tabs drawn as icons by a theme with no code - the bitmap added and bound in one file,
the icons in its `wwwroot/icons/`:

```json
{ "patches": [ { "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "tab_button", "insert": "last", "add": { "tag": "bitmap", "name": "icon", "x": 6, "y": 5, "width": 20, "height": 20 } },
    { "element": "tab_button/icon", "bind": { "asset": "icons/tab${item.index}.png", "tooltip": "${item.pageName}" }, "items": true } ] } ] }
```

The rules are the module `bind`'s:
- **Owner**: the binding is the file's plugin's (the hotel's, `hotel`, for a panel patch). Without
  `override` the op binds an element its owner added, named by the short name its `insert` gave it
  (in any patch of the same file); with **`"override": true`** one the window's code binds, named as
  the code names it, laid over the code's binding for the fields it sets.
- **Order**: bindings - a file's and a module's - are laid by the patch's `order`, then plugin key,
  then as added (a module's `bind` is order 0).
- **Report**: the op counts as applied when the patched template has its element, unmatched (a
  console warning and the plugin's client report) when it does not; two overrides of one field are a
  conflict, as two modules' are. A placeholder with no value for a window drawn (a context key it does
  not give) leaves the field to the window and is said once (`patch.unmatched`, `<element>:${ctx.key}`).
  An op the client cannot bind (below) is skipped and reported **ineffective** (`patch.ineffective`,
  `<element>:bind`), and an `asset` it draws that does not load (a 404, a bundle asset no bundle has) is
  a console warning and reported ineffective with its address (`<element>:<url>`); neither counts as
  applied, and an owner none of whose ops applied is not reported applied at all.
- **No nesting**: a placeholder is filled once, from the key as written, so `${text.icon.${item.index}}`
  names no text (the inner one is never filled). Bind the row's own value (`icons/tab${item.index}.png`)
  or one whole key; the check below refuses a nested one.
- **Fields**: `caption`, `htmlText`, `tooltip`, `asset`, `helpPage` (text); `visible`, `background`,
  `greyscale`, `disabled`, `selected`, `italic`, `underline`, `crop` (true or false); `color`,
  `backgroundColor`, `etchingColor`, `alpha`, `blend`, `rotation` (numbers). What a click does stays
  code's: there is no handler in data. A `bind` op given by a function of the context is an error -
  its values read `${ctx.*}` instead. Turbo's patch check refuses an op with an unknown field or
  placeholder root, a placeholder inside another, or `${item.*}` without `"items": true`, before the panel saves it.

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

## An arrangement as data: `arrange`

A theme with no code lays an element out after the window's layout with an **`arrange` op**, which does
what `api.templates.arrange` does: each of **`x`**, **`y`**, **`width`**, **`height`** is a number or a
**formula** worked out once the window's own code (and earlier ops) laid it out, and the element takes
them in one `setRectangle`, as code sizes it - a field not given keeps the element's. A formula reads:

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

The catalogue's page under a header picture only some pages have, as a theme's module did it in code -
the picture 290 x 75 when the page has one, the page under the header's text but on the info layouts:

```json
{ "patches": [ { "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "ops": [
    { "element": "catalog.header.image", "arrange": { "x": 26, "width": "${ctx.hasHeaderImage} ? 290 : 0", "height": "${ctx.hasHeaderImage} ? 75 : 0" } },
    { "element": "layoutContainer", "arrange": { "y": "!${ctx.hasHeaderImage} ? 0 : ${ctx.hasHeaderText} && !oneOf(${ctx.layoutCode}, 'pets', 'pets2', 'pets3', 'trophies') ? ${catalog.header.description.y} + ${catalog.header.description.textHeight} + 8 : ${catalog.header.image.y} + 83" } },
    { "element": "layoutContainer", "arrange": { "height": "436 - ${layoutContainer.y}" } } ] } ] }
```

The second op on `layoutContainer` reads the `y` the first gave it: the fields of one op are worked out
from the window before it, ops in their order. The rules are the module `arrange`'s and the `bind` op's:
- **Owner and order**: the op runs after the window's own `arrange`, with the module hooks and other
  files' ops by the patch's `order`, then plugin key, then as added (a module's `arrange` is order 0).
- **Report**: the op counts as applied when the patched template has its element and every element its
  formulas read, unmatched (naming the missing one) when it does not. A field whose formula gives no number
  for a window drawn - an element that is not there, a sum over a context key the window does not give -
  keeps the layout's and is said once (`patch.unmatched`, `<element>:arrange:<what>`). An op the client
  cannot run (an unknown field, function or measure, a broken formula, `${item.*}` or `${text.*}`, a
  placeholder inside another, a formula longer than 500 characters, nested deeper than 32 - brackets, calls,
  choices and signs inside one another - or a call with more than 16 values) is skipped and reported
  **ineffective** (`<element>:arrange`); Turbo's patch check refuses it before the panel saves it, with the
  same sentence.
- An `arrange` op given by a function of the context is an error: its formulas read `${ctx.*}` instead.
  Code is still the tool for what a formula cannot say: a loop over rows, a value the window's context
  does not give.

## Windows as data

A plugin with no code can bring windows of its own: each `wwwroot/windows/<name>.json` in its folder
(`<name>`: small letters, digits, `-`, `_`). Turbo lists them for clients in the merged variable
`templates.windows` (`{ "<plugin key>/<name>": "<url>" }`) while the plugin is loaded; the plugin
names them nowhere. The panel's Theme studio makes them (**New window**: from a starter, blank, or a
copy of a window of the game) and writes them into the theme staff work on.

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

- `template` is a template in the shape the template bundles carry (`templateData.ts`): the window
  is drawn as any template window is, from the window manager's skins, so it looks like the game's.
  Its id is **`<plugin key>/windows/<name>`**: patches, bindings, arranges and the inspector reach it
  by that id as they reach `<library>/<asset>`. A relative `asset_uri` is a file of the plugin's
  `wwwroot/` by its path there (`styles/frank.png`), as a patch file's is; `${image.library.url}...`
  is filled from the hotel's variables.
- `buttons`: what a named element does when clicked - `{ "close": true }` closes the window,
  `{ "link": "<link>" }` opens an in-client link (`navigator/goto/<room>`, `habbopages/<page>`,
  another window's `window/<plugin key>/<name>`; `event:` in front is read too), `{ "show": "<element>" }`
  shows that element and hides the others the window's buttons show - tabs, each showing its page
  (the first named is shown as it opens, and the button of the page shown is selected). The frame's
  close button closes it.
- `entries`: where players open it from - `{ "where": "memenu", "caption": "..." }` an entry in the me
  menu, `{ "where": "toolbar", "icon": "<image>", "tooltip": "..." }` an icon in the bottom bar.
- The link **`window/<plugin key>/<name>`** opens it from anything that opens a link: a notice's or
  the hotel view's button, a catalogue page, a habbo page (`event:window/hotel/welcome`), the
  server's in-client link.

The admin API refuses a file no client could draw (turbo-cloud `docs/plugin-data.md`); a file that
reaches a client anyway and is no window is logged and skipped. Its entries and window are listed by
the plugin's key with the modules' (`theme/dataWindows.ts`, `commands/client-modules/dataWindowCommands.ts`).

## Windows drawn without a template

Windows Nitro draws with a `Frame` of its own (the wired setup window) have no elements to patch;
a patch naming the frame's id restyles their frame ([above](#the-windows-own-frame-one-address)). The
hotel variable **`frame.overrides`** does the same, below every patch:

```json
{ "frame.overrides": { "wired-setup": { "variant": "0", "color": "#3a6ea5" } } }
```

An entry is found by the frame's id (the window's id on the desktop: `wired-setup`), or by the
window's name in its layout for a template's root frame; `variant` is the frame style, `color` its
tint (`#rrggbb`, `0xRRGGBB` / `0xAARRGGBB` or a number). `position` (`{ "x": 84, "y": 153 }`, from the
desktop's top left) is where a window first opens - any window with a frame, the catalogue's
(`catalog`) too: where the player has moved it since still wins. The navigator (`navigator`) opens where
the server's preferences put it, as in Flash (`NavigatorView.setInitialWindowDimensions`); the theme's
position goes over them until the player drags the window in that browser, and from then on the
place they saved wins. Opened at the theme's position, it is sent to the server only once the player
moves or resizes it, so a place saved on another device is kept. What the window's code passes stays
the default for what an entry leaves out. Turbo merges each plugin's entries in (turbo-cloud
`docs/extensions.md`).

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
  the text, as a browser draws an `li`); an editor's blank line (`<p><br></p>`) is kept, a line per break.

## The previewer's room

The room every object showcase draws in (the catalogue's product view, the inventory's preview) is
Flash's floor `110` and wall `99999` (`RoomPreviewer.createRoomForPreviews`). The hotel variable
**`room.previewer`** names other plane types of the room's visualization, read when a previewer room
is first made: `{ "room.previewer": { "floorType": "101", "wallType": "101", "landscapeType": "1.1" } }`.
The catalogue keeps one showcase room while it lives (`HabboCatalog.initializeRoomPreviewer`) and, as
Flash does, a floor, wallpaper or view previewed paints it for the previews after it: an item is
added to the room as it is (`ProductViewCatalogWidget.onPreviewProduct` sets the planes for a room
pattern only), so a page shown after Spaces draws its items in the pattern last previewed (on the
hotel view floor `101` and the wallpaper's; in a room, the room's own). Only `room.previewer`'s look
is the room's before any pattern was previewed.

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
(`"frame.png"`); Turbo gives clients its address. Staff need no file of their own: Turbo's base theme
`habbo` names the common frame and border sprites as image styles (turbo-cloud `docs/plugin-data.md`),
so Plugins > Hotel theme uploads their art, and a theme with `"extends": "habbo"` gives it as defaults.

**An overlay re-skins every window drawing that skin**, not only the one you looked at. A sprite is
the art of a skin - a component's style: `border` style `9`, `frame` style `3` - and some sprites
are the art of several (`theme-habbo-frame-frame-default` is frames 0, 1 and 2). Replace the purse's
border-9 art and the "Start your Habbo Journey" box, which is border 9 too, changes with it; the
skin map below lists every window a skin is drawn in. To change one window alone, give it another
skin (a patch's `style`, or `frame.overrides`' `variant` for a frame) or its own colour instead.

### The skin map

`skins.json`, served with the client (`<client>/skins.json`), lists every skin of the theme: the
sprites it draws with their size and nine-slice, its default tint, and the template windows - and
their elements' keys - that draw it, with every sprite and the skins it is in. Windows Nitro draws
without a template are listed by their frame id with the key `''` (`"wired-setup": [ "" ]` under
`frame:0`, `frame:3` and `frame:102`, the frame styles of the wired styles), the address a patch
names them by; an id the code builds as it goes is a pattern (`wired-reward-*`):

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

The same run writes `template-index.json` beside it (`<client>/template-index.json`): every template
window's element tree, each element with its key (what a patch's `element` or a binding names it
by; none for an element no key reaches), tag, name, style, tags (`#icon`), rect (`[x, y, width, height]`), caption,
`hidden`, and the text keys its caption and variables show (`texts`), and under `frames` the frame
ids of the windows Nitro draws itself with their frame styles:

```json
{ "templates": { "habbo-toolbar-com/purse_xml": { "name": "grid_purse", "width": 230, "height": 77,
    "elements": [ { "key": "", "tag": "container", "rect": [ -38, 0, 230, 77 ], "children": [
        { "key": "@0", "tag": "border", "style": "9", "rect": [ 0, 0, 230, 76 ] },
        { "key": "credit_count_button", "tag": "region", "name": "credit_count_button", "style": "3",
          "rect": [ 0, 19, 52, 19 ], "texts": [ "purse_coins" ] } ] } ] } },
  "frames": { "wired-setup": [ "0", "102", "3" ] } }
```

Beside them, the **window map** (`tools/window-map.mjs`, read from the client's source): `windows` are what a
player sees as a window - a template whose root is a `frame`, a frame Nitro draws itself (by its frame id), and
the main template of a view nothing else holds (the toolbar, the purse, the infostand) - each with its English
`name` (its caption's text, from `--texts` or the config's `gamedata.urls.externalTexts`), its `area`
(Catalogue, Navigator, Inventory, Toolbar & purse, Room, Chat, Friends & messenger, Groups, Wired, Help &
moderation, Games, Hotel view, Loading), its title's text key (`caption`), the source file that opens it and
the `parts` drawn inside it; `parts` lists, per part (a grid item, a catalogue page layout, a widget, a list row),
the windows it is drawn in, so "shared by 15 windows" is `windows.length`. A part belongs to the windows of the
file naming it, or of the files above it by imports (through the barrels, and only through files importing
what names it). `unused` lists the templates the client never draws; `orphans` those drawn but in no window.

```json
{ "windows": { "habbo-catalog-com/catalog_ubuntu_with_tabs": { "name": "Catalogue", "area": "Catalogue",
      "template": "habbo-catalog-com/catalog_ubuntu_with_tabs", "caption": "catalog.title",
      "source": "views/catalog/CatalogView.tsx", "parts": [ "habbo-catalog-com/badgeGridItem", "..." ] } },
  "parts": { "habbo-catalog-com/badgeGridItem": { "windows": [ "habbo-catalog-com/catalog_ubuntu", "habbo-catalog-com/catalog_ubuntu_with_tabs" ] } },
  "orphans": [], "unused": [ "..." ] }
```

The preview host draws a window with named states (its `ready` says them: the catalogue's front, furni and
badge display pages) with the game's own view and sample content, so the parts are drawn where they are in
the game; its `report` lists every template drawn (`parts`), and a press says the window, the part the element
is in, the template and key naming it there (inside a badge: `badgeGridItem`, `badgeWidget`, so a patch made
from it changes the part) and the path to it.

A window editor asks it for every element at once - `{ window: 'design', boxes: true }` - and is answered
with `boxes` each time one moves (until `boxes: false`): every element a key reaches in the window and in
what is drawn inside it, each named in its own template, with where each drawing of it is in the page's
CSS pixels (a list's rows each) and its tag, name and tags. The admin panel's Theme studio draws its
multi-select outlines, marquee, guides to the other elements and debug rects, names and tags from them. A
draft's patch file may name `base`, where its owner's files are: a theme the hotel gives no player yet has
no entry in `templates.patches`, and a picture its ops bind by a relative path (`styles/logo.png`) is read
beside it.

The admin panel's **Windows & skins** page (Plugins > Windows & skins) reads these files through the
server, so the element tree, the skins and the text keys are there without the inspector.
Windows Nitro draws with React components rather than a template use the same skins but are not
listed.

The extension inspector reads the same: Alt-click an element and its card shows the element's
`style`, each skin it draws (its own, then those drawn inside it: a frame's header, close button,
scaler) with every sprite's name, size and nine-slice, and how many windows draw that skin.
**Alt+Shift-click** puts the `asset.overlays` entry of its skin's sprites on the clipboard instead of
the patch, each named after a file for your theme to ship:

```json
{ "asset.overlays": { "habbo-window-manager-com/theme-habbo-border-9-border-9-default": "habbo-border-9-border-9-default.png" } }
```

In a development build the console says, once the windows have settled (5 s after the last new
sprite was drawn), what each theme sheet overlay re-skins: the skins and the windows drawing them,
or - for one no window drawn since the page loaded draws - a warning naming the skins it is the
art of and the sprites of that kind the open windows do draw (the catalogue's
`theme-habbo-frame-3-frame-3-default 64x64` when you overlaid frame 0's). An overlay naming a sprite
no skin draws is warned about too. A production build compiles the check out.

### Recipe: restyle a frame or a border

1. Open the window and Alt-click its frame or border (in a development build run `NitroInspector()`
   in the console first; staff need `client.inspector`). The card names the skin, `frame 3` for the
   catalogue, `border 9` for the purse, and its sprites: `theme-habbo-frame-3-frame-3-default 64x64,
   nine-slice 10,33,10,10 (layer)` and its `-plain` twin (the untinted pieces). The `-plain` twin is
   drawn **over** the tinted layer: leave it transparent wherever the window's colour should show (an
   opaque copy of the frame hides the colour; a development build's console warns when a `-plain`
   overlay is opaque over more than a quarter of its tinted art).
2. Read "drawn by N windows": that is everything your art will change.
3. Alt+Shift-click: the overlay entry is on the clipboard. Draw each sprite at the size the card
   gives, keeping the nine-slice corners where they were (the slice rects are the sheet's), and save
   it under the name in the entry.
4. Put the files in your plugin's `wwwroot/` and the entry in its `gamedata/external_variables.json`
   (or a `theme.json` image property with that `overlay`, so staff can swap it: turbo-cloud
   `docs/plugin-data.md`). A frame's art is tinted by the window's colour (`colorize` pieces), so
   paint it light, or set the colour with `frame.overrides`.
5. Reload the client: the console notes every window the overlay re-skins.

## Order, conflicts, misses

Patches apply by `order` (lower first; a base theme takes a negative one), then plugin key, then as
added - never by load timing. When two owners set the same property of the same element the later
one's value is used and the conflict is logged (`TemplatePatches`) and kept in the report. An op
whose element the template does not have (a renamed element in a new client release) is skipped,
a console warning and reported; the others still apply. Two owners' `arrange` ops setting one field of
one element are a conflict too (`property: 'arrange.<field>'`): they run in the same order, so the later
one's rect is kept. An op that matched but changes nothing the
window draws - a field its code binds on that element, a `position` on what is not the window's own
frame, a `bind` the client cannot bind or whose `asset` does not load - is a console warning and reported
**ineffective** (`patch.ineffective`, reason `<element>.<field>`, `<element>:bind`, `<element>:<url>`)
once the window is drawn, and not counted as applied. Each owner's applied, unmatched,
ineffective and clashing ops, and its code that threw (ops of a context, a binding, a post-layout hook: `module.failed`),
also go to a Turbo server's extension inspector (`TurboClientExtensionReportComposer`,
part of `client.modules`), whose log names the miss and whose admin panel lists it on the plugin. A hotel takes a plugin's file away with an empty url in
its own `templates.patches`.

## Live reload

When staff change the look a player draws - their theme's patches, style values, images, fonts, the
hotel's texts, or which theme they get - Turbo sends the named message `turbo.theme.changed { theme,
revision, url }` (turbo-cloud `docs/plugin-data.md`, "Live reload"), and `theme/themeLive.ts` reads the
look at `url` (`{ theme, variables }`) and draws what changed over what is open, keeping the room
session and with no reload:

| Changed | Drawn by |
| --- | --- |
| `templates.patches`, `templates.styles` | `loadTemplatePatchFiles` (a file at a new address replaces its owner's last once it is in; every file read again when the style values changed); open template windows are patched again as they read the patch list |
| `asset.overlays` | `reapplyAssetOverlays`: each bitmap whose overlay changed loaded again, one no longer named put back to the library's own (kept the first time it was replaced), the theme sheet's sprites registered again; then `notifyThemeArtChanged`, and every component reading a texture through the theme's hooks draws again in place - a window keeps its place, order, scroll and typed text |
| `frame.overrides` | `Frame`, which reads it from the variables |
| `text.fonts`, `text.styles.overrides`, `text.faces.overrides` | `loadTextFonts` and the overrides set again; template windows drawn anew |
| `templates.windows` | `loadDataWindows`: the plugins' windows as data read again |
| `gamedata.urls.externalTexts`, `text.overrides` | `reloadHotelTexts`: the hotel's texts with the theme's own over them; those that changed laid over the shown, key by key |

A burst of messages draws the last. `asset.bundles.templates.overrides` and `loading.screen` are read
at the next load.

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
  `utils/assetOverlayCheck.ts` (the development build's overlay check); nitro-react `utils/assetOverlays.ts` (applied
  by `loadAssetBundle`; a template of a library waits for its overlays; `reapplyAssetOverlays` for live
  reload), the theme sheet's overlaid sprites sliced from their own bitmap (`themeAssetBundle.ts`);
  nitro-react `theme/themeLive.ts` (live reload).

A React Compiler note for anyone touching this: memoised code recomputes only on what it reads, so
patch state reaches components as a value they read (a `useSyncExternalStore` snapshot), never as a
version number only listed as a dependency. The theme's texture hooks (`usePixiTexture`,
`usePixiEffectTexture`) opt out (`'use no memo'`): the compiler would keep a key's texture, and art
changed in place is another texture under the same key.

## Not yet

- A window as data keeps no state beyond the page its tabs show: lists filled from the server and
  inputs need a client module.
- Patches change templates. Windows Nitro draws with React components rather than a template have no
  elements to patch; their frame takes a root patch naming its id, and `frame.overrides`, nothing else.
- `room.previewer` is read as the client starts: a change reaches a player at their next load.
- A template's extension `arrange` runs for windows drawn on their own, not yet for one drawn as
  another window's item (a catalogue widget's view): arrange the page's window instead.
