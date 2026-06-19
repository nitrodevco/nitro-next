import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type IncomeRewardClaimComposerType = object;

export class IncomeRewardClaimComposer implements IOutgoingPacket<IncomeRewardClaimComposerType> {
    public constructor(private params: IncomeRewardClaimComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
