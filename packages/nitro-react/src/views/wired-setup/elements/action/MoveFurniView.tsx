/**
 * `actiontypes/MoveFurni.buildInputs` - the movement radio in four columns ("no movement" on a row
 * of its own, then an icon per direction and the three random moves) in the `movefurni` section,
 * and the rotation radio (none, clockwise, counter-clockwise with their icons, random) in the
 * `rotatefurni` section.
 */
import { MOVE_FURNI_MOVEMENTS, MoveFurniActionForm, WiredElementView } from '#base/wired';

import { WiredRadioGroup, WiredRadioOption } from '../../kit/WiredRadioGroup';
import { WiredSection } from '../../kit/WiredSection';

/** `createRadioGroup(..., null, 4)`. */
const MOVEMENT_COLUMNS = 4;

const MOVEMENT_OPTIONS: WiredRadioOption[] = [
    { id: 0, label: '${wiredfurni.params.movefurni.0}', newLine: true },
    ...MOVE_FURNI_MOVEMENTS.map(([ id, icon ]) => ({ id, label: '', icon })),
];

const ROTATION_OPTIONS: WiredRadioOption[] = [
    { id: 0, label: '${wiredfurni.params.rotatefurni.0}' },
    { id: 1, label: '${wiredfurni.params.rotatefurni.1}', icon: 'rotate_cw' },
    { id: 2, label: '${wiredfurni.params.rotatefurni.2}', icon: 'rotate_ccw' },
    { id: 3, label: '${wiredfurni.params.rotatefurni.3}' },
];

export const MoveFurniView: WiredElementView<MoveFurniActionForm> = ({ form, setForm }) => (
    <>
        <WiredSection title="${wiredfurni.params.movefurni}">
            <WiredRadioGroup
                options={MOVEMENT_OPTIONS}
                selected={form.movement}
                onSelect={movement => setForm({ movement })}
                columns={MOVEMENT_COLUMNS}
            />
        </WiredSection>
        <WiredSection title="${wiredfurni.params.rotatefurni}">
            <WiredRadioGroup
                options={ROTATION_OPTIONS}
                selected={form.rotation}
                onSelect={rotation => setForm({ rotation })}
            />
        </WiredSection>
    </>
);
