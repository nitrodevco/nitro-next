import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetDailyQuestComposerType = object;

export class GetDailyQuestComposer implements IOutgoingPacket<GetDailyQuestComposerType> {
    public constructor(private params: GetDailyQuestComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
