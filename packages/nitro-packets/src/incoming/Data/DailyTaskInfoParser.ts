// Body filled by hand from the AS3 parser (`quest/dailytasks/DailyTaskInfo`).
import { IMessageDataWrapper } from '@nitrodevco/nitro-api';

import { DailyTaskRewardParser, IDailyTaskReward } from './DailyTaskRewardParser';

/** `DailyTaskInfo`'s status: still to do, done and waiting for its claim, claimed. */
export const DAILY_TASK_STATUS_ACTIVE = 0;
export const DAILY_TASK_STATUS_COMPLETED = 1;
export const DAILY_TASK_STATUS_CLAIMED = 2;

export interface IDailyTaskInfo {
    taskId: number;
    taskCode: string;
    questTypeCode: string;
    isBonus: boolean;
    imageVersion: string;
    catalogName: string;
    requiredRepeats: number;
    repeats: number;
    status: number;
    /** As the packet gave it; `getDailyTaskSecondsLeft` counts it down from `receivedAt`. */
    secondsLeft: number;
    /** `receiveTime`: when the packet was read. */
    receivedAt: number;
    rewards: IDailyTaskReward[];
}

/** `IMessageDataWrapper.readLong`: a signed 64-bit integer, high word first. */
export const readDailyTaskLong = (wrapper: IMessageDataWrapper): number => {
    const high = wrapper.readInt();
    const low = wrapper.readInt() >>> 0;

    return (high * 4294967296) + low;
};

export const DailyTaskInfoParser = (wrapper: IMessageDataWrapper): IDailyTaskInfo => {
    const taskId = readDailyTaskLong(wrapper);
    const taskCode = wrapper.readString();
    const questTypeCode = wrapper.readString();
    const isBonus = wrapper.readBoolean();
    const imageVersion = wrapper.readString();
    const catalogName = wrapper.readString();
    const requiredRepeats = wrapper.readInt();
    const repeats = wrapper.readInt();
    const status = wrapper.readByte();
    const secondsLeft = wrapper.readInt();
    const rewards: IDailyTaskReward[] = [];

    let count = wrapper.readInt();

    while (count > 0) {
        rewards.push(DailyTaskRewardParser(wrapper));

        count--;
    }

    return { taskId, taskCode, questTypeCode, isBonus, imageVersion, catalogName, requiredRepeats, repeats, status, secondsLeft, receivedAt: Date.now(), rewards };
};
