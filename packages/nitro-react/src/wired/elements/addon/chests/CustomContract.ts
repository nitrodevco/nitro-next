/**
 * `addons/chests/§_-72L§` (CUSTOM_CONTRACT) - adds a custom payment and / or reward to the
 * stack's contract: each one enabled by its checkbox, of an element type (`element_type_selection`
 * 0 or `TradeRequirementNode.TYPE_FURNI` 1 - the furni come from furni source 0 for the payment
 * and 1 for the reward) and an amount, typed (1 to 100000) or a variable (merged input sources 0
 * and 1).
 *
 * Int params: `[ payment on, payment type, payment option, payment value, payment target,
 * reward on, reward type, reward option, reward value, reward target ]`. Variable ids:
 * `[ payment variable, reward variable ]`. A part that is off, or given as a typed value, opens
 * on no variable; one that is off, or given as a variable, on the value 1.
 */
import { setPickerTarget } from '../../../common/WiredVariablePickerModel';
import { createValueOrVariableState, isValueOrVariableSourcePickingDisabled, VALUE_OR_VARIABLE_OPTION_VALUE, type WiredValueOrVariableState } from '../../../common/WiredVariableSections';
import { WIRED_SOURCE_FURNI, WIRED_SOURCE_MERGED, type WiredElementContext, type WiredElementDefinition } from '../../../WiredElement';
import { getWiredBoolean, getWiredInt, getWiredRoomVariables, type WiredTriggerable } from '../../../WiredTriggerable';
import { resolveVariableReferenceTarget, VARIABLE_REFERENCE_CUSTOM_SOURCES, WIRED_VARIABLE_ID_NONE } from '../../action/ActionVariableReference';
import { AddonCodes } from '../addonCodes';

/** `TradeRequirementNode.TYPE_FURNI` - the element type whose items are picked as furni. */
export const CUSTOM_CONTRACT_TYPE_FURNI = 1;
/** `createValueOrVariableSection(n, ..., 1, 100000)`'s range. */
export const CUSTOM_CONTRACT_AMOUNT_MIN = 1;
export const CUSTOM_CONTRACT_AMOUNT_MAX = 100000;

/** One side of the contract: `§_-Z27§` / `§_-K29§` / `§_-t1h§` for the payment, `§_-mA§` / `§_-rP§` / `§_-us§` for the reward. */
export interface CustomContractPart {
    enabled: boolean;
    /** The element type radio. */
    type: number;
    amount: WiredValueOrVariableState;
}

export interface CustomContractAddonForm {
    payment: CustomContractPart;
    reward: CustomContractPart;
}

/** `onEditStart` for the part whose params start at `offset` and whose variable is `variableIds[variableIndex]`. */
const readPart = (triggerable: WiredTriggerable, ctx: WiredElementContext, offset: number, variableIndex: number): CustomContractPart => {
    const enabled = getWiredBoolean(triggerable, offset);
    const option = getWiredInt(triggerable, offset + 2);
    const typed = !enabled || (option === VALUE_OR_VARIABLE_OPTION_VALUE);
    const byVariable = !enabled || (option !== VALUE_OR_VARIABLE_OPTION_VALUE);
    const variableId = typed ? WIRED_VARIABLE_ID_NONE : (triggerable.variableIds[variableIndex] ?? '');
    const value = byVariable ? 1 : getWiredInt(triggerable, offset + 3);
    const target = resolveVariableReferenceTarget(ctx, getWiredInt(triggerable, offset + 4));

    return {
        enabled,
        type: getWiredInt(triggerable, offset + 1),
        amount: createValueOrVariableState(getWiredRoomVariables(triggerable), variableId, target, option, value),
    };
};

const writePart = (part: CustomContractPart): number[] =>
    [ part.enabled ? 1 : 0, part.type, part.amount.option, part.amount.value, part.amount.picker.target ];

const partOf = (form: CustomContractAddonForm, id: number): CustomContractPart => ((id === 0) ? form.payment : form.reward);

const withPart = (form: CustomContractAddonForm, id: number, part: CustomContractPart): CustomContractAddonForm =>
    ((id === 0) ? { ...form, payment: part } : { ...form, reward: part });

export const customContractAddon: WiredElementDefinition<CustomContractAddonForm> = {
    holder: 'addon',
    code: AddonCodes.CUSTOM_CONTRACT,
    createForm: (triggerable, ctx) => ({
        payment: readPart(triggerable, ctx, 0, 0),
        reward: readPart(triggerable, ctx, 5, 1),
    }),
    readIntParams: form => [ ...writePart(form.payment), ...writePart(form.reward) ],
    readVariableIds: form => [ form.payment.amount.picker.variableId, form.reward.amount.picker.variableId ],
    widthModifier: 1.2,
    isInputSourceDisabled: (form, id, sourceType) => {
        if ((id !== 0) && (id !== 1)) return false;

        const part = partOf(form, id);

        if (sourceType === WIRED_SOURCE_MERGED) return !part.enabled || isValueOrVariableSourcePickingDisabled(part.amount);
        if (sourceType === WIRED_SOURCE_FURNI) return !part.enabled || (part.type !== CUSTOM_CONTRACT_TYPE_FURNI);

        return false;
    },
    mergedSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.merged.title.variables_reference_payment' : 'wiredfurni.params.sources.merged.title.variables_reference_reward'),
    furniSelectionTitle: id => ((id === 0) ? 'wiredfurni.params.sources.furni.title.payment' : 'wiredfurni.params.sources.furni.title.reward'),
    mergedSelections: [ [ 2, 0 ], [ 3, 1 ] ],
    getMergedType: (form, id) => partOf(form, id).amount.picker.target,
    setMergedType: (form, id, sourceType) => {
        const part = partOf(form, (id === 0) ? 0 : 1);

        return withPart(form, (id === 0) ? 0 : 1, { ...part, amount: { ...part.amount, picker: setPickerTarget(part.amount.picker, sourceType) } });
    },
    forceHidePickFurniInstructions: true,
    getCustomSourcesForMergedType: () => VARIABLE_REFERENCE_CUSTOM_SOURCES,
    hasCustomTypePicker: () => true,
};
