/**
 * What several addon boxes share.
 *
 * `addons/DefaultAddonType` itself adds nothing a definition needs: its `isFilter` getter (true
 * for `SelectorFilter` and `§_-L1H§`) is never read outside the addon classes, so it has no
 * counterpart in `WiredElementDefinition`.
 *
 * The drop-down rules below are `ExpandableDropdown`'s: `init(options, id)` selects the option
 * with that id, or nothing when there is none, and `selectedOptionId` of an empty selection is
 * `selectedOption?.id` coerced to an `int` - 0, not -1. A box that reads `selectedId` into its
 * params therefore sends 0 for "nothing selected", and a box that re-inits a drop-down with its
 * own `selectedId` asks for option 0 after an empty selection.
 */
import { WIRED_DROPDOWN_NO_SELECTION } from '../../common/expandableDropdown';
import { normalizeWiredVariableName } from '../../common/WiredVariableSections';
import { getWiredBoolean, type WiredTriggerable } from '../../WiredTriggerable';

/**
 * The `PlaceholderNameSection` + `PlaceholderTypeSection` pair of the placeholder addons
 * (`§_-gh§`, `§_-I1D§`, `§_-L2e§`): the placeholder's name and whether it shows every selected
 * item joined by a delimiter. String param: the name, then `\t` and the delimiter for a multiple
 * placeholder; int param 0 is the multiple flag.
 *
 * `PlaceholderNameSection.placeholderName` reads its field with spaces as underscores and in lower
 * case, so the form holds the name in that form (`normalizeWiredVariableName`) however it was set.
 */
export interface WiredPlaceholderAddonFields {
    name: string;
    showMultiple: boolean;
    delimiter: string;
}

/** The placeholder addons' `onEditStart` for the name and type sections. */
export const readWiredPlaceholderAddonFields = (triggerable: WiredTriggerable): WiredPlaceholderAddonFields => {
    const parts = triggerable.stringParam.split('\t');

    return {
        name: normalizeWiredVariableName(parts[0]),
        showMultiple: getWiredBoolean(triggerable, 0),
        delimiter: (parts.length > 1) ? parts[1] : '',
    };
};

/** The placeholder addons' `readStringParamFromForm`. */
export const writeWiredPlaceholderAddonString = (fields: WiredPlaceholderAddonFields): string =>
    (fields.showMultiple ? `${fields.name}\t${fields.delimiter}` : fields.name);

/**
 * `SliderSection.value = x` (`SliderWindowControllerNew.setValue`) - a slider takes any value and
 * holds it clamped to its range, so a box saved with nothing (a fresh one's 0) reads back as the
 * slider's minimum.
 */
export const clampWiredSliderValue = (value: number, min: number, max: number): number => Math.min(max, Math.max(min, value));

/** `ExpandableDropdown.init(options, id)` - the selection the drop-down shows afterwards. */
export const reinitWiredDropdownSelection = (optionIds: readonly number[], id: number): number =>
    (optionIds.includes(id) ? id : WIRED_DROPDOWN_NO_SELECTION);

/** `DropdownPreset.selectedId` - what an empty selection reads as. */
export const readWiredDropdownSelectedId = (selected: number): number =>
    ((selected === WIRED_DROPDOWN_NO_SELECTION) ? 0 : selected);
