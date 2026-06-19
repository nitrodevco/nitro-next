import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCollectibleMintingEnabledComposerType = object;

export class GetCollectibleMintingEnabledComposer implements IOutgoingPacket<GetCollectibleMintingEnabledComposerType> {
    public constructor(private params: GetCollectibleMintingEnabledComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
