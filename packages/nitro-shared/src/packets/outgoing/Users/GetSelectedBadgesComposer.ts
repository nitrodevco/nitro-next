import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetSelectedBadgesComposerType = object;

export class GetSelectedBadgesComposer implements IOutgoingPacket<GetSelectedBadgesComposerType> {
    public constructor(private params: GetSelectedBadgesComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
