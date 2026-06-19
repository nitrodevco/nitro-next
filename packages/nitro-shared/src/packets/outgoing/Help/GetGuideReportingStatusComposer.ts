import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetGuideReportingStatusComposerType = object;

export class GetGuideReportingStatusComposer implements IOutgoingPacket<GetGuideReportingStatusComposerType> {
    public constructor(private params: GetGuideReportingStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
