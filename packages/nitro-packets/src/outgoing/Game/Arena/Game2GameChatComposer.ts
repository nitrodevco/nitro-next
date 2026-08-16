import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2GameChatComposerType = object;

export class Game2GameChatComposer implements IOutgoingPacket<Game2GameChatComposerType> {
    public constructor(private params: Game2GameChatComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
