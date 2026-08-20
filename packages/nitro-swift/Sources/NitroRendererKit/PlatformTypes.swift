import CoreGraphics

#if canImport(UIKit)
import UIKit
public typealias SKColor = UIColor
#elseif canImport(AppKit)
import AppKit
public typealias SKColor = NSColor
#endif

/// Approximates Pixi's multiplicative `tint` as an SpriteKit `color` + `colorBlendFactor` pair.
/// Used by both `FurnitureNode` and `AvatarNode` - see either's doc comment for the caveat
/// (SpriteKit's blend factor mixes toward the color rather than multiplying, so this is exact only
/// for the untinted 0xFFFFFF case).
public func skColor(fromRGB rgb: UInt32) -> SKColor {
    let r = CGFloat((rgb >> 16) & 0xFF) / 255
    let g = CGFloat((rgb >> 8) & 0xFF) / 255
    let b = CGFloat(rgb & 0xFF) / 255

    return SKColor(red: r, green: g, blue: b, alpha: 1)
}
