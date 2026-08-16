import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2PlayAgainComposerType = object;

export class Game2PlayAgainComposer implements IOutgoingPacket<Game2PlayAgainComposerType> {
    public constructor(private params: Game2PlayAgainComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
