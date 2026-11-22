# Imager

`packages/nitro-imager` draws avatars, pets, furniture and group badges on the server and serves
them over HTTP to whatever shows one outside a room: the client's group windows, infostand and
navigator, and a hotel's site.

```sh
cp packages/nitro-imager/.env.example packages/nitro-imager/.env   # then set the urls
yarn workspace @nitrodevco/nitro-imager build                      # into dist/
yarn workspace @nitrodevco/nitro-imager start                      # runs dist/main.js; or: dev (watch), test
```

`build.ts` bundles it with esbuild, including the `@nitrodevco/*` packages (they export TypeScript
source); Node loads every other package from `node_modules`. `main.ts`'s dynamic import of
`startImager` stays a separate chunk, loaded after the Node environment is installed. `dev` and
`test` run the source through tsx.

For a server managed by Ploi, see [Running the imager on Ploi](imager-ploi.md).

| Request | Draws |
|---|---|
| `GET /avatar?figure=...` (or `/avatarimage`) | an avatar; Habbo's `avatarimage` parameters (`gender`, `size` s/n/l, `direction`, `head_direction`, `action`, `gesture`, `headonly`, `img_format`) plus `dance`, `effect`, `frame`, `animate` (an animated gif at the room's 82 ms a frame) and `crop` (cut to the figure with a 1 px transparent gap) |
| `GET /pet?figure=...` (or `type=`) | a pet from its figure string (`type palette colour [parts]`) or its type, palette and `color`; `posture`, `gesture`, `size`, `direction`, `head_direction`, `headonly`, `frame`, `animate` (at the room's 41 ms a step), `img_format` |
| `GET /furni?name=...` (or `id=`, `wall=1`) | a furniture item from its furnidata class name (`rare_dragonlamp*4`) or id; `state`, `size`, `direction`, `frame`, `animate`, `img_format` |
| `GET /badge/<code>.gif` or `.png` | a group badge from its code |
| `GET /health` | whether it is up, what it caches, which badge table it draws with, and how many pet types and furnidata items it has |
| `GET /` (or `/habbo-imaging/`) | an index page: every request and parameter with its values and default, live examples, and a form to try a figure, pet, furniture or badge code (`renderIndexPage`; the action and gesture names come from `parseAvatarRequest`'s own tables) |

Each source - the three bundle locations, figure map, figure data, effect map and badge part
images - can be a url or a server path, whichever suits the deployment (`resolveAddress`). A bundle
path is a folder of `<library>.nitro` files or a path containing `%libname%`; the others are the
file, or the badge parts' folder. A path becomes a `file:` url read from disk by the imager's
`fetch` (`fetchWithFiles`), so a folder goes through the same renderer code as a CDN and a missing
library file fails like a 404. A path that does not exist stops the imager at start-up, naming it.
The badge table is read separately (`BadgePartTable.load`): an `http(s)` url, or else a file path.

Images are served at the root, for an imager on its own subdomain: the client's
`badge.asset.group.url` is `https://habbo-imaging.example.com/badge/%badgedata%.gif`, and
`group.badge.url` the same with `%imagerdata%`. Habbo's own paths work too - `/avatarimage`, and
both images under `/habbo-imaging/` - so a url written for Habbo's imager needs only its host
changed. Every response carries `Access-Control-Allow-Origin: *`, as the client draws the image
into its canvas.

## Avatars

The avatar is the renderer's own `AvatarRenderManager` and `AvatarImage`, loaded from the client's
`habbo-avatar-render-lib` bundle (`asset.bundles.templates`), figure map, figure data and effect
map. A frame is laid out as `AvatarVisualization` lays out an avatar in a room - the avatar image
at its canvas offsets, an effect's sprites by their offsets and z, ink 33 additive - and the image
is the union of every sprite of every frame. Every size is drawn from the large assets at the
room's full scale: `l` doubles that image, and `s` halves it afterwards by averaging each 2x2
block, as the client downsamples a composited zoomed-out room (`RoomDownsampleFilter`); no `sh` art
is used, and effect sprites halve with the rest. `headonly` is the head's cropped image. `crop`
cuts the finished image (after doubling or halving, so the gap is one served pixel) to the union of
every frame's visible pixels plus one transparent pixel around it, or a page or canvas scaling the
image with smoothing samples past its edge and clips the figure's outermost pixels (`cropFrames`).

It runs on Pixi's Canvas 2D renderer over `@napi-rs/canvas` (prebuilt, no GPU, no browser).
`installNodeEnvironment` binds the browser classes the renderer and Pixi use - `createImageBitmap`,
`document.createElement('canvas')`, `HTMLCanvasElement`, `ImageData` - to the native library's, and
must run before the renderer is imported (`main.ts` imports the rest after it). The canvas renderer
has no shader filters, so an effect that recolours the avatar through `AvatarDataContainer`'s
filters draws without the recolour.

## Pets and furniture

A pet or furniture item is an object in the room engine's temporary room (where
`RoomEngine.getGenericRoomObjectTexture` draws the client's pet and item previews), created, given
its values and drawn by its own visualization (`AnimatedPetVisualization`, `FurnitureVisualization`
and its kinds) at the room's full scale (`drawRoomObject`). The imager creates the object itself,
because asking the engine for a texture sets no gesture and gives only an animation's first frame.
The room content loader loads the libraries: pets from `asset.bundles.pets` by the names in
`renderer.petTypes` (`IMAGER_PET_BUNDLE_URL`, `IMAGER_PET_TYPES`), furniture from
`asset.bundles.furni` by the furnidata it is handed as the client's `loadFurnitureData` hands it
(`IMAGER_FURNITURE_BUNDLE_URL`, `IMAGER_FURNIDATA_URL`, re-read every
`IMAGER_FURNIDATA_REFRESH_SECONDS`). Either is off when its settings are missing, and its section
of the index page says so.

- A pet's `posture`, `gesture` and `palette` are checked against its library's (its visualization's
  postures and gestures, its palettes); one it lacks is a 400 listing what it has. Unset, the
  posture is the library's default.
- A frame is the visualization's visible sprites back to front, placed as
  `RoomObjectSpriteVisualization.buildImageContainer` places them; `drawFrames` puts every frame
  on one canvas, as for avatars. An animation steps the object one room update (41 ms) at a time
  and keeps the shortest loop its frames repeat in, up to 64 frames (`loopLength`).
- The frames are drawn before the object is removed: removing it drops its library's last
  reference, and the library then releases the palette textures a pet was drawn with.
- An additive sprite (ink 33: a lamp's glow, an effect's light) is art on black, added in the room
  over what is behind it. On a transparent image `lighter` would add its alpha too and draw a black
  box, so `drawFrames` draws a copy whose alpha is its brightness: it adds the same colour, black
  adds nothing, and over the object it still adds what the room adds. Avatar effects draw their
  ink-33 sprites the same way.

## What is kept, and for how long

Everything that grows with a long-running imager's requests is bounded:

- **Encoded images** (`ImageCache`): at most `IMAGER_CACHE_MB`, the least recently used dropped first.
- **Avatar asset libraries**: every figure loads its clothing's, and the avatar render manager
  unloads them only when asked - the client's `RoomEngine` asks on its purge timer, and the imager
  runs no room engine. Once more than `IMAGER_MAX_LIBRARIES` are loaded (checked after every render
  and every 30 s), those no render is using go (`purgeAssets`). New renders first wait for those in
  progress, so no library is unloaded under a render that has fetched but not yet drawn it.
  Mandatory libraries (`hh_human_body`, `hh_human_item`, the dances) stay. This sets the imager's
  footprint: soaked with 2,400 random figures at 300, resident memory levelled off around 800 MB
  with the heap at 70-140 MB. `/health` reports both, and the library count.

- **Pet and furniture libraries**: the room content loader's own `purge` runs every 60 s, as the
  client's purge trigger runs it, releasing every library no object has referenced for 20 s
  (`RoomContentLoader.PURGE_IDLE_MS`). An object holds its library only while drawn, so an item not
  requested again is unloaded within a minute and refetched when it is.

Each avatar's own caches go with it: it is disposed once its frames are drawn.

**Only a complete image is cached.** An avatar whose figure names a set the figure data lacks, a
set no library holds any part of, a library that failed to load
(`IAvatarRenderManager.getUndrawableFigureParts`), or an effect or dance that is not loaded
(`isAvatarEffectLoaded`) is drawn without it and served `Cache-Control: no-store`, so the next
request (a browser's or proxy's too) draws it again and refetches a failed library. A badge is
complete when every token reads and every layer's part, colour and bitmaps do.

## Group badges

A badge code is up to five six-character tokens - `b` base, `s` symbol, `t` symbol from 100 up,
then part (2), colour (2), position (1) - as Turbo's `GuildBadgeCodes` builds them. Each layer is
drawn as Flash's `BadgeEditorPartItem.getComposite` composes the editor's preview: the part's
`badgepart_<file>.png` (from `image.library.badgepart.url`) copied into its grid cell, its RGB
multiplied by the colour, its mask laid over untinted; the layers stack base first on 39x39.

The ids are the hotel's, so the imager reads the hotel's table: Turbo's `badgeparts_json` gamedata
file (`IMAGER_BADGE_PARTS`, e.g. `/gamedata/badgeparts_json/0`), re-read every
`IMAGER_BADGE_PARTS_REFRESH_SECONDS` so a recoloured palette reaches new badges (a table given as a
file is read once); the table's hash is in every cached badge's key. Unset, it draws with
`data/badge-parts.json` - a copy of Turbo's seeded parts and badge palette - as it does when the
url cannot be read at start-up, until a refresh reads it.
