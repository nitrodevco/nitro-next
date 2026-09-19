import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISharedVariableList } from './ISharedVariableList';
import { SharedVariableParser } from './SharedVariableParser';

export const SharedVariableListParser = (wrapper: IMessageDataWrapper, sharedVariables: unknown[] = [], variables: unknown[] = []): ISharedVariableList => {
    const count = wrapper.readInt();
    for (let i2 = 0; i2 < count; i2++) {
        const sharedVariable = SharedVariableParser(wrapper);
        sharedVariables.push(sharedVariable);
        variables.push(sharedVariable.wiredVariable);
    }
    return {};
};
