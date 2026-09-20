/**
 * `selectors/InArea` - the base of `FurniInArea` (FURNI_IN_AREA) and `UsersInArea`
 * (USERS_IN_AREA): selects what is inside a rectangle of the room's floor, drawn in the room
 * itself through the room engine's area selection manager (see `InAreaView`).
 *
 * Int params: `[ root x, root y, width, height ]` - clearing the area makes them all 0.
 */
import type { WiredElementDefinition } from '../../WiredElement';
import { getWiredInt, WiredTriggerable } from '../../WiredTriggerable';

export interface InAreaSelectorForm {
    rootX: number;
    rootY: number;
    width: number;
    height: number;
}

/** `onEditStart`. */
const createInAreaForm = (triggerable: WiredTriggerable): InAreaSelectorForm => ({
    rootX: getWiredInt(triggerable, 0),
    rootY: getWiredInt(triggerable, 1),
    width: getWiredInt(triggerable, 2),
    height: getWiredInt(triggerable, 3),
});

/** An `InArea` subclass: only the code differs. */
export const createInAreaSelector = (code: number): WiredElementDefinition<InAreaSelectorForm> => ({
    holder: 'selector',
    code,
    createForm: createInAreaForm,
    readIntParams: form => [ form.rootX, form.rootY, form.width, form.height ],
});
