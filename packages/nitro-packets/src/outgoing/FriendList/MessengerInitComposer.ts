import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type MessengerInitComposerType = object;

export class MessengerInitComposer implements IOutgoingPacket<MessengerInitComposerType> {
    public constructor(private params: MessengerInitComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
