import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { CfhSanctionTypeDataParser, ICfhSanctionTypeData } from '../Data/CfhSanctionTypeDataParser';

export type CfhSanctionMessageType = {
    issueId: number;
    accountId: number;
    sanctionType: ICfhSanctionTypeData;
};

export class CfhSanctionMessage implements IIncomingPacket<CfhSanctionMessageType> {
    public parse(wrapper: IMessageDataWrapper): CfhSanctionMessageType {
        const packet: CfhSanctionMessageType = {
            issueId: 0,
            accountId: 0,
            sanctionType: {} as any,
        };

        packet.issueId = wrapper.readInt();
        packet.accountId = wrapper.readInt();
        packet.sanctionType = CfhSanctionTypeDataParser(wrapper);

        return packet;
    }
}
