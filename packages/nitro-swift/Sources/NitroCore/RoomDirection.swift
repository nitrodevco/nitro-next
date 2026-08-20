import Foundation

/// The 8 cardinal directions used throughout the room/avatar/furniture systems.
/// Values match the TS side exactly (0 = north, stepping 45 degrees clockwise) so that
/// figure data, furniture direction layers and room camera rotation all agree with the
/// original client.
public enum RoomDirection: Int, CaseIterable, Sendable {
    case north = 0
    case northEast = 1
    case east = 2
    case southEast = 3
    case south = 4
    case southWest = 5
    case west = 6
    case northWest = 7

    /// Raw compass degrees (0-315, step 45) as used by `IAssetVisualizationLayer.direction`.
    public var degrees: Int { rawValue * 45 }

    public init(degrees: Int) {
        let normalized = ((degrees / 45) % 8 + 8) % 8
        self = RoomDirection(rawValue: normalized) ?? .north
    }

    public static func from(degrees: Int) -> RoomDirection {
        RoomDirection(degrees: degrees)
    }

    /// Rotates the direction by `steps` increments of 45 degrees (matches `RoomGeometry` rotation helpers).
    public func rotated(by steps: Int) -> RoomDirection {
        let normalized = ((rawValue + steps) % 8 + 8) % 8
        return RoomDirection(rawValue: normalized)!
    }
}
