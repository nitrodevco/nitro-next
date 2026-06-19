import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserGameAchievementsComposerType = object;

export class GetUserGameAchievementsComposer implements IOutgoingPacket<GetUserGameAchievementsComposerType> {
    public constructor(private params: GetUserGameAchievementsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
