import Foundation

/// Mirrors `IAssetVisualizationLayer` (packages/nitro-api/src/asset/visualization/IAssetVisualizationLayer.ts).
public struct AssetVisualizationLayer: Decodable {
    public let id: Int
    public let x: Double?
    public let y: Double?
    public let z: Double?
    public let alpha: Double?
    public let ink: String?
    public let tag: String?
    public let ignoreMouse: Bool?
}

/// Mirrors `IAssetVisualizationDirection`.
public struct AssetVisualizationDirection: Decodable {
    public let id: Int
    public let layers: [AssetVisualizationLayer]?
}

/// Mirrors `IAssetColorLayer`.
public struct AssetColorLayer: Decodable {
    public let id: Int
    public let color: UInt32?
}

/// Mirrors `IAssetColor`.
public struct AssetColor: Decodable {
    public let id: Int
    public let layers: [AssetColorLayer]?
}

/// Mirrors `IAssetVisualAnimationSequenceFrameOffset` (packages/nitro-api/src/asset/visualization/animation/IAssetVisualAnimationSequenceFrameOffset.ts).
public struct AssetVisualAnimationSequenceFrameOffset: Decodable {
    public let direction: Int
    public let x: Double?
    public let y: Double?
}

/// Mirrors `IAssetVisualAnimationSequenceFrame`.
public struct AssetVisualAnimationSequenceFrame: Decodable {
    public let id: Int
    public let x: Double?
    public let y: Double?
    public let randomX: Double?
    public let randomY: Double?
    public let offsets: [AssetVisualAnimationSequenceFrameOffset]?
}

/// Mirrors `IAssetVisualAnimationSequence`.
public struct AssetVisualAnimationSequence: Decodable {
    public let loopCount: Int?
    public let random: Int?
    public let frames: [AssetVisualAnimationSequenceFrame]?
}

/// Mirrors `IAssetVisualAnimationLayer`.
public struct AssetVisualAnimationLayer: Decodable {
    public let id: Int
    public let loopCount: Int?
    public let frameRepeat: Int?
    public let random: Int?
    public let frameSequences: [AssetVisualAnimationSequence]?
}

/// Mirrors `IAssetVisualAnimation`.
public struct AssetVisualAnimation: Decodable {
    public let id: Int
    public let transitionTo: Int?
    public let transitionFrom: Int?
    public let immediateChangeFrom: String?
    public let randomStart: Bool?
    public let layers: [AssetVisualAnimationLayer]?
}

/// Mirrors the subset of `IAssetVisualizationData` (packages/nitro-api/src/asset/visualization/IAssetVisualizationData.ts)
/// consumed by furniture layer resolution. Posture/gesture fields (used by avatar-worn "postures"
/// and pet gestures, not by plain room furniture) are still out of scope - see the README.
public struct AssetVisualizationData: Decodable {
    public let size: Int?
    public let layerCount: Int?
    public let angle: Double?
    public let layers: [AssetVisualizationLayer]?
    public let colors: [AssetColor]?
    public let directions: [AssetVisualizationDirection]?
    public let animations: [AssetVisualAnimation]?
}
