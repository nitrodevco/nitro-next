import SpriteKit

import NitroAvatar

/// Turns an `AvatarCompositor.compose()` result into an `SKNode` tree - the SpriteKit-side
/// counterpart of the composited `Container` the TS client would hand to its Pixi stage.
///
/// Only static (non-animated) poses are supported right now - see the avatar section of the
/// package README. `refresh` rebuilds every layer each call; there is no persistent per-body-part
/// sprite cache the way `AvatarImageCache` has, since that cache exists to avoid re-deriving frame
/// data across animation ticks, which this port doesn't drive yet.
public final class AvatarNode: SKNode {
    public let compositor: AvatarCompositor

    public init(compositor: AvatarCompositor) {
        self.compositor = compositor

        super.init()
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    /// - Parameter direction: facing direction, 0-7 (see `AvatarDirectionAngle`).
    @discardableResult
    public func refresh(
        figure: AvatarFigureContainer,
        direction: Int,
        action: ActionDefinition,
        scale: AvatarScaleType = .large,
        geometryType: AvatarGeometryType = .vertical
    ) -> Bool {
        let layers = compositor.compose(figure: figure, direction: direction, action: action, scale: scale, geometryType: geometryType)

        guard !layers.isEmpty else { return false }

        removeAllChildren()

        for layer in layers { addChild(AvatarNode.makeSprite(for: layer)) }

        return true
    }

    private static func makeSprite(for layer: AvatarLayerDraw) -> SKSpriteNode {
        let sprite = SKSpriteNode(texture: layer.texture)

        sprite.position = CGPoint(x: CGFloat(layer.centerX), y: CGFloat(-layer.centerY)) // avatar-canvas is y-down; SpriteKit is y-up
        sprite.xScale = layer.flipH ? -1 : 1
        sprite.zPosition = CGFloat(layer.zIndex) * 0.001
        sprite.name = "\(layer.bodyPartId).\(layer.partType.rawValue)"

        if layer.color != 0xFFFFFF {
            // Same multiplicative-tint approximation as `FurnitureNode` - see its doc comment.
            sprite.color = skColor(fromRGB: layer.color)
            sprite.colorBlendFactor = 1
        }

        return sprite
    }
}
