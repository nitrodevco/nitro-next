import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredFurniAddonDef } from './Data/IWiredFurniAddonDef';
import { WiredFurniAddonDefParser } from './Data/WiredFurniAddonDefParser';

export type WiredFurniAddonEventMessageType = {
    def: IWiredFurniAddonDef;
};

export class WiredFurniAddonEventMessage implements IIncomingPacket<WiredFurniAddonEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredFurniAddonEventMessageType {
        const def = WiredFurniAddonDefParser(wrapper);
        return { def };
    }
}
