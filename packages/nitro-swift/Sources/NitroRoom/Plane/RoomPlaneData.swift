import Foundation

import NitroCore

/// One rectangle-shaped mask baked directly onto a plane at parse time (distinct from the dynamic,
/// server-driven bitmap mask system in `PlaneMaskManager`). Mirrors `RoomPlaneMaskData`.
public struct RoomPlaneMaskData {
    public let leftSideLoc: Double
    public let rightSideLoc: Double
    public let leftSideLength: Double
    public let rightSideLength: Double
}

/// Swift port of `RoomPlaneData` (packages/nitro-renderer/src/room/object/RoomPlaneData.ts) - the
/// geometry record for one floor/wall/landscape polygon (a parallelogram: `loc` is one corner,
/// `leftSide`/`rightSide` are edge vectors).
public final class RoomPlaneData {
    public static let planeUndefined = 0
    public static let planeFloor = 1
    public static let planeWall = 2
    public static let planeLandscape = 3
    public static let planeBillboard = 4

    public let type: Int
    public let loc: Vector3d
    public let leftSide: Vector3d
    public let rightSide: Vector3d
    public let normal: Vector3d
    /// `x` = yaw (0-360), `y` = pitch (0-360) of the plane's facing direction - used to bucket
    /// which bitmap-mask art variant applies to this plane (see `PlaneMaskVisualization`).
    public let normalDirection: Vector3d
    public private(set) var secondaryNormals: [Vector3d] = []
    public private(set) var masks: [RoomPlaneMaskData] = []

    public init(type: Int, loc: Vector3d, leftSide: Vector3d, rightSide: Vector3d, secondaryNormals: [Vector3d]) {
        self.type = type
        self.loc = Vector3d.from(loc)
        self.leftSide = Vector3d.from(leftSide)
        self.rightSide = Vector3d.from(rightSide)

        let normal = Vector3d.crossProduct(leftSide, rightSide)

        self.normal = normal

        var normalX: Double = 0
        var normalY: Double = 0

        if normal.x > 0 || normal.y > 0 {
            var x = normal.x
            var y = normal.y

            normalX = 360 + (atan2(y, x) / .pi) * 180
            if normalX >= 360 { normalX -= 360 }

            x = (normal.x * normal.x + normal.y * normal.y).squareRoot()
            y = normal.z

            normalY = 360 + (atan2(y, x) / .pi) * 180
            if normalY >= 360 { normalY -= 360 }
        } else if normal.z < 0 {
            normalY = 90
        } else {
            normalY = 270
        }

        normalDirection = Vector3d(normalX, normalY, 0)

        for secondaryNormal in secondaryNormals where secondaryNormal.length > 0 {
            let normalized = Vector3d.from(secondaryNormal)

            normalized.multiply(1 / normalized.length)
            self.secondaryNormals.append(normalized)
        }
    }

    public func getSecondaryNormal(_ index: Int) -> Vector3d {
        guard index >= 0, index < secondaryNormals.count else { return Vector3d() }

        return Vector3d.from(secondaryNormals[index])
    }

    public func addMask(leftSideLoc: Double, rightSideLoc: Double, leftSideLength: Double, rightSideLength: Double) {
        masks.append(RoomPlaneMaskData(leftSideLoc: leftSideLoc, rightSideLoc: rightSideLoc, leftSideLength: leftSideLength, rightSideLength: rightSideLength))
    }
}
