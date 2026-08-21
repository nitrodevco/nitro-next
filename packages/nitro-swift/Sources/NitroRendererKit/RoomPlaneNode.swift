import SpriteKit

import NitroCore
import NitroRoom

/// Turns a `RoomPlaneRenderer.update()` result into `SKSpriteNode`s - the SpriteKit-side
/// counterpart of the plane sprites `RoomVisualization` would have written into the room's
/// `IRoomObjectSprite` pool.
///
/// Unlike `FurnitureNode`/`AvatarNode`, plane tinting here needs no `colorBlendFactor`
/// approximation: `RoomPlaneRenderer`'s `finalColor` is a plain multiplicative combine of two
/// already-baked colors, both resolved before this node ever sees them.
public final class RoomPlaneNode: SKNode {
    public let renderer: RoomPlaneRenderer

    public init(renderer: RoomPlaneRenderer) {
        self.renderer = renderer

        super.init()
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    /// Rebuilds every visible plane sprite for the current room camera state.
    public func refresh(geometry: RoomGeometry) {
        removeAllChildren()

        let draws = renderer.update(geometry)

        NitroLogger.warn("RoomPlaneNode: adding \(draws.count) plane sprite(s) to the scene")

        for draw in draws { addChild(RoomPlaneNode.makeSprite(for: draw)) }
    }

    private static func makeSprite(for draw: RoomPlaneDraw) -> SKSpriteNode {
        let sprite = SKSpriteNode(texture: draw.texture)

        // Pixi's Habbo clients run with a global `SCALE_MODE.NEAREST` for crisp pixel-art
        // rendering; SpriteKit's default `SKTexture.filteringMode` is `.linear`. Left at the
        // default, this plane's baked texture - a fine, high-frequency 1px-line tile pattern -
        // gets bilinear-blurred whenever SpriteKit composites it at a non-exact-1:1 device pixel
        // scale (e.g. any Retina backing scale), which reads as a blurry, uneven, non-uniform
        // grid rather than a crisp diamond lattice - easy to mistake for a skew/shape bug in the
        // geometry math (which a standalone re-simulation of this exact bake independently
        // confirmed is correct - see the package README).
        sprite.texture?.filteringMode = .nearest
        sprite.anchorPoint = CGPoint(x: 0, y: 1) // plane offsets are top-left registered
        // TS: `sprite.offsetX = -offset.x; sprite.offsetY = -offset.y` (y-down); Y is flipped again
        // here for SpriteKit's y-up convention, netting out to (-offset.x, +offset.y).
        sprite.position = CGPoint(x: -draw.offset.x, y: draw.offset.y)
        // See `FurnitureNode.makeSprite`'s comment: TS's global sprite sort is descending-z-drawn-first,
        // so a *larger* z there means further back - `RoomPlaneRenderer.roomDepthOffset` (1000) pushes
        // planes far into that "drawn first" range deliberately, to guarantee floor/walls sort behind
        // every other room object. A direct (un-negated) copy into SpriteKit's zPosition - where larger
        // means closer to the camera - inverted that intent completely, putting the room in front of
        // the furniture and avatars it's supposed to sit behind.
        sprite.zPosition = -CGFloat(draw.relativeDepth)
        sprite.name = "plane.\(draw.uniqueId)"

        if draw.color != 0xFFFFFF {
            sprite.color = skColor(fromRGB: draw.color)
            sprite.colorBlendFactor = 1
        }

        return sprite
    }
}
