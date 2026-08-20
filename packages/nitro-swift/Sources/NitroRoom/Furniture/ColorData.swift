/// Swift port of `ColorData` (packages/nitro-renderer/src/room/object/visualization/data/ColorData.ts).
public final class ColorData {
    public static let defaultColor: UInt32 = 0xFFFFFF

    private var colors: [UInt32]

    public init(layerCount: Int) {
        colors = Array(repeating: ColorData.defaultColor, count: max(0, layerCount))
    }

    public func getLayerColor(_ layerId: Int) -> UInt32 {
        guard layerId >= 0, layerId < colors.count else { return ColorData.defaultColor }

        return colors[layerId]
    }

    public func setColorLayer(_ layerId: Int, _ color: UInt32) {
        // TS only overwrites an already-initialized slot (`if (!existing) return`), which in
        // practice always exists since the array is pre-filled to layerCount in the constructor.
        guard layerId >= 0, layerId < colors.count else { return }

        colors[layerId] = color
    }
}
