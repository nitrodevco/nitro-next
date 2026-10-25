/** `DailyTasksController`'s three packets. */
import { DailyTasksActiveListMessage, DailyTasksTasksAddedMessage, DailyTasksTaskUpdateMessage } from '@nitrodevco/nitro-packets';

import { onDailyTasksActiveList, onDailyTasksAdded, onDailyTaskUpdated } from '#base/commands';
import { WebSocketConnection } from '#base/context/communication';

import { on, subscribeAll } from '../packetSubscriptions';

export const registerDailyTasksHandlers = ({ send, subscribe }: WebSocketConnection) => subscribeAll(subscribe, [
    on(DailyTasksActiveListMessage, data => onDailyTasksActiveList(data.tasks)),
    on(DailyTasksTasksAddedMessage, data => onDailyTasksAdded(data.tasks)),
    on(DailyTasksTaskUpdateMessage, data => onDailyTaskUpdated(send, data.taskId, data.repeats, data.status)),
]);
