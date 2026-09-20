/**
 * The three constant classes of `addons/variablefx/model`, all obfuscated in the 2026 dump; the
 * member names that were kept are Flash's, the others come from the captions the editor gives
 * the value (`VariableFxVisibilitySettingsPreset.createAudienceOptions`,
 * `VariableFxVisualizationSettingsPreset.iconAlignmentOptions`).
 */

/** `§_-OT§` - where a number display's icon sits (`VariableFxState.iconAlignment`). */
export const VariableFxIconAlignment = {
    /** `§_-Io§` - `icon_alignment.left`. */
    LEFT: 0,
    RIGHT: 1,
    DOUBLE: 2,
} as const;

/** `§_-R1o§` - when the effect shows (`VariableFxState.showMode`). */
export const VariableFxShowMode = {
    ALWAYS: 0,
    WHEN_VARIABLE_CHANGES: 1,
    NEVER: 2,
} as const;

/** `§_-md§` - who sees the effect (`VariableFxState.visibility`). */
export const VariableFxAudience = {
    ONLY_USER: 0,
    GAME_TEAM: 1,
    /** `§_-ig§` - `visibility.everyone`. */
    EVERYONE: 2,
    /** `§_-M2N§` - `visibility.has_variable`: the users holding the audience variable. */
    HAS_VARIABLE: 3,
    /** `§_-4O§` - `visibility.has_variable.value`: the users whose audience variable has the audience value. */
    HAS_VARIABLE_VALUE: 4,
} as const;
