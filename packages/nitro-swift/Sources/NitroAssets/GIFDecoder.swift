import Foundation
import ImageIO
import SpriteKit

/// Swift replacement for `@pixi/gif`'s `AnimatedGIF.fromBuffer` (used by `AssetManager.downloadAsset`'s
/// `'gif'` case). SpriteKit has no built-in animated-GIF texture type, so this decodes every frame
/// with ImageIO and hands back textures + per-frame delays; callers can drive an `SKAction.animate`
/// from that, or just use `frames.first` as a static texture the way the TS call site effectively does.
public enum GIFDecoder {
    public struct Frame {
        public let texture: SKTexture
        public let delay: TimeInterval
    }

    public static func decode(data: Data) throws -> [Frame] {
        guard let source = CGImageSourceCreateWithData(data as CFData, nil) else {
            throw NitroAssetError.decodeFailed("gif")
        }

        let count = CGImageSourceGetCount(source)

        guard count > 0 else { throw NitroAssetError.decodeFailed("gif") }

        var frames: [Frame] = []
        frames.reserveCapacity(count)

        for index in 0..<count {
            guard let image = CGImageSourceCreateImageAtIndex(source, index, nil) else { continue }

            frames.append(Frame(texture: SKTexture(cgImage: image), delay: frameDelay(source: source, index: index)))
        }

        return frames
    }

    private static func frameDelay(source: CGImageSource, index: Int) -> TimeInterval {
        guard
            let properties = CGImageSourceCopyPropertiesAtIndex(source, index, nil) as? [CFString: Any],
            let gifProperties = properties[kCGImagePropertyGIFDictionary] as? [CFString: Any]
        else { return 0.1 }

        if let unclamped = gifProperties[kCGImagePropertyGIFUnclampedDelayTime] as? Double, unclamped > 0 {
            return unclamped
        }

        if let clamped = gifProperties[kCGImagePropertyGIFDelayTime] as? Double, clamped > 0 {
            return clamped
        }

        return 0.1
    }
}
