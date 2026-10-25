/**
 * `addons/§_-e2X§.buildInputs` - the mode drop-down (`choose_type`, the modes `onEditStart`
 * offers), the calendar sub-variables (expanded) and the advanced ones under their info text
 * (collapsed).
 */
import { TIME_UTIL_ADVANCED_SUB_VARIABLES, TIME_UTIL_SUB_VARIABLES, timeUtilModeOptions, VariableTimeUtilAddonForm, WiredElementView } from '#base/wired';

import { WiredDropdown } from '../../kit/WiredDropdown';
import { WiredSection } from '../../kit/WiredSection';
import { WiredSimpleList } from '../../kit/WiredSimpleList';
import { WiredSubVariableCreator } from '../../kit/WiredSubVariableCreator';
import { WiredText } from '../../kit/WiredText';

const SUB_VARIABLE_PREFIX = 'wiredfurni.params.time_util.subvariable.';

export const VariableTimeUtilView: WiredElementView<VariableTimeUtilAddonForm> = ({ form, setForm, triggerable }) => (
    <>
        <WiredSection title="${wiredfurni.params.choose_type}">
            <WiredDropdown
                options={timeUtilModeOptions(triggerable).map(id => ({ id, label: `\${wiredfurni.params.time_util.mode.${id}}` }))}
                selected={form.mode}
                onSelect={mode => setForm({ mode })}
                caption="${wiredfurni.params.choose_type}"
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.create_subvariables}"
            collapsible
        >
            <WiredSubVariableCreator
                keyPrefix={SUB_VARIABLE_PREFIX}
                subVariables={TIME_UTIL_SUB_VARIABLES}
                mask={form.subVariables}
                onChange={subVariables => setForm({ subVariables })}
            />
        </WiredSection>
        <WiredSection
            title="${wiredfurni.params.create_subvariables.advanced}"
            collapsible
            defaultCollapsed
        >
            <WiredSimpleList>
                <WiredText text="${wiredfurni.params.time_util.advanced_info}" />
                <WiredSubVariableCreator
                    keyPrefix={SUB_VARIABLE_PREFIX}
                    subVariables={TIME_UTIL_ADVANCED_SUB_VARIABLES}
                    mask={form.advancedSubVariables}
                    onChange={advancedSubVariables => setForm({ advancedSubVariables })}
                />
            </WiredSimpleList>
        </WiredSection>
    </>
);
