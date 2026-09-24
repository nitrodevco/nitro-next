// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { AreaHideMessageDataParser, IAreaHideMessageData } from '../../Data/AreaHideMessageDataParser';

export type AreaHideMessageType = {
    areaHideMessageData: IAreaHideMessageData;
};

export class AreaHideMessage implements IIncomingPacket<AreaHideMessageType> {
    public parse(wrapper: IMessageDataWrapper): AreaHideMessageType {
        return { areaHideMessageData: AreaHideMessageDataParser(wrapper) };
    }
}
