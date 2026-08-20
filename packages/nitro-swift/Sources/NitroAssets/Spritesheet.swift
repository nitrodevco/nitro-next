import CoreGraphics
import Foundation
import SpriteKit

/// Mirrors `ISpritesheetFrame` (packages/nitro-api/src/asset/spritesheet/ISpritesheetFrame.ts) -
/// the standard TexturePacker JSON frame format used by every `.nitro` bundle's `*_spritesheet.json`.
public struct SpritesheetFrame: Decodable {
    public struct Rect: Decodable { public let x: Double; public let y: Double; public let w: Double; public let h: Double }
    public struct Size: Decodable { public let w: Double; public let h: Double }
    public struct Pivot: Decodable { public let x: Double; public let y: Double }

    public let frame: Rect
    public let rotated: Bool
    public let trimmed: Bool
    public let spriteSourceSize: Rect
    public let sourceSize: Size
    public let pivot: Pivot
}

/// Mirrors `ISpritesheetMeta`.
public struct SpritesheetMeta: Decodable {
    public let image: String?
}

/// Mirrors `ISpritesheetData`.
public struct SpritesheetData: Decodable {
    public let meta: SpritesheetMeta?
    public let frames: [String: SpritesheetFrame]?
}

/// Swift/SpriteKit equivalent of a parsed Pixi `Spritesheet`: cuts every named frame out of
/// the packed sheet image into its own `SKTexture`, matching `Spritesheet.parse()` in pixi.js.
public final class NitroSpritesheet {
    /// Frame name (with its original extension stripped by `GraphicAssetCollection.removeFileExtension`
    /// at the call site) -> cut-out texture.
    public let textures: [String: SKTexture]
    /// The full, uncut sheet image (registered as its own texture by `AssetManager` under the
    /// bundle's `*_spritesheet` name, matching `this.setTexture(name, texture)` in `AssetManager.ts`).
    public let sheetTexture: SKTexture

    private init(textures: [String: SKTexture], sheetTexture: SKTexture) {
        self.textures = textures
        self.sheetTexture = sheetTexture
    }

    public static func parse(_ data: SpritesheetData, sheetImage: CGImage) -> NitroSpritesheet {
        var result: [String: SKTexture] = [:]

        for (name, frame) in data.frames ?? [:] {
            guard let cropped = cutFrame(frame, from: sheetImage) else { continue }

            result[name] = SKTexture(cgImage: cropped)
        }

        return NitroSpritesheet(textures: result, sheetTexture: SKTexture(cgImage: sheetImage))
    }

    private static func cutFrame(_ frame: SpritesheetFrame, from sheetImage: CGImage) -> CGImage? {
        // Packed frame coordinates are pixel-space, top-left origin - the same convention
        // CGImage.cropping(to:) expects, so no axis flip is needed here.
        let packedWidth = frame.rotated ? frame.frame.h : frame.frame.w
        let packedHeight = frame.rotated ? frame.frame.w : frame.frame.h
        let cropRect = CGRect(x: CGFloat(frame.frame.x), y: CGFloat(frame.frame.y), width: CGFloat(packedWidth), height: CGFloat(packedHeight))

        guard var piece = sheetImage.cropping(to: cropRect) else { return nil }

        if frame.rotated {
            guard let rotated = rotatedCounterClockwise(piece) else { return nil }

            piece = rotated
        }

        if frame.trimmed {
            return compositeOntoCanvas(piece, spriteSourceSize: frame.spriteSourceSize, sourceSize: frame.sourceSize) ?? piece
        }

        return piece
    }

    /// TexturePacker stores "rotated" frames rotated 90deg clockwise to pack tighter; undo that
    /// so the resulting texture is pixel-for-pixel identical to the original, unrotated sprite.
    private static func rotatedCounterClockwise(_ image: CGImage) -> CGImage? {
        let width = image.height
        let height = image.width
        let colorSpace = image.colorSpace ?? CGColorSpaceCreateDeviceRGB()

        guard let ctx = CGContext(
            data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0,
            space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else { return nil }

        ctx.translateBy(x: 0, y: CGFloat(height))
        ctx.rotate(by: -CGFloat.pi / 2)
        ctx.draw(image, in: CGRect(x: 0, y: 0, width: CGFloat(image.width), height: CGFloat(image.height)))

        return ctx.makeImage()
    }

    /// Places a trimmed (transparency-cropped) frame back at its original offset inside a
    /// transparent canvas sized to `sourceSize`, so the resulting texture's dimensions match
    /// what the original (pre-packing) sprite export looked like - this is what every asset's
    /// `x`/`y` offset in the accompanying manifest is defined relative to.
    private static func compositeOntoCanvas(_ image: CGImage, spriteSourceSize: SpritesheetFrame.Rect, sourceSize: SpritesheetFrame.Size) -> CGImage? {
        let width = Int(sourceSize.w.rounded())
        let height = Int(sourceSize.h.rounded())

        guard width > 0, height > 0 else { return nil }

        let colorSpace = image.colorSpace ?? CGColorSpaceCreateDeviceRGB()

        guard let ctx = CGContext(
            data: nil, width: width, height: height, bitsPerComponent: 8, bytesPerRow: 0,
            space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        ) else { return nil }

        // CGContext drawing uses a bottom-left origin; spriteSourceSize.y is a top-left offset.
        let destY = CGFloat(height) - CGFloat(spriteSourceSize.y) - CGFloat(image.height)

        ctx.draw(image, in: CGRect(x: CGFloat(spriteSourceSize.x), y: destY, width: CGFloat(image.width), height: CGFloat(image.height)))

        return ctx.makeImage()
    }
}
