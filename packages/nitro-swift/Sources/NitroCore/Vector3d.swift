import Foundation

/// Swift port of `Vector3d` (packages/nitro-api/src/utils/Vector3d.ts). Used by the room camera
/// projection math (`RoomGeometry`) and, eventually, avatar/room-object placement.
public final class Vector3d {
    private var _length: Double = .nan

    public var x: Double { didSet { _length = .nan } }
    public var y: Double { didSet { _length = .nan } }
    public var z: Double { didSet { _length = .nan } }

    public init(_ x: Double = 0, _ y: Double = 0, _ z: Double = 0) {
        self.x = x
        self.y = y
        self.z = z
    }

    public static func from(_ vector: Vector3d?) -> Vector3d {
        let v = Vector3d()

        if let vector { v.assign(vector) }

        return v
    }

    public static func empty() -> Vector3d { Vector3d() }

    public static func sum(_ v1: Vector3d?, _ v2: Vector3d?) -> Vector3d {
        guard let v1, let v2 else { return .empty() }

        return Vector3d(v1.x + v2.x, v1.y + v2.y, v1.z + v2.z)
    }

    public static func dif(_ v1: Vector3d?, _ v2: Vector3d?) -> Vector3d {
        guard let v1, let v2 else { return .empty() }

        return Vector3d(v1.x - v2.x, v1.y - v2.y, v1.z - v2.z)
    }

    public static func product(_ vector: Vector3d?, _ value: Double) -> Vector3d {
        guard let vector else { return .empty() }

        return Vector3d(vector.x * value, vector.y * value, vector.z * value)
    }

    public static func dotProduct(_ v1: Vector3d?, _ v2: Vector3d?) -> Double {
        guard let v1, let v2 else { return 0 }

        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    }

    public static func crossProduct(_ v1: Vector3d?, _ v2: Vector3d?) -> Vector3d {
        guard let v1, let v2 else { return .empty() }

        let product = Vector3d()

        product.x = v1.y * v2.z - v1.z * v2.y
        product.y = v1.z * v2.x - v1.x * v2.z
        product.z = v1.x * v2.y - v1.y * v2.x

        return product
    }

    public static func scalarProjection(_ v1: Vector3d?, _ v2: Vector3d?) -> Double {
        guard let v1, let v2 else { return -1 }

        let length = v2.length

        guard length > 0 else { return -1 }

        return (v1.x * v2.x + v1.y * v2.y + v1.z * v2.z) / length
    }

    public static func cosAngle(_ v1: Vector3d?, _ v2: Vector3d?) -> Double {
        guard let v1, let v2 else { return 0 }

        let totalLength = v1.length * v2.length

        guard totalLength != 0 else { return 0 }

        return dotProduct(v1, v2) / totalLength
    }

    public static func isEqual(_ v1: Vector3d?, _ v2: Vector3d?) -> Bool {
        guard let v1, let v2 else { return false }

        return v1.x == v2.x && v1.y == v2.y && v1.z == v2.z
    }

    public func assign(_ vector: Vector3d?) {
        guard let vector else { return }

        x = vector.x
        y = vector.y
        z = vector.z
    }

    public func add(_ vector: Vector3d?) {
        guard let vector else { return }

        x += vector.x
        y += vector.y
        z += vector.z
    }

    public func subtract(_ vector: Vector3d?) {
        guard let vector else { return }

        x -= vector.x
        y -= vector.y
        z -= vector.z
    }

    public func multiply(_ amount: Double) {
        x *= amount
        y *= amount
        z *= amount
    }

    public func divide(_ amount: Double) {
        guard amount != 0 else { return }

        x /= amount
        y /= amount
        z /= amount
    }

    public func negate() {
        x = -x
        y = -y
        z = -z
    }

    public func dotProduct(_ vector: Vector3d) -> Double {
        x * vector.x + y * vector.y + z * vector.z
    }

    public func crossProduct(_ vector: Vector3d) -> Vector3d {
        Vector3d(
            y * vector.z - z * vector.y,
            z * vector.x - x * vector.z,
            x * vector.y - y * vector.x
        )
    }

    public func normalize() {
        let k = 1 / length

        x *= k
        y *= k
        z *= k
    }

    public var length: Double {
        if _length.isNaN { _length = (x * x + y * y + z * z).squareRoot() }

        return _length
    }
}
