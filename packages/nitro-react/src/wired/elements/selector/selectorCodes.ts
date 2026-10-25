/**
 * `selectors/SelectorCodes` mirrored whole - the `code` the server sends in a
 * `SelectorDefinition`, values from the `.as` file. Four members are obfuscated in the 2026 dump;
 * their names here are the server's (`WiredSelectorType`), given beside each with the element
 * class that returns them.
 */
export const SelectorCodes = {
    FURNI_BY_TYPE: 0,
    /** `§_-Zy§` - `§_-Yu§`, the picked furni. */
    SELECTED_FURNIS: 1,
    USERS_BY_TYPE: 2,
    USERS_IN_TEAM: 3,
    FURNI_ON_FURNI: 4,
    FURNI_FROM_SIGNAL: 5,
    /** `§_-l1Y§` - `§_-6q§`, furni in the neighbourhood. */
    FURNI_IN_NEIGHBORHOOD: 6,
    /** `§_-g1R§` - `FurniInArea`. */
    FURNI_IN_AREA: 7,
    USERS_ON_FURNI: 8,
    USERS_PERFORMING_ACTION: 9,
    USERS_FROM_SIGNAL: 10,
    USERS_BY_NAME: 11,
    USERS_IN_NEIGHBORHOOD: 12,
    USERS_IN_AREA: 13,
    USERS_WITH_HANDITEM: 14,
    USERS_IN_GROUP: 15,
    FURNI_WITH_ALTITUDE: 16,
    /** `§_-92Y§` - `§_-QE§`, furni with a variable. */
    FURNI_WITH_VARIABLE: 17,
    USERS_WITH_VARIABLE: 18,
    REMOTE_SELECTOR: 19,
} as const;
