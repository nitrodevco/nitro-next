import Foundation

// Mirrors packages/nitro-api/src/asset/avatar/geometry/*.ts - the embedded `HabboAvatarGeometry` config shape.

public struct AvatarGeometryCameraConfig: Decodable {
    public let x: Double
    public let y: Double
    public let z: Double
}

public struct AvatarBodyPartRefConfig: Decodable {
    public let id: String
}

/// Covers both `IAssetAvatarSetGroup` (top-level) and `IAssetAvatarSet` (nested) - both share this
/// JSON shape, only their TS interfaces differ.
public struct AvatarSetConfig: Decodable {
    public let id: String
    public let main: Bool?
    public let bodyParts: [AvatarBodyPartRefConfig]?
    public let avatarSets: [AvatarSetConfig]?
}

public struct AvatarGeometryItemConfig: Decodable {
    public let id: String
    public let x: Double
    public let y: Double
    public let z: Double
    public let radius: Double
    public let nx: Double?
    public let ny: Double?
    public let nz: Double?
    public let double: Bool?
}

public struct AvatarGeometryBodyPartConfig: Decodable {
    public let id: String
    public let x: Double?
    public let y: Double?
    public let z: Double?
    public let radius: Double?
    public let items: [AvatarGeometryItemConfig]?
}

public struct AvatarGeometryTypeConfig: Decodable {
    public let id: String
    public let bodyParts: [AvatarGeometryBodyPartConfig]
}

public struct AvatarCanvasGeometryConfig: Decodable {
    public let id: String
    public let width: Double
    public let height: Double
    public let dx: Double
    public let dy: Double
}

public struct AvatarCanvasSetConfig: Decodable {
    public let scale: String
    public let geometries: [AvatarCanvasGeometryConfig]
}

public struct AvatarGeometryConfig: Decodable {
    public let direction: Double
    public let camera: AvatarGeometryCameraConfig
    public let canvases: [AvatarCanvasSetConfig]
    public let avatarSets: [AvatarSetConfig]
    public let types: [AvatarGeometryTypeConfig]
}
