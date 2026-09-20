/**
 * Code -> element, per holder - the six `§_-L1T§` holders of `UserDefinedRoomEventsCtrl`
 * (`TriggerConfs`, `ActionTypes`, `ConditionTypes`, `AddonTypes`, `SelectorTypes`,
 * `VariableTypes`) and their `getElementByCode`, which answers to an element's `code` and to its
 * `negativeCode`, first match in registration order.
 *
 * This file and the six registration files it imports are the only modules under `src/wired`
 * that reach views, so `scripts/generate-barrels.ts` keeps them out of the `#base/wired` barrel
 * (the views import that barrel back): import this module by path, `#base/wired/WiredElementRegistry`.
 */
import { actionElements } from './elements/action/actionElements';
import { addonElements } from './elements/addon/addonElements';
import { conditionElements } from './elements/condition/conditionElements';
import { selectorElements } from './elements/selector/selectorElements';
import { triggerElements } from './elements/trigger/triggerElements';
import { variableElements } from './elements/variable/variableElements';
import type { WiredElementEntry, WiredHolderKey } from './WiredElement';

/** Every holder key, in the order Flash's `resolveHolderFor` tests the definition classes. */
export const WIRED_HOLDER_KEYS: WiredHolderKey[] = [ 'trigger', 'action', 'condition', 'addon', 'selector', 'variable' ];

/** `resolveHolderFor(triggerable).types` - the elements registered for a holder. */
export const getWiredElements = (holder: WiredHolderKey): WiredElementEntry[] => {
    switch (holder) {
        case 'trigger': return triggerElements;
        case 'action': return actionElements;
        case 'condition': return conditionElements;
        case 'addon': return addonElements;
        case 'selector': return selectorElements;
        case 'variable': return variableElements;
    }
};

/** `§_-L1T§.getElementByCode` - `undefined` when no element serves the code, and then nothing opens. */
export const getWiredElementByCode = (holder: WiredHolderKey, code: number): WiredElementEntry | undefined =>
    getWiredElements(holder).find(({ definition }) => (definition.code === code) || (definition.negativeCode === code));
