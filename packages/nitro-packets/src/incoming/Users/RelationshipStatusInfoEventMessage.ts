import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RelationshipStatusInfoEventMessageType = object;

export class RelationshipStatusInfoEventMessage implements IIncomingPacket<RelationshipStatusInfoEventMessageType> {
    public parse(wrapper: IMessageDataWrapper): RelationshipStatusInfoEventMessageType {
        const packet: RelationshipStatusInfoEventMessageType = {
        };

        return packet;
    }
}
