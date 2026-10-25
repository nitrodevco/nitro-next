/**
 * The `usertype` section `conditions/TriggererMatches` and `selectors/UsersByType` build the same
 * way in their `buildInputs`: `createSection(l("usertype"), createRadioGroup([...]))` - habbo
 * (`usertype.1`), pet (`.2`) and bot (`.4`), one per row.
 */
import { WiredRadioGroup, WiredRadioOption } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** The radio's ids, in order. */
const USER_TYPE_OPTIONS: WiredRadioOption[] = [ 1, 2, 4 ].map(id => ({ id, label: `\${wiredfurni.params.usertype.${id}}` }));

export interface UserTypeSectionProps {
    selected: number;
    onSelect: (userType: number) => void;
}

export const UserTypeSection = ({ selected, onSelect }: UserTypeSectionProps) => (
    <WiredSection title="${wiredfurni.params.usertype}">
        <WiredRadioGroup
            options={USER_TYPE_OPTIONS}
            selected={selected}
            onSelect={onSelect}
        />
    </WiredSection>
);
