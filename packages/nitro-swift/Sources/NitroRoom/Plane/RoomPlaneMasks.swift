import Foundation

/// Swift port of `RoomPlaneBitmapMask` (packages/nitro-renderer/src/room/object/visualization/room/RoomPlaneBitmapMask.ts) -
/// a dynamically-added (server-driven, via `RoomPlane.addBitmapMask`) bitmap mask reference on a plane.
public struct RoomPlaneBitmapMask: Equatable {
    public let type: String
    public let leftSideLoc: Double
    public let rightSideLoc: Double
}

/// Swift port of `RoomPlaneRectangleMask` - a dynamically-added rectangle mask on a plane.
public struct RoomPlaneRectangleMask: Equatable {
    public let leftSideLoc: Double
    public let rightSideLoc: Double
    public let leftSideLength: Double
    public let rightSideLength: Double
}
