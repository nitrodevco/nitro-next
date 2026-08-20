import Foundation

import NitroCore

/// Swift port of `RoomFurnitureData` (packages/nitro-renderer/src/room/utils/RoomFurnitureData.ts) -
/// the placement/ownership record for one furniture instance in a room: which tile it sits on,
/// which way it faces, its current logic state, and expiry/ownership metadata. This is the piece
/// that would normally arrive over the network (parsed from an `ObjectsComposer`/`ObjectAddComposer`
/// message) and get handed to `RoomScene.placeFurniture`; since this port has no networking layer
/// (see the README), it's exposed as a plain, constructible value the host app fills in from
/// wherever *its* furniture data comes from.
///
/// Deliberately drops the TS original's `data: IObjectData` field - that's a full server-message
/// parser (`parseWrapper`/`initializeFromRoomObjectModel`/`writeRoomObjectModel`, used for things
/// like sticky-note text/color and legacy wall-item strings), not a plain value, and belongs with
/// the rest of the out-of-scope networking/logic layer. `state` (the one `IObjectData` field that
/// actually drives rendering, via `FurnitureAnimatedVisualization.setState`) is kept as a direct field.
public struct RoomFurnitureData {
    public let id: Int
    public let typeId: Int
    public let type: String
    public let location: Vector3d
    public let direction: Vector3d
    public let state: Int
    /// `NaN` by default, matching the original's `extra: number = NaN` - a numeric "not set" sentinel,
    /// not an oversight.
    public let extra: Double
    public let expiryTime: Int
    public let usagePolicy: Int
    public let ownerId: Int
    public let ownerName: String
    public let synchronized: Bool
    public let realRoomObject: Bool
    /// Fractional stack height override (e.g. for `FurnitureCustomStackHeightLogic`-driven items);
    /// `-1` means "use the furniture's own declared height".
    public let sizeZ: Double

    public init(
        id: Int,
        typeId: Int,
        type: String,
        location: Vector3d,
        direction: Vector3d,
        state: Int,
        extra: Double = .nan,
        expiryTime: Int = -1,
        usagePolicy: Int = 0,
        ownerId: Int = 0,
        ownerName: String = "",
        synchronized: Bool = true,
        realRoomObject: Bool = true,
        sizeZ: Double = -1
    ) {
        self.id = id
        self.typeId = typeId
        self.type = type
        // Defensively copied, matching the original's `this._location.assign(location)` - `Vector3d`
        // is a mutable reference type here (see its doc comment), so this avoids aliasing whatever
        // vector the caller passed in.
        self.location = Vector3d.from(location)
        self.direction = Vector3d.from(direction)
        self.state = state
        self.extra = extra
        self.expiryTime = expiryTime
        self.usagePolicy = usagePolicy
        self.ownerId = ownerId
        self.ownerName = ownerName
        self.synchronized = synchronized
        self.realRoomObject = realRoomObject
        self.sizeZ = sizeZ
    }
}
