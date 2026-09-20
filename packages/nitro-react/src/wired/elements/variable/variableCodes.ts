/**
 * `variables/VariableCodes` mirrored whole - the `code` the server sends in a
 * `VariableDefinition`, values from the `.as` file. Three members are obfuscated in the 2026 dump;
 * their names here come from the element class that returns them (and its captions), given
 * beside each.
 */
export const VariableCodes = {
    /** `§_-K2C§` - `§_-51K§`, the furni variable (`wf_var_furni`). */
    FURNI_VARIABLE: 0,
    USER_VARIABLE: 1,
    GLOBAL_VARIABLE: 2,
    CONTEXT_VARIABLE: 3,
    REFERENCE_VARIABLE: 4,
    /** `§_-32N§` - `§_-Q22§`, the quest variable (`variables.quest_name`). */
    QUEST_VARIABLE: 5,
    /** `§_-b1B§` - `§_-m1q§`, the quest chain variable (`variables.quest_chain_name`). */
    QUEST_CHAIN_VARIABLE: 6,
    ECHO_VARIABLE: 7,
    /** `§_-J27§` - `§_-34§`, the daily task variable (`variables.daily_task_name`). */
    DAILY_TASK_VARIABLE: 8,
} as const;
