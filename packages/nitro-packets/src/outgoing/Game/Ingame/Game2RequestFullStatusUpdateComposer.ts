import { IOutgoingPacket } from '@nitrodevco/nitro-api';

export type Game2RequestFullStatusUpdateComposerType = object;

export class Game2RequestFullStatusUpdateComposer implements IOutgoingPacket<Game2RequestFullStatusUpdateComposerType> {
    public constructor(private params: Game2RequestFullStatusUpdateComposerType) { }

    public compose(): (number | string | boolean)[] {
        return [
        ];
    }
}
