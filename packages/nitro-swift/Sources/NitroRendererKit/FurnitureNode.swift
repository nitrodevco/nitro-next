import SpriteKit

import NitroRoom

/// Turns one `FurnitureVisualizing.computeLayers()` result into an `SKNode` tree - the
/// SpriteKit-side counterpart of what `RoomObjectSpriteVisualization`'s pooled `IRoomObjectSprite`s
/// would have been rendered as in the TS client. Wraps either a `FurnitureVisualization` (static
/// furniture) or a `FurnitureAnimatedVisualization` (animated furniture) - see `FurnitureVisualizing`.
public final class FurnitureNode: SKNode {
    public private(set) var visualization: FurnitureVisualizing

    private var scale: Int = 0
    private var direction: Int = 0
    private var selectedColorId: Int = 0
    private var alphaMultiplier: Double = 1
    private var furnitureLift: Double = 0
    private var lookThrough: Bool = false

    public init(visualization: FurnitureVisualizing) {
        self.visualization = visualization

        super.init()
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    /// Rebuilds all layer sprites for the given room/object state. Mirrors the "full rebuild"
    /// branch of `FurnitureVisualization.updateSprites` (`update === true`) - this port has no
    /// pooled-sprite incremental-update path, see `FurnitureVisualization`'s doc comment.
    public func refresh(
        scale: Int,
        cameraDirectionX: Double,
        objectDirectionX: Double,
        selectedColorId: Int = 0,
        alphaMultiplier: Double = 1,
        furnitureLift: Double = 0,
        lookThrough: Bool = false
    ) {
        self.scale = scale
        self.selectedColorId = selectedColorId
        self.alphaMultiplier = alphaMultiplier
        self.furnitureLift = furnitureLift
        self.lookThrough = lookThrough

        direction = visualization.resolveDirection(scale: scale, cameraDirectionX: cameraDirectionX, objectDirectionX: objectDirectionX)

        // Mirrors `FurnitureVisualization.updateObject` calling `setDirection` before the
        // animation update runs each frame, so `FurnitureAnimatedVisualization` can tell a
        // direction change happened and force every layer to re-resolve its frame on the next tick.
        if let animated = visualization as? FurnitureAnimatedVisualization { animated.setDirection(direction) }

        rebuild()
    }

    /// Advances the animation state machine by one tick and rebuilds - a no-op for static
    /// furniture (`visualization` isn't a `FurnitureAnimatedVisualization`). Call this at the
    /// classic Habbo animation rate (`RoomScene` does, at ~41ms/tick - see its doc comment), not
    /// once per rendered frame.
    @discardableResult
    public func tickAnimation() -> Bool {
        guard let animated = visualization as? FurnitureAnimatedVisualization else { return false }

        animated.tick(scale: scale)
        rebuild()

        return true
    }

    private func rebuild() {
        removeAllChildren()

        let layers = visualization.computeLayers(
            scale: scale, direction: direction, selectedColorId: selectedColorId,
            alphaMultiplier: alphaMultiplier, furnitureLift: furnitureLift, lookThrough: lookThrough
        )

        for layer in layers { addChild(FurnitureNode.makeSprite(for: layer)) }
    }

    private static func makeSprite(for layer: FurnitureLayerDraw) -> SKSpriteNode {
        let sprite = SKSpriteNode(texture: layer.texture)

        sprite.anchorPoint = CGPoint(x: 0, y: 1) // TS offsets are top-left registered
        sprite.position = CGPoint(x: CGFloat(layer.offsetX), y: CGFloat(-layer.offsetY)) // screen Y grows downward
        sprite.xScale = layer.flipH ? -1 : 1
        sprite.yScale = layer.flipV ? -1 : 1
        sprite.alpha = CGFloat(max(0, min(255, layer.alpha)) / 255)
        // TS sorts its global sprite list `(a, b) => b.z - a.z` - descending, with index 0 drawn
        // *first* (furthest back) - so a *larger* relativeDepth there means further back. SpriteKit's
        // zPosition is the opposite sense (larger = drawn on top/closer), so this needs negating, not
        // a direct copy - the un-negated version is why the shadow layer (relativeDepth ~0.707, the
        // largest of any layer in a typical item) rendered in *front* of everything instead of behind.
        sprite.zPosition = -CGFloat(layer.relativeDepth)
        sprite.blendMode = FurnitureNode.blendMode(for: layer.blendMode)
        sprite.name = layer.assetName

        if layer.color != 0xFFFFFF {
            // SpriteKit's colorBlendFactor *mixes* toward `color` rather than multiplying like
            // Pixi's `tint`, so this is an approximation - exact for the common 0xFFFFFF
            // (untinted) case, visually close for tinted "colorable" furniture variants.
            sprite.color = skColor(fromRGB: layer.color)
            sprite.colorBlendFactor = 1
        }

        return sprite
    }

    private static func blendMode(for ink: String) -> SKBlendMode {
        switch ink {
            case "add": return .add
            case "screen": return .screen
            case "subtract": return .subtract
            case "multiply": return .multiply
            default: return .alpha
        }
    }

}
