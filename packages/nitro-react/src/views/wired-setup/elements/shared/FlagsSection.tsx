/**
 * The one section of a box whose int params are its checkboxes (`flagsElement`):
 * `createSection(title, createCheckboxGroup([ CheckboxOptionParam(label), ... ]))`, one checkbox
 * per flag, stacked. `SendSignal`, `SetFurniStateTo`, `MovePhysics`, `StatesMatch` and
 * `UserClicksUser` build it.
 */
import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

export interface FlagsSectionProps {
    /** The section's title, a `${key}`. */
    title: string;
    /** The checkboxes' captions (`${key}` each), in int param order. */
    labels: readonly string[];
    flags: readonly boolean[];
    /** The checkbox's index and whether it is now ticked. */
    onToggle: (index: number, selected: boolean) => void;
}

export const FlagsSection = ({ title, labels, flags, onToggle }: FlagsSectionProps) => (
    <WiredSection title={title}>
        <WiredCheckboxGroup
            options={labels.map((label, index) => ({ label, selected: flags[index] }))}
            onToggle={onToggle}
        />
    </WiredSection>
);
