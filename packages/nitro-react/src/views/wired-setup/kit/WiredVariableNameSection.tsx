/**
 * `uibuilder/presets/sections/VariableNameSection` - the "variable name" section of the boxes
 * that create a variable: one 40 character text input whose text is rewritten, on every change,
 * to lower case with spaces as underscores (`normalizeWiredVariableName`), which is also what
 * the `variableName` getter returns.
 *
 * Controlled: `value` is the form's name and `onChange` gets it already normalised, so the form
 * holds exactly what `readStringParam` sends.
 */
import { normalizeWiredVariableName, VARIABLE_NAME_MAX_CHARACTERS } from '#base/wired';

import { WiredSection } from './WiredSection';
import { WiredTextInput } from './WiredTextInput';

export interface WiredVariableNameSectionProps {
    value: string;
    onChange: (name: string) => void;
}

export const WiredVariableNameSection = ({ value, onChange }: WiredVariableNameSectionProps) => (
    <WiredSection title="${wiredfurni.params.variables.variable_name}">
        <WiredTextInput
            value={value}
            onChange={text => onChange(normalizeWiredVariableName(text))}
            maxCharacters={VARIABLE_NAME_MAX_CHARACTERS}
        />
    </WiredSection>
);
