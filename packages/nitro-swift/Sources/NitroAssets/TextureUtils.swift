import CoreGraphics
import SpriteKit

/// Swift port of the subset of `TextureUtils` (packages/nitro-renderer/src/utils/TextureUtils.ts)
/// used by the room plane mask system.
public enum TextureUtils {
    /// Converts a white-on-black stencil image into a proper alpha mask: `alpha = 255 - luminance`,
    /// so white pixels become fully transparent and black pixels stay fully opaque. Bitmap masks
    /// (door/window cutout shapes) are authored this way.
    public static func makeWhiteTransparent(_ texture: SKTexture) -> SKTexture? {
        let cgImage = texture.cgImage()

        let width = cgImage.width
        let height = cgImage.height

        guard width > 0, height > 0 else { return nil }

        let bytesPerPixel = 4
        let bytesPerRow = bytesPerPixel * width
        var buffer = [UInt8](repeating: 0, count: bytesPerRow * height)
        let colorSpace = CGColorSpaceCreateDeviceRGB()

        let outputImage: CGImage? = buffer.withUnsafeMutableBytes { rawBuffer -> CGImage? in
            guard let baseAddress = rawBuffer.baseAddress else { return nil }

            guard let ctx = CGContext(
                data: baseAddress, width: width, height: height, bitsPerComponent: 8, bytesPerRow: bytesPerRow,
                space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
            ) else { return nil }

            ctx.draw(cgImage, in: CGRect(x: 0, y: 0, width: CGFloat(width), height: CGFloat(height)))

            let pixels = rawBuffer.bindMemory(to: UInt8.self)
            var index = 0

            while index < pixels.count {
                let r = Int(pixels[index])
                let g = Int(pixels[index + 1])
                let b = Int(pixels[index + 2])
                let luminance = (r + g + b) / 3

                pixels[index + 3] = UInt8(clamping: 255 - luminance)

                index += bytesPerPixel
            }

            return ctx.makeImage()
        }

        guard let outputImage else { return nil }

        return SKTexture(cgImage: outputImage)
    }
}
