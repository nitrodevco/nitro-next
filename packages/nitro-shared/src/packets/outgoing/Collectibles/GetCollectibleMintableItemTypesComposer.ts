import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCollectibleMintableItemTypesComposerType = object;

export class GetCollectibleMintableItemTypesComposer implements IOutgoingPacket<GetCollectibleMintableItemTypesComposerType> {
    public constructor(private params: GetCollectibleMintableItemTypesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
