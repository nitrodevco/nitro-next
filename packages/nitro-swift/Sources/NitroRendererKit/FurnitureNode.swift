import SpriteKit

import NitroRoom

/// Turns one `FurnitureVisualization.computeLayers()` result into an `SKNode` tree - the
/// SpriteKit-side counterpart of what `RoomObjectSpriteVisualization`'s pooled `IRoomObjectSprite`s
/// would have been rendered as in the TS client.
public final class FurnitureNode: SKNode {
    public private(set) var visualization: FurnitureVisualization

    public init(visualization: FurnitureVisualization) {
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
        removeAllChildren()

        let direction = visualization.resolveDirection(scale: scale, cameraDirectionX: cameraDirectionX, objectDirectionX: objectDirectionX)

        let layers = visualization.computeLayers(
            scale: scale, direction: direction, selectedColorId: selectedColorId,
            alphaMultiplier: alphaMultiplier, furnitureLift: furnitureLift, lookThrough: lookThrough
        )

        for layer in layers { addChild(FurnitureNode.makeSprite(for: layer)) }
    }

    private static func makeSprite(for layer: FurnitureLayerDraw) -> SKSpriteNode {
        let sprite = SKSpriteNode(texture: layer.texture)

        sprite.anchorPoint = CGPoint(x: 0, y: 1) // TS offsets are top-left registered
        sprite.position = CGPoint(x: layer.offsetX, y: -layer.offsetY) // screen Y grows downward
        sprite.xScale = layer.flipH ? -1 : 1
        sprite.yScale = layer.flipV ? -1 : 1
        sprite.alpha = CGFloat(max(0, min(255, layer.alpha)) / 255)
        sprite.zPosition = CGFloat(layer.relativeDepth)
        sprite.blendMode = FurnitureNode.blendMode(for: layer.blendMode)
        sprite.name = layer.assetName

        if layer.color != 0xFFFFFF {
            // SpriteKit's colorBlendFactor *mixes* toward `color` rather than multiplying like
            // Pixi's `tint`, so this is an approximation - exact for the common 0xFFFFFF
            // (untinted) case, visually close for tinted "colorable" furniture variants.
            sprite.color = FurnitureNode.skColor(from: layer.color)
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

    private static func skColor(from rgb: UInt32) -> SKColor {
        let r = CGFloat((rgb >> 16) & 0xFF) / 255
        let g = CGFloat((rgb >> 8) & 0xFF) / 255
        let b = CGFloat(rgb & 0xFF) / 255

        return SKColor(red: r, green: g, blue: b, alpha: 1)
    }
}
