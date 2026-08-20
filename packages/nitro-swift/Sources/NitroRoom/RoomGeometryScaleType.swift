/// Mirrors `RoomGeometryScaleType` (packages/nitro-api/src/room/enum/RoomGeometryScaleType.ts).
/// Values double as the base tile pixel size at that zoom level.
public enum RoomGeometryScaleType: Int {
    case zoomedIn = 64
    case zoomedOut = 32
    case avatarSizeNormal = 48
    case icon = 1
    case none = -1
}
