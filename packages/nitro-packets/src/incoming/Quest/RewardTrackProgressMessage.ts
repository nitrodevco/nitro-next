// From the AS3 parser (`_-3C` in this build): a task's new progress count and the track's points.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

export type RewardTrackProgressMessageType = {
    trackId: string;
    taskId: string;
    progressCount: number;
    points: number;
};

export class RewardTrackProgressMessage implements IIncomingPacket<RewardTrackProgressMessageType> {
    public parse(wrapper: IMessageDataWrapper): RewardTrackProgressMessageType {
        const trackId = wrapper.readString();
        const taskId = wrapper.readString();
        const progressCount = wrapper.readInt();
        const points = wrapper.readInt();

        return { trackId, taskId, progressCount, points };
    }
}
