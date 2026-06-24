import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionReportComposerType = object;

export class GuideSessionReportComposer implements IOutgoingPacket<GuideSessionReportComposerType> {
    public constructor(private params: GuideSessionReportComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
