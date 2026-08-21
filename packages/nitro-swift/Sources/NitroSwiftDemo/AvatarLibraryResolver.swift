import Foundation

import NitroAvatar

/// Decodes `figuremap.json`'s `{ libraries: IFigureMapLibrary[] }` shape (verified against the live
/// endpoint - see `DemoConfig`), matching `IFigureMapLibrary`/`IFigureMapLibraryPart`
/// (packages/nitro-api/src/asset/avatar/figuredata/IFigureMapLibrary*.ts).
struct FigureMapLibraryPart: Decodable {
    /// Optional: the live feed has at least one entry (`hh_human_fx`, an effects library) with
    /// several `parts[].id: null` - e.g. `{"id": null, "type": "bd"}`. A non-optional `Int` here
    /// fails the *entire* top-level `[FigureMapLibrary]` decode on that one bad entry (JSONDecoder
    /// has no per-element recovery), which is what was actually behind the "failed to download
    /// figuremap.json" log - `DemoLoader.fetchJSON` swallowed the real (decode) error via `try?` and
    /// reported it as a download failure. A `null` id can never match a real figure part's numeric
    /// id anyway (see `processFigureMap`), so treating it as "unresolvable, skip" is correct, not
    /// just decode-safe.
    let id: Int?
    /// Kept as the raw code rather than `AvatarFigurePartType`, matching `AvatarFigureContainer`'s
    /// own permissiveness - the figuremap can reference sub-part codes (`fc`, `ey`, `lh`, `rh`, ...)
    /// that only ever appear *inside* a `FigurePartSet.parts` list, never as a figure-string segment
    /// on their own, and every such code is still a valid `AvatarFigurePartType` case regardless.
    let type: String
}

struct FigureMapLibrary: Decodable {
    let id: String
    let revision: Int?
    let parts: [FigureMapLibraryPart]?
}

struct FigureMapResponse: Decodable {
    let libraries: [FigureMapLibrary]
}

/// A lean, demo-local stand-in for `AvatarAssetDownloadManager` (packages/nitro-renderer/src/avatar/AvatarAssetDownloadManager.ts) -
/// just the figuremap-driven "which libraries does this figure need" resolution, without the
/// class's queueing/listener/incremental-download machinery (this demo downloads every pending
/// library up front and blocks on it, since it has nothing else to do in the meantime).
final class AvatarLibraryResolver {
    /// `AvatarAssetDownloadManager.MANDATORY_LIBRARIES` - the base body (`bd:1`) and the empty
    /// left-hand-item slot (`li:0`). `li` never appears as its own figure-string segment (it's a
    /// mirrored/synthesized slot - see `AvatarStructure.initPartSets`), so without this explicit
    /// mandatory lookup its library would never be downloaded at all.
    private static let mandatoryKeys = ["bd:1", "li:0"]

    private var figureMap: [String: [(id: String, revision: Int)]] = [:]

    func processFigureMap(_ libraries: [FigureMapLibrary]) {
        for library in libraries {
            guard let parts = library.parts, !parts.isEmpty else { continue }

            for part in parts {
                guard let partId = part.id else { continue }

                let key = "\(part.type):\(partId)"

                figureMap[key, default: []].append((id: library.id, revision: library.revision ?? 0))
            }
        }
    }

    /// Mirrors `AvatarAssetDownloadManager.getAvatarFigurePendingLibraries`, plus the mandatory-library
    /// lookup its `processMissingLibraries()` performs separately - collapsed into one pass since this
    /// demo has no incremental "download what's missing so far" flow to split them across.
    func resolvePendingLibraries(container: AvatarFigureContainer, figureData: FigureSetData) -> [(id: String, revision: Int)] {
        var seen: Set<String> = []
        var result: [(id: String, revision: Int)] = []

        func add(_ key: String) {
            for library in figureMap[key] ?? [] where !seen.contains(library.id) {
                seen.insert(library.id)
                result.append(library)
            }
        }

        for key in AvatarLibraryResolver.mandatoryKeys { add(key) }

        for partType in container.getPartTypeIds() {
            guard
                let setType = figureData.getSetType(partType),
                let partSet = setType.getPartSet(container.getPartSetId(partType))
            else { continue }

            for part in partSet.parts { add("\(part.type.rawValue):\(part.id)") }
        }

        return result
    }
}
