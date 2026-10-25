# Imager

`packages/nitro-imager` draws avatars, pets, furniture and group badges on the server and serves
them over HTTP, for the pages and clients that show a figure, a pet, an item or a group without a
room: the client's group windows, infostand and navigator (`badge.asset.group.url`,
`group.badge.url`), and a hotel's site.

```sh
cp packages/nitro-imager/.env.example packages/nitro-imager/.env   # then set the urls
yarn workspace @nitrodevco/nitro-imager build                      # into dist/
yarn workspace @nitrodevco/nitro-imager start                      # runs dist/main.js; or: dev (watch), test
```

`build.ts` bundles it with esbuild: the `@nitrodevco/*` packages export their TypeScript source, so
they go into the bundle, and every other package is left to Node to load from `node_modules`. The
bundle is split so `main.ts`'s dynamic import of `startImager` stays a separate chunk, loaded after
the Node environment is installed. `dev` and `test` run the source through tsx.

To run it on a server managed by Ploi, see [Running the imager on Ploi](imager-ploi.md).

| Request | Draws |
|---|---|
| `GET /avatar?figure=...` (or `/avatarimage`) | an avatar; Habbo's `avatarimage` parameters (`gender`, `size` s/n/l, `direction`, `head_direction`, `action`, `gesture`, `headonly`, `img_format`) plus `dance`, `effect`, `frame`, `animate` (an animated gif at the room's 82 ms a frame) and `crop` (cut to the figure with a 1 px transparent gap) |
| `GET /pet?figure=...` (or `type=`) | a pet from its figure string (`type palette colour [parts]`) or its type, palette and `color`; `posture`, `gesture`, `size`, `direction`, `head_direction`, `headonly`, `frame`, `animate` (at the room's 41 ms a step), `img_format` |
| `GET /furni?name=...` (or `id=`, `wall=1`) | a furniture item from its furnidata class name (`rare_dragonlamp*4`) or id; `state`, `size`, `direction`, `frame`, `animate`, `img_format` |
| `GET /badge/<code>.gif` or `.png` | a group badge from its code |
| `GET /health` | whether it is up, what it caches, which badge table it draws with, and how many pet types and furnidata items it has |
| `GET /` (or `/habbo-imaging/`) | an index page: every request and parameter with its values and default, examples drawn live, and a form to try a figure, pet, furniture or badge code (`renderIndexPage`, which lists the action and gesture names from `parseAvatarRequest`'s own tables) |

Everything it loads from - the three bundle locations, the figure map, figure data, effect map
and badge part images - is a url or a path on the server, mixed as suits the deployment
(`resolveAddress`). A bundle path is a folder of `<library>.nitro` files, or a path with
`%libname%` in it; the rest are the file, or the badge parts' folder. A path becomes a `file:` url
that the imager's `fetch` reads from disk (`fetchWithFiles`), so the renderer loads a bundle from a
folder through the same code as from a CDN, and a missing library file is a failed library like a
404. A path that is not there stops the imager at start-up, naming it. The badge table is read
apart from these (`BadgePartTable.load`): an `http(s)` url, or else a file path.

The images are at the root, for an imager on a subdomain of its own: the client's
`badge.asset.group.url` is `https://habbo-imaging.example.com/badge/%badgedata%.gif`, and
`group.badge.url` the same with `%imagerdata%`. Habbo's own paths are answered too - `/avatarimage`,
and both images under `/habbo-imaging/` - so a url written for Habbo's imager only needs its host
changed. Every response carries `Access-Control-Allow-Origin: *`: the client draws the image into
its canvas.

## Avatars

The avatar is the renderer's own: `AvatarRenderManager` and `AvatarImage`, loaded from the same
`habbo-avatar-render-lib` bundle (`asset.bundles.templates`), figure map, figure data and effect
map the client loads. A frame is laid out as `AvatarVisualization` lays an avatar out in a room -
the avatar image at its canvas offsets, an effect's sprites by their offsets and z, ink 33 additive -
and the image is the union of every sprite of every frame. Every size is drawn from the large
assets at the room's full scale: `l` is that image doubled, and `s` is it halved afterwards, each
2x2 block averaged, as the client composites a zoomed-out room and then downsamples it
(`RoomDownsampleFilter`) - no `sh` art is used, and effect sprites halve with the rest.
`headonly` is the head's cropped image. `crop` cuts the finished image - after the doubling or
halving, so the gap is a pixel of the image served - to the union of every frame's visible pixels,
and leaves one transparent pixel around it: a page or canvas that scales the image with smoothing
samples past its edge, and without the gap would clip the figure's outermost pixels
(`cropFrames`).

It runs on Pixi's Canvas 2D renderer over `@napi-rs/canvas` (prebuilt, no GPU, no browser).
`installNodeEnvironment` binds the browser classes the renderer and Pixi reach for -
`createImageBitmap`, `document.createElement('canvas')`, `HTMLCanvasElement`, `ImageData` - to the
native library's, and must run before the renderer is imported (`main.ts` imports the rest after it).
The canvas renderer has no shader filters: an effect that recolours the avatar through
`AvatarDataContainer`'s filters draws without the recolour.

## Pets and furniture

A pet or furniture item is a room object of the room engine's temporary room - the room
`RoomEngine.getGenericRoomObjectTexture` draws the client's own pet and item previews in - made,
given its values and drawn by its own visualization (`AnimatedPetVisualization`,
`FurnitureVisualization` and its kinds) at the room's full scale (`drawRoomObject`). The imager
makes the object itself rather than asking the engine for a texture, as that call sets no gesture
and gives no frame of an animation but the first. The room content loader loads the libraries:
pets from `asset.bundles.pets` by the names in `renderer.petTypes` (`IMAGER_PET_BUNDLE_URL`,
`IMAGER_PET_TYPES`), furniture from `asset.bundles.furni` by the furnidata it is handed as the
client's `loadFurnitureData` hands it (`IMAGER_FURNITURE_BUNDLE_URL`, `IMAGER_FURNIDATA_URL`, read
again every `IMAGER_FURNIDATA_REFRESH_SECONDS`). Either is off when its settings are not there,
and its section of the index page says so.

- A pet's `posture`, `gesture` and `palette` are checked against its library's own (its
  visualization's postures and gestures, its palettes); one it does not have is a 400 listing
  what it has. Unset, the posture is the library's default.
- A frame is the visualization's visible sprites back to front, placed as
  `RoomObjectSpriteVisualization.buildImageContainer` places them; `drawFrames` puts every frame
  on one canvas, as the avatars are drawn. An animation steps the object one room update (41 ms) at
  a time and keeps the shortest loop its frames repeat in, up to 64 frames (`loopLength`).
- The frames are drawn before the object is removed: removing it drops its library's last
  reference, and the library then lets go of the palette textures a pet was drawn with.
- An additive sprite (ink 33: a lamp's glow, an effect's light) is art on black. In the room it is
  added over what is behind; on a transparent image `lighter` would add its alpha too and draw a
  black box, so `drawFrames` draws a copy whose alpha is its brightness - the colour it adds is the
  same, black adds nothing, and over the object it still adds what the room adds. Avatar effects
  draw their ink-33 sprites the same way.

## What is kept, and for how long

What grows with the requests a long-running imager answers is bounded:

- **Encoded images** (`ImageCache`): at most `IMAGER_CACHE_MB`, the least recently used dropped first.
- **Avatar asset libraries**: every figure loads its clothing's, and the avatar render manager
  unloads them only when asked - the client's `RoomEngine` asks on its purge timer, and the imager
  runs no room engine. Once more than `IMAGER_MAX_LIBRARIES` are loaded - checked after every render
  and every 30 s - the ones no render is using go (`purgeAssets`). New renders wait for the ones in
  progress first, so no library is unloaded from under a render that has fetched it but not drawn
  it yet. Mandatory libraries (`hh_human_body`, `hh_human_item`, the dances) stay. This is what
  sets the imager's footprint: soaked with 2,400 random figures at 300, resident memory levelled
  off around 800 MB with the heap at 70-140 MB. `/health` reports both, and the library count.

- **Pet and furniture libraries**: the room content loader's own `purge` runs every 60 s, as the
  client's purge trigger runs it, and releases every library no object has referenced for 20 s
  (`RoomContentLoader.PURGE_IDLE_MS`). An object holds its library only while it is drawn, so an
  item not asked for again is unloaded within a minute and fetched again when it is.

Each avatar's own caches go with it: it is disposed once its frames are drawn.

**Only a complete image is cached.** An avatar whose figure names a set the figure data does not
have, a set no library holds any part of, a library that failed to load
(`IAvatarRenderManager.getUndrawableFigureParts`), or an effect or dance that is not loaded
(`isAvatarEffectLoaded`) is drawn without it and served `Cache-Control: no-store`, so the next
request - a browser's or a proxy's too - draws it again; a library that failed is fetched again
then. A badge is complete when every token reads and every layer's part, colour and bitmaps do.

## Group badges

A badge code is up to five six-character tokens - `b` base, `s` symbol, `t` symbol from 100 up,
then part (2), colour (2), position (1) - as Turbo's `GuildBadgeCodes` builds them. Each layer is
drawn as Flash's `BadgeEditorPartItem.getComposite` composes the editor's preview: the part's
`badgepart_<file>.png` (from `image.library.badgepart.url`) copied into its grid cell, its RGB
multiplied by the colour, its mask laid over untinted; the layers stack base first on 39x39.

The ids are the hotel's own, so the imager reads the hotel's table: Turbo's `badgeparts_json`
gamedata file (`IMAGER_BADGE_PARTS`, e.g. `/gamedata/badgeparts_json/0`), read again every
`IMAGER_BADGE_PARTS_REFRESH_SECONDS` so a recoloured palette reaches new badges (a table given as a
file is read once); the table's hash is in every cached badge's key. Unset, it draws with
`data/badge-parts.json` - a copy of Turbo's seeded parts and badge palette - and so does a url that
cannot be read at start-up, until a refresh reads it.
