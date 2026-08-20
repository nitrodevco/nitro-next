import Foundation

/// Swift port of `DirectionData` (packages/nitro-renderer/src/room/object/visualization/data/DirectionData.ts).
public final class DirectionData {
    public static let useDefaultDirection = -1

    private var layers: [LayerData]

    public init(layerCount: Int) {
        layers = (0..<max(0, layerCount)).map { _ in LayerData() }
    }

    public func setFrom(_ other: DirectionData?) {
        guard let other, layerCount == other.layerCount else { return }

        for i in 0..<layerCount { getLayer(i)?.setFrom(other.getLayer(i)) }
    }

    public func getLayer(_ layerId: Int) -> LayerData? {
        guard layerId >= 0, layerId < layers.count else { return nil }

        return layers[layerId]
    }

    public func getLayerTag(_ layerId: Int) -> String { getLayer(layerId)?.tag ?? LayerData.defaultTag }
    public func setLayerTag(_ layerId: Int, _ tag: String) { getLayer(layerId)?.tag = tag }

    public func getLayerBlendMode(_ layerId: Int) -> String { getLayer(layerId)?.blendMode ?? LayerData.defaultBlendMode }
    public func setLayerBlendMode(_ layerId: Int, _ blendMode: String) {
        guard !blendMode.isEmpty else { return }

        getLayer(layerId)?.blendMode = blendMode
    }

    public func getLayerAlpha(_ layerId: Int) -> Double { getLayer(layerId)?.alpha ?? LayerData.defaultAlpha }
    public func setLayerAlpha(_ layerId: Int, _ alpha: Double) { getLayer(layerId)?.alpha = alpha }

    public func getLayerIgnoreMouse(_ layerId: Int) -> Bool { getLayer(layerId)?.ignoreMouse ?? LayerData.defaultIgnoreMouse }
    public func setLayerIgnoreMouse(_ layerId: Int, _ flag: Bool) { getLayer(layerId)?.ignoreMouse = flag }

    public func getLayerXOffset(_ layerId: Int) -> Double { getLayer(layerId)?.xOffset ?? LayerData.defaultXOffset }
    public func setLayerXOffset(_ layerId: Int, _ offset: Double) { getLayer(layerId)?.xOffset = offset }

    public func getLayerYOffset(_ layerId: Int) -> Double { getLayer(layerId)?.yOffset ?? LayerData.defaultYOffset }
    public func setLayerYOffset(_ layerId: Int, _ offset: Double) { getLayer(layerId)?.yOffset = offset }

    public func getLayerZOffset(_ layerId: Int) -> Double { getLayer(layerId)?.zOffset ?? LayerData.defaultZOffset }
    public func setLayerZOffset(_ layerId: Int, _ offset: Double) { getLayer(layerId)?.zOffset = offset }

    public var layerCount: Int { layers.count }
}
