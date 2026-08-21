import Foundation
import os.log

/// Mirrors `NitroLogger` from `@nitrodevco/nitro-api` (packages/nitro-api/src/logger).
public enum NitroLogger {
    private static let log = Logger(subsystem: "com.nitrodevco.nitro-swift", category: "Nitro")

    public static func debug(_ message: @autoclosure () -> String) {
        let text = message()
        log.debug("\(text, privacy: .public)")
    }

    public static func log(_ message: @autoclosure () -> String) {
        let text = message()
        log.info("\(text, privacy: .public)")
    }

    public static func warn(_ message: @autoclosure () -> String) {
        let text = message()
        log.warning("\(text, privacy: .public)")
    }

    public static func error(_ error: Error) {
        log.error("\(String(describing: error), privacy: .public)")
    }

    public static func error(_ message: @autoclosure () -> String) {
        let text = message()
        log.error("\(text, privacy: .public)")
    }
}
