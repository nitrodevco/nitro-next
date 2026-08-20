import XCTest

@testable import NitroRoom

final class FurnitureAnimationTests: XCTestCase {
    func testFrameSequenceCollapsesIdenticalConsecutiveFramesButKeepsLogicalFrameCount() {
        let sequence = AnimationFrameSequenceData(loopCount: 1, isRandom: false)

        // Three identical `addFrame` calls (same id, no directional offsets, no random range)
        // collapse into one stored `AnimationFrameData` with repeats=3 - but `frameCount` tracks
        // the number of `addFrame` *calls* (via `frameIndexes`, which just re-points at the same
        // collapsed storage slot for each call), not the number of distinct stored frames, so it's
        // still 4, not 2.
        sequence.addFrame(id: 0, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.addFrame(id: 0, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.addFrame(id: 0, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.addFrame(id: 1, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.initialize()

        XCTAssertEqual(sequence.frameCount, 4)
        XCTAssertEqual(sequence.getFrame(0)?.id, 0)
        XCTAssertEqual(sequence.getFrame(0)?.repeats, 3) // the collapsed frame's repeat count
        XCTAssertEqual(sequence.getFrame(2)?.id, 0)
        XCTAssertEqual(sequence.getFrame(3)?.id, 1)
        XCTAssertNil(sequence.getFrame(4))
    }

    func testFrameSequenceHonorsLoopCountForWraparound() {
        let sequence = AnimationFrameSequenceData(loopCount: 2, isRandom: false)

        sequence.addFrame(id: 0, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.addFrame(id: 1, x: 0, y: 0, randomX: 0, randomY: 0, directionalOffset: nil)
        sequence.initialize()

        // 2 addFrame calls (distinct ids, no collapsing) * loopCount(2) = 4.
        XCTAssertEqual(sequence.frameCount, 4)
        XCTAssertEqual(sequence.getFrame(0)?.id, 0)
        XCTAssertEqual(sequence.getFrame(1)?.id, 1)
        XCTAssertEqual(sequence.getFrame(2)?.id, 0) // second loop iteration
        XCTAssertEqual(sequence.getFrame(3)?.id, 1)
        XCTAssertNil(sequence.getFrame(4))
    }

    func testTransitionAnimationIdMath() {
        XCTAssertEqual(AnimationData.getTransitionToAnimationId(3), 1_000_003)
        XCTAssertEqual(AnimationData.getTransitionFromAnimationId(3), 2_000_003)

        XCTAssertTrue(AnimationData.isTransitionToAnimation(1_000_003))
        XCTAssertFalse(AnimationData.isTransitionFromAnimation(1_000_003))

        XCTAssertTrue(AnimationData.isTransitionFromAnimation(2_000_003))
        XCTAssertFalse(AnimationData.isTransitionToAnimation(2_000_003))

        XCTAssertFalse(AnimationData.isTransitionToAnimation(3))
        XCTAssertFalse(AnimationData.isTransitionFromAnimation(3))
    }

    func testAnimationStateDataResetsFramesWhenAnimationIdChanges() {
        let state = AnimationStateData()
        state.setLayerCount(2)

        state.setFrame(0, AnimationFrame.allocate(id: 5, x: 1, y: 1, repeats: 1, frameRepeats: 3, isLastFrame: false))
        XCTAssertNotNil(state.getFrame(0))

        state.animationId = 7 // changing animationId triggers a (non-recycling) frame reset

        XCTAssertEqual(state.animationId, 7)
        XCTAssertFalse(state.animationOver)
        XCTAssertEqual(state.frameCounter, 0)
    }

    /// End-to-end: decode a small `animations` JSON payload the way `FurnitureVisualizationFactory`
    /// would, and confirm `AnimationSizeData.getFrame` resolves the expected keyframe sequence.
    /// `loopCount: 0` is what makes this loop forever (wrap via `frameCount % totalFrameCount`)
    /// rather than play once and hold the last frame - see `AnimationLayerData.getFrame`'s doc
    /// comment for the distinction, since it's easy to trip over when writing furniture-adjacent
    /// test fixtures.
    func testAnimationSizeDataResolvesFramesFromDecodedJSON() throws {
        let json = """
        [
            {
                "id": 0,
                "layers": [
                    {
                        "id": 0,
                        "loopCount": 0,
                        "frameRepeat": 1,
                        "frameSequences": [
                            { "frames": [ { "id": 0 }, { "id": 1 }, { "id": 2 } ] }
                        ]
                    }
                ]
            }
        ]
        """

        let animations = try JSONDecoder().decode([AssetVisualAnimation].self, from: Data(json.utf8))
        let sizeData = AnimationSizeData(layerCount: 1, angle: 45)

        XCTAssertTrue(sizeData.defineAnimations(animations))
        XCTAssertTrue(sizeData.hasAnimation(0))
        XCTAssertEqual(sizeData.getAnimationCount(), 1)

        XCTAssertEqual(sizeData.getFrame(0, 0, 0, 0)?.id, 0)
        XCTAssertEqual(sizeData.getFrame(0, 0, 0, 1)?.id, 1)
        XCTAssertEqual(sizeData.getFrame(0, 0, 0, 2)?.id, 2)
        // Wraps back to the first frame on the 4th step (frameCount is 3, loops forever).
        XCTAssertEqual(sizeData.getFrame(0, 0, 0, 3)?.id, 0)
    }

    func testFurnitureVisualizationDataDetectsAnimatedAssets() throws {
        let json = """
        [
            {
                "size": 64,
                "layerCount": 1,
                "animations": [
                    {
                        "id": 0,
                        "layers": [
                            {
                                "id": 0,
                                "loopCount": 0,
                                "frameRepeat": 1,
                                "frameSequences": [
                                    { "frames": [ { "id": 0 }, { "id": 1 } ] }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
        """

        let visualizations = try JSONDecoder().decode([AssetVisualizationData].self, from: Data(json.utf8))
        let furnitureData = FurnitureVisualizationData()

        XCTAssertTrue(furnitureData.initialize(type: "test_furni", visualizations: visualizations))
        XCTAssertTrue(furnitureData.isAnimated)
        XCTAssertTrue(furnitureData.hasAnimation(64, 0))
        XCTAssertEqual(furnitureData.getFrame(64, 0, 0, 0, 0)?.id, 0)
        XCTAssertEqual(furnitureData.getFrame(64, 0, 0, 0, 1)?.id, 1)
    }
}
