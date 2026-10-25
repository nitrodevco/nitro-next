/**
 * `selectors/InNeighborhood` - the base of `§_-6q§` (FURNI_IN_NEIGHBORHOOD) and `§_-xp§`
 * (USERS_IN_NEIGHBORHOOD): selects what is on a drawn set of tiles around each furni or user of
 * its merged source, relative to a root tile.
 *
 * Int params: `[ users, root x, root y, ...plan ]` - `users` is the merged source type (1 for
 * users, 0 for furni; `setMergedType` / `getMergedType`), the root is relative to the centre, and
 * the plan is `SpiralUtils.createSpiralVector` of the 21 x 21 drawing.
 *
 * The drawing shows either its 11 x 11 middle or, in big mode, all of it - with the dialog 1.7
 * times as wide (`widthModifier`, `inNeighborhoodWidthModifier`). A drawing that reaches outside
 * the middle can only be shown big. Flash keeps the last size chosen on the element
 * (`_preferBigMode`), so the next edit of that box type opens the same way; the form carries it
 * and the element's memory keeps it (`rememberOnEdit`, `ctx.elementMemory`). Only the toggle
 * changes it - a drawing that forces big mode does not.
 */
import { createNeighborhoodFloorPlan, FLOOR_DRAW_MODE_ADD_TILE, FloorDrawMode, isNeighborhoodSmallModeAllowed, NEIGHBORHOOD_RADIUS, NeighborhoodFloorPlan } from '../../common/NeighborhoodFloor';
import { createSpiralVector } from '../../common/SpiralUtils';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, WiredElementDefinition } from '../../WiredElement';
import { getWiredBoolean, getWiredInt } from '../../WiredTriggerable';

/** `NumberInputParam(0, -64, 64, 20)` - the root tile inputs. */
export const IN_NEIGHBORHOOD_ROOT_MIN = -64;
export const IN_NEIGHBORHOOD_ROOT_MAX = 64;
export const IN_NEIGHBORHOOD_ROOT_INPUT_WIDTH = 20;

/** `widthModifier` in big mode. */
const BIG_MODE_WIDTH_MODIFIER = 1.7;

export interface InNeighborhoodSelectorForm {
    /** `§_-xw§` - the merged source is users. */
    users: boolean;
    /** `§_-I1r§` - the root tile, relative to the centre. */
    rootX: number;
    rootY: number;
    plan: NeighborhoodFloorPlan;
    /** `_drawMode`. */
    mode: FloorDrawMode;
    /** `_inBigMode`. */
    bigMode: boolean;
    /** `_preferBigMode` - the size the next edit of this box type opens with. */
    preferBigMode: boolean;
}

/** `toggleScreenSize` - the size chosen becomes the one the next edit of this box type opens with. */
export const toggleInNeighborhoodBigMode = (form: InNeighborhoodSelectorForm): InNeighborhoodSelectorForm =>
    ({ ...form, bigMode: !form.bigMode, preferBigMode: !form.bigMode });

/** `widthModifier`. */
export const inNeighborhoodWidthModifier = (form: InNeighborhoodSelectorForm): number => (form.bigMode ? BIG_MODE_WIDTH_MODIFIER : 1);

/** An `InNeighborhood` subclass: only the code differs. */
export const createInNeighborhoodSelector = (code: number): WiredElementDefinition<InNeighborhoodSelectorForm> => ({
    holder: 'selector',
    code,
    createForm: (triggerable, ctx) => {
        const plan = createNeighborhoodFloorPlan(triggerable.intParams.slice(3));
        const preferBigMode = (ctx.elementMemory('selector', code).preferBigMode === true);

        return {
            users: getWiredBoolean(triggerable, 0),
            rootX: getWiredInt(triggerable, 1),
            rootY: getWiredInt(triggerable, 2),
            plan,
            mode: FLOOR_DRAW_MODE_ADD_TILE,
            bigMode: preferBigMode || !isNeighborhoodSmallModeAllowed(plan),
            preferBigMode,
        };
    },
    readIntParams: form => [ form.users ? 1 : 0, form.rootX, form.rootY, ...createSpiralVector(form.plan, NEIGHBORHOOD_RADIUS) ],
    rememberOnEdit: form => ({ preferBigMode: form.preferBigMode }),
    mergedSelections: [ [ 0, 0 ] ],
    mergedSelectionTitle: () => 'wiredfurni.params.sources.merged.title.neighborhood',
    getMergedType: form => (form.users ? WIRED_SOURCE_USER : WIRED_SOURCE_FURNI),
    setMergedType: (form, _, sourceType) => ({ ...form, users: sourceType === WIRED_SOURCE_USER }),
    forceHidePickFurniInstructions: true,
    advancedAlwaysVisible: true,
    widthModifier: inNeighborhoodWidthModifier,
});
