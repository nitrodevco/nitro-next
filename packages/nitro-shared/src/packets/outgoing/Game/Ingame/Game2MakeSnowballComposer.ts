import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2MakeSnowballComposerType = object;

export class Game2MakeSnowballComposer implements IOutgoingPacket<Game2MakeSnowballComposerType> {
    public constructor(private params: Game2MakeSnowballComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
