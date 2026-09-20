/**
 * `triggerconfs/TriggerConfCodes` mirrored whole - the `code` the server sends in a
 * `TriggerDefinition`, values from the `.as` file. Four members are obfuscated in the 2026 dump;
 * their names here are the server's (`WiredTriggerType`), given beside each with the element
 * class that returns them. There is no code 5.
 */
export const TriggerConfCodes = {
    AVATAR_SAYS_SOMETHING: 0,
    /** `§_-q1S§` - `§_-a2j§`, walks on furni. */
    AVATAR_WALKS_ON_FURNI: 1,
    /** `§_-GL§` - `§_-z18§`, walks off furni. */
    AVATAR_WALKS_OFF_FURNI: 2,
    TRIGGER_ONCE: 3,
    USE_STUFF: 4,
    TRIGGER_PERIODICALLY: 6,
    AVATAR_ENTERS_ROOM: 7,
    GAME_STARTS: 8,
    GAME_ENDS: 9,
    SCORE_ACHIEVED: 10,
    AVATAR_CAUGHT: 11,
    PERIODIC_LONG: 12,
    BOT_DESTINATION_REACHED: 13,
    BOT_AVATAR_REACHED: 14,
    CLOCK_REACH_TIME: 15,
    /** `§_-X1e§` - `PerformAction`. */
    AVATAR_PERFORMS_ACTION: 16,
    RECEIVE_SIGNAL: 17,
    AVATAR_CLICKS_FURNI: 18,
    PERIODIC_SHORT: 19,
    STATE_CHANGE: 20,
    /** `§_-vr§` - `§_-Jc§`, clicks a tile. */
    USER_CLICKS_TILE: 21,
    VARIABLE_UPDATE: 22,
    AVATAR_LEAVES_ROOM: 23,
    USER_CLICKS_USER: 24,
    TRANSACTION_COMPLETED: 25,
    TRANSACTION_FAILED: 26,
} as const;
