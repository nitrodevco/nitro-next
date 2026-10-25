// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type GuildMemberFurniCountInHQMessageType = {
    userId: number;
    /** How much of the user's furniture stands in the group's base room - named in the kick confirmation. */
    furniCount: number;
};

/** The answer to `GetMemberGuildItemCountComposer` - `HabboGroupsManager.onKickConfirmation` asks before kicking. */
export class GuildMemberFurniCountInHQMessage implements IIncomingPacket<GuildMemberFurniCountInHQMessageType> {
    public parse(wrapper: IMessageDataWrapper): GuildMemberFurniCountInHQMessageType {
        return {
            userId: wrapper.readInt(),
            furniCount: wrapper.readInt(),
        };
    }
}
