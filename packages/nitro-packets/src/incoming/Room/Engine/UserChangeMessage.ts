// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserChangeMessageType = {
    objectId: number;
    figure: string;
    gender: string;
    customInfo: string;
    achievementScore: number;
    badgesRank: number;
};

/**
 * Flash `UserChangeMessageParser`. Between the score and the badges rank the server sends a
 * string and a list of int triples that the client reads and throws away; they have to be
 * consumed all the same, or the rank is read from the middle of the list.
 */
export class UserChangeMessage implements IIncomingPacket<UserChangeMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserChangeMessageType {
        const objectId = wrapper.readInt();
        const figure = wrapper.readString();
        const gender = wrapper.readString().toUpperCase();
        const customInfo = wrapper.readString();
        const achievementScore = wrapper.readInt();

        wrapper.readString();

        let count = wrapper.readInt();

        while (count > 0) {
            wrapper.readInt();
            wrapper.readInt();
            wrapper.readInt();

            count--;
        }

        return { objectId, figure, gender, customInfo, achievementScore, badgesRank: wrapper.readInt() };
    }
}
