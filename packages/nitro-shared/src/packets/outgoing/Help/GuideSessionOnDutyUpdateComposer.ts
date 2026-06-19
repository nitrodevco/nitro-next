import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionOnDutyUpdateComposerType = object;

export class GuideSessionOnDutyUpdateComposer implements IOutgoingPacket<GuideSessionOnDutyUpdateComposerType> {
    public constructor(private params: GuideSessionOnDutyUpdateComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
