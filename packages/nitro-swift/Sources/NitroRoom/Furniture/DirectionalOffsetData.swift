import Foundation

/// Swift port of `DirectionalOffsetData` (packages/nitro-renderer/src/room/object/visualization/data/DirectionalOffsetData.ts).
public final class DirectionalOffsetData {
    private var offsetX: [Int: Double] = [:]
    private var offsetY: [Int: Double] = [:]

    public func getXOffset(_ direction: Int, defaultX: Double) -> Double { offsetX[direction] ?? defaultX }
    public func getYOffset(_ direction: Int, defaultY: Double) -> Double { offsetY[direction] ?? defaultY }

    public func setDirection(_ direction: Int, offsetX: Double, offsetY: Double) {
        self.offsetX[direction] = offsetX
        self.offsetY[direction] = offsetY
    }
}
