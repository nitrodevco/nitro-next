import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { ISelectorDefinition } from './Data/ISelectorDefinition';
import { SelectorDefinitionParser } from './Data/SelectorDefinitionParser';

export type WiredFurniSelectorEventMessageType = {
    def: ISelectorDefinition;
};

export class WiredFurniSelectorEventMessage implements IIncomingPacket<WiredFurniSelectorEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniSelectorEventMessageType {
        const def = SelectorDefinitionParser(wrapper);
        return { def };
    }
}
