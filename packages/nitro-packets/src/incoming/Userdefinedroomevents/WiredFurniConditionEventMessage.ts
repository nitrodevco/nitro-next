import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniConditionDef } from './Data/IWiredFurniConditionDef';
import { WiredFurniConditionDefParser } from './Data/WiredFurniConditionDefParser';

export type WiredFurniConditionEventMessageType = {
    def: IWiredFurniConditionDef;
};

export class WiredFurniConditionEventMessage implements IIncomingPacket<WiredFurniConditionEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniConditionEventMessageType {
        const def = WiredFurniConditionDefParser(wrapper);
        return { def };
    }
}
