import CoreGraphics
import SpriteKit

/// Swift port of `GraphicAssetPalette` (packages/nitro-renderer/src/assets/GraphicAssetPalette.ts).
///
/// Recolors a greyscale-encoded "palettable" texture by remapping every pixel's *green* channel
/// (0-255) through a 256-entry RGB lookup table - the exact scheme the original asset export uses
/// to bake a single greyscale mask that can be recolored into any of an item's palette variants.
public final class GraphicAssetPalette {
    private var palette: [(r: UInt8, g: UInt8, b: UInt8)]
    public let primaryColor: UInt32
    public let secondaryColor: UInt32

    public init(rgb: [[Int]], primaryColor: UInt32, secondaryColor: UInt32) {
        var entries = rgb.map { triple -> (r: UInt8, g: UInt8, b: UInt8) in
            let r = triple.count > 0 ? UInt8(clamping: triple[0]) : 0
            let g = triple.count > 1 ? UInt8(clamping: triple[1]) : 0
            let b = triple.count > 2 ? UInt8(clamping: triple[2]) : 0

            return (r, g, b)
        }

        while entries.count < 256 { entries.append((0, 0, 0)) }

        self.palette = entries
        self.primaryColor = primaryColor
        self.secondaryColor = secondaryColor
    }

    /// Renders a recolored copy of `texture`. Assumes source pixels are either fully opaque or
    /// fully transparent (true of every known palettable asset), so drawing into a premultiplied
    /// bitmap context introduces no rounding error in the surviving RGB channels.
    public func applyPalette(_ texture: SKTexture) -> SKTexture {
        guard let cgImage = texture.cgImage() else { return texture }

        let width = cgImage.width
        let height = cgImage.height

        guard width > 0, height > 0 else { return texture }

        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        var buffer = [UInt8](repeating: 0, count: bytesPerRow * height)
        let colorSpace = CGColorSpaceCreateDeviceRGB()

        // Context creation, drawing, pixel mutation and image extraction all happen inside a
        // single `withUnsafeMutableBytes` scope, since the raw pointer CGContext writes through
        // is only guaranteed valid for the lifetime of that closure.
        let outputImage: CGImage? = buffer.withUnsafeMutableBytes { rawBuffer -> CGImage? in
            guard let baseAddress = rawBuffer.baseAddress else { return nil }

            guard let ctx = CGContext(
                data: baseAddress, width: width, height: height, bitsPerComponent: 8, bytesPerRow: bytesPerRow,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) else { return nil }

            ctx.draw(cgImage, in: CGRect(x: 0, y: 0, width: width, height: height))

            let pixels = rawBuffer.bindMemory(to: UInt8.self)
            var index = 0

            while index < pixels.count {
                let green = pixels[index + 1]
                let color = palette[Int(green)]

                pixels[index] = color.r
                pixels[index + 1] = color.g
                pixels[index + 2] = color.b
                // alpha (pixels[index + 3]) is left untouched.

                index += bytesPerPixel
            }

            return ctx.makeImage()
        }

        guard let outputImage else { return texture }

        return SKTexture(cgImage: outputImage)
    }
}
