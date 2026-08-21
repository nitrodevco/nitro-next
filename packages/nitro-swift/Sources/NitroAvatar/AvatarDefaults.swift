import Foundation

/// Loads the client's built-in default datasets - bundled as JSON resources, extracted verbatim
/// from `HabboAvatarGeometry.ts`/`HabboAvatarPartSets.ts`/`HabboAvatarFigureDataDefault.ts`/
/// `HabboAvatarAnimations.ts`/`HabboAvatarActions.ts` (packages/nitro-renderer/src/avatar/data/*.ts)
/// so their large, hand-authored coordinate/action tables don't need to be transcribed into Swift
/// by hand. See `HabboAvatarActionsDefault.load()` for the "Stand" action specifically - kept next
/// to `ActionDefinition` instead of here, since it predates `HabboAvatarActions` being discovered
/// and extracted (see `loadDefaultActions()`'s doc comment for the correction this implies).
public enum AvatarDefaults {
    public static func loadGeometryConfig() -> AvatarGeometryConfig? {
        decode(AvatarGeometryConfig.self, resource: "HabboAvatarGeometry")
    }

    public static func loadPartSetsConfig() -> AvatarPartSetsConfig? {
        decode(AvatarPartSetsConfig.self, resource: "HabboAvatarPartSets")
    }

    public static func loadDefaultFigureData() -> FigureData? {
        decode(FigureData.self, resource: "HabboAvatarFigureDataDefault")
    }

    /// The client's 10 built-in keyframe animations (Default/Sit/Lay/Move/Wave/Talk/Sign/Respect/Blow/Laugh),
    /// extracted verbatim from `HabboAvatarAnimations.ts` the same way as the other bundled defaults.
    /// Reachable for any action whose state matches one of these ids AND has a registered
    /// `ActionDefinition` - see `loadDefaultActions()`.
    public static func loadDefaultAnimations() -> [AvatarAnimationConfig]? {
        decode([AvatarAnimationConfig].self, resource: "HabboAvatarAnimations")
    }

    /// The client's second built-in action table (`HabboAvatarActions.ts`) - Lay/Float/Swim/Sit/
    /// Snowboard*/RideJump/Respect/Wave/Sign/Blow/Laugh/Idle/AvatarEffect/Dance/UseItem/CarryItem/
    /// Talk/Gesture*/Sleep/Move/Default, i.e. everything beyond the single "Stand" action
    /// `HabboAvatarActionsDefault.ts` registers. An earlier version of this port's doc comments
    /// wrongly claimed the *full* action catalog was server-fetched per-hotel like figuredata and
    /// unavailable without networking - that was true of `HabboAvatarActionsDefault` alone, but
    /// `HabboAvatarActions` is a second, equally client-bundled table the real client loads
    /// unconditionally at startup (`AvatarRenderManager.init`), no network fetch involved. Combined
    /// with `loadDefaultAnimations()`, this is enough to drive Stand/Walk/Sit/Wave/Talk/Sign/
    /// Respect/Blow/Laugh out of the box - see `makeStructure()`.
    public static func loadDefaultActions() -> AvatarActionDataConfig? {
        decode(AvatarActionDataConfig.self, resource: "HabboAvatarActions")
    }

    /// Assembles a ready-to-use `AvatarStructure` from the bundled defaults above, including both
    /// built-in action tables and all 10 built-in keyframe animations - enough to compose and
    /// animate a standing/walking/sitting/waving/etc. avatar with no network access at all beyond
    /// downloading the actual figure/avatar-part `.nitro` bundles. Real per-hotel figure data
    /// (`figuredata.json`, fetched over the network in the TS client) should still be merged in
    /// afterward via `structure.injectFigureData(...)` once loaded - the bundled default alone only
    /// has a handful of base palettes, not real clothing catalog entries.
    public static func makeStructure() -> AvatarStructure? {
        guard
            let geometryConfig = loadGeometryConfig(),
            let partSetsConfig = loadPartSetsConfig()
        else { return nil }

        let structure = AvatarStructure()

        structure.initGeometry(geometryConfig)
        structure.initPartSets(partSetsConfig)

        if let defaultFigureData = loadDefaultFigureData() { structure.initFigureData(defaultFigureData) }
        if let animations = loadDefaultAnimations() { structure.initAnimation(animations) }
        if let actionData = HabboAvatarActionsDefault.load() { structure.registerActionData(actionData) }
        if let actionData = loadDefaultActions() { structure.registerActionData(actionData) }

        return structure
    }

    /// The single "Stand" action from the bundled default action table - enough to drive the
    /// static-pose compositor (`AvatarCompositor`). See `ActionDefinition`'s doc comment for why
    /// the full action catalog (Walk/Sit/Wave/...) isn't wired up yet.
    public static func standAction() -> ActionDefinition? {
        guard let data = HabboAvatarActionsDefault.load() else { return nil }
        guard let config = data.actions.first(where: { $0.isDefault ?? false }) else { return nil }

        return ActionDefinition(config)
    }

    private static func decode<T: Decodable>(_ type: T.Type, resource: String) -> T? {
        guard let url = Bundle.module.url(forResource: resource, withExtension: "json", subdirectory: "Resources") else { return nil }

        return try? JSONDecoder().decode(T.self, from: Data(contentsOf: url))
    }
}
