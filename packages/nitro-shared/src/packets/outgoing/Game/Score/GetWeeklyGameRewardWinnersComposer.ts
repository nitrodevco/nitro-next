import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetWeeklyGameRewardWinnersComposerType = object;

export class GetWeeklyGameRewardWinnersComposer implements IOutgoingPacket<GetWeeklyGameRewardWinnersComposerType> {
    public constructor(private params: GetWeeklyGameRewardWinnersComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
