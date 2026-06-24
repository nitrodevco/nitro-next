import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetBadgesComposerType = object;

export class GetBadgesComposer implements IOutgoingPacket<GetBadgesComposerType> {
    public constructor(private params: GetBadgesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
