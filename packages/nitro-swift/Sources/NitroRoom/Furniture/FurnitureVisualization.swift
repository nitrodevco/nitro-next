import Foundation
import SpriteKit

import NitroAssets

/// Common surface `NitroRendererKit.FurnitureNode` renders through, implemented by both
/// `FurnitureVisualization` (static furniture) and `FurnitureAnimatedVisualization` (animated
/// furniture) - the Swift-composition equivalent of both being `RoomObjectSpriteVisualization`
/// subclasses in TS. Default parameter values aren't part of a protocol requirement, so callers
/// going through this existential must pass every argument explicitly.
public protocol FurnitureVisualizing: AnyObject {
    func resolveDirection(scale: Int, cameraDirectionX: Double, objectDirectionX: Double) -> Int

    func computeLayers(
        scale: Int,
        direction: Int,
        selectedColorId: Int,
        alphaMultiplier: Double,
        furnitureLift: Double,
        lookThrough: Bool
    ) -> [FurnitureLayerDraw]
}

/// Per-layer override a composed visualization (`FurnitureAnimatedVisualization`,
/// `FurnitureGiftWrappedVisualization`, ...) can supply to `FurnitureVisualization.computeLayers`
/// for one layer - the generalized Swift-composition equivalent of the TS class hierarchy's
/// `getFrameNumber`/`getLayerXOffset`/`getLayerYOffset` overrides. `nil` fields fall back to the
/// static-furniture default (frame `0`, no extra offset).
public struct FurnitureLayerOverride {
    public var frameNumber: Double?
    public var extraOffsetX: Double
    public var extraOffsetY: Double

    public init(frameNumber: Double? = nil, extraOffsetX: Double = 0, extraOffsetY: Double = 0) {
        self.frameNumber = frameNumber
        self.extraOffsetX = extraOffsetX
        self.extraOffsetY = extraOffsetY
    }
}

/// One resolved, ready-to-draw furniture layer - the Swift equivalent of what `FurnitureVisualization.updateSprite`
/// (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureVisualization.ts) would have written
/// onto a pooled `IRoomObjectSprite`. Kept as a plain value type instead of a stateful sprite object since this
/// port has no `RoomObjectSpriteVisualization`/`IRoomObjectSprite` pooling layer - `NitroRendererKit` turns these
/// directly into `SKSpriteNode`s.
public struct FurnitureLayerDraw {
    public let layerId: Int
    public let assetName: String
    public let texture: SKTexture?
    public let flipH: Bool
    public let flipV: Bool
    public let offsetX: Double
    public let offsetY: Double
    /// 0-255, matching Pixi/TS convention - divide by 255 for an SpriteKit `alpha` (0-1).
    public let alpha: Double
    public let color: UInt32
    public let blendMode: String
    public let relativeDepth: Double
    public let tag: String
    public let ignoreMouse: Bool
    public let isShadow: Bool
}

/// Swift port of `FurnitureVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureVisualization.ts) -
/// the static-furniture render step. Computes, for a given room scale/direction/color/alpha state,
/// every visible layer's asset, texture, offset, tint, blend mode and depth.
///
/// The full TS class also drives Pixi sprite pooling and incremental (dirty-bitmask) updates for
/// its subclass `FurnitureAnimatedVisualization`; since this port has no persistent sprite pool,
/// `computeLayers` simply recomputes the full layer list each call (see `GraphicAsset`'s doc comment
/// for the same "drop the JS-GC-motivated caching, keep the math" rationale).
///
/// Every composed visualization variant (`FurnitureAnimatedVisualization`,
/// `FurnitureGiftWrappedVisualization`, ...) reuses this same layer-resolution/asset-naming/offset
/// math rather than duplicating it, supplying a `layerOverride`/`alphaOverride` closure pair
/// instead of subclassing - see `FurnitureLayerOverride` and `FurnitureAnimatedVisualization`'s doc
/// comment for why composition, not a TS-style subclass hierarchy, is this port's shape here.
public final class FurnitureVisualization: FurnitureVisualizing {
    public static let depthMultiplier = (0.5).squareRoot()
    private static let additionalLayerCount = 1 // the synthetic shadow layer

    public let data: FurnitureVisualizationData
    private let collection: GraphicAssetCollection

    public init(data: FurnitureVisualizationData, collection: GraphicAssetCollection) {
        self.data = data
        self.collection = collection
    }

    /// Mirrors `FurnitureVisualization.updateObject`'s direction computation: furniture facing is
    /// expressed relative to the room camera's yaw, offset by the canonical -135 degree camera angle.
    public func resolveDirection(scale: Int, cameraDirectionX: Double, objectDirectionX: Double) -> Int {
        let cameraOffset = (cameraDirectionX + 135).truncatingRemainder(dividingBy: 360)
        let raw = (objectDirectionX - cameraOffset + 360).truncatingRemainder(dividingBy: 360)

        return data.getValidDirection(scale, Int(raw.rounded()))
    }

    public func computeLayers(
        scale: Int,
        direction: Int,
        selectedColorId: Int = 0,
        alphaMultiplier: Double = 1,
        furnitureLift: Double = 0,
        lookThrough: Bool = false
    ) -> [FurnitureLayerDraw] {
        computeLayers(
            scale: scale, direction: direction, selectedColorId: selectedColorId, alphaMultiplier: alphaMultiplier,
            furnitureLift: furnitureLift, lookThrough: lookThrough, layerOverride: nil, alphaOverride: nil
        )
    }

    /// The override-accepting overload composed visualization variants call - not part of the
    /// public/`FurnitureVisualizing` surface, see `FurnitureLayerOverride`'s doc comment.
    /// `alphaOverride` receives `(direction, layerId, defaultAlpha)` and is only consulted for
    /// non-shadow layers, matching the original's `updateSprite` never routing the shadow layer's
    /// alpha through the overridable `getLayerAlpha`.
    func computeLayers(
        scale: Int,
        direction: Int,
        selectedColorId: Int,
        alphaMultiplier: Double,
        furnitureLift: Double,
        lookThrough: Bool,
        layerOverride: ((Int) -> FurnitureLayerOverride?)?,
        alphaOverride: ((Int, Int, Double) -> Double)?
    ) -> [FurnitureLayerDraw] {
        let size = data.getValidSize(scale)

        guard size >= 1 else { return [] }

        let isRegularSize = size != 1
        let layerCount = data.getLayerCount(scale) + FurnitureVisualization.additionalLayerCount
        let shadowLayerIndex = layerCount - FurnitureVisualization.additionalLayerCount

        var results: [FurnitureLayerDraw] = []
        results.reserveCapacity(layerCount)

        var layerId = layerCount - 1

        while layerId >= 0 {
            if let draw = computeLayer(
                scale: scale, size: size, isRegularSize: isRegularSize, direction: direction, layerId: layerId,
                shadowLayerIndex: shadowLayerIndex, selectedColorId: selectedColorId,
                alphaMultiplier: alphaMultiplier, furnitureLift: furnitureLift, lookThrough: lookThrough,
                override: layerOverride?(layerId), alphaOverride: alphaOverride
            ) {
                results.append(draw)
            }

            layerId -= 1
        }

        return results
    }

    /// JS's `assetName += frameNumber` string-concatenates a bare `number`, so a whole-valued frame
    /// id like `3.0` becomes `"3"` (no decimal point) while a fractional one (only possible via
    /// `AnimationFrame`'s negative-id pseudo-random case, see its doc comment) keeps its digits.
    /// This reproduces that for the common integral case exactly; for the fractional case it uses
    /// Swift's default `Double` description rather than JS's exact shortest-round-trip algorithm,
    /// which can differ in the trailing digits - a documented approximation, not a verified match,
    /// since that path's resulting asset name essentially never resolves to a real asset either way.
    static func jsFrameNumberString(_ value: Double) -> String {
        if value == value.rounded(), abs(value) < 1e15 { return String(Int64(value)) }

        return String(value)
    }

    private func computeLayer(
        scale: Int, size: Int, isRegularSize: Bool, direction: Int, layerId: Int, shadowLayerIndex: Int,
        selectedColorId: Int, alphaMultiplier: Double, furnitureLift: Double, lookThrough: Bool,
        override: FurnitureLayerOverride?, alphaOverride: ((Int, Int, Double) -> Double)?
    ) -> FurnitureLayerDraw? {
        guard layerId < FurnitureVisualizationData.layerLetters.count else { return nil }

        let isShadow = layerId == shadowLayerIndex
        let letter = isShadow ? "sd" : FurnitureVisualizationData.layerLetters[layerId]

        guard !letter.isEmpty else { return nil }

        let frameNumberString = override?.frameNumber.map { FurnitureVisualization.jsFrameNumberString($0) } ?? "0"
        let assetName = isRegularSize
            ? "\(data.type)_\(size)_\(letter)_\(direction)_\(frameNumberString)"
            : "\(data.type)_icon_\(letter)"

        guard let asset = collection.getAsset(assetName) else { return nil }

        let lookThroughFactor = lookThrough ? 0.2 : 1.0

        if isShadow {
            let liftOffset = (furnitureLift * (Double(scale) / 2)).rounded(.up)

            // Matches `FurnitureAnimatedVisualization.getLayerYOffset`: an override's extra Y offset
            // is added on top of the shadow's lift-derived offset. Extra X is never applied here -
            // the original's `updateSprite` shadow branch sets `offsetX` straight from the asset,
            // without ever calling the (overridable) `getLayerXOffset`.
            return FurnitureLayerDraw(
                layerId: layerId, assetName: assetName, texture: asset.texture,
                flipH: asset.flipH, flipV: asset.flipV,
                offsetX: asset.offsetX, offsetY: asset.offsetY + liftOffset + (override?.extraOffsetY ?? 0),
                alpha: 48 * alphaMultiplier * lookThroughFactor,
                color: ColorData.defaultColor, blendMode: LayerData.defaultBlendMode,
                relativeDepth: 1 * FurnitureVisualization.depthMultiplier,
                tag: LayerData.defaultTag, ignoreMouse: true, isShadow: true
            )
        }

        let defaultAlpha = data.getLayerAlpha(scale, direction, layerId) * alphaMultiplier * lookThroughFactor
        let alpha = alphaOverride?(direction, layerId, defaultAlpha) ?? defaultAlpha
        let relativeDepth = (data.getLayerZOffset(scale, direction, layerId) - Double(layerId) * 0.001) * FurnitureVisualization.depthMultiplier

        return FurnitureLayerDraw(
            layerId: layerId, assetName: assetName, texture: asset.texture,
            flipH: asset.flipH, flipV: asset.flipV,
            offsetX: asset.offsetX + data.getLayerXOffset(scale, direction, layerId) + (override?.extraOffsetX ?? 0),
            offsetY: asset.offsetY + data.getLayerYOffset(scale, direction, layerId) + (override?.extraOffsetY ?? 0),
            alpha: alpha, color: data.getLayerColor(scale, layerId, selectedColorId),
            blendMode: data.getLayerBlendMode(scale, direction, layerId),
            relativeDepth: relativeDepth,
            tag: data.getLayerTag(scale, direction, layerId),
            ignoreMouse: data.getLayerIgnoreMouse(scale, direction, layerId),
            isShadow: false
        )
    }
}
