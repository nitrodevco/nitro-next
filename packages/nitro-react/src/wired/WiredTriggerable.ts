/**
 * The box being edited - Flash's `Triggerable` and its six subclasses (`TriggerDefinition`,
 * `ActionDefinition`, `ConditionDefinition`, `AddonDefinition`, `SelectorDefinition`,
 * `VariableDefinition`) folded into one shape, plus the behaviour Flash kept on those classes
 * and on `InputSourcesConf` (the packets carry only the data).
 *
 * Flash mutates the triggerable while the dialog is open (input source arrows, paste, reset);
 * here it is replaced by copy in the wired store, so everything below is a pure function.
 */
import type { IAllVariablesInRoom, IInputSourcesConf, IWiredContext, IWiredFurniActionDefBase, IWiredVariable } from '@nitrodevco/nitro-packets';

import type { WiredHolderKey } from './WiredElement';

/** `InputSourcesConf.FURNI_SOURCE_FURNI_PICKS_1` - the furni picked in the room. */
export const FURNI_SOURCE_FURNI_PICKS_1 = 100;
/** `InputSourcesConf.FURNI_SOURCE_FURNI_PICKS_2` - the second pick list of a dual picking box. */
export const FURNI_SOURCE_FURNI_PICKS_2 = 101;
/** `InputSourcesConf.§_-ux§` - the first pick list under its other source id. */
export const FURNI_SOURCE_FURNI_PICKS_1_ALT = 110;

/** `§_-S1q§` - what a condition's quantifier counts; `None` means the condition has no quantifier. */
export const WIRED_QUANTIFIER_NONE = 0;
export const WIRED_QUANTIFIER_FURNI = 1;
export const WIRED_QUANTIFIER_USERS = 2;
export const WIRED_QUANTIFIER_VARIABLES = 3;

/**
 * `AllVariablesInRoom` - the packet carries only the room's variables hash; the list itself is
 * filled in by `synchronize` from the variables synchronizer before the dialog opens
 * (`UserDefinedRoomEventsCtrl.synchronizeTriggerable`). `variables` is `undefined` exactly while
 * Flash's `needsSynchronize` is true, which a box being edited never is.
 */
export interface WiredAllVariablesInRoom extends IAllVariablesInRoom {
    variables?: IWiredVariable[];
}

/** `WiredContext`, with the room variables list in its synchronized form. */
export interface WiredContext extends Omit<IWiredContext, 'roomVariablesList'> {
    roomVariablesList?: WiredAllVariablesInRoom;
}

export interface WiredTriggerable extends Omit<IWiredFurniActionDefBase, 'wiredContext'> {
    wiredContext: WiredContext;
    holder: WiredHolderKey;
    /** `ActionDefinition.delayInPulses`; 0 for every other holder. */
    delayInPulses: number;
    /** `ConditionDefinition.quantifierCode`; 0 for every other holder. */
    quantifierCode: number;
    /** `ConditionDefinition.quantifierType`; `WIRED_QUANTIFIER_NONE` for every other holder. */
    quantifierType: number;
    /** `ConditionDefinition.isInvert` - the condition is served by its element's `negativeCode`. */
    conditionInvert: boolean;
    /** `SelectorDefinition.isFilter`. */
    isFilter: boolean;
    /** `SelectorDefinition.isInvert`. */
    isInvert: boolean;
}

/** `wiredContext.roomVariablesList.variables` - every variable in the room, sorted; empty for a box whose context has no such list. */
export const getWiredRoomVariables = (triggerable: WiredTriggerable): IWiredVariable[] => triggerable.wiredContext.roomVariablesList?.variables ?? [];

/** `Triggerable.getInt`. */
export const getWiredInt = (triggerable: WiredTriggerable, index: number): number => triggerable.intParams[index] ?? 0;

/** `Triggerable.getBoolean`. */
export const getWiredBoolean = (triggerable: WiredTriggerable, index: number): boolean => triggerable.intParams[index] === 1;

/** `Triggerable.getString` - the whole string param, or one part of it split on `separator`. */
export const getWiredString = (triggerable: WiredTriggerable, index: number = -1, separator: string = '\t'): string => {
    if (index === -1) return triggerable.stringParam;

    const parts = triggerable.stringParam.split(separator);

    return (parts.length > index) ? parts[index] : '';
};

/** `InputSourcesConf.amountFurniSelections`. */
export const amountFurniSelections = (conf: IInputSourcesConf): number => conf.allowedFurniSources.length;

/** `InputSourcesConf.amountUserSelections`. */
export const amountUserSelections = (conf: IInputSourcesConf): number => conf.allowedUserSources.length;

const allowsAnyFurniSource = (conf: IInputSourcesConf, sources: number[]): boolean =>
    conf.allowedFurniSources.some(allowed => sources.some(source => allowed.includes(source)));

/** `InputSourcesConf.allowFurniSelection`. */
export const allowFurniSelection = (conf: IInputSourcesConf): boolean =>
    allowsAnyFurniSource(conf, [ FURNI_SOURCE_FURNI_PICKS_1, FURNI_SOURCE_FURNI_PICKS_2, FURNI_SOURCE_FURNI_PICKS_1_ALT ]);

/** `InputSourcesConf.isDualFurniPickingMode`. */
export const isDualFurniPickingMode = (conf: IInputSourcesConf): boolean =>
    allowsAnyFurniSource(conf, [ FURNI_SOURCE_FURNI_PICKS_1, FURNI_SOURCE_FURNI_PICKS_1_ALT ]) && allowsAnyFurniSource(conf, [ FURNI_SOURCE_FURNI_PICKS_2 ]);

/** `InputSourcesConf.isFurniSelectionDefault`. */
export const isFurniSelectionDefault = (conf: IInputSourcesConf): boolean =>
    conf.defaultFurniSources.includes(FURNI_SOURCE_FURNI_PICKS_1) || conf.defaultFurniSources.includes(FURNI_SOURCE_FURNI_PICKS_2);

/** `Triggerable.usingCustomInputSources`, with `ConditionDefinition`'s override folded in. */
export const usingCustomInputSources = (triggerable: WiredTriggerable): boolean => {
    const conf = triggerable.inputSourcesConf;

    if (conf.defaultFurniSources.some((source, index) => source !== triggerable.furniSourceTypes[index])) return true;
    if (conf.defaultUserSources.some((source, index) => source !== triggerable.userSourceTypes[index])) return true;

    return triggerable.quantifierCode !== 0;
};
