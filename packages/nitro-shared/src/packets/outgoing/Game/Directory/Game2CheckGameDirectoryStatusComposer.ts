import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2CheckGameDirectoryStatusComposerType = object;

export class Game2CheckGameDirectoryStatusComposer implements IOutgoingPacket<Game2CheckGameDirectoryStatusComposerType> {
    public constructor(private params: Game2CheckGameDirectoryStatusComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
