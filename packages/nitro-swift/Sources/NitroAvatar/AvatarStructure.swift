import Foundation

/// Swift port of `AvatarStructure` (packages/nitro-renderer/src/avatar/AvatarStructure.ts) -
/// the figure+action -> visible-layers resolver, and the top-level owner of the figure-data
/// catalog, part-sets table and geometry config.
///
/// Reduced scope vs. the TS source (see the avatar section of the package README): no keyframe
/// animation (`AnimationManager`/`AvatarAnimationData`), no action precedence/combination system
/// beyond a single caller-supplied `ActionDefinition`, and no FX/animation-injected layer items
/// (`layerItems` in the TS signature). What's here is the part of `getParts` that resolves a
/// figure string into drawable layers for a *static* pose, which is the load-bearing piece.
public final class AvatarStructure {
    private var geometry: AvatarModelGeometry?
    public let figureData = FigureSetData()
    public let partData = PartSetsData()

    public init() {}

    public func initGeometry(_ config: AvatarGeometryConfig) {
        geometry = AvatarModelGeometry(config: config)
    }

    /// Mirrors `AvatarStructure.initPartSets`: after parsing, the mirrored hand-item slots ("ri"/"li")
    /// are marked `appendToFigure` so `getParts` can synthesize a held-item layer even when the
    /// figure string itself has no "ri"/"li" segment.
    @discardableResult
    public func initPartSets(_ config: AvatarPartSetsConfig) -> Bool {
        guard partData.parse(config) else { return false }

        partData.getPartDefinition(.rightHandItem)?.appendToFigure = true
        partData.getPartDefinition(.leftHandItem)?.appendToFigure = true

        return true
    }

    @discardableResult
    public func initFigureData(_ data: FigureData) -> Bool { figureData.parse(data) }

    public func injectFigureData(_ data: FigureData) { figureData.appendJSON(data) }

    public func getPartColor(_ container: AvatarFigureContainer, partType: AvatarFigurePartType, layerId: Int = 0) -> PartColor? {
        let colorIds = container.getPartColorIds(partType)

        guard colorIds.count >= layerId, let setType = figureData.getSetType(partType) else { return nil }

        return figureData.getPalette(setType.paletteId)?.getColor(colorIds[layerId])
    }

    public func isMainAvatarSet(_ setType: AvatarSetType) -> Bool { geometry?.isMainAvatarSet(setType) ?? false }

    public func getMandatorySetTypeIds(gender: AvatarGenderType, count: Int) -> [AvatarFigurePartType] {
        figureData.getMandatorySetTypeIds(gender: gender, count: count)
    }

    public func getDefaultPartSet(_ partType: AvatarFigurePartType, gender: AvatarGenderType) -> FigurePartSet? {
        figureData.getDefaultPartSet(partType, gender: gender)
    }

    public func getCanvas(scale: AvatarScaleType, geometryType: AvatarGeometryType) -> AvatarCanvasInfo? {
        geometry?.getCanvas(scale: scale, geometryType: geometryType)
    }

    /// Body parts belonging to `setType`, nearest-camera-first at the given 0-7 facing direction.
    public func getBodyParts(setType: AvatarSetType, geometryType: AvatarGeometryType, direction: Int) -> [AvatarBodyPartType] {
        geometry?.getBodyPartsAtAngle(setType: setType, direction: direction, geometryType: geometryType) ?? []
    }

    public func getBodyPartsUnordered(_ setType: AvatarSetType) -> [AvatarBodyPartType] {
        geometry?.getBodyPartIds(inAvatarSet: setType) ?? []
    }

    /// Swift port of `AvatarStructure.getParts` - see the type doc comment for what's out of scope.
    public func getParts(
        setType: AvatarBodyPartType,
        container: AvatarFigureContainer,
        activeAction: ActionDefinition,
        geometryType: AvatarGeometryType,
        direction: Int,
        removes initialRemoves: [String] = []
    ) -> [AvatarImagePartContainer] {
        guard let geometry else { return [] }

        let activeParts = partData.getActiveParts(activeAction.activePartSet)
        let emptyFrames = [0]
        let requiredPartTypes = geometry.getParts(geometryType: geometryType, bodyPartId: setType, direction: direction)

        var removes = initialRemoves
        var baseContainers: [AvatarImagePartContainer] = []

        for figurePartType in container.getPartTypeIds() {
            guard let partSetType = figureData.getSetType(figurePartType) else { continue }

            let partSetId = container.getPartSetId(figurePartType)
            let partColorIds = container.getPartColorIds(figurePartType)

            guard
                let palette = figureData.getPalette(partSetType.paletteId),
                let partSet = partSetType.getPartSet(partSetId)
            else { continue }

            removes.append(contentsOf: partSet.hiddenLayers)

            for part in partSet.parts {
                guard requiredPartTypes.contains(part.type) else { continue }

                // `AvatarStructure._defaultAction` is declared in the TS source but never assigned
                // anywhere, so its "fall back to the default action for parts outside activeParts"
                // branch is always a no-op in practice - `activeAction` is used unconditionally here.
                let partDefinition = partData.getPartDefinition(part.type)
                let flippedPartType = partDefinition?.flippedSetType ?? part.type

                var partColor: PartColor?
                let colorSlot = part.colorLayerIndex - 1

                if colorSlot >= 0, partColorIds.count > colorSlot { partColor = palette.getColor(partColorIds[colorSlot]) }

                baseContainers.append(AvatarImagePartContainer(
                    bodyPartId: setType.rawValue, partType: part.type, partId: part.id, color: partColor,
                    frames: emptyFrames, action: activeAction, isColorable: part.colorLayerIndex > 0,
                    paletteMapId: 0, flippedPartType: flippedPartType
                ))
            }
        }

        var partContainers: [AvatarImagePartContainer] = []

        for partType in requiredPartTypes {
            var matchedFromFigure = false

            for baseContainer in baseContainers where baseContainer.partType == partType {
                matchedFromFigure = true

                if !removes.contains(partType.rawValue) { partContainers.append(baseContainer) }
            }

            guard !matchedFromFigure, activeParts.contains(partType) else { continue }

            guard let partDefinition = partData.getPartDefinition(partType), partDefinition.appendToFigure else { continue }

            let partId = partDefinition.hasStaticId() ? partDefinition.staticId : 1

            partContainers.append(AvatarImagePartContainer(
                bodyPartId: setType.rawValue, partType: partType, partId: partId, color: nil,
                frames: emptyFrames, action: activeAction, isColorable: false, paletteMapId: -1,
                flippedPartType: partType, isBlendable: false
            ))
        }

        return partContainers
    }
}
