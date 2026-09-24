// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildCreatedMessageType = {
    /** The room the new group took as its base - Flash walks to it when it is not the room being visited. */
    baseRoomId: number;
    groupId: number;
};

/** The answer to `CreateGuildComposer` - `HabboGroupsManager.onGuildCreated`. */
export class GuildCreatedMessage implements IIncomingPacket<GuildCreatedMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildCreatedMessageType {
        return {
            baseRoomId: wrapper.readInt(),
            groupId: wrapper.readInt(),
        };
    }
}
