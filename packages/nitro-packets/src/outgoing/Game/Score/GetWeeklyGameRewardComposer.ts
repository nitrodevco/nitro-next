import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetWeeklyGameRewardComposerType = object;

export class GetWeeklyGameRewardComposer implements IOutgoingPacket<GetWeeklyGameRewardComposerType> {
    public constructor(private params: GetWeeklyGameRewardComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
