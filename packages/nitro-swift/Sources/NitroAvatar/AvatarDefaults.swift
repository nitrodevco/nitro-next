import Foundation

/// Loads the client's built-in default datasets - bundled as JSON resources, extracted verbatim
/// from `HabboAvatarGeometry.ts`/`HabboAvatarPartSets.ts`/`HabboAvatarFigureDataDefault.ts`
/// (packages/nitro-renderer/src/avatar/data/*.ts) so their large, hand-authored coordinate tables
/// don't need to be transcribed into Swift by hand. See `HabboAvatarActionsDefault.load()` for the
/// fourth (the "Stand" action) - kept next to `ActionDefinition` instead of here.
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
    /// Note these are only *reachable* for actions whose `ActionDefinition` is actually registered -
    /// `HabboAvatarActionsDefault.json` only registers "Stand", so a host app wanting Walk/Sit/Wave/...
    /// needs to inject a real per-hotel actions catalog via `AvatarStructure.registerActionData` (see
    /// its doc comment), the same way real figuredata gets layered in via `injectFigureData`.
    public static func loadDefaultAnimations() -> [AvatarAnimationConfig]? {
        decode([AvatarAnimationConfig].self, resource: "HabboAvatarAnimations")
    }

    /// Assembles a ready-to-use `AvatarStructure` from the bundled defaults above. Real per-hotel
    /// figure data (`figuredata.json`, fetched over the network in the TS client) should be merged
    /// in afterward via `structure.injectFigureData(...)` once loaded - the bundled default alone
    /// only has a handful of base palettes, not real clothing catalog entries.
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
