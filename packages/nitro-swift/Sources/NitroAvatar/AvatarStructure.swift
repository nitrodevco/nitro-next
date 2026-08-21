import Foundation

/// Swift port of `AvatarStructure` (packages/nitro-renderer/src/avatar/AvatarStructure.ts) -
/// the figure+action -> visible-layers resolver, and the top-level owner of the figure-data
/// catalog, part-sets table, geometry config, action catalog and keyframe animation data.
///
/// Reduced scope vs. the TS source (see the avatar section of the package README): no FX/gesture
/// "add data" layer injection and no downloaded-effects animation system (`AnimationManager`/
/// `Animation`, the "Dance"/"Effect" states) - `getActiveBodyPartIds`/`getParts` below only take the
/// non-effects path, which is everything the 10 bundled `HabboAvatarAnimations.json` entries
/// (Default/Sit/Lay/Move/Wave/Talk/Sign/Respect/Blow/Laugh) actually need, since none of their
/// `ActionDefinition`s set `isAnimation` (that flag is reserved for effects-bundle-backed states).
public final class AvatarStructure {
    private var geometry: AvatarModelGeometry?
    public let figureData = FigureSetData()
    public let partData = PartSetsData()
    public let animationData = AvatarAnimationData()
    public let actionManager = AvatarActionManager()

    public init() {}

    @discardableResult
    public func initAnimation(_ data: [AvatarAnimationConfig]) -> Bool { animationData.parse(data) }

    /// Additive, like `injectFigureData` - see `AvatarActionManager.updateActions`'s doc comment for
    /// why a host app needs this to unlock anything beyond the bundled "Stand" action.
    public func registerActionData(_ data: AvatarActionDataConfig) { actionManager.updateActions(data) }

    public func getActionDefinition(_ id: String) -> ActionDefinition? { actionManager.getActionDefinition(id) }

    public func getActionDefinitionWithState(_ state: String) -> ActionDefinition? {
        actionManager.getActionDefinitionWithState(state)
    }

    public func getDefaultAction() -> ActionDefinition? { actionManager.getDefaultAction() }

    /// See `AvatarActionManager.sortActions`'s doc comment - despite the name, this does not sort by
    /// precedence (a faithfully-replicated bug in the original).
    public func sortActions(_ actions: [ActiveActionData]) -> [ActiveActionData] { actionManager.sortActions(actions) }

    public func maxFrames(_ actions: [ActiveActionData]) -> Int {
        var count = 0

        for action in actions {
            guard let definition = action.definition else { continue }

            count = max(count, animationData.getFrameCount(definition))
        }

        return count
    }

    public func getCanvasOffsets(_ actions: [ActiveActionData], scale: AvatarScaleType, direction: Int) -> (Double, Double, Double)? {
        actionManager.getCanvasOffsets(actions, size: scale, direction: direction)
    }

    /// Which body parts a given active action claims - the non-effects path of `getActiveBodyPartIds`
    /// (see the class doc comment). Effects/dance actions (`definition.isAnimation`) claim nothing
    /// here, matching an avatar with no effects bundle registered for them.
    public func getActiveBodyPartIds(_ action: ActiveActionData) -> [AvatarBodyPartType] {
        guard let definition = action.definition, let geometry, !definition.isAnimation else { return [] }

        var partIds: [AvatarBodyPartType] = []

        for partId in partData.getActiveParts(definition.activePartSet) {
            guard let bodyPart = geometry.getBodyPartOfItem(geometryType: definition.geometryType, itemId: partId) else { continue }

            if !partIds.contains(bodyPart) { partIds.append(bodyPart) }
        }

        return partIds
    }

    /// The per-frame pixel nudge for one body part under one active action - `AnimationAction`'s
    /// own keyframe-offset table (see its doc comment), or `(0, 0)` for actions with no such table.
    /// Of the 10 bundled `HabboAvatarAnimations.json` entries, only "Laugh" declares an `offsets`
    /// block (an 8-direction head bob) - every other bundled animation relies solely on per-part
    /// keyframe *frame numbers* (`AnimationActionPart`), not pixel offsets.
    public func getFrameBodyPartOffset(_ action: ActiveActionData, direction: Int, frame: Int, bodyPartId: AvatarBodyPartType) -> (dx: Double, dy: Double) {
        guard let definition = action.definition else { return AnimationAction.defaultOffset }

        return animationData.getAction(definition)?.getFrameBodyPartOffset(direction: direction, frameCount: frame, bodyPartId: bodyPartId)
            ?? AnimationAction.defaultOffset
    }

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

    /// Swift port of `AvatarStructure.getParts` - see the type doc comment for what's out of scope
    /// (the `layerItems`/effects-animation parameters from the original signature are dropped
    /// entirely, not just defaulted, since nothing in this port ever populates them).
    public func getParts(
        setType: AvatarBodyPartType,
        container: AvatarFigureContainer,
        activeAction: ActiveActionData,
        geometryType: AvatarGeometryType,
        direction: Int,
        removes initialRemoves: [String] = []
    ) -> [AvatarImagePartContainer] {
        guard let geometry, let definition = activeAction.definition else { return [] }

        let activeParts = partData.getActiveParts(definition.activePartSet)
        let emptyFrames: [AvatarFrameEntry] = [.index(0)]
        let requiredPartTypes = geometry.getParts(geometryType: geometryType, bodyPartId: setType, direction: direction)
        let animationAction = animationData.getAction(definition)

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

                let animationFrames = animationAction?.getPart(part.type).map { $0.frames.map(AvatarFrameEntry.keyframe) } ?? emptyFrames

                baseContainers.append(AvatarImagePartContainer(
                    bodyPartId: setType.rawValue, partType: part.type, partId: part.id, color: partColor,
                    frames: animationFrames, action: definition, isColorable: part.colorLayerIndex > 0,
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

            // `activeAction.actionParameter` (default 1) picks e.g. which carried-item variant to
            // show; a static id declared on the part definition itself always wins.
            let partId = partDefinition.hasStaticId() ? partDefinition.staticId : activeAction.actionParameter
            let animationFrames = animationAction?.getPart(partType).map { $0.frames.map(AvatarFrameEntry.keyframe) } ?? emptyFrames

            partContainers.append(AvatarImagePartContainer(
                bodyPartId: setType.rawValue, partType: partType, partId: partId, color: nil,
                frames: animationFrames, action: definition, isColorable: false, paletteMapId: -1,
                flippedPartType: partType, isBlendable: false
            ))
        }

        return partContainers
    }
}
