import XCTest

@testable import NitroAvatar

final class AvatarActionManagerTests: XCTestCase {
    private func makeManager() throws -> AvatarActionManager {
        let json = """
        {
            "actions": [
                {"id": "Default", "state": "std", "precedence": 1000, "main": true, "isDefault": true, "geometryType": "vertical", "activePartSet": "figure", "assetPartDefinition": "std"},
                {"id": "Wave", "state": "wave", "precedence": 200, "geometryType": "vertical", "activePartSet": "gesture", "assetPartDefinition": "wav"},
                {"id": "Talk", "state": "talk", "precedence": 100, "geometryType": "vertical", "activePartSet": "speak", "assetPartDefinition": "std", "prevents": ["wave"]}
            ],
            "actionOffsets": []
        }
        """
        let config = try JSONDecoder().decode(AvatarActionDataConfig.self, from: Data(json.utf8))
        let manager = AvatarActionManager()

        manager.updateActions(config)

        return manager
    }

    func testGetDefaultActionFindsIsDefaultEntry() throws {
        let manager = try makeManager()

        XCTAssertEqual(manager.getDefaultAction()?.state, "std")
    }

    func testSortActionsFiltersPreventedActionsButDoesNotReorder() throws {
        let manager = try makeManager()

        // "talk" prevents "wave" - both requested, in this order. The real bug (see
        // AvatarActionManager.sortActions's doc comment): `.sort(void this.sortByPrecedence)`
        // evaluates to `.sort(undefined)`, so the surviving actions come back in the same order
        // they were filtered in, *not* re-ordered by `precedence` despite "Default" having the
        // highest precedence (1000) here.
        let wave = ActiveActionData(type: "wave")
        let talk = ActiveActionData(type: "talk")
        let stand = ActiveActionData(type: "std")

        let sorted = manager.sortActions([wave, talk, stand])

        XCTAssertEqual(sorted.map(\.type), ["talk", "std"])
        XCTAssertEqual(sorted.first?.definition?.state, "talk")
    }

    func testSortActionsDropsActionsWithNoMatchingDefinition() throws {
        let manager = try makeManager()

        let sorted = manager.sortActions([ActiveActionData(type: "not_a_real_action")])

        XCTAssertTrue(sorted.isEmpty)
    }
}
