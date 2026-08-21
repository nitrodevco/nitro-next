import XCTest

@testable import NitroRoom

final class SimpleRoomPlaneParserTests: XCTestCase {
    func testFlatRectangularRoomProducesOneFloorAndFourWalls() {
        // A 3x3 flat room, all tiles height 0.
        let grid = RoomHeightGrid(rows: ["000", "000", "000"])
        let parser = SimpleRoomPlaneParser()
        let planes = parser.parse(grid)

        let floors = planes.filter { $0.type == RoomPlaneData.planeFloor }
        let walls = planes.filter { $0.type == RoomPlaneData.planeWall }
        let landscapes = planes.filter { $0.type == RoomPlaneData.planeLandscape }

        // One merged 3x3 floor rectangle. `loc` sits at the far corner with leftSide/rightSide
        // pointing back toward the near corner (negative) - matches `RoomPlaneParser.addFloor`'s
        // exact corner/sign convention, which `RoomPlane.matrixForDimensions`'s skew matrix is
        // sensitive to even though the normal/footprint are identical either way (see
        // `floorPlanes`'s doc comment on this call site).
        XCTAssertEqual(floors.count, 1)
        XCTAssertEqual(floors.first?.leftSide.x, -3)
        XCTAssertEqual(floors.first?.rightSide.y, -3)
        XCTAssertEqual(floors.first?.loc.x, 3)
        XCTAssertEqual(floors.first?.loc.y, 3)

        // 4 perimeter edges, each contributing a front wall + a thickness side wall = 8 wall planes.
        XCTAssertEqual(walls.count, 8)
        // Every wall front face also gets a matching landscape (window-view) face.
        XCTAssertEqual(landscapes.count, 4)
    }

    func testBlockedTilesAreExcludedFromFloor() {
        let grid = RoomHeightGrid(rows: ["0x0"])
        let parser = SimpleRoomPlaneParser()
        let planes = parser.parse(grid)
        let floors = planes.filter { $0.type == RoomPlaneData.planeFloor }

        // Two separate 1x1 floor tiles either side of the blocked middle tile.
        XCTAssertEqual(floors.count, 2)
    }

    func testHeightGridParsesDigitsAndBlocksNonDigits() {
        let grid = RoomHeightGrid(rows: ["09x"])

        XCTAssertEqual(grid.tileHeight(atX: 0, y: 0), 0)
        XCTAssertEqual(grid.tileHeight(atX: 1, y: 0), 9)
        XCTAssertNil(grid.tileHeight(atX: 2, y: 0))
        XCTAssertNil(grid.tileHeight(atX: 99, y: 0))
    }
}
