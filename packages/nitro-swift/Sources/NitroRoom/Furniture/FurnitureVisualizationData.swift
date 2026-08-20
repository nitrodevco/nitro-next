import Foundation

/// Swift port of `FurnitureVisualizationData` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureVisualizationData.ts).
/// Parses the `visualizations` array of a furniture `.nitro` bundle's asset manifest into
/// per-size `SizeData` lookup tables.
public final class FurnitureVisualizationData {
    public static let layerLetters: [String] = (0..<26).map { String(UnicodeScalar(UInt8(97 + $0))) }

    public private(set) var type: String = ""

    private var sizes: [Int] = []
    private var sizeDatas: [Int: SizeData] = [:]

    private var lastSize: Int = -1
    private var lastSizeScale: Int = -1
    private var lastSizeData: SizeData?
    private var lastSizeDataScale: Int = -1

    public init() {}

    @discardableResult
    public func initialize(type: String, visualizations: [AssetVisualizationData]?) -> Bool {
        reset()

        self.type = type

        guard let visualizations, defineVisualizations(visualizations) else {
            reset()

            return false
        }

        return true
    }

    private func reset() {
        type = ""
        sizeDatas.removeAll()
        sizes.removeAll()
        lastSizeData = nil
        lastSizeDataScale = -1
    }

    private func defineVisualizations(_ visualizations: [AssetVisualizationData]) -> Bool {
        for visualization in visualizations {
            let layerCount = visualization.layerCount ?? 0
            let angle = visualization.angle ?? 45
            let size = max(visualization.size ?? 1, 1)

            if sizeDatas[size] != nil { return false }

            let sizeData = SizeData(layerCount: layerCount, angle: angle)

            if let layers = visualization.layers { sizeData.processLayers(layers) }
            if let directions = visualization.directions { sizeData.processDirections(directions) }
            if let colors = visualization.colors { sizeData.processColors(colors) }

            sizeDatas[size] = sizeData
            sizes.append(size)
        }

        removeInvalidSizes()
        sizes.sort()

        return true
    }

    private func removeInvalidSizes() {
        guard !sizes.isEmpty else { return }

        guard
            let zoomedIn = sizeDatas[RoomGeometryScaleType.zoomedIn.rawValue],
            let zoomedOut = sizeDatas[RoomGeometryScaleType.zoomedOut.rawValue]
        else { return }

        if zoomedIn.layerCount != zoomedOut.layerCount {
            sizeDatas.removeValue(forKey: RoomGeometryScaleType.zoomedOut.rawValue)
            sizes.removeAll { $0 == RoomGeometryScaleType.zoomedOut.rawValue }
        }
    }

    public func getValidSize(_ scale: Int) -> Int {
        if scale == lastSizeScale { return lastSize }

        let index = getSizeIndex(scale)
        let newScale = index < sizes.count ? sizes[index] : -1

        lastSizeScale = scale
        lastSize = newScale

        return newScale
    }

    /// "Nearest by ratio, not by absolute distance" - meaningful because furniture sizes are
    /// scale factors (1/32/64), not a linear range.
    private func getSizeIndex(_ size: Int) -> Int {
        guard size > 0 else { return 0 }

        var index = 0
        var iterator = 1

        while iterator < sizes.count {
            if sizes[iterator] > size {
                if Double(sizes[iterator]) / Double(size) < Double(size) / Double(sizes[iterator - 1]) { index = iterator }

                break
            }

            index = iterator
            iterator += 1
        }

        return index
    }

    private func getSizeData(_ size: Int) -> SizeData? {
        if size == lastSizeDataScale { return lastSizeData }

        let index = getSizeIndex(size)

        lastSizeData = index < sizes.count ? sizeDatas[sizes[index]] : nil
        lastSizeDataScale = size

        return lastSizeData
    }

    public func getLayerCount(_ scale: Int) -> Int { getSizeData(scale)?.layerCount ?? LayerData.defaultCount }

    public func getValidDirection(_ scale: Int, _ direction: Int) -> Int {
        getSizeData(scale)?.getValidDirection(direction) ?? LayerData.defaultDirection
    }

    public func getLayerTag(_ scale: Int, _ direction: Int, _ layerId: Int) -> String {
        getSizeData(scale)?.getLayerTag(direction, layerId) ?? LayerData.defaultTag
    }

    public func getLayerBlendMode(_ scale: Int, _ direction: Int, _ layerId: Int) -> String {
        getSizeData(scale)?.getLayerBlendMode(direction, layerId) ?? LayerData.defaultBlendMode
    }

    public func getLayerAlpha(_ scale: Int, _ direction: Int, _ layerId: Int) -> Double {
        getSizeData(scale)?.getLayerAlpha(direction, layerId) ?? LayerData.defaultAlpha
    }

    public func getLayerColor(_ scale: Int, _ layerId: Int, _ colorId: Int) -> UInt32 {
        getSizeData(scale)?.getLayerColor(layerId, colorId) ?? ColorData.defaultColor
    }

    public func getLayerIgnoreMouse(_ scale: Int, _ direction: Int, _ layerId: Int) -> Bool {
        getSizeData(scale)?.getLayerIgnoreMouse(direction, layerId) ?? LayerData.defaultIgnoreMouse
    }

    public func getLayerXOffset(_ scale: Int, _ direction: Int, _ layerId: Int) -> Double {
        getSizeData(scale)?.getLayerXOffset(direction, layerId) ?? LayerData.defaultXOffset
    }

    public func getLayerYOffset(_ scale: Int, _ direction: Int, _ layerId: Int) -> Double {
        getSizeData(scale)?.getLayerYOffset(direction, layerId) ?? LayerData.defaultYOffset
    }

    public func getLayerZOffset(_ scale: Int, _ direction: Int, _ layerId: Int) -> Double {
        getSizeData(scale)?.getLayerZOffset(direction, layerId) ?? LayerData.defaultZOffset
    }
}
