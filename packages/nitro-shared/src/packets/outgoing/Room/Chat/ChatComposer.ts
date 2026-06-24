import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type ChatComposerType = object;

export class ChatComposer implements IOutgoingPacket<ChatComposerType> {
    public constructor(private params: ChatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
