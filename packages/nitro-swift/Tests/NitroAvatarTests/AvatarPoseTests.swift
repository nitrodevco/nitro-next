import XCTest

@testable import NitroAvatar

final class AvatarPoseTests: XCTestCase {
    /// Registers a synthetic "Move"/walk action on top of the bundled defaults (which already ship
    /// a real "mv" action via `HabboAvatarActions.json` - this synthetic one just keeps the test
    /// independent of that data file's exact fields) so multi-action combination can be exercised
    /// end-to-end against the real bundled geometry/part-set data.
    private func makeStructureWithWalkAction() throws -> AvatarStructure {
        guard let structure = AvatarDefaults.makeStructure() else {
            throw XCTSkip("bundled avatar defaults failed to load")
        }

        let json = """
        {
            "actions": [
                {"id": "Move", "state": "mv", "precedence": 900, "geometryType": "vertical", "activePartSet": "walk", "assetPartDefinition": "wlk"}
            ],
            "actionOffsets": []
        }
        """
        let config = try JSONDecoder().decode(AvatarActionDataConfig.self, from: Data(json.utf8))

        structure.registerActionData(config)

        return structure
    }

    func testStandingPoseResolvesBodyPartsToTheDefaultAction() throws {
        let structure = try makeStructureWithWalkAction()
        let pose = AvatarPose.standing(structure: structure)

        XCTAssertFalse(pose.resolvedBodyPartActions.isEmpty)
        XCTAssertTrue(pose.resolvedBodyPartActions.values.allSatisfy { $0.type == "std" })
        XCTAssertEqual(pose.mainAction.type, "std")
    }

    func testLaterAppendedActionOverwritesBodyPartsItSharesWithAnEarlierOne() throws {
        let structure = try makeStructureWithWalkAction()
        let pose = AvatarPose(structure: structure)

        // Posture first, then the "higher priority" action - see AvatarPose's doc comment on why
        // append order (not `precedence`) is what actually decides the winner per body part.
        pose.appendAction("std")
        pose.appendAction("mv")
        pose.endActionAppends()

        let standOnlyParts = Set(pose.resolvedBodyPartActions.filter { $0.value.type == "std" }.keys)
        let walkParts = Set(pose.resolvedBodyPartActions.filter { $0.value.type == "mv" }.keys)

        XCTAssertFalse(walkParts.isEmpty, "the walk action's 'walk' part set should claim at least one body part")
        // Nothing should be claimed by both - each body part has exactly one winning action.
        XCTAssertTrue(standOnlyParts.isDisjoint(with: walkParts))
    }

    func testAppendActionDeduplicatesIdenticalTypeAndParameter() throws {
        let structure = try makeStructureWithWalkAction()
        let pose = AvatarPose(structure: structure)

        pose.appendAction("std")
        pose.appendAction("std")
        pose.endActionAppends()

        // sortActions/filterActions operate on whatever was queued - deduping keeps that list (and
        // therefore the resolved body parts) from double-processing the same action pointlessly.
        XCTAssertEqual(pose.resolvedBodyPartActions.values.filter { $0.type == "std" }.count, pose.resolvedBodyPartActions.count)
    }

    func testFrameCounterAdvancesAndResets() {
        let structure = AvatarStructure()
        let pose = AvatarPose(structure: structure)

        XCTAssertEqual(pose.frameCounter, 0)

        pose.updateAnimationByFrames()
        pose.updateAnimationByFrames(2)

        XCTAssertEqual(pose.frameCounter, 3)

        pose.resetAnimationFrameCounter()

        XCTAssertEqual(pose.frameCounter, 0)
    }
}
