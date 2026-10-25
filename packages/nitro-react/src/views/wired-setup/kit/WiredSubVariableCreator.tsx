/**
 * `uibuilder/presets/applications/SubVariableCreatorPreset` - the "also create these
 * sub-variables" list of the addons that make variables (level-up, time utility, ...): one
 * checkbox per `WiredSubVariableParam`, captioned `${<keyPrefix><id>}`, with the sub-variable's
 * name in a read-only 85px field at the right end of the row and, when the param has one, the
 * `${<keyPrefix><id>.extra}` explanation under it in the style's soft colour.
 *
 * Controlled: `mask` is the form's int param - bit `id` set for a ticked sub-variable - and
 * `onChange` hands back the next mask. Bits of ids the list does not name are dropped, as the
 * Flash getter only ever sets the listed ones (`subVariableMask`).
 */
import { isSubVariableSelected, setSubVariableSelected, subVariableMask, WiredSubVariableParam } from '#base/wired';

import { WiredAlignRight } from './WiredAlignRight';
import { WiredCheckboxGroup } from './WiredCheckboxGroup';
import { useWiredStyle } from './WiredStyleContext';
import { WiredText } from './WiredText';
import { WiredTextInput } from './WiredTextInput';

/** `TextInputParam(name, -1, null, 85, null, false)`'s width. */
const NAME_FIELD_WIDTH = 85;

export interface WiredSubVariableCreatorProps {
    /** `createSubVariableCreator`'s first argument, e.g. `wiredfurni.params.variables.levelup.subvariable.`. */
    keyPrefix: string;
    subVariables: readonly WiredSubVariableParam[];
    mask: number;
    onChange: (mask: number) => void;
}

export const WiredSubVariableCreator = ({ keyPrefix, subVariables, mask, onChange }: WiredSubVariableCreatorProps) => {
    const style = useWiredStyle();

    return (
        <WiredCheckboxGroup
            options={subVariables.map(subVariable => ({
                id: subVariable.id,
                label: `\${${keyPrefix}${subVariable.id}}`,
                selected: isSubVariableSelected(mask, subVariable.id),
                extra: (
                    <WiredAlignRight>
                        <WiredTextInput
                            value={subVariable.name}
                            onChange={() => undefined}
                            maxCharacters={-1}
                            width={NAME_FIELD_WIDTH}
                            editable={false}
                        />
                    </WiredAlignRight>
                ),
                extraUnder: subVariable.hasExtraText
                    ? (
                            <WiredText
                                text={`\${${keyPrefix}${subVariable.id}.extra}`}
                                color={style.softTextColor}
                            />
                        )
                    : undefined,
            }))}
            onToggle={(id, selected) => onChange(subVariableMask(subVariables, setSubVariableSelected(mask, id, selected)))}
        />
    );
};
