import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetUserNftChatStylesComposerType = object;

export class GetUserNftChatStylesComposer implements IOutgoingPacket<GetUserNftChatStylesComposerType> {
    public constructor(private params: GetUserNftChatStylesComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
