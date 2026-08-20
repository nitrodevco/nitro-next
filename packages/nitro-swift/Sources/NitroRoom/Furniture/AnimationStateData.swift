import Foundation

/// Swift port of `AnimationStateData` (packages/nitro-renderer/src/room/object/visualization/data/AnimationStateData.ts) -
/// the *mutable, per-instance* playback state for one animated furniture item: which animation is
/// playing, the elapsed frame counter, and the currently-resolved `AnimationFrame` per layer.
/// `AnimationFrame`/`AnimationFrameData`/`AnimationLayerData`/etc. above are all shared, read-only
/// definitions parsed once from the `.nitro` asset manifest; this is the one piece of animation
/// state that's unique to each placed furniture item.
public final class AnimationStateData {
    private var _animationId: Int = -1
    private var _frameCounter: Double = 0
    private var frames: [AnimationFrame?] = []
    private var lastFramePlayedFlags: [Bool] = []
    private var animationPlayedFlags: [Bool] = []
    private var layerCount: Int = 0

    public var animationOver: Bool = false
    public var animationAfterTransitionId: Int = 0

    public init() {}

    public var frameCounter: Double {
        get { _frameCounter }
        set { _frameCounter = newValue }
    }

    public var animationId: Int {
        get { _animationId }
        set {
            guard newValue != _animationId else { return }

            _animationId = newValue

            resetAnimationFrames(recycle: false)
        }
    }

    public func dispose() {
        frames.removeAll()
        lastFramePlayedFlags.removeAll()
        animationPlayedFlags.removeAll()
    }

    public func setLayerCount(_ count: Int) {
        layerCount = count

        resetAnimationFrames()
    }

    /// `recycle` here only decides whether existing frames are dropped vs. re-created with a reset
    /// (zeroed) `frameRepeats` in place - the original's underlying `AnimationFrame.recycle()`/pool
    /// mechanics don't apply under ARC (see `AnimationFrame`'s doc comment), so this keeps only the
    /// state-reset behavior that's actually observable.
    public func resetAnimationFrames(recycle: Bool = true) {
        if recycle { frames.removeAll() }

        lastFramePlayedFlags = []
        animationPlayedFlags = []
        animationOver = false
        _frameCounter = 0

        var layerId = 0

        while layerId < layerCount {
            if recycle || frames.count <= layerId {
                setSlot(layerId, nil)
            } else {
                if let frame = frames[layerId] {
                    setSlot(layerId, AnimationFrame.allocate(
                        id: Int(frame.id), x: frame.x, y: frame.y, repeats: frame.repeats, frameRepeats: 0, isLastFrame: frame.isLastFrame
                    ))
                }
            }

            lastFramePlayedFlags.append(false)
            animationPlayedFlags.append(false)

            layerId += 1
        }
    }

    private func setSlot(_ layerId: Int, _ frame: AnimationFrame?) {
        while frames.count <= layerId { frames.append(nil) }

        frames[layerId] = frame
    }

    public func getFrame(_ layerId: Int) -> AnimationFrame? {
        guard layerId >= 0, layerId < frames.count else { return nil }

        return frames[layerId]
    }

    public func setFrame(_ layerId: Int, _ frame: AnimationFrame?) {
        guard layerId >= 0, layerId < layerCount else { return }

        setSlot(layerId, frame)
    }

    public func getAnimationPlayed(_ layerId: Int) -> Bool {
        guard layerId >= 0, layerId < layerCount else { return true }

        return layerId < animationPlayedFlags.count ? animationPlayedFlags[layerId] : false
    }

    public func setAnimationPlayed(_ layerId: Int, _ flag: Bool) {
        guard layerId >= 0, layerId < layerCount else { return }

        while animationPlayedFlags.count <= layerId { animationPlayedFlags.append(false) }

        animationPlayedFlags[layerId] = flag
    }

    public func getLastFramePlayed(_ layerId: Int) -> Bool {
        guard layerId >= 0, layerId < layerCount else { return true }

        return layerId < lastFramePlayedFlags.count ? lastFramePlayedFlags[layerId] : false
    }

    public func setLastFramePlayed(_ layerId: Int, _ flag: Bool) {
        guard layerId >= 0, layerId < layerCount else { return }

        while lastFramePlayedFlags.count <= layerId { lastFramePlayedFlags.append(false) }

        lastFramePlayedFlags[layerId] = flag
    }
}
