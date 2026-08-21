import Foundation

import NitroCore
import NitroRendererKit

#if os(macOS)
import AppKit
import SpriteKit

/// Runnable demo: a static room with a piece of furniture and a standing avatar, downloaded from
/// the live asset CDN using the same `asset.urls.*`/`figuredata.url`/`figuremap.url` configuration
/// scheme as `packages/nitro-react/public/config/nitro-config.json` (see `DemoConfig`). Everything
/// rendered here goes through the same `RoomScene`/`FurnitureNode`/`AvatarNode` pipeline the rest of
/// this package ports - this target only adds the asset-location config, figuremap-driven avatar
/// library resolution, and the windowed AppKit/SpriteKit shell to actually present it, none of
/// which belongs in the library targets themselves.
final class DemoAppDelegate: NSObject, NSApplicationDelegate {
    private var window: NSWindow?
    private let scene = RoomScene(size: CGSize(width: 960, height: 640))

    func applicationDidFinishLaunching(_ notification: Notification) {
        let skView = SKView(frame: NSRect(x: 0, y: 0, width: 960, height: 640))

        skView.ignoresSiblingOrder = true
        skView.showsFPS = true
        skView.showsNodeCount = true

        let window = NSWindow(
            contentRect: skView.frame,
            styleMask: [.titled, .closable, .miniaturizable, .resizable],
            backing: .buffered,
            defer: false
        )

        window.title = "Nitro Swift Demo"
        window.contentView = skView
        window.center()
        window.makeKeyAndOrderFront(nil)

        self.window = window

        skView.presentScene(scene)

        Task { await DemoLoader.run(in: scene) }
    }

    func applicationShouldTerminateAfterLastWindowClosed(_ sender: NSApplication) -> Bool { true }
}

let app = NSApplication.shared
let delegate = DemoAppDelegate()

app.delegate = delegate
app.setActivationPolicy(.regular)
app.activate(ignoringOtherApps: true)
app.run()
#else
NitroLogger.error("NitroSwiftDemo requires macOS (NSApplication/SKView) - see main.swift's doc comment.")
#endif
