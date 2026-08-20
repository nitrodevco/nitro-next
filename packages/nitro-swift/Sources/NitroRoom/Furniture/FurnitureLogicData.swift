import Foundation

import NitroAssets

/// Mirrors `IAssetDimension` (packages/nitro-api/src/asset/logic/model/IAssetDimension.ts).
public struct AssetDimension: Decodable {
    public let x: Double
    public let y: Double
    public let z: Double?
    public let centerZ: Double?
}

/// Mirrors `IAssetLogicModel`.
public struct AssetLogicModel: Decodable {
    public let dimensions: AssetDimension?
    public let directions: [Int]?
}

/// Mirrors `ICustomVars` (packages/nitro-api/src/asset/logic/IAssetLogicCustomVars.ts).
public struct AssetLogicCustomVars: Decodable {
    public let variables: [String]?
}

/// Mirrors the subset of `IAssetLogicData` (packages/nitro-api/src/asset/logic/IAssetLogicData.ts)
/// this port consumes - `maskType`/`credits`/`soundSample`/`action`/`planetSystems`/`particleSystems`
/// belong to out-of-scope Logic/particle-system subclasses (see the README).
public struct AssetLogicData: Decodable {
    public let model: AssetLogicModel?
    public let customVars: AssetLogicCustomVars?
}

/// Swift port of the asset-driven (non-networked) portion of `FurnitureLogic.initialize`
/// (packages/nitro-renderer/src/room/object/logic/furniture/FurnitureLogic.ts) - parses a
/// furniture's `logic.model` (footprint dimensions, allowed rotation directions) and
/// `logic.customVars` (custom variable name list) straight out of the `.nitro` bundle's asset
/// manifest, the same way `FurnitureVisualizationData` parses `visualizations`. `writeToModel`
/// writes the results into a `RoomObjectModel` under exactly the keys the TS original does
/// (`FurnitureSizeX/Y/Z`, `FurnitureCenterX/Y/Z`, `FurnitureAllowedDirections`,
/// `FurnitureCustomVariables`, `FurnitureAlphaMultiplier`), so the handful of
/// `FurnitureAnimatedVisualization` subclasses that read those keys (or a host app's own room
/// placement logic wanting footprint/rotation data) can use them without re-deriving anything.
///
/// Everything else in `FurnitureLogic` - mouse/click handling, widget/context-menu events,
/// double-click "use" actions, the rotate-bounce animation, and all server-message parsing
/// (`ObjectDataUpdateMessage`/`ObjectMoveUpdateMessage`/`ObjectSelectedMessage`/...) - is
/// genuinely input/message-driven, not asset-driven, and stays out of scope; see the README. The
/// concrete `Furniture*Logic` subclasses (dice rolls, multi-state cycling, ...) are almost
/// entirely built from exactly that input/message machinery - see `RoomFurnitureData`'s and
/// `FurnitureAnimatedVisualization`'s doc comments for why a click-driven "next state" can't be
/// computed client-side here the way it is server-side in the original.
public struct FurnitureLogicData {
    public let sizeX: Double
    public let sizeY: Double
    public let sizeZ: Double
    public let centerX: Double
    public let centerY: Double
    public let centerZ: Double
    public let allowedDirections: [Int]
    public let customVariables: [String]

    public init(sizeX: Double = 0, sizeY: Double = 0, sizeZ: Double = 0, allowedDirections: [Int] = [], customVariables: [String] = []) {
        self.sizeX = sizeX
        self.sizeY = sizeY
        self.sizeZ = sizeZ
        centerX = sizeX / 2
        centerY = sizeY / 2
        centerZ = sizeZ / 2
        self.allowedDirections = allowedDirections.sorted()
        self.customVariables = customVariables
    }

    /// Returns all-zero/empty defaults (matching the TS constructor's own defaults) if the
    /// collection's asset manifest has no `logic` entry, or it fails to decode.
    public static func parse(from collection: GraphicAssetCollection) -> FurnitureLogicData {
        guard
            let raw = collection.rawJSON["logic"],
            let jsonData = try? JSONSerialization.data(withJSONObject: raw),
            let logic = try? JSONDecoder().decode(AssetLogicData.self, from: jsonData)
        else {
            return FurnitureLogicData()
        }

        let dimensions = logic.model?.dimensions

        return FurnitureLogicData(
            sizeX: dimensions?.x ?? 0, sizeY: dimensions?.y ?? 0, sizeZ: dimensions?.z ?? 0,
            allowedDirections: logic.model?.directions ?? [], customVariables: logic.customVars?.variables ?? []
        )
    }

    /// `FurnitureAlphaMultiplier` is set to `1` unconditionally, matching `FurnitureLogic.initialize`
    /// setting it outside the `if (asset.logic)` guard; `FurnitureCustomVariables` is only written
    /// when non-empty, matching the original's own `if (variables && variables.length)` check.
    @discardableResult
    public func writeToModel(_ model: RoomObjectModel) -> RoomObjectModel {
        model.setValue(.furnitureSizeX, sizeX)
        model.setValue(.furnitureSizeY, sizeY)
        model.setValue(.furnitureSizeZ, sizeZ)
        model.setValue(.furnitureCenterX, centerX)
        model.setValue(.furnitureCenterY, centerY)
        model.setValue(.furnitureCenterZ, centerZ)
        model.setValue(.furnitureAllowedDirections, allowedDirections)
        model.setValue(.furnitureAlphaMultiplier, 1.0)

        if !customVariables.isEmpty { model.setValue(.furnitureCustomVariables, customVariables) }

        return model
    }
}
