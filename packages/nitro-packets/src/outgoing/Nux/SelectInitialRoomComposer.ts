import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectInitialRoomComposerType = {
    /** One of `new.user.flow.roomTypes` ("10"), as a string. */
    roomType: string;
};

export class SelectInitialRoomComposer implements IOutgoingPacket<SelectInitialRoomComposerType> {
    public constructor(private params: SelectInitialRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
            this.params.roomType,
        ];
    }
}
