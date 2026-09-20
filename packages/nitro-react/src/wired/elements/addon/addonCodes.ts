/**
 * `addons/AddonCodes` mirrored whole - the `code` the server sends in an `AddonDefinition`,
 * values from the `.as` file. Four members are obfuscated in the 2026 dump; their names here
 * come from the element class that returns them and the server's box of that code, given beside
 * each.
 */
export const AddonCodes = {
    CONDITION_EVALUATION: 0,
    /** `§_-dn§` - `§_-S1S§`, the random effect pick - `pickamount` / `skipactions` sliders (`wf_xtra_random`). */
    RANDOM: 1,
    /** `§_-n1w§` - `§_-U2N§`, no inputs (`wf_xtra_unseen`). */
    UNSEEN: 2,
    /** `§_-a1d§` - `§_-412§`, executions per time window (`wf_xtra_execution_limit`). */
    EXECUTION_LIMIT: 5,
    NO_MOVE_ANIMATION: 6,
    /** `§_-j13§` - `MovePhysics` (`wf_xtra_mov_physics`). */
    MOVE_PHYSICS: 7,
    CARRY_USERS: 8,
    ANIMATION_TIME: 9,
    FURNI_SELECTOR_FILTER: 10,
    USER_SELECTOR_FILTER: 11,
    FURNI_VARIABLE_FILTER: 12,
    USER_VARIABLE_FILTER: 13,
    USERNAME_PLACEHOLDER: 14,
    VARIABLE_PLACEHOLDER: 15,
    VARIABLE_CAPTURER: 16,
    EXECUTE_IN_ORDER: 17,
    CHEST_ITEM_TYPE_SCANNER: 18,
    FURNI_NAME_PLACEHOLDER: 19,
    CUSTOM_CONTRACT: 20,
    PROJECTILE: 21,
    JUMP_STRENGTH: 22,
    VARIABLE_TEXT_CONVERTER: 1000,
    VARIABLE_LEVEL_UP: 1001,
    VARIABLE_TIME_UTIL: 1002,
    VARIABLE_FX_HEALTH_POINTS: 1200,
    VARIABLE_FX_PROGRESS_BAR: 1201,
    VARIABLE_FX_LEVELLING_PROGRESS: 1202,
    VARIABLE_FX_STATUS_BAR: 1203,
    VARIABLE_FX_BOSS_BAR: 1204,
    VARIABLE_FX_NUMBER_DISPLAY: 1205,
    GLOBAL_PLACEHOLDER: 2000,
    ACHIEVEMENT_ENABLER: 2001,
    VARIABLES_WEB_API: 2002,
} as const;
