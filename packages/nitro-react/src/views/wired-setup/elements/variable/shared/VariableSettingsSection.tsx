/**
 * The `variables.settings` section of the variable boxes: one checkbox
 * (`createCheckboxGroup([ new CheckboxOptionParam(l(<option>)) ])`) in a section titled
 * `${wiredfurni.params.variables.settings}`. `§_-51K§`, `§_-g16§` and `§_-H1e§` put
 * `variables.settings.has_value` in it, `ReferenceVariable` `variables.settings.read_only`.
 */
import { WiredCheckboxGroup } from '#base/views/wired-setup/kit/WiredCheckboxGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';

export interface VariableSettingsSectionProps {
    /** The option's `${key}` caption. */
    label: string;
    selected: boolean;
    onToggle: (selected: boolean) => void;
}

export const VariableSettingsSection = ({ label, selected, onToggle }: VariableSettingsSectionProps) => (
    <WiredSection title="${wiredfurni.params.variables.settings}">
        <WiredCheckboxGroup
            options={[ { label, selected } ]}
            onToggle={(id, value) => onToggle(value)}
        />
    </WiredSection>
);
