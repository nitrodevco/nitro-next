import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ForwardToASubmittableRoomComposerType = object;

export class ForwardToASubmittableRoomComposer implements IOutgoingPacket<ForwardToASubmittableRoomComposerType> {
    public constructor(private params: ForwardToASubmittableRoomComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
