import SpriteKit
import XCTest

@testable import NitroAssets

final class GraphicAssetCollectionTests: XCTestCase {
    private func solidTexture(size: Int = 4) -> SKTexture {
        let colorSpace = CGColorSpaceCreateDeviceRGB()
        let ctx = CGContext(
            data: nil, width: size, height: size, bitsPerComponent: 8, bytesPerRow: 0,
            space: colorSpace, bitmapInfo: CGImageAlphaInfo.premultipliedLast.rawValue
        )!

        ctx.setFillColor(red: 1, green: 0.5, blue: 0, alpha: 1)
        ctx.fill(CGRect(x: 0, y: 0, width: size, height: size))

        return SKTexture(cgImage: ctx.makeImage()!)
    }

    func testDefineAssetsResolvesOffsetsAndFlips() {
        let data = AssetDataCore(
            type: "test_item",
            assets: [
                AssetDefinition(name: "test_item_64_a_0_0", source: "sheet_frame", x: 10, y: 20, flipH: true, flipV: nil, usesPalette: nil),
            ]
        )
        let collection = GraphicAssetCollection(data: data, rawJSON: [:], libraryTextures: ["sheet_frame.png": solidTexture()])

        let asset = collection.getAsset("test_item_64_a_0_0")

        XCTAssertNotNil(asset)
        // TS: `const x = -(asset.x || 0)` - the manifest offset is negated when stored.
        XCTAssertEqual(asset?.x, -10)
        XCTAssertEqual(asset?.y, -20)
        XCTAssertEqual(asset?.flipH, true)
        // offsetX flips sign again when flipH is set, landing back on the raw manifest value.
        XCTAssertEqual(asset?.offsetX, 10)
    }

    func testPaletteHexColorsParse() {
        let data = AssetDataCore(
            type: "test_item",
            palettes: [
                AssetPaletteDefinition(id: 1, source: nil, master: nil, tags: nil, breed: nil, colorTag: nil, color1: "FF0000", color2: "00FF00", rgb: [[0, 0, 0]]),
            ]
        )
        let collection = GraphicAssetCollection(data: data, rawJSON: [:], libraryTextures: [:])
        let colors = collection.getPaletteColors(1)

        XCTAssertEqual(colors.primary, 0xFF0000)
        XCTAssertEqual(colors.secondary, 0x00FF00)
    }
}
