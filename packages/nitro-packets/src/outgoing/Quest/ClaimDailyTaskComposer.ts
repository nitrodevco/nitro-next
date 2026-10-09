// Body filled by hand from the AS3 composer (`quest/dailytasks/ClaimDailyTaskComposer`): the task id, as an int.
import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ClaimDailyTaskComposerType = {
    taskId: number;
};

export class ClaimDailyTaskComposer implements IOutgoingPacket<ClaimDailyTaskComposerType> {
    public constructor(private params: ClaimDailyTaskComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.taskId,
        ];
    }
}
