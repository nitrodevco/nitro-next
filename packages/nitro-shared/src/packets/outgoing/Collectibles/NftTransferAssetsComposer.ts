import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type NftTransferAssetsComposerType = object;

export class NftTransferAssetsComposer implements IOutgoingPacket<NftTransferAssetsComposerType> {
    public constructor(private params: NftTransferAssetsComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
