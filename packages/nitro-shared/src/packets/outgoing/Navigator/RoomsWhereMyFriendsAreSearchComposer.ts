import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type RoomsWhereMyFriendsAreSearchComposerType = object;

export class RoomsWhereMyFriendsAreSearchComposer implements IOutgoingPacket<RoomsWhereMyFriendsAreSearchComposerType> {
    public constructor(private params: RoomsWhereMyFriendsAreSearchComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
