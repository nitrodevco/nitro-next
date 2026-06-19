import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNftTransferFeeComposerType = object;

export class GetNftTransferFeeComposer implements IOutgoingPacket<GetNftTransferFeeComposerType> {
    public constructor(private params: GetNftTransferFeeComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
