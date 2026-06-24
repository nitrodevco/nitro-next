import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type OpenQuestTrackerComposerType = object;

export class OpenQuestTrackerComposer implements IOutgoingPacket<OpenQuestTrackerComposerType> {
    public constructor(private params: OpenQuestTrackerComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
