import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniActionDef } from './Data/IWiredFurniActionDef';
import { WiredFurniActionDefParser } from './Data/WiredFurniActionDefParser';

export type WiredFurniActionEventMessageType = {
    def: IWiredFurniActionDef;
};

export class WiredFurniActionEventMessage implements IIncomingPacket<WiredFurniActionEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniActionEventMessageType {
        const def = WiredFurniActionDefParser(wrapper);
        return { def };
    }
}
