import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type SelectInitialRoomComposerType = object;

export class SelectInitialRoomComposer implements IOutgoingPacket<SelectInitialRoomComposerType> {
    public constructor(private params: SelectInitialRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
