import Foundation

/// Swift port of the `IRoomObjectModel` interface (packages/nitro-api/src/room/object/IRoomObjectModel.ts) -
/// a typed key/value store, keyed by `RoomObjectVariableEnum`, that room-object logic reads and
/// writes per-instance state through. In the original this is populated from two sources: the
/// static `.nitro` asset's `logic` data (dimensions, custom variable names - see `FurnitureLogicData`,
/// which is what actually writes into this in this port) and server messages
/// (`ObjectDataUpdateMessage`/`IObjectData.writeRoomObjectModel`, out of scope - no networking
/// layer, see the README). A host app that has its own source of per-instance furniture state
/// (vote counts, sound-block speed, ...) can call `setValue` directly to drive the handful of
/// `Furniture*Visualization` subclasses that read from it (`FurnitureVoteCounterVisualization`, etc).
///
/// `getValue<T>` in TS never actually returns `nil`/`undefined` typed-as-optional (the generic `T`
/// claims a value always exists, which is a lie the original papers over with `|| default`
/// fallbacks at every call site) - this port makes that honest by returning `T?`, so callers use
/// the same `?? default` pattern explicitly instead of relying on an unsound cast.
public final class RoomObjectModel {
    private var values: [RoomObjectVariableEnum: Any] = [:]

    public private(set) var updateCounter: Int = 0

    public init() {}

    public func getValue<T>(_ key: RoomObjectVariableEnum) -> T? {
        values[key] as? T
    }

    public func setValue<T>(_ key: RoomObjectVariableEnum, _ value: T) {
        values[key] = value
        updateCounter += 1
    }

    public func removeKey(_ key: RoomObjectVariableEnum) {
        values.removeValue(forKey: key)
        updateCounter += 1
    }

    public func dispose() {
        values.removeAll()
    }
}
