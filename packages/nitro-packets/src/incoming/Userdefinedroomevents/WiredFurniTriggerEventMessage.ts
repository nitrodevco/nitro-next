import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniTriggerDef } from './Data/IWiredFurniTriggerDef';
import { WiredFurniTriggerDefParser } from './Data/WiredFurniTriggerDefParser';

export type WiredFurniTriggerEventMessageType = {
    def: IWiredFurniTriggerDef;
};

export class WiredFurniTriggerEventMessage implements IIncomingPacket<WiredFurniTriggerEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniTriggerEventMessageType {
        const def = WiredFurniTriggerDefParser(wrapper);
        return { def };
    }
}
