import Foundation

/// Swift port of `AnimationData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationData.ts) -
/// one named animation state (one entry of a furniture's `animations` array, e.g. "open"/"close"/
/// "idle") resolved into per-layer `AnimationLayerData`. Transition animations (played once while
/// switching between two named states) are stored in the same lookup table as ordinary animations,
/// distinguished only by an offset added to their id - see `getTransitionToAnimationId`/
/// `getTransitionFromAnimationId`.
public final class AnimationData {
    private static let transitionToAnimationOffset = 1_000_000
    private static let transitionFromAnimationOffset = 2_000_000

    public static let defaultFrameNumber = 0

    private var layers: [Int: AnimationLayerData] = [:]
    private var _frameCount: Int = -1
    private var randomStart = false
    private var immediateChanges: [Int] = []

    public init() {}

    public static func getTransitionToAnimationId(_ animationId: Int) -> Int {
        transitionToAnimationOffset + animationId
    }

    public static func getTransitionFromAnimationId(_ animationId: Int) -> Int {
        transitionFromAnimationOffset + animationId
    }

    public static func isTransitionToAnimation(_ animationId: Int) -> Bool {
        animationId >= transitionToAnimationOffset && animationId < transitionFromAnimationOffset
    }

    public static func isTransitionFromAnimation(_ animationId: Int) -> Bool {
        animationId >= transitionFromAnimationOffset
    }

    public func dispose() {
        for layer in layers.values { layer.dispose() }

        layers.removeAll()
        immediateChanges.removeAll()
    }

    public func setImmediateChanges(_ animationIds: [Int]) {
        immediateChanges = animationIds
    }

    public func isImmediateChange(_ animationId: Int) -> Bool {
        immediateChanges.contains(animationId)
    }

    public func getStartFrame(_ direction: Int) -> Double {
        !randomStart ? 0 : Double.random(in: 0..<1) * Double(_frameCount)
    }

    @discardableResult
    public func initialize(_ animation: AssetVisualAnimation) -> Bool {
        if animation.randomStart == true { randomStart = true }

        if let animLayers = animation.layers {
            for layer in animLayers {
                let loopCount = layer.loopCount ?? 1
                let frameRepeat = layer.frameRepeat ?? 1
                let isRandom = (layer.random ?? 0) != 0

                if !addLayer(layer.id, loopCount, frameRepeat, isRandom, layer) { return false }
            }
        }

        return true
    }

    @discardableResult
    private func addLayer(_ layerId: Int, _ loopCount: Int, _ frameRepeat: Int, _ isRandom: Bool, _ layer: AssetVisualAnimationLayer) -> Bool {
        let layerData = AnimationLayerData(loopCount: loopCount, frameRepeat: frameRepeat, isRandom: isRandom)

        if let sequences = layer.frameSequences {
            for animationSequence in sequences {
                let sequenceLoopCount = animationSequence.loopCount ?? 1
                let isSequenceRandom = (animationSequence.random ?? 0) != 0

                let frame = layerData.addFrameSequence(loopCount: sequenceLoopCount, isRandom: isSequenceRandom)

                if let frames = animationSequence.frames {
                    for animationFrame in frames {
                        frame.addFrame(
                            id: animationFrame.id, x: animationFrame.x ?? 0, y: animationFrame.y ?? 0,
                            randomX: animationFrame.randomX ?? 0, randomY: animationFrame.randomY ?? 0,
                            directionalOffset: readDirectionalOffsets(animationFrame)
                        )
                    }
                }

                frame.initialize()
            }
        }

        layerData.calculateLength()
        layers[layerId] = layerData

        let frameCount = layerData.frameCount

        if frameCount > _frameCount { _frameCount = frameCount }

        return true
    }

    private func readDirectionalOffsets(_ frame: AssetVisualAnimationSequenceFrame) -> DirectionalOffsetData? {
        var directionalOffset: DirectionalOffsetData?

        if let offsets = frame.offsets {
            for offset in offsets {
                let resolved = directionalOffset ?? DirectionalOffsetData()

                resolved.setDirection(offset.direction, offsetX: offset.x ?? 0, offsetY: offset.y ?? 0)

                directionalOffset = resolved
            }
        }

        return directionalOffset
    }

    public func getFrame(_ direction: Int, _ layerId: Int, _ frameCount: Double) -> AnimationFrame? {
        layers[layerId]?.getFrame(direction, frameCount)
    }

    public func getFrameFromSequence(_ direction: Int, _ layerId: Int, _ sequenceId: Int, _ offset: Int, _ frameCount: Double) -> AnimationFrame? {
        layers[layerId]?.getFrameFromSequence(direction, sequenceId, offset, frameCount)
    }
}
