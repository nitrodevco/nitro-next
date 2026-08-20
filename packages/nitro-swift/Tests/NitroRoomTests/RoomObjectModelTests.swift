import XCTest

@testable import NitroRoom

final class RoomObjectModelTests: XCTestCase {
    func testGetSetRemoveRoundTripAndUpdateCounter() {
        let model = RoomObjectModel()

        XCTAssertEqual(model.updateCounter, 0)
        XCTAssertNil(model.getValue(.furnitureVoteCounterCount) as Int?)

        model.setValue(.furnitureVoteCounterCount, 42)

        XCTAssertEqual(model.updateCounter, 1)
        XCTAssertEqual(model.getValue(.furnitureVoteCounterCount), 42)

        model.removeKey(.furnitureVoteCounterCount)

        XCTAssertEqual(model.updateCounter, 2)
        XCTAssertNil(model.getValue(.furnitureVoteCounterCount) as Int?)
    }

    func testGetValueReturnsNilOnTypeMismatchRatherThanCrashing() {
        let model = RoomObjectModel()

        model.setValue(.furnitureVoteCounterCount, "not a number")

        XCTAssertNil(model.getValue(.furnitureVoteCounterCount) as Int?)
    }
}
