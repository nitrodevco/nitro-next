// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IMessageDataWrapper, ParseArray } from '@nitrodevco/nitro-api';

import { ISharedVariableList } from './ISharedVariableList';
import { SharedVariableParser } from './SharedVariableParser';

/** Flash `_-315.SharedVariableList`. */
export const SharedVariableListParser = (wrapper: IMessageDataWrapper): ISharedVariableList => {
    const sharedVariables = ParseArray(wrapper, SharedVariableParser);

    return { sharedVariables, variables: sharedVariables.map(sharedVariable => sharedVariable.wiredVariable) };
};
