// Body filled by hand from the AS3 parser (an obfuscated class in this build): a count, then each task.
import { IIncomingPacket, IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { DailyTaskInfoParser, IDailyTaskInfo } from '../Data/DailyTaskInfoParser';

export type DailyTasksTasksAddedMessageType = {
    tasks: IDailyTaskInfo[];
};

export class DailyTasksTasksAddedMessage implements IIncomingPacket<DailyTasksTasksAddedMessageType> {
    public parse(wrapper: IMessageDataWrapper): DailyTasksTasksAddedMessageType {
        const tasks: IDailyTaskInfo[] = [];

        let count = wrapper.readInt();

        while (count > 0) {
            tasks.push(DailyTaskInfoParser(wrapper));

            count--;
        }

        return { tasks };
    }
}
