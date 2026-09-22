// Body filled by hand from D:\Habbo\packet-tool\out - the generator has no preserve step, so re-apply after a regeneration.
import { IIncomingPacket, IMessageDataWrapper, ParseArray, ParseInts } from '@nitrodevco/nitro-api';

/** A habbicon the user holds - Flash `§_-y1e§.§_-tK§`. */
export interface IUserHabbicon {
    habbiconId: number;
    /** A `HabbiconState`: 1 claimable, 2 owned, 3 favourite. */
    habbiconState: number;
}

export type UserHabbiconsMessageType = {
    habbicons: IUserHabbicon[];
    recentHabbiconIds: number[];
};

/** Flash `UserHabbiconsMessageParser`, each habbicon read by `§_-9a§.§_-yL§`. */
export class UserHabbiconsMessage implements IIncomingPacket<UserHabbiconsMessageType> {
    public parse(wrapper: IMessageDataWrapper): UserHabbiconsMessageType {
        const habbicons = ParseArray(wrapper, (wrapper): IUserHabbicon => {
            const habbiconId = wrapper.readInt();
            const habbiconState = wrapper.readInt();

            return { habbiconId, habbiconState };
        });
        const recentHabbiconIds = ParseInts(wrapper);

        return { habbicons, recentHabbiconIds };
    }
}
