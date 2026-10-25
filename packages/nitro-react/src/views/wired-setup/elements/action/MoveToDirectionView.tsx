/**
 * `actiontypes/§_-e1q§.buildInputs` (MOVE_TO_DIRECTION) - the start direction (eight arrow icons,
 * `move_0` to `move_7`, in four columns), the turn rule (`wiredfurni.params.turn.0` to `.6`) and
 * the "user collision" checkbox, each in its own section.
 */
import { MOVE_TO_DIRECTION_DIRECTIONS, MOVE_TO_DIRECTION_LAST_TURN, MoveToDirectionActionForm, WiredElementView } from '#base/wired';

import { WiredCheckboxGroup } from '../../kit/WiredCheckboxGroup';
import { WiredRadioGroup } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

const DIRECTION_OPTIONS = Array.from({ length: MOVE_TO_DIRECTION_DIRECTIONS }, (_, id) => ({ id, label: '', icon: `move_${id}` }));
const TURN_OPTIONS = Array.from({ length: MOVE_TO_DIRECTION_LAST_TURN + 1 }, (_, id) => ({ id, label: `\${wiredfurni.params.turn.${id}}` }));

export const MoveToDirectionView: WiredElementView<MoveToDirectionActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.startdir}">
            <WiredRadioGroup
                options={DIRECTION_OPTIONS}
                selected={form.startDirection}
                onSelect={startDirection => setForm({ startDirection })}
                columns={4}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.turn}">
            <WiredRadioGroup
                options={TURN_OPTIONS}
                selected={form.turn}
                onSelect={turn => setForm({ turn })}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.user_collide}">
            <WiredCheckboxGroup
                options={[ { id: 0, label: '${wiredfurni.params.user_collide.0}', selected: form.blockOnCollide } ]}
                onToggle={(id, blockOnCollide) => setForm({ blockOnCollide })}
            />
        </WiredSection>
    </>
);
