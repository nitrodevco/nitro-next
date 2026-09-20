/**
 * `conditions/§_-ze§.buildInputs` (user direction) - the `direction_selection` section: eight
 * captionless checkboxes in four columns, each with its `move_<n>` arrow icon.
 */
import { isCheckboxMaskBitSet, setCheckboxMaskBit, USER_DIRECTION_DIRECTIONS, UserDirectionConditionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredSection } from '../../kit/WiredSection';

const DIRECTIONS = Array.from({ length: USER_DIRECTION_DIRECTIONS }, (_, index) => index);

export const UserDirectionView: WiredElementView<UserDirectionConditionForm> = ({ form, setForm }) => (
    <WiredSection title="${wiredfurni.params.direction_selection}">
        <WiredCheckboxGroup
            options={DIRECTIONS.map(direction => ({ id: direction, label: '', icon: `move_${direction}`, selected: isCheckboxMaskBitSet(form.directions, direction) }))}
            onToggle={(direction, selected) => setForm(current => ({ ...current, directions: setCheckboxMaskBit(current.directions, direction, selected) }))}
            columns={4}
        />
    </WiredSection>
);
