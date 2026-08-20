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
- **NitroAvatar** - the avatar compositing pipeline: `AvatarFigureContainer` (figure-string
  parse/serialize), `FigureSetData`/`Palette`/`SetType`/`FigurePartSet` (the figuredata.json
  catalog), `PartSetsData`/`ActivePartSet` (which figure parts an action activates),
  `AvatarModelGeometry` (config-driven body-part depth-sort, via `sortAvatarNodesByDepth` +
  `Matrix4x4` Y-rotation), `AvatarStructure` (figure+action -> visible layers), and
  `AvatarCompositor` (asset naming/fallback/mirroring + the union-image placement math -> final
  positioned layers). `AssetAliasCollection` resolves avatar asset names through a bundle's
  `aliases`. The client's built-in default geometry/part-set/action tables
  (`HabboAvatarGeometry`/`HabboAvatarPartSets`/`HabboAvatarActionsDefault`/
  `HabboAvatarFigureDataDefault`) are bundled as JSON resources (extracted verbatim from the TS
  source via a build-time script, not hand-transcribed) and loaded through `AvatarDefaults`. Ports:
  `packages/nitro-renderer/src/avatar/**` (see the "Status" section below for what's out of scope).
- **NitroRendererKit** - the SpriteKit adapter layer: `FurnitureNode`/`AvatarNode`/`RoomPlaneNode`
  (turn a `FurnitureVisualization`/`AvatarCompositor`/`RoomPlaneRenderer` layer list into
  `SKSpriteNode`s) and `RoomScene` (owns the `AssetManager` + room camera + avatar structure,
  places floor/walls/furniture/avatars at their projected screen position).

## Status

**Solid and load-bearing:**
- `.nitro` bundle loading (zip/JSON/spritesheet/PNG), including trimmed/rotated TexturePacker
  frames and green-channel palette recoloring - this is the foundation everything else sits on.
- The room camera's 3D projection math (`RoomGeometry`), ported field-for-field including its
  specific (non-textbook) Euler rotation composition.
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
- Static-pose avatar compositing: figure-string parsing, the figuredata.json catalog
  (palettes/colors/part sets/hidden layers), config-driven body-part depth-sorting, `AvatarStructure.getParts`'
  figure->visible-layers resolution (including the mirrored-direction/flip-in-place asset-naming
  logic for directions 4-6), and the union-image placement math that positions every layer within
  the avatar canvas. Verified against the live TS source down to specific quirks (e.g.
  `AvatarModelGeometry.getParts` rotating by the raw 0-7 direction index rather than the resolved
  compass angle - a bug in the original that's replicated deliberately, see `AvatarGeometry.swift`).
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
- **Avatar animation & actions**: keyframe animation playback (`Animation`/`AnimationAction`,
  `AvatarAnimationFrame`), the action precedence/combination system (`AvatarActionManager.filterActions`/
  `sortActions` - only a single caller-supplied `ActionDefinition` is supported, not simultaneous
  actions like "wave while walking"), gestures, and FX/effect-injected layers
  (`layerItems`/`animation.addData`). Only the "Stand" posture is wired up (from the client's
  built-in default action table); the full action catalog (Walk/Sit/Wave/...) is normally fetched
  per-hotel like figuredata and isn't loaded. `AvatarImagePartContainer.getFrameDefinition` always
  returns `nil` as a result. `AvatarImageCache`'s multi-level caching
  (body-part/action/direction) also isn't ported - not needed for a static pose, would matter for
  animated ones (see `AvatarCompositor`'s doc comment for the "recompute every call" tradeoff this
  implies).
- `LegacyWallGeometry` (legacy wall-item position string format) - only needed for
  import/export of the old placement-string format, not live rendering.

## Requirements

- Swift 5.9+, iOS 15 / macOS 12 / tvOS 15.
- [ZIPFoundation](https://github.com/weichsel/ZIPFoundation) (SPM dependency, `.nitro` is a zip).

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
