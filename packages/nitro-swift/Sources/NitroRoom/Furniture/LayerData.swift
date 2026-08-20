import Foundation

/// Swift port of `LayerData` (packages/nitro-renderer/src/room/object/visualization/data/LayerData.ts).
/// One entry per drawable layer (a-z, plus the synthetic shadow layer) within a `DirectionData`.
public final class LayerData {
    public static let defaultTag = ""
    public static let defaultBlendMode = "normal"
    /// Note: alpha is 0-255 (Pixi convention), not 0-1 - matches the TS default exactly.
    public static let defaultAlpha: Double = 255
    public static let defaultIgnoreMouse = false
    public static let defaultXOffset: Double = 0
    public static let defaultYOffset: Double = 0
    public static let defaultZOffset: Double = 0
    public static let defaultCount = 0
    public static let defaultDirection = 0

    public var tag: String = LayerData.defaultTag
    public var blendMode: String = LayerData.defaultBlendMode
    public var alpha: Double = LayerData.defaultAlpha
    public var ignoreMouse: Bool = LayerData.defaultIgnoreMouse
    public var xOffset: Double = LayerData.defaultXOffset
    public var yOffset: Double = LayerData.defaultYOffset
    public var zOffset: Double = LayerData.defaultZOffset

    public init() {}

    public func setFrom(_ layer: LayerData?) {
        guard let layer else { return }

        tag = layer.tag
        blendMode = layer.blendMode
        alpha = layer.alpha
        ignoreMouse = layer.ignoreMouse
        xOffset = layer.xOffset
        yOffset = layer.yOffset
        zOffset = layer.zOffset
    }
}
