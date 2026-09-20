/**
 * `VariableValueTableObject.createVariableValueCell` - how a variable's value is shown in the
 * wired menu's tables (the inspection tab, both variable management windows): nothing for a
 * variable without a value, a red warning for the two ints Flash cannot show, otherwise the value
 * with its connected text, editable when the variable and the viewer allow it.
 */
import type { IWiredVariable } from '@nitrodevco/nitro-packets';

import { uintToHexColor, variableValueWithString, WIRED_INT_MAX, WIRED_INT_MIN } from '#base/wired';

import type { WiredTableTextCell } from '../wired-common/WiredTableView';

/** `16734003` - the colour of the "flash restriction" cell. */
const FLASH_RESTRICTION_COLOR = uintToHexColor(16734003);

export const wiredVariableValueCell = (variable: IWiredVariable, value: number, translate: (key: string) => string, highlightChanges: boolean, canModify: boolean): WiredTableTextCell => {
    if (!variable.hasValue) return { text: '' };

    if ((value === WIRED_INT_MAX) || (value === WIRED_INT_MIN)) {
        return {
            text: translate('wiredmenu.inspection.flash_restriction.text'),
            tooltip: translate('wiredmenu.inspection.flash_restriction.desc'),
            textColor: FLASH_RESTRICTION_COLOR,
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
