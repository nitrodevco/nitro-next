import Foundation

import NitroAvatar
import NitroCore
import NitroRendererKit

/// Downloads everything a static "room + furniture + avatar" scene needs and places it, using
/// `DemoConfig`'s asset-location values. Mirrors the real client's own load order
/// (`useAvatarLoader.ts`: `structure.injectFigureData` for figuredata, `processFigureMap` for the
/// figuremap, both before any avatar is composed) but collapsed into one straight-line async
/// function since this demo has exactly one room/figure to load, not an arbitrary number over time.
enum DemoLoader {
    /// A 14x14 flat floor - large enough that tile (11,11), the fixed camera look-at point
    /// `RoomScene`'s default `geometry` uses (see its doc comment), sits comfortably inside the
    /// room rather than out past its edge.
    private static let heightmapRows = Array(repeating: String(repeating: "0", count: 14), count: 14)

    static func run(in scene: RoomScene) async {
        await loadRoom(in: scene)
        await loadFurniture(in: scene)
        await loadAvatar(in: scene)
    }

    private static func loadRoom(in scene: RoomScene) async {
        let url = DemoConfig.assetURL(DemoConfig.genericAssetURLTemplate, libname: DemoConfig.roomContentLibrary)

        guard let data = await fetchData(url) else {
            NitroLogger.error("DemoLoader: failed to download room bundle from \(url)")

            return
        }

        do {
            try scene.loadRoom(bundleData: data, heightmapRows: heightmapRows)
        } catch {
            NitroLogger.error("DemoLoader: failed to build room planes: \(error)")
        }
    }

    private static func loadFurniture(in scene: RoomScene) async {
        let url = DemoConfig.assetURL(DemoConfig.furniAssetURLTemplate, libname: DemoConfig.furnitureType)

        guard await scene.assetManager.downloadAsset(url) else {
            NitroLogger.error("DemoLoader: failed to download furniture bundle from \(url)")

            return
        }

        // `objectDirectionX` is degrees (0-315, step 45), not the avatar's 0-7 compass index - 180
        // faces the item toward the camera, matching the avatar's `direction: 4` below.
        scene.placeFurniture(type: DemoConfig.furnitureType, at: Vector3d(12, 10, 0), objectDirectionX: 180)
    }

    private static func loadAvatar(in scene: RoomScene) async {
        guard let avatarStructure = scene.avatarStructure else {
            NitroLogger.error("DemoLoader: bundled avatar defaults failed to load")

            return
        }

        guard let figureData = await fetchJSON(DemoConfig.figureDataURL, as: FigureData.self) else {
            NitroLogger.error("DemoLoader: failed to download figuredata.json")

            return
        }

        avatarStructure.injectFigureData(figureData)

        guard let figureMapResponse = await fetchJSON(DemoConfig.figureMapURL, as: FigureMapResponse.self) else {
            NitroLogger.error("DemoLoader: failed to download figuremap.json")

            return
        }

        let resolver = AvatarLibraryResolver()

        resolver.processFigureMap(figureMapResponse.libraries)

        let container = AvatarFigureContainer(figure: DemoConfig.demoFigure)
        let pendingLibraries = resolver.resolvePendingLibraries(container: container, figureData: avatarStructure.figureData)

        for library in pendingLibraries {
            let url = DemoConfig.assetURL(DemoConfig.avatarAssetURLTemplate, libname: library.id, revision: library.revision)

            if !(await scene.assetManager.downloadAsset(url)) {
                NitroLogger.error("DemoLoader: failed to download avatar library \(library.id) from \(url)")
            }
        }

        scene.placeAvatar(figure: container, at: Vector3d(10, 10, 0), direction: 4)
    }

    // MARK: - Networking

    private static func fetchData(_ urlString: String) async -> Data? {
        guard let url = URL(string: urlString) else { return nil }

        do {
            let (data, response) = try await URLSession.shared.data(from: url)

            guard let http = response as? HTTPURLResponse, http.statusCode == 200 else { return nil }

            return data
        } catch {
            NitroLogger.error(error)

            return nil
        }
    }

    /// A decode failure here used to be indistinguishable from a download failure (both funneled
    /// through `try?` into the same "failed to download" log at the call site) - which is exactly
    /// what happened with `figuremap.json`: the download succeeded, but a `null` id on one live
    /// entry made the whole array fail to decode (see `FigureMapLibraryPart.id`'s doc comment).
    /// Logging the decode error explicitly here makes that class of bug visible instead of looking
    /// identical to a network problem.
    private static func fetchJSON<T: Decodable>(_ urlString: String, as type: T.Type) async -> T? {
        guard let data = await fetchData(urlString) else { return nil }

        do {
            return try JSONDecoder().decode(T.self, from: data)
        } catch {
            NitroLogger.error("DemoLoader: failed to decode JSON from \(urlString): \(error)")

            return nil
        }
    }
}
