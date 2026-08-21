import SpriteKit

import NitroAvatar

/// Turns an `AvatarCompositor.compose()` result into an `SKNode` tree - the SpriteKit-side
/// counterpart of the composited `Container` the TS client would hand to its Pixi stage.
///
/// `refresh` rebuilds every layer each call; there is no persistent per-body-part sprite cache the
/// way `AvatarImageCache` has, since that cache exists to avoid re-deriving frame data across
/// animation ticks, which this port doesn't need the way Pixi's render-texture baking does (see
/// `AvatarCompositor`'s doc comment).
public final class AvatarNode: SKNode {
    public let compositor: AvatarCompositor
    public let pose: AvatarPose

    private var figure: AvatarFigureContainer?
    private var direction: Int = 0
    private var scale: AvatarScaleType = .large
    private var roomScale: Double = 64

    public init(compositor: AvatarCompositor, pose: AvatarPose) {
        self.compositor = compositor
        self.pose = pose

        super.init()
    }

    public required init?(coder aDecoder: NSCoder) { fatalError("init(coder:) has not been implemented") }

    /// - Parameter direction: facing direction, 0-7 (see `AvatarDirectionAngle`).
    /// - Parameter roomScale: the room camera's own zoom scale (`RoomGeometry.scale`, e.g. 64
    ///   zoomed-in) - needed to align the avatar's ground point with the room object it's placed at;
    ///   see `AvatarCompositor.compose`'s doc comment. `RoomScene.placeAvatar` passes its own
    ///   `geometry.scale` here automatically.
    ///
    /// Call `pose.appendAction(...)`/`pose.endActionAppends()` before this if you want anything
    /// beyond the pose's already-resolved actions to take effect - this only rebuilds the sprite
    /// tree from the pose's *current* resolved state, it doesn't touch the pose itself.
    @discardableResult
    public func refresh(figure: AvatarFigureContainer, direction: Int, roomScale: Double, scale: AvatarScaleType = .large) -> Bool {
        self.figure = figure
        self.direction = direction
        self.scale = scale
        self.roomScale = roomScale

        return rebuild()
    }

    /// Advances the pose's animation frame counter by one tick and rebuilds - call at the classic
    /// ~24.4fps rate (`RoomScene` does, matching furniture - see its doc comment), not once per
    /// rendered frame. A no-op (returns `false`) until `refresh` has been called at least once.
    @discardableResult
    public func tickAnimation() -> Bool {
        guard figure != nil else { return false }

        pose.updateAnimationByFrames()

        return rebuild()
    }

    @discardableResult
    private func rebuild() -> Bool {
        guard let figure else { return false }

        let layers = compositor.compose(figure: figure, direction: direction, pose: pose, roomScale: roomScale, scale: scale)

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
