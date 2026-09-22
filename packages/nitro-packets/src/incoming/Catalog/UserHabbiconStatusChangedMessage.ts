// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type UserHabbiconStatusChangedMessageType = {
    habbiconId: number;
    habbiconState: number;
};

/** Flash `§_-9a§.§_-ie§`: one of the user's habbicons changed state. */
export class UserHabbiconStatusChangedMessage implements IIncomingPacket<UserHabbiconStatusChangedMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserHabbiconStatusChangedMessageType {
        const habbiconId = wrapper.readInt();
        const habbiconState = wrapper.readInt();

        return { habbiconId, habbiconState };
    }
}
