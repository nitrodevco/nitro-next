import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISelectorDefinition } from './ISelectorDefinition';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const SelectorDefinitionParser = (wrapper: IMessageDataWrapper): ISelectorDefinition => {
    let isFilter: boolean = false;
    let isInvert: boolean = false;
    const hooks = {
        readDefinitionSpecifics: (wrapper: IMessageDataWrapper) => {
            isFilter = wrapper.readBoolean();
            isInvert = wrapper.readBoolean();
        },
    };
    const base = WiredFurniActionDefBaseParser(wrapper, hooks);
    return { ...base, isFilter, isInvert };
};
