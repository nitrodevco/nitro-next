import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type IncomeRewardStatusComposerType = object;

export class IncomeRewardStatusComposer implements IOutgoingPacket<IncomeRewardStatusComposerType> {
    public constructor(private params: IncomeRewardStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
