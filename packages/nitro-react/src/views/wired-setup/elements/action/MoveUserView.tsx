/**
 * `actiontypes/MoveUser.buildInputs` - in four columns each: the movement radio ("no movement" on
 * a row of its own, then the eight direction icons) in the `moveuser` section, and the rotation
 * radio ("no rotation", the eight directions, then clockwise and counter-clockwise) in the
 * `rotateuser` section.
 */
import { MOVE_USER_DIRECTIONS, MOVE_USER_NONE, MOVE_USER_TURNS, MoveUserActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup, WiredRadioOption } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** `createRadioGroup(..., null, 4)`. */
const COLUMNS = 4;

const DIRECTION_OPTIONS: WiredRadioOption[] = MOVE_USER_DIRECTIONS.map(id => ({ id, label: '', icon: `move_${id}` }));

const MOVEMENT_OPTIONS: WiredRadioOption[] = [
    { id: MOVE_USER_NONE, label: '${wiredfurni.params.movefurni.0}', newLine: true },
    ...DIRECTION_OPTIONS,
];

const ROTATION_OPTIONS: WiredRadioOption[] = [
    { id: MOVE_USER_NONE, label: '${wiredfurni.params.rotatefurni.0}', newLine: true },
    ...DIRECTION_OPTIONS,
    ...MOVE_USER_TURNS.map(([ id, icon ]) => ({ id, label: '', icon })),
];

export const MoveUserView: WiredElementView<MoveUserActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.moveuser}">
            <WiredRadioGroup
                options={MOVEMENT_OPTIONS}
                selected={form.movement}
                onSelect={movement => setForm({ movement })}
                columns={COLUMNS}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.rotateuser}">
            <WiredRadioGroup
                options={ROTATION_OPTIONS}
                selected={form.rotation}
                onSelect={rotation => setForm({ rotation })}
                columns={COLUMNS}
            />
        </WiredSection>
    </>
);
