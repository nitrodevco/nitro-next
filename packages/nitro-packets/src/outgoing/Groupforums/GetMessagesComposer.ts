import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetMessagesComposerType = object;

export class GetMessagesComposer implements IOutgoingPacket<GetMessagesComposerType> {
    public constructor(private params: GetMessagesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
