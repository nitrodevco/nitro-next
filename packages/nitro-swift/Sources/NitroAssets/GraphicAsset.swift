import CoreGraphics
import SpriteKit

/// Swift port of `GraphicAsset` (packages/nitro-renderer/src/assets/GraphicAsset.ts).
///
/// Note: the TS version pools/recycles instances to reduce GC pressure under Pixi; that's a
/// JS-runtime-specific optimization with no equivalent need under Swift's ARC, so it's dropped
/// here (`recycle()` is kept as a documented no-op for call-site parity).
public final class GraphicAsset {
    public let name: String
    public let source: String?
    public let texture: SKTexture?
    public let usesPalette: Bool
    public let x: Double
    public let y: Double
    public let flipH: Bool
    public let flipV: Bool

    public init(
        name: String,
        source: String?,
        texture: SKTexture?,
        x: Double,
        y: Double,
        flipH: Bool = false,
        flipV: Bool = false,
        usesPalette: Bool = false
    ) {
        self.name = name
        self.source = source
        self.texture = texture
        self.x = x
        self.y = y
        self.flipH = flipH
        self.flipV = flipV
        self.usesPalette = usesPalette
    }

    /// No-op under ARC; kept so ports of call sites that call `.recycle()` compile unchanged.
    public func recycle() {}

    public var width: CGFloat { texture?.size().width ?? 0 }
    public var height: CGFloat { texture?.size().height ?? 0 }

    public var offsetX: Double { flipH ? -x : x }
    public var offsetY: Double { flipV ? -y : y }

    public var rectangle: CGRect { CGRect(x: 0, y: 0, width: width, height: height) }
}
