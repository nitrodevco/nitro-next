import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCfhMyReportStatusComposerType = object;

export class GetCfhMyReportStatusComposer implements IOutgoingPacket<GetCfhMyReportStatusComposerType> {
    public constructor(private params: GetCfhMyReportStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
