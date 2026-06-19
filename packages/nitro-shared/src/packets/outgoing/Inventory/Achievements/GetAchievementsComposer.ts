import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetAchievementsComposerType = object;

export class GetAchievementsComposer implements IOutgoingPacket<GetAchievementsComposerType> {
    public constructor(private params: GetAchievementsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
