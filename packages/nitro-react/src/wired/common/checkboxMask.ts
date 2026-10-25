/**
 * `CheckboxGroupPreset.mask` - a checkbox group's selection as a bit mask, one bit per option
 * id (`1 << id`), which is how the boxes that use it store the group in an int param. The form
 * holds the mask itself, kept current by `setCheckboxMaskBit` on each toggle, so `get mask` is
 * the form field as it stands.
 */

/** `set mask` - whether option `id` is selected in `mask`. */
export const isCheckboxMaskBitSet = (mask: number, id: number): boolean => ((mask & (1 << id)) !== 0);

/** `mask` with option `id` switched on or off - what a group's `onToggle` writes back to the form. */
export const setCheckboxMaskBit = (mask: number, id: number, selected: boolean): number =>
    (selected ? (mask | (1 << id)) : (mask & ~(1 << id)));
