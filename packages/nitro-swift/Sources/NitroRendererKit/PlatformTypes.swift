#if canImport(UIKit)
import UIKit
public typealias SKColor = UIColor
#elseif canImport(AppKit)
import AppKit
public typealias SKColor = NSColor
#endif
