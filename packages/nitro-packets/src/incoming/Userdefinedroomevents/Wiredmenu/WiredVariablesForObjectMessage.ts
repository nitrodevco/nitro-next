import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IWiredObjectInspectionData } from './Data/IWiredObjectInspectionData';
import { WiredObjectInspectionDataParser } from './Data/WiredObjectInspectionDataParser';

export type WiredVariablesForObjectMessageType = {
    data: IWiredObjectInspectionData;
};

export class WiredVariablesForObjectMessage implements IIncomingPacket<WiredVariablesForObjectMessageType> {
    public parse(wrapper: IMessageDataWrapper): WiredVariablesForObjectMessageType {
        const data = WiredObjectInspectionDataParser(wrapper);
        return { data };
    }
}
