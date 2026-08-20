import CoreGraphics
import Foundation
import ZIPFoundation

/// Errors surfaced while loading a `.nitro` bundle or a bare texture asset.
public enum NitroAssetError: Error {
    case invalidURL(String)
    case invalidResponse(String)
    case decodeFailed(String)
    case invalidExtension(String)
}

/// Swift port of `NitroBundle` (packages/nitro-renderer/src/utils/NitroBundle.ts).
///
/// A `.nitro` file is a plain zip archive containing:
///  - one or more `*.json` manifests (asset/logic/visualization/room-visualization data),
///    shallow-merged together in archive order,
///  - exactly one `*_spritesheet.json` (TexturePacker-format) describing frames inside...
///  - ...one `*.png` sheet image the spritesheet's `meta.image` field points at.
public final class NitroBundle {
    public struct JSONEntry {
        public let name: String
        public let object: [String: Any]
    }

    /// Non-spritesheet JSON manifests, in original zip order (matches TS's `for..in` merge order).
    public private(set) var jsonEntries: [JSONEntry] = []
    /// `*_spritesheet.json` manifests, in original zip order.
    public private(set) var spritesheetEntries: [JSONEntry] = []
    /// PNG images keyed by their full in-archive filename (e.g. "hh_human_body.png"),
    /// matching the keys a spritesheet's `meta.image` refers to.
    public private(set) var images: [String: CGImage] = [:]

    public static func from(zipData: Data) throws -> NitroBundle {
        let bundle = NitroBundle()
        let archive = try Archive(data: zipData, accessMode: .read)

        for entry in archive {
            guard entry.type == .file else { continue }

            let fullName = entry.path
            let ext = (fullName as NSString).pathExtension.lowercased()

            guard ext == "json" || ext == "png" else { continue }

            var buffer = Data()
            _ = try archive.extract(entry) { buffer.append($0) }

            switch ext {
                case "json":
                    guard let object = try JSONSerialization.jsonObject(with: buffer) as? [String: Any] else { continue }

                    let base = NitroBundle.stripExtension(fullName)

                    if base.hasSuffix("_spritesheet") {
                        bundle.spritesheetEntries.append(JSONEntry(name: base, object: object))
                    } else {
                        bundle.jsonEntries.append(JSONEntry(name: base, object: object))
                    }

                case "png":
                    guard
                        let provider = CGDataProvider(data: buffer as CFData),
                        let image = CGImage(pngDataProviderSource: provider, decode: nil, shouldInterpolate: true, intent: .defaultIntent)
                    else { continue }

                    bundle.images[fullName] = image

                default:
                    continue
            }
        }

        return bundle
    }

    private static func stripExtension(_ name: String) -> String {
        guard let idx = name.lastIndex(of: ".") else { return name }

        return String(name[name.startIndex..<idx])
    }
}
