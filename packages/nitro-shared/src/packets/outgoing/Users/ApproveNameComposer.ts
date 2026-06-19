import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ApproveNameComposerType = object;

export class ApproveNameComposer implements IOutgoingPacket<ApproveNameComposerType> {
    public constructor(private params: ApproveNameComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
