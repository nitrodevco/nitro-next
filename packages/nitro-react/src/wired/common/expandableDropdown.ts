/**
 * `wired_setup.common.advanced_dropdown.ExpandableDropdown` and `ExpandableDropdownOption` - a
 * drop-down whose advanced options stay folded behind a "show more" entry until that entry is
 * picked, or until the selected option is itself an advanced one.
 */

/** `ExpandableDropdownOption`. */
export interface WiredDropdownOption {
    id: number;
    /** `displayString` - shown as given; the wired kit also resolves a `${key}` form. */
    label: string;
    /** `isAdvanced`. Default `false`. */
    advanced?: boolean;
    /** Not in Flash's option class: greys the entry out and makes it unpickable. */
    disabled?: boolean;
}

/** `ExpandableDropdown.selectedOptionId` when nothing is selected - the caption shows instead. */
export const WIRED_DROPDOWN_NO_SELECTION = -1;

/** `advancedOptionsAvailable`. */
export const hasAdvancedDropdownOptions = (options: readonly WiredDropdownOption[]): boolean =>
    options.some(option => !!option.advanced);

/**
 * `populate` - the options the list holds. Advanced ones are left out unless the list has been
 * expanded or the selected option is advanced (Flash re-populates expanded when it meets one).
 */
export const listedDropdownOptions = (options: readonly WiredDropdownOption[], selectedId: number, expanded: boolean): WiredDropdownOption[] => {
    const selected = options.find(option => option.id === selectedId);

    if (expanded || selected?.advanced) return [ ...options ];

    return options.filter(option => !option.advanced);
};

/** Whether `populate` appends the "show more" entry: advanced options exist and are folded away. */
export const showsDropdownShowMore = (options: readonly WiredDropdownOption[], selectedId: number, expanded: boolean): boolean => {
    if (!hasAdvancedDropdownOptions(options)) return false;

    return listedDropdownOptions(options, selectedId, expanded).length < options.length;
};
