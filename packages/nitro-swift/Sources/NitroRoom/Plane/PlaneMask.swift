import CoreGraphics
import Foundation
import SpriteKit

import NitroAssets
import NitroCore

/// Mirrors `IMaskEntry` - one positioned sprite to composite into a plane's merged mask texture.
public struct MaskEntry {
    public let texture: SKTexture
    public let position: CGPoint
    public let size: CGSize?
    public let scale: CGPoint
}

/// Swift port of `PlaneMaskBitmap` (packages/nitro-renderer/src/room/object/visualization/room/mask/PlaneMaskBitmap.ts).
public struct PlaneMaskBitmap {
    public let asset: GraphicAsset
    public let normalMinX: Double
    public let normalMaxX: Double
    public let normalMinY: Double
    public let normalMaxY: Double
}

/// Swift port of `PlaneMaskVisualization` - picks a bitmap by which "normal direction bucket" a
/// plane's facing normal (in camera coordinates) falls into.
public final class PlaneMaskVisualization {
    public static let minNormalCoordinateValue: Double = -1
    public static let maxNormalCoordinateValue: Double = 1

    private var bitmaps: [PlaneMaskBitmap] = []

    public func addBitmap(_ asset: GraphicAsset, minX: Double = -1, maxX: Double = 1, minY: Double = -1, maxY: Double = 1) {
        bitmaps.append(PlaneMaskBitmap(asset: asset, normalMinX: minX, normalMaxX: maxX, normalMinY: minY, normalMaxY: maxY))
    }

    public func getAsset(_ point: Vector3d) -> GraphicAsset? {
        for bitmap in bitmaps
        where point.x >= bitmap.normalMinX && point.x <= bitmap.normalMaxX && point.y >= bitmap.normalMinY && point.y <= bitmap.normalMaxY {
            return bitmap.asset
        }

        return nil
    }
}

/// Swift port of `PlaneMask` - one mask "type" (e.g. a door-shadow id), holding one
/// `PlaneMaskVisualization` per declared room-scale (32/64), with nearest-by-ratio size fallback
/// (same pattern as `FurnitureVisualizationData.getSizeIndex`).
public final class PlaneMask {
    private var visualizations: [Int: PlaneMaskVisualization] = [:]
    private var sizes: [Int] = []
    private var lastSize: Int = RoomGeometryScaleType.none.rawValue
    private var lastVisualization: PlaneMaskVisualization?

    @discardableResult
    public func createMaskVisualization(size: Int) -> PlaneMaskVisualization? {
        if visualizations[size] != nil { return nil }

        let visualization = PlaneMaskVisualization()

        visualizations[size] = visualization
        sizes.append(size)
        sizes.sort()

        return visualization
    }

    private func sizeIndex(for size: Int) -> Int {
        var index = 0
        var iterator = 1

        while iterator < sizes.count {
            if sizes[iterator] > size {
                if sizes[iterator] - size < size - sizes[iterator - 1] { index = iterator }

                break
            }

            index = iterator
            iterator += 1
        }

        return index
    }

    private func maskVisualization(for size: Int) -> PlaneMaskVisualization? {
        if size == lastSize { return lastVisualization }

        let index = sizeIndex(for: size)

        lastVisualization = index < sizes.count ? visualizations[sizes[index]] : nil
        lastSize = size

        return lastVisualization
    }

    public func getGraphicAsset(size: Int, point: Vector3d) -> GraphicAsset? {
        maskVisualization(for: size)?.getAsset(point)
    }
}

/// Swift port of `PlaneMaskManager` (.../mask/PlaneMaskManager.ts) - parses a room bundle's
/// `roomVisualization.maskData` into `PlaneMask`s, preprocessing every bitmap through
/// `TextureUtils.makeWhiteTransparent` and registering the result back into the collection as a
/// distinct asset (matching the TS `assetCollection.addAsset(..., replace: true)` call).
public final class PlaneMaskManager {
    private var masks: [String: PlaneMask] = [:]
    private var data: AssetPlaneMaskData?

    public init() {}

    public func initialize(_ data: AssetPlaneMaskData) { self.data = data }

    public func initializeAssetCollection(_ collection: GraphicAssetCollection) {
        guard let data else { return }

        parseMasks(data, collection)
    }

    private func parseMasks(_ maskData: AssetPlaneMaskData, _ assets: GraphicAssetCollection) {
        for mask in maskData.masks ?? [] {
            guard let id = mask.id, !id.isEmpty, masks[id] == nil else { continue }

            let newMask = PlaneMask()

            for visualization in mask.visualizations ?? [] {
                guard let maskVisualization = newMask.createMaskVisualization(size: visualization.size) else { continue }

                parseMaskBitmaps(visualization.bitmaps ?? [], into: maskVisualization, assets: assets)
            }

            masks[id] = newMask
        }
    }

    private func parseMaskBitmaps(_ bitmaps: [AssetPlaneTextureBitmap], into maskVisualization: PlaneMaskVisualization, assets: GraphicAssetCollection) {
        for bitmap in bitmaps {
            guard let assetName = bitmap.assetName, !assetName.isEmpty else { continue }
            guard let asset = assets.getAsset(assetName), let texture = asset.texture else { continue }
            guard let alphaTexture = TextureUtils.makeWhiteTransparent(texture) else { continue }

            guard let replacedAsset = assets.addAsset(
                name: asset.name, texture: alphaTexture, x: asset.x, y: asset.y,
                flipH: asset.flipH, flipV: asset.flipV, usesPalette: false, replace: true
            ) else { continue }

            let minX = bitmap.normalMinX ?? PlaneMaskVisualization.minNormalCoordinateValue
            let maxX = bitmap.normalMaxX ?? PlaneMaskVisualization.maxNormalCoordinateValue
            let minY = bitmap.normalMinY ?? PlaneMaskVisualization.minNormalCoordinateValue
            let maxY = bitmap.normalMaxY ?? PlaneMaskVisualization.maxNormalCoordinateValue

            maskVisualization.addBitmap(replacedAsset, minX: minX, maxX: maxX, minY: minY, maxY: maxY)
        }
    }

    public func getMaskEntry(type: String, scale: Int, normal: Vector3d, posX: Double, posY: Double) -> MaskEntry? {
        guard let mask = masks[type], let asset = mask.getGraphicAsset(size: scale, point: normal), let texture = asset.texture else { return nil }

        let position = CGPoint(
            x: CGFloat(posX.rounded(.towardZero) + asset.offsetX),
            y: CGFloat(posY.rounded(.towardZero) + asset.offsetY)
        )
        let scale = CGPoint(x: asset.flipH ? -1 : 1, y: asset.flipV ? -1 : 1)

        return MaskEntry(texture: texture, position: position, size: nil, scale: scale)
    }
}
