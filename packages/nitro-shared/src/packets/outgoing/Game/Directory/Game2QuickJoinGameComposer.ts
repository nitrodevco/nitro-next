import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2QuickJoinGameComposerType = object;

export class Game2QuickJoinGameComposer implements IOutgoingPacket<Game2QuickJoinGameComposerType> {
    public constructor(private params: Game2QuickJoinGameComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
