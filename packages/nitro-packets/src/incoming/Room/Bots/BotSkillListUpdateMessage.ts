import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type BotSkillListUpdateMessageType = object;

export class BotSkillListUpdateMessage implements IIncomingPacket<BotSkillListUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotSkillListUpdateMessageType {
        const packet: BotSkillListUpdateMessageType = {
        };

        return packet;
    }
}
