import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AreaHideMessageDataParser, IAreaHideMessageData } from '../../Data/AreaHideMessageDataParser';

export type AreaHideMessageType = {
    areaHideMessageData: IAreaHideMessageData;
};

export class AreaHideMessage implements IIncomingPacket<AreaHideMessageType> {
    public parse(wrapper: IMessageDataWrapper): AreaHideMessageType {
        const packet: AreaHideMessageType = {
            areaHideMessageData: {} as any,
        };

        packet.areaHideMessageData = AreaHideMessageDataParser(wrapper);

        return packet;
    }
}
