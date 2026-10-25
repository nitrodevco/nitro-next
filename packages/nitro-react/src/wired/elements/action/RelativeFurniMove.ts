/**
 * `actiontypes/§_-Pi§` (RELATIVE_FURNI_MOVE) - moves the picked furni by a fixed number of tiles
 * along each axis.
 *
 * Int params: `[ horizontal, vertical ]`, each a signed distance of up to 20 tiles. The form keeps
 * Flash's widgets apart: an arrow radio per axis (`RELATIVE_MOVE_POSITIVE` / `_NEGATIVE`, drawn as
 * `move_2` / `move_6` and `move_4` / `move_0`) and a 0 to 20 slider for the distance.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt } from '../../WiredTriggerable';
import { ActionTypeCodes } from './actionCodes';

/** `§_-Pi§.§_-3P§` / `§_-7v§` - the arrow radio ids; the negative one sends the distance negated. */
export const RELATIVE_MOVE_POSITIVE = 4;
export const RELATIVE_MOVE_NEGATIVE = 5;
/** `createSliderPreset(0, 20, 1)`. */
export const RELATIVE_MOVE_MAX_DISTANCE = 20;

export interface RelativeFurniMoveAxis {
    direction: number;
    distance: number;
}

export interface RelativeFurniMoveActionForm {
    horizontal: RelativeFurniMoveAxis;
    vertical: RelativeFurniMoveAxis;
}

/** `setAxisValue`. */
const toAxis = (value: number): RelativeFurniMoveAxis => ({
    direction: (value < 0) ? RELATIVE_MOVE_NEGATIVE : RELATIVE_MOVE_POSITIVE,
    distance: Math.abs(value),
});

/** `getAxisValue`. */
const fromAxis = (axis: RelativeFurniMoveAxis): number => ((axis.direction === RELATIVE_MOVE_NEGATIVE) ? -axis.distance : axis.distance);

export const relativeFurniMoveAction: WiredElementDefinition<RelativeFurniMoveActionForm> = {
    holder: 'action',
    code: ActionTypeCodes.RELATIVE_FURNI_MOVE,
    createForm: triggerable => ({
        horizontal: toAxis(getWiredInt(triggerable, 0)),
        vertical: toAxis(getWiredInt(triggerable, 1)),
    }),
    readIntParams: form => [ fromAxis(form.horizontal), fromAxis(form.vertical) ],
};
