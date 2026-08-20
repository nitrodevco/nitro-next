import Foundation

/// Swift port of `AvatarFigureContainer` (packages/nitro-renderer/src/avatar/AvatarFigureContainer.ts).
/// Parses/serializes figure strings like `"hr-893-45.hd-180-2.ch-210-66,-1"`.
///
/// Kept keyed by the raw 2-letter code (not just `AvatarFigurePartType`) since the TS source parses
/// figure strings without validating the part-type code against the known enum - an unrecognized
/// code is still stored and round-trips through `getFigureString()` unchanged.
public final class AvatarFigureContainer {
    private struct Entry {
        let code: String
        let setId: Int
        let colorIds: [Int]
    }

    private var parts: [String: Entry] = [:]
    /// Mirrors JS `Map` insertion order, which `updatePart`/`getFigureString` both depend on
    /// (`updatePart` deletes-then-reinserts, moving the part to the end of iteration order).
    private var order: [String] = []

    public init(figure: String) {
        parseFigure(figure)
    }

    public func getPartTypeIds() -> [AvatarFigurePartType] {
        order.compactMap { AvatarFigurePartType(rawValue: $0) }
    }

    /// Raw codes, including any not recognized by `AvatarFigurePartType`.
    public func getPartTypeCodes() -> [String] { order }

    public func hasPartType(_ type: AvatarFigurePartType) -> Bool { parts[type.rawValue] != nil }

    public func getPartSetId(_ type: AvatarFigurePartType) -> Int { parts[type.rawValue]?.setId ?? 0 }

    public func getPartColorIds(_ type: AvatarFigurePartType) -> [Int] { parts[type.rawValue]?.colorIds ?? [] }

    public func updatePart(_ type: AvatarFigurePartType, setId: Int, colorIds: [Int]) {
        updatePart(code: type.rawValue, setId: setId, colorIds: colorIds)
    }

    public func removePart(_ type: AvatarFigurePartType) { removePart(code: type.rawValue) }

    public func getFigureString() -> String {
        var pieces: [String] = []

        for code in order {
            guard !code.isEmpty, let entry = parts[code] else { continue }

            var setParts = [code, String(entry.setId)]

            setParts.append(contentsOf: entry.colorIds.map(String.init))

            pieces.append(setParts.joined(separator: "-"))
        }

        return pieces.joined(separator: ".")
    }

    private func updatePart(code: String, setId: Int, colorIds: [Int]) {
        if parts[code] != nil { order.removeAll { $0 == code } }

        parts[code] = Entry(code: code, setId: setId, colorIds: colorIds)
        order.append(code)
    }

    private func removePart(code: String) {
        guard parts.removeValue(forKey: code) != nil else { return }

        order.removeAll { $0 == code }
    }

    private func parseFigure(_ figure: String) {
        for part in figure.split(separator: ".", omittingEmptySubsequences: false) {
            let pieces = part.split(separator: "-", omittingEmptySubsequences: false).map(String.init)

            guard pieces.count >= 2 else { continue }

            let code = pieces[0]
            // `parseInt` on a malformed segment yields NaN in TS; Int has no NaN, so this falls
            // back to 0 for the (never-expected-in-practice) malformed-figure-string case.
            let setId = Int(pieces[1]) ?? 0
            let colorIds = pieces.count > 2 ? pieces[2...].map { Int($0) ?? 0 } : []

            updatePart(code: code, setId: setId, colorIds: colorIds)
        }
    }
}
