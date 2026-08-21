import XCTest

@testable import NitroAvatar

final class AnimationActionTests: XCTestCase {
    func testFrameCountAndRepeatsExpansion() throws {
        let json = """
        {
            "id": "Move",
            "parts": [
                {
                    "setType": "lg",
                    "frames": [
                        {"number": 0, "assetPartDefinition": "wlk"},
                        {"number": 1, "assetPartDefinition": "wlk", "repeats": 3},
                        {"number": 2, "assetPartDefinition": "wlk"}
                    ]
                }
            ]
        }
        """
        let config = try JSONDecoder().decode(AvatarAnimationConfig.self, from: Data(json.utf8))
        let action = AnimationAction(config)

        let legs = action.getPart(.legs)

        XCTAssertNotNil(legs)
        // frame 0 (x1) + frame 1 (x3, via repeats) + frame 2 (x1) = 5 total keyframe slots.
        XCTAssertEqual(legs?.frames.count, 5)
        XCTAssertEqual(legs?.frames.map(\.number), [0, 1, 1, 1, 2])
        XCTAssertEqual(action.frameCount, 5)
    }

    func testFrameBodyPartOffsetWrapsThroughRepeatExpandedFrameIndexes() throws {
        let json = """
        {
            "id": "Move",
            "parts": [],
            "offsets": {
                "frames": [
                    {
                        "id": 0,
                        "directions": [
                            {"id": 2, "bodyParts": [{"id": "torso", "dx": 0, "dy": -1}]}
                        ]
                    },
                    {
                        "id": 1,
                        "repeats": 2,
                        "directions": [
                            {"id": 2, "bodyParts": [{"id": "torso", "dx": 0, "dy": 1}]}
                        ]
                    }
                ]
            }
        }
        """
        let config = try JSONDecoder().decode(AvatarAnimationConfig.self, from: Data(json.utf8))
        let action = AnimationAction(config)

        // frameIndexes = [0, 1, 1] (frame id 1 repeated twice) - a 3-long cycle.
        XCTAssertEqual(action.getFrameBodyPartOffset(direction: 2, frameCount: 0, bodyPartId: .torso).dy, -1)
        XCTAssertEqual(action.getFrameBodyPartOffset(direction: 2, frameCount: 1, bodyPartId: .torso).dy, 1)
        XCTAssertEqual(action.getFrameBodyPartOffset(direction: 2, frameCount: 2, bodyPartId: .torso).dy, 1)
        // Wraps back to frame id 0 on the 4th tick.
        XCTAssertEqual(action.getFrameBodyPartOffset(direction: 2, frameCount: 3, bodyPartId: .torso).dy, -1)
        // No offset declared for direction 5 - falls back to the default (0, 0).
        let missing = action.getFrameBodyPartOffset(direction: 5, frameCount: 0, bodyPartId: .torso)
        XCTAssertEqual(missing.dx, 0)
        XCTAssertEqual(missing.dy, 0)
    }
}
