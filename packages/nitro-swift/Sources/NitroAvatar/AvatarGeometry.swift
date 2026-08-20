import Foundation

import NitroCore

/// Mirrors `AvatarDirectionAngle` (packages/nitro-api/src/avatar/enum/AvatarDirectionAngle.ts).
public enum AvatarDirectionAngle {
    /// Yaw (degrees) used purely for the depth-sort rotation below - independent of the room
    /// camera's own angle scheme (see `RoomGeometry`).
    public static let directionToAngle: [Int] = [45, 90, 135, 180, 225, 270, 315, 0]
    /// Directions 4-6 are rendered as horizontally-mirrored versions of directions 2-0, so the
    /// asset library only ships 5 unique facings instead of 8.
    public static let directionIsFlipped: [Bool] = [false, false, false, false, true, true, true, false]
    public static let minDirection = 0
    public static let maxDirection = 7
}

/// A 3x3 rotation matrix, row-major, matching `Matrix4x4.getYRotationMatrix`/`vectorMultiplication`
/// (packages/nitro-renderer/src/avatar/geometry/... - despite the TS class's "4x4" name, only the
/// 3x3 rotation + vector-multiply path used by the depth-sort below is ported; `rotateX/Z`,
/// `multiply`, `transpose` etc. exist in the TS source as general utilities but aren't exercised
/// by any traced call path).
public enum Matrix4x4 {
    public static func yRotationMatrix(degrees: Double) -> [Double] {
        let rad = degrees * .pi / 180
        let c = cos(rad)
        let s = sin(rad)

        return [c, 0, s, 0, 1, 0, -s, 0, c]
    }

    public static func multiply(_ v: Vector3d, _ m: [Double]) -> Vector3d {
        Vector3d(
            v.x * m[0] + v.y * m[3] + v.z * m[6],
            v.x * m[1] + v.y * m[4] + v.z * m[7],
            v.x * m[2] + v.y * m[5] + v.z * m[8]
        )
    }
}

/// One figure-part-type slot or body-region within the avatar geometry config (`GeometryItem`/
/// `GeometryBodyPart` in packages/nitro-renderer/src/avatar/geometry/*.ts), reduced to just what
/// the depth-sort needs: a static declared location and a "thickness" radius.
public struct AvatarGeometryNode {
    public let id: String
    public let location: Vector3d
    public let radius: Double

    public init(id: String, location: Vector3d, radius: Double = 0) {
        self.id = id
        self.location = location
        self.radius = radius
    }
}

/// Swift port of the shared depth-sort pattern used by both `GeometryBodyPart.getParts` and
/// `AvatarModelGeometry.getBodyPartsAtAngle`: rotate every node's static location around the
/// model's Y axis, then sort by distance-to-camera along Z.
///
/// `angleDegrees` is taken as-is (no direction-index lookup here) because the two TS call sites
/// disagree on what they pass: `AvatarModelGeometry.getBodyPartsAtAngle` resolves the 0-7 facing
/// index through `AvatarDirectionAngle.DIRECTION_TO_ANGLE` first, while `AvatarModelGeometry.getParts`
/// (the one that actually decides which figure layers are visible) passes the raw 0-7 index straight
/// into `Matrix4x4.getYRotationMatrix` *without* that lookup - i.e. it rotates by at most 7 degrees,
/// not by the compass angle. That looks like a bug, but it's the live behavior, so callers below
/// replicate it exactly rather than "fixing" it - see `AvatarModelGeometry.getParts`'s doc comment.
///
/// Returns ids ordered **nearest-camera-first**; per `AvatarImage.getImage`, callers composite by
/// iterating this list in *reverse* (back-to-front painter's algorithm), so the nearest part to
/// the camera is drawn last, i.e. on top.
public func sortAvatarNodesByDepth(_ nodes: [AvatarGeometryNode], angleDegrees: Double, camera: Vector3d) -> [String] {
    let matrix = Matrix4x4.yRotationMatrix(degrees: angleDegrees)

    let keyed: [(id: String, key: Double)] = nodes.map { node in
        let needsTransform = node.location.x != 0 || node.location.y != 0 || node.location.z != 0
        let transformed = needsTransform ? Matrix4x4.multiply(node.location, matrix) : node.location

        let a = abs(camera.z - transformed.z - node.radius)
        let b = abs(camera.z - transformed.z + node.radius)

        return (node.id, min(a, b))
    }

    return keyed.sorted { $0.key < $1.key }.map(\.id)
}
