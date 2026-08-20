import XCTest

@testable import NitroAvatar

final class AvatarFigureContainerTests: XCTestCase {
    func testParseAndRoundTrip() {
        let figure = AvatarFigureContainer(figure: "hr-893-45.hd-180-2.ch-210-66-92")

        XCTAssertTrue(figure.hasPartType(.hair))
        XCTAssertEqual(figure.getPartSetId(.hair), 893)
        XCTAssertEqual(figure.getPartColorIds(.hair), [45])
        XCTAssertEqual(figure.getPartColorIds(.chest), [66, 92])
        XCTAssertEqual(figure.getFigureString(), "hr-893-45.hd-180-2.ch-210-66-92")
    }

    func testUpdatePartMovesToEndOfIterationOrder() {
        let figure = AvatarFigureContainer(figure: "hd-180-2.hr-893-45")

        figure.updatePart(.head, setId: 181, colorIds: [1])

        // TS `Map` semantics: delete+reinsert moves the key to the end.
        XCTAssertEqual(figure.getFigureString(), "hr-893-45.hd-181-1")
    }

    func testUnknownPartTypeRoundTripsByCode() {
        let figure = AvatarFigureContainer(figure: "xx-1-2")

        XCTAssertEqual(figure.getPartTypeCodes(), ["xx"])
        XCTAssertEqual(figure.getFigureString(), "xx-1-2")
    }
}
