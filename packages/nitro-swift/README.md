# NitroSwift

A Swift + SpriteKit port of `@nitrodevco/nitro-renderer` (the Pixi.js-based room/avatar/furniture
renderer at `packages/nitro-renderer`), targeting iOS/macOS/tvOS. Consumes the same `.nitro` asset
bundles as the TS client with no conversion step.

This is a large, in-progress port - `packages/nitro-renderer/src` is ~35k lines across 349 files
(room visualization alone is ~25k lines, avatar ~9k), plus its shared type definitions in
`packages/nitro-api`. What's below is a faithful, working vertical slice covering the asset
pipeline end-to-end and the core static-furniture and room-camera math; the remaining subsystems
are scoped out explicitly rather than stubbed silently. See "Status" for the honest breakdown.

## Package layout

- **NitroCore** - shared primitives: `Vector3d` (3D vector math used by the room camera),
  `RoomDirection`, logging.
- **NitroAssets** - the `.nitro` bundle pipeline: `NitroBundle` (zip -> JSON manifests + spritesheet
  + PNG, via ZIPFoundation), `NitroSpritesheet` (TexturePacker frame cutting: trim/rotate handling
  via CoreGraphics), `GraphicAsset`/`GraphicAssetCollection` (named asset registry with x/y/flip
  offsets), `GraphicAssetPalette` (green-channel-indexed palette recolor), `AssetManager`
  (collection registry + `.nitro`/`.png`/`.gif` download). Ports:
  `packages/nitro-renderer/src/assets/*`, `packages/nitro-renderer/src/utils/NitroBundle.ts`.
- **NitroRoom** - `RoomGeometry` (the full 3D isometric camera projection - not simplified 2D tile
  math, see its doc comment); the furniture visualization pipeline
  (`SizeData`/`DirectionData`/`LayerData`/`ColorData` -> `FurnitureVisualizationData` ->
  `FurnitureVisualization`: resolves which asset/offset/tint/blend-mode/depth each furniture layer
  should render for a given room scale/direction/color), plus animated furniture on top of it
  (`AnimationFrame`/`AnimationFrameData`/`AnimationFrameSequenceData`/`AnimationLayerData`/
  `AnimationData`/`AnimationSizeData`/`AnimationStateData` -> `FurnitureAnimatedVisualization`: the
  animation-id/frame state machine, including transition animations); and the room floor/wall/landscape plane
  pipeline (`Plane/`): `RoomPlaneData`, `RoomPlane` (visibility/corner projection, tiling-offset
  math, and - since SpriteKit has no render-to-texture-with-arbitrary-affine-transform pass -
  a from-scratch CoreGraphics baking pipeline that reproduces Pixi's skewed `TilingSprite` +
  multiplicative tint + inverse-alpha mask entirely by hand), the `PlaneMask`/`PlaneMaskManager`
  bitmap mask system, `RoomPlaneRenderer` (per-plane shading colors, seed derivation, depth
  ordering), and `SimpleRoomPlaneParser` (a reduced-fidelity heightmap-to-planes generator - see
  "Status"). Ports: `packages/nitro-renderer/src/room/utils/RoomGeometry.ts`,
  `packages/nitro-renderer/src/room/object/visualization/{data,furniture,room}/*`,
  `packages/nitro-renderer/src/room/object/RoomPlaneData.ts`.
- **NitroAvatar** - the avatar compositing and animation pipeline: `AvatarFigureContainer`
  (figure-string parse/serialize), `FigureSetData`/`Palette`/`SetType`/`FigurePartSet` (the
  figuredata.json catalog), `PartSetsData`/`ActivePartSet` (which figure parts an action
  activates), `AvatarModelGeometry` (config-driven body-part depth-sort, via
  `sortAvatarNodesByDepth` + `Matrix4x4` Y-rotation), `ActionDefinition`/`ActiveActionData`/
  `AvatarActionManager` (the action catalog, per-action canvas offsets, and the
  filter/combination step that turns a caller's requested action list into the validated one
  `AvatarStructure` walks), `AnimationAction`/`AnimationActionPart`/`AvatarAnimationFrame`/
  `AvatarAnimationData` (the keyframe animation data model - per-figure-part-type sprite-frame
  sequences plus a separate per-frame pixel-offset table), `AvatarStructure` (figure+action(s) ->
  visible layers, now with real per-part keyframe frame arrays instead of always frame 0),
  `AvatarPose` (owns a caller's requested action list + animation frame counter, resolves them
  into one winning action per body part), and `AvatarCompositor` (asset naming/fallback/mirroring +
  the union-image placement math -> final positioned layers, now driven by `AvatarPose` instead of
  a single `ActionDefinition`). `AssetAliasCollection` resolves avatar asset names through a
  bundle's `aliases`. The client's built-in default geometry/part-set/action/animation tables
  (`HabboAvatarGeometry`/`HabboAvatarPartSets`/`HabboAvatarActionsDefault`/
  `HabboAvatarFigureDataDefault`/`HabboAvatarAnimations`) are bundled as JSON resources (extracted
  verbatim from the TS source via a build-time script, not hand-transcribed) and loaded through
  `AvatarDefaults`. Ports: `packages/nitro-renderer/src/avatar/**` (see "Status" for what's out of
  scope - mainly the downloaded-effects/dance animation system and FX-injected layers).
- **NitroRendererKit** - the SpriteKit adapter layer: `FurnitureNode`/`AvatarNode`/`RoomPlaneNode`
  (turn a `FurnitureVisualization`/`AvatarCompositor`/`RoomPlaneRenderer` layer list into
  `SKSpriteNode`s) and `RoomScene` (owns the `AssetManager` + room camera + avatar structure,
  places floor/walls/furniture/avatars at their projected screen position).
- **NitroSwiftDemo** (executable, macOS only) - a runnable windowed demo: downloads a room bundle,
  a furniture item, and an avatar's figure parts from the live asset CDN using the same
  `asset.urls.*`/`figuredata.url`/`figuremap.url` config keys as
  `packages/nitro-react/public/config/nitro-config.json`, then presents them in an `SKView`. See
  "Demo" below.

## Status

**Solid and load-bearing:**
- `.nitro` bundle loading (zip/JSON/spritesheet/PNG), including trimmed/rotated TexturePacker
  frames and green-channel palette recoloring - this is the foundation everything else sits on.
- The room camera's 3D projection math (`RoomGeometry`), ported field-for-field including its
  specific (non-textbook) Euler rotation composition.
- **`RoomScene.screenPosition(for:)`** - `RoomGeometry.getScreenPoint` returns a point *relative to
  the camera's projected origin*, not a canvas/view pixel coordinate; the TS client only ever
  consumes it after adding half the canvas size (`RoomSpriteCanvas.renderObject`: every placed room
  object - furniture, avatars, and the room's own plane geometry alike - goes through `x = x +
  (width>>1); y = y + (height>>1)`). Missing this step was a real bug caught via live testing (not
  found by static reading alone): every placed node clustered near the SpriteKit scene's
  bottom-left corner instead of appearing centered, and room planes - being much larger than a
  furniture/avatar sprite - ended up positioned almost entirely outside the viewport, making the
  room look like it wasn't rendering at all. `screenPosition(for:)` centralizes the fix (with a Y
  negation instead of TS's addition, since SpriteKit's default anchorPoint is y-up-from-bottom-left
  vs. Pixi's y-down-from-top-left) - `placeFurniture`/`placeAvatar` and `RoomPlaneNode`'s own root
  position (anchored to `RoomPlaneRenderer.roomObjectLocation`) all go through it.
- Furniture layer resolution: asset naming, direction fallback, size fallback (nearest-by-ratio),
  per-layer offset/alpha/color/blend-mode/depth, the shadow layer - for both static furniture
  (`FurnitureVisualization`) and animated furniture (`FurnitureAnimatedVisualization`, composed on
  top of the same layer-resolution code via a small `FurnitureLayerOverride` hook rather than
  duplicating it - see `FurnitureVisualization`'s doc comment). The animation state machine handles
  transition animations (`AnimationData.getTransitionTo/FromAnimationId`), per-layer frame-repeat
  stepping, and the run-length-collapsed keyframe sequences (`AnimationFrameSequenceData`),
  including a faithfully replicated bug in the original's `AnimationFrameData.y` getter (it returns
  `_x`, not `_y` - see `AnimationFrameData.swift`).
- **Furniture visualization variants** - `FurnitureVisualizationFactory` picks the concrete class
  from `IAssetData.visualizationType`, a field genuinely present in the `.nitro` bundle's own asset
  manifest (not server-supplied furnidata - see the factory's doc comment for a correction of an
  earlier, wrong claim to the contrary). Ported: `FurnitureResettingAnimatedVisualization` (trivial
  flag flip), `FurnitureCounterClockVisualization` (digit-wheel clock face from raw state),
  `FurnitureVoteCounterVisualization`/`FurnitureVoteMajorityVisualization` (digit-wheel + hide-when-unset,
  reading from `RoomObjectModel`), `FurnitureSoundBlockVisualization` (fractional-speed frame-rate
  scaling via an accumulator - see its doc comment for the one deliberate `Int`-vs-`number`
  precision difference from the original), `FurnitureQueueTileVisualization` (self-contained
  animation-queue sequencing), and `FurnitureGiftWrappedVisualization` (packet/ribbon frame
  selection from `RoomFurnitureData.extra`, composed with `FurnitureVisualization` the same way
  `FurnitureAnimatedVisualization` is, since it's static furniture with no animation frames
  involved). `FurnitureCuboidVisualization`/`FurnitureStickieVisualization` are empty subclasses in
  the original (identical to the base) and need no separate Swift type. Not ported: the remaining
  ~14 concrete subclasses (particle systems - `FurnitureFireworksVisualization`,
  `FurniturePlanetSystemVisualization`, ...; external image/video - `FurnitureYoutubeVisualization`,
  `FurnitureExternalImageVisualization`; badges/branding - `FurnitureBadgeDisplayVisualization`,
  `FurnitureGuildCustomizedVisualization`; `FurnitureMannequinVisualization`; `FurnitureBottleVisualization`) -
  these need either real network/CDN-fetched content or a fuller particle/render-texture pipeline
  this port doesn't have yet; unrecognized `visualizationType`s fall back to plain static/animated
  rendering via animation-table detection, so these still render (without their specific
  customizations) rather than failing to load.
- **`RoomObjectModel`/`RoomObjectVariableEnum`/`FurnitureLogicData`** - a typed per-instance
  key/value store (`RoomObjectModel`, ported in full for its key list even though only the
  furniture-logic subset is exercised here) that the variants above read from, populated by
  `FurnitureLogicData.parse(from:)` with the asset-driven (non-networked) portion of
  `FurnitureLogic.initialize` - footprint dimensions, center point, allowed rotation directions,
  and custom variable names, straight out of the `.nitro` bundle's `logic` JSON. The
  message/input-driven remainder of `FurnitureLogic` and the ~55 concrete `Furniture*Logic`
  subclasses (dice rolls, multi-state cycling, mouse/click handling, widget events, the
  rotate-bounce animation, all server-message parsing) stay out of scope - see
  `FurnitureLogicData`'s doc comment for why a click-driven "next state" genuinely can't be computed
  client-side the way the original's server-authoritative logic does.
- `RoomFurnitureData` - the placement/ownership record (tile, direction, state, expiry, owner) a
  networking layer would normally hand to `RoomScene.placeFurniture`; ported as a plain constructible
  value (minus the original's `data: IObjectData` field, a full server-message parser out of scope
  for the same reason as the rest of the networking layer). `RoomScene.placeFurniture(from:selectedColorId:)`
  consumes one directly, applying its `state`/`extra` before the first render so an animated or
  gift-wrapped item starts correctly rendered instead of flashing the default look for a frame.
- Avatar compositing and keyframe animation: figure-string parsing, the figuredata.json catalog
  (palettes/colors/part sets/hidden layers), config-driven body-part depth-sorting,
  `AvatarStructure.getParts`' figure->visible-layers resolution (including the
  mirrored-direction/flip-in-place asset-naming logic for directions 4-6, and real per-figure-part
  keyframe frame arrays via `AvatarAnimationData` rather than a hardcoded frame 0), and the
  union-image placement math that positions every layer within the avatar canvas. Verified against
  the live TS source down to specific quirks (e.g. `AvatarModelGeometry.getParts` rotating by the
  raw 0-7 direction index rather than the resolved compass angle - a bug in the original that's
  replicated deliberately, see `AvatarGeometry.swift`; and `AvatarImagePartContainer.getFrameIndex`
  returning the array *index*, not the stored value, for non-keyframe frame entries).
- **Avatar actions and animation playback**: `AvatarPose` drives one or more simultaneous actions
  (e.g. a walk cycle while waving) through `AvatarActionManager.sortActions`/`getActiveBodyPartIds`,
  resolving one winning action per body part and advancing a shared animation frame counter that
  feeds real keyframe playback (`AvatarAnimationData`/`HabboAvatarAnimations.json`'s 10 bundled
  animations: Default/Sit/Lay/Move/Wave/Talk/Sign/Respect/Blow/Laugh). Faithfully replicates a real
  bug in the original: `AvatarActionManager.sortActions` calls `Array.sort(void this.sortByPrecedence)`,
  and `void` always evaluates to `undefined`, so actions are *not* actually sorted by their declared
  `precedence` - whichever action a caller appends last wins any body part it shares with an
  earlier one (see `AvatarActionManager.sortActions`'s doc comment). The real client bundles *two*
  built-in action tables at compile time - `HabboAvatarActionsDefault.ts` (just "Stand") and
  `HabboAvatarActions.ts` (the other 28: Walk/Sit/Wave/Talk/Sign/Respect/Blow/Laugh/Lay/Float/Swim/
  Snowboard*/Gesture*/etc.) - both loaded unconditionally in `AvatarRenderManager.init()`, no network
  fetch involved for either. `AvatarDefaults.makeStructure()` now registers both
  (`HabboAvatarActionsDefault.json` + `HabboAvatarActions.json`), so Walk/Sit/Wave/etc. work out of
  the box; call `AvatarStructure.registerActionData(_:)` again only for actions beyond those (a real
  per-hotel actions catalog with custom effects/seasonal states), the same way `injectFigureData`
  layers in real figuredata.
- Room floor/wall/landscape plane rendering (`RoomPlane`/`RoomPlaneRenderer`): material/color
  resolution, tiling-offset math per plane type, the corner-projection and skew-matrix math, and a
  CoreGraphics baking pipeline reproducing Pixi's `TilingSprite` + tint + inverse-alpha mask by
  hand (see `RoomPlane.swift`'s doc comment for why that's safe to do without SpriteKit shaders).
  The dual, *numerically different* plane-type enumerations the original TS uses
  (`RoomPlaneData.PLANE_FLOOR = 1` vs. `RoomPlane.TYPE_FLOOR = 2`, converted at construction time)
  were caught by reading the source directly and are replicated correctly - worth flagging since
  it's an easy trap for a future contributor extending this code by pattern-matching.

**Reduced fidelity, not a straight port:**
- **`SimpleRoomPlaneParser`** stands in for `RoomPlaneParser` (~1500 lines of marching-squares tile
  extraction with 4x4-supersampled corner blending, wall-hiding/peninsula detection, and hole
  handling). It greedily merges same-height tile rectangles for the floor and contiguous boundary
  runs for perimeter walls, which is correct for the common case (a flat floor, straight walls) but
  does **not** handle multi-height floors (step walls), floor holes, or wall-corner end caps. Its
  wall coordinate/normal-direction conventions were derived by reading `RoomPlane`'s and
  `RoomPlaneParser.addWall`'s formulas directly, but - unlike everything else in this port - its
  *output* hasn't been cross-checked against a captured real room (that needs a running renderer
  this sandbox doesn't have), so treat it as a reasonable starting point to validate visually, not
  a verified-correct one.

**Explicitly not yet ported** (scoped out rather than faked):
- **Avatar downloaded-effects/dance animation system** (`Animation`/`AnimationManager`/
  `AvatarAnimationLayerData`/`AddDataContainer`/`AvatarDataContainer`/`DirectionDataContainer`/
  `SpriteDataContainer`, packages/nitro-renderer/src/avatar/animation/*) and FX/gesture-injected
  layer items (`layerItems`, `animation.addData`, `AvatarModelGeometry`'s per-avatar-instance
  *dynamic* items via `addPart`/`getDynamicParts` - only *static* declared items are ported, see
  `AvatarModelGeometry.swift`'s doc comment). This is the "Dance"/"Effect" action states - avatar
  effects downloaded as separate `.nitro`-format asset libraries the same way furniture is (via
  `EffectAssetDownloadLibrary`/`collection.data.animations`, genuinely no networking needed to
  *read* them once downloaded), distinct from and additional to the keyframe animation system
  above, which is what actually renders Stand/Walk/Sit/Wave/Talk/etc. `AvatarStructure.getActiveBodyPartIds`
  returns no body parts for any action with `isAnimation: true` (the flag this system is gated
  behind), so an effects action currently claims nothing rather than rendering incorrectly.
- Head direction independent of body direction (`AvatarSetType.Head` turning separately from
  `.Full`, `isHeadTurnPreventedByAction`) - `AvatarCompositor`/`AvatarPose` take one direction for
  the whole avatar. `CarryObject`/`UseObject` action parameter lookup (needs an item catalog this
  port doesn't model) and the "Posture: Lay" auto-face-2-or-4 direction nudge - see `AvatarPose`'s
  doc comment for both. `AvatarActionManager.getCanvasOffsets`'s result (used for placement nudges
  like a laid-down avatar) is exposed on `AvatarStructure` but not wired into `AvatarCompositor`'s
  own placement math - apply it at the host-app/node-position level if needed.
- `AvatarImageCache`'s multi-level caching (body-part/action/direction/frame-container) isn't
  ported - `AvatarCompositor` recomputes every call instead, matching this port's "drop the
  JS-GC-motivated caching, keep the math" pattern used throughout (see `FurnitureVisualization`'s
  doc comment for the same tradeoff elsewhere).
- `LegacyWallGeometry` (legacy wall-item position string format) - only needed for
  import/export of the old placement-string format, not live rendering.

## Demo

`swift run NitroSwiftDemo` (macOS only - it's a windowed `NSApplication`/`SKView` app, and this
package otherwise has no headless/offscreen rendering path, see "Verifying" below) opens a window,
then asynchronously downloads and renders a static room with a piece of furniture (a "throne") and
a standing avatar in it, entirely from the live `assets.nitrodev.co` CDN - no bundled/mocked asset
data. `Sources/NitroSwiftDemo/DemoConfig.swift` holds the asset-location values, copied verbatim
from `packages/nitro-react/public/config/nitro-config.json` (the same config scheme the real client
reads at runtime): `asset.urls.generic`/`asset.urls.furni`/`asset.urls.avatar` templates plus
`figuredata.url`/`figuremap.url`.

Two things worth flagging for a future contributor extending this demo:
- **The room's own bundle is not named `"room"`.** `RoomContentLoader.ROOM_CONTENT = 'room'` (TS)
  is only an internal bookkeeping key; the actual downloaded library is `"HabboRoomContent"`
  (`RoomContentLoader.getAssetUrls`'s `case ROOM_CONTENT: return [this.getAssetUrlWithGenericBase('HabboRoomContent')]`).
  Confirmed against the live CDN: `bundled/generic/room.nitro` 404s, `bundled/generic/HabboRoomContent.nitro`
  exists (its manifest's own `type` field is `"room"`, which is what `RoomScene`/`AssetManager`
  actually key it by internally - `DemoConfig.roomContentLibrary`'s doc comment has the details).
- **Avatar figure parts aren't resolvable by naming convention** - which library a figure part (e.g.
  `hd-3536`) lives in is data-driven via `figuremap.json` (`{ libraries: [{ id, revision, parts: [{
  id, type }] }] }`), resolved the same way `AvatarAssetDownloadManager.getAvatarFigurePendingLibraries`
  does in the TS client: for each figure-string segment, look up its `FigurePartSet`'s parts (from
  `figuredata.json`) by `"${type}:${id}"` in the figuremap. `AvatarLibraryResolver.swift` is a lean,
  demo-local port of just that resolution step (not the full queueing/listener machinery of the TS
  class, which this demo has no use for since it downloads everything up front and blocks on it).
  `DemoConfig.demoFigure`'s specific figure string was picked by resolving it against the *live*
  `FigureData.json`/`FigureMap.json` rather than guessed - the "default" figure string quoted in
  `AvatarImage.ts`'s TS constructor no longer resolves against the live figuremap (hotel content
  drifts over time), so reusing it here would silently render nothing.

## Requirements

- Swift 5.9+, iOS 15 / macOS 12 / tvOS 15.
- [ZIPFoundation](https://github.com/weichsel/ZIPFoundation) (SPM dependency, `.nitro` is a zip).
- The demo target additionally needs macOS (AppKit) and network access to `assets.nitrodev.co`.

## Verifying

This port was written without access to a Swift toolchain (no `swift`/`xcodebuild` in the dev
sandbox), so **`swift build`/`swift test` have not been run against it yet**. Run them first thing
after pulling this branch into an environment with Xcode/Swift installed; the most likely rough
edges are exact ZIPFoundation API surface (`NitroBundle.swift`) and CoreGraphics context/bitmap
parameter combinations (`Spritesheet.swift`, `GraphicAssetPalette.swift`, `TextureUtils.swift`,
`RoomPlane.swift`'s baking pipeline). `RoomPlane.swift` in particular is worth an early visual
smoke test against a real room bundle - it's the most involved piece of CoreGraphics code in this
port (context-flip + affine-transform concatenation + tile pattern + multiply-blend tint +
destination-out mask, all in one bitmap context).
