import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type FriendFurniConfirmLockComposerType = object;

export class FriendFurniConfirmLockComposer implements IOutgoingPacket<FriendFurniConfirmLockComposerType> {
    public constructor(private params: FriendFurniConfirmLockComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
