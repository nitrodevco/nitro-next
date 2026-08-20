import Foundation

/// Swift port of `SizeData` (packages/nitro-renderer/src/room/object/visualization/data/SizeData.ts).
/// One instance per declared `size` (32/64/1) within a furniture's `IAssetVisualizationData[]`.
/// Not `final` - `AnimationSizeData` subclasses it, matching the original's `AnimationSizeData extends SizeData`.
public class SizeData {
    public static let maxLayers = 26

    private let _layerCount: Int
    private let angle: Double

    private let defaultDirection: DirectionData
    private var directions: [Int: DirectionData] = [:]
    private var colors: [Int: ColorData] = [:]

    private var lastDirectionData: DirectionData?
    private var lastDirection: Int = -1

    public init(layerCount: Int, angle: Double) {
        _layerCount = min(max(layerCount, 0), SizeData.maxLayers)
        self.angle = min(max(angle, 1), 360)
        defaultDirection = DirectionData(layerCount: _layerCount)
    }

    @discardableResult
    public func processLayers(_ layers: [AssetVisualizationLayer]) -> Bool {
        setDirectionLayers(defaultDirection, layers)
    }

    @discardableResult
    public func processDirections(_ directionList: [AssetVisualizationDirection]) -> Bool {
        for direction in directionList {
            if directions[direction.id] != nil { return false }

            let directionData = DirectionData(layerCount: _layerCount)

            directionData.setFrom(defaultDirection)

            if let layers = direction.layers { setDirectionLayers(directionData, layers) }

            directions[direction.id] = directionData
            lastDirectionData = nil
            lastDirection = -1
        }

        return true
    }

    @discardableResult
    public func processColors(_ colorList: [AssetColor]) -> Bool {
        for color in colorList {
            if colors[color.id] != nil { return false }

            let colorData = ColorData(layerCount: _layerCount)

            for layer in color.layers ?? [] {
                if let value = layer.color { colorData.setColorLayer(layer.id, value) }
            }

            colors[color.id] = colorData
        }

        return true
    }

    @discardableResult
    private func setDirectionLayers(_ directionData: DirectionData, _ layers: [AssetVisualizationLayer]) -> Bool {
        for layer in layers {
            guard layer.id >= 0, layer.id < _layerCount else { return false }

            if let ink = layer.ink { directionData.setLayerBlendMode(layer.id, ink.lowercased()) }
            if let tag = layer.tag { directionData.setLayerTag(layer.id, tag) }
            if let alpha = layer.alpha { directionData.setLayerAlpha(layer.id, alpha) }
            if let ignoreMouse = layer.ignoreMouse { directionData.setLayerIgnoreMouse(layer.id, ignoreMouse) }
            if let x = layer.x { directionData.setLayerXOffset(layer.id, x) }
            if let y = layer.y { directionData.setLayerYOffset(layer.id, y) }
            if let z = layer.z { directionData.setLayerZOffset(layer.id, z / -1000) }
        }

        return true
    }

    public func getValidDirection(_ requested: Int) -> Int {
        if directions[requested] != nil { return requested }

        let direction = Double(((requested % 360) + 360) % 360)

        var currentAngle: Double = -1
        var validDirection = -1

        for key in directions.keys {
            var a = (Double(key) * angle - direction + 360).truncatingRemainder(dividingBy: 360)

            if a > 180 { a = 360 - a }

            if a < currentAngle || currentAngle < 0 {
                currentAngle = a
                validDirection = key
            }
        }

        return validDirection >= 0 ? validDirection : 0
    }

    public func getDirectionData(_ direction: Int) -> DirectionData {
        if direction == lastDirection, let cached = lastDirectionData { return cached }

        let data = directions[direction] ?? defaultDirection

        lastDirection = direction
        lastDirectionData = data

        return data
    }

    public func getLayerTag(_ direction: Int, _ layerId: Int) -> String { getDirectionData(direction).getLayerTag(layerId) }
    public func getLayerBlendMode(_ direction: Int, _ layerId: Int) -> String { getDirectionData(direction).getLayerBlendMode(layerId) }
    public func getLayerAlpha(_ direction: Int, _ layerId: Int) -> Double { getDirectionData(direction).getLayerAlpha(layerId) }
    public func getLayerIgnoreMouse(_ direction: Int, _ layerId: Int) -> Bool { getDirectionData(direction).getLayerIgnoreMouse(layerId) }
    public func getLayerXOffset(_ direction: Int, _ layerId: Int) -> Double { getDirectionData(direction).getLayerXOffset(layerId) }
    public func getLayerYOffset(_ direction: Int, _ layerId: Int) -> Double { getDirectionData(direction).getLayerYOffset(layerId) }
    public func getLayerZOffset(_ direction: Int, _ layerId: Int) -> Double { getDirectionData(direction).getLayerZOffset(layerId) }

    public func getLayerColor(_ layerId: Int, _ colorId: Int) -> UInt32 {
        colors[colorId]?.getLayerColor(layerId) ?? ColorData.defaultColor
    }

    public var layerCount: Int { _layerCount }
}
