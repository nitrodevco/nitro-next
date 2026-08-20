import Foundation

/// Swift port of `Randomizer` (packages/nitro-renderer/src/room/object/visualization/room/utils/Randomizer.ts) -
/// a seeded linear congruential generator, singleton-style like the original. Armed per-plane via
/// `RoomPlane`'s `randomSeed` (itself derived deterministically in `RoomVisualization.createPlanesAndSprites`)
/// so re-rendering the same room layout with the same starting seed reproduces the same "random"
/// choices - not currently consumed by anything in this port (the live TS `RoomPlane.update()` also
/// doesn't consume it, only the animated-landscape-layer system would), kept for parity/future use.
public final class Randomizer {
    public static let defaultSeed = 1
    public static let defaultModulus = 16_777_216

    private static let shared = Randomizer()

    private var seed: Double = 1
    private var modulus: Double = 16_777_216
    private let multiplier: Double = 69069
    private let increment: Double = 5

    public static func setSeed(_ value: Int = 1) { shared.seed = Double(value) }
    public static func setModulus(_ value: Int = 16_777_216) { shared.modulus = max(1, Double(value)) }

    public static func getValues(_ count: Int, _ min: Int, _ max: Int) -> [Int] {
        shared.randomValues(count, min, max)
    }

    public static func getArray(_ count: Int, _ max: Int) -> [Int] {
        shared.randomArray(count, max)
    }

    private func randomValues(_ count: Int, _ min: Int, _ max: Int) -> [Int] {
        (0..<count).map { _ in iterateScaled(min, max - min) }
    }

    private func randomArray(_ count: Int, _ max: Int) -> [Int] {
        guard count <= max, max <= 1000 else { return [] }

        var pool = Array(0...max)
        var result: [Int] = []

        for _ in 0..<count {
            let index = iterateScaled(0, pool.count - 1)

            result.append(pool[index])
            pool.remove(at: index)
        }

        return result
    }

    private func iterate() -> Double {
        var value = (multiplier * seed).rounded(.towardZero) + increment

        if value < 0 { value = -value }

        value = value.truncatingRemainder(dividingBy: modulus)
        seed = value

        return value
    }

    private func iterateScaled(_ min: Int, _ range: Int) -> Int {
        let value = iterate()

        guard range >= 1 else { return min }

        return Int((Double(min) + (value / modulus) * Double(range)).rounded(.towardZero))
    }
}
