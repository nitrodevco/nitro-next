import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2LoadStageReadyComposerType = object;

export class Game2LoadStageReadyComposer implements IOutgoingPacket<Game2LoadStageReadyComposerType> {
    public constructor(private params: Game2LoadStageReadyComposerType) { }

    public compose(): (number | string)[] {
        return [
        ];
    }
}
