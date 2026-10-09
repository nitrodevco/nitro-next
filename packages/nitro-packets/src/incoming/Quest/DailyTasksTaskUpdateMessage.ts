// Body filled by hand from the AS3 parser (an obfuscated class in this build).
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { readDailyTaskLong } from '../Data/DailyTaskInfoParser';

export type DailyTasksTaskUpdateMessageType = {
    taskId: number;
    repeats: number;
    status: number;
    secondsLeft: number;
};

export class DailyTasksTaskUpdateMessage implements IIncomingPacket<DailyTasksTaskUpdateMessageType> {
    public parse(wrapper: IMessageDataWrapper): DailyTasksTaskUpdateMessageType {
        const taskId = readDailyTaskLong(wrapper);
        const repeats = wrapper.readInt();
        const status = wrapper.readByte();
        const secondsLeft = wrapper.readInt();

        return { taskId, repeats, status, secondsLeft };
    }
}
