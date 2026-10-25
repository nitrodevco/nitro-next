// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CfhSanctionTypeDataParser, ICfhSanctionTypeData } from '../Data/CfhSanctionTypeDataParser';

export type CfhSanctionMessageType = {
    issueId: number;
    accountId: number;
    sanctionType: ICfhSanctionTypeData;
};

export class CfhSanctionMessage implements IIncomingPacket<CfhSanctionMessageType> {
    public parse(wrapper: IMessageDataWrapper): CfhSanctionMessageType {
        const issueId = wrapper.readInt();
        const accountId = wrapper.readInt();
        const sanctionType = CfhSanctionTypeDataParser(wrapper);

        return { issueId, accountId, sanctionType };
    }
}
