// From the AS3 `RewardTracksMessageParser`: the disabled flag, the tracks, then the reload flag.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { IRewardTrackData, RewardTrackDataParser } from '../Data/RewardTrackDataParser';

export type RewardTracksMessageType = {
    disabled: boolean;
    tracks: IRewardTrackData[];
    reload: boolean;
};

export class RewardTracksMessage implements IIncomingPacket<RewardTracksMessageType> {
    public parse(wrapper: IMessageDataWrapper): RewardTracksMessageType {
        const disabled = wrapper.readBoolean();
        const tracks: IRewardTrackData[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            tracks.push(RewardTrackDataParser(wrapper));

            count--;
        }

        const reload = wrapper.readBoolean();

        return { disabled, tracks, reload };
    }
}
