import XCTest

import NitroAssets
@testable import NitroRoom

final class FurnitureLogicDataTests: XCTestCase {
    private func makeCollection(logicJSON: [String: Any]) -> GraphicAssetCollection {
        let data = AssetDataCore(type: "test_throne")

        return GraphicAssetCollection(data: data, rawJSON: ["logic": logicJSON], libraryTextures: [:])
    }

    func testParsesDimensionsCenterAndDirections() {
        let collection = makeCollection(logicJSON: [
            "model": ["dimensions": ["x": 2, "y": 1, "z": 1.5], "directions": [4, 0, 2]],
        ])

        let logic = FurnitureLogicData.parse(from: collection)

        XCTAssertEqual(logic.sizeX, 2)
        XCTAssertEqual(logic.sizeY, 1)
        XCTAssertEqual(logic.sizeZ, 1.5)
        XCTAssertEqual(logic.centerX, 1)
        XCTAssertEqual(logic.centerY, 0.5)
        XCTAssertEqual(logic.centerZ, 0.75)
        // Sorted ascending, matching `FurnitureLogic.initialize`'s `_directions.sort((a, b) => a - b)`.
        XCTAssertEqual(logic.allowedDirections, [0, 2, 4])
    }

    func testParsesCustomVariables() {
        let collection = makeCollection(logicJSON: ["customVars": ["variables": ["speed", "color"]]])

        let logic = FurnitureLogicData.parse(from: collection)

        XCTAssertEqual(logic.customVariables, ["speed", "color"])
    }

    func testMissingLogicYieldsAllZeroDefaults() {
        let collection = GraphicAssetCollection(data: AssetDataCore(type: "test_throne"), rawJSON: [:], libraryTextures: [:])
        let logic = FurnitureLogicData.parse(from: collection)

        XCTAssertEqual(logic.sizeX, 0)
        XCTAssertEqual(logic.sizeY, 0)
        XCTAssertEqual(logic.sizeZ, 0)
        XCTAssertTrue(logic.allowedDirections.isEmpty)
        XCTAssertTrue(logic.customVariables.isEmpty)
    }

    func testWriteToModelSetsExpectedKeys() {
        let logic = FurnitureLogicData(sizeX: 2, sizeY: 1, sizeZ: 1, allowedDirections: [0, 4], customVariables: ["speed"])
        let model = RoomObjectModel()

        logic.writeToModel(model)

        XCTAssertEqual(model.getValue(.furnitureSizeX), 2.0)
        XCTAssertEqual(model.getValue(.furnitureCenterX), 1.0)
        XCTAssertEqual(model.getValue(.furnitureAllowedDirections), [0, 4])
        XCTAssertEqual(model.getValue(.furnitureAlphaMultiplier), 1.0)
        XCTAssertEqual(model.getValue(.furnitureCustomVariables), ["speed"])
    }

    func testWriteToModelOmitsCustomVariablesKeyWhenEmpty() {
        let logic = FurnitureLogicData()
        let model = RoomObjectModel()

        logic.writeToModel(model)

        XCTAssertNil(model.getValue(.furnitureCustomVariables) as [String]?)
    }
}
