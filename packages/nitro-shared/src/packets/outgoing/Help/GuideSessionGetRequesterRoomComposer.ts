import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GuideSessionGetRequesterRoomComposerType = object;

export class GuideSessionGetRequesterRoomComposer implements IOutgoingPacket<GuideSessionGetRequesterRoomComposerType> {
    public constructor(private params: GuideSessionGetRequesterRoomComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
