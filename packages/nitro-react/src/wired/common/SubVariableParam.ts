/**
 * `uibuilder/params/applications/SubVariableParam` - one sub-variable an addon can create
 * (`current_level` of a level-up addon, `hour_of_day` of the time utility, ...) - and the bit
 * mask `SubVariableCreatorPreset` keeps the chosen ones in: bit `id` is set when the
 * sub-variable with that id is ticked.
 */
export interface WiredSubVariableParam {
    /** The bit of the mask, and the suffix of the option's localization key. */
    id: number;
    /** The sub-variable's name as the box shows it (not localized - it is what a user types after the dot). */
    name: string;
    /** `hasExtraText` - the option has a `<key>.extra` explanation under it. */
    hasExtraText?: boolean;
}

/** `SubVariableCreatorPreset.mask` (the getter) - only the bits of these sub-variables. */
export const subVariableMask = (subVariables: readonly WiredSubVariableParam[], mask: number): number =>
    subVariables.reduce((result, subVariable) => ((mask & (1 << subVariable.id)) !== 0) ? (result | (1 << subVariable.id)) : result, 0);

/** Whether a sub-variable is ticked in a mask (`SubVariableCreatorPreset.mask`, the setter). */
export const isSubVariableSelected = (mask: number, id: number): boolean => (mask & (1 << id)) !== 0;

/** A mask with one sub-variable ticked or not. */
export const setSubVariableSelected = (mask: number, id: number, selected: boolean): number =>
    selected ? (mask | (1 << id)) : (mask & ~(1 << id));
