import Foundation

/// The asset-location values this demo runs against, copied verbatim from the real client's
/// `packages/nitro-react/public/config/nitro-config.json` (the same scheme the user asked the demo
/// to use as its base for asset locations) rather than invented URLs.
enum DemoConfig {
    static let genericAssetURLTemplate = "https://assets.nitrodev.co/bundled/generic/%libname%.nitro"
    static let furniAssetURLTemplate = "https://assets.nitrodev.co/bundled/furniture/%libname%.nitro"
    static let avatarAssetURLTemplate = "https://assets.nitrodev.co/bundled/figures/%libname%.nitro"
    static let figureDataURL = "https://assets.nitrodev.co/gamedata/FigureData.json"
    static let figureMapURL = "https://assets.nitrodev.co/gamedata/FigureMap.json"

    /// The room's own generic bundle is *not* named "room" - that string is only the internal
    /// bookkeeping key `RoomContentLoader.ROOM_CONTENT` uses (see `getAssetUrls`'s `switch` in
    /// `RoomContentLoader.ts`, `case ROOM_CONTENT: return [this.getAssetUrlWithGenericBase('HabboRoomContent')]`).
    /// The actual downloaded library - and the bundle's own declared `type` used to key it in
    /// `AssetManager.collections` - is "HabboRoomContent"/"room" respectively (verified against the
    /// live asset CDN: `bundled/generic/room.nitro` 404s, `bundled/generic/HabboRoomContent.nitro`
    /// exists and its manifest's own `type` field is "room").
    static let roomContentLibrary = "HabboRoomContent"

    /// A classic single-tile floor item, picked because it exists on the live CDN.
    static let furnitureType = "throne"

    /// Every part below was picked by resolving the live `FigureData.json`/`FigureMap.json` for a
    /// figure whose every segment maps to a real, currently-downloadable avatar library - not
    /// hand-guessed. (The `hr-893-...`/`hd-180-...`/etc. figure quoted in `AvatarImage.ts`'s TS
    /// constructor as a "default" no longer resolves against the live figuremap - hotel content
    /// drifts over time - so this demo builds its own known-good figure instead of reusing that one.)
    static let demoFigure = "hr-3025-40.hd-3536-14-10.ch-3030-1408.lg-3023-90.sh-905-91"

    /// `%libname%`/`%revision%` substitution, mirroring `AvatarAssetDownloadLibrary`'s constructor
    /// and `RoomContentLoader.getAssetUrlWithGenericBase`/etc. (all do the same case-insensitive
    /// find/replace on the config template string).
    static func assetURL(_ template: String, libname: String, revision: Int? = nil) -> String {
        var result = template.replacingOccurrences(of: "%libname%", with: libname, options: .caseInsensitive)

        if let revision {
            result = result.replacingOccurrences(of: "%revision%", with: String(revision), options: .caseInsensitive)
        }

        return result
    }
}
