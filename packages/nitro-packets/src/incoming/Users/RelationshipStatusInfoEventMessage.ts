// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRelationshipStatusInfo, RelationshipStatusInfoParser } from '../Data/RelationshipStatusInfoParser';

export type RelationshipStatusInfoEventMessageType = {
    userId: number;
    relationships: IRelationshipStatusInfo[];
};

export class RelationshipStatusInfoEventMessage implements IIncomingPacket<RelationshipStatusInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RelationshipStatusInfoEventMessageType {
        const userId = wrapper.readInt();
        const relationships: IRelationshipStatusInfo[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            relationships.push(RelationshipStatusInfoParser(wrapper));

            count--;
        }

        return { userId, relationships };
    }
}
