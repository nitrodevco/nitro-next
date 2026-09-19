import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniVariableDef } from './Data/IWiredFurniVariableDef';
import { WiredFurniVariableDefParser } from './Data/WiredFurniVariableDefParser';

export type WiredFurniVariableEventMessageType = {
    def: IWiredFurniVariableDef;
};

export class WiredFurniVariableEventMessage implements IIncomingPacket<WiredFurniVariableEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniVariableEventMessageType {
        const def = WiredFurniVariableDefParser(wrapper);
        return { def };
    }
}
