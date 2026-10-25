/**
 * The `variables.availability` section of the furni, user and global variable boxes: one radio
 * per availability id (`RadioButtonParam(<id>, l("variables.availability.<id>"))`) in a section
 * titled `${wiredfurni.params.variables.availability}`.
 */
import { WiredRadioGroup } from '#base/views/wired-setup/kit/WiredRadioGroup';
import { WiredSection } from '#base/views/wired-setup/kit/WiredSection';

export interface VariableAvailabilitySectionProps {
    /** The radio ids, in the order the box builds them. */
    availabilities: readonly number[];
    selected: number;
    onSelect: (availability: number) => void;
}

export const VariableAvailabilitySection = ({ availabilities, selected, onSelect }: VariableAvailabilitySectionProps) => (
    <WiredSection title="${wiredfurni.params.variables.availability}">
        <WiredRadioGroup
            options={availabilities.map(id => ({ id, label: `\${wiredfurni.params.variables.availability.${id}}` }))}
            selected={selected}
            onSelect={onSelect}
        />
    </WiredSection>
);
