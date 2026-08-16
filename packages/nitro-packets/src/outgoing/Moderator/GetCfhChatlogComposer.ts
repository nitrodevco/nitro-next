import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type GetCfhChatlogComposerType = object;

export class GetCfhChatlogComposer implements IOutgoingPacket<GetCfhChatlogComposerType> {
    public constructor(private params: GetCfhChatlogComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
