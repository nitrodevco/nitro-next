import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetResolutionAchievementsComposerType = object;

export class GetResolutionAchievementsComposer implements IOutgoingPacket<GetResolutionAchievementsComposerType> {
    public constructor(private params: GetResolutionAchievementsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
