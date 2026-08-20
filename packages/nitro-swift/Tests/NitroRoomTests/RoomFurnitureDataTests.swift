import XCTest

import NitroCore
@testable import NitroRoom

final class RoomFurnitureDataTests: XCTestCase {
    func testDefaultsMatchTheOriginal() {
        let data = RoomFurnitureData(
            id: 1, typeId: 2, type: "throne", location: Vector3d(1, 2, 0), direction: Vector3d(90, 0, 0), state: 0
        )

        XCTAssertTrue(data.extra.isNaN)
        XCTAssertEqual(data.expiryTime, -1)
        XCTAssertEqual(data.usagePolicy, 0)
        XCTAssertEqual(data.ownerId, 0)
        XCTAssertEqual(data.ownerName, "")
        XCTAssertTrue(data.synchronized)
        XCTAssertTrue(data.realRoomObject)
        XCTAssertEqual(data.sizeZ, -1)
    }

    func testLocationAndDirectionAreCopiedNotAliased() {
        let location = Vector3d(1, 2, 0)
        let direction = Vector3d(90, 0, 0)

        let data = RoomFurnitureData(id: 1, typeId: 2, type: "throne", location: location, direction: direction, state: 0)

        location.x = 99
        direction.x = 45

        // `RoomFurnitureData` copies the vectors in on construction (mirroring the original's
        // `Vector3d.assign`), so later mutating the caller's vectors doesn't affect the stored data.
        XCTAssertEqual(data.location.x, 1)
        XCTAssertEqual(data.direction.x, 90)
    }
}
