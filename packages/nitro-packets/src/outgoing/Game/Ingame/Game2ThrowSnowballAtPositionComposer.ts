import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2ThrowSnowballAtPositionComposerType = object;

export class Game2ThrowSnowballAtPositionComposer implements IOutgoingPacket<Game2ThrowSnowballAtPositionComposerType> {
    public constructor(private params: Game2ThrowSnowballAtPositionComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
