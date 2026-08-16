import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetNftCollectionsComposerType = object;

export class GetNftCollectionsComposer implements IOutgoingPacket<GetNftCollectionsComposerType> {
    public constructor(private params: GetNftCollectionsComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
