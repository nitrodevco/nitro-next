// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

/** One skill a rentable bot has, with whatever its command carries (a link's label and target, a NUX step). */
export interface IBotSkillWithCommand {
    id: number;
    data: string;
}

export type BotSkillListUpdateMessageType = {
    botId: number;
    skillList: IBotSkillWithCommand[];
};

export class BotSkillListUpdateMessage implements IIncomingPacket<BotSkillListUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): BotSkillListUpdateMessageType {
        const botId = wrapper.readInt();
        const skillList: IBotSkillWithCommand[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            skillList.push({ id: wrapper.readInt(), data: wrapper.readString() });

            count--;
        }

        return { botId, skillList };
    }
}
