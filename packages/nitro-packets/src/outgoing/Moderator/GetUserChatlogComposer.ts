import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserChatlogComposerType = object;

export class GetUserChatlogComposer implements IOutgoingPacket<GetUserChatlogComposerType> {
    public constructor(private params: GetUserChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
