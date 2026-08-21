import Foundation

import NitroCore

/// A tile heightmap for `SimpleRoomPlaneParser`: `heights[row][col]`, `nil` = blocked/void tile.
/// Parses the classic Habbo heightmap string format (one row per string; `'x'`/`'X'` = blocked,
/// `'0'-'9'` = floor height, anything else is treated as blocked).
public struct RoomHeightGrid {
    public let heights: [[Int?]]
    public let width: Int
    public let height: Int

    public init(rows: [String]) {
        let parsed = rows.map { row in
            row.map { char -> Int? in
                guard let digit = char.wholeNumberValue, char.isNumber else { return nil }

                return digit
            }
        }

        let maxWidth = parsed.map(\.count).max() ?? 0

        height = parsed.count
        width = maxWidth
        heights = parsed.map { row in row + Array(repeating: nil, count: max(0, maxWidth - row.count)) }
    }

    public init(heights: [[Int?]]) {
        self.heights = heights
        height = heights.count
        width = heights.map(\.count).max() ?? 0
    }

    func tileHeight(atX x: Int, y: Int) -> Int? {
        guard y >= 0, y < heights.count, x >= 0, x < (heights[y].count) else { return nil }

        return heights[y][x]
    }
}

/// A reduced-fidelity stand-in for `RoomPlaneParser` (packages/nitro-renderer/src/room/object/RoomPlaneParser.ts,
/// ~1500 lines of marching-squares-style tile extraction with 4x4-supersampled corner blending,
/// hole handling, and wall-hiding/peninsula detection - not ported, see the package README).
///
/// This produces correct, usable geometry for the common case - a flat floor (one height, no holes)
/// with straight perimeter walls - by greedily merging same-height tile rectangles for the floor and
/// merging contiguous boundary edges into wall segments. It does **not** handle multi-height floors
/// (step walls between different heights), floor holes, or the wall-corner end-cap/hiding heuristics
/// the real parser has. Coordinate/edge-normal conventions were derived from `RoomPlane`'s formulas
/// and `RoomPlaneParser.addWall`'s wall-thickness math (both read directly from source), but - unlike
/// every other file in this port - this file's *output correctness* has not been cross-checked
/// against a captured real room, since doing so needs a running renderer this sandbox doesn't have.
public final class SimpleRoomPlaneParser {
    public var wallHeight: Double = 3.6
    public var wallThicknessMultiplier: Double = 1
    public var floorThicknessMultiplier: Double = 1

    public init() {}

    public func parse(_ grid: RoomHeightGrid) -> [RoomPlaneData] {
        floorPlanes(grid) + wallPlanes(grid)
    }

    // MARK: - Floor

    private func floorPlanes(_ grid: RoomHeightGrid) -> [RoomPlaneData] {
        guard grid.width > 0, grid.height > 0 else { return [] }

        var visited = Array(repeating: Array(repeating: false, count: grid.width), count: grid.height)
        var result: [RoomPlaneData] = []

        for y in 0..<grid.height {
            for x in 0..<grid.width {
                guard !visited[y][x], let tileHeight = grid.tileHeight(atX: x, y: y) else { continue }

                var runWidth = 1

                while grid.tileHeight(atX: x + runWidth, y: y) == tileHeight, !visited[y][x + runWidth] { runWidth += 1 }

                var runHeight = 1

                rowScan: while y + runHeight < grid.height {
                    for dx in 0..<runWidth where grid.tileHeight(atX: x + dx, y: y + runHeight) != tileHeight || visited[y + runHeight][x + dx] {
                        break rowScan
                    }

                    runHeight += 1
                }

                for dy in 0..<runHeight { for dx in 0..<runWidth { visited[y + dy][x + dx] = true } }

                let loc = Vector3d(Double(x), Double(y), Double(tileHeight))
                let leftSide = Vector3d(Double(runWidth), 0, 0)
                let rightSide = Vector3d(0, Double(runHeight), 0)

                result.append(RoomPlaneData(type: RoomPlaneData.planeFloor, loc: loc, leftSide: leftSide, rightSide: rightSide, secondaryNormals: []))
            }
        }

        return result
    }

    // MARK: - Walls (perimeter only - see the type doc comment)

    private func wallPlanes(_ grid: RoomHeightGrid) -> [RoomPlaneData] {
        var result: [RoomPlaneData] = []

        result.append(contentsOf: horizontalEdgeWalls(grid, neighborDeltaY: -1)) // north edges
        result.append(contentsOf: horizontalEdgeWalls(grid, neighborDeltaY: 1)) // south edges
        result.append(contentsOf: verticalEdgeWalls(grid, neighborDeltaX: -1)) // west edges
        result.append(contentsOf: verticalEdgeWalls(grid, neighborDeltaX: 1)) // east edges

        return result
    }

    /// North (`neighborDeltaY == -1`) or south (`+1`) boundary runs, merged along X.
    private func horizontalEdgeWalls(_ grid: RoomHeightGrid, neighborDeltaY: Int) -> [RoomPlaneData] {
        var result: [RoomPlaneData] = []

        for y in 0..<grid.height {
            var x = 0

            while x < grid.width {
                guard let tileHeight = grid.tileHeight(atX: x, y: y), grid.tileHeight(atX: x, y: y + neighborDeltaY) == nil else {
                    x += 1
                    continue
                }

                var runWidth = 1

                while
                    grid.tileHeight(atX: x + runWidth, y: y) == tileHeight,
                    grid.tileHeight(atX: x + runWidth, y: y + neighborDeltaY) == nil
                { runWidth += 1 }

                let rightSide = Vector3d(0, 0, wallHeight)
                let loc: Vector3d
                let leftSide: Vector3d

                if neighborDeltaY < 0 {
                    // North edge: outward normal -Y.
                    loc = Vector3d(Double(x), Double(y), Double(tileHeight))
                    leftSide = Vector3d(Double(runWidth), 0, 0)
                } else {
                    // South edge: outward normal +Y.
                    loc = Vector3d(Double(x + runWidth), Double(y + 1), Double(tileHeight))
                    leftSide = Vector3d(-Double(runWidth), 0, 0)
                }

                result.append(contentsOf: wallPlaneSet(loc: loc, leftSide: leftSide, rightSide: rightSide))

                x += runWidth
            }
        }

        return result
    }

    /// West (`neighborDeltaX == -1`) or east (`+1`) boundary runs, merged along Y.
    private func verticalEdgeWalls(_ grid: RoomHeightGrid, neighborDeltaX: Int) -> [RoomPlaneData] {
        var result: [RoomPlaneData] = []

        for x in 0..<grid.width {
            var y = 0

            while y < grid.height {
                guard let tileHeight = grid.tileHeight(atX: x, y: y), grid.tileHeight(atX: x + neighborDeltaX, y: y) == nil else {
                    y += 1
                    continue
                }

                var runHeight = 1

                while
                    grid.tileHeight(atX: x, y: y + runHeight) == tileHeight,
                    grid.tileHeight(atX: x + neighborDeltaX, y: y + runHeight) == nil
                { runHeight += 1 }

                let rightSide = Vector3d(0, 0, wallHeight)
                let loc: Vector3d
                let leftSide: Vector3d

                if neighborDeltaX < 0 {
                    // West edge: outward normal -X.
                    loc = Vector3d(Double(x), Double(y + runHeight), Double(tileHeight))
                    leftSide = Vector3d(0, -Double(runHeight), 0)
                } else {
                    // East edge: outward normal +X.
                    loc = Vector3d(Double(x + 1), Double(y), Double(tileHeight))
                    leftSide = Vector3d(0, Double(runHeight), 0)
                }

                result.append(contentsOf: wallPlaneSet(loc: loc, leftSide: leftSide, rightSide: rightSide))

                y += runHeight
            }
        }

        return result
    }

    /// Mirrors the front-face + landscape-face + thickness-side-face trio from `RoomPlaneParser.addWall`
    /// (corner end-caps omitted - see the type doc comment).
    private func wallPlaneSet(loc: Vector3d, leftSide: Vector3d, rightSide: Vector3d) -> [RoomPlaneData] {
        let wallThickness = 0.25 * wallThicknessMultiplier
        let normal = Vector3d.crossProduct(leftSide, rightSide)
        let secondaryNormal = Vector3d.from(normal)

        if secondaryNormal.length > 0 { secondaryNormal.multiply(1 / secondaryNormal.length) }

        var planes: [RoomPlaneData] = [
            RoomPlaneData(type: RoomPlaneData.planeWall, loc: loc, leftSide: leftSide, rightSide: rightSide, secondaryNormals: [secondaryNormal]),
            RoomPlaneData(type: RoomPlaneData.planeLandscape, loc: loc, leftSide: leftSide, rightSide: rightSide, secondaryNormals: [secondaryNormal]),
        ]

        if normal.length > 0 {
            let sideRightSide = Vector3d.product(normal, (1 / normal.length) * -wallThickness)
            let sideLoc = Vector3d.sum(loc, rightSide)

            planes.append(RoomPlaneData(type: RoomPlaneData.planeWall, loc: sideLoc, leftSide: leftSide, rightSide: sideRightSide, secondaryNormals: [normal, secondaryNormal]))
        }

        return planes
    }
}
