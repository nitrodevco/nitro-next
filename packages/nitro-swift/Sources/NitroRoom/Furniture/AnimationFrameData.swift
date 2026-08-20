import Foundation

/// Swift port of `AnimationFrameData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationFrameData.ts).
/// Not `final` - `AnimationFrameDirectionalData` subclasses it.
public class AnimationFrameData {
    public let id: Int
    private let storedX: Double
    private let storedY: Double
    public let randomX: Double
    public let randomY: Double
    public let repeats: Int

    public init(id: Int, x: Double, y: Double, randomX: Double, randomY: Double, repeats: Int) {
        self.id = id
        storedX = x
        storedY = y
        self.randomX = randomX
        self.randomY = randomY
        self.repeats = repeats
    }

    public func hasDirectionalOffsets() -> Bool { false }

    public func getX(_ direction: Int) -> Double { storedX }
    public func getY(_ direction: Int) -> Double { storedY }

    public var x: Double { storedX }
    /// Matches the TS source's `get y()` exactly - it returns `_x`, not `_y` (a copy-paste bug in
    /// the original). `getY(direction:)` above is the *correct*, actually-consumed accessor;
    /// this property is replicated verbatim for parity in case anything reads the bare property.
    public var y: Double { storedX }
}

/// Swift port of `AnimationFrameDirectionalData` - adds a per-direction offset override table.
public final class AnimationFrameDirectionalData: AnimationFrameData {
    private let directionalOffsets: DirectionalOffsetData?

    public init(id: Int, x: Double, y: Double, randomX: Double, randomY: Double, offsets: DirectionalOffsetData?, repeats: Int) {
        directionalOffsets = offsets

        super.init(id: id, x: x, y: y, randomX: randomX, randomY: randomY, repeats: repeats)
    }

    public override func hasDirectionalOffsets() -> Bool { directionalOffsets != nil }

    public override func getX(_ direction: Int) -> Double {
        let x = super.getX(direction)

        return directionalOffsets?.getXOffset(direction, defaultX: x) ?? x
    }

    public override func getY(_ direction: Int) -> Double {
        let y = super.getY(direction)

        return directionalOffsets?.getYOffset(direction, defaultY: y) ?? y
    }
}
