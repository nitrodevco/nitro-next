import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetHeightMapComposerType = object;

export class GetHeightMapComposer implements IOutgoingPacket<GetHeightMapComposerType> {
    public constructor(private params: GetHeightMapComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
