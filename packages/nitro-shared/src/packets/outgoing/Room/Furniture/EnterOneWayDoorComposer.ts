import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type EnterOneWayDoorComposerType = object;

export class EnterOneWayDoorComposer implements IOutgoingPacket<EnterOneWayDoorComposerType> {
    public constructor(private params: EnterOneWayDoorComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
