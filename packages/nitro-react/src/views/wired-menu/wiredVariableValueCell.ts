/**
 * `VariableValueTableObject.createVariableValueCell` - how a variable's value is shown in the
 * wired menu's tables (the inspection tab, both variable management windows): nothing for a
 * variable without a value, a red warning for the two ints Flash cannot show, a packed variable's
 * parts in purple, otherwise the value with its connected text, editable when the variable and the
 * viewer allow it.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import type { TableTextCell } from '#base/views/shared/table/TableView';
import { getPackedVariableText, uintToHexColor, variableValueWithString, WIRED_INT_MAX, WIRED_INT_MIN } from '#base/wired';

/** `16734003` - the colour of the "flash restriction" cell. */
const FLASH_RESTRICTION_COLOR = uintToHexColor(16734003);

/** `10158534` - the colour of a packed variable's parts (WIN63-202610121624). */
const PACKED_VARIABLE_COLOR = uintToHexColor(10158534);

export const wiredVariableValueCell = (variable: IWiredVariable, value: number, translate: (key: string) => string, highlightChanges: boolean, canModify: boolean): TableTextCell => {
    if (!variable.hasValue) return { text: '' };

    if ((value === WIRED_INT_MAX) || (value === WIRED_INT_MIN)) {
        return {
            text: translate('wiredmenu.inspection.flash_restriction.text'),
            tooltip: translate('wiredmenu.inspection.flash_restriction.desc'),
            textColor: FLASH_RESTRICTION_COLOR,
        };
    }

    const packed = getPackedVariableText(variable, value);

    if (packed !== null) {
        return {
            text: packed,
            editable: variable.canWriteValue && canModify,
            inspectable: true,
            textFieldValue: String(value),
            highlightOnChange: highlightChanges,
            tooltip: `${packed}
${translate('wiredmenu.inspection.packed_variable.desc')}`,
            textColor: PACKED_VARIABLE_COLOR,
        };
    }

    return {
        text: variableValueWithString(variable, value) ?? '',
        editable: variable.canWriteValue && canModify,
        inspectable: true,
        textFieldValue: String(value),
        highlightOnChange: highlightChanges,
    };
};
