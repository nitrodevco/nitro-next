import XCTest

@testable import NitroAvatar

final class AvatarImagePartContainerTests: XCTestCase {
    private func makeAction() -> ActionDefinition {
        let json = """
        {"id": "Default", "state": "std", "precedence": 1000, "geometryType": "vertical", "assetPartDefinition": "std"}
        """
        let config = try! JSONDecoder().decode(ActionConfig.self, from: Data(json.utf8))

        return ActionDefinition(config)
    }

    func testIndexEntriesReturnTheArrayIndexNotTheStoredValue() {
        // A real quirk of the original (see `getFrameIndex`'s doc comment): `.index` values are
        // vestigial - only the array *length* (for wraparound) matters.
        let container = AvatarImagePartContainer(
            bodyPartId: "torso", partType: .body, partId: 1, color: nil,
            frames: [.index(0)], action: makeAction(), isColorable: false, paletteMapId: 0
        )

        XCTAssertEqual(container.getFrameIndex(0), 0)
        XCTAssertEqual(container.getFrameIndex(1), 0) // wraps: 1 % 1 == 0
        XCTAssertNil(container.getFrameDefinition(0))
    }

    func testKeyframeEntriesReturnTheStoredFrameNumberAndDefinition() {
        let frame0 = AvatarAnimationFrame(AvatarAnimationFrameConfig(number: 4, assetPartDefinition: "wlk", repeats: nil))
        let frame1 = AvatarAnimationFrame(AvatarAnimationFrameConfig(number: 7, assetPartDefinition: nil, repeats: nil))
        let container = AvatarImagePartContainer(
            bodyPartId: "leftarm", partType: .legs, partId: 1, color: nil,
            frames: [.keyframe(frame0), .keyframe(frame1)], action: makeAction(), isColorable: false, paletteMapId: 0
        )

        XCTAssertEqual(container.getFrameIndex(0), 4)
        XCTAssertEqual(container.getFrameIndex(1), 7)
        XCTAssertEqual(container.getFrameIndex(2), 4) // wraps: 2 % 2 == 0

        XCTAssertEqual(container.getFrameDefinition(0)?.assetPartDefinition, "wlk")
        XCTAssertEqual(container.getFrameDefinition(1)?.assetPartDefinition, "")
    }

    func testEmptyFramesReturnsZeroAndNilDefinition() {
        let container = AvatarImagePartContainer(
            bodyPartId: "head", partType: .head, partId: 1, color: nil,
            frames: [], action: makeAction(), isColorable: false, paletteMapId: 0
        )

        XCTAssertEqual(container.getFrameIndex(3), 0)
        XCTAssertNil(container.getFrameDefinition(3))
    }
}
