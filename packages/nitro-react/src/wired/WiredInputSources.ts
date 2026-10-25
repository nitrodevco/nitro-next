/**
 * `inputsources/WiredInputSourcePicker` and the element defaults around it
 * (`DefaultElement.mergedSourceOptions`), as pure functions of the box being edited: which
 * source an input source section shows, what stepping it left or right selects, and what
 * switching a merged section between furni and users does to the triggerable.
 *
 * Flash's picker mutates the triggerable's source type arrays and caches what was selected under
 * each merged type; here each function returns the patch, and the cache is a plain record the
 * wired store keeps per merged section (`WiredSetupSession.mergedSelectionCache`).
 */
import { VariableExtraSourceTypes } from '@nitrodevco/nitro-packets';

import { WIRED_SOURCE_FURNI, WIRED_SOURCE_USER, type WiredElementContext, type WiredElementDefinition } from './WiredElement';
import { amountFurniSelections, amountUserSelections, FURNI_SOURCE_FURNI_PICKS_1, FURNI_SOURCE_FURNI_PICKS_1_ALT, FURNI_SOURCE_FURNI_PICKS_2, isDualFurniPickingMode, isFurniSelectionDefault, WIRED_QUANTIFIER_NONE, type WiredTriggerable } from './WiredTriggerable';

/** `WiredInputSourcePicker.STUFF_PICKING_MODE_*` - which pick list a furni source stands for, in dual picking mode. */
export const WIRED_STUFF_PICKING_MODE_NONE = 0;
export const WIRED_STUFF_PICKING_MODE_1 = 1;
export const WIRED_STUFF_PICKING_MODE_2 = 2;

/** What the picker needs to know about the edit in progress. */
export interface WiredInputSourcesEdit {
    triggerable: WiredTriggerable;
    definition: WiredElementDefinition<unknown>;
    form: unknown;
    stuffIds1: number[];
    stuffIds2: number[];
}

/** `InputSourceSection.updateUI`'s inputs, as `refreshContainer` computes them. */
export interface WiredInputSourceState {
    /** `selectedText` - the source's name, with the `[picked/limit]` suffix where Flash shows one. */
    text: string;
    /** `isButtonsDisabled` - a merged section on a custom source type has nothing to step through. */
    buttonsDisabled: boolean;
    /** `stuffPickingSpecialMode` - which of the two "furni picks" buttons the section's header shows. */
    stuffPickingSpecialMode: number;
    /** `disabled` - `isInputSourceDisabled(id, baseSourceType)`. */
    disabled: boolean;
}

/** `WiredInputSourcePicker.getTypeNameForSource`. */
export const getTypeNameForSource = (sourceType: number): string => {
    switch (sourceType) {
        case WIRED_SOURCE_FURNI: return 'furni';
        case WIRED_SOURCE_USER: return 'users';
        case Number(VariableExtraSourceTypes.CONTEXT_SOURCE): return 'context';
        case Number(VariableExtraSourceTypes.GLOBAL_SOURCE): return 'global';
    }

    return '';
};

/** `createAdvancedSections`' first test: a condition that carries a quantifier. */
export const hasWiredQuantifier = (triggerable: WiredTriggerable): boolean =>
    (triggerable.holder === 'condition') && (triggerable.quantifierType !== WIRED_QUANTIFIER_NONE);

/** `createAdvancedSections` - the advanced settings exist in advanced mode, and only with a selection or a quantifier to show. */
export const hasWiredAdvancedSettings = (triggerable: WiredTriggerable): boolean =>
    triggerable.advancedMode
    && ((amountFurniSelections(triggerable.inputSourcesConf) > 0) || (amountUserSelections(triggerable.inputSourcesConf) > 0) || hasWiredQuantifier(triggerable));

/** `forceFurniSelection`, which defaults to `hasStateSnapshot`. */
export const forcesFurniSelection = (definition: WiredElementDefinition<unknown>, form: unknown): boolean =>
    definition.forceFurniSelection ? definition.forceFurniSelection(form) : (definition.hasStateSnapshot ?? false);

/** `UserDefinedRoomEventsCtrl.hidePickFurniInstructions`. */
export const hidesPickFurniInstructions = ({ triggerable, definition, form }: WiredInputSourcesEdit): boolean => {
    if (definition.forceHidePickFurniInstructions) return true;

    return !isFurniSelectionDefault(triggerable.inputSourcesConf) && !forcesFurniSelection(definition, form);
};

/** `DefaultElement.getMergedType`. */
export const getMergedType = (definition: WiredElementDefinition<unknown>, form: unknown, id: number): number => definition.getMergedType?.(form, id) ?? 0;

/**
 * `DefaultElement.mergedSourceOptions` - furni and users, then the element's custom sources. The
 * context source is only offered while `wired.variables.context_visible` is on, unless the box
 * is already set to it.
 */
export const getMergedSourceOptions = (definition: WiredElementDefinition<unknown>, form: unknown, id: number, ctx: WiredElementContext): number[] => {
    const options = [ WIRED_SOURCE_FURNI, WIRED_SOURCE_USER ];

    for (const sourceType of definition.getCustomSourcesForMergedType?.(id) ?? []) {
        const hidden = !ctx.configBoolean('wired.variables.context_visible')
            && (sourceType === Number(VariableExtraSourceTypes.CONTEXT_SOURCE))
            && (getMergedType(definition, form, id) !== Number(VariableExtraSourceTypes.CONTEXT_SOURCE));

        if (!hidden) options.push(sourceType);
    }

    return options;
};

/**
 * Which slot of `furniSourceTypes` / `userSourceTypes` a section edits: itself for a furni or
 * user section, and for a merged one the half its merged type points at - `undefined` on a
 * custom source type, which has no slot.
 */
const resolveSlot = ({ definition, form }: WiredInputSourcesEdit, baseSourceType: number, id: number): { kind: 'furni' | 'users'; index: number } | undefined => {
    if (baseSourceType === WIRED_SOURCE_FURNI) return { kind: 'furni', index: id };
    if (baseSourceType === WIRED_SOURCE_USER) return { kind: 'users', index: id };

    const [ furniSelection, userSelection ] = definition.mergedSelections?.[id] ?? [ 0, 0 ];
    const mergedType = getMergedType(definition, form, id);

    if (mergedType === WIRED_SOURCE_FURNI) return { kind: 'furni', index: furniSelection };
    if (mergedType === WIRED_SOURCE_USER) return { kind: 'users', index: userSelection };

    return undefined;
};

/**
 * A slot's source as Flash reads it: `int(furniSourceTypes[index])`, and AS3's `int(undefined)` is
 * 0. The server may send fewer sources than a box has sections - a variable reference points at
 * a second furni or user slot - and Flash then shows and steps from source 0.
 */
const readSource = (triggerable: WiredTriggerable, kind: 'furni' | 'users', index: number): number =>
    (((kind === 'furni') ? triggerable.furniSourceTypes[index] : triggerable.userSourceTypes[index]) ?? 0);

/** `WiredInputSourcePicker.refreshContainer`. */
export const getInputSourceState = (edit: WiredInputSourcesEdit, baseSourceType: number, id: number, localize: (key: string) => string): WiredInputSourceState => {
    const { triggerable, definition, form } = edit;
    const slot = resolveSlot(edit, baseSourceType, id);

    let text: string;
    let stuffPickingSpecialMode = WIRED_STUFF_PICKING_MODE_NONE;

    if (!slot) {
        text = localize(`wiredfurni.params.sources.${getTypeNameForSource(getMergedType(definition, form, id))}`);
    } else {
        const source = readSource(triggerable, slot.kind, slot.index);

        text = localize(`wiredfurni.params.sources.${slot.kind}.${source}`);

        if (slot.kind === 'furni') {
            const dualPicking = isDualFurniPickingMode(triggerable.inputSourcesConf);

            let picked: number[] | undefined;
            let pickingMode = WIRED_STUFF_PICKING_MODE_NONE;

            if ((source === FURNI_SOURCE_FURNI_PICKS_1) || (source === FURNI_SOURCE_FURNI_PICKS_1_ALT)) {
                picked = edit.stuffIds1;
                pickingMode = WIRED_STUFF_PICKING_MODE_1;
            } else if (source === FURNI_SOURCE_FURNI_PICKS_2) {
                picked = edit.stuffIds2;
                pickingMode = WIRED_STUFF_PICKING_MODE_2;
            }

            if (dualPicking) stuffPickingSpecialMode = pickingMode;

            if ((dualPicking || hidesPickFurniInstructions(edit)) && picked) text += ` [${picked.length}/${triggerable.furniLimit}]`;
        }
    }

    return {
        text,
        buttonsDisabled: !slot,
        stuffPickingSpecialMode,
        disabled: definition.isInputSourceDisabled?.(form, id, baseSourceType) ?? false,
    };
};

/** Sets one slot; slots below it that the server never sent are 0, the `int(undefined)` Flash sends for them. */
const withSource = (triggerable: WiredTriggerable, kind: 'furni' | 'users', index: number, source: number): Partial<WiredTriggerable> => {
    const current = (kind === 'furni') ? triggerable.furniSourceTypes : triggerable.userSourceTypes;
    const sources = Array.from({ length: Math.max(current.length, index + 1) }, (_, slot) => current[slot] ?? 0);

    sources[index] = source;

    return (kind === 'furni') ? { furniSourceTypes: sources } : { userSourceTypes: sources };
};

/**
 * `WiredInputSourcePicker.onChangeInputSource` - the next (or previous) allowed source of the
 * section, wrapping around; a source that is not among the allowed ones starts over at the
 * first. `undefined` when the section has nothing to step through.
 */
export const stepInputSource = (edit: WiredInputSourcesEdit, baseSourceType: number, id: number, forward: boolean): Partial<WiredTriggerable> | undefined => {
    const { triggerable } = edit;
    const slot = resolveSlot(edit, baseSourceType, id);

    if (!slot) return undefined;

    const conf = triggerable.inputSourcesConf;
    const allowed = (slot.kind === 'furni') ? conf.allowedFurniSources[slot.index] : conf.allowedUserSources[slot.index];
    const current = readSource(triggerable, slot.kind, slot.index);

    // No allowed sources for this slot: Flash's `indexOf` on a missing list throws, and nothing changes.
    if (!allowed?.length) return undefined;

    let index = allowed.indexOf(current);

    if (index === -1) index = 0;
    else if (forward) index = (index + 1) % allowed.length;
    else index = ((index - 1) + allowed.length) % allowed.length;

    return withSource(triggerable, slot.kind, slot.index, allowed[index]);
};

/**
 * `WiredInputSourcePicker.sourceType` (the setter) - a merged section switched to another source
 * type. The source selected under the type being left is remembered, and the type being entered
 * gets back what it had, or its first allowed source. Returns the new form, the triggerable
 * patch and the section's updated cache.
 */
export const switchMergedSourceType = (edit: WiredInputSourcesEdit, id: number, sourceType: number, cache: Record<number, number>): { form: unknown; triggerable: Partial<WiredTriggerable>; cache: Record<number, number> } => {
    const { triggerable, definition, form } = edit;
    const previousType = getMergedType(definition, form, id);
    const [ furniSelection, userSelection ] = definition.mergedSelections?.[id] ?? [ 0, 0 ];
    const nextCache = { ...cache };

    if (previousType === WIRED_SOURCE_FURNI) nextCache[previousType] = readSource(triggerable, 'furni', furniSelection);
    else if (previousType === WIRED_SOURCE_USER) nextCache[previousType] = readSource(triggerable, 'users', userSelection);

    const conf = triggerable.inputSourcesConf;

    let patch: Partial<WiredTriggerable> = {};

    if (sourceType === WIRED_SOURCE_FURNI) patch = withSource(triggerable, 'furni', furniSelection, nextCache[sourceType] ?? conf.allowedFurniSources[furniSelection]?.[0] ?? 0);
    else if (sourceType === WIRED_SOURCE_USER) patch = withSource(triggerable, 'users', userSelection, nextCache[sourceType] ?? conf.allowedUserSources[userSelection]?.[0] ?? 0);

    return {
        form: definition.setMergedType ? definition.setMergedType(form, id, sourceType) : form,
        triggerable: patch,
        cache: nextCache,
    };
};
