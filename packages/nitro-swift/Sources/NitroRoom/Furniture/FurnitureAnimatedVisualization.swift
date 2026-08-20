import Foundation

import NitroAssets

/// Swift port of `FurnitureAnimatedVisualization` (packages/nitro-renderer/src/room/object/visualization/furniture/FurnitureAnimatedVisualization.ts) -
/// the animation-id/frame state machine for animated furniture (movers, blinking lights, the vote
/// counter, etc). Owns one `AnimationStateData` and, each `tick`, resolves the current `AnimationFrame`
/// for every layer, handling transition animations (`AnimationData.getTransitionTo/FromAnimationId`)
/// and per-layer frame-repeat stepping exactly as the original does.
///
/// This is a standalone class composed with `FurnitureVisualization` rather than a Swift subclass
/// of it - the TS original is a subclass of `RoomObjectSpriteVisualization`, driven by a
/// `RoomObject`/`RoomObjectModel` pair (`this.object.getState(0)`,
/// `this.object.model.getValue(RoomObjectVariableEnum...)`) that this port has no networking-driven
/// equivalent of (see the README's "no networking layer" scoping). Rather than fabricate that
/// machinery, the pieces of `updateObject`/`updateModel` that actually drive animation selection
/// are exposed as explicit methods a caller (`NitroRendererKit`, or a concrete subclass below)
/// invokes directly: `setState(_:)` replaces the `object.getState(0)` poll,
/// `setAutomaticStateIndex(_:)` replaces the `FurnitureAutomaticStateIndex` model-variable read,
/// and `tick(scale:)` replaces the per-frame `updateAnimation` call. `updateModel`'s
/// `FurnitureStateUpdateTime`-triggered forced re-animation has no equivalent and is dropped rather
/// than faked (nothing in this port tracks a message-arrival timestamp to compare against).
///
/// Not `final` - a handful of the ~20 concrete `Furniture*Visualization` subclasses are genuinely
/// self-contained animation-sequencing/frame-number variations with no server-message dependency
/// (`FurnitureCounterClockVisualization`, `FurnitureVoteCounterVisualization`,
/// `FurnitureVoteMajorityVisualization`, `FurnitureSoundBlockVisualization`,
/// `FurnitureQueueTileVisualization`, `FurnitureResettingAnimatedVisualization` - see their own
/// files) and are ported as same-module subclasses, overriding `getFrameNumber`/`getLayerAlpha`/
/// `setAnimation`/`updateAnimations`/`tick` exactly where the TS originals do. `model` (a
/// `RoomObjectModel`) stands in for the pieces of `object.model` those variants read from
/// (vote counts, sound-block speed, ...) - populate it from whatever source the host app has for
/// that per-instance state. The remaining subclasses - particle systems, external image/video,
/// badges, guild customization, mannequins - stay out of scope; see the README for the full
/// breakdown of what's ported here versus what still needs real furniture metadata or a
/// networking layer.
public class FurnitureAnimatedVisualization: FurnitureVisualizing {
    public static let defaultAnimationId = 0

    private let visualization: FurnitureVisualization
    public var data: FurnitureVisualizationData { visualization.data }
    /// Stands in for `object.model` - see the class doc comment. Populate the keys a given
    /// subclass reads (e.g. `.furnitureVoteCounterCount`) from whatever tracks that state.
    public let model = RoomObjectModel()

    /// The raw value last passed to `setState` - `object.getState(0)` in TS. Distinct from
    /// `animationId`: this is the *requested* logic state, before transition-animation resolution.
    public private(set) var currentState: Int = -1
    public var frameIncrease: Int = 1
    public var usesAnimationResetting: Bool = false

    let animationData = AnimationStateData()
    var animationScale: Int = RoomGeometryScaleType.none.rawValue
    var animatedLayerCount: Int = 0
    var directionChanged: Bool = false
    public private(set) var direction: Int = 0

    public init(data: FurnitureVisualizationData, collection: GraphicAssetCollection) {
        visualization = FurnitureVisualization(data: data, collection: collection)
    }

    public var animationId: Int { animationData.animationId }

    /// `FurnitureAnimatedVisualization.getAnimationId` in TS - renamed to avoid colliding with the
    /// `animationId` property above (the two are named identically in the original, disambiguated
    /// there only by one being a method and the other a getter).
    private func resolvedAnimationId() -> Int {
        if animationId != FurnitureAnimatedVisualization.defaultAnimationId, data.hasAnimation(animationScale, animationId) {
            return animationId
        }

        return FurnitureAnimatedVisualization.defaultAnimationId
    }

    public func resolveDirection(scale: Int, cameraDirectionX: Double, objectDirectionX: Double) -> Int {
        visualization.resolveDirection(scale: scale, cameraDirectionX: cameraDirectionX, objectDirectionX: objectDirectionX)
    }

    /// Mirrors `setDirection`'s change-tracking: a direction change forces every layer to
    /// re-resolve its frame on the next `tick`, even mid-repeat.
    public func setDirection(_ direction: Int) {
        guard self.direction != direction else { return }

        self.direction = direction
        directionChanged = true
    }

    /// Replaces the `object.getState(0)` poll in `updateObject` - call this whenever the caller's
    /// notion of this furniture's logic state changes.
    public func setState(_ state: Int) {
        guard state != currentState else { return }

        setAnimation(state)

        currentState = state
    }

    /// Replaces the `FurnitureAutomaticStateIndex` model-variable read in `updateModel`.
    public func setAutomaticStateIndex(_ index: Int) {
        setAnimation(data.getAnimationId(animationScale, index))
    }

    func setAnimation(_ animationId: Int) {
        setSubAnimation(animationId, allowTransition: currentState >= 0)
    }

    @discardableResult
    private func setSubAnimation(_ requestedAnimationId: Int, allowTransition: Bool) -> Bool {
        var animationId = requestedAnimationId
        let currentAnimation = animationData.animationId

        if allowTransition {
            if isPlayingTransition(animationId) { return false }

            let resolvedState = getCurrentState()

            if animationId != resolvedState {
                if !data.isImmediateChange(animationScale, animationId, resolvedState) {
                    var transition = AnimationData.getTransitionFromAnimationId(resolvedState)

                    if data.hasAnimation(animationScale, transition) {
                        animationData.animationAfterTransitionId = animationId
                        animationId = transition
                    } else {
                        transition = AnimationData.getTransitionToAnimationId(animationId)

                        if data.hasAnimation(animationScale, transition) {
                            animationData.animationAfterTransitionId = animationId
                            animationId = transition
                        }
                    }
                }
            } else if AnimationData.isTransitionFromAnimation(animationData.animationId) {
                let transition = AnimationData.getTransitionToAnimationId(animationId)

                if data.hasAnimation(animationScale, transition) {
                    animationData.animationAfterTransitionId = animationId
                    animationId = transition
                }
            } else if !AnimationData.isTransitionToAnimation(animationData.animationId) {
                if usesAnimationResetting {
                    let transition = AnimationData.getTransitionFromAnimationId(resolvedState)

                    if data.hasAnimation(animationScale, transition) {
                        animationData.animationAfterTransitionId = animationId
                        animationId = transition
                    } else {
                        let transition2 = AnimationData.getTransitionToAnimationId(animationId)

                        if data.hasAnimation(animationScale, transition2) {
                            animationData.animationAfterTransitionId = animationId
                            animationId = transition2
                        }
                    }
                }
            }
        }

        if currentAnimation != animationId {
            animationData.animationId = animationId

            return true
        }

        return false
    }

    private func isPlayingTransition(_ animationId: Int) -> Bool {
        if !AnimationData.isTransitionFromAnimation(animationData.animationId), !AnimationData.isTransitionToAnimation(animationData.animationId) {
            return false
        }

        if animationId != animationData.animationAfterTransitionId { return false }
        if animationData.animationOver { return false }

        return true
    }

    private func getCurrentState() -> Int {
        let animationId = animationData.animationId

        if !AnimationData.isTransitionFromAnimation(animationId), !AnimationData.isTransitionToAnimation(animationId) {
            return animationId
        }

        return animationData.animationAfterTransitionId
    }

    func resetAllAnimationFrames() {
        animationData.setLayerCount(animatedLayerCount)
    }

    /// Replaces the per-frame `updateAnimation` call the base `update()` loop made in TS. Returns
    /// the per-layer dirty bitmask like the original (bit `n` set means layer `n` got a new frame
    /// this tick) for parity/debugging, though this port's `computeLayers` always does a full
    /// rebuild regardless (see `FurnitureVisualization`'s doc comment) so callers can safely ignore it.
    @discardableResult
    public func tick(scale: Int) -> Int {
        if scale != animationScale {
            animationScale = scale
            animatedLayerCount = data.getLayerCount(scale)

            resetAllAnimationFrames()
        }

        let update = updateAnimations(scale)

        directionChanged = false

        return update
    }

    func updateAnimations(_ scale: Int) -> Int {
        if animationData.animationOver, !directionChanged { return 0 }

        let update = updateFramesForAnimation(scale)

        if animationData.animationOver {
            if AnimationData.isTransitionFromAnimation(animationData.animationId) || AnimationData.isTransitionToAnimation(animationData.animationId) {
                setAnimation(animationData.animationAfterTransitionId)
                animationData.animationOver = false
            }
        }

        return update
    }

    private func updateFramesForAnimation(_ scale: Int) -> Int {
        if animationData.animationOver, !directionChanged { return 0 }

        let resolvedId = resolvedAnimationId()
        var frameCount = animationData.frameCounter

        if frameCount == 0 { frameCount = data.getStartFrame(animationScale, resolvedId, direction) }

        frameCount += Double(frameIncrease)
        animationData.frameCounter = frameCount
        animationData.animationOver = true

        var animationPlayed = false
        var layerId = animatedLayerCount - 1
        var update = 0
        // `max(_, 0)` guards the same edge case the original's `1 << (this._animatedLayerCount - 1)`
        // hits when `_animatedLayerCount` is 0 (JS coerces a negative shift via ToUint32; Swift
        // traps on a negative shift amount) - harmless either way since the `while layerId >= 0`
        // loop below never executes when `animatedLayerCount <= 0`.
        var layerUpdate = 1 << max(animatedLayerCount - 1, 0)

        while layerId >= 0 {
            var sequenceId = 0

            animationPlayed = animationData.getAnimationPlayed(layerId)

            if !animationPlayed || directionChanged {
                var lastFramePlayed = animationData.getLastFramePlayed(layerId)
                var frame = animationData.getFrame(layerId)

                if let f = frame, f.isLastFrame, f.remainingFrameRepeats <= frameIncrease {
                    lastFramePlayed = true
                }

                // Faithfully replicates the original's short-circuit-skips-the-mutating-decrement
                // JS idiom: `frame.remainingFrameRepeats -= frameIncrease` only runs (and its
                // result only matters) when `directionChanged` is false and `frame` exists and its
                // repeats haven't already run out - exactly the `&&`-guarded assignment-in-expression
                // the TS source relies on.
                var needsNewFrame = directionChanged || frame == nil

                if !needsNewFrame, let f = frame, f.remainingFrameRepeats >= 0 {
                    f.remainingFrameRepeats = f.remainingFrameRepeats - frameIncrease

                    if f.remainingFrameRepeats <= 0 { needsNewFrame = true }
                }

                if needsNewFrame {
                    sequenceId = AnimationFrame.sequenceNotDefined

                    if let f = frame { sequenceId = f.activeSequence }

                    if sequenceId == AnimationFrame.sequenceNotDefined {
                        frame = data.getFrame(animationScale, resolvedId, direction, layerId, frameCount)
                    } else {
                        frame = data.getFrameFromSequence(
                            animationScale, resolvedId, direction, layerId, sequenceId,
                            (frame?.activeSequenceOffset ?? 0) + (frame?.repeats ?? 0),
                            frameCount
                        )
                    }

                    animationData.setFrame(layerId, frame)
                    update |= layerUpdate
                }

                if frame == nil || frame?.remainingFrameRepeats == AnimationFrame.frameRepeatForever {
                    lastFramePlayed = true
                    animationPlayed = true
                } else {
                    animationData.animationOver = false
                }

                animationData.setLastFramePlayed(layerId, lastFramePlayed)
                animationData.setAnimationPlayed(layerId, animationPlayed)
            }

            layerUpdate >>= 1
            layerId -= 1
        }

        return update
    }

    /// `FurnitureAnimatedVisualization.getFrameNumber` in TS - the resolved per-layer
    /// `AnimationFrame`'s id, or `0` if none has been resolved yet (matches the base class's
    /// always-0 default, reached here via `?? 0` instead of a `super` call).
    /// `FurnitureCounterClockVisualization` and other digit-wheel-style variants override this to
    /// compute a frame number from `currentState`/`model` instead of the animation-frame sequence.
    public func getFrameNumber(scale: Int, layerId: Int) -> Double {
        animationData.getFrame(layerId)?.id ?? 0
    }

    /// `FurnitureAnimatedVisualization.getLayerAlpha` in TS - `defaultAlpha` is whatever
    /// `FurnitureVisualization.computeLayers` already computed from the asset data/alpha
    /// multiplier/look-through factor; overriding this only ever *replaces* that value (e.g. to
    /// hide a digit layer), it never needs to recompute it from scratch.
    public func getLayerAlpha(scale: Int, direction: Int, layerId: Int, defaultAlpha: Double) -> Double {
        defaultAlpha
    }

    public func computeLayers(
        scale: Int,
        direction: Int,
        selectedColorId: Int = 0,
        alphaMultiplier: Double = 1,
        furnitureLift: Double = 0,
        lookThrough: Bool = false
    ) -> [FurnitureLayerDraw] {
        visualization.computeLayers(
            scale: scale, direction: direction, selectedColorId: selectedColorId,
            alphaMultiplier: alphaMultiplier, furnitureLift: furnitureLift, lookThrough: lookThrough,
            layerOverride: { [self] layerId in
                let frame = animationData.getFrame(layerId)

                return FurnitureLayerOverride(
                    frameNumber: getFrameNumber(scale: scale, layerId: layerId),
                    extraOffsetX: frame?.x ?? 0,
                    extraOffsetY: frame?.y ?? 0
                )
            },
            alphaOverride: { [self] direction, layerId, defaultAlpha in
                getLayerAlpha(scale: scale, direction: direction, layerId: layerId, defaultAlpha: defaultAlpha)
            }
        )
    }
}
