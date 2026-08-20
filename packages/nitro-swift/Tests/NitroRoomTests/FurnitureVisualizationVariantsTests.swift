import XCTest

import NitroAssets
@testable import NitroRoom

final class FurnitureVisualizationVariantsTests: XCTestCase {
    private func makeCollection(type: String = "test_furni", visualizationType: String? = nil, rawJSON: [String: Any] = [:]) -> GraphicAssetCollection {
        GraphicAssetCollection(
            data: AssetDataCore(type: type, visualizationType: visualizationType), rawJSON: rawJSON, libraryTextures: [:]
        )
    }

    private func makeFurnitureData(layers: [(id: Int, tag: String)]) throws -> FurnitureVisualizationData {
        let layerJSON = layers.map { "{\"id\": \($0.id), \"tag\": \"\($0.tag)\"}" }.joined(separator: ",")
        let json = "[{\"layerCount\": \(layers.count), \"layers\": [\(layerJSON)]}]"
        let visualizations = try JSONDecoder().decode([AssetVisualizationData].self, from: Data(json.utf8))
        let furnitureData = FurnitureVisualizationData()

        XCTAssertTrue(furnitureData.initialize(type: "test_furni", visualizations: visualizations))

        return furnitureData
    }

    func testCounterClockComputesDigitWheelFrameNumbersFromState() throws {
        let furnitureData = try makeFurnitureData(layers: [
            (0, "seconds_sprite"), (1, "ten_seconds_sprite"), (2, "minutes_sprite"), (3, "ten_minutes_sprite"),
        ])
        let clock = FurnitureCounterClockVisualization(data: furnitureData, collection: makeCollection())

        // 754 seconds = 12 minutes, 34 seconds.
        clock.setState(754)

        XCTAssertEqual(clock.getFrameNumber(scale: 64, layerId: 0), 4) // ones of seconds
        XCTAssertEqual(clock.getFrameNumber(scale: 64, layerId: 1), 3) // tens of seconds
        XCTAssertEqual(clock.getFrameNumber(scale: 64, layerId: 2), 2) // ones of minutes
        XCTAssertEqual(clock.getFrameNumber(scale: 64, layerId: 3), 1) // tens of minutes
        // The clock face itself has no "animation" - always pinned to 0.
        XCTAssertEqual(clock.animationId, 0)
    }

    func testVoteCounterReadsCountFromModelAndHidesWhenUnset() throws {
        let furnitureData = try makeFurnitureData(layers: [(0, "ones_sprite"), (1, "tens_sprite"), (2, "hundreds_sprite")])
        let counter = FurnitureVoteCounterVisualization(data: furnitureData, collection: makeCollection())

        counter.model.setValue(.furnitureVoteCounterCount, 123)

        XCTAssertEqual(counter.getFrameNumber(scale: 64, layerId: 0), 3)
        XCTAssertEqual(counter.getFrameNumber(scale: 64, layerId: 1), 2)
        XCTAssertEqual(counter.getFrameNumber(scale: 64, layerId: 2), 1)
        XCTAssertEqual(counter.getLayerAlpha(scale: 64, direction: 0, layerId: 0, defaultAlpha: 255), 255)

        counter.model.setValue(.furnitureVoteCounterCount, -1)

        // -1 is the "hide the counter" sentinel - digit layers get forced to alpha 0.
        XCTAssertEqual(counter.getLayerAlpha(scale: 64, direction: 0, layerId: 0, defaultAlpha: 255), 0)
    }

    func testGiftWrappedSplitsExtrasIntoPacketAndRibbonType() {
        let furnitureData = FurnitureVisualizationData()

        XCTAssertTrue(furnitureData.initialize(type: "present", visualizations: []))

        let giftWrapped = FurnitureGiftWrappedVisualization(data: furnitureData, collection: makeCollection())

        giftWrapped.setExtra(4017)

        // packetType = floor(4017 / 1000) = 4, ribbonType = 4017 % 1000 = 17.
        XCTAssertEqual(giftWrapped.packetType, 4)
        XCTAssertEqual(giftWrapped.ribbonType, 17)
    }

    func testFactoryDispatchesOnVisualizationType() {
        func build(_ visualizationType: String) -> FurnitureVisualizing? {
            let collection = makeCollection(
                visualizationType: visualizationType, rawJSON: ["visualizations": [[String: Any]()]]
            )

            return FurnitureVisualizationFactory.make(from: collection)
        }

        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureCounterClock) is FurnitureCounterClockVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureVoteCounter) is FurnitureVoteCounterVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureVoteMajority) is FurnitureVoteMajorityVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureSoundblock) is FurnitureSoundBlockVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureQueueTile) is FurnitureQueueTileVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureGiftWrapped) is FurnitureGiftWrappedVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureResettingAnimated) is FurnitureResettingAnimatedVisualization)
        XCTAssertTrue(build(RoomObjectVisualizationType.furnitureCuboid) is FurnitureVisualization)
        // Unknown/absent visualizationType falls back to animation-table detection.
        XCTAssertTrue(build("some_unmapped_type") is FurnitureVisualization)
    }
}
