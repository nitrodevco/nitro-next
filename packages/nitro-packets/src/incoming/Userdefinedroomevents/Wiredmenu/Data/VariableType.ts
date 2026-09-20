// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
/**
 * Flash `_-YB._-ck`: where a wired variable comes from. Only `INTERNAL` keeps its name in the
 * client, so the other members still carry the generator's names; what they are can be read off
 * the variable picker's tabs (`TabButtonConfigs`) and the Turbo server's `WiredVariableType`.
 */
export enum VariableType {
    /** `_-513`: made by a variable furni - the picker's "user created" tab. The server calls it `Created`. */
    UNKNOWN_0 = 0,
    INTERNAL = 1,
    /** `_-KB`: listed under "user created" too. The server calls it `Sub`, a sub-variable of a created one. */
    UNKNOWN_2 = 2,
    /** `_-d2v`: the picker's "dynamic" tab (icon `var_picker_smart`). The server calls it `Smart`. */
    UNKNOWN_3 = 3,
}
