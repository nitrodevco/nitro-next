import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2ThrowSnowballAtHumanComposerType = object;

export class Game2ThrowSnowballAtHumanComposer implements IOutgoingPacket<Game2ThrowSnowballAtHumanComposerType> {
    public constructor(private params: Game2ThrowSnowballAtHumanComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
