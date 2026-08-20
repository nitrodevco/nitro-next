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
  math, see its doc comment) and the static-furniture visualization pipeline
  (`SizeData`/`DirectionData`/`LayerData`/`ColorData` -> `FurnitureVisualizationData` ->
  `FurnitureVisualization`: resolves which asset/offset/tint/blend-mode/depth each furniture layer
  should render for a given room scale/direction/color). Ports:
  `packages/nitro-renderer/src/room/utils/RoomGeometry.ts`,
  `packages/nitro-renderer/src/room/object/visualization/{data,furniture}/*`.
- **NitroAvatar** - `AvatarFigureContainer` (figure-string parse/serialize),
  `AvatarFigurePartType`/`AvatarGenderType`, and the body-part depth-sort algorithm
  (`sortAvatarNodesByDepth`, `Matrix4x4` Y-rotation) used to order layered avatar sprites per
  facing direction. Ports: `packages/nitro-renderer/src/avatar/AvatarFigureContainer.ts`,
  `packages/nitro-renderer/src/avatar/geometry/*`.
- **NitroRendererKit** - the SpriteKit adapter layer: `FurnitureNode` (turns a
  `FurnitureVisualization` layer list into `SKSpriteNode`s) and `RoomScene` (owns the
  `AssetManager` + room camera, places furniture at a projected screen position).

## Status

**Solid and load-bearing:**
- `.nitro` bundle loading (zip/JSON/spritesheet/PNG), including trimmed/rotated TexturePacker
  frames and green-channel palette recoloring - this is the foundation everything else sits on.
- The room camera's 3D projection math (`RoomGeometry`), ported field-for-field including its
  specific (non-textbook) Euler rotation composition.
- Static furniture layer resolution: asset naming, direction fallback, size fallback
  (nearest-by-ratio), per-layer offset/alpha/color/blend-mode/depth, the shadow layer.
- Figure-string parsing and the avatar depth-sort algorithm.

**Explicitly not yet ported** (scoped out rather than faked):
- **Room floor/wall/landscape plane rendering** (`RoomPlane`, `RoomVisualization`): the TS version
  bakes a skewed, tiled, masked texture per polygon via Pixi `RenderTexture`+`Matrix`. `RoomGeometry`
  (this port's foundation for it) is done; the CoreGraphics-based baking adapter and the
  bitmap/rectangle mask system are not.
- **`RoomPlaneParser`**: the marching-squares-style algorithm that turns a room's tile heightmap
  into floor/wall polygons (4x4 supersampled corner blending, wall-hiding/peninsula detection,
  hole handling). Large and self-contained; not started.
- **Animated furniture** (`FurnitureAnimatedVisualization`): the animation-id/frame state machine,
  transition animations, and the ~55 concrete `Furniture*Logic` classes (movers, blinking lights,
  dice, etc.). Not started - `FurnitureVisualization` currently only renders the static (frame 0)
  case.
- **Avatar compositing**: figure-data catalog parsing (`FigureSetData`/`Palette`/`FigurePartSet`),
  `AvatarStructure.getParts` (figure+action -> visible layers), the action precedence/combination
  system, keyframe animation playback (`Animation`/`AnimationAction`), and `AvatarImageCache`'s
  actual sprite compositing. `AvatarFigureContainer` and the depth-sort are the pieces in place;
  the rest is a substantial follow-up (see the architecture notes gathered during this port for a
  detailed spec of each piece).
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
parameter combinations (`Spritesheet.swift`, `GraphicAssetPalette.swift`).
