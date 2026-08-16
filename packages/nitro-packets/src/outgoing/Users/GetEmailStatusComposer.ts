import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetEmailStatusComposerType = object;

export class GetEmailStatusComposer implements IOutgoingPacket<GetEmailStatusComposerType> {
    public constructor(private params: GetEmailStatusComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
