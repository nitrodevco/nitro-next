import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniActionDef } from './IWiredFurniActionDef';
import { WiredFurniActionDefBaseParser } from './WiredFurniActionDefBaseParser';

export const WiredFurniActionDefParser = (wrapper: IMessageDataWrapper): IWiredFurniActionDef => {
    let delayInPulses: number = 0;
    const hooks = {
        readDefinitionSpecifics: (wrapper: IMessageDataWrapper) => {
            delayInPulses = wrapper.readInt();
        },
    };
    const base = WiredFurniActionDefBaseParser(wrapper, hooks);
    return { ...base, delayInPulses };
};
