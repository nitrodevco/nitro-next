import XCTest

@testable import NitroAvatar

final class AvatarDefaultsTests: XCTestCase {
    func testBundledGeometryAndPartSetsLoad() {
        let structure = AvatarDefaults.makeStructure()

        XCTAssertNotNil(structure, "bundled HabboAvatarGeometry.json / HabboAvatarPartSets.json should decode")

        let bodyParts = structure?.getBodyParts(setType: .full, geometryType: .vertical, direction: 2)

        XCTAssertEqual(bodyParts?.isEmpty, false, "the 'full' avatar set should resolve to a non-empty, depth-sorted body part list")
    }

    func testStandActionLoads() {
        let action = AvatarDefaults.standAction()

        XCTAssertEqual(action?.state, "std")
        XCTAssertTrue(action?.isDefault ?? false)
    }

    func testCanvasResolves() {
        let structure = AvatarDefaults.makeStructure()
        let canvas = structure?.getCanvas(scale: .large, geometryType: .vertical)

        XCTAssertEqual(canvas?.width, 90)
        XCTAssertEqual(canvas?.height, 130)
    }
}
