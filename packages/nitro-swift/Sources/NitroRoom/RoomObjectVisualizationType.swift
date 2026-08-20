import Foundation

/// Swift port of `RoomObjectVisualizationType` (packages/nitro-api/src/room/object/RoomObjectVisualizationType.ts) -
/// the string values a `.nitro` bundle's asset manifest carries under `visualizationType`, used to
/// pick which concrete visualization class a furniture item needs. Ported in full for fidelity;
/// only the furniture-related cases `FurnitureVisualizationFactory` actually switches on are
/// documented per-case with which Swift type (if any) they resolve to - see its doc comment for
/// the full room/avatar-side cases (`ROOM`, `USER`, `PET_ANIMATED`, ...), which are out of scope here.
public enum RoomObjectVisualizationType {
    public static let room = "room"
    public static let tileCursor = "tile_cursor"
    public static let user = "user"
    public static let bot = "bot"
    public static let rentableBot = "rentable_bot"
    public static let petAnimated = "pet_animated"
    public static let furnitureStatic = "furniture_static"
    public static let furnitureAnimated = "furniture_animated"
    public static let furnitureResettingAnimated = "furniture_resetting_animated"
    public static let furniturePoster = "furniture_poster"
    public static let furnitureExternalImage = "furniture_external_image"
    public static let furnitureHabbowheel = "furniture_habbowheel"
    public static let furnitureValRandomizer = "furniture_val_randomizer"
    public static let furnitureBottle = "furniture_bottle"
    public static let furniturePlanetSystem = "furniture_planet_system"
    public static let furnitureQueueTile = "furniture_queue_tile"
    public static let furniturePartyBeamer = "furniture_party_beamer"
    public static let furnitureCuboid = "furniture_cuboid"
    public static let furnitureGiftWrapped = "furniture_gift_wrapped"
    public static let furnitureGiftWrappedFireworks = "furniture_gift_wrapped_fireworks"
    public static let furnitureCounterClock = "furniture_counter_clock"
    public static let furnitureWaterArea = "furniture_water_area"
    public static let furnitureScoreBoard = "furniture_score_board"
    public static let furnitureFireworks = "furniture_fireworks"
    public static let furnitureBB = "furniture_bb"
    public static let furnitureIsometricBB = "furniture_isometric_bb"
    public static let furnitureBG = "furniture_bg"
    public static let furnitureStickie = "furniture_stickie"
    public static let furnitureMannequin = "furniture_mannequin"
    public static let furnitureGuildCustomized = "furniture_guild_customized"
    public static let furnitureGuildIsometricBadge = "furniture_guild_isometric_badge"
    public static let furnitureVoteCounter = "furniture_vote_counter"
    public static let furnitureVoteMajority = "furniture_vote_majority"
    public static let furnitureSoundblock = "furniture_soundblock"
    public static let furnitureBadgeDisplay = "furniture_badge_display"
    public static let furnitureYoutube = "furniture_youtube"
    public static let furnitureBuilderPlaceholder = "furniture_builder_placeholder"
}
